angular
    .module('app', ['color.picker'])
    .config(function($provide) {
        $provide.decorator('ColorPickerOptions', function($delegate) {
            var options = angular.copy($delegate);
            options.round = true;
            options.lightness = true;
            // options.inline = true;
            options.format = 'hsl';
            return options;
        });
    })
    .controller('AppCtrl', function($scope) {
        $scope.formatOptions = [{label: 'HSL', value: 'hsl'}, {label: 'HSV', value: 'hsv'}, {label: 'RGB', value: 'rgb'}, {label: 'HEX', value: 'hex'}, {label: 'HEX8', value: 'hex8'}];
        $scope.boolOptions = [{label: 'Yes', value: true}, {label: 'No', value: false}];
        $scope.swatchPosOptions = [{label: 'Left', value: 'left'}, {label: 'Right', value: 'right'}];
        $scope.posOptions = [{label: 'Bottom Left', value: 'bottom left'}, {label: 'Top Left', value: 'top left'}, {label: 'Bottom Right', value: 'bottom right'}, {label: 'Top Right', value: 'top right'}];
        $scope.caseOptions = [{label: 'Upper Case', value: 'upper'}, {label: 'Lower Case', value: 'lower'}];

        $scope.color = 'hsl(0, 100%, 50%)';
        $scope.options = {
            close: {show: true},
            clear: {show: true},
            reset: {show: true},
            placeholder: $scope.color,
        };
        $scope.api = {};
        $scope.eventApi = {
            onChange: function() {
                console.log('change', arguments);
            },
            onBlur: function() {
                console.log('blur', arguments);
            },
            onOpen: function() {
                console.info('open', arguments);
            },
            onClose: function() {
                console.info('close', arguments);
            },
            onClear: function() {
                console.info('clear', arguments);
            },
            onReset: function() {
                console.info('reset', arguments);
            },
            onDestroy: function() {
                console.info('destroy', arguments);
            }
        };

        $scope.open = function() {
            $scope.api.open();
        };

        $scope.close = function() {
            $scope.api.close();
        };
    });
