const validator = require('validator');

const saveCourse = (req, res, next) => {
  const { courseName, courseCode, instructor, credits, description, enrolledStudents } = req.body || {};

  // Check required fields
  if (!courseName || !courseCode || !instructor) {
    return res.status(400).json({
      message: 'Missing required fields: courseName, courseCode, and instructor are required'
    });
  }

  // Validate data types and formats
  if (typeof courseName !== 'string' || courseName.trim().length === 0) {
    return res.status(400).json({ message: 'courseName must be a non-empty string' });
  }

  if (typeof courseCode !== 'string' || courseCode.trim().length === 0) {
    return res.status(400).json({ message: 'courseCode must be a non-empty string' });
  }

  if (typeof instructor !== 'string' || instructor.trim().length === 0) {
    return res.status(400).json({ message: 'instructor must be a non-empty string' });
  }

  // Optional fields validation
  if (credits !== undefined && (!Number.isInteger(credits) || credits < 0)) {
    return res.status(400).json({ message: 'credits must be a non-negative integer' });
  }

  if (description && typeof description !== 'string') {
    return res.status(400).json({ message: 'description must be a string' });
  }

  if (enrolledStudents && !Array.isArray(enrolledStudents)) {
    return res.status(400).json({ message: 'enrolledStudents must be an array' });
  }

  next();
};

module.exports = {
  saveCourse
};
