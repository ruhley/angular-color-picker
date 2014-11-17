app = angular
	.module('app', ['color-picker'])
	.controller('AppCtrl', function($scope) {
		$scope.format = 'hsl';
		$scope.alpha = 'Yes';
		$scope.swatch = 'Yes';
});
