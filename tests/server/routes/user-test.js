
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
		mongoose.connect(dbURI, done)
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);	//?Q Is there a test database that's separate from the fgs-app database?
	})

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
				})
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
				})
			})
		})

//==========================================================================================
	})
})


//guest can't hit /user route
//non-admin can't hit admin route
//non-admin should not be able to retrieve all users
//a user should not be able to get another user's orders unless they're an admin
//a user should not be able to get another user's cart

