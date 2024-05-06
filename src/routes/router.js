const express = require('express');
const router = new express.Router();
const { studentRegister, loginStudent, logoutStudent, studentValid } = require('../controllers/studentController');
const authenticate = require('../middleware/authenticate');


// for user registration

router.post("/register", studentRegister);
router.post("/login", loginStudent);
router.get("/logout",authenticate, logoutStudent);
router.get("/validuser",authenticate, studentValid);


module.exports = router;




