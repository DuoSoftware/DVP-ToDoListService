var restify = require('restify');
var logger = require('dvp-common/LogHandler/CommonLogHandler.js').logger;
var config = require('config');
var jwt = require('restify-jwt');
var mongoose = require('mongoose');
var secret = require('dvp-common/Authentication/Secret.js');
var authorization = require('dvp-common/Authentication/Authorization.js');
var todoservice = require('./Service/todo');
var util = require('util');
var port = config.Host.port || 3000;
var host = config.Host.vdomain || 'localhost';


var server = restify.createServer({
    name: "DVP Lite Ticket Service"
});

server.pre(restify.pre.userAgentConnection());
server.use(restify.bodyParser({ mapParams: false }));

restify.CORS.ALLOW_HEADERS.push('authorization');
server.use(restify.CORS());
server.use(restify.fullResponse());

server.use(jwt({secret: secret.Secret}));


var mongoip=config.Mongo.ip;
var mongoport=config.Mongo.port;
var mongodb=config.Mongo.dbname;
var mongouser=config.Mongo.user;
var mongopass = config.Mongo.password;



var mongoose = require('mongoose');
var connectionstring = util.format('mongodb://%s:%s@%s:%d/%s',mongouser,mongopass,mongoip,mongoport,mongodb)


mongoose.connection.on('error', function (err) {
    throw new Error(err);
});

mongoose.connection.on('disconnected', function() {
    throw new Error('Could not connect to database');
});

mongoose.connection.once('open', function() {
    logger.debug("Connected to db");
});


mongoose.connect(connectionstring);




server.post('/DVP/API/:version/ToDo', authorization({resource:"todo", action:"write"}), todoservice.CreateToDo);
server.post('/DVP/API/:version/ToDo/:id/Reminder', authorization({resource:"remind", action:"write"}), todoservice.RemindToDo);
server.get('/DVP/API/:version/ToDoList', authorization({resource:"todo", action:"read"}), todoservice.GetToDoListActive);
server.get('/DVP/API/:version/ToDo/:id', authorization({resource:"todo", action:"read"}), todoservice.GetToDoActive);
server.del('/DVP/API/:version/ToDo/:id', authorization({resource:"todo", action:"delete"}), todoservice.DeleteToDo);
server.put('/DVP/API/:version/ToDo/:id/Check', authorization({resource:"todo", action:"write"}), todoservice.UpdateToDoCheck);
server.put('/DVP/API/:version/ToDo/:id/Note', authorization({resource:"todo", action:"write"}), todoservice.UpdateToDoNote);
server.put('/DVP/API/:version/ToDo/:id/Snooze/:time', authorization({resource:"todo", action:"write"}), todoservice.UpdateToDoSnooze);

server.listen(port, function () {

    logger.info("DVP-ToDoListService.main Server %s listening at %s", server.name, server.url);
});

