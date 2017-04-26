module.exports = function() {
	"use strict";
	const CronJob = require('cron').CronJob
	, fs      = require("fs")
	, path    = require("path");

	var workers	= {}
	, jobs = [];

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
		var currentJobs = require(path.join(__dirname, file));

		currentJobs.forEach((data, index) => {
			var job = new CronJob({
				cronTime: data.pattern,
				onTick: data.action
			})
			
			job.start();

		});

	});

}
