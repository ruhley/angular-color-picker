'use strict';

angular.module('color-picker', [])
	.directive('colorPicker', ['$compile', function ($compile) {
		return {
			restrict: 'E',
			require: '?ngModel',
			link: function($scope, element, attrs) {
				$scope.init = function() {
					$scope.createInput();
					$scope.hue = 0;
					$scope.saturation = 50;
					$scope.lightness = 50;
					$scope.opacity = 100;
				};

				$scope.createInput = function() {
					var html, el, template,
						currentInput = element.find('.color-picker-wrapper');

					if (currentInput.length > 0) {
						return currentInput;
					}

					html = '<div class="color-picker-wrapper" ng-class="{\'color-picker-focus\': visible}">' +
								'<input class="color-picker-input form-control" type="text" ng-model="ngModel" size="7" ng-focus="show()">' +
								'<span class="color-picker-swatch">' +
									'<span class="color-picker-swatch-color" style="background-color: {{swatch}};"></span>' +
								'</span>' +
								'<div class="color-picker-panel">' +
									'<div class="color-picker-hue color-picker-sprite" ng-click="hueChange($event, true)" ng-mousemove="hueChange($event, false)" ng-mousedown="hueDown()" ng-mouseup="hueUp()">' +
										'<div class="color-picker-slider" style="top: {{huePos}}px;"></div>' +
									'</div>' +
									'<div class="color-picker-opacity color-picker-sprite" ng-click="opacityChange($event, true)" ng-mousemove="opacityChange($event, false)" ng-mousedown="opacityDown()" ng-mouseup="opacityUp()">' +
										'<div class="color-picker-slider" style="top: {{opacityPos}}px;"></div>' +
									'</div>' +
									'<div class="color-picker-grid color-picker-sprite" style="background-color: {{grid}};" ng-click="colorChange($event, true)" ng-mousemove="colorChange($event, false)" ng-mousedown="colorDown()" ng-mouseup="colorUp()">' +
										'<div class="color-picker-grid-inner"></div>' +
										'<div class="color-picker-picker" style="top: {{lightnessPos}}px; left: {{saturationPos}}px;">' +
											'<div></div>' +
										'</div>' +
									'</div>' +
								'</div>' +
							'</div>';

					el = angular.element(html);
					template = $compile(el)($scope);
					element.append(template);

					return el;
				};

				$scope.focus = function() {
					$scope.log('color Picker: Focus Event');
					element.find('.color-picker-input').focus();
				};

				$scope.show = function() {
					$scope.log('color Picker: Show Event');
					$scope.visible = true;
				};

				$scope.hide = function() {
					$scope.log('color Picker: Hide Event');
					$scope.visible = false;
				};

				$scope.update = function() {
					var color = tinycolor({h: $scope.hue, s: $scope.saturation, l: $scope.lightness});
					color.setAlpha($scope.opacity / 100);
					$scope.log('color Picker: COLOR CHANGED TO ', color, $scope.hue, $scope.saturation, $scope.lightness, $scope.opacity);
					$scope.swatch = color.toHslString();
					$scope.ngModel = color.toHslString();
				};

				$scope.$watch('ngModel', function(newValue, oldValue) {
					if (newValue !== undefined && newValue !== oldValue) {
						$scope.log('color Picker: MODEL - CHANGED', newValue);
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

				//---------------------------
				// HUE
				//---------------------------
				$scope.hueDown = function() {
					$scope.log('color Picker: HUE - MOUSE DOWN');
					$scope.hueMouse = true;
				};

				$scope.hueUp = function() {
					$scope.log('color Picker: HUE - MOUSE UP');
					$scope.hueMouse = false;
				};

				$scope.hueChange = function(evt, forceRun) {
					if ($scope.hueMouse || forceRun) {
						$scope.log('color Picker: HUE - MOUSE CHANGE');
						var el = element.find('.color-picker-hue');
						$scope.hue = (1 - ((evt.pageY - el.offset().top) / el.height())) * 360;
					}
				};

				$scope.$watch('hue', function(newValue, oldValue) {
					if (newValue !== undefined) {
						$scope.log('color Picker: HUE - CHANGED');
						$scope.huePos = (1 - (newValue / 360)) * element.find('.color-picker-hue').height();
						$scope.grid = tinycolor({h: newValue, s: 50, l: 50}).toHslString();
						$scope.update();
					}
				});

				//---------------------------
				// OPACITY
				//---------------------------
				$scope.opacityDown = function() {
					$scope.log('color Picker: OPACITY - MOUSE DOWN');
					$scope.opacityMouse = true;
				};

				$scope.opacityUp = function() {
					$scope.log('color Picker: OPACITY - MOUSE UP');
					$scope.opacityMouse = false;
				};

				$scope.opacityChange = function(evt, forceRun) {
					if ($scope.opacityMouse || forceRun) {
						$scope.log('color Picker: OPACITY - MOUSE CHANGE');
						var el = element.find('.color-picker-opacity');
						$scope.opacity = (1 - ((evt.pageY - el.offset().top) / el.height())) * 100;
					}
				};

				$scope.$watch('opacity', function(newValue, oldValue) {
					if (newValue !== undefined) {
						$scope.log('color Picker: OPACITY - CHANGED');
						$scope.opacityPos = (1 - (newValue / 100)) * element.find('.color-picker-opacity').height();
						$scope.update();
					}
				});

				//---------------------------
				// COLOR
				//---------------------------
				$scope.colorDown = function() {
					$scope.log('color Picker: COLOR - MOUSE DOWN');
					$scope.colorMouse = true;
				};

				$scope.colorUp = function() {
					$scope.log('color Picker: COLOR - MOUSE UP');
					$scope.colorMouse = false;
				};

				$scope.colorChange = function(evt, forceRun) {
					if ($scope.colorMouse || forceRun) {
						$scope.log('color Picker: COLOR - MOUSE CHANGE');
						var el = element.find('.color-picker-grid-inner');
						$scope.saturation = ((evt.pageX - el.offset().left) / el.width()) * 100;
						$scope.lightness = (1 - ((evt.pageY - el.offset().top) / el.height())) * 100;
					}
				};

				$scope.$watch('saturation', function(newValue, oldValue) {
					if (newValue !== undefined && newValue !== oldValue) {
						$scope.log('color Picker: SATURATION - CHANGED');
						$scope.saturationPos = (newValue / 100) * element.find('.color-picker-grid-inner').width();
						$scope.update();
					}
				});

				$scope.$watch('lightness', function(newValue, oldValue) {
					if (newValue !== undefined && newValue !== oldValue) {
						$scope.log('color Picker: LIGHTNESS - CHANGED');
						$scope.lightnessPos = (1 - (newValue / 100)) * element.find('.color-picker-grid-inner').height();
						$scope.update();
					}
				});


				//---------------------------
				// HELPER FUNCTIONS
				//---------------------------
				$scope.log = function() {
					console.log.apply(console, arguments);
				};


				$scope.init();
			}
		};
	}]);
