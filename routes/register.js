var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require('mongoose');
var user = require('../routes/models');
var email,password,mobile,token,otp;

exports.register = function(email,password,mobile,otp,callback) {

    var x = email;
    if(!(x.indexOf("@")==x.length)){
        if (password.length >= 4) {

            var temp =rand(160, 36);
            var newpass = temp + password;
            var token = crypto.createHash('sha512').update(email +rand).digest("hex");
            var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");

            var newuser = new user({
                token: token,
                email: email,
                hashed_password: hashed_password,
                mobile : mobile,
                otp:otp,
                salt :temp });

            user.find({email: email},function(err,User){

                var len = User.length;

                if(len == 0){
                /*    newuser.save(function (err) {

                        callback(response={success:"1",
                            'token':token  });

                    });*/

                    user.find({mobile: mobile},function(err,User){

                        var l = User.length;

                        if(l == 0){

                            newuser.save(function (err) {

                                var phone=mobile;
                                var msg='OTP is ' +otp ;


                                var v='http://bhashsms.com/api/sendmsg.php?user=CABofy&pass=cabofy@123&sender=CABofy&phone='+phone+'&text='+msg+'&priority=ndnd&stype=normal';
                                var request = require('request');

                                request(v, function (error, response, body) {
                                    if (!error && response.statusCode == 200) {
                                        console.log(body) // Show the HTML for the Google homepage.
                                    }
                                })


                                callback(response={success:"1",
                                    'token':token  });

                            });
                        }else{


                            callback({'response':"Mobile alrerady register"});
                        }});

                }else{


                    callback({'response':"Email already Registered"});
                }});


        }else{

            callback({'response':"Password Weak"});

        }}else{

        callback({'response':"Email Not Valid"});
    }
}