const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

// Create recruiter account
exports.createRecruiter = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { name, email, password } = req.body;
    
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'recruteur'
    });
    
    await user.save();
    res.status(201).json({ message: 'Recruiter account created successfully' });
  } catch (error) {
    console.error('Error creating recruiter account:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all recruiters
exports.getRecruiters = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const recruiters = await User.find({ role: 'recruteur' }).select('-password');
    res.json(recruiters);
  } catch (error) {
    console.error('Error fetching recruiters:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 