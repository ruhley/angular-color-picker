export default class AngularColorPickerOptions {
    constructor() {
        return {
            required: false,
            disabled: false,
            hue: true,
            saturation: false,
            lightness: false,
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
            id: undefined,
            name: undefined,
            show: {
                swatch: true,
                focus: true,
            },
            hide: {
                blur: true,
                escape: true,
                click: true,
            },
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
