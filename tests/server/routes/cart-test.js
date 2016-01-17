// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Cart Route', function() {

    var userInfo = {
        email: "cellar@door.com",
        password: '28d6h42m12s'
    }

    var adminInfo = {
        email: "real@email.com",
        password: "totallyReal",
        isAdmin: true
    }

    var productInfo = {
        title: 'Test Cap for Kitty',
        price: 2000,
        description: "This is a test product"
    };

    var addedProduct = {};
    var userAgent;
    var guestAgent;
    var adminAgent;
    var userId;
    var productId;
    var updatedCart;

    beforeEach('Establish DB connection', function(done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    //Add product expects product in form of {product: _id, quantity: number}

    beforeEach('Create user, admins, and a added product object', function(done) {
        User.create([userInfo, adminInfo], function(err, users) {
            userId = users[0]._id;
            Product.create(productInfo, function(err, createdProduct) {
                if (err) return done(err)
                addedProduct = {
                    product: createdProduct._id.toString(),
                    quantity: 1
                }

                updatedCart = [{
                    product: createdProduct._id.toString(),
                    quantity: 4
                }];
                productId = createdProduct._id.toString();
                done();
            })
        })
    })


    beforeEach('Create guest,User,and Admin agent', function(done) {
        userAgent = supertest.agent(app);
        adminAgent = supertest.agent(app);
        guestAgent = supertest.agent(app)

        userAgent.post('/api/login/').send(userInfo).end(function() {
            adminAgent.post('/api/login').send(adminInfo).end(done)
        });
    });


    afterEach('Clear test database', function(done) {
        clearDB(done);
    });

    describe('Unauthenticated user', function() {

        it('should get a 200 response when requesting cart', function(done) {
            guestAgent.get('/api/cart')
                .expect(200)
                .end(function(err, response) {
                    if (err) return done(err);
                    expect(response.body).to.be.an('array');
                    expect(response.body.length).to.be.equal(0)
                    done();
                });
        });

        //Get cart returns populated cart

        it('should be able to add an item to the users cart', function(done) {
            guestAgent.post('/api/cart').send(addedProduct)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    guestAgent.get('/api/cart')
                        .expect(200)
                        .end(function(err, res) {
                            if (err) return done(err)
                            expect(res.body).to.be.an('array');
                            expect(res.body[0].product._id).to.be.equal(productId);
                            expect(res.body[0].quantity).to.be.equal(1)
                            done()
                        })
                })
        })

        it('should add to the quantity of a product when adding a duplicate item', function(done) {
            guestAgent.post('/api/cart').send(addedProduct).end(function(err, res) {
                if (err) return done(err);
                guestAgent.post('/api/cart').send(addedProduct).end(function(err, res) {
                        if (err) return done(err);
                        guestAgent.get('/api/cart')
                            .expect(200)
                            .end(function(err, res) {
                                if (err) return done(err);
                                expect(res.body).to.be.an('array');
                                expect(res.body[0].quantity).to.be.equal(2);
                                expect(res.body.length).to.not.be.equal(3);
                                done();
                            })
                    })
                    //Test for quantity addition
            })
        })

        it('should be able to update the quantity of items in the cart with a post', function(done) {
            guestAgent.post('/api/cart').send(addedProduct).end(function(err, res) {
                if (err) return done(err);
                guestAgent.get('/api/cart')
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        expect(res.body.length).to.be.equal(1);
                        expect(res.body[0].quantity).to.be.equal(1);
                        guestAgent.put('/api/cart').send(updatedCart).end(function(err, res) {
                            if (err) return done(err);
                            guestAgent.get('/api/cart')
                                .expect(200)
                                .end(function(err, res) {
                                    if (err) return done(err);
                                    expect(res.body[0].quantity).to.be.equal(4);
                                    expect(res.body.length).to.not.be.equal(2);
                                    done()
                                })
                        })

                    })
            })
        })

    });

    describe('Logging in with items in cart', function() {

        var product2Info = {

            title: "Hat number 2",
            description: "THE SECOND PRODUCT!",
            price: "50000000"
        }
        var addedProduct2;
        var productId2;

        beforeEach('Add items to unlogged in user\'s cart', function(done) {
            guestAgent.post('/api/cart').send(addedProduct).end(function(err, res) {
                if (err) return done(err);
                guestAgent.post('/api/cart').send(addedProduct).end(done)
            })
        });


        it('Logged in users cart should start empty',function(done){
        	User.findById(userId,function(err,user){
        		if(err) return done(err);
        		expect(user.cart.length).to.equal(0);
        		done()
        	})
        })

        it('Should merge logged in cart with unlogged in cart', function(done) {
            guestAgent.post('/api/login').send(userInfo).end(function(err, response) {
                if (err) return done(err);
                
                guestAgent.get('/api/cart')
                .expect(200)
                .end(function(err,res){

	                expect(res.body.length).to.be.equal(1);
	                expect(res.body[0].quantity).to.be.equal(2);
	                done();
                })

            });
        });

    });

});
