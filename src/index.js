require("dotenv").config();
const express = require("express");
require("./config/dbConnect");
const router = require("./routes/router");
const cors = require("cors");
const cookieParser = require("cookie-parser")

const app = express();
const port = 8080;



app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api/v1', router);


app.listen(port,()=>{
    console.log(`server start at port no : ${port}`);
})