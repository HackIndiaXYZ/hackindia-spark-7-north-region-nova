const jwt = require('jsonwebtoken');
const User = require('../models/User');

// In-memory OTP storage for hackathon (Use Redis/Mongo for production)
const otpStore = new Map();
const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

// Utility to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Send OTP to phone number
// @route   POST /api/auth/send-otp
// @access  Public
exports.sendOtp = (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ status: 'error', message: 'Please provide a phone number' });
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store OTP with expiry
  otpStore.set(phone, {
    otp,
    expiresAt: Date.now() + OTP_EXPIRY_MS
  });

  // In a real app, integrate SMS API here. For hackathon, return OTP in response.
  res.status(200).json({
    status: 'success',
    message: 'OTP sent successfully',
    data: { otp } // Hackathon specific: exposing OTP
  });
};

// @desc    Verify OTP and login/register patient
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOtp = async (req, res) => {
  const { phone, otp, name } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ status: 'error', message: 'Please provide phone and OTP' });
  }

  const storedOtpData = otpStore.get(phone);

  if (!storedOtpData) {
    return res.status(400).json({ status: 'error', message: 'OTP expired or not requested' });
  }

  if (Date.now() > storedOtpData.expiresAt) {
    otpStore.delete(phone);
    return res.status(400).json({ status: 'error', message: 'OTP has expired' });
  }

  if (storedOtpData.otp !== otp) {
    return res.status(400).json({ status: 'error', message: 'Invalid OTP' });
  }

  try {
    // OTP verified, check if user exists
    let user = await User.findOne({ phone, role: 'patient' });

    // If new user, create patient account
    if (!user) {
      if (!name) {
        return res.status(400).json({ status: 'error', message: 'Name is required for new registration' });
      }
      
      // Dummy password for OTP-based users, as password is required in schema
      const dummyPassword = Math.random().toString(36).slice(-8);
      
      user = await User.create({
        name,
        phone,
        password: dummyPassword,
        role: 'patient'
      });
    }

    // Clear OTP
    otpStore.delete(phone);

    res.status(200).json({
      status: 'success',
      data: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
        token: generateToken(user._id)
      }
    });

  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Server error', error: error.message });
  }
};

// @desc    Admin Login
// @route   POST /api/auth/admin/login
// @access  Public
exports.adminLogin = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ status: 'error', message: 'Please provide phone/email and password' });
  }

  try {
    // Find admin user
    const user = await User.findOne({ phone, role: { $in: ['hospital_admin', 'super_admin'] } });

    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials or unauthorized role' });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
        hospitalId: user.hospitalId,
        token: generateToken(user._id)
      }
    });

  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Server error', error: error.message });
  }
};
