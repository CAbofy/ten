/**
 * Created by ADMIN on 16-Dec-15.
 */
var mongoose = require('mongoose');
var user = require('../routes/models');

exports.updateUser = function (req, res) {
    console.log(req.body);

    User.findByIdAndUpdate(req.params.user_id,{$set:req.body}, function(err, result){
        if(err){
            console.log(err);
        }
        console.log("RESULT: " + result);
        res.send('Done')
    });
};
