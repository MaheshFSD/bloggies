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
    try {
        const user = jwt.verify(token, process.env.secret);
        if(!user) return null
        return user;
    } catch (error) {
        return null;
    }
}

module.exports = {createToken, verifyToken}