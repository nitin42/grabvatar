'use strict';

const vorpal = require('vorpal')();
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const BARS = require('node-progress-bars');
const image_downloader = require('image-downloader');

let identifier, SIZE;

const error = chalk.bold.red;
const info = chalk.bold.blue;

module.exports = function(vorpal) {
	vorpal
		.command('Create [adjunct] [size]', 'Generates an avatar for user')
		.action(function(args, cb){
			if (args.adjunct) {
				identifier = args.adjunct;
			} else {
				this.log(error('Provide a valid identifier !'));
			}

			if (args.size) {
				SIZE = args.size;
			} else {
				args.size = 200;
			}

			const PATH = path.join(__dirname + `/images/${identifier}`);

			const url_avatar = `http://api.adorable.io/avatar/${SIZE}/${identifier}`;
			
			let options = {
	    		url: url_avatar,
	    		dest: path.join(__dirname + `/images/${identifier}.png`),       
	    		done: (err, filename, image) => {
	        		if (err) {
	            		throw err;
	        		}
	        		console.log(info('Avatar saved to ', PATH + '  ✅')); // `this` inside this context not bound to vorpal
	    		},
			};
			
			try {
				image_downloader(options);
				cb();
			} catch(err) {
				this.log(error("⚠  Error occurred!"));
				cb();
			}
		});

	vorpal 
		.command('But how?', 'How it works?')
		.action(function(args, cb){
			try {
				this.log(info(`When a user provides an identifier with a proper size, an avatar is generated\nby using the adorable (adorable.io) flexible and extensible API.`
				));
				this.log('');
				this.log(info('Happy avataring! 😄'));
				this.log('');
				cb();
			} catch(err) {
				console.log(info("⚠  Try typing `But how? ` ! "));
				cb();
			}
		});

	vorpal
		.delimiter('👔')
		.show();
}
