const express = require('express');
const passport = require('passport');
const router = express.Router();

// Check if OAuth is configured
const isOAuthConfigured = process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET;

// Initiate Google OAuth
router.get('/google', (req, res) => {
  if (!isOAuthConfigured) {
    return res.status(500).json({
      error: 'OAuth not configured',
      message: 'Google OAuth credentials are not set up. Please configure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your .env file.'
    });
  }
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
});

// Google OAuth callback
router.get(
  '/google/callback',
  (req, res) => {
    if (!isOAuthConfigured) {
      return res.status(500).json({
        error: 'OAuth not configured',
        message: 'Google OAuth credentials are not set up.'
      });
    }
    passport.authenticate('google', {
      failureRedirect: '/auth/failure',
      session: true
    })(req, res, () => {
      // Successful authentication
      res.status(200).json({
        message: 'Authentication successful',
        user: req.user
      });
    });
  }
);

// Auth failure route
router.get('/failure', (req, res) => {
  res.status(401).json({
    message: 'Failed to authenticate user'
  });
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

// Get current user
router.get('/user', (req, res) => {
  if (req.user) {
    return res.status(200).json({ user: req.user });
  }
  res.status(401).json({ message: 'No user logged in' });
});

module.exports = router;
