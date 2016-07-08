angular
    .module('app', ['color.picker'])
    .controller('AppCtrl', function($scope) {
        $scope.formatOptions = [{label: 'HSL', value: 'hsl'}, {label: 'HSV', value: 'hsv'}, {label: 'RGB', value: 'rgb'}, {label: 'HEX', value: 'hex'}, {label: 'HEX8', value: 'hex8'}];
        $scope.boolOptions = [{label: 'Yes', value: true}, {label: 'No', value: false}];
        $scope.swatchPosOptions = [{label: 'Left', value: 'left'}, {label: 'Right', value: 'right'}];
        $scope.posOptions = [{label: 'Bottom Left', value: 'bottom left'}, {label: 'Top Left', value: 'top left'}, {label: 'Bottom Right', value: 'bottom right'}, {label: 'Top Right', value: 'top right'}];
        $scope.caseOptions = [{label: 'Upper Case', value: 'upper'}, {label: 'Lower Case', value: 'lower'}];

        $scope.color = 'rgba(50, 75, 150, 0.4)';
        $scope.options = {};
        $scope.api = {
            onChange: function(event, ngModel) {
                console.log(event, ngModel);
            }
        };
    });
