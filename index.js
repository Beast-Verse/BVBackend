require('dotenv').config();

const express = require('express');
const cors = require('cors');
const waitlistForm = require('./api/WaitlistForm')

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

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})

module.exports = app