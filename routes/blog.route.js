const {Router} = require('express');
const Blog = require('../models/blog.model');
const Comment = require('../models/comment.model');
const path = require('path');
const express = require('express');

const multer = require('multer');const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    //cb(null, path.resolve("./public/uploads/")); // or
      cb(null, './public/uploads/'); 
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  })
const upload = multer({storage,
    fileFilter: (req,file,cb) => {
        if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg') return cb(null, true);
        else {
            // console.log('Above condition allows only png/jpg files only...');
            cb(null,false);
        }
    },
    limits: {
        fileSize: 1024*10 // 10kb limit
    }
})
const router = Router();

router.get('/add-new', (req,res) => {
    res.render('addBlog', ({user: req.user}));
});

router.post('/add-new',upload.single('coverImageUrl'), async (req,res) => {
    const {title, body} = req.body;
    if(!title && !body ) return null;
    console.log(req.body,req.file, req.user, ' ---------- body and file and user------------');
    const blog = await Blog.create({
        title,
        body,
        createdBy: req.user?._id,
        coverImageUrl: `/uploads/${req.file.filename}`
    });
    console.log(blog, ' -------- the data posted -------- ');

    // res.render('addBlog', {user: req.user})
    if(!blog) return res.render('addBlog', {error: 'Something went wrong. Blog not created'})
    // const id = blog.createdBy;
    // req.body = body; 
    // res.redirect(`/blog/${id}`);
    res.render('home', {blog, user: req.user});
})
router.get('/:id', async (req,res) => {
    const blog = await Blog.findById(req.params.id);
    if(!blog) return res.render('addBlog', {error: 'could not found blog'});
    console.log(blog, ' --------- requsted blog data ---------');
    return res.render('blog', {user: req.user,blog});
})

router.post('/comment/:blogId', async (req,res) => {
    const blogId = req.params.blogId;
    // do some validation....
    if(!blogId) return res.render('blog', {user: req.user})
    const {content} = req.body;
    if(!content) return res.redirect('blog');
    const comment = await Comment.create({
        content,
        blogId,
        createdBy: req.user._id
    })
    console.log(comment, ' ============== comment =-======== ');
    return res.redirect(`/blog/${blogId}`);
})

module.exports = router;