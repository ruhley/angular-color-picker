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
            // color
            format: 'hsl',
            restrictToFormat: false,
            case: 'upper',
            hue: true,
            saturation: false,
            lightness: false,
            alpha: true,
            // picker
            round: false,
            pos: 'bottom left',
            inline: false,
            // swatch
            swatch: true,
            swatchOnly: false,
            swatchPos: 'left',
            swatchBootstrap: true,
            // show/hide events
            show: {
                swatch: true,
                focus: true,
            },
            hide: {
                blur: true,
                escape: true,
                click: true,
            },
            // buttons
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
        };
    }
}
