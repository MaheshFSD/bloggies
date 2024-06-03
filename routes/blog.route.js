const {Router} = require('express');
const Blog = require('../models/blog.model');

const router = Router();

router.get('/add-new', (req,res) => {
    res.render('addBlog', ({user: req.user}));
});
router.post('/add-new', async (req,res) => {
    const {title, body, uploadCoverImage} = req.body;
    console.log(req.body);
    if(!title && !body ) return null;
    const blog = await Blog.create({
        title,
        body,
        createdBy: req.user._id
    });
    console.log(blog, ' -------- the data posted -------- ');
    res.render('addBlog', {user: req.user})
})

module.exports = router;