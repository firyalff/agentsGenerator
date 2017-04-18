const mongoose = require('./../kernel/database')
, ObjectId = mongoose.Schema.Types.ObjectId
, AgentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  male: Boolean,
  married: Boolean,
  spouse: ObjectId,
  childs: [ObjectId]
});

// Export the Mongoose model
module.exports = mongoose.model('Agents', AgentSchema);