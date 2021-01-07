const jwt = require('express-jwt');
const { secret } = require('config.json');

module.exports = {authorizeAdmin, authorizeUser};

function authorizeAdmin(req, res, next) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (req.body.role == "Admin") {
        next();
    }

    else if (req.body.role == "User") {
        res.send("You are not allowed access in here")
    }
    
        // authenticate JWT token and attach user to request object (req.user)
        // jwt({ secret, algorithms: ['HS256'] }),
        
        
        // authorize based on user role
        //    console.log(secret)
        //     if (roles.length && !roles.includes(req.user.role)) {
        //         // user's role is not authorized
        //         return res.status(401).json({ message: 'Unauthorized' });
        //     }

            // authentication and authorization successful
            
        
}

function authorizeUser (req, res, next) {
    if (req.body.role == "User" || req.body.role == "Admin") {
        next();
    }
}