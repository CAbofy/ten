/**
 * Created by KESHU on 09-Dec-15.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
    token : String,
    email: String,
    mobile:String,
    hashed_password: String,
    salt : String,
    temp_str:String
});

mongoose.connect('mongodb://cabofy:cabofy@123@ec2-52-90-43-158.compute-1.amazonaws.com:27017/dummy');
module.exports = mongoose.model('User', userSchema);
