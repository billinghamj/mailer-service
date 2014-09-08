module.exports = function (app) {
	return function (req, res, next) {
		if (!req.accepts('json')) {
			res.status(406).end();
			return;
		}

		if (!req.header('Content-Type')) {
			next();
			return;
		}

		if (!req.is('json')) {
			res.status(415).end();
			return;
		}

		next();
	}
}
