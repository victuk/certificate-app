require('rootpath')();
const express = require('express');
const app = express();
const path = require('path')
const cors = require('cors');
//const bodyParser = require('body-parser');
const errorHandler = require('_helpers/error-handler');
const mongoose = require('mongoose');
require('dotenv').config({path: __dirname + '/.env'})


mongoose.connect(process.env['database_link'], {useNewUrlParser: true, useUnifiedTopology: true}, function (error) {
    if(error) {
        console.log(error)
    } else {
        console.log("Connection was successful");
    }
});

 app.set('view engine', 'ejs');
 app.use('/static', express.static(path.join(__dirname, 'public')))
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// api routes
app.use('/', require('./view-routes/allroutes'));
app.use('/users', require('./users/users.controller'));
app.use('/posts', require('./users/user.posts'));
// global error handler
app.use(errorHandler);

// start server process.env.NODE_ENV === 'production' ? 80 :
const port = process.env.PORT || 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});