export default class AngularColorPickerController {
    constructor(_$scope, _$element, _$document, _$timeout) {
        // set angular injected variables
        this.$scope = _$scope;
        this.$element = _$element;
        this.$document = _$document;
        this.$timeout = _$timeout;

        this.$scope.init = this.init.bind(this);

        this.hue = 0;
        this.saturation = undefined;
        this.lightness = undefined;
        this.opacity = undefined;
    }

    watchNgModel(newValue, oldValue) {
        if (this.colorMouse) {
            return;
        }

        if (newValue !== undefined && oldValue !== undefined && !this.hasOwnProperty('initialNgModel')) {
            this.initialNgModel = newValue;
        }

        // check dirty/pristine state
        if (this.hasOwnProperty('initialNgModel')) {
            if (newValue === this.initialNgModel) {
                if (typeof this.$scope.control[0].$setPristine === 'function') {
                    this.$scope.control[0].$setPristine();
                }
            } else {
                if (typeof this.$scope.control[0].$setDirty === 'function') {
                    this.$scope.control[0].$setDirty();
                }
            }
        }

        if (newValue !== undefined && newValue !== null && newValue.length > 4) {
            var color = tinycolor(newValue);

            if (color.isValid()) {
                var hsl = color.toHsv();

                this.updateModel = false;

                this.hue = hsl.h;
                this.saturation = hsl.s * 100;
                this.lightness = hsl.v * 100;

                if (this.options.alpha) {
                    this.opacity = hsl.a * 100;
                }

                this.$timeout(() => {
                    this.updateModel = true;
                });

                this.isValid = true;
            } else {
                this.isValid = false;
            }

            this.$scope.control[0].$setValidity(this.$element.attr('name'), this.isValid);
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

    watchSwatchPos(newValue) {
        if (newValue !== undefined) {
            this.initConfig();

            this.$timeout(() => {
                this.updateSwatchBackground();
            });
        }
    }

    setupApi () {
        if (!this.api) {
            this.api = {};
        }

        this.api.open = (event) => {
            // if already visible then don't run show again
            if (this.visible) {
                return true;
            }

            this.visible = true;
            this.hueMouse = false;
            this.opacityMouse = false;
            this.colorMouse = false;

            // force the sliders to re-caculate their position
            this.hueUpdate();
            this.saturationUpdate();
            this.lightnessUpdate();
            this.opacityUpdate();

            this.eventApiDispatch('onOpen', [event]);
        };

        this.api.close = (event) => {
            if (!this.options.inline && (this.visible || this.$element[0].querySelector('.color-picker-panel').offsetParent !== null)) {

                this.visible = false;
                this.$scope.$applyAsync();

                this.eventApiDispatch('onClose', [event]);
            }
        };

        this.api.clear = (event) => {
            if (this.ngModel !== '') {
                this.ngModel = '';

                this.eventApiDispatch('onClear', [event]);
            }
        };

        this.api.reset = (event) => {
            if (this.ngModel !== this.initialNgModel) {
                this.ngModel = this.initialNgModel;

                this.eventApiDispatch('onReset', [event]);
            }
        };

        this.api.getElement = () => {
            return this.$element;
        };
    }

    reInit(newValue) {
        if (newValue !== undefined) {
            this.initConfig();
        }
    }

    reInitAndUpdate(newValue) {
        if (newValue !== undefined) {
            this.initConfig();
            this.update();
        }
    }

    init () {
        // browser variables
        this.chrome = Boolean(window.chrome);
        let _android_version = window.navigator.userAgent.match(/Android\s([0-9\.]*)/i);
        this.android_version = _android_version && _android_version.length > 1 ? parseFloat(_android_version[1]) : NaN;

        // needed variables
        this.updateModel = true;

        //---------------------------
        // watchers
        //---------------------------

        // ngModel

        this.$scope.$watch('AngularColorPickerController.ngModel', this.watchNgModel.bind(this));

        // options

        this.$scope.$watch('AngularColorPickerController.options.swatchPos', this.watchSwatchPos.bind(this));

        this.$scope.$watchGroup(
            [
                'AngularColorPickerController.options.format',
                'AngularColorPickerController.options.alpha',
                'AngularColorPickerController.options.case'
            ],
            this.reInitAndUpdate.bind(this)
        );

        this.$scope.$watchGroup(
            [
                'AngularColorPickerController.options.disabled',
                'AngularColorPickerController.options.swatchBootstrap',
                'AngularColorPickerController.options.swatchOnly',
                'AngularColorPickerController.options.swatch',
                'AngularColorPickerController.options.pos',
                'AngularColorPickerController.options.inline',
                'AngularColorPickerController.options.placeholder',
                'AngularColorPickerController.options.round',
            ],
            this.reInit.bind(this)
        );

        // api

        this.$scope.$watch('AngularColorPickerController.api', this.setupApi.bind(this));

        // internal

        this.$scope.$watch('AngularColorPickerController.swatchColor', this.updateSwatchBackground.bind(this));

        this.$scope.$watch('AngularColorPickerController.hue', this.hueUpdate.bind(this));

        this.$scope.$watch('AngularColorPickerController.saturation', this.saturationUpdate.bind(this));

        this.$scope.$watch('AngularColorPickerController.lightness', this.lightnessUpdate.bind(this));

        this.$scope.$watch('AngularColorPickerController.opacity', this.opacityUpdate.bind(this));

        //---------------------------
        // destroy
        //---------------------------

        this.$scope.$on('$destroy', () => {
            this.$document.off('mousedown', this.onMouseDown);
            this.$document.off('mouseup', this.onMouseUp);
            this.$document.off('mousemove', this.onMouseMove);

            this.$document.off('touchstart', this.onMouseDown);
            this.$document.off('touchend', this.onMouseUp);
            this.$document.off('touchmove', this.onMouseMove);

            this.eventApiDispatch('onDestroy');
        });

        // set default config settings
        this.initConfig();

        // setup mouse events
        this.$document.on('mousedown', this.onMouseDown.bind(this));
        this.$document.on('mouseup', this.onMouseUp.bind(this));
        this.$document.on('mousemove', this.onMouseMove.bind(this));

        // setup touch events
        this.$document.on('touchstart', this.onMouseDown.bind(this));
        this.$document.on('touchend', this.onMouseUp.bind(this));
        this.$document.on('touchmove', this.onMouseMove.bind(this));

        // grid click
        this.find('.color-picker-grid').on('click', this.onColorClick.bind(this));
        this.find('.color-picker-grid').on('touchend', this.onColorClick.bind(this));

        // hue click
        this.find('.color-picker-hue').on('click', this.onHueClick.bind(this));
        this.find('.color-picker-hue').on('touchend', this.onHueClick.bind(this));

        // opacity click
        this.find('.color-picker-opacity').on('click', this.onOpacityClick.bind(this));
        this.find('.color-picker-opacity').on('touchend', this.onOpacityClick.bind(this));
    }

    onMouseDown (event) {
        // an element in this picker
        if (!this.options.disabled && this.find(event.target).length > 0) {
            // mouse event on color grid
            if (event.target.classList.contains('color-picker-grid-inner') || event.target.classList.contains('color-picker-picker') || event.target.parentNode.classList.contains('color-picker-picker')) {
                this.colorDown(event);
                this.$scope.$apply();
            // mouse event on hue slider
            } else if (event.target.classList.contains('color-picker-hue') || event.target.parentNode.classList.contains('color-picker-hue')) {
                this.hueDown(event);
                this.$scope.$apply();
            // mouse event on opacity slider
            } else if (event.target.classList.contains('color-picker-opacity') || event.target.parentNode.classList.contains('color-picker-opacity')) {
                this.opacityDown(event);
                this.$scope.$apply();
            }
        }
    }

    onMouseUp (event) {
        // no current mouse events and not an element in the picker
        if (!this.colorMouse && !this.hueMouse && !this.opacityMouse && this.find(event.target).length === 0) {
            this.setupApi(); // TODO - there are some weird times when this is needed to call close. Need to figure out why.
            this.api.close(event);
            this.$scope.$apply();
        // mouse event on color grid
        } else if (this.colorMouse) {
            this.colorUp(event);
            this.$scope.$apply();
            this.onChange(event);
        // mouse event on hue slider
        } else if (this.hueMouse) {
            this.hueUp(event);
            this.$scope.$apply();
            this.onChange(event);
        // mouse event on opacity slider
        } else if (this.opacityMouse) {
            this.opacityUp(event);
            this.$scope.$apply();
            this.onChange(event);
        }
    }

    onMouseMove (event) {
        // mouse event on color grid
        if (this.colorMouse) {
            this.colorChange(event);
            this.$scope.$apply();
        // mouse event on hue slider
        } else if (this.hueMouse) {
            this.hueChange(event);
            this.$scope.$apply();
        // mouse event on opacity slider
        } else if (this.opacityMouse) {
            this.opacityChange(event);
            this.$scope.$apply();
        }
    }

    onColorClick (event) {
        if (!this.options.disabled) {
            this.colorChange(event);
            this.$scope.$apply();
            this.onChange(event);
        }
    }

    onHueClick (event) {
        if (!this.options.disabled) {
            this.hueChange(event);
            this.$scope.$apply();
            this.onChange(event);
        }
    }

    onOpacityClick (event) {
        if (!this.options.disabled) {
            this.opacityChange(event);
            this.$scope.$apply();
            this.onChange(event);
        }
    }

    onChange (event) {
        // on first firing, set this so it doesn't fire twice
        if (!this.hasOwnProperty('onChangeValue')) {
            this.onChangeValue = this.ngModel;
        }

        // this can be triggered by both click and mouseup, so don't fire twice
        if (this.ngModel !== this.onChangeValue) {
            this.onChangeValue = this.ngModel;

            this.eventApiDispatch('onChange', [event]);
        }
    }

    onBlur (event) {
        if (this.ngModel !== this.onChangeValue) {
            this.updateModel = true;
            this.update();
        }

        this.eventApiDispatch('onBlur', [event]);
    }

    initConfig () {
        this.options = this.merge(this.options, {
            disabled: false,
            hue: true,
            alpha: true,
            round: false,
            case: 'upper',
            format: 'hsl',
            pos: 'bottom left',
            swatch: true,
            swatchOnly: false,
            swatchPos: 'left',
            swatchBootstrap: true,
            inline: false,
            placeholder: '',
            close: {
                show: false,
                label: 'Close',
                class: '',
            },
            clear: {
                show: false,
                label: 'Clear',
                class: '',
            },
            reset: {
                show: false,
                label: 'Reset',
                class: '',
            },
        });

        this.visible = this.options.inline;

        if (this.options.round) {
            this.options.hue = false;
        }
    }

    merge(options, defaultOptions) {
        var newObject = {};
        var attr;

        for (attr in defaultOptions) {
            if (defaultOptions.hasOwnProperty(attr)) {
                newObject[attr] = defaultOptions[attr];
            }
        }

        if (typeof options === 'object') {
            for (attr in options) {
                if (options.hasOwnProperty(attr)) {
                    if (typeof options[attr] === 'object') {
                        newObject[attr] = this.merge(options[attr], newObject[attr]);
                    } else {
                        newObject[attr] = options[attr];
                    }
                }
            }
        }

        return newObject;
    }

    focus () {
        this.find('.color-picker-input')[0].focus();
    }

    update () {
        if (this.hue === undefined || this.saturation === undefined || this.lightness === undefined) {
            return false;
        }

        var color = tinycolor({h: this.hue, s: this.saturation / 100, v: this.lightness / 100}),
            colorString;

        if (this.options.alpha) {
            color.setAlpha(this.opacity / 100);
        }


        this.swatchColor = color.toHslString();

        switch (this.options.format) {
            case 'rgb':
                colorString = color.toRgbString();
                break;

            case 'hex':
                colorString = color.toHexString();
                if (this.options.case === 'lower') {
                    colorString = colorString.toLowerCase();
                } else {
                    colorString = colorString.toUpperCase();
                }
                break;

            case 'hex8':
                colorString = color.toHex8String();
                if (this.options.case === 'lower') {
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

        if (this.updateModel) {
            this.ngModel = colorString;
        }
    }

    updateSwatchBackground () {
        var el = angular.element(this.$element[0].querySelector('.color-picker-swatch'));
        el.css({
            'background-color': this.swatchColor,
        });
    }



    huePosUpdate () {
        this.$timeout(() => {
            var container = this.$element[0].querySelector('.color-picker-hue');
            var el = angular.element(this.$element[0].querySelector('.color-picker-hue .color-picker-slider'));
            var bounding = container.getBoundingClientRect();

            el.css({
                'top': (bounding.height * this.huePos / 100) + 'px',
            });
        });
    }

    opacityPosUpdate () {
        this.$timeout(() => {
            var container = this.$element[0].querySelector('.color-picker-opacity');
            var el = angular.element(this.$element[0].querySelector('.color-picker-opacity .color-picker-slider'));
            var bounding = container.getBoundingClientRect();

            el.css({
                'top': (bounding.height * this.opacityPos / 100) + 'px',
            });
        });
    }

    lightnessPosUpdate () {
        this.$timeout(() => {
            var container = this.$element[0].querySelector('.color-picker-grid');
            var el = angular.element(this.$element[0].querySelector('.color-picker-grid .color-picker-picker'));
            var bounding = container.getBoundingClientRect();

            if (!this.options.round) {
                el.css({
                    'top': (bounding.height * this.lightnessPos / 100) + 'px',
                });
            }
        });
    }

    saturationPosUpdate () {
        this.$timeout(() => {
            var container = this.$element[0].querySelector('.color-picker-grid');
            var el = angular.element(this.$element[0].querySelector('.color-picker-grid .color-picker-picker'));
            var bounding = container.getBoundingClientRect();

            if (this.options.round) {
                el.css({
                    left: (bounding.width * this.xPos / 100) + 'px',
                    top: (bounding.height * this.yPos / 100) + 'px',
                });
            }
            else {
                el.css({
                    'left': (bounding.width * this.saturationPos / 100) + 'px',
                });
            }
        });
    }

    gridUpdate () {
        var el = angular.element(this.$element[0].querySelector('.color-picker-grid'));

        el.css({
            'background-color': this.grid,
        });
    }

    //---------------------------
    // hue functions
    //---------------------------

    hueDown (event) {
        event.stopPropagation();
        event.preventDefault();

        this.hueMouse = true;
    }

    hueUp (event) {
        event.stopPropagation();
        event.preventDefault();

        this.hueMouse = false;
    }

    hueChange (event) {
        event.stopPropagation();
        event.preventDefault();

        var el = this.find('.color-picker-hue');
        this.hue = (1 - ((event.pageY - this.offset(el).top) / el.prop('offsetHeight'))) * 360;

        if (this.hue > 360) {
            this.hue = 360;
        } else if (this.hue < 0) {
            this.hue = 0;
        }
    }

    hueUpdate () {
        if (this.hue !== undefined) {
            this.huePos = (1 - (this.hue / 360)) * 100;
            this.grid = tinycolor({h: this.hue, s: 100, v: 1}).toHslString();

            if (this.huePos < 0) {
                this.huePos = 0;
            } else if (this.huePos > 100) {
                this.huePos = 100;
            }

            this.huePosUpdate();
            this.gridUpdate();
            this.update();
        }
    }

    //---------------------------
    // opacity functions
    //---------------------------

    opacityDown (event) {
        event.stopPropagation();
        event.preventDefault();

        this.opacityMouse = true;
    }

    opacityUp (event) {
        event.stopPropagation();
        event.preventDefault();

        this.opacityMouse = false;
    }

    opacityChange (event) {
        event.stopPropagation();
        event.preventDefault();

        var el = this.find('.color-picker-opacity');
        this.opacity = (1 - ((event.pageY - this.offset(el).top) / el.prop('offsetHeight'))) * 100;

        if (this.opacity > 100) {
            this.opacity = 100;
        } else if (this.opacity < 0) {
            this.opacity = 0;
        }
    }

    opacityUpdate () {
        if (this.opacity !== undefined) {
            this.opacityPos = (1 - (this.opacity / 100)) * 100;

            if (this.opacityPos < 0) {
                this.opacityPos = 0;
            } else if (this.opacityPos > 100) {
                this.opacityPos = 100;
            }

            this.opacityPosUpdate();
            this.update();
        }
    }

    //---------------------------
    // color functions
    //---------------------------

    colorDown (event) {
        event.stopPropagation();
        event.preventDefault();

        this.colorMouse = true;
    }

    colorUp (event) {
        event.stopPropagation();
        event.preventDefault();

        this.colorMouse = false;
    }

    colorChange (event) {
        event.stopPropagation();
        event.preventDefault();

        var el = this.find('.color-picker-grid-inner');
        var offset = this.offset(el);

        if (this.options.round) {
            var dx = ((event.pageX - offset.left) * 2.0  / el.prop('offsetWidth')) - 1.0;
            var dy = -((event.pageY - offset.top) * 2.0  / el.prop('offsetHeight')) + 1.0;

            var tmpSaturation = Math.sqrt(dx * dx + dy * dy);
            var tmpHue = Math.atan2(dy, dx);

            this.saturation = 100 * tmpSaturation;
            var degHue = tmpHue * 57.29577951308233; // rad to deg
            if (degHue < 0.0) {
                degHue += 360.0;
            }
            this.hue = degHue;
            this.lightness =  100;
        } else {
            this.saturation = ((event.pageX - offset.left) / el.prop('offsetWidth')) * 100;
            this.lightness = (1 - ((event.pageY - offset.top) / el.prop('offsetHeight'))) * 100;

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
    }

    saturationUpdate (oldValue) {
        if (this.saturation !== undefined) {
            if (this.options.round) {
                var angle = this.hue * 0.01745329251994; // deg to rad
                var px = Math.cos(angle) * this.saturation;
                var py = -Math.sin(angle) * this.saturation;

                this.xPos = (px + 100.0) * 0.5;
                this.yPos = (py + 100.0) * 0.5;

                // because we are using percentages this can be half of 100%
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
            } else {
                this.saturationPos = (this.saturation / 100) * 100;

                if (this.saturationPos < 0) {
                    this.saturationPos = 0;
                } else if (this.saturationPos > 100) {
                    this.saturationPos = 100;
                }
            }

            this.saturationPosUpdate();
            this.update();
        }
    }

    lightnessUpdate () {
        if (this.lightness !== undefined) {
            this.lightnessPos = (1 - (this.lightness / 100)) * 100;

            if (this.lightnessPos < 0) {
                this.lightnessPos = 0;
            } else if (this.lightnessPos > 100) {
                this.lightnessPos = 100;
            }

            this.lightnessPosUpdate();
            this.update();
        }
    }

    //---------------------------
    // helper functions
    //---------------------------

    eventApiDispatch(name, args) {
        if (this.eventApi && typeof this.eventApi[name] === 'function') {
            if (!args) {
                args = [];
            }

            args.unshift(this.ngModel);
            args.unshift(this.api);

            this.eventApi[name].apply(this, args);
        }
    }

    // taken and modified from jQuery's find
    find (selector) {
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

    // taken and modified from jQuery's offset
    offset (el) {
        var docElem, win, rect, doc, elem = el[0];

        if (!elem) {
            return;
        }

        // Support: IE<=11+
        // Running getBoundingClientRect on a
        // disconnected node in IE throws an error
        if (!elem.getClientRects().length) {
            return {top: 0, left: 0};
        }

        rect = elem.getBoundingClientRect();

        // Make sure element is not hidden (display: none)
        if ( rect.width || rect.height ) {
            doc = elem.ownerDocument;
            win = doc !== null && doc === doc.window ? doc : doc.nodeType === 9 && doc.defaultView;
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
}

AngularColorPickerController.$inject = ['$scope', '$element', '$document', '$timeout'];
