const jwt = require('jsonwebtoken');

const createToken = (user) => {
    const {_id,email,role,fullName,} = user;
    const token = jwt.sign({
        _id,
        email,
        role,
        fullName
    },
    process.env.secret);
    return token
}

const verifyToken = (token) => {
    const user = jwt.verify(token, secret);
    if(!user) return null
}

module.exports = {createToken, verifyToken}