const express = require('express');
const User = require('../models/User');
const Course = require('../models/Course');
const Notice = require('../models/Notice');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get admin dashboard stats
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalTeachers = await User.countDocuments({ role: 'teacher' });
    const totalCourses = await Course.countDocuments();
    const activeCourses = await Course.countDocuments({ isActive: true });

    res.json({
      stats: {
        totalUsers,
        totalStudents,
        totalTeachers,
        totalCourses,
        activeCourses
      }
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find({})
      .select('-password')
      .populate('enrolledCourses', 'title level')
      .sort({ createdAt: -1 });

    res.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create user
router.post('/users', adminAuth, async (req, res) => {
  try {
    const { username, email, password, fullName, phone, role, classLevel } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email or username already exists' 
      });
    }

    const user = new User({
      username,
      email,
      password,
      fullName,
      phone,
      role,
      classLevel
    });

    await user.save();

    const userResponse = await User.findById(user._id).select('-password');
    res.status(201).json({
      message: 'User created successfully',
      user: userResponse
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ message: 'Server error during user creation' });
  }
});

// Update user
router.put('/users/:id', adminAuth, async (req, res) => {
  try {
    const { fullName, phone, email, role, classLevel, isActive } = req.body;
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.fullName = fullName || user.fullName;
    user.phone = phone || user.phone;
    user.email = email || user.email;
    user.role = role || user.role;
    user.classLevel = classLevel || user.classLevel;
    user.isActive = isActive !== undefined ? isActive : user.isActive;
    
    await user.save();

    const userResponse = await User.findById(user._id).select('-password');
    res.json({
      message: 'User updated successfully',
      user: userResponse
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error during user update' });
  }
});

// Delete user
router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error during user deletion' });
  }
});

// Get enrolled students for all courses
router.get('/enrolled-students', adminAuth, async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true })
      .populate('enrolledStudents', 'fullName email username classLevel')
      .populate('instructor', 'fullName email')
      .select('title level enrolledStudents instructor');

    res.json({ courses });
  } catch (error) {
    console.error('Get enrolled students error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Notices management
router.get('/notices', adminAuth, async (req, res) => {
  try {
    const notices = await Notice.find({})
      .populate('author', 'fullName')
      .sort({ createdAt: -1 });

    res.json({ notices });
  } catch (error) {
    console.error('Get notices error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/notices', adminAuth, async (req, res) => {
  try {
    const { title, content, targetAudience, priority, expiryDate } = req.body;

    const notice = new Notice({
      title,
      content,
      author: req.user._id,
      targetAudience,
      priority,
      expiryDate
    });

    await notice.save();

    const populatedNotice = await Notice.findById(notice._id)
      .populate('author', 'fullName');

    res.status(201).json({
      message: 'Notice created successfully',
      notice: populatedNotice
    });
  } catch (error) {
    console.error('Create notice error:', error);
    res.status(500).json({ message: 'Server error during notice creation' });
  }
});

router.put('/notices/:id', adminAuth, async (req, res) => {
  try {
    const { title, content, targetAudience, priority, isActive, expiryDate } = req.body;
    
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    notice.title = title || notice.title;
    notice.content = content || notice.content;
    notice.targetAudience = targetAudience || notice.targetAudience;
    notice.priority = priority || notice.priority;
    notice.isActive = isActive !== undefined ? isActive : notice.isActive;
    notice.expiryDate = expiryDate || notice.expiryDate;
    
    await notice.save();

    const populatedNotice = await Notice.findById(notice._id)
      .populate('author', 'fullName');

    res.json({
      message: 'Notice updated successfully',
      notice: populatedNotice
    });
  } catch (error) {
    console.error('Update notice error:', error);
    res.status(500).json({ message: 'Server error during notice update' });
  }
});

router.delete('/notices/:id', adminAuth, async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    await Notice.findByIdAndDelete(req.params.id);
    res.json({ message: 'Notice deleted successfully' });
  } catch (error) {
    console.error('Delete notice error:', error);
    res.status(500).json({ message: 'Server error during notice deletion' });
  }
});

module.exports = router;