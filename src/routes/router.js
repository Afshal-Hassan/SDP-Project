const express = require('express');
const router = new express.Router();
const { studentRegister, loginStudent, logoutStudent, studentValid, dashboardInfo } = require('../controllers/studentController');
const authenticate = require('../middleware/authenticate');
const { markAttendance, getAttendence, getSpecificStudentAttendance, getPolicies, getAllExamSchedules, getAllExamResults } = require('../controllers/attendeneController')


// for user registration

router.post("/register", studentRegister);
router.post("/login", loginStudent);
router.get("/logout", authenticate, logoutStudent);
router.get("/validuser", authenticate, studentValid);

// for getting dashboard info
router.get('/dashboard/:studentId', authenticate, dashboardInfo)

// For Privacy Policies
router.get("/privacyPolicies", getPolicies);

// for attendence marking
router.post('/markAttendance', authenticate, markAttendance)
router.post('/getAttendence', authenticate, getAttendence)
router.post('/getSpecificStudent/attendance', authenticate, getSpecificStudentAttendance)


// Get all exams schedules
router.get('/exams/getExamSchedules', authenticate, getAllExamSchedules)

// Get all exam results
router.get('/result/getAllResults', authenticate, getAllExamResults)

module.exports = router;




