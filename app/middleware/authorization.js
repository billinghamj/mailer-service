module.exports = function (app) {
	app.set('authorization_token', process.env.AUTHORIZATION_TOKEN);

	return function (req, res, next) {
		var expected = 'Bearer ' + app.get('authorization_token');

		if (req.header('Authorization') == expected)
			next();

		else
			res.status(401).end();
	}
}
