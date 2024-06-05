const {Schema, model} = require('mongoose');

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timeStamps: true
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;