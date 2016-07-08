import directive from './directive';
import template from './template';

var colorPicker = angular
    .module('color.picker', [])
    .directive('colorPicker', directive)
    .run(template);


export default colorPicker;
