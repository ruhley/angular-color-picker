import tinycolor from 'tinycolor2';

export default class AngularColorPickerController {
    constructor(_$scope, _$element, _$document, _$timeout, _ColorPickerOptions) {
        // set angular injected variables
        this.$scope = _$scope;
        this.$element = _$element;
        this.$document = _$document;
        this.$timeout = _$timeout;
        this.ColorPickerOptions = _ColorPickerOptions;

        // make the init function available from the $scope (for the directive link function)
        this.$scope.init = this.init.bind(this);

        // set default values
        this.ngModelOptions = {};
        this.hue = 0;
        this.saturation = undefined;
        this.lightness = undefined;
        this.opacity = undefined;

        this.basicEventTypes = ['hue', 'saturation', 'lightness', 'opacity'];
        this.fullEventTypes = ['color', 'hue', 'saturation', 'lightness', 'opacity'];
    }

    //---------------------------
    // init functions
    //---------------------------

    init() {

        // ng model options
        if (this.$scope.control[0].$options && this.$scope.control[0].$options.$$options) {
            this.ngModelOptions = this.$scope.control[0].$options.$$options;
        }

        // browser variables
        this.chrome = Boolean(window.chrome);
        let _android_version = window.navigator.userAgent.match(/Android\s([0-9\.]*)/i);
        this.android_version = _android_version && _android_version.length > 1 ? parseFloat(_android_version[1]) : NaN;

        // needed variables
        this.updateModel = true;

        // watchers
        this.initWatchers();

        // set default config settings
        this.initConfig();

        // mouse events
        this.initMouseEvents();
    }

    initConfig() {
        if (!this.options) {
            this.options = {};
        }

        this.mergeOptions(this.options, this.ColorPickerOptions);

        this.is_open = this.options.inline;

        if (this.options.inline) {
            this.options.close.show = false;
        }

        this.pickerDimensions = {
            width: 150,
            height: 150
        };

        this.sliderDimensions = {
            width: this.options.horizontal ? this.pickerDimensions.width : 20,
            height: this.options.horizontal ? 20 : this.pickerDimensions.height,
        };
    }

    mergeOptions(options, defaultOptions) {
        for (var attr in defaultOptions) {
            if (defaultOptions.hasOwnProperty(attr)) {
                if (!options || !options.hasOwnProperty(attr)) {
                    options[attr] = defaultOptions[attr];
                } else if (typeof defaultOptions[attr] === 'object') {
                    this.mergeOptions(options[attr], defaultOptions[attr]);
                }
            }
        }
    }

    //---------------------------
    // watcher functions
    //---------------------------

    initWatchers() {

        // ngModel

        this.$scope.$watch('AngularColorPickerController.internalNgModel', this.watchInternalNgModel.bind(this));
        this.$scope.$watch('AngularColorPickerController.ngModel', this.watchNgModel.bind(this));

        // options

        this.$scope.$watch('AngularColorPickerController.options.swatchPos', (newValue) => {
            if (newValue !== undefined) {
                this.initConfig();

                this.$timeout(() => {
                    this.updateSwatchBackground();
                });
            }
        });

        this.$scope.$watchGroup(
            [
                'AngularColorPickerController.options.format',
                'AngularColorPickerController.options.alpha',
                'AngularColorPickerController.options.case',
                'AngularColorPickerController.options.round',
                'AngularColorPickerController.options.restrictToFormat',
                'AngularColorPickerController.options.preserveInputFormat',
                'AngularColorPickerController.options.allowEmpty',
                'AngularColorPickerController.options.horizontal',
                'AngularColorPickerController.options.dynamicHue',
                'AngularColorPickerController.options.dynamicSaturation',
                'AngularColorPickerController.options.dynamicLightness',
                'AngularColorPickerController.options.dynamicAlpha'
            ],
            (newValue) => {
                if (newValue !== undefined) {
                    this.initConfig();
                    this.update();
                }
            }
        );

        this.$scope.$watchGroup(
            [
                'AngularColorPickerController.options.disabled',
                'AngularColorPickerController.options.swatchBootstrap',
                'AngularColorPickerController.options.swatchOnly',
                'AngularColorPickerController.options.swatch',
                'AngularColorPickerController.options.pos',
                'AngularColorPickerController.options.inline',
                'AngularColorPickerController.options.placeholder'
            ],
            (newValue) => {
                if (newValue !== undefined) {
                    this.initConfig();
                }
            }
        );

        // api

        this.$scope.$watch('AngularColorPickerController.api', this.setupApi.bind(this));

        // internal

        this.$scope.$watch('AngularColorPickerController.swatchColor', this.updateSwatchBackground.bind(this));

        this.$scope.$watch('AngularColorPickerController.hue', () => {
            this.valueUpdate('hue');
        });

        this.$scope.$watch('AngularColorPickerController.saturation', () => {
            this.valueUpdate('saturation');
        });

        this.$scope.$watch('AngularColorPickerController.lightness', () => {
            this.valueUpdate('lightness');
        });

        this.$scope.$watch('AngularColorPickerController.opacity', () => {
            this.valueUpdate('opacity');
        });
    }

    watchInternalNgModel(newValue, oldValue) {
        // the mouse is still moving so don't do anything yet
        if (this.colorMouse) {
            return;
        }

        // calculate and set color values
        this.watchNgModelSet(newValue);
    }

    /** Triggered on change to internal or external ngModel value */
    watchNgModel(newValue, oldValue) {
        // set initial value if not already set
        if (newValue !== undefined && !this.hasOwnProperty('initialNgModel')) {
            this.initialNgModel = newValue;
        }

        // sets the field to pristine or dirty for angular
        this.checkDirty(newValue);

        // update the internal model from external model
        this.internalNgModel = this.ngModelOptions.getterSetter ? this.ngModel() : this.ngModel;

        // the mouse is still moving so don't do anything yet
        if (this.colorMouse) {
            return;
        }

        // calculate and set color values
        this.watchNgModelSet(newValue);
    }

    /** Helper for watchNgModel to set internal values and validity */
    watchNgModelSet(newValue) {
        if (newValue !== undefined && newValue !== null) {
            var color = tinycolor(newValue);
            var isValid = this.isColorValid(color);

            if (isValid) {
                this.setColorValue(color);

                this.updateModel = false;

                this.$timeout(() => {
                    this.updateModel = true;
                });
            }

            this.$scope.control[0].$setValidity('color', isValid);
        } else {
            if (newValue === null || newValue === '') {
                this.hue = 0;
                this.saturation = undefined;
                this.lightness = undefined;
                this.opacity = undefined;
            }

            this.swatchColor = '';
        }
    }

    //---------------------------
    // mouse/touch event functions
    //---------------------------

    initMouseEvents() {
        const eventHandlers = {
            mouseDown: this.onMouseDown.bind(this),
            mouseUp: this.onMouseUp.bind(this),
            mouseMove: this.onMouseMove.bind(this),
            keyUp: this.onKeyUp.bind(this)
        };

        // setup mouse events
        this.$document.on('mousedown', eventHandlers.mouseDown);
        this.$document.on('mouseup', eventHandlers.mouseUp);
        this.$document.on('mousemove', eventHandlers.mouseMove);

        // setup touch events
        this.$document.on('touchstart', eventHandlers.mouseDown);
        this.$document.on('touchend', eventHandlers.mouseUp);
        this.$document.on('touchmove', eventHandlers.mouseMove);

        // setup key events
        this.$document.on('keyup', eventHandlers.keyUp);

        // grid click
        this.find('.color-picker-grid').on('click', (event) => {
            this.onClick('color', event);
        });
        this.find('.color-picker-grid').on('touchend', (event) => {
            this.onClick('color', event);
        });

        // hue click
        this.find('.color-picker-hue').on('click', (event) => {
            this.onClick('hue', event);
        });
        this.find('.color-picker-hue').on('touchend', (event) => {
            this.onClick('hue', event);
        });

        // saturation click
        this.find('.color-picker-saturation').on('click', (event) => {
            this.onClick('saturation', event);
        });
        this.find('.color-picker-saturation').on('touchend', (event) => {
            this.onClick('saturation', event);
        });

        // lightness click
        this.find('.color-picker-lightness').on('click', (event) => {
            this.onClick('lightness', event);
        });
        this.find('.color-picker-lightness').on('touchend', (event) => {
            this.onClick('lightness', event);
        });

        // opacity click
        this.find('.color-picker-opacity').on('click', (event) => {
            this.onClick('opacity', event);
        });
        this.find('.color-picker-opacity').on('touchend', (event) => {
            this.onClick('opacity', event);
        });

        this.find('.color-picker-input').on('focusin', this.onFocus.bind(this));
        this.find('.color-picker-input').on('focusout', this.onBlur.bind(this));

        //---------------------------
        // destroy
        //---------------------------

        this.$scope.$on('$destroy', () => {
            // remove mouse events
            this.$document.off('mousedown', eventHandlers.mouseDown);
            this.$document.off('mouseup', eventHandlers.mouseUp);
            this.$document.off('mousemove', eventHandlers.mouseMove);

            // remove touch events
            this.$document.off('touchstart', eventHandlers.mouseDown);
            this.$document.off('touchend', eventHandlers.mouseUp);
            this.$document.off('touchmove', eventHandlers.mouseMove);

            // remove key events
            this.$document.off('keyup', eventHandlers.keyUp);

            this.eventApiDispatch('onDestroy');
        });
    }

    onMouseDown(event) {
        this.has_moused_moved = false;

        // if disabled or not an element in this picker then do nothing
        if (this.options.disabled || this.find(event.target).length === 0) {
            return true;
        }

        for (var i = 0; i < this.fullEventTypes.length; i++) {
            this.onMouseDownType(this.fullEventTypes[i], event);
        }
    }

    onMouseDownType(type, event) {
        if (
            type === 'color' &&
            (event.target.classList.contains('color-picker-grid-inner') ||
            event.target.classList.contains('color-picker-picker') ||
            event.target.parentNode.classList.contains('color-picker-picker'))
        ) {
            this.mouseEventToggle(type, false, event);
        } else if (event.target.classList.contains(`color-picker-${type}`) || event.target.parentNode.classList.contains(`color-picker-${type}`)) {
           this.mouseEventToggle(type, false, event);
       }
    }

    onMouseUp(event) {
        // no current mouse events and not an element in the picker
        if (!this.anyMouseEvents() && this.find(event.target).length === 0) {
            this.setupApi();
            if (this.options.hide.click) {
                this.api.close(event);
            }
            this.$scope.$apply();
        } else {
            for (var i = 0; i < this.fullEventTypes.length; i++) {
                this.onMouseUpType(this.fullEventTypes[i], event);
            }
        }
    }

    onMouseUpType(type, event) {
        if (this[`${type}Mouse`] && this.has_moused_moved) {
            this.mouseEventToggle(type, true, event);
            this.onChange(event);
        }
    }

    onMouseMove(event) {
        for (var i = 0; i < this.fullEventTypes.length; i++) {
            this.onMouseMoveType(this.fullEventTypes[i], event);
        }
    }

    onMouseMoveType(type, event) {
        if (this[`${type}Mouse`]) {
            this.has_moused_moved = true;
            this.valueChange(type, event);
            this.$scope.$apply();
        }
    }

    onKeyUp(event) {
        // escape key
        if (this.options.hide.escape && event.keyCode === 27) {
            this.api.close(event);
        }
    }

    onClick(type, event) {
        if (!this.options.disabled && !this.has_moused_moved) {
            this.valueChange(type, event);
            this.mouseEventToggle(type, true, event);
            this.onChange(event);
        }
    }

    onChange(event) {
        // don't fire if it hasn't actually changed
        if (this.internalNgModel !== this.onChangeValue) {
            this.onChangeValue = this.internalNgModel;

            this.eventApiDispatch('onChange', [event]);
        }
    }

    onBlur(event) {
        if (this.internalNgModel !== this.onChangeValue || this.internalNgModel !== this.ngModel) {
            this.updateModel = true;
            this.update();
        }

        this.$scope.control[0].$setTouched();

        this.eventApiDispatch('onBlur', [event]);

        // if clicking outside the color picker
        if (this.options.hide.blur && this.find(event.relatedTarget).length === 0) {
            this.api.close(event);
        }
    }

    onSwatchClick($event) {
        if (this.options.show.swatch && !this.options.disabled) {
            this.api.open($event);
        }
    }

    onFocus($event) {
        if (this.options.show.focus) {
            this.api.open($event);
        }
    }

    //---------------------------
    // api functions
    //---------------------------

    /** Sets up the external api */
    setupApi() {
        if (!this.api) {
            this.api = {};
        }

        this.api.open = (event) => {
            // if already open then don't run show again
            if (this.is_open) {
                return true;
            }

            this.is_open = true;
            this.hueMouse = false;
            this.opacityMouse = false;
            this.colorMouse = false;

            // force redraw
            this.$scope.$applyAsync();

            // force the sliders to re-caculate their position
            for (var i = 0; i < this.basicEventTypes.length; i++) {
                this.valueUpdate(this.basicEventTypes[i]);
            }

            this.eventApiDispatch('onOpen', [event]);
        };

        this.api.close = (event) => {
            // check that it is not already closed
            if (!this.options.inline && (this.is_open || this.$element[0].querySelector('.color-picker-panel').offsetParent !== null)) {
                this.is_open = false;
                this.$scope.$applyAsync();

                this.update();
                this.eventApiDispatch('onClose', [event]);
            }
        };

        this.api.clear = (event) => {
            this.setNgModel(null);

            this.eventApiDispatch('onClear', [event]);
        };

        this.api.reset = (event) => {
            if (this.internalNgModel !== this.initialNgModel) {
                this.setNgModel(this.initialNgModel);

                this.eventApiDispatch('onReset', [event]);
            }
        };

        this.api.getElement = () => {
            return this.$element;
        };

        this.api.getScope = () => {
            return this.$scope;
        };
    }

    //---------------------------
    // model functions
    //---------------------------

    /** Sets the internal and external ngModel values */
    setNgModel(value) {
        this.internalNgModel = value;

        if (this.ngModelOptions.getterSetter) {
            this.ngModel(value);
        } else {
            this.ngModel = value;
        }
    }

    update() {
        if (!this.areAllValuesSet()) {
            return false;
        }

        var color = tinycolor(this.getColorValue());

        this.swatchColor = color.toHslString();

        this.updateGridBackground(color);
        this.updateHueBackground(color);
        this.huePosUpdate();
        this.updateSaturationBackground(color);
        this.saturationPosUpdate();
        this.updateLightnessBackground(color);
        this.lightnessPosUpdate();
        this.updateOpacityBackground(color);
        this.opacityPosUpdate();

        var skipUpdate = this.options.preserveInputFormat && tinycolor(this.internalNgModel).toHsvString() === color.toHsvString();

        if (this.updateModel && !skipUpdate) {
            let formats = {
                rgb: 'toRgbString',
                hex: 'toHex',
                hex8: 'toHex8',
                hexstring: 'toHexString',
                hex8string: 'toHex8String',
                hsv: 'toHsvString',
                hsl: 'toHslString',
                raw: 'clone',
            };

            let value = color[formats[this.options.format.toLowerCase()]]();

            if (this.options.format.match(/hex/i)) {
                value = this.options.case === 'upper' ? value.toUpperCase() : value.toLowerCase();
            }

            this.setNgModel(value);
        }
    }

    //---------------------------
    // generic value functions
    //---------------------------

    mouseEventToggle(type, up, event) {
        this.stopEvent(event);
        this[`${type}Mouse`] = !up;
        this.$scope.$apply();
    }

    valueChange(type, event) {
        this.stopEvent(event);

        if (type === 'color') {
            return this.colorChange(event);
        }

        var el = this.find(`.color-picker-${type}`);
        var eventPos = this.getEventPos(event);
        var max = this.getMaxFromType(type);

        this[type] = this.calculateSliderPos(el, eventPos, max);

        if (this[type] > max) {
            this[type] = max;
        } else if (this[type] < 0) {
            this[type] = 0;
        }
    }

    valueUpdate(type) {
        if (this[type] !== undefined) {
            if (type === 'saturation') {
                this[`${type}Pos`] = this[type];
            } else {
                var max = this.getMaxFromType(type);
                this[`${type}Pos`] = (1 - (this[type] / max)) * 100;
            }

            if (this[`${type}Pos`] < 0) {
                this[`${type}Pos`] = 0;
            } else if (this[`${type}Pos`] > 100) {
                this[`${type}Pos`] = 100;
            }

            if (this.options.round) {
                this.getRoundPos();
                this.updateRoundPos();
            }

            this[`${type}PosUpdate`]();
            this.update();
        }
    }

    //---------------------------
    // hue functions
    //---------------------------

    huePosUpdate() {
        var el = angular.element(this.$element[0].querySelector('.color-picker-hue .color-picker-slider'));

        if (this.options.horizontal) {
            el.css({
                'left': (this.sliderDimensions.width * this.huePos / 100) + 'px',
                'top': 0
            });
        } else {
            el.css({
                'left': 0,
                'top': (this.sliderDimensions.height * this.huePos / 100) + 'px'
            });
        }
    }

    updateHueBackground(color) {
        var el = this.find('.color-picker-hue .color-picker-overlay');
        var direction = this.options.horizontal ? 'left' : 'top';

        var zero_sixths = this.getColorValue(this.options.dynamicHue);
        var one_sixths = this.getColorValue(this.options.dynamicHue);
        var two_sixths = this.getColorValue(this.options.dynamicHue);
        var three_sixths = this.getColorValue(this.options.dynamicHue);
        var four_sixths = this.getColorValue(this.options.dynamicHue);
        var five_sixths = this.getColorValue(this.options.dynamicHue);
        var six_sixths = this.getColorValue(this.options.dynamicHue);

        zero_sixths.h = 0;
        one_sixths.h = 60;
        two_sixths.h = 120;
        three_sixths.h = 180;
        four_sixths.h = 240;
        five_sixths.h = 300;
        six_sixths.h = 359;

        el.css({
            'background': 'linear-gradient(to ' + direction + ', ' +
                tinycolor(zero_sixths).toRgbString() + ' 0%, ' +
                tinycolor(one_sixths).toRgbString() + ' 17%, ' +
                tinycolor(two_sixths).toRgbString() + ' 33%, ' +
                tinycolor(three_sixths).toRgbString() + ' 50%, ' +
                tinycolor(four_sixths).toRgbString() + ' 67%, ' +
                tinycolor(five_sixths).toRgbString() + ' 83%, ' +
                tinycolor(six_sixths).toRgbString() + ' 100%)'
        });
    }

    //---------------------------
    // saturation functions
    //---------------------------

    saturationPosUpdate() {
        var el;

        if (!this.options.round) {
            el = angular.element(this.$element[0].querySelector('.color-picker-grid .color-picker-picker'));

            el.css({
                'left': (this.pickerDimensions.height * this.saturationPos / 100) + 'px'
            });
        }

        el = angular.element(this.$element[0].querySelector('.color-picker-saturation .color-picker-slider'));

        if (this.options.horizontal) {
            el.css({
                'left': (this.sliderDimensions.width * (100 - this.saturationPos) / 100) + 'px',
                'top': 0
            });
        } else {
            el.css({
                'left': 0,
                'top': (this.sliderDimensions.height * (100 - this.saturationPos) / 100) + 'px'
            });
        }
    }

    updateSaturationBackground(color) {
        var el = this.find('.color-picker-saturation .color-picker-overlay');
        var direction = this.options.horizontal ? 'right' : 'bottom';
        var high = this.getColorValue(this.options.dynamicSaturation);
        var low = this.getColorValue(this.options.dynamicSaturation);

        high.s = '100%';
        low.s = '0%';

        el.css({
            'background': 'linear-gradient(to ' + direction + ', ' + tinycolor(high).toRgbString() + ' 0%, ' + tinycolor(low).toRgbString() + ' 100%)'
        });
    }

    //---------------------------
    // lightness functions
    //---------------------------

    lightnessPosUpdate() {
        var el;

        if (!this.options.round) {
            el = angular.element(this.$element[0].querySelector('.color-picker-grid .color-picker-picker'));

            el.css({
                'top': (this.pickerDimensions.width * this.lightnessPos / 100) + 'px'
            });
        }

        el = angular.element(this.$element[0].querySelector('.color-picker-lightness .color-picker-slider'));

        if (this.options.horizontal) {
            el.css({
                'left': (this.sliderDimensions.width * this.lightnessPos / 100) + 'px',
                'top': 0
            });
        } else {
            el.css({
                'left': 0,
                'top': (this.sliderDimensions.height * this.lightnessPos / 100) + 'px'
            });
        }
    }

    updateLightnessBackground(color) {
        var el = this.find('.color-picker-lightness .color-picker-overlay');
        var direction = this.options.horizontal ? 'right' : 'bottom';
        var bright = this.getColorValue(this.options.dynamicLightness);
        var middle = this.getColorValue(this.options.dynamicLightness);
        var dark = this.getColorValue(this.options.dynamicLightness);

        if (this.options.round) {
            bright.l = 100;
            middle.l = 50;
            dark.l = 0;
        } else {
            bright.v = 100;
            middle.v = 50;
            dark.v = 0;
        }

        el.css({
            'background': 'linear-gradient(to ' + direction + ', ' + tinycolor(bright).toRgbString() + ' 0%, ' + tinycolor(middle).toRgbString() + ' 50%, ' + tinycolor(dark).toRgbString() + ' 100%)'
        });
    }

    //---------------------------
    // opacity functions
    //---------------------------

    opacityPosUpdate() {
        var el = angular.element(this.$element[0].querySelector('.color-picker-opacity .color-picker-slider'));

        if (this.options.horizontal) {
            el.css({
                'left': (this.sliderDimensions.width * this.opacityPos / 100) + 'px',
                'top': 0
            });
        } else {
            el.css({
                'left': 0,
                'top': (this.sliderDimensions.height * this.opacityPos / 100) + 'px'
            });
        }
    }

    updateOpacityBackground(color) {
        var el = this.find('.color-picker-opacity .color-picker-overlay');
        var direction = this.options.horizontal ? 'right' : 'bottom';
        var opaque = this.getColorValue(this.options.dynamicAlpha);
        var transparent = this.getColorValue(this.options.dynamicAlpha);

        opaque.a = 1;
        transparent.a = 0;

        el.css({
            'background': 'linear-gradient(to ' + direction + ', ' + tinycolor(opaque).toRgbString() + ' 0%, ' + tinycolor(transparent).toRgbString() + ' 100%)'
        });
    }

    //---------------------------
    // color functions
    //---------------------------

    colorChange(event) {
        this.stopEvent(event);

        var el = this.find('.color-picker-grid-inner');
        var eventPos = this.getEventPos(event);
        var offset = this.offset(el);

        if (this.options.round) {
            this.colorChangeRound(el, offset, eventPos);
        } else {
            this.colorChangeSquare(el, offset, eventPos);
        }
    }

    colorChangeRound(el, offset, eventPos) {
        var dx = ((eventPos.pageX - offset.left) * 2.0 / el.prop('offsetWidth')) - 1.0;
        var dy = -((eventPos.pageY - offset.top) * 2.0 / el.prop('offsetHeight')) + 1.0;

        var tmpHue = Math.atan2(dy, dx);
        var degHue = Math.round(tmpHue * 57.29577951308233); // rad to deg
        if (degHue < 0) {
            degHue += 360;
        }
        this.hue = degHue;

        var tmpSaturation = Math.sqrt(dx * dx + dy * dy);

        if (tmpSaturation > 1) {
            tmpSaturation = 1;
        } else if (tmpSaturation < 0) {
            tmpSaturation = 0;
        }

        this.saturation = tmpSaturation * 100;

        if (this.lightness === undefined) {
            this.lightness = 50;
        }
    }

    colorChangeSquare(el, offset, eventPos) {
        this.saturation = ((eventPos.pageX - offset.left) / el.prop('offsetWidth')) * 100;
        this.lightness = (1 - ((eventPos.pageY - offset.top) / el.prop('offsetHeight'))) * 100;

        if (this.saturation > 100) {
            this.saturation = 100;
        } else if (this.saturation < 0) {
            this.saturation = 0;
        }

        if (this.lightness > 100) {
            this.lightness = 100;
        } else if (this.lightness < 0) {
            this.lightness = 0;
        }
    }

    updateGridBackground(color) {
        var el = this.find('.color-picker-grid .color-picker-overlay');
        var background = this.getColorValue();

        if (this.options.round) {
            background.s = '0%';
        } else {
            background.s = '100%';
            background.v = '100%';
            background.a = 1;
        }

        el.css({
            'background-color': tinycolor(background).toRgbString(),
            'opacity': color.getAlpha()
        });

        this.find('.color-picker-grid .color-picker-grid-inner').css({
            'opacity': color.getAlpha()
        });
    }

    updateSwatchBackground() {
        var el = angular.element(this.$element[0].querySelector('.color-picker-swatch'));
        el.css({
            'background-color': this.swatchColor
        });
    }

    //---------------------------
    // helper functions
    //---------------------------

    isColorValid(color) {
        let isValid = color.isValid();

        if (isValid && this.options.restrictToFormat) {
            let format = this.options.format;
            isValid = color.getFormat() === this.getTinyColorFormat();
        }

        if (!isValid && this.options.allowEmpty) {
            let input = color.getOriginalInput();

            if (input === undefined || input === null || input === '') {
                isValid = true;
            }
        }

        return isValid;
    }

    getTinyColorFormat() {
        if (this.options.format === 'hexString') {
            return 'hex';
        } else if (this.options.format === 'hex8String') {
            return 'hex8';
        }

        return this.options.format;
    }

    areAllValuesSet() {
        if (this.hue === undefined || this.saturation === undefined || this.lightness === undefined) {
            return false;
        }

        return true;
    }

    getColorValue(dynamicValues = true, includeOpacity = true) {
        let value = {
            h: this.hue,
            s: dynamicValues ? `${this.saturation}%` : '100%',
            v: dynamicValues ? `${this.lightness}%`: '100%'
        };

        if (this.options.round) {
            value = {
                h: this.hue,
                s: dynamicValues ? `${this.saturation}%` : '100%',
                l: dynamicValues ? `${this.lightness}%` : '50%'
            };
        }

        if (includeOpacity) {
            value.a = dynamicValues ? this.opacity / 100 : 1;
        }

        return value;
    }

    /* eslint-disable complexity */
    setColorValue(color) {
        let noMouseEvents = !this.anyMouseEvents();
        let hsl = this.options.round ? color.toHsl() : color.toHsv();

        if (noMouseEvents || this.hueMouse) {
            this.hue = hsl.h;
        }

        if (noMouseEvents || this.saturationMouse) {
            this.saturation = hsl.s * 100;
        }

        if (noMouseEvents || this.lightnessMouse) {
            this.lightness = (this.options.round ? hsl.l : hsl.v) * 100;
        }

        if (this.options.alpha && (noMouseEvents || this.opacityMouse)) {
            this.opacity = hsl.a * 100;
        }
    }
    /* eslint-enable complexity */

    checkDirty(color) {
        // check dirty/pristine state
        if (this.hasOwnProperty('initialNgModel')) {
            if (color === this.initialNgModel) {
                if (typeof this.$scope.control[0].$setPristine === 'function') {
                    this.$scope.control[0].$setPristine();
                }
            } else {
                if (typeof this.$scope.control[0].$setDirty === 'function') {
                    this.$scope.control[0].$setDirty();
                }
            }
        }
    }

    stopEvent(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    getRoundPos() {
        var angle = this.hue * 0.01745329251994; // deg to rad
        var px = Math.cos(angle) * this.saturation;
        var py = -Math.sin(angle) * this.saturation;

        this.xPos = (px + 100.0) * 0.5;
        this.yPos = (py + 100.0) * 0.5;

        // because it are using percentages this can be half of 100%
        var center = 50;
        // distance of pointer from the center of the circle
        var distance = Math.pow(center - this.xPos, 2) + Math.pow(center - this.yPos, 2);
        // distance of edge of circle from the center of the circle
        var radius = Math.pow(center, 2);

        // if not inside the circle
        if (distance > radius) {
            var rads = Math.atan2(this.yPos - center, this.xPos - center);
            this.xPos = Math.cos(rads) * center + center;
            this.yPos = Math.sin(rads) * center + center;
        }
    }

    updateRoundPos() {
        var el = angular.element(this.$element[0].querySelector('.color-picker-grid .color-picker-picker'));

        el.css({
            left: (this.pickerDimensions.width * this.xPos / 100) + 'px',
            top: (this.pickerDimensions.height * this.yPos / 100) + 'px'
        });
    }

    getEventPos(event) {
        // if a touch event
        if (event.type.search('touch') === 0) {
            // if event modified by angular
            if (event.originalEvent && event.originalEvent.changedTouches) {
                return event.originalEvent.changedTouches[0];
                // if a standard js touch event
            } else if (event.changedTouches) {
                return event.changedTouches[0];
            }
        }

        // return a non-touch event
        return event;
    }

    calculateSliderPos(el, eventPos, multiplier) {
        if (this.options.horizontal) {
            return Math.round((1 - ((eventPos.pageX - this.offset(el).left) / el.prop('offsetWidth'))) * multiplier);
        }

        return Math.round((1 - ((eventPos.pageY - this.offset(el).top) / el.prop('offsetHeight'))) * multiplier);
    }

    eventApiDispatch(name, args) {
        if (this.eventApi && typeof this.eventApi[name] === 'function') {
            if (!args) {
                args = [];
            }

            args.unshift(this.internalNgModel);
            args.unshift(this.api);

            this.eventApi[name].apply(this, args);
        }
    }

    /** taken and modified from jQuery's find */
    find(selector) {
        var context = this.wrapper ? this.wrapper[0] : this.$element[0],
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
            if (context.contains(selector)) {
                results.push(selector);
            }
        }

        return angular.element(results);
    }

    /** taken and modified from jQuery's offset */
    offset(el) {
        var docElem, win, rect, doc, elem = el[0];

        if (!elem) {
            return;
        }

        // Support: IE<=11+
        // Running getBoundingClientRect on a
        // disconnected node in IE throws an error
        if (!elem.getClientRects().length) {
            return {
                top: 0,
                left: 0
            };
        }

        rect = elem.getBoundingClientRect();

        // Make sure element is not hidden (display: none)
        if (rect.width || rect.height) {
            doc = elem.ownerDocument;
            win = this.getWindowElements(doc);
            docElem = doc.documentElement;

            // hack for small chrome screens not position the clicks properly when the page is scrolled
            if (this.chrome && this.android_version < 6 && screen.width <= 768) {
                return {
                    top: rect.top - docElem.clientTop,
                    left: rect.left - docElem.clientLeft
                };
            }

            return {
                top: rect.top + win.pageYOffset - docElem.clientTop,
                left: rect.left + win.pageXOffset - docElem.clientLeft
            };
        }


        return rect;
    }

    getWindowElements(doc) {
        return doc !== null && doc === doc.window ? doc : doc.nodeType === 9 && doc.defaultView;
    }

    anyMouseEvents() {
        return this.colorMouse || this.hueMouse || this.saturationMouse || this.lightnessMouse || this.opacityMouse;
    }

    getMaxFromType(type) {
        return type === 'hue' ? 360 : 100;
    }
}

AngularColorPickerController.$inject = ['$scope', '$element', '$document', '$timeout', 'ColorPickerOptions'];
