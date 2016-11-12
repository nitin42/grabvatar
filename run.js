'use strict';

const vorpal = require('vorpal')();

vorpal
	.use(require('./index'))
	.show();