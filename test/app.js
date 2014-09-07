var test = require('tape');
var app = require('../app');

test('correct types exported', function (t) {
	t.equal(typeof app.boot, 'function');
	t.equal(typeof app.shutdown, 'function');
	t.equal(typeof app.port, 'number');

	t.end();
});
