// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

xdescribe('Cart Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	xdescribe('Unauthenticated user requesting cart', function () {

		var guestAgent;

		var product = {product: '56968d063204a514981c4d84', quantity: 2};

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);
		});

		it('should get a 200 response', function (done) {
			guestAgent.get('/api/cart')
				.expect(200)
				.end(function (err, response) {
				if (err) return done(err);
				expect(response.body).to.be.an('array');
				done();
			});
		});

		it('should add an item to the users cart',function(done){
			guestAgent.post('/api/cart').send(product).end(function(err,response){
				if(err) return done(err);
				expect(response.body).to.be.an('array');
				
				guestAgent.get('/api/cart')
				.expect(200)
				.end(function (err, response){
					if(err) return done(err);
					expect(response.body).to.have.length(1);
					done()
				})
//Test for quantity addition
			})


		})

	});

	xdescribe('Authenticated request', function () {

		var loggedInAgent;

		var userInfo = {
			email: 'joe@gmail.com',
			password: 'shoopdawoop'
		};

		beforeEach('Create a user', function (done) {
			User.create(userInfo, done);
		});

		beforeEach('Create loggedIn user agent and authenticate', function (done) {
			loggedInAgent = supertest.agent(app);
			loggedInAgent.post('/login').send(userInfo).end(done);
		});

		it('should get with 200 response and with an array as the body', function (done) {
			loggedInAgent.get('/api/members/secret-stash').expect(200).end(function (err, response) {
				if (err) return done(err);
				expect(response.body).to.be.an('array');
				done();
			});
		});

	});

});
