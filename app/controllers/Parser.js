"use strict";

const models  = require(__dirname+'/../models')
, APIFormat  = require(__dirname+'/../helpers/APIFormat')
, parse = require('csv-parse')
, methods = {

	store(req, res) {
		console.log(req)
	}
}

module.exports = methods;