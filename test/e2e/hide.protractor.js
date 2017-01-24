var Page = require('../page-object.js');

describe('Options: ', () => {
	describe('Hide Blur: ', () => {
        beforeAll(() => {
            Page.openPage();
            Page.waitTillPageLoaded();
        });

        it('Should hide when clicking the swatch by default', () => {
            Page.input_field.click();
            expect(Page.color_picker_panel.isDisplayed()).toEqual(true);
            Page.blurColorPicker();
            expect(Page.color_picker_panel.isDisplayed()).toEqual(false);
        });

        it('Should not hide when option is changed', () => {
            Page.hide_blur_field.$('[label="No"]').click();
            Page.input_field.click();
            expect(Page.color_picker_panel.isDisplayed()).toEqual(true);
            Page.blurColorPicker();
            expect(Page.color_picker_panel.isDisplayed()).toEqual(true);
        });

        it('Should hide again', () => {
            Page.hide_blur_field.$('[label="Yes"]').click();
            Page.input_field.click();
            expect(Page.color_picker_panel.isDisplayed()).toEqual(true);
            Page.blurColorPicker();
            expect(Page.color_picker_panel.isDisplayed()).toEqual(false);
        });
    });

    describe('Hide Escape: ', () => {
        beforeAll(() => {
            Page.openPage();
            Page.waitTillPageLoaded();
        });

        it('Should hide when pressing escape by default', () => {
            Page.input_field.click();
            expect(Page.color_picker_panel.isDisplayed()).toEqual(true);
            Page.input_field.sendKeys(protractor.Key.ESCAPE);
            expect(Page.color_picker_panel.isDisplayed()).toEqual(false);
        });

        it('Should not hide when option is changed', () => {
            Page.hide_escape_field.$('[label="No"]').click();
            Page.input_field.click();
            expect(Page.color_picker_panel.isDisplayed()).toEqual(true);
            Page.input_field.sendKeys(protractor.Key.ESCAPE);
            expect(Page.color_picker_panel.isDisplayed()).toEqual(true);
        });

        it('Should hide again', () => {
            Page.hide_escape_field.$('[label="Yes"]').click();
            Page.input_field.click();
            expect(Page.color_picker_panel.isDisplayed()).toEqual(true);
            Page.input_field.sendKeys(protractor.Key.ESCAPE);
            expect(Page.color_picker_panel.isDisplayed()).toEqual(false);
        });
    });

	describe('Hide Click: ', () => {
        beforeAll(() => {
            Page.openPage();
            Page.waitTillPageLoaded();
            // This can only truely be tested when blur is disabled
            Page.hide_blur_field.$('[label="No"]').click();
        });

        it('Should hide when clicking the swatch by default', () => {
            Page.input_field.click();
            expect(Page.color_picker_panel.isDisplayed()).toEqual(true);
            Page.body.click();
            expect(Page.color_picker_panel.isDisplayed()).toEqual(false);
        });

        it('Should not hide when option is changed', () => {
            Page.hide_click_field.$('[label="No"]').click();
            Page.input_field.click();
            expect(Page.color_picker_panel.isDisplayed()).toEqual(true);
            Page.body.click();
            expect(Page.color_picker_panel.isDisplayed()).toEqual(true);
        });

        it('Should hide again', () => {
            Page.hide_click_field.$('[label="Yes"]').click();
            Page.input_field.click();
            expect(Page.color_picker_panel.isDisplayed()).toEqual(true);
            Page.body.click();
            expect(Page.color_picker_panel.isDisplayed()).toEqual(false);
        });
    });
});
