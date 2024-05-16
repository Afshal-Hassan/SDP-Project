function generateRandomAttendance() {
    const courses = [
        { code: "DCS-606", name: "Distributive Computing" },
        { code: "DCS-607", name: "Data Structures" },
        { code: "DCS-608", name: "Algorithms" }
    ];
    return courses.map(courseCode => ({
        course_id: generateRandomId(),
        course_Code: courseCode.code,
        course_name: courseCode.name, 
        total_attendance: 13,
        your_attendance: generateRandomNumber()
    }));
  }
//   console.log(generateRandomAttendance());
function generateRandomQuizzes() {
const topics = ["Trial Balance", "Binary Selection"]; 
return topics.map(topic => ({
    quiz_id: generateRandomId(),
    course_id: generateRandomId(),
    topic,
    date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(), 
    total_marks: Math.floor(Math.random() * 6) + 5, 
    your_score: Math.floor(Math.random() * 6) + 5 
}));
}
// console.log(generateRandomQuizzes());
function generateRandomUpcomingExams() {
const courses = [
    { code: "DCS-606", name: "SOftware Project Managementt" },
    { code: "DCS-607", name: "Parallel Computing" },
    { code: "DCS-608", name: "Computerized Accounting" }
];
return courses.map(course => ({
    course_id: generateRandomId(),
    course_Code: course.code,
    course_name: course.name,
    exam_date: new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
    exam_start_time: "12:00PM",
    exam_end_time: "02:00PM",
    exam_duration_in_hrs: 2
}));
}
console.log(generateRandomUpcomingExams());
function generateRandomNumber() {
    return Math.floor(Math.random() * 14); // Generates a random number between 0 and 13
}

function generateRandomId() {
return Math.random().toString(36).substring(2, 16);
}

module.exports = { generateRandomAttendance, generateRandomQuizzes, generateRandomUpcomingExams };