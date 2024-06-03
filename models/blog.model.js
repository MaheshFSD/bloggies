const {Schema, model} = require('mongoose');

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    coverImageUrl: {
        type: String,
        required: false
    },
    createdBy: Schema.Types.ObjectId,
    ref: 'User'
},
{timeStamps: true});

const Blog = model('Blog', blogSchema);
 
module.exports = Blog;