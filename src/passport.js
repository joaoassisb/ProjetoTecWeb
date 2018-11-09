'use strcit';

const Usuario = require('./api/usuario/usuario.model.js');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		Usuario.findById(id, (err, user) => {
			done(err, user);
		});
	});

	passport.use('local-login', new LocalStrategy(
		((username, password, done) => {
			Usuario.findOne({username: username}, (err, user) => {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false);
				}
				if (!user.validPassword(password)) {
					return done(null, false);
				}
				done(null, user);
			});
		})));
};
