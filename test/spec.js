var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var config = require('./../config');
var Book = require('./../models/bookModel');

process.env.NODE_ENV = 'test';

var	mongoose = require('mongoose');
var id;
chai.use(chaiHttp);

describe('Server test', function() {
	var server;
	beforeEach(function() {
		server = require('./../app.js');
	});
	afterEach(function() {
		server.close();
	});
	describe('server should works', function() {

		it('responds to /', function testSlash(done) {
			chai.request(server)
			    .get('/')
			    .end(function(err, res){
			      	res.should.have.status(200);
			      	done();
				});
		});
		it('404 everything else', function testPath(done) {
			chai.request(server)
			    .get('/foo/bars')
			    .end(function(err, res){
			      	res.should.have.status(404);
			      	done();
				});
		});
	})
	describe('testing API-books', function() {
		before(function(done){
			mongoose.createConnection('mongodb://localhost/bookAPI-test');
			mongoose.connection.collections['books'].drop();
			var newBook = new Book({ author: "AAAA", title: "BBBB", genre: "CCCC", read: false});
			newBook.save(function(err, bookDB) {
				id = bookDB._id.toString();
				done();
			});
		});
		after(function() {
			mongoose.connection.close();
		});
		it('respound to /api/books', function(done) {
			chai.request(server)
				.get('/api/books')
			    .end(function(err, res){
			      	res.should.have.status(200);
      				res.body.should.be.a('array');
      				res.body[0].should.have.property('_id');
      				res.body[0].should.have.property('author');
      				res.body[0].should.have.property('title');
      				res.body[0].should.have.property('genre');
      				res.body[0].should.have.property('read');
					res.body[0].author.should.equal('AAAA');
					res.body[0].title.should.equal('BBBB');
					res.body[0].genre.should.equal('CCCC');
					res.body[0].read.should.equal(false);
			      	done();
				});
		});
		
			it('should add a SINGLE book on /books POST', function(done) {
			chai.request(server)
				    .post('/api/books')
				    .send({ author: "Java", title: "Script", genre: "qwe", read: true})
				    .end(function(err, res){
						res.should.have.status(201);
						res.should.be.json;
						res.body.should.be.a('object');
						res.body.should.have.property('author');
						res.body.should.have.property('title');
						res.body.should.have.property('_id');
						res.body.should.have.property('genre');
						res.body.should.have.property('read');
						res.body.author.should.equal('Java');
						res.body.title.should.equal('Script');
						res.body.genre.should.equal('qwe');
						res.body.read.should.equal(true);
						done();
				    });
		});
		it('should list a SINGLE book on /books/<id> GET', function(done) {
			chai.request(server)
					.get('/api/books/' + id)
					.end(function(err, res) {
						res.should.have.status(200);
						res.should.be.json;
						res.body.should.be.a('object');
						res.body.should.have.property('author');
						res.body.should.have.property('title');
						res.body.should.have.property('_id');
						res.body.should.have.property('genre');
						res.body.should.have.property('read');
						res.body.author.should.equal('AAAA');
						res.body.title.should.equal('BBBB');
						res.body.genre.should.equal('CCCC');
						res.body.read.should.equal(false);
						res.body._id.should.equal(id);
						done();
					});
		});
		it('should update a SINGLE book on /books/<id> PUT', function(done) {
			 chai.request(server)
					.get('/api/books')
					.end(function(err, res){
						chai.request(server)
								.put('/api/books/' + res.body[0]._id)
								.send({ author: "Backbone"})
								.end(function(error, response) {
									response.should.have.status(200);
									response.should.be.json;
									response.body.should.be.a('object');
									response.body.should.have.property('author');
									response.body.should.have.property('title');
									response.body.should.have.property('_id');
									response.body.should.have.property('genre');
									response.body.should.have.property('read');
									response.body.author.should.equal('Backbone');
									done();
								});
					});


		});
		it('should delete a SINGLE book on /blobs/<id> DELETE', function(done) {
			 chai.request(server)
					.get('/api/books')
					.end(function(err, res){
						chai.request(server)
								.delete('/api/books/' + res.body[0]._id)
								.end(function(error, response) {
									response.should.have.status(200);
									response.should.be.json;
									response.body.should.be.a('object');
									response.body.should.have.property('author');
									response.body.should.have.property('title');
									response.body.should.have.property('_id');
									response.body.should.have.property('genre');
									response.body.should.have.property('read');
									response.body.author.should.equal('Backbone');
									done();
								});
					});


		});
	})
});