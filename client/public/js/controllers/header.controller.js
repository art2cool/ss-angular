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