var mongoose = require('mongoose');
require('../../../server/db/models'); //?Q: why is this necessary? This was used in FSG's members-only-test.js
var User = mongoose.model('User');

var expect = require('chai').expect; //?Q: is mocha available globally? can you not make chai available globally?

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI); //?Q: How is this working?

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Users Route', function() {

    beforeEach('Establish DB connection', function(done) {
        if (mongoose.connection.db) return done(); //?Q What exactly does done do?
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function(done) {
        clearDB(done); //?Q Is there a test database that's separate from the fgs-app database?
    });

    describe("Any user can create a new user, but no one can create an admin", function() {

        var legalNewUserInfo = {
            email: 'legal@legality.com',
            password: 'straightAndNarrow'
        };

        var illegalNewUserInfo = {
            email: 'stolenEmail@darkNode.com',
            password: 'yourPassword',
            isAdmin: true
        };
        //Q: By nesting these, will the database not be reset before
        describe("Unauthenticated request", function() {

            var guestAgent;

            beforeEach('Create guest agent', function() {
                guestAgent = supertest.agent(app);
            });

            it('when creating a user with a post request, should get a 200 response and have succesfully created a user in the db', function(done) {
                guestAgent
                    .post('/api/user/')
                    .send(legalNewUserInfo)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        User.findOne({
                            email: 'legal@legality.com'
                        }, function(err, docs) {
                            if (err) return done(err);
                            expect(docs.email).to.be.equal('legal@legality.com');
                            expect(docs.isAdmin).to.be.equal(false);
                            done();
                        })

                    });
            });

            it('when attempting to create an admin with a post request, user gets added to db but isAdmin gets set to false', function(done) {
                guestAgent
                    .post('/api/user/')
                    .send(illegalNewUserInfo)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        User.findOne({
                            email: 'stolenEmail@darkNode.com'
                        }, function(err, docs) {
                            if (err) return done(err);
                            expect(docs.isAdmin).to.be.equal(false);
                            done();
                        })
                    });
            });
        });

    });

    describe("Admin status", function() {

        var newUserInfo = {
            email: 'LivingOnAPrayer@aol.com',
            password: 'JonBonJovi'
        };

        var adminInfo = {
            email: 'testing@fsa.com',
            password: 'password',
            isAdmin: true
        };

        var adminStatus = {
            isAdmin: true
        };

        var adminAgent;
        var userAgent;
        var userAgentId;

        beforeEach('Create a new user', function(done) {
            User.create([newUserInfo, adminInfo], function(err, users) {
                userAgentId = users[0]._id;
                console.log(users[0]._id)
                done();
            });
        });

        beforeEach('Login user and admin', function(done) {
            adminAgent = supertest.agent(app);
            userAgent = supertest.agent(app);
            adminAgent.post('/login').send(adminInfo).end(function() {
                userAgent.post('/login').send(newUserInfo).end(done)
            });
        });

        it("Can be changed by an Admin", function(done) {
            adminAgent
                .put('/api/admin/users/' + userAgentId)
                .send(adminStatus)
                .expect(204)
                .end(function(err, res) {
                    if (err) return done(err);
                    User.findOne({
                        email: newUserInfo.email
                    }, function(err, newUser) {
                        if (err) return done(err);
                        expect(newUser.isAdmin).to.be.equal(true);
                        done();
                    });
                });
        });

        it("Can't be changed by a normal user", function(done) {
            userAgent
                .put('/api/admin/users/' + userAgentId)
                .send(adminStatus)
                .expect(403)
                .end(function(err, data) {
                    if (err) return done(err);
                    User.findById(userAgentId, function(err, user) {
                        if (err) return done(err)
                        expect(user.isAdmin).to.be.equal(false)
                        done();
                    })
                })
        });

    });
});
