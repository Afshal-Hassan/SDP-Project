require("dotenv").config();
const express = require("express");
require("./config/dbConnect");
const router = require("./routes/router");
const cors = require("cors");
const path = require('path');
const cookieParser = require("cookie-parser")
const fs = require("fs")

const app = express();
const port = 8080;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api/v1', router);

const folderPath = path.join(__dirname, 'assets/exams'); // Adjust 'assets' to your folder name

// Endpoint to get all file paths
app.get('/filepaths', (req, res) => {
    // Read the contents of the folder
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading folder:', err);
            return res.status(500).json({ error: 'Error reading folder' });
        }

        // Filter out directories and get full paths
        const filePaths = files
            .filter(file => !fs.statSync(path.join(folderPath, file)).isDirectory())
            .map(file => path.join(folderPath, file));

        res.json({ filepaths: filePaths });
    });
});


app.listen(port,()=>{
    console.log(`server start at port no : ${port}`);
})