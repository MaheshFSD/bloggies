const {Router} = require('express');
const User = require('../models/user.model');

const router = Router();
router.get('/login', (req,res) => {
    res.render('login')
})
router.post('/login', async (req,res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    res.send('User details...');
})
router.get('/signup', (req,res) => {

})
router.post('/signup', (req,res) => {

})

module.exports = router;

