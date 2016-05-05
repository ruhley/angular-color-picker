angular.module('color.picker').run(['$templateCache', function($templateCache) {
    $templateCache.put('template/color-picker/directive.html',
        '<div class="color-picker-wrapper" ng-class="{\'color-picker-swatch-only\': config.swatchOnly}">\n' +
        '   <div class="color-picker-input-wrapper" ng-class="{\'input-group\': config.swatchBootstrap && config.swatch}">\n' +
        '       <span ng-if="config.swatchPos === \'left\'" class="color-picker-swatch" ng-click="focus()" ng-show="config.swatch" ng-class="{\'color-picker-swatch-left\': config.swatchPos !== \'right\', \'color-picker-swatch-right\': config.swatchPos === \'right\', \'input-group-addon\': config.swatchBootstrap}"></span>\n' +
        '       <input class="color-picker-input form-control" type="text" ng-model="ngModel" ng-readonly="config.swatchOnly" ng-disabled="config.disabled" ng-blur="onBlur()" ng-change="onChange($event)" size="7" ng-focus="show()" ng-class="{\'color-picker-input-swatch\': config.swatch && !config.swatchOnly && config.swatchPos === \'left\'}">\n' +
        '       <span ng-if="config.swatchPos === \'right\'" class="color-picker-swatch" ng-click="focus()" ng-show="config.swatch" ng-class="{\'color-picker-swatch-left\': config.swatchPos !== \'right\', \'color-picker-swatch-right\': config.swatchPos === \'right\', \'input-group-addon\': config.swatchBootstrap}"></span>\n' +
        '   </div>\n' +
        '   <div class="color-picker-panel" ng-show="visible" ng-class="{\n' +
        '       \'color-picker-panel-top color-picker-panel-right\': config.pos === \'top right\',\n' +
        '       \'color-picker-panel-top color-picker-panel-left\': config.pos === \'top left\',\n' +
        '       \'color-picker-panel-bottom color-picker-panel-right\': config.pos === \'bottom right\',\n' +
        '       \'color-picker-panel-bottom color-picker-panel-left\': config.pos === \'bottom left\',\n' +
        '       \'color-picker-show-alpha\': config.alpha && config.format !== \'hex\',\n' +
        '       \'color-picker-show-inline\': config.inline,\n' +
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
        '           <div class="color-picker-opacity color-picker-sprite" ng-show="config.alpha && config.format !== \'hex\'">\n' +
        '               <div class="color-picker-slider"></div>\n' +
        '           </div>\n' +
        '       </div>\n' +
        '   </div>\n' +
        '</div>'
    );

}]);
