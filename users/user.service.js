const adminModel = require('../models/admin-model');
const jwt = require('jsonwebtoken');


function fetchAdminDetails(req, res, next) {
    adminModel.findById(req.body.decoded.id, function(err, user) {
        if(err) {
            console.log(err);
        }
        const {password, ...othe} = user._doc;
        req.admDetails = othe
        next();
    })
 }




function authuser (req, res, next) {
    const token = req.body.token;
    
    if(token){
        
        jwt.verify(token, process.env.secret, function(err, decoded){   
            if(err){
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.body.decoded = decoded;
                next();
            }
        })
    } else {
        res.send('You will need to login');
    }
}

module.exports = {authuser, fetchAdminDetails};
// module.exports = fetchAdminDetails;