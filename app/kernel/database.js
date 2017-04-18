const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/beerlocker');

module.exports = mongoose;