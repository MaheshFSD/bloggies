const {verifyToken} = require('../services/auth')

const checkUserAuthentication = (req,res,next) => {
    const token = req.cookies?.token;
    console.log(token, ' ---------- token from middleware checking auth -------- ');
    if(!token) return next();
    const user = verifyToken(token);
    if(!user) return next();
    req.user = user;
    return next();
}

module.exports = {checkUserAuthentication}