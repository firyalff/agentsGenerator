const models  = require(__dirname+'/../models')
, workers = [
{
	name : 'baseAttributePopulate',
	pattern : '*/5 * * * * *',
	action() {
		var agentcreated = 0;
		models.Populations.find()
		.then(values => {
			var promises = []
			values.forEach((data, index) => {
				
				var maleIteration = (data.male<5)?data.male:5;
				var femaleIteration = (data.female<5)?data.female:5;

				for (var i = maleIteration - 1; i >= 0; i--) {
					promises.push(models.Agents.create({
						name: `male${i}`,
						location: data.province,
						age: data.ageRange,
						male: true,
						married: false
					}))
				}

				for (var i = femaleIteration - 1; i >= 0; i--) {
					promises.push(models.Agents.create({
						name: `female${i}`,
						location: data.province,
						age: data.ageRange,
						male: false,
						married: false
					}))
				}

				promises.push(models.Populations.update({ 
					province: data.province, 
					ageRange: data.ageRange 
				}, {
					$inc: {
						'male': -maleIteration,
						'female': -femaleIteration
					}
				}));

			});
			agentcreated = promises.length;
			
			return Promise.all(promises)
		})
		.then(success => {
			console.log(`${agentcreated - 1} agents generated`)
			// return res.json({'success': true}); 
		})
		.catch(err => {
			
			console.error(err);
		})
		// console.log('15 secs')
	}
}
]

module.exports = workers;