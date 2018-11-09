'use strict';

module.exports = function(app, passport) {
	app.post('/login', passport.authenticate('local-login'), (req, res) => {
		res.sendStatus(200);
	});
};
