const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const router = require('./routes');
const mongodb = require('./routes/data/database');


const port = process.env.PORT || 5500;

app.use('/', router);

mongodb.initDatabase((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database: listing; Server: running on Port: ${port}`);
        });
    }
});