var express = require('express');
var musicRouter = express.Router();

var routes = function (Music) {
	musicRouter.route('/')
		.get(function(req, res) {
			var query = {};
			query.query = req.query;
			Music.find(query.query, function(err, music) {
				if(err) {
					res.status(500).send(music);
				} else {
					res.json(music);
				}
			})
		})
		.post(function(req, res) {
			var music = new Music(req.body);
			music.save(function(err, music) {
				if(err) {
					res.status(500).send(err);
				} else {
					res.status(201).send(music);
				}
			});
		});


		musicRouter.use('/:musicId', function(req, res, next) {
			Music.findById(req.params.musicId, function(err, music) {
				if(err) {
					res.status(500).send(err);
				} else if(music) {
					req.music = music;
					next();
				} else {
					res.status(404).send('music not found')
				}
			});
		});


	musicRouter.route('/:musicId')

		.get(function(req, res) {
			res.json(req.music)
		})

		.put(function(req, res) {

			req.music.author = req.body.author;
			req.music.song = req.body.song;
			req.music.date = req.body.date;
			req.music.listen = req.body.listen;
			req.music.save(function (err) {
				if (err) {
					req.status(500).send(err);
				} else {
					res.json(req.book);
				}
			});
		})
		
		.patch(function(req, res) {
			if (req.body._id) {
				delete req.body._id;
			}
			for(var p in req.body) {
				req.music[p] = req.body[p];
			}

			req.music.save(function (err) {
				if(err) {
					req.status(500).send(err);
				} else {
					res.json(req.book);
				}
			});
		})


		.delete(function(req, res) {
			req.music.remove(function(err) {
				if(err) {
					res.status(500).send(err);
				} else {
					res.status(204).send('removed');
				}
			})
		});

		return musicRouter;
}

module.exports = routes;