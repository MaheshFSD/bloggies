const {Router} = require('express');
const Blog = require('../models/blog.model');
const path = require('path')

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
            console.log('Above condition allows only png/jpg files only...');
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
    const {title, body, coverImageUrl} = req.body;
    console.log(req.body, req.file, ' =------------ body and file  -----');
    console.log(req.body);
    if(!title && !body ) return null;
    const blog = await Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImageUrl: req.file.path
    });
    console.log(blog, ' -------- the data posted -------- ');
    res.render('addBlog', {user: req.user})
})

module.exports = router;