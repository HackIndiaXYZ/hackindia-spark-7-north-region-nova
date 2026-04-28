const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');

router.get('/health', healthController.checkHealth);

// Mount other routes here
router.use('/auth', require('./authRoutes'));
// router.use('/queue', require('./queueRoutes'));

module.exports = router;
