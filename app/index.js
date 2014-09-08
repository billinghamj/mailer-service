var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');

var middleware = require('./middleware');
var routes = require('./routes');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('authorization_token', process.env.AUTHORIZATION_TOKEN);

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
