const attendanceDb = require("../models/attendenceSchema");
const fs = require('fs').promises;
const fs1 = require('fs');
const path = require('path');

const markAttendance = async (req, res) => {
  try {
    // console.log("helo",req.body)
    const dataToInsert = req.body;

    if (req.body === "") {
      res.status(422).send({
        message: "Send Attendence",
      });
    }

    const response = await attendanceDb.create(dataToInsert);

    res.status(200).send({
      message: "successfully Attendence Marked",
    });

    //console.log("helooooooooo",response)

    return;
  } catch (err) {
    console.log("err in mark attendance", err.data);
    res
      .status(400)
      .send("some error is occured in server please try again later");
  }
};

//------------------------------------ get attendence of specific teacher by his name and course --------------------------------------------

const getAttendence = async (req, res) => {
  try {
    const { teacherName, courseName } = req.body;

    if (!teacherName || !courseName) {
      return res.status(422).send({
        message: "fields are missing, send in this format",
        teacherName: "XYZ",
        courseName: "Computer Science",
      });
    }

    const response = await attendanceDb.find({
      $and: [{ teacherName: teacherName }, { courseName: courseName }],
    });

    console.log("data received");

    res.status(200).send({
      message: "data fetch successfully",
      data: response,
    });

    return;
  } catch (err) {
    console.log("Error in fetching of particlar teacher attendance", err.data);
    res
      .status(400)
      .send("some error is occured in server please try again later");
  }
};

//----------------------------- get attendence of specific student of specific by course by his seat no --------------------

const getSpecificStudentAttendance = async (req, res) => {
  try {
    const { courseName, seat_no, teacherEmail } = req.body;
    console.log(courseName, "         ", seat_no);

    if (!courseName && !seat_no && !teacherEmail) {
      return res.status(422).send({
        message: "fields are missing, send in this format",
        courseName: "XYZ",
        seat_no: "Computer Science",
        teacherEmail: "teacherEmail@example.com",
      });
    }

    //get thw document which course name matches to req course name
    const documents = await attendanceDb.find({
      courseName: courseName,
      email: teacherEmail,
    });
    //  console.log("documents======",documents)

    const matching = documents.map((doc) => {
      return doc.students.find((student) => student.seat_no === seat_no);
    });

    console.log("Found matching documents", matching);
    res.status(200).send({
      success: true,
      data: matching,
    });
    return;
  } catch (err) {
    console.log("Error in fetching of particlar teacher attendance", err.data);
    res
      .status(400)
      .send("some error is occured in server please try again later");
  }
};

// const fs = require('fs').promises;
const getPolicies = async (req, res) => {
  try {
    const policiesData = await fs.readFile('../policies.txt', 'utf8');
    if (!policiesData) {
      return res.status(404).send({
        message: "Privacy policies not found"
      });
    }
    res.status(200).send({
      success: true,
      data: policiesData
    });

  } catch (err) {
    console.error("Error in fetching privacy policies:", err);
    res.status(500).send({
      message: "Internal Server Error"
    });
  }
};

const getAllExamSchedules = async (req, res) => {

  const folderPath = path.join(__dirname, '../assets/exams');
  // const folderPath = path.join(__dirname, '..', '.', 'assets', 'exams');
  try {
    fs1.readdir(folderPath, (err, files) => {
      if (err) {
        console.error('Error reading folder:', err);
        return res.status(500).json({ error: 'Error reading folder' });
      }

      // Filter out directories and get full paths
      const filePaths = files
        .filter(file => !fs1.statSync(path.join(folderPath, file)).isDirectory())
        .map(file =>{
            const fileName = path.basename(file);
            const fileUrl = path.join(folderPath, file); // Change this URL as per your server setup
            return { name: fileName, url: fileUrl }
          }
        );



      console.log(filePaths);
      res.json({ filepaths: filePaths });
    });
  } catch (e) {
    console.error('Error:', e);
    return res.status(500).json({ error: e.toString() });
  }
};

const getAllExamResults = async (req, res) => {

  const folderPath = path.join(__dirname, '../assets/results');
  // const folderPath = path.join(__dirname, '..', '.', 'assets', 'exams');
  try {
    fs1.readdir(folderPath, (err, files) => {
      if (err) {
        console.error('Error reading folder:', err);
        return res.status(500).json({ error: 'Error reading folder' });
      }

      // Filter out directories and get full paths
      const filePaths = files
        .filter(file => !fs1.statSync(path.join(folderPath, file)).isDirectory())
        .map(file =>{
            const fileName = path.basename(file);
            const fileUrl = path.join(folderPath, file); // Change this URL as per your server setup
            return { name: fileName, url: fileUrl }
          }
        );



      console.log(filePaths);
      res.json({ filepaths: filePaths });
    });
  } catch (e) {
    console.error('Error:', e);
    return res.status(500).json({ error: e.toString() });
  }
};


module.exports = {
  markAttendance,
  getAttendence,
  getSpecificStudentAttendance,
  getPolicies,
  getAllExamSchedules,
  getAllExamResults,
};
