const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String
})

const Adminsch = mongoose.model('AdminDetails', adminSchema)
module.exports = Adminsch;