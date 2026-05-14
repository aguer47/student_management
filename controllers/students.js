const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('students')
      .find();

    result.toArray().then((students) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(students);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingle = async (req, res) => {
  try {
    const studentId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .db()
      .collection('students')
      .find({ _id: studentId });

    const students = await result.toArray();

    if (students.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(students[0]);
  } catch (err) {
    console.error('Error retrieving student:', err);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid student ID format' });
    }
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

const createStudent = async (req, res) => {
  try {
    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age,
      course: req.body.course,
      year: req.body.year,
      gpa: req.body.gpa
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('students')
      .insertOne(student);

    if (response.acknowledged) {
      res.status(201).json({
        _id: response.insertedId,
        ...student
      });
    } else {
      res.status(500).json({ message: 'Error creating student' });
    }
  } catch (err) {
    console.error('Error creating student:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const studentId = new ObjectId(req.params.id);

    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age,
      course: req.body.course,
      year: req.body.year,
      gpa: req.body.gpa
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('students')
      .replaceOne({ _id: studentId }, student);

    if (response.modifiedCount > 0) {
      res.status(200).json({
        _id: studentId,
        ...student
      });
    } else {
      res.status(404).json({ message: 'Student not found or no changes made' });
    }
  } catch (err) {
    console.error('Error updating student:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const studentId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .db()
      .collection('students')
      .deleteOne({ _id: studentId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Student deleted successfully' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    console.error('Error deleting student:', err);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid student ID format' });
    }
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createStudent,
  updateStudent,
  deleteStudent
};