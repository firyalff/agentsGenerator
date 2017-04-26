module.exports = function() {
	"use strict";
	const CronJob = require('cron').CronJob
	, fs      = require("fs")
	, path    = require("path");

	var workers	= {};

	fs
	.readdirSync(__dirname)
	.filter((file) => {

		if (fs.lstatSync(__dirname+'/'+file).isDirectory())
		{
			var innerWorkers = {};

			fs
			.readdirSync(__dirname+'/'+file)
			.filter((innerfile) => {
				return (innerfile.indexOf(".") !== 0) && (fs.lstatSync(__dirname+'/'+file+'/'+innerfile).isFile());
			})
			.forEach((innerfile) => {
				innerWorkers[innerfile.split(".")[0]] =  require(path.join(__dirname, file, innerfile));
			});

			workers[file] = innerWorkers;
		}

		return (file.indexOf(".") !== 0) && (fs.lstatSync(__dirname+'/'+file).isFile()) && (file !== "index.js");
	})
	.forEach((file) => {
		workers[file.split(".")[0]] = require(path.join(__dirname, file));
	});

	module.exports = workers;


	
	try {
		var job = new CronJob({
			cronTime: '1 1 3 * * *',
			onTick: function() {
				var commodities = [];

				models.CampaignAPI.findAll()
				.then(function (endpoints) {
					var promiseQuery = [];
					endpoints.forEach(function (data, index) {
						commodities.push({
							url : data.capi_url,
							id : data.capi_id,
							highprice : null,
							highloc : null,
							avgprice : null,
							avgloc : null,
							lowprice : null,
							lowloc : null,

						});
						promiseQuery.push( promiseReq({
							uri: data.capi_url,
							resolveWithFullResponse: true
						}) );
					});

					return promises.all(promiseQuery)
				})
				.then(function(results) {
					results.forEach(function (data, index) {
						var prices = JSON.parse(data.body).data;
						for (var i = commodities.length - 1; i >= 0; i--) 
						{
							if (commodities[i].url == data.request.uri.href) {
								commodities[i].highprice = prices.max_price.value;
								commodities[i].highloc = prices.max_price.object_name;
								commodities[i].avgprice = prices.avg_price.value;
								commodities[i].avgloc = prices.avg_price.object_name;
								commodities[i].lowprice = prices.min_price.value;
								commodities[i].lowloc = prices.min_price.object_name;
							}
						}
					});

					return commodities;
				})
				.then(function (parsedCom) {
					var inserts = [];

					parsedCom.forEach(function (data, index) {
						inserts.push({
							mpr_api_id : data.id,
							mpr_high_price  : data.highprice,
							mpr_high_loc : data.highloc,
							mpr_av_price : data.avgprice,
							mpr_av_loc : data.avgloc,
							mpr_low_price : data.lowprice,
							mpr_low_loc : data.lowloc,
						});
					})

					return models.MarketPrice.bulkCreate(inserts);
				})
				.then(function (inserts) {
					
				})
				.catch(function (err) {
					console.log(err)
				})
			},
			start: false,
			timeZone: 'Asia/Jakarta'
		});
		job.start();
	} catch(ex) {
		console.log("cron pattern not valid");
	}

	

}
