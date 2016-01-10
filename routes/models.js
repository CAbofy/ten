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

mongoose.connect('mongodb://localhost:27017/test');
module.exports = mongoose.model('User', userSchema);