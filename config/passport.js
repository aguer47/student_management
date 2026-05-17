const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Configure GitHub strategy (support common env name variants)
const githubClientID = process.env.GITHUB_CLIENT_ID || process.env['GITHUB CLIENT_ID'];
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET || process.env['GITHUB CLIENT_SECRET'];
const githubCallbackURL = process.env.GITHUB_CALLBACK_URL || process.env.GITHUB_CALLBACK || process.env.CALLBACK_URL || 'http://localhost:8080/auth/github/callback';

if (githubClientID && githubClientSecret) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: githubClientID,
        clientSecret: githubClientSecret,
        callbackURL: githubCallbackURL
      },
      (accessToken, refreshToken, profile, done) => {
        const user = {
          id: profile.id,
          name: profile.displayName || profile.username,
          email: profile.emails?.[0]?.value || '',
          photo: profile.photos?.[0]?.value || '',
          provider: profile.provider
        };
        return done(null, user);
      }
    )
  );
} else {
  console.warn('⚠️  GitHub OAuth credentials not found. GitHub authentication endpoints will not work until you configure GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in your .env file.');
}

module.exports = passport;
