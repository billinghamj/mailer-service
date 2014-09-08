var test = require('tape');
var request = require('supertest');
var app = require('../../app');
var ResilientMailer = require('resilient-mailer');

var validAuth = process.env.AUTHORIZATION_TOKEN;

app.set('env', 'test');

test('sends to mailer successfully', function (t) {
	t.plan(1);

	replaceMailer([successProvider], function (done) {
		request(app)
			.post('/messages')
			.set('Authorization', 'Bearer ' + validAuth)
			.send({ from: 'james@jamesbillingham.com', to: ['james.billingham@senselabs.com'], subject: 'testing', textBody: '123' })
			.expect(201)

			.end(function (err, res) {
				t.error(err);
				done();
			});
	});
});

test('fails as expected', function (t) {
	t.plan(1);

	replaceMailer([failureProvider], function (done) {
		request(app)
			.post('/messages')
			.set('Authorization', 'Bearer ' + validAuth)
			.send({ from: 'james@jamesbillingham.com', to: ['james.billingham@senselabs.com'], subject: 'testing', textBody: '123' })
			.expect(400)

			.end(function (err, res) {
				t.error(err);
				done();
			});
	});
});

test('recovers in the event of failure', function (t) {
	t.plan(1);

	replaceMailer([failureProvider, successProvider], function (done) {
		request(app)
			.post('/messages')
			.set('Authorization', 'Bearer ' + validAuth)
			.send({ from: 'james@jamesbillingham.com', to: ['james.billingham@senselabs.com'], subject: 'testing', textBody: '123' })
			.expect(201)

			.end(function (err, res) {
				t.error(err);
				done();
			});
	});
});

test('rejects invalid message', function (t) {
	t.plan(1);

	request(app)
		.post('/messages')
		.set('Authorization', 'Bearer ' + validAuth)
		.send({})
		.expect(400)
		.end(t.error);
});

function replaceMailer(providers, callback) {
	var originalMailer = app.get('mailer');
	var mailer = new ResilientMailer();

	for (var i = 0; i < providers.length; i++) {
		mailer.registerProvider(providers[i]);
	}

	app.set('mailer', mailer);

	callback(function () {
		app.set('mailer', originalMailer);
	});
}

var successProvider = {
	mail: function (message, callback) {
		callback();
	}
};

var failureProvider = {
	mail: function (message, callback) {
		callback(new Error('generic failure'));
	}
};
