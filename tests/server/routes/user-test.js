
var mongoose = require('mongoose');
require('../../../server/db/models'); //?Q: why is this necessary? This was used in FSG's members-only-test.js
var User = mongoose.model('User');

var expect = require('chai').expect; //?Q: is mocha available globally? can you not make chai available globally?

var dbURI = 'monodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbUri);	//?Q: How is this working?

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Users Route', function () {

	beforeEach('Establish DB connection', function(done) {
		if (mongoose.connection.db) return done();	//?Q What exactly does done do?
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);	//?Q Is there a test database that's separate from the fgs-app database?
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

			beforeEach('Create guest agent', function () {
				guestAgent = supertest.agent(app);
			});

			it('when creating a user with a post request, should get a 200 response and have succesfully created a user in the db', function (done) {
				guestAgent
				.post('/api/users/')
				.send(legalNewUserInfo)
				.expect(200)
				.end(function (err, res) {
					if (err) return done(err);
					User.find({ email: 'legal@legality.com' }).exec()
					.then(function(user) {
						expect(user.email).to.be.equal('legal@legality.com');
						expect(user.isAdmin).to.be.equal(false);
						done();
					}, done);
				});
			});

			it('when attempting to create an admin with a post request, should get a 403 response and no user should have persisted to the db', function (done) {
				guestAgent
				.post('/api/users/')
				.send(illegalNewUserInfo)
				.expect(403)
				.end(function (err, res) {
					if(err) return done(err);
					User.find({ email: 'stolenEmail@darkNode.com'}).exec()
					.then(function(user) {
						expect(user).to.not.exist;
						done();
					}, done);
				});
			});
		});

		describe("Authenticated request", function() {

			var loggedInAgent;

			var userInfo = {
				email: 'joe@gmail.com',
				password: 'shoopdawoop'
			};

			beforeEach('Create a user', function () {
				User.create(userInfo, done);
			});

			beforeEach('Create loggedIn user agent and authenticate', function (done) {
				loggedInAgent = supertest.agent(app);
				loggedInAgent.post('/login').send(userInfo).end(done);
			});

			it('when attempting to create an admin with a post request, should get a 403 response and no user should have persisted to the db', function (done) {
				loggedInAgent
				.post('/api/users/')
				.send(illegalNewUserInfo)
				.expect(403)
				.end(function (err, res) {
					if(err) return done(err);
					User.find({ email: 'stolenEmail@darkNode.com'}).exec()
					.then(function(user) {
						expect(user).to.not.exist;
						done();
					}, done);
				});
			});
		});

		describe("Admin request", function() {

			var adminAgent;

			var adminInfo = {
				email: 'testing@fsa.com',
				password: 'password'
			};

			beforeEach('Set admin agent to "testing@fsa.com" and authenticate', function (done) {
				adminAgent = supertest.agent(app);
				adminAgent.post('/login').send(adminInfo).end(done);
			});

			it('when attempting to create an admin with a post request, should get a 403 response and no user should have persisted to the db', function (done) {
				adminAgent
				.post('/api/users/')
				.send(illegalNewUserInfo)
				.expect(403)
				.end(function (err, res) {
					if(err) return done(err);
					User.find({ email: 'stolenEmail@darkNode.com'}).exec()
					.then(function(user) {
						expect(user).to.not.exist;
						done();
					}, done);
				});
			});
		});
	});

	describe("An admin can change a user's isAdmin status", function() {

		var newUserInfo = {
			_id: 2,
			email: 'LivingOnAPrayer@aol.com',
			password: 'JonBonJovi'
		};

		var adminInfo = {
			email: 'testing@fsa.com',
			password: 'password'
		};

		var adminStatus = {
			isAdmin: true
		};
		
		beforeEach('Create a new user', function(done) {
			User.create(newUserInfo, done);
		});

		beforeEach('Set admin agent to "testing@fsa.com" and authenticate', function (done) {
			adminAgent = supertest.agent(app);
			adminAgent.post('/login').send(adminInfo).end(done);
		});

		it("should get a 204 response and the change in newUser's status should have persisted to the db", function(done) {
			adminAgent
			.put('/api/admin/users/2')
			.send(adminStatus)
			.expect(204)
			.end(function (err, res) {
				if (err) return done(err);
				User.find(newUserInfo).exec()
				.then(function(newUser) {
					expect(newUser.isAdmin).to.be.equal(true);
					done();
				}, done);
			});
		});
	});

 	describe("An non-admin can NOT change their own isAdmin status", function() {

		var wouldBeAdminUserInfo = {
			_id: 3,
			email: 'Meatloaf@aol.com',
			password: 'BatOutOfHell'
		};

		var adminStatus = {
			isAdmin: true
		};
		
		beforeEach('Create a new user', function(done) {
			User.create(wouldBeAdminUserInfo, done);
		});

		beforeEach('Create a logged in agent and authenticate', function (done) {
			loggedInAgent = supertest.agent(app);
			loggedInAgent.post('/login').send(wouldBeAdminUserInfo).end(done);
		});

		it("should get a 403 response and the wouldBeAdminUser's isAdmin status should STILL be false", function(done) {
			loggedInAgent
			.put('/api/admin/users/3')
			.send(adminStatus)
			.expect(403)
			.end(function (err, res) {
				if (err) return done(err);
				User.find(wouldBeAdminUserInfo).exec()
				.then(function(wouldBeAdmin) {
					expect(wouldBeAdmin.isAdmin).to.be.equal(false);
					done();
				}, done);
			});
		});
	});
});