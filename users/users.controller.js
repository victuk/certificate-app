const express = require('express');
const router = express.Router();
//const authuser = require('./user.service');
const {authuser, fetchAdminDetails} = require('./user.service');
//const fetchAdminDetails = require('./user.service');
const {authorizeUser, authorizeAdmin} = require('_helpers/authorize')
const Role = require('_helpers/role');
const jwt = require('jsonwebtoken');
const config = require('config.json');
const adminModel = require('../models/admin-model');
const userModel = require('../models/user-model');
const userWithPicture = require('../models/picture-model')
const bcrypt = require('bcryptjs');

var multer = require('multer');
var path = require('path');
var fs = require('fs');

require('dotenv').config({path: __dirname + '/.env'})


router.post('/nonsense', function(req, res) {
    console.log(req.body);
    console.log(req.body['userInfo.fname']);
})

router.post('/newAdmin', function(req, res) {
    const first_name = req.body.fname;
    const last_name = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;

    if(first_name == undefined || last_name == undefined || email == undefined || password == undefined) {
        //return res.send(last_name + " "  + first_name)
        res.send("Please supply all input")
    
    } else {
        adminModel.findOne({email}, (error, user) => {
            if(user) {
               res.send("Admin already exists");
            } else if (error) {
                res.send("There was an error " + error);
            } else {
                const newAdmin = new adminModel({
                    first_name,
                    last_name,
                    email,
                    password: bcrypt.hashSync(password, 10)
                });
            
                newAdmin.save()
                .then(data => {
                    res.status(201).send({email:data.email, created: "True"})
                })
                .catch(err => {
                    res.send(err)
                })
            }
        })
        
    }

    

});



router.post('/login-admin', function(req, res) {
    if (req.body.email && req.body.password) {
        const email = req.body.email;
        const password = req.body.password;
        adminModel.findOne({email}, (err, user) => {
            if (!user) {
                res.status(404).json({ message: 'The user does not exist!' });
            } else if (err) {
                console.log(err);
            } else {
                bcrypt.compare(password, user.password, (error, isMatch) => {
                    
                    if (isMatch) {
                        const payload = { id: user.id };
                        const token = jwt.sign(payload, process.env.secret);
                        res.json({ message: 'ok', token });
                    } else {
                        res.status(401).json({
                            message: 'The password is incorrect!'
                        });
                    }
                    if (error) {
                        res.send("There is an error")
                    };
                });
            }
        });
    } else {
        res.send("Your input fields are not complete");
    }
});

router.get('/getuser/singleuser', function(req, res) {
    userModel.findById(req.query.user, function(err, user) {
        if (err) {
            res.send(err);
        }
        res.send(user)
    });
});

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload')
    },
    filename: (req, file, cb) => {
        cb(null, 'new-' + Date.now())
    }
});
 
var upload = multer({ storage: storage});

router.post('/add-with-pic', upload.single('userInfo.certPic'), function(req, res) {
    const newUserWithPic = new userWithPicture({
        first_name: req.body['userInfo.fname'],
        other_names: req.body['userInfo.othernames'],
        last_name: req.body['userInfo.lname'],
        email: req.body['userInfo.email'],
        certificate: {
            data: fs.readFileSync(path.join(__dirname + '/upload/' + req.file.filename)),
            contentType: 'image/png'
        }
    })
    newUserWithPic.save()
    .then(res.status(200).send('Successful'))
    .catch(err => {
        res.send(err);
        // console.log(err)
    });
});

router.get('/getimg', function(req, res) {
    userWithPicture.find(function(err, response) {
        if (err) {return console.log(err)}
        res.send(response)
    })
})

router.post('/add-user', /*authuser,*/ function(req, res) {
    const newUser = new userModel({
    first_name: req.body['userInfo.fname'],
    other_names: req.body['userInfo.othernames'],
    last_name: req.body['userInfo.lname'],
    email: req.body['userInfo.email'],
    // certificate: {
    //     data: fs.readFileSync(req.body.userInfo.certPic),
    //     contentType: 'image/png'
    // },
    gender: req.body['userInfo.gender'],
    lga: req.body['userInfo.lga']
})

    newUser.save()
    .then(res.status(200).send('<script>alert("Successful"); location.assign("/dashboard")</script>'))
    .catch(err => {
        res.send(err)
    });
})


router.post('/edit-user', function(req, res) {

    userModel.findById(req.body['userInfo.userID'], function(error, user) {
        if(error) {
            return console.log(error);
        }
        user.first_name = req.body['userInfo.fname'];
        user.other_names = req.body['userInfo.othernames'];
        user.last_name = req.body['userInfo.lname'];
        user.email = req.body['userInfo.email'];
        user.gender = req.body['userInfo.gender'];
        user.lga = req.body['userInfo.lga'];

        user.save(function (error, user) {
            if (error) { console.log(error); }
            console.log(user)
                res.send('<script>alert("Successful"); location.assign("/dashboard")</script>');
                
            })
    });
})

router.get('/cert-no', function(req, res) {
    const certNo = req.body.certNo;
    userModel.findById(certNo, function(err, details) {
        res.send(details);
    });
})

router.get('/all-students', function(req, res) {
    userModel.find((err, user) => {
        if (err) {
            res.send(err)
        }
        res.send(user)
    });
})

router.delete('/stid/:id', function(req, res) {
    userModel.findByIdAndDelete(req.params.id, function(err, user) {
        if(err) {
           return  res.send(err);
        }
        res.json({message: "deleted"});
    });
});

module.exports = router;
