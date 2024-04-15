const studentDb = require("../models/studentSchema");
var bcrypt = require("bcryptjs");
const { user_response } = require('../response_json/auth_response');
const baseResponse = require('../response_json/base_response');
const Message = require("../utils/response_messages/auth_messages");
const GlobalMessage = require("../utils/response_messages/global_messages");
const ErrorName = require("../utils/error_names/error_names");

const studentRegister = async (req, res) => {
  const { fname, lname, email, password, seatNo } = req.body;

  if (!fname || !lname || !seatNo || !email || !password) {
    return res.status(422).json(
      baseResponse({},
        422,
        GlobalMessage.MISSING_REQUIRED_FIELDS,
        ErrorName.INCOMPLETE_DATA_ERROR,
      ));
  }

  try {
    const student = await studentDb.findOne({
      $or: [
        { email: email }, // Search by email
        { seatNo: seatNo } // Search by seat number
      ]
    });
    if (student) {
      return res.status(422).json(
        baseResponse(
          {},
          422,
          Message.USER_EXISTS_MESSAGE,
          ErrorName.USER_EXISTS_ERROR,
        ));
    }
    const finalUser = new studentDb({
      fname,
      lname,
      seatNo,
      email,
      password,
    });
    // here password hashing
    const data = await finalUser.save();

    const token = await data.generateAuthtoken();

    // cookiegenerate
    res.cookie("usercookie", token, {
      expires: new Date(Date.now() + 9000000),
      httpOnly: true,
    });

    res.status(201).json(
      baseResponse(
        user_response(data, token),
        201,
        Message.REGISTERED_SUCCESSFULLY
      ));

  } catch (error) {
    res.status(422).json(
      baseResponse(
        {},
        422,
        error,
        ErrorName.SYSTEM_ERROR,
      ));
    console.log("catch block error");
  }
};

const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json(
      baseResponse({},
        422,
        GlobalMessage.MISSING_REQUIRED_FIELDS,
        ErrorName.INCOMPLETE_DATA_ERROR,
      ));
  }

  try {
    var student = await studentDb.findOne({
      $or: [
        { email: email }, // Search by email
        { seatNo: email } // Search by seat number
      ]
    });

    if (!student) {
      console.log("STUDENT NOT FOUND");
      const response = baseResponse(
        {},
        401,
        Message.USER_DOES_EXISTS_MESSAGE,
        ErrorName.USER_DOES_NOT_EXISTS_ERROR,
      );
      return res.status(401).json(response);
    }


    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      res.status(422).json(
        baseResponse(
          {},
          422,
          Message.WRONG_PASSWORD_MESSAGE,
          ErrorName.INVALID_PASS_ERROR,
        ));
    } else {
      // token generate
      const token = await student.generateAuthtoken();

      // cookiegenerate
      res.cookie("usercookie", token, {
        expires: new Date(Date.now() + 9000000),
        httpOnly: true,
      });

      // Create a new object without the tokens array
      const result = baseResponse(
        user_response(student, token), 
        200, 
        Message.LOGGED_IN_SUCCESSFULLY,
      );
      res.status(200).json(result);
    }


  } catch (error) {
    res.status(422).json(
      baseResponse(
        {},
        422,
        error,
        ErrorName.SYSTEM_ERROR,
      ));
    console.log("catch block");
  }
};

// student valid
const studentValid = async (req, res) => {
  try {
    const ValidUserOne = await studentDb.findOne({ _id: req.userId });
    res.status(201).json({ status: 201, ValidUserOne });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
};

// user logout

const logoutStudent = async (req, res) => {
  // try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
      return curelem.token !== req.token;
    });

    res.clearCookie("usercookie", { path: "/" });

    req.rootUser.save();

    res.status(200).json(
      baseResponse(
        {}, 
        200, 
        Message.LOGOUT_SUCCESSFULLY, 
      )
    );
  // } catch (error) {
  //   console.log("LOGOUT CATCH");
  //   res.status(401).json(baseResponse(
  //     {},
  //     401,
  //     error,
  //     ErrorName.SYSTEM_ERROR,
  //   ));
  // }
};


module.exports = {
  studentRegister,
  loginStudent,
  logoutStudent,
  studentValid
}