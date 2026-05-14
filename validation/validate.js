const validator = require('validator');

const saveStudent = (req, res, next) => {
  const { firstName, lastName, email, dateOfBirth, enrolledCourses } = req.body || {};

  // Check required fields
  if (!firstName || !lastName || !email) {
    return res.status(400).json({
      message: 'Missing required fields: firstName, lastName, and email are required'
    });
  }

  // Validate data types and formats
  if (typeof firstName !== 'string' || firstName.trim().length === 0) {
    return res.status(400).json({ message: 'firstName must be a non-empty string' });
  }

  if (typeof lastName !== 'string' || lastName.trim().length === 0) {
    return res.status(400).json({ message: 'lastName must be a non-empty string' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Invalid email address format' });
  }

  // Optional fields validation
  if (dateOfBirth && !validator.isDate(dateOfBirth)) {
    return res.status(400).json({ message: 'dateOfBirth must be a valid date' });
  }

  if (enrolledCourses && !Array.isArray(enrolledCourses)) {
    return res.status(400).json({ message: 'enrolledCourses must be an array' });
  }

  next();
};

module.exports = {
  saveStudent
};