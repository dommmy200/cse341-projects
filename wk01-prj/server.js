const express = require('express');
const dotenv = require('dotenv');

const app = express();

dotenv.config();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Welcome to base URL');
});

app.listen(port, () => {
    console.log(`Server is listening on Port: ${port}`);
});