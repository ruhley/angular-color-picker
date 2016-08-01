export default class AngularColorPickerOptions {
    constructor() {
        return {
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
        };
    }
}
