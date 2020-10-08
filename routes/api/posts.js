const express = require('express');
const router = express.Router();

// @route   GET api/posts
// @desc    Test route
// @access  public

router.get('/', (req, res) => res.send('POsts route'));

module.exports = router;
