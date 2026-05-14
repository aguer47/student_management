const validator = require('validator');

const saveStudent = (req, res, next) => {
  const { firstName, lastName, email, age, course, year, gpa } = req.body || {};

  // Check required fields
  if (!firstName || !lastName || !email || age === undefined || !course || !year || gpa === undefined) {
    return res.status(400).json({
      message: 'Missing required fields: firstName, lastName, email, age, course, year, and gpa are required'
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

  if (!Number.isInteger(age) || age < 0) {
    return res.status(400).json({ message: 'age must be a non-negative integer' });
  }

  if (typeof course !== 'string' || course.trim().length === 0) {
    return res.status(400).json({ message: 'course must be a non-empty string' });
  }

  if (typeof year !== 'string' || year.trim().length === 0) {
    return res.status(400).json({ message: 'year must be a non-empty string' });
  }

  if (typeof gpa !== 'number' || gpa < 0 || gpa > 4.0) {
    return res.status(400).json({ message: 'gpa must be a number between 0.0 and 4.0' });
  }

  next();
};

module.exports = {
  saveStudent
};