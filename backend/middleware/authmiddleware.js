const jwt = require('jsonwebtoken'); 

const verifyUser = async(req,res,next)=>{
        const token = req.header('Authorization')?.replace('Bearer ', '');
    
        if (!token) {
            return res.status(401).json({ message: 'Access denied, no token provided' });
        }
    
        try {
            const decoded = jwt.verify(token, "JWT_SECRET" );
            req.user = decoded; 
            next();
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: 'Invalid token' });
        }
    }
    
module.exports = verifyUser