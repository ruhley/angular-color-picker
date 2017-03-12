var Page = require('../page-object.js');

describe('Options: ', () => {
	describe('Allow Empty: ', () => {
        beforeAll(() => {
            Page.openPage();
            Page.waitTillPageLoaded();
        });

        it('Should not allow empty by default', () => {
            Page.blurColorPicker();
            Page.openColorPicker();
            Page.input_field.sendKeys('#FF0000').clear();

            expect(Page.color_picker.getAttribute('class')).toMatch('ng-invalid');
        });

        it('Should allow empty', () => {
            Page.allow_empty_field.$('[label="Yes"]').click();

            Page.blurColorPicker();
            Page.openColorPicker();
            Page.input_field.sendKeys('#FF0000').clear();

            expect(Page.color_picker.getAttribute('class')).toMatch('ng-valid');
        });

        it('Should not allow empty again', () => {
            Page.allow_empty_field.$('[label="No"]').click();

            Page.blurColorPicker();
            Page.openColorPicker();
            Page.input_field.sendKeys('#FF0000').clear();

            expect(Page.color_picker.getAttribute('class')).toMatch('ng-invalid');
        });
    });
});
