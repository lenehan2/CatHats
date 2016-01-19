'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function (app) {

    var googleConfig = app.getValue('env').GOOGLE;

    var googleCredentials = {
        clientID: googleConfig.clientID,
        clientSecret: googleConfig.clientSecret,
        callbackURL: googleConfig.callbackURL
    };

    console.log('GOOGLE: ', googleCredentials);

    //this is the data coming back from google
    var verifyCallback = function (accessToken, refreshToken, profile, done) {
        // UserModel.findOne({ 'google.id': profile.id }).exec()
        // It makes more sense to me if we're searching for a user according to their email, not their google.id
        var profileEmail = profile.emails[0].value;
        UserModel.findOne({ 'email': profileEmail }).exec()
            .then(function (user) {

                if (user) {
                    return user;
                } else {
                    var newUserInfo = {
                        email: profileEmail,
                        google: {
                            id: profile.id
                        }
                    };
                    return UserModel.create(newUserInfo);
                }

            }).then(function (userToLogin) {
                done(null, userToLogin);
            }, function (err) {
                console.error('Error creating user from Google authentication', err);
                done(err);
            });

    };

    passport.use(new GoogleStrategy(googleCredentials, verifyCallback));

    //this is where the user requests login through google
    app.get('/auth/google', passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));

    //this is where google redirects our user after they've been authenticated
    app.get('/auth/google/callback', //corresponds to the callback we specified in 'env'
        passport.authenticate('google', { failureRedirect: '/login' }), //where is the successRedirect?
        function (req, res) {
            res.redirect('/');
        });

};
