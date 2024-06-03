const {Router} = require('express');
const User = require('../models/user.model');
const {createToken, verifyToken} = require('../services/auth');

const router = Router();
router.get('/login', (req,res) => {
    res.render('login');
})
router.post('/login', async (req,res) => {
    const {email, password} = req.body;

    // const user = await User.matchPassword(email,password);
    // here in the above line instead of user we can receive jwt token 
    
    // const token = await User.matchPassword(email,password); 
    if(!req.user && !req.cookies?.token){
        try {
            const token = await User.matchPasswordAndGenerateToken(email,password); // changing the name from matchPassword to matchPasswordAndGenerateToken
            // just to get user we user verify token
            if(!token) return res.render('login', {error: 'Wrong email or password'});
            const user = verifyToken(token);
            req.user = user
            res.cookie('token', token).render('home',{user});
        } catch (error) {
            res.render('login', {error: "incorrect email or password"})
        }
    }
    else {
        console.log(req.user, ' =========== req.user -========= ');
        console.log(req.cookies, ' =========== req.user -========= ');
        // console.log(verifyToken(req.cookies?.token), ' =========== req.user -========= ');
        // console.log(req.user === verifyToken(req.cookies?.token), ' =========== req.user -========= ');
        // const verifiedUser = verifyToken(req.cookies?.token);
        // if(req.user['email'] === verifiedUser['_id']) {
        //     console.log(' ------inside authorized user ------ ');
        //     res.render('home', {user: req.user});
        // }
        // else return res.render('login', {
        //     error: "Wrong email or password."
        // })
        if(req.user && req.cookies?.token) return res.render('home', {user: req.user});
        else {
            res.clearCookie('token');
            return res.render('login', {
                error: "Wrong email or password."
            })
        }
    }
    // Now we keep  everytjhing inside try catch block

    // console.log(user, '------- received user -----');
    // console.log(user.fullName, '------- received user -----');
    // console.log(user.email, '------- received user -----');
    // console.log(user.password, '------- received user -----');
    // console.log(user.role, '------- received user -----');
    // for now we just redirect it


    // const token = createToken(this)
    // console.log(token, ' ---------- jwt token i created --------');
    // res.cookie('token', token);
    // res.render('home', {fullname: user._doc.fullName});
    // res.render('home')
})
router.get('/signup', (req,res) => {
    res.render('signup');
})
router.get('/logout', (req,res) => {
    req.user=null;
    res.clearCookie('token').render('login');
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
router.get('/addBlog', (req,res) => {
    res.render('addBlog');
});

module.exports = router;

