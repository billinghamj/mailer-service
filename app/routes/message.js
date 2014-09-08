module.exports = setup;

function setup(app) {
	app.post('/messages', create);
}

function create(req, res, next) {
}
