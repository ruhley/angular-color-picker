angular
    .module('app', ['color.picker'])
    .controller('AppCtrl', function($scope, $timeout) {
        $timeout(function() {
            $scope.color = '#0000aa';
        });

        $scope.options = {
            format: 'hex',
            swatchOnly: false,
            alpha: false,
            swatchBootstrap: false,
        };
        $scope.api = {
            onChange: function(event, ngModel) {
                console.log(event, ngModel);
            }
        };
    });
