const express = require('express');
const passport = require('../config/passport');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();

// Check if GitHub OAuth is configured (support env var variants)
const isGitHubConfigured = (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) || (process.env['GITHUB CLIENT_ID'] && process.env['GITHUB CLIENT_SECRET']);

// Login route (alias for /github)
router.get('/login', (req, res, next) => {
  if (!isGitHubConfigured) {
    return res.status(500).send('GitHub OAuth not configured. Please set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in .env');
  }
  passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
});

// Initiate GitHub OAuth
router.get('/github', (req, res, next) => {
  if (!isGitHubConfigured) {
    return res.status(500).send('GitHub OAuth not configured. Please set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in .env');
  }
  passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
});

// GitHub OAuth callback
router.get('/github/callback', (req, res, next) => {
  if (!isGitHubConfigured) {
    return res.status(500).send('GitHub OAuth not configured');
  }
  passport.authenticate('github', {
    failureRedirect: '/auth/failure',
    session: true
  })(req, res, () => {
    res.send('Authentication successful');
  });
});

// Auth failure route
router.get('/failure', (req, res) => {
  res.status(401).send('Failed to authenticate user');
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Logout failed');
    }
    res.send('Logged out successfully');
  });
});

// Get current user
router.get('/user', isAuthenticated, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
