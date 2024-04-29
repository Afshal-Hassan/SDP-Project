const mongoose = require("mongoose");


const attendanceSchema = new mongoose.Schema({
    date: {
        type : String,
        default:  new Date().toISOString().slice(0, 10)

    },

    "teacherName" : {
        type: String,
        default : "Sir Unknown",
    
    },
    "courseName" :  {
        type: String,
        default : "Unknown Course",
    
    },

    "email": {
        type: String,
    },
  
   "students" : [
     {
        student_id : {
            type: String,
            required: true,
        
        },
        full_name :{
                type: String,
        },
        seat_no :  {
            type: String,
            required: true,
        },
        email : {
            type: String,
            required: true,
        
        },
    
        attendance:{
            type: String,
            default : "absent"
        }
      }        
    ]


    
})


const attendanceDb = new mongoose.model("attendance", attendanceSchema);

module.exports = attendanceDb;










