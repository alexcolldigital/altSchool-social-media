const userInstance = require('../services/user.services');
const decodedToken = require('./decypt');

 const authorization = async(req, res, next) => {
    try{
        const token = await decodedToken(req);
        if(token== 'No token provided'){
            return res.status(401).json({
                message: 'No token provided', 
                success: false
            });
        }
        if(token== 'TokenExpiredError'){
            return res.status(401).json({
                message: 'Token has expired', 
                success: false
            });
        }
        if(!token){
            return res.status(401).json({
                message: 'Unauthorized', 
                success: false
            });
        }
        const user = await userInstance.findOneuser(token.foundUser._id);
        if(!user){
            return res.status(401).json({
                message: 'Unauthorized:',
                success: false
            });
        }
        if(user.emailVerified === false){
            return res.status(403).json({
                message: 'Email not verified',
                success: false
            });
        }
        req.user = user;
        next();  
    }catch(error){
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
}

module.exports = authorization;