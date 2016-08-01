import directive from './directive';
import template from './template';
import optionsService from './options-service';

var colorPicker = angular
    .module('color.picker', [])
    .service('ColorPickerOptions', optionsService)
    .directive('colorPicker', directive)
    .run(template);


export default colorPicker;
