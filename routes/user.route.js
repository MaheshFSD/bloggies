const {Router} = require('express');
const User = require('../models/user.model');

const router = Router();
router.get('/login', (req,res) => {
    res.render('login');
})
router.post('/login', async (req,res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    res.redirect('/');
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
    res.send('/');
})
router.get('/', (req,res) => {
    res.render('home');
})

module.exports = router;

