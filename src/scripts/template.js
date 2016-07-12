export default function template($templateCache) {
    $templateCache.put('template/color-picker/directive.html',
        '<div class="color-picker-wrapper" ng-class="{\n' +
            '\'color-picker-disabled\': AngularColorPickerController.options.disabled,\n' +
            '\'color-picker-swatch-only\': AngularColorPickerController.options.swatchOnly,\n' +
        '}">\n' +
        '   <div class="color-picker-input-wrapper" ng-class="{\'input-group\': AngularColorPickerController.options.swatchBootstrap && AngularColorPickerController.options.swatch}">\n' +
        '       <span ng-if="AngularColorPickerController.options.swatchPos === \'left\'" class="color-picker-swatch" ng-click="AngularColorPickerController.focus()" ng-show="AngularColorPickerController.options.swatch" ng-class="{\'color-picker-swatch-left\': AngularColorPickerController.options.swatchPos !== \'right\', \'color-picker-swatch-right\': AngularColorPickerController.options.swatchPos === \'right\', \'input-group-addon\': AngularColorPickerController.options.swatchBootstrap}"></span>\n' +
        '       <input class="color-picker-input form-control" type="text" ng-model="AngularColorPickerController.ngModel" ng-readonly="AngularColorPickerController.options.swatchOnly" ng-disabled="AngularColorPickerController.options.disabled" ng-blur="AngularColorPickerController.onBlur($event)" ng-change="AngularColorPickerController.onChange($event)" size="7" ng-focus="AngularColorPickerController.api.open($event)" ng-class="{\'color-picker-input-swatch\': AngularColorPickerController.options.swatch && !AngularColorPickerController.options.swatchOnly && AngularColorPickerController.options.swatchPos === \'left\'}">\n' +
        '       <span ng-if="AngularColorPickerController.options.swatchPos === \'right\'" class="color-picker-swatch" ng-click="AngularColorPickerController.focus()" ng-show="AngularColorPickerController.options.swatch" ng-class="{\'color-picker-swatch-left\': AngularColorPickerController.options.swatchPos !== \'right\', \'color-picker-swatch-right\': AngularColorPickerController.options.swatchPos === \'right\', \'input-group-addon\': AngularColorPickerController.options.swatchBootstrap}"></span>\n' +
        '   </div>\n' +
        '   <div class="color-picker-panel" ng-show="AngularColorPickerController.visible" ng-class="{\n' +
        '       \'color-picker-panel-top color-picker-panel-right\': AngularColorPickerController.options.pos === \'top right\',\n' +
        '       \'color-picker-panel-top color-picker-panel-left\': AngularColorPickerController.options.pos === \'top left\',\n' +
        '       \'color-picker-panel-bottom color-picker-panel-right\': AngularColorPickerController.options.pos === \'bottom right\',\n' +
        '       \'color-picker-panel-bottom color-picker-panel-left\': AngularColorPickerController.options.pos === \'bottom left\',\n' +
        '       \'color-picker-show-alpha\': AngularColorPickerController.options.alpha && AngularColorPickerController.options.format !== \'hex\',\n' +
        '       \'color-picker-show-inline\': AngularColorPickerController.options.inline,\n' +
        '   }">\n' +
        '       <div class="color-picker-row">\n' +
        '           <div class="color-picker-grid color-picker-sprite">\n' +
        '               <div class="color-picker-grid-inner"></div>\n' +
        '               <div class="color-picker-picker">\n' +
        '                   <div></div>\n' +
        '               </div>\n' +
        '           </div>\n' +
        '           <div class="color-picker-hue color-picker-sprite">\n' +
        '               <div class="color-picker-slider"></div>\n' +
        '           </div>\n' +
        '           <div class="color-picker-opacity color-picker-sprite" ng-show="AngularColorPickerController.options.alpha && AngularColorPickerController.options.format !== \'hex\'">\n' +
        '               <div class="color-picker-slider"></div>\n' +
        '           </div>\n' +
        '       </div>\n' +
        '   </div>\n' +
        '</div>'
    );
}
template.$inject = ['$templateCache'];
