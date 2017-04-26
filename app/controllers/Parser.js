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
			maxCount: 1
		}, 
		];

		let promiseUpload = new Promise((resolve, reject) => {
			uploader.upload(inputFields)(req, res, (err) => {
				if (err) {
					reject(err);
				}
				else {
					resolve('product image uploaded');
				}
			})
		});

		let promiseParser = (input) => {
			return new Promise((resolve, reject) => {
				parse(input, function(err, output){
					if (err) {
						reject(err);
					}
					else {
						resolve(output);
					}
				});
			});
		}

		return promiseUpload
		.then(values => {
			return promiseParser(req.files.test[0].buffer)
		})
		.then(values => {
			
			var promises = [];
			for (var i = values.length - 1; i >= 2; i--) {
				promises.push(models.Populations.create({
					province: values[i][0],
					ageRange: values[i][1],
					male: values[i][2],
					female: values[i][3]
				}));
			}			

			return Promise.all(promises)
		})
		.then(values => {
			// return res.json({'test': 'fafa', file: values});
			return res.json({'test': 'fafa', file: values});
		})
	}
}

module.exports = methods;