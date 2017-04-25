'use strict';

const fs = require("fs")
, path = require("path")
, mongoose = require('./../kernel/database');

var db = {};

fs
.readdirSync(__dirname)
.filter((file) => {
	return (file.indexOf(".") !== 0) && (file !== "index.js");
})
.forEach((file) => {
	const model = require(path.join(__dirname, file))
	db[model.name] = model;
});

module.exports = db;