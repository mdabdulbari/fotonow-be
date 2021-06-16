require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express()
app.use(cors());

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

//routes
const imageRouter = require('./routes/imageRouter');

app.use('/image', imageRouter);

const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});
