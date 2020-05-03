var restify = require('restify');
var logger = require('dvp-common/LogHandler/CommonLogHandler.js').logger;
var config = require('config');
var jwt = require('restify-jwt');
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
var mongomodels = require("dvp-mongomodels");


server.post('/DVP/API/:version/ToDo', authorization({resource:"todo", action:"write"}), todoservice.CreateToDo);
server.post('/DVP/API/:version/ToDo/:id/Reminder', authorization({resource:"remind", action:"write"}), todoservice.RemindToDo);
server.put('/DVP/API/:version/ToDo/:id/Reminder', authorization({resource:"todo", action:"write"}), todoservice.UpdateToDoReminder);
server.get('/DVP/API/:version/ToDoList', authorization({resource:"todo", action:"read"}), todoservice.GetToDoListActive);
server.get('/DVP/API/:version/ToDo/:id', authorization({resource:"todo", action:"read"}), todoservice.GetToDoActive);
server.del('/DVP/API/:version/ToDo/:id', authorization({resource:"todo", action:"delete"}), todoservice.DeleteToDo);
server.put('/DVP/API/:version/ToDo/:id/Check', authorization({resource:"todo", action:"write"}), todoservice.UpdateToDoCheck);
server.put('/DVP/API/:version/ToDo/:id/Note', authorization({resource:"todo", action:"write"}), todoservice.UpdateToDoNote);
server.put('/DVP/API/:version/ToDo/:id/Snooze/:time', authorization({resource:"todo", action:"write"}), todoservice.UpdateToDoSnooze);
server.get('/DVP/API/:version/user/:id/ToDoList', authorization({resource:"todo", action:"read"}), todoservice.GetUserToDoList);

server.listen(port, function () {

    logger.info("DVP-ToDoListService.main Server %s listening at %s", server.name, server.url);
});

