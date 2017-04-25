'use strict';

module.exports = (app) => {
	const bodyParser = require('body-parser')
	, cors = require('cors')
	, multer = require('multer')

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({	extended: false }));
	app.use(cors());

	app.use(multer({
		dest: './../../storage/temp/'
	}));
}
