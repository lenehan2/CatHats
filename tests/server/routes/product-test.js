var mongoose = require('mongoose');
require('../../../server/db/models');
var Product = mongoose.model('Product');
var User = mongoose.model('User');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');
xdescribe('Product Route', function () {

    var productId;
    var admin;
    var user;

    var adminInfo = {
        email: 'sam@sam.sam',
        password: 'sam',
        isAdmin: true
    };

    var userInfo = {
        email: 'joe@gmail.com',
        password: 'shoopdawoop'
    };

    var product1 = {
        title: 'Cat Hat',
        price: 2000,
        description: 'It\'s a hat for a cat.',
        category: ['Costumes']
    };

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });
    beforeEach('Create a admin', function (done) {
        User.create(adminInfo, done);
    });

    beforeEach('Create loggedIn user agent and authenticate', function (done) {
        admin = supertest.agent(app);
        admin.post('/login').send(adminInfo).end(done);
    });

    beforeEach('Create a user', function (done) {
        User.create(userInfo, done);
    });

    beforeEach('Set session for nonauthenticated user', function (done) {
        user = supertest.agent(app);
        done();
    });

    xdescribe('Adding products', function () {

        it('allows an admin to add a product', function (done) {
            admin.post('/api/products')
                .send(product1)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    admin.get('/api/products')
                        .end(function (err, res) {
                            if (err) return done(err);
                            expect(res.body).to.have.length(1);
                            done();
                        });
                });
        });

        it('does not allow a regular user to add a product', function (done) {
            user.post('/api/products')
                .send(product1)
                .expect(403)
                .end(done);
        });
    });

    xdescribe('Updating and deleting products', function (done) {

        beforeEach('Create a product', function (done) {
            admin.post('/api/products')
            .send(product1)
            .end(function (err, res) {
                if (err) return done(err);
                productId = res.body._id;
                done();
            });
        });

        it('allows an admin to update a product', function (done) {
            admin.put('/api/products/' + productId)
            .send({ price: 3000 })
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.price).to.equal(3000);
                done();
            });
        });

        it('allows an admin to delete a product', function (done) {
            admin.delete('/api/products/' + productId)
            .expect(204)
            .end(function (err, res) {
                if (err) return done(err);
                admin.get('/api/products')
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.have.length(0);
                    done();
                });
            });
        });

        it('does not allow a non-admin to update a product', function (done) {
            user.put('/api/products/' + productId)
            .send({ price: 3000 })
            .expect(403)
            .end(done);
        });

        it('does not allow a non-admin to delete a product', function (done) {
            user.delete('/api/products/' + productId)
            .expect(403)
            .end(done);
        });

    });

    xdescribe('Gettting products', function () {
        beforeEach('Create a product', function (done) {
            admin.post('/api/products')
            .send(product1)
            .end(function (err, res) {
                if (err) return done(err);
                productId = res.body._id;
                done();
            });
        });

        it('allows a user to get all products', function (done) {
            user.get('/api/products')
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.have.length(1);
                    done();
                });
        });

        it('allows getting products by category', function (done) {
            user.get('/api/products/?category=Costumes')
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body).to.have.length(1);
                done();
            });
        });

        it('sends an empty if no products match the category', function (done) {
            user.get('/api/products/?category=Helicopters')
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body).to.have.length(0);
                done();
            });
        });

    });
});
