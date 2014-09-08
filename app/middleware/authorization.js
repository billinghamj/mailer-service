module.exports = function (app) {
	return function (req, res, next) {
		var expected = 'Bearer ' + app.get('authorization_token');

		if (req.header('Authorization') == expected)
			next();

		else
			res.status(401).end();
	}
}
