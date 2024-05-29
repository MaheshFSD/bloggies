const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: truw,
        unique: true
    },
    salt: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
},
{
    timeStamps: true
});

const User = model('User', userSchema);
module.exports = User;