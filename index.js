const express = require('express');
const { connectToDB } = require('./configs/connection');
const dotenv = require('dotenv');
const ejs = require('ejs');
const path = require('path');

const PORT = 8000;
dotenv.config();
const app = express();
app.set('view engine', ejs);
app.set('views', path.resolve('./views')) // ejs setup

connectToDB(process.env.MONGODBURL)
.then(()=>{
    console.log('DB Connected.');
    app.listen(PORT, () => console.log('server started on - ', PORT));
})