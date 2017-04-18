const mongoose = require('./../kernel/database')
, MarriageSchema = new mongoose.Schema({
  province: String,
  ageRange: String,
  male: Boolean
});

// Export the Mongoose model
module.exports = mongoose.model('Populations', PopulationSchema);