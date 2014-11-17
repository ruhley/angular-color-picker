'use strict';

angular.module('color-picker', [])
	.directive('colorPicker', ['$compile', '$document', function ($compile, $document) {
		return {
			restrict: 'A',
			require: '?ngModel',
			scope: {
				format: '=',
				alpha: '=',
				swatch: '='
			},
			link: function($scope, element, attrs) {
				$scope.init = function() {
					$scope.createInput();
					$scope.hue = 0;
					$scope.saturation = 50;
					$scope.lightness = 50;
					$scope.opacity = 100;

					$document.on('click', function(evt) {
						if($scope.find(evt.target).length == 0) {
							$scope.log('Color Picker: Document Hide Event');
							$scope.hide();
						}
					});
				};

				$scope.createInput = function() {
					var html;

					if (!$scope.wrapper) {
						element.wrap($compile(angular.element('<div class="color-picker-wrapper"></div>'))($scope));

						html = '<input class="color-picker-input form-control" type="text" ng-model="ngModel" size="7" ng-focus="show()" ng-class="{\'color-picker-input-swatch\': swatch}">' +
								'<span class="color-picker-swatch" ng-click="focus()" ng-show="swatch">' +
									'<span class="color-picker-swatch-color" style="background-color: {{swatchColor}};"></span>' +
								'</span>' +
								'<div class="color-picker-panel" ng-show="visible">' +
									'<div class="color-picker-hue color-picker-sprite" ng-click="hueChange($event, true)" ng-mousemove="hueChange($event, false)" ng-mousedown="hueDown()" ng-mouseup="hueUp()">' +
										'<div class="color-picker-slider" style="top: {{huePos}}px;"></div>' +
									'</div>' +
									'<div class="color-picker-opacity color-picker-sprite" ng-show="alpha" ng-click="opacityChange($event, true)" ng-mousemove="opacityChange($event, false)" ng-mousedown="opacityDown()" ng-mouseup="opacityUp()">' +
										'<div class="color-picker-slider" style="top: {{opacityPos}}px;"></div>' +
									'</div>' +
									'<div class="color-picker-grid color-picker-sprite" style="background-color: {{grid}};" ng-click="colorChange($event, true)" ng-mousemove="colorChange($event, false)" ng-mousedown="colorDown()" ng-mouseup="colorUp()">' +
										'<div class="color-picker-grid-inner"></div>' +
										'<div class="color-picker-picker" style="top: {{lightnessPos}}px; left: {{saturationPos}}px;">' +
											'<div></div>' +
										'</div>' +
									'</div>' +
								'</div>';

						element.after($compile(angular.element(html))($scope));
						element.addClass('ng-hide');
						$scope.wrapper = element.parent();
					}
				};

				$scope.focus = function() {
					$scope.log('Color Picker: Focus Event');
					$scope.find('.color-picker-input').focus();
				};

				$scope.show = function() {
					$scope.log('Color Picker: Show Event');
					$scope.visible = true;
					$scope.hueMouse = false;
					$scope.opacityMouse = false;
					$scope.colorMouse = false;
				};

				$scope.hide = function() {
					$scope.log('Color Picker: Hide Event');
					$scope.visible = false;
					$scope.$apply();
				};

				$scope.update = function() {
					var color = tinycolor({h: $scope.hue, s: $scope.saturation, l: $scope.lightness});

					if ($scope.alpha) {
						color.setAlpha($scope.opacity / 100);
					}

					$scope.log('Color Picker: COLOR CHANGED TO ', color, $scope.hue, $scope.saturation, $scope.lightness, $scope.opacity);

					switch ($scope.format) {
						case 'rgb':
							$scope.swatchColor = color.toRgbString();
							$scope.ngModel = color.toRgbString();
							break;

						case 'hex':
							$scope.swatchColor = color.toHexString();
							$scope.ngModel = color.toHexString();
							break;

						case 'hsv':
							$scope.swatchColor = color.toHslString();
							$scope.ngModel = color.toHsvString();
							break;

						default:
							$scope.swatchColor = color.toHslString();
							$scope.ngModel = color.toHslString();
							break;
					}
				};

				$scope.$watch('ngModel', function(newValue, oldValue) {
					if (newValue !== undefined && newValue !== oldValue) {
						$scope.log('Color Picker: MODEL - CHANGED', newValue);
						var color = tinycolor(newValue);

						if (color.isValid()) {
							var hsl = color.toHsl();
							$scope.hue = hsl.h;
							$scope.saturation = hsl.s * 100;
							$scope.lightness = hsl.l * 100;
							$scope.opacity = hsl.a * 100;
						} else {
							alert('Invalid Color Format!');
						}
					}
				});

				$scope.$watch('format', function(newValue, oldValue) {
					if (newValue !== undefined && newValue !== oldValue) {
						if (newValue === 'hex') {
							$scope.alpha = '';
						}

						$scope.update();
					}
				});

				$scope.$watch('alpha', function(newValue, oldValue) {
					if (newValue !== undefined && newValue !== oldValue) {
						$scope.update();
					}
				});

				//---------------------------
				// HUE
				//---------------------------
				$scope.hueDown = function() {
					$scope.log('Color Picker: HUE - MOUSE DOWN');
					$scope.hueMouse = true;
				};

				$scope.hueUp = function() {
					$scope.log('Color Picker: HUE - MOUSE UP');
					$scope.hueMouse = false;
				};

				$scope.hueChange = function(evt, forceRun) {
					if ($scope.hueMouse || forceRun) {
						$scope.log('Color Picker: HUE - MOUSE CHANGE');
						var el = $scope.find('.color-picker-hue');
						$scope.hue = (1 - ((evt.pageY - $scope.offset(el, 'top')) / el.prop('offsetHeight'))) * 360;
					}
				};

				$scope.$watch('hue', function(newValue, oldValue) {
					if (newValue !== undefined) {
						$scope.log('Color Picker: HUE - CHANGED');
						$scope.huePos = (1 - (newValue / 360)) * $scope.find('.color-picker-hue').prop('offsetHeight');
						$scope.grid = tinycolor({h: newValue, s: 50, l: 50}).toHslString();
						$scope.update();
					}
				});

				//---------------------------
				// OPACITY
				//---------------------------
				$scope.opacityDown = function() {
					$scope.log('Color Picker: OPACITY - MOUSE DOWN');
					$scope.opacityMouse = true;
				};

				$scope.opacityUp = function() {
					$scope.log('Color Picker: OPACITY - MOUSE UP');
					$scope.opacityMouse = false;
				};

				$scope.opacityChange = function(evt, forceRun) {
					if ($scope.opacityMouse || forceRun) {
						$scope.log('Color Picker: OPACITY - MOUSE CHANGE');
						var el = $scope.find('.color-picker-opacity');
						$scope.opacity = (1 - ((evt.pageY - $scope.offset(el, 'top')) / el.prop('offsetHeight'))) * 100;
					}
				};

				$scope.$watch('opacity', function(newValue, oldValue) {
					if (newValue !== undefined) {
						$scope.log('Color Picker: OPACITY - CHANGED');
						$scope.opacityPos = (1 - (newValue / 100)) * $scope.find('.color-picker-opacity').prop('offsetHeight');
						$scope.update();
					}
				});

				//---------------------------
				// COLOR
				//---------------------------
				$scope.colorDown = function() {
					$scope.log('Color Picker: COLOR - MOUSE DOWN');
					$scope.colorMouse = true;
				};

				$scope.colorUp = function() {
					$scope.log('Color Picker: COLOR - MOUSE UP');
					$scope.colorMouse = false;
				};

				$scope.colorChange = function(evt, forceRun) {
					if ($scope.colorMouse || forceRun) {
						$scope.log('Color Picker: COLOR - MOUSE CHANGE');
						var el = $scope.find('.color-picker-grid-inner');
						$scope.saturation = ((evt.pageX - $scope.offset(el, 'left')) / el.prop('offsetWidth')) * 100;
						$scope.lightness = (1 - ((evt.pageY - $scope.offset(el, 'top')) / el.prop('offsetHeight'))) * 100;
					}
				};

				$scope.$watch('saturation', function(newValue, oldValue) {
					if (newValue !== undefined && newValue !== oldValue) {
						$scope.log('Color Picker: SATURATION - CHANGED');
						$scope.saturationPos = (newValue / 100) * $scope.find('.color-picker-grid-inner').prop('offsetWidth');
						$scope.update();
					}
				});

				$scope.$watch('lightness', function(newValue, oldValue) {
					if (newValue !== undefined && newValue !== oldValue) {
						$scope.log('Color Picker: LIGHTNESS - CHANGED');
						$scope.lightnessPos = (1 - (newValue / 100)) * $scope.find('.color-picker-grid-inner').prop('offsetHeight');
						$scope.update();
					}
				});


				//---------------------------
				// HELPER FUNCTIONS
				//---------------------------
				$scope.log = function() {
					console.log.apply(console, arguments);
				};

				// taken and modified from jQuery's find
				$scope.find = function(selector) {
					var context = $scope.wrapper ? $scope.wrapper[0] : element[0],
						results = [],
						i = 0,
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

				$scope.contains = function(a, b) {
					if (b) {
						while ((b = b.parentNode)) {
							if (b === a) {
								return true;
							}
						}
					}

					return false;
				};

				$scope.offset = function(el, type) {
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
	}]);
