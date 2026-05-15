const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('courses')
      .find();

    result.toArray().then((courses) => {
      res.status(200).json(courses);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingle = async (req, res) => {
  try {
    const courseId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .db()
      .collection('courses')
      .find({ _id: courseId });

    const courses = await result.toArray();

    if (courses.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(courses[0]);
  } catch (err) {
    console.error('Error retrieving course:', err);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid course ID format' });
    }
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const course = {
      courseName: req.body.courseName,
      instructor: req.body.instructor,
      duration: req.body.duration
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('courses')
      .insertOne(course);

    if (response.acknowledged) {
      res.status(201).json({
        _id: response.insertedId,
        ...course
      });
    } else {
      res.status(500).json({ message: 'Error creating course' });
    }
  } catch (err) {
    console.error('Error creating course:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const courseId = new ObjectId(req.params.id);

    const course = {
      courseName: req.body.courseName,
      instructor: req.body.instructor,
      duration: req.body.duration
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('courses')
      .replaceOne({ _id: courseId }, course);

    if (response.modifiedCount > 0) {
      res.status(200).json({
        _id: courseId,
        ...course
      });
    } else {
      res.status(404).json({ message: 'Course not found or no changes made' });
    }
  } catch (err) {
    console.error('Error updating course:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const courseId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .db()
      .collection('courses')
      .deleteOne({ _id: courseId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Course deleted successfully' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (err) {
    console.error('Error deleting course:', err);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid course ID format' });
    }
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCourse,
  updateCourse,
  deleteCourse
};