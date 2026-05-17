const express = require('express');
const router = express.Router();

const coursesController = require('../controllers/courses');
const { saveCourse } = require('../validation/validateCourse');
const { isAuthenticated } = require('../middleware/auth');

router.use(isAuthenticated);

router.get('/', coursesController.getAll);

router.get('/:id', coursesController.getSingle);

router.post('/', saveCourse, coursesController.createCourse);

router.put('/:id', saveCourse, coursesController.updateCourse);

router.delete('/:id', coursesController.deleteCourse);

module.exports = router;