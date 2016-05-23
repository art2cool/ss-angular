'use strict';

angular.module('books.api', []);

angular.module('books.api')
	.factory('dataFactory', ['$http', function($http) {
		
		var urlBase = '/api/books';
		var dataFactory = {};

		dataFactory.getBooks = function(query) {
			return $http.get(urlBase, {params: query});
		};

		dataFactory.getBook = function(id) {
			return $http.get(urlBase + '/' + id);
		}

		dataFactory.insertBook = function(book) {
			return $http.post(urlBase, book);
		}

		dataFactory.updateBook = function (book) {
			return $http.put(urlBase + '/' + book._id, book);
		}

		dataFactory.deleteBook = function (id) {
			return $http.delete(urlBase + '/' + id);
		}

		return dataFactory;
}])

angular.module('books.api')
	.service('BooksApi', ['$q', 'dataFactory', BooksApi ]);

	function BooksApi($q, dataFactory) {
		var books = [];

		this.search = function (opts) {
			var deferred = $q.defer();
			var that = this;

			 dataFactory.getBooks(opts)
			 	.then(function(data) {
				 	books = data.data;

			 		deferred.resolve(that.getBooks());
				})
				 .catch(function(reason){

				 	deferred.reject(reason);
				 })
			return deferred.promise; 
		};

		this.getBooks = function() {
			return books;
		};

		this.removeBook = function (id) {

			return dataFactory.deleteBook(id);
		};

		this.createBook = function (book) {

			return dataFactory.insertBook(book);
		}


	}