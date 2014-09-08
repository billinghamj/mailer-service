module.exports = setup;

function setup(app) {
	app.post('/messages', create);
}

function create(req, res, next) {
	var mailer = req.app.get('mailer');

	mailer.mail(req.body, function (error) {
		if (error) {
			error.status = 400;
			next(error);
		} else {
			res.status(201).end();
		}
	});
}
