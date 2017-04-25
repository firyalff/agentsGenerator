const mongoose = require('mongoose')
, config = require('./../configs/database')[process.env.NODE_ENV]

mongoose.connect(`${config.url}:${config.port}/${config.database}`);

module.exports = mongoose;