const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Public routes
router.post('/send-otp', authController.sendOtp);
router.post('/verify-otp', authController.verifyOtp);
router.post('/admin/login', authController.adminLogin);

// Example of a protected route to test middleware
router.get('/me', protect, (req, res) => {
  res.status(200).json({
    status: 'success',
    data: req.user
  });
});

module.exports = router;
