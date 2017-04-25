const mongoose = require('./../kernel/database')
, ObjectId = mongoose.Schema.Types.ObjectId
, schema = new mongoose.Schema({
	name: String,
	age: Number,
	male: Boolean,
	married: Boolean,
	spouse: ObjectId,
	childs: [ObjectId]
});

module.exports = mongoose.model('Agents', schema);