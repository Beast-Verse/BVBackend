//require('dotenv').config();

const express = require('express');
const cors = require('cors');
const waitlistForm = require('./api/WaitlistForm')
const table = require("./api/Table")
const getTable = require("./api/getTable")

const app = express();

//using express
app.use(express.json());

//allow cross origin requests
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!")
})

//Available Routes
app.use('/api/addwaitlist', waitlistForm);
app.use('/api/table',table)
app.use('/api/getTable',getTable)

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
})

module.exports = app