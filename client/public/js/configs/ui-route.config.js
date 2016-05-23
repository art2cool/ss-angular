'use strict';

angular.module('MyApp').config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
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

		$locationProvider.html5Mode({enabled: true, requireBase: false});


}]);