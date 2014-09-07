var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);

function authorize(req, res, next) {
	if (req.session && req.session.admin)
		return next();

	else
		return res.status(401).end();
}

app.all('/', authorize);
app.post('/messages', routes.message.create);

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
