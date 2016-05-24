(function() {
	'use strict'

	angular.module('MyApp',['ui.router', 'books.api'])

})();
(function() {
'use strict';

angular.module('books.api', []);

})();
(function() {

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
})();

(function() {
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
		};
		this.updateBook = function(book) {
			return dataFactory.updateBook(book);
		}


	}
})();
(function() {
	'use strict';

	angular.module('MyApp').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		
		$urlRouterProvider.otherwise('/books');

		$stateProvider
			.state('main', {
				url: '/',
				views: {
					'header': {
						templateUrl: '/templates/header.html',
						controller: 'HeaderController as HeadrCtrl'
					},
					'content': {
						templateUrl: '/templates/main.html',
						controller: 'MainController as MainCtrl'
					},
				}
			})
			.state('books', {
				url: '/books',
				views: {
					'header': {
						templateUrl: '/templates/header.html',
						controller: 'HeaderController as HeadrCtrl'
					},
					'content': {
						templateUrl: '/templates/books.html',
						controller: 'BooksController as BooksCtrl'
					},
				},
				resolve: {
					books: ['BooksApi', function(BooksApi) {
						return BooksApi.search({});
					}]
				}
			})
			.state('music', {
				url: '/music',
				views: {
					'header': {
						templateUrl: '/templates/header.html',
						controller: 'HeaderController as HeadrCtrl'
					}
				}
			})
			.state('login', {
				url: '/login',
				views: {
					'header': {
						templateUrl: '/templates/header.html',
						controller: 'HeaderController as HeadrCtrl'
					},
					'content': {
						templateUrl: '/templates/login.html',
						controller: 'LoginController as LogCtrl'
					},
				}
			})
	}]);

})();
(function() {
	
	'use strict';

	angular.module('MyApp')
		.controller('BooksController', [
			'$state',
			'BooksApi',
			BooksController]);

	function BooksController($state, BooksApi) {
		var vm = this;
		vm.books = BooksApi.getBooks();
		vm.newRowShow = false;
		vm.edit = false;

		vm.removeBook = function (book) {
			console.log(book);
			BooksApi.removeBook(book._id).then(function() {
				for (var i = 0; i < vm.books.length; i++) {
					if(vm.books[i]._id === book._id) {
						vm.books.splice(i,1);
						break;
					}
				}
			})
			.catch(function(reason) {
				console.log(reason);
			})
		}
		vm.createBook = function (book) {
			BooksApi.createBook(book).then(function(data) {
				
				vm.newRowShow = false;
				vm.model = {};	
				vm.books.push(data.data);
			})
			.catch(function(reason) {
				console.log(reason);
			})
		}
		vm.editBook = function(book) {
			vm.model = book;
			book.edit = true;
		}
		vm.cancelEdit = function(book) {
			delete book.edit;
		}
		vm.updateBook = function(book) {
			BooksApi.updateBook(book).then(function(data) {
				delete book.edit;
			});
		}

		console.log('BooksController', vm.books);
	}
})();
(function() {
	'use strict';

	angular.module('MyApp')
		.controller('HeaderController', [
			'$state',
			'$location',
			HeaderController]);

	function HeaderController($state, $location) {

		this.isActive = function(route) {
	        return route === $location.path();
	    }

		console.log('HeaderController', $location.path());
	}

})();
(function() {
	'use strict';

	angular.module('MyApp')
		.controller('LoginController', [
			'$state',
			LoginController]);

	function LoginController($state) {
		console.log('LoginController');
	}

})();
(function() {
	'use strict';

	angular.module('MyApp')
		.controller('MainController', [
			'$state',
			MainController]);

	function MainController($state) {
		console.log('MainController');
	}

})();