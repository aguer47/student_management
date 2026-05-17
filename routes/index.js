const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Welcome to student management API');
});

router.get('/login', (req, res) => {
  return res.redirect('/auth/github');
});

router.get('/logout', (req, res) => {
  return res.redirect('/auth/logout');
});

router.use('/auth', require('./auth'));
router.use('/students', require('./students'));
router.use('/courses', require('./courses'));

module.exports = router;