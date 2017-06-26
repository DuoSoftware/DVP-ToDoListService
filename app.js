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


var util = require('util');
var mongoip=config.Mongo.ip;
var mongoport=config.Mongo.port;
var mongodb=config.Mongo.dbname;
var mongouser=config.Mongo.user;
var mongopass = config.Mongo.password;
var mongoreplicaset= config.Mongo.replicaset;

var mongoose = require('mongoose');
var connectionstring = '';
mongoip = mongoip.split(',');
if(util.isArray(mongoip)){
     if(mongoip.length > 1){    

    mongoip.forEach(function(item){
        connectionstring += util.format('%s:%d,',item,mongoport)
    });

    connectionstring = connectionstring.substring(0, connectionstring.length - 1);
    connectionstring = util.format('mongodb://%s:%s@%s/%s',mongouser,mongopass,connectionstring,mongodb);

    if(mongoreplicaset){
        connectionstring = util.format('%s?replicaSet=%s',connectionstring,mongoreplicaset) ;
    }
     }
    else
    {
        connectionstring = util.format('mongodb://%s:%s@%s:%d/%s',mongouser,mongopass,mongoip[0],mongoport,mongodb);
    }
}else{

    connectionstring = util.format('mongodb://%s:%s@%s:%d/%s',mongouser,mongopass,mongoip,mongoport,mongodb);
}

console.log(connectionstring);

mongoose.connect(connectionstring,{server:{auto_reconnect:true}});


mongoose.connection.on('error', function (err) {
    console.error( new Error(err));
    mongoose.disconnect();

});

mongoose.connection.on('opening', function() {
    console.log("reconnecting... %d", mongoose.connection.readyState);
});


mongoose.connection.on('disconnected', function() {
    console.error( new Error('Could not connect to database'));
    mongoose.connect(connectionstring,{server:{auto_reconnect:true}});
});

mongoose.connection.once('open', function() {
    console.log("Connected to db");

});


mongoose.connection.on('reconnected', function () {
    console.log('MongoDB reconnected!');
});



process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

//var mongoip=config.Mongo.ip;
//var mongoport=config.Mongo.port;
//var mongodb=config.Mongo.dbname;
//var mongouser=config.Mongo.user;
//var mongopass = config.Mongo.password;
//
//
//
//var mongoose = require('mongoose');
//var connectionstring = util.format('mongodb://%s:%s@%s:%d/%s',mongouser,mongopass,mongoip,mongoport,mongodb)
//
//
//mongoose.connection.on('error', function (err) {
//    throw new Error(err);
//});
//
//mongoose.connection.on('disconnected', function() {
//    throw new Error('Could not connect to database');
//});
//
//mongoose.connection.once('open', function() {
//    logger.debug("Connected to db");
//});
//
//
//mongoose.connect(connectionstring);




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

