var express = require('express');

var routes = function (Book) {
	'use strict';
	var bookRouter = express.Router();

	bookRouter.route('/')
		.post(function (req, res) {
			var book = new Book(req.body);
			book.save();
			res.status(201).send(book);
		})
		.get(function (req, res) {
			var query = {};
			query.query = req.query;
			Book.find(query.query, function (err, books) {
				if (err) {
					res.status(500).send(err);
				} else {
					res.json(books);
				}
			});
		});
//midleware
	bookRouter.use('/:bookId', function (req, res, next) {
		Book.findById(req.params.bookId, function (err, book) {
			if (err) {
				res.status(500).send(err);
			} else if (book) {
				req.book = book;
				next();
			} else {
				res.status(404).send('book not found');
			}
		});

	});
				
	
	
	bookRouter.route('/:bookId')
		.get(function (req, res) {
			res.json(req.book);

		})
		.put(function (req, res) {

			Book.findById(req.params.bookId, function (err, book) {

				for(var key in req.body) {
					book[key] = req.body[key];
					
				}
				book.save(function (err,bookDB) {
					if (err) {
						req.status(500).send(err);
					} else {
						res.json(bookDB);
					}
				});
			})

		})
	
		.patch(function (req, res) {
			if (req.body._id) {
				delete req.body._id;
			}
			for (var p in req.body) {
				req.book[p] = req.body[p];
			}
			
			req.book.save(function (err) {
				if(err) {
					req.status(500).send(err);
				} else {
					res.json(req.book);
				}
			});
		})
		.delete(function (req, res) {
			req.book.remove(function(err, book) {
				if (err) {
					res.status(500).send(err);
				} else {
					res.json(book);
				}
			})
		});
	return bookRouter;

};

module.exports = routes;
