var Page = require('../page-object.js');

describe('Options: ', () => {
	describe('Restrict To Format: ', () => {
        beforeAll(() => {
            Page.openPage();
            Page.waitTillPageLoaded();
        });

        it('Should allow any format by default', () => {
            Page.format_field.$('[label="HEX"]').click();
            Page.input_field.clear().sendKeys('red');
            Page.blurColorPicker();
            Page.openColorPicker();
            expect(Page.input_field.getAttribute('value')).toEqual('#FF0000');
        });

        it('Should only allow selected format', () => {
            Page.restrict_to_format_field.$('[label="Yes"]').click();

            Page.format_field.$('[label="HEX"]').click();
            Page.input_field.clear().sendKeys('green');
            Page.blurColorPicker();
            Page.openColorPicker();
            // even though we changed from red to green it should stay as red
            expect(Page.input_field.getAttribute('value')).toEqual('#FF0000');
        });

        it('Should allow any format again', () => {
            Page.restrict_to_format_field.$('[label="No"]').click();

            Page.format_field.$('[label="HEX"]').click();
            Page.input_field.clear().sendKeys('blue');
            Page.blurColorPicker();
            Page.openColorPicker();
            expect(Page.input_field.getAttribute('value')).toEqual('#0000FF');
        });
    });
});
