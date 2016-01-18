const mongoose = require('mongoose');
const path = require('path');

const DATABASE_URI = require(path.join(__dirname, '../env')).DATABASE_URI;
const db = mongoose.connect(DATABASE_URI).connection;

require('../../../server/db/models');

var startDbPromise = new Promise(function (resolve, reject) {
    db.on('open', resolve);
    db.on('error', reject);
});

db.on('open', function () {
    console.log('Connected to MongoDB');
});

db.on('error', function (err) {
    console.log('Error connecting to MongoDB: ', err)
})

module.exports = startDbPromise;
