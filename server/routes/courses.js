const express = require('express');
const Course = require('../models/Course');
const User = require('../models/User');
const { auth, adminAuth, teacherAuth } = require('../middleware/auth');

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const { level, subject } = req.query;
    const filter = { isActive: true };
    
    if (level) filter.level = level;
    if (subject) filter.subject = new RegExp(subject, 'i');

    const courses = await Course.find(filter)
      .populate('instructor', 'fullName email')
      .select('-enrolledStudents')
      .sort({ createdAt: -1 });

    res.json({ courses });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'fullName email phone')
      .populate('enrolledStudents', 'fullName email');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ course });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Enroll in course
router.post('/:id/enroll', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (!course.isActive) {
      return res.status(400).json({ message: 'Course is not active' });
    }

    if (course.enrolledStudents.length >= course.maxStudents) {
      return res.status(400).json({ message: 'Course is full' });
    }

    if (course.enrolledStudents.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Add student to course
    course.enrolledStudents.push(req.user._id);
    await course.save();

    // Add course to user's enrolled courses
    const user = await User.findById(req.user._id);
    user.enrolledCourses.push(course._id);
    await user.save();

    res.json({ message: 'Successfully enrolled in course' });
  } catch (error) {
    console.error('Enroll error:', error);
    res.status(500).json({ message: 'Server error during enrollment' });
  }
});

// Create course (Admin/Teacher only)
router.post('/', teacherAuth, async (req, res) => {
  try {
    const {
      title,
      description,
      level,
      subject,
      duration,
      price,
      maxStudents,
      startDate,
      endDate,
      schedule
    } = req.body;

    const course = new Course({
      title,
      description,
      level,
      subject,
      duration,
      price,
      instructor: req.user._id,
      maxStudents,
      startDate,
      endDate,
      schedule
    });

    await course.save();

    const populatedCourse = await Course.findById(course._id)
      .populate('instructor', 'fullName email');

    res.status(201).json({
      message: 'Course created successfully',
      course: populatedCourse
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ message: 'Server error during course creation' });
  }
});

// Update course
router.put('/:id', teacherAuth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user is the instructor or admin
    if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this course' });
    }

    const updates = req.body;
    Object.keys(updates).forEach(key => {
      course[key] = updates[key];
    });

    await course.save();

    const populatedCourse = await Course.findById(course._id)
      .populate('instructor', 'fullName email');

    res.json({
      message: 'Course updated successfully',
      course: populatedCourse
    });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({ message: 'Server error during course update' });
  }
});

// Delete course
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ message: 'Server error during course deletion' });
  }
});

module.exports = router;