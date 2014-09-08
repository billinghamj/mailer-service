var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');

var middleware = require('./middleware');
var routes = require('./routes');
var mailer = require('./mailer');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('authorization_token', process.env.AUTHORIZATION_TOKEN);
app.set('mailer', mailer());

app.get('/', function (req, res) {
	res.status(404);
	res.type('html');
	res.send('<p>This is only useful to computers. Documentation available <a href="//billinghamj.github.io/mailer-service/">here</a></p>');
});

app.use(middleware.authorization(app));
app.use(middleware.typeValidation(app));
app.use(bodyParser.json());

routes.setup(app);

app.all('*', function (req, res) {
	res.status(404).end();
});

var server = http.createServer(app);

function boot() {
	server.listen(app.get('port'), function () {
		console.info('Express server listening on port ' + app.get('port'));
	});
}

function shutdown() {
	server.close();
}

if (require.main === module) {
	boot();
} else {
	console.info('Running app as a module');
	exports.boot = boot;
	exports.shutdown = shutdown;
	exports.port = app.get('port');
}
