angular
    .module('app', ['color.picker'])
    .controller('AppCtrl', function($scope, $timeout) {
        $timeout(() => {
            $scope.color = 'hsl(180, 100%, 50%)';
        });
        $scope.options = {
            close: {show: true},
            clear: {show: true},
            reset: {show: true},
            placeholder: $scope.color
        };
        $scope.api = {};

        $scope.setValue = function(value) {
            $scope.color = value;
        };
    });
