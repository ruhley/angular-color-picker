export default class AngularColorPickerOptions {
    constructor() {
        return {
            // input attributes
            id: undefined,
            name: undefined,
            required: false,
            disabled: false,
            placeholder: '',
            inputClass: '',
            // validation
            restrictToFormat: false,
            preserveInputFormat: false,
            allowEmpty: false,
            // color
            format: 'hsl',
            case: 'upper',
            // sliders
            hue: true,
            saturation: false,
            lightness: false,
            alpha: true,
            dynamicHue: true,
            dynamicSaturation: true,
            dynamicLightness: true,
            dynamicAlpha: true,
            // picker
            round: false,
            pos: 'bottom left',
            inline: false,
            horizontal: false,
            // swatch
            swatch: true,
            swatchOnly: false,
            swatchPos: 'left',
            swatchBootstrap: true,
            // show/hide events
            show: {
                swatch: true,
                focus: true
            },
            hide: {
                blur: true,
                escape: true,
                click: true
            },
            // buttons
            close: {
                show: false,
                label: 'Close',
                class: ''
            },
            clear: {
                show: false,
                label: 'Clear',
                class: ''
            },
            reset: {
                show: false,
                label: 'Reset',
                class: ''
            }
        };
    }
}
