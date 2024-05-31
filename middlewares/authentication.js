const {verifyToken} = require('../services/auth')

const checkUserAuthentication = (req,res,next) => {
    const token = req.cookies?.token;
    if(!token) return next();
    const user = verifyToken(token);
    if(!user) return next();
    req.user = user;
    next();
}

module.exports = {checkUserAuthentication}