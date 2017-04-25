const mongoose = require('./../kernel/database')
, schema = new mongoose.Schema({
  province: String,
  ageRange: String,
  male: Boolean
});

// Export the Mongoose model
module.exports = mongoose.model('Birth', schema);