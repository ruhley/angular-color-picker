app = angular
	.module('app', ['color-picker'])
	.controller('AppCtrl', function($scope) {
		$scope.title = 'Hello World';
		$scope.format = 'hsl';
		$scope.alpha = 'true';
});