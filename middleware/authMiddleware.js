require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    let token;

    if ( req.headers.authorization.startsWith('Bearer')){
         token = req.headers.authorization.split(' ')[1];
    }

    if (!token){
        return res.status(401).json({message: 'Not authorised, no token'});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log('Decoded user from token:', req.user);
        next();
    }catch(error){
        return res.status(500).json({message: 'Token failed'});
    }
};