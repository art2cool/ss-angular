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

	console.log('BooksController', vm.books);
}