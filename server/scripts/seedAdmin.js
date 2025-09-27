const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ username: 'ali' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const adminUser = new User({
      username: 'ali',
      email: 'admin@ictcare.com',
      password: '1234', // Will be hashed by the pre-save middleware
      fullName: 'Md Ali Hossain',
      phone: '+8801700000000',
      role: 'admin'
    });

    await adminUser.save();

    console.log('Admin user created successfully:');
    console.log('Username: ali');
    console.log('Password: 1234');
    console.log('Role: admin');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();