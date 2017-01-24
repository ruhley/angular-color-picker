
class Page {
    constructor() {
        this.url = 'http://localhost/angular-color-picker/test/test.html';
        this.body = element(by.css('body'));

        // attribute fields
        this.id_field = element(by.model('options.id'));
        this.inputClass_field = element(by.model('options.inputClass'));
        this.name_field = element(by.model('options.name'));
        this.placeholder_field = element(by.model('options.placeholder'));

        // color fields
        this.format_field = element(by.model('options.format'));
        this.restrict_to_format_field = element(by.model('options.restrictToFormat'));
        this.hue_field = element(by.model('options.hue'));
        this.saturation_field = element(by.model('options.saturation'));
        this.lightness_field = element(by.model('options.lightness'));
        this.alpha_field = element(by.model('options.alpha'));

        // swatch fields
        this.swatch_field = element(by.model('options.swatch'));
        this.swatch_only_field = element(by.model('options.swatchOnly'));
        this.swatch_pos_field = element(by.model('options.swatchPos'));

        // show/hide fields
        this.show_swatch_field = element(by.model('options.show.swatch'));
        this.show_focus_field = element(by.model('options.show.focus'));
        this.hide_blur_field = element(by.model('options.hide.blur'));
        this.hide_escape_field = element(by.model('options.hide.escape'));
        this.hide_click_field = element(by.model('options.hide.click'));

        // button fields
        this.button_close_show_field = element(by.model('options.close.show'));
        this.button_close_show_class = element(by.model('options.close.class'));
        this.button_close_show_label = element(by.model('options.close.label'));

        this.button_clear_show_field = element(by.model('options.clear.show'));
        this.button_clear_show_class = element(by.model('options.clear.class'));
        this.button_clear_show_label = element(by.model('options.clear.label'));

        this.button_reset_show_field = element(by.model('options.reset.show'));
        this.button_reset_show_class = element(by.model('options.reset.class'));
        this.button_reset_show_label = element(by.model('options.reset.label'));

        // color picker elements
        this.input_field = element(by.model('AngularColorPickerController.ngModel'));
        this.color_picker_panel = element(by.css('.color-picker-panel'));
        this.swatch = element(by.css('.color-picker-swatch'));
        this.swatch_left = element(by.css('.color-picker-swatch-left'));
        this.swatch_right = element(by.css('.color-picker-swatch-right'));

        this.hue = element(by.css('.color-picker-hue'));
        this.saturation = element(by.css('.color-picker-saturation'));
        this.lightness = element(by.css('.color-picker-lightness'));
        this.alpha = element(by.css('.color-picker-opacity'));

        this.button_close = element(by.css('.color-picker-action-close'));
        this.button_clear = element(by.css('.color-picker-action-clear'));
        this.button_reset = element(by.css('.color-picker-action-reset'));
    }

    openPage() {
        // connect to the page
        browser.get(this.url);
    }

    // wait for the page to load
    waitTillPageLoaded() {
        browser.wait(() => {
            return this.input_field.isPresent();
        }, 10000, 'Page not loaded');
    }

    openColorPicker() {
        this.input_field.click();
    }

    closeColorPicker() {
        this.input_field.sendKeys(protractor.Key.ESCAPE);
    }

    blurColorPicker() {
        browser.driver.executeScript('document.activeElement.blur()');
    }
}

module.exports = new Page();
