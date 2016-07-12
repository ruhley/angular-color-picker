import controller from './controller';

export default function colorPickerDirective () {
    return {
        restrict: 'E',
        require: ['^ngModel'],
        scope: {
            ngModel: '=',
            options: '=?',
            api: '=?',
            eventApi: '=?',
        },
        bindToController: true,
        templateUrl: 'template/color-picker/directive.html',
        controller: controller,
        controllerAs: 'AngularColorPickerController',
        link: function ($scope, element, attrs, control) {
            $scope.control = control;
        }
    };
}
