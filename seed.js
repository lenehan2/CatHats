/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Review = Promise.promisifyAll(mongoose.model('Review'));
var Product = Promise.promisifyAll(mongoose.model('Product'));
var Order = Promise.promisifyAll(mongoose.model('Order'));
var Category = Promise.promisifyAll(mongoose.model('Category'));


var seedUsers = function() {

    var users = [{
        email: 'testing@fsa.com',
        password: 'password',
        isAdmin: true,

    }, {
        email: 'obama@gmail.com',
        password: 'potus'
    }];

    return User.createAsync(users);

};
// var categories = ['Seasonal','Costumes','Formal','Outerware'];

var seedCategories = function() {
    var categories = [
    {
        name: 'Seasonal'
    },
    {
        name: 'Costumes'
    },
    {
        name: 'Formal'
    },
    {
        name: 'Outerwear'
    }
    ]

    return Category.createAsync(categories);

}

var seedProducts = function(categories) {
    var products = [{
        title: 'Catman Costume',
        price: '40000',
        description: "This Catman costume for medium sized felines will turn your innocent little tabby into a feared protector of the night!  Cat burglars beware!",
        categories: [categories[1]],
        inventory: 20,
        imageUrl: 'https://www.texashumaneheroes.org/wp-content/uploads/Halloween-cat-batman.jpg'
    }, {
        title: 'Super Cat',
        price: '60000',
        description: "This Superman costume for small sized felines will turn Mr. Mittens into a mighty Krypotnian!  His only weakness is Catniptonite!",
        categories: [categories[1]],
        inventory: 10,
        imageUrl: 'http://cdn2.business2community.com/wp-content/uploads/2014/10/Superman-Cat-Halloween-Costume.jpg-600x525.jpg'
    }, {
        title: 'Down Vest',
        price: '80000',
        description: "This Vest filled with Premium Down Feathers will keep Tubbs warm while she is out in the snow hunting geese to make another jacket!",
        categories: [categories[3]],
        inventory: 6,
        imageUrl: 'http://thumb7.shutterstock.com/display_pic_with_logo/2862790/354123959/stock-photo-animals-as-a-human-cat-in-down-vest-and-sweater-hand-drawn-illustration-digitally-colored-354123959.jpg'
    }, {
        title: "Star Wars Yoda Cat Headpiece",
        price: 499,
        description: "These STAR WARS Yoda ears come with an adjustable velcro band that fits comfortably around your cat's head. The ears feature great details including Yoda's characteristic fuzzy white hair.",
        categories: [categories[1]],
        inventory: 100,
        imageUrl: "http://mousebreath.com/wp-content/uploads/2013/08/mao-yoda-petco.jpg"

    }, {
        title: "Holiday Elf Cat Costume",
        price: 249,
        description: "Petco Holiday Elf Cat Costume, One Size Fits Most",
        categories: [categories[1], categories[0]],
        inventory: 20,
        imageUrl: "http://i0.wp.com/theverybesttop10.files.wordpress.com/2013/12/the-world_s-top-10-best-images-of-cats-in-elf-costumes-7.jpg?resize=418%2C538"
    }, {
        title: 'Knitty kitty',
        price: 30,
        description: 'Knited cat hat',
        categories: [categories[0]],
        inventory: 4,
        imageUrl: 'https://img0.etsystatic.com/il_570xN.255351194.jpg'
    }, {
        title: 'Feline Fedora',
        price: 1000,
        description: 'For all the cool cats that live in Williamsburg.',
        categories: [categories[2]],
        inventory: 12,
        imageUrl: 'http://40.media.tumblr.com/540a28920fe85253fc2491f223edeccd/tumblr_n33y6m1OYM1twmvaao1_540.jpg'
    }, {
        title: 'Party Cat Hat',
        price: 2500,
        description: 'For your cat\'s birthday, graduation, or other special occasions',
        inventory: 11,
        imageUrl: 'http://www.catster.com/wp-content/uploads/2015/06/cat-birthday-hat.jpg'
    }, {
        title: "Cat Saddle with Cowboy Bear",
        price: 1599,
        description: "The Wild West...with cats!",
        categories: [categories[1]],
        inventory: 5,
        imageUrl: "http://www.styletails.com/wp-content/uploads/2014/10/Ride-On-Cat-Costume.jpg"
    }, {
        title: 'Cat Dog',
        price: 3000,
        description: 'For cats that think they\'re dogs',
        inventory: 13,
        imageUrl: 'http://dailycaller.com/wp-content/uploads/2013/10/cat-dog-e1381255557904.jpg'
    }, {
        title: 'Frawg',
        price: 100000,
        description: 'When your cat wants a frawg, you get your cat a frawg',
        categories: [categories[1]],
        inventory: 10,
        imageUrl: ['http://www.whatpoll.com/Posts/cats%20with%20hats%202487.jpg']
    }]

    return Product.createAsync(products);
}

connectToDb.then(function() {

    User.findAsync({}).then(function(users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            // process.kill(0);
        }
    }).then(function() {
        console.log(chalk.green('User Seed successful!'));
        // process.kill(0);
    }).catch(function(err) {
        console.error(err);
        process.kill(1);
    })

    Category.findAsync({}).then(function(categories) {
        if (categories.length === 0) {
            return seedCategories();
        } else {
            console.log(chalk.magenta('Seems to already be category data, exiting!'));
            // process.kill(0);
        }
    }).then(function(categories) {
        Product.findAsync({}).then(function(products) {
            if (products.length === 0) {
                return seedProducts(categories);
            } else {
                console.log(chalk.magenta('Seems to already be product data, exiting!'));
                process.kill(0);
            }
        }).then(function() {
            console.log(chalk.green('Product Seed successful!'));
            process.kill(0);
        }).catch(function(err) {
            console.error(err);
            process.kill(1);
        })

        console.log(chalk.green('Category Seed successful!'));
        // process.kill(0);
    }).catch(function(err) {
        console.error(err);
        process.kill(1);
    })




    // Order.findAsync({}).then(function(orders) {
    //     if (orders.length === 0) {
    //         return seedOrders();
    //     } else {
    //         console.log(chalk.magenta('Seems to already be order data, exiting!'));
    //         process.kill(0);
    //     }
    // }).then(function() {
    //     console.log(chalk.green('Order Seed successful!'));
    //     process.kill(0);
    // }).catch(function(err) {
    //     console.error(err);
    //     process.kill(1);
    // })
});
