/*
 * GET home page.
 */
var http = require('http');
var routes = require('../routes');
var  user = require('../routes/user');
var  register =require('../routes/register');
var  login =require('../routes/login');
var  chgpass =require('../routes/chgpass');
var  update =require('../routes/update');
var express = require('express');
var email,password,mobile,otp;

var StaticPages = module.exports = function StaticPages(){};
StaticPages.prototype = {

    initPages: function(app) {


        app.get('/', routes.index);
        app.use('/user', user.list);
        app.put('/update/:id', update.updateUser);
        //app.get('/register',register.user);

        app.post('/register',function(req,res){
            app.use(express.bodyParser());
            var email = req.body.email;
            var password = req.body.password;
            var mobile = req.body.mobile;
            var otp=req.body.otp;



            register.register(email,password,mobile,otp,function (found) {
                console.log(found);
                res.json(found);
            });
        });


        app.post('/login',function(req,res){
            app.use(express.bodyParser());
            var email = req.body.email;
            var password = req.body.password;

            login.login(email,password,function (found) {
                console.log(found);
                res.json(found);
            });
        });


        app.post('/api/chgpass', function(req, res) {
            app.use(express.bodyParser());
            var id = req.body.id;
            var opass = req.body.oldpass;
            var npass = req.body.newpass;

            chgpass.cpass(id,opass,npass,function(found){
                console.log(found);
                res.json(found);
            });
        });


        app.post('/api/resetpass', function(req, res) {
            app.use(express.bodyParser());
            var email = req.body.email;

            chgpass.respass_init(email,function(found){
                console.log(found);
                res.json(found);
            });
        });


        app.post('/api/resetpass/chg', function(req, res) {
            app.use(express.bodyParser());
            var email = req.body.email;
            var code = req.body.code;
            var npass = req.body.newpass;

            chgpass.respass_chg(email,code,npass,function(found){
                console.log(found);
                res.json(found);

            });
        });

        app.post('/notification', function(req, res){
            app.use(express.bodyParser());
            var message = req.param('message');
            pusher.trigger('notifications', 'new_notification', {
                message: message
            });
            res.send("Notification triggered!")
        });



    }

};