var passport = require('passport'),
    passportLocal = require('passport-local'),
    LocalStrategy = passportLocal.Strategy;

var mongoose = require('mongoose');

var User = mongoose.model('User');

module.exports = function () {

    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({username: username}).exec(function (err, user) {
                if (user && user.authenticate(password))
                    return done(null, user);
                return done(null, false);
            });
        }
    ));

    passport.serializeUser(function (user, done) {
        if (user)
            done(null, user);
    });

    passport.deserializeUser(function (_id, done) {
        User.findOne({_id: _id}).exec(function (err, user) {
            if (user)
                return done(null, user);
            return done(null, false);
        });
    });
};
