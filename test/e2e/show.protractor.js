var Page = require('../page-object.js');

describe('Options: ', () => {
	describe('Show Swatch: ', () => {
        beforeAll(() => {
            Page.openPage();
            Page.waitTillPageLoaded();
        });

        it('Should show when clicking the swatch by default', () => {
            Page.swatch.click();
            expect(Page.color_picker_panel.isDisplayed()).toEqual(true);
        });

        it('Should not show when option is changed', () => {
            Page.show_swatch_field.$('[label="No"]').click();
            Page.swatch.click();
            expect(Page.color_picker_panel.isDisplayed()).toEqual(false);
        });

        it('Should show again', () => {
            Page.show_swatch_field.$('[label="Yes"]').click();
            Page.swatch.click();
            expect(Page.color_picker_panel.isDisplayed()).toEqual(true);
        });
    });

    describe('Show Focus: ', () => {
        beforeAll(() => {
            Page.openPage();
            Page.waitTillPageLoaded();
        });

        it('Should show when focusing by default', () => {
            Page.input_field.click();
            expect(Page.color_picker_panel.isDisplayed()).toEqual(true);
        });

        it('Should not show when option is changed', () => {
            Page.show_focus_field.$('[label="No"]').click();
            Page.input_field.click();
            expect(Page.color_picker_panel.isDisplayed()).toEqual(false);
        });

        it('Should show again', () => {
            Page.show_focus_field.$('[label="Yes"]').click();
            Page.input_field.click();
            expect(Page.color_picker_panel.isDisplayed()).toEqual(true);
        });
    });
});
