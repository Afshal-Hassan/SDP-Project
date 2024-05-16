const attendancePercentages = [80, 85, 90, 95, 100];

function getRandomAttendancePercentage() {
    const randomIndex = Math.floor(Math.random() * attendancePercentages.length);
    return attendancePercentages[randomIndex];
}

console.log(getRandomAttendancePercentage());