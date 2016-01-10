/**
 * Created by KESHU on 11-Dec-15.
 */
var Pusher = require('pusher');
var mongoose = require('mongoose');

var pusher = new Pusher({
    appId: 'YOUR APP ID',
    key: 'YOUR APP KEY',
    secret: 'YOUR APP SECRET'
});

// trigger on my_channel' an event called 'my_event' with this payload:

pusher.trigger('my_channel', 'my_event', {
    message: "hello world"
});