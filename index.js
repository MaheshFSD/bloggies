const express = require('express');
const { connectToDB } = require('./configs/connection');
const dotenv = require('dotenv');
const ejs = require('ejs');
const path = require('path');
const userRoute = require('./routes/user.route')
const cookieParser = require('cookie-parser');
const {checkUserAuthentication} = require('./middlewares/authentication');
const blogRoute = require('./routes/blog.route')
const multer  = require('multer')
dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views')) // ejs setup
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(checkUserAuthentication);
app.use(express.static(path.resolve('./public')))
app.use('/blog', blogRoute)

app.use('/user', userRoute)
connectToDB(process.env.MONGODBURL)
.then(()=>{
    console.log('DB Connected.');
    app.listen(PORT, () => console.log('server started on - ', PORT));
})