var Page = require('../page-object.js');

describe('Options: ', () => {
	describe('Preserve Input Format: ', () => {
        beforeAll(() => {
            Page.openPage();
            Page.waitTillPageLoaded();
        });

        it('Should not preserve input format by default', () => {
            Page.format_field.$('[label="HEXString"]').click();
            Page.input_field.clear().sendKeys('red');
            Page.blurColorPicker();
            // value is still what the user typed in.
            expect(Page.input_field.getAttribute('value')).toEqual('red');
            // value suddenly changes when re-opening the color picker.
            Page.openColorPicker();
            expect(Page.input_field.getAttribute('value')).toEqual('#FF0000');
        });

        it('Should preserve input format', () => {
            Page.format_field.$('[label="HEXString"]').click();
            Page.preserve_input_format_field.$('[label="Yes"]').click();
            Page.input_field.clear().sendKeys('red');
            Page.blurColorPicker();
            Page.openColorPicker();
            expect(Page.input_field.getAttribute('value')).toEqual('red');
        });
    });
});
