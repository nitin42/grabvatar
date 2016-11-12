'use strict';

require('assert');

const should = require('should');
const Vorpal = require('vorpal');
const chai = require('chai');

const main = require('../index');

let vorpal, stdout;

const { expect } = chai;

function stdoutFn(data) {
	stdout += data;
	return '';
}

describe('Grabvatar', function() {
	describe('root', function() {
		before('vorpal preps', function() {
			vorpal = new Vorpal().pipe(stdoutFn).show();
		});

		beforeEach('vorpal preps', function() {
			stdout = '';
		});

		it('should exist and be a function', function() {
			should.exist(main);
			main.should.be.type('function');
		});

		it('should import into vorpal', function() {
			(function() {
				vorpal.use(main);
			}).should.not.throw();
		});

		it('should create an avatar', function(done) {
			this.timeout(20000);
			vorpal.exec('Create nitin 200', function(err) {
				should.not.exist(err);
			});
			done();
		});

		it('should tell user about the working', function(done) {
			this.timeout(20000);
			vorpal.exec('But how?', function(err) {
				should.not.exist(err);
			});
			done();
		});

		it('should be ok', function() {
			expect(main).to.be.ok;
		});

		it('should be extensible', function() {
			expect(main).to.be.extensible;
		});
	})
})
