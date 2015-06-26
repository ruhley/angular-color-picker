(function() {
    'use strict';

    var colorPicker = function ($document, $timeout) {
        return {
            restrict: 'E',
            require: ['^ngModel'],
            scope: {
                ngModel: '=',
                colorPickerAlpha: '=',
                colorPickerCase: '=',
                colorPickerFormat: '=',
                colorPickerPos: '=',
                colorPickerSwatch: '=',
                colorPickerSwatchOnly: '=',
                colorPickerSwatchPos: '=',
                colorPickerSwatchBootstrap: '='
            },
            templateUrl: 'template/color-picker/directive.html',
            link: function ($scope, element, attrs, control) {
                $scope.init = function () {
                    if ($scope.ngModel === undefined) {
                        $scope.hue = 0;
                        $scope.saturation = 0;
                        $scope.lightness = 100;
                    } else {
                        var color = tinycolor($scope.ngModel);

                        if (color.isValid()) {
                            var hsl = color.toHsv();
                            $scope.hue = hsl.h;
                            $scope.saturation = hsl.s * 100;
                            $scope.lightness = hsl.v * 100;
                        }
                    }
                    $scope.initConfig();

                    $document.on('click', function (evt) {
                        if ($scope.find(evt.target).length === 0) {
                            $scope.log('Color Picker: Document Hide Event');
                            $scope.hide();
                        }
                    });
                };

                $scope.initConfig = function() {
                    $scope.config = {};
                    $scope.config.alpha = $scope.colorPickerAlpha === undefined ? true : $scope.colorPickerAlpha;
                    $scope.config.case = $scope.colorPickerCase === undefined ? 'upper' : $scope.colorPickerCase;
                    $scope.config.format = $scope.colorPickerFormat === undefined ? 'hsl' : $scope.colorPickerFormat;
                    $scope.config.pos = $scope.colorPickerPos === undefined ? 'bottom left' : $scope.colorPickerPos;
                    $scope.config.swatch = $scope.colorPickerSwatch === undefined ? true : $scope.colorPickerSwatch;
                    $scope.config.swatchOnly = $scope.colorPickerSwatchOnly === undefined ? false : $scope.colorPickerSwatchOnly;
                    $scope.config.swatchPos = $scope.colorPickerSwatchPos === undefined ? 'left' : $scope.colorPickerSwatchPos;
                    $scope.config.swatchBootstrap = $scope.colorPickerSwatchBootstrap === undefined ? true : $scope.colorPickerSwatchBootstrap;
                    $scope.log('Color Picker: Config', $scope.config);
                };

                $scope.focus = function () {
                    $scope.log('Color Picker: Focus Event');
                    $scope.find('.color-picker-input')[0].focus();
                };

                $scope.show = function () {
                    $scope.log('Color Picker: Show Event');
                    $scope.visible = true;
                    $scope.hueMouse = false;
                    $scope.opacityMouse = false;
                    $scope.colorMouse = false;

                    // force the grid selection circle to redraw and fix its position
                    $scope.saturationUpdate();
                    $scope.lightnessUpdate();
                };

                $scope.hide = function (apply) {
                    $scope.log('Color Picker: Hide Event');
                    $scope.visible = false;

                    if (apply !== false) {
                        $scope.$apply();
                    }
                };

                $scope.update = function () {
                    if ($scope.hue !== undefined && $scope.saturation !== undefined && $scope.lightness !== undefined) {
                        var color = tinycolor({h: $scope.hue, s: $scope.saturation / 100, v: $scope.lightness / 100}),
                            colorString;

                        if ($scope.config.alpha) {
                            color.setAlpha($scope.opacity / 100);
                        }

                        $scope.log('Color Picker: COLOR CHANGED TO ', color, $scope.hue, $scope.saturation, $scope.lightness, $scope.opacity);

                        $scope.swatchColor = color.toHslString();

                        switch ($scope.config.format) {
                            case 'rgb':
                                colorString = color.toRgbString();
                                break;

                            case 'hex':
                                colorString = color.toHexString();
                                if ($scope.config.case === 'lower') {
                                    colorString = colorString.toLowerCase();
                                } else {
                                    colorString = colorString.toUpperCase();
                                }
                                break;

                            case 'hex8':
                                colorString = color.toHex8String();
                                if ($scope.config.case === 'lower') {
                                    colorString = colorString.toLowerCase();
                                } else {
                                    colorString = colorString.toUpperCase();
                                }
                                break;

                            case 'hsv':
                                colorString = color.toHsvString();
                                break;

                            default:
                                colorString = color.toHslString();
                                break;
                        }

                        $scope.ngModel = colorString;
                    }
                };

                $scope.$watch('ngModel', function (newValue, oldValue) {
                    if (newValue !== undefined && newValue !== oldValue && newValue.length > 4) {
                        $scope.log('Color Picker: MODEL - CHANGED', newValue);
                        var color = tinycolor(newValue);

                        if (color.isValid()) {
                            var hsl = color.toHsv();

                            if ($scope.isValid) {
                                $scope.hue = hsl.h;
                                $scope.saturation = hsl.s * 100;
                                $scope.lightness = hsl.v * 100;

                                if ($scope.config.alpha) {
                                    $scope.opacity = hsl.a * 100;
                                }
                            }

                            $scope.isValid = true;
                        } else {
                            $scope.isValid = false;
                        }

                        control[0].$setValidity(attrs.name, $scope.isValid);

                        if (oldValue !== undefined) {
                            control[0].$setDirty();
                        }
                    }
                });

                $scope.$watch('colorPickerFormat', function (newValue, oldValue) {
                    if (newValue !== undefined && newValue !== oldValue) {
                        if (newValue === 'hex') {
                            $scope.colorPickerAlpha = false;
                        }

                        $scope.initConfig();
                        $scope.update();
                    }
                });

                $scope.$watchGroup(
                    ['colorPickerAlpha', 'colorPickerCase'],
                    function (newValue, oldValue) {
                        if (newValue !== undefined) {
                            $scope.initConfig();
                            $scope.update();
                        }
                    }
                );

                $scope.$watchGroup(
                    ['colorPickerSwatchPos', 'colorPickerSwatchBootstrap', 'colorPickerSwatchOnly', 'colorPickerSwatch', 'colorPickerPos'],
                    function (newValue, oldValue) {
                        if (newValue !== undefined) {
                            $scope.initConfig();
                        }
                    }
                );

                //---------------------------
                // HUE
                //---------------------------
                $scope.hueDown = function () {
                    $scope.log('Color Picker: HUE - MOUSE DOWN');
                    $scope.hueMouse = true;
                };

                $scope.hueUp = function () {
                    $scope.log('Color Picker: HUE - MOUSE UP');
                    $scope.hueMouse = false;
                };

                $scope.hueChange = function (evt, forceRun) {
                    if ($scope.hueMouse || forceRun) {
                        $scope.log('Color Picker: HUE - MOUSE CHANGE');
                        var el = $scope.find('.color-picker-hue');
                        $scope.hue = (1 - ((evt.pageY - $scope.offset(el, 'top')) / el.prop('offsetHeight'))) * 360;
                    }
                };

                $scope.hueUpdate = function() {
                    if ($scope.hue !== undefined) {
                        $scope.log('Color Picker: HUE - CHANGED');
                        $scope.huePos = (1 - ($scope.hue / 360)) * 100;
                        $scope.grid = tinycolor({h: $scope.hue, s: 100, v: 1}).toHslString();

                        if ($scope.huePos < 0) {
                            $scope.huePos = 0;
                        } else if ($scope.huePos > 100) {
                            $scope.huePos = 100;
                        }

                        $scope.update();
                    }
                };

                $scope.$watch('hue', function (newValue, oldValue) {
                    $scope.hueUpdate();
                });

                //---------------------------
                // OPACITY
                //---------------------------
                $scope.opacityDown = function () {
                    $scope.log('Color Picker: OPACITY - MOUSE DOWN');
                    $scope.opacityMouse = true;
                };

                $scope.opacityUp = function () {
                    $scope.log('Color Picker: OPACITY - MOUSE UP');
                    $scope.opacityMouse = false;
                };

                $scope.opacityChange = function (evt, forceRun) {
                    if ($scope.opacityMouse || forceRun) {
                        $scope.log('Color Picker: OPACITY - MOUSE CHANGE');
                        var el = $scope.find('.color-picker-opacity');
                        $scope.opacity = (1 - ((evt.pageY - $scope.offset(el, 'top')) / el.prop('offsetHeight'))) * 100;
                    }
                };

                $scope.opacityUpdate = function() {
                    if ($scope.opacity !== undefined) {
                        $scope.log('Color Picker: OPACITY - CHANGED');
                        $scope.opacityPos = (1 - ($scope.opacity / 100)) * 100;

                        if ($scope.opacityPos < 0) {
                            $scope.opacityPos = 0;
                        } else if ($scope.opacityPos > 100) {
                            $scope.opacityPos = 100;
                        }

                        $scope.update();
                    }
                };

                $scope.$watch('opacity', function (newValue, oldValue) {
                    $scope.opacityUpdate();
                });

                //---------------------------
                // COLOR
                //---------------------------
                $scope.colorDown = function () {
                    $scope.log('Color Picker: COLOR - MOUSE DOWN');
                    $scope.colorMouse = true;
                };

                $scope.colorUp = function () {
                    $scope.log('Color Picker: COLOR - MOUSE UP');
                    $scope.colorMouse = false;
                };

                $scope.colorChange = function (evt, forceRun) {
                    if ($scope.colorMouse || forceRun) {
                        $scope.log('Color Picker: COLOR - MOUSE CHANGE');
                        var el = $scope.find('.color-picker-grid-inner');
                        $scope.saturation = ((evt.pageX - $scope.offset(el, 'left')) / el.prop('offsetWidth')) * 100;
                        $scope.lightness = (1 - ((evt.pageY - $scope.offset(el, 'top')) / el.prop('offsetHeight'))) * 100;
                    }
                };

                $scope.saturationUpdate = function(oldValue) {
                    if ($scope.saturation !== undefined && $scope.saturation !== oldValue) {
                        $scope.log('Color Picker: SATURATION - CHANGED');
                        $scope.saturationPos = ($scope.saturation / 100) * 100;

                        if ($scope.saturationPos < 0) {
                            $scope.saturationPos = 0;
                        } else if ($scope.saturationPos > 100) {
                            $scope.saturationPos = 100;
                        }

                        $scope.update();
                    }
                };

                $scope.$watch('saturation', function (newValue, oldValue) {
                    $scope.saturationUpdate(oldValue);
                });

                $scope.lightnessUpdate = function(oldValue) {
                    if ($scope.lightness !== undefined && $scope.lightness !== oldValue) {
                        $scope.log('Color Picker: LIGHTNESS - CHANGED');
                        $scope.lightnessPos = (1 - ($scope.lightness / 100)) * 100;

                        if ($scope.lightnessPos < 0) {
                            $scope.lightnessPos = 0;
                        } else if ($scope.lightnessPos > 100) {
                            $scope.lightnessPos = 100;
                        }

                        $scope.update();
                    }
                };

                $scope.$watch('lightness', function (newValue, oldValue) {
                    $scope.lightnessUpdate(oldValue);
                });


                //---------------------------
                // HELPER FUNCTIONS
                //---------------------------
                $scope.log = function () {
                    //console.log.apply(console, arguments);
                };

                // taken and modified from jQuery's find
                $scope.find = function (selector) {
                    var context = $scope.wrapper ? $scope.wrapper[0] : element[0],
                        results = [],
                        nodeType;


                    // Same basic safeguard as Sizzle
                    if (!selector) {
                        return results;
                    }

                    if (typeof selector === 'string') {
                        // Early return if context is not an element or document
                        if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
                            return [];
                        }

                        results = context.querySelectorAll(selector);

                    } else {
                        if ($scope.contains(context, selector)) {
                            results.push(selector);
                        }
                    }

                    return angular.element(results);
                };

                $scope.contains = function (a, b) {
                    if (b) {
                        while ((b = b.parentNode)) {
                            if (b === a) {
                                return true;
                            }
                        }
                    }

                    return false;
                };

                $scope.offset = function (el, type) {
                    var offset,
                        x = 0,
                        y = 0,
                        body = document.documentElement || document.body;

                    if (el.length === 0) {
                        return null;
                    }

                    x = el[0].getBoundingClientRect().left + (window.pageXOffset || body.scrollLeft);
                    y = el[0].getBoundingClientRect().top + (window.pageYOffset || body.scrollTop);

                    offset = {left: x, top:y};

                    if (type !== undefined) {
                        return offset[type];
                    }

                    return offset;
                };


                $scope.init();
            }
        };
    };

    colorPicker.$inject = ['$document', '$timeout'];

    angular.module('color.picker').directive('colorPicker', colorPicker);
})();
