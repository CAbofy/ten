
/*
 * GET users listing.
 */
var mongoose = require('mongoose');
var user = require('../routes/models');

exports.list = function(req, response,callback){

  //user find by token
    user.find({token:req.query.token || req.body.token || req.headers['x-access-token']},function (err, User) {
        if (!err) {
            callback(response.send(User));
        } else {
            callback(response={success:"0"});
        }
    });

  //all user list
  /* user.find(function (err, User) {
   if (!err) {
   return res.send(User);
   } else {
   return console.log(err);
   }
   });
   */

};