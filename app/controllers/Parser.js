"use strict";

const models  = require(__dirname+'/../models')
, APIFormat  = require(__dirname+'/../helpers/APIFormat')
, parse = require('csv-parse')
, uploader  = require(__dirname+'/../helpers/MultipartRead')
, methods = {

	index(req, res) {
		return res.json({'test': 'fafa'}); 
	},
	store(req, res) {
		var inputFields = [
		{
			name: 'test', 
			maxCount:1
		}, 
		];

		let promiseUpload = new Promise((resolve, reject) => {
			uploader.upload(inputFields)(req, res, function(err) {
				if (err) {
					reject(err);
				}
				else {
					resolve('product image uploaded');
				}
			})
		});


		return promiseUpload
		.then(values => {
			console.log(req.files)
			
			return res.json({'test': 'fafa'});
		})

	}
}

module.exports = methods;