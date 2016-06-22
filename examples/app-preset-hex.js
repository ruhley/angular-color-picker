angular
    .module('app', ['color.picker'])
    .controller('AppCtrl', function($scope, $timeout) {
        $timeout(function() {
            $scope.color = '#0000aa';
        });

        $scope.$watch('color', function(newValue, oldValue) {
            // console.log(newValue, oldValue);
        });

        $scope.onColorChange = function($event, color) {
            console.log($event, color);
        }
    });
