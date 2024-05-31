const {Router} = require('express');
const User = require('../models/user.model');

const router = Router();
router.get('/login', (req,res) => {
    res.render('login');
})
router.post('/login', async (req,res) => {
    const {email, password} = req.body;
    const user = await User.matchPassword(email,password);
    // console.log(user, '------- received user -----');
    // console.log(user.fullName, '------- received user -----');
    // console.log(user.email, '------- received user -----');
    // console.log(user.password, '------- received user -----');
    // console.log(user.role, '------- received user -----');
    // for now we just redirect it
    res.render('home', {fullname: user._doc.fullName});
})
router.get('/signup', (req,res) => {
    res.render('signup');
})
router.post('/signup', (req,res) => {
    const {fullName, email, password} = req.body;
    const user = User.create({
        fullName,
        email,
        password
    });
    if(!user) return res.redirect('/user/signup');
    res.redirect('/user/login');
})
router.get('/', (req,res) => {
    res.render('home');
})

module.exports = router;

