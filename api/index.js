const connectToMongo = require('../utils/db');
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express();
const port = 3000;

//using express
app.use(express.json());

//allow cross origin requests
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!")
})

//Available Routes
app.use('/api/', require('../routes/WaitlistForm'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app