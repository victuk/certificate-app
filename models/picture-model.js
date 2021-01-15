const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    first_name: String,
    last_name: String,
    other_names: String,
    email: String,
    certificate: {
        data: Buffer,
        contentType: String
    }
})

const userSchWithPic = mongoose.model('UserDetailsWithPicture', UserSchema)

module.exports = userSchWithPic;