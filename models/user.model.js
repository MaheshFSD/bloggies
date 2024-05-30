const {Schema, model} = require('mongoose');
const { createHmac, randomBytes  } = require('node:crypto');

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String,
        default: 'images/profile.png'
    },
    role: {
        type: String,
        enum: ['ADMIN',"USER","DEV"],
        default: "USER"
    }
},
{
    timeStamps: true
});

userSchema.pre('save', function (next) {
    const user = this;
    console.log('Inside pre call....');
    if(!user.isModified("password")) return; 

    const salt = randomBytes(16).toString();
    const hashedPwd = createHmac('sha256', salt).update(user.password).digest('hex');
    console.log(hashedPwd, ' ------- pwd ----- ');
    this.salt = salt;
    this.password = hashedPwd;
    next()
})

const User = model('User', userSchema);
module.exports = User;