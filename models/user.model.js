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
    if(!user.isModified("password")) return; 

    const salt = randomBytes(16).toString();
    const hashedPwd = createHmac('sha256', salt).update(user.password).digest('hex');
    this.salt = salt;
    this.password = hashedPwd;
    next()
})

userSchema.static('matchPassword', async function (email,password) {
    console.log(email, password, ' -------- params -----');
    const user = await this.findOne({email});
    if(!user) throw new Error('User not Found');
    const hashpwd = createHmac('sha256', user.salt).update(password).digest('hex');
    if(hashpwd !== user.password) throw new Error('Incorrect password...');
    // return {...user._doc, password: undefined, salt: undefined}; // check this...
    return {...user, password: undefined, salt: undefined};
})
const User = model('User', userSchema);
module.exports = User;