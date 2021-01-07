const express = require('express');
const router = express.Router();
const authuser = require('../users/users.controller');
const fetchAdminDetails = require('../users/users.controller');

router.get('/', function(req, res) {
   res.render("index");
});

router.get('/addcertificate', function (req, res) {
    res.render('add-new-certificate');
});

router.get('/login', function (req, res) {
    res.render('log-in');
    //res.render('testlogin');
})

router.get('/dashboard', function (req, res) {
    res.render('article-details');
});

router.get('/edit-user', function(req, res) {
    res.render('edit-cert');
});

router.get('/single-user', function (req, res) {
    res.render('single-user');
});
module.exports = router;