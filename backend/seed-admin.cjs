const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');


dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('Connected to MongoDB...');

    const adminEmail = 'admin@nightout.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('Admin already exists.');
      process.exit();
    }

    const admin = await User.create({
      name: 'Super Admin',
      email: adminEmail,
      password: 'adminpassword123',
      role: 'admin',
      isVerified: true
    });

    console.log('Super Admin account created successfully!');
    console.log('Email: admin@nightout.com');
    console.log('Password: adminpassword123');
    
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();
