const express = require('express');
const router = express.Router();
const userAuthentication = require('./users.controller')
const Role = require('_helpers/role');
const jwt = require('jsonwebtoken');
const config = require('config.json');

const post = [
    {postId: 1, userId: 2, title: 'Using Html', body: 'This is how to use html', author: "Victor Peter"},
    {postId: 2, userId: 3, title: 'Using css', body: 'This is how to use css', author: "Gold"}
];

router.get('/', authuser, function(req, res){
    let getPost = [];
    post.forEach(post => {
        getPost.push(post)
    })
    res.send(getPost);
})

router.get('/:id', authuser, function(req, res){
    
    post.forEach(post => {
        if (req.body.id == post.userId) {

        }
    })
})

function authuser (req, res, next) {
    const token = req.body.token;
    
    if(token){
        
        jwt.verify(token, config.secret, function(err, decoded){   
            if(err){
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                next();
            }
        })
    } else {
        res.send('You will need to login');
    }
}

module.exports = router;