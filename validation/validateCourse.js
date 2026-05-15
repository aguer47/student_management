const validator = require('validator');

const saveCourse = (req, res, next) => {
  const { courseName, instructor, duration } = req.body || {};

  // Check required fields
  if (!courseName || !instructor || !duration) {
    return res.status(400).json({
      message: 'Missing required fields: courseName, instructor, and duration are required'
    });
  }

  // Validate data types and formats
  if (typeof courseName !== 'string' || courseName.trim().length === 0) {
    return res.status(400).json({ message: 'courseName must be a non-empty string' });
  }

  if (typeof instructor !== 'string' || instructor.trim().length === 0) {
    return res.status(400).json({ message: 'instructor must be a non-empty string' });
  }

  if (typeof duration !== 'string' || duration.trim().length === 0) {
    return res.status(400).json({ message: 'duration must be a non-empty string' });
  }

  next();
};

module.exports = {
  saveCourse
};
