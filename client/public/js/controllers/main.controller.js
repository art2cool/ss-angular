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