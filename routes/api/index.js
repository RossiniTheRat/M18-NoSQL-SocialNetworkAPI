const router = require('express').Router();

// Import routes
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// Define routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// Export router
module.exports = router;
