
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Email already exists' });

    const userRole = role?.toLowerCase() === 'admin' ? 'admin' : 'user';

    const user = new User({
      name,
      email,
      passwordHash: password, 
      role: userRole,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully', role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { registerUser};