const express = require('express');
const router = new express.Router();
const { studentRegister, loginStudent, logoutStudent, studentValid } = require('../controllers/studentController');
const authenticate = require('../middleware/authenticate');
const {markAttendance, getAttendence, getSpecificStudentAttendance } =  require('../controllers/attendeneController')


// for user registration

router.post("/register", studentRegister);
router.post("/login", loginStudent);
router.get("/logout",authenticate, logoutStudent);
router.get("/validuser",authenticate, studentValid);

// for attendence marking

router.post('/markAttendance', authenticate, markAttendance)
router.get('/getAttendence', authenticate, getAttendence)
router.get('/getSpecificStudent/attendance', authenticate, getSpecificStudentAttendance)


module.exports = router;




