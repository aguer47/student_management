const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Welcome to student management API');
});

router.use('/auth', require('./auth'));
router.use('/students', require('./students'));
router.use('/courses', require('./courses'));

module.exports = router;