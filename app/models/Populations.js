const mongoose = require('./../kernel/database')
, schema = new mongoose.Schema({
  province: String,
  ageRange: String,
  male: Number,
  female: Number
});

// Export the Mongoose model
module.exports = mongoose.model('Populations', schema);

