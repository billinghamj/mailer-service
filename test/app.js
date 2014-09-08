var test = require('tape');
var request = require('supertest');
var app = require('../app');

var validAuth = process.env.AUTHORIZATION_TOKEN;

app.set('env', 'test');

test('outputs human-friendly message from root', function (t) {
	t.plan(1);

	request(app)
		.get('/')
		.expect(404)
		.expect('Content-Type', /text\/html/)
		.expect('<p>This is only useful to computers. Documentation available <a href="//billinghamj.github.io/mailer-service/">here</a></p>')
		.end(t.error);
});

test('rejects unauthenticated', function (t) {
	t.plan(1);

	request(app)
		.get('/messages')
		.expect(401)
		.end(t.error);
});

test('rejects incorrect authentication', function (t) {
	t.plan(3);

	request(app)
		.get('/messages')
		.set('Authorization', 'asdf')
		.expect(401)
		.end(t.error);

	request(app)
		.get('/messages')
		.set('Authorization', 'Bearer some-random-invalid-key')
		.expect(401)
		.end(t.error);

	request(app)
		.get('/messages')
		.set('Authorization', 'MAC this-isnt-supported')
		.expect(401)
		.end(t.error);
});

test('rejects non-json output request', function (t) {
	t.plan(3);

	request(app)
		.get('/messages')
		.set('Authorization', 'Bearer ' + validAuth)
		.set('Accept', 'text/plain')
		.expect(406)
		.end(t.error);

	request(app)
		.get('/messages')
		.set('Authorization', 'Bearer ' + validAuth)
		.set('Accept', 'text/plain,text/html;q=0.8')
		.expect(406)
		.end(t.error);

	request(app)
		.get('/messages')
		.set('Authorization', 'Bearer ' + validAuth)
		.set('Accept', 'application/json')
		.expect(404)
		.end(t.error);
});

test('rejects non-json body', function (t) {
	t.plan(3);

	request(app)
		.post('/messages')
		.set('Authorization', 'Bearer ' + validAuth)
		.set('Content-Type', 'text/plain')
		.send('blah')
		.expect(415)
		.end(t.error);

	request(app)
		.post('/messages')
		.set('Authorization', 'Bearer ' + validAuth)
		.set('Content-Type', 'multipart/form-data')
		.send('blah')
		.expect(415)
		.end(t.error);

	request(app)
		.post('/messages')
		.set('Authorization', 'Bearer ' + validAuth)
		.set('Content-Type', 'application/x-www-form-urlencoded')
		.send('blah')
		.expect(415)
		.end(t.error);
});

test('rejects invalid json body', function (t) {
	t.plan(3);

	request(app)
		.post('/messages')
		.set('Authorization', 'Bearer ' + validAuth)
		.set('Content-Type', 'application/json')
		.send('{')
		.expect(400)
		.end(t.error);

	request(app)
		.post('/messages')
		.set('Authorization', 'Bearer ' + validAuth)
		.set('Content-Type', 'application/json')
		.send('{]')
		.expect(400)
		.end(t.error);

	request(app)
		.post('/messages')
		.set('Authorization', 'Bearer ' + validAuth)
		.set('Content-Type', 'application/json')
		.send('asdf')
		.expect(400)
		.end(t.error);
});

test('returns 404 from non-existing path', function (t) {
	t.plan(1);

	request(app)
		.get('/non-existing-path')
		.set('Authorization', 'Bearer ' + validAuth)
		.expect(404)
		.end(t.error);
});
