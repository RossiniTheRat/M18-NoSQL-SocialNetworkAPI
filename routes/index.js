const express = require('express');
const router = express.Router();

// Index route
router.get('/', (req, res) => {
    res.send('Welcome to the Social Network API!');
});

module.exports = router;
