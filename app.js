'use strict';

const myApp = angular.module('app', []);

myApp.factory('MushFactory', function($q, $http) {
	function getMush() {
		return $q( (resolve, reject) => {
			$http.get('mushrooms.json')
			.then( (shrooms) => {
				resolve(shrooms);
			})
			.catch( (err) => {
				reject(err);
			});
		});
	}
	return { getMush };
});

myApp.controller('MushController', function($scope, MushFactory) {
	MushFactory.getMush()
	.then( (mushData) => {
		$scope.mushArr = [];
		$scope.mushList = mushData.data.mushrooms;
		angular.forEach($scope.mushList, function(shroom) {
			$scope.mushArr.push(shroom);
		});
	});
});

