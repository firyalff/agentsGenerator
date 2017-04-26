const models  = require(__dirname+'/../models')
, workers = [{
	name : 'baseAttributePopulate',
	pattern : '* * * * * *',
	action : () =>{
		console.log('nicely done!');
	}
}, {
	name : 'test',
	pattern : '* * * * * *',
	action : () =>{
		console.log('a test!');
	}
}]

module.exports = workers;