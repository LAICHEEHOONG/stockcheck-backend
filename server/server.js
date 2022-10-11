
// const {MongoClient} = require('mongodb');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cors = require('cors');
require('dotenv').config();
const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`;
const path = require('path');
const userRoute = require('./routes/api/user');
const uploadRoute = require('./routes/api/upload');
const listRoute = require('./routes/api/list');
const inputRoute = require('./routes/api/input');
const historyRoute = require('./routes/api/history');


// const client = new MongoClient(mongoUri);

mongoose.connect(mongoUri);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(cors({
    origin: '*'
}));


app.use('/api/auth', userRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/list', listRoute);
app.use('/api/input', inputRoute);
app.use('/api/history', historyRoute);



/************ render.com **********/
app.use(express.static(path.join(__dirname, 'build')));

if (process.env.NODE_ENV === 'production') {
    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'), function (err) {
            if (err) {
                res.status(500).send({ error: err, message: 'production' })
            }
        });
    })
};







const port = process.env.PORT || 3001;



app.listen(port, () => {
    console.log(`Connect port: ${port}`)
})

