var Page = require('../page-object.js');

describe('Options: ', () => {
	describe('Lightness: ', () => {
        beforeAll(() => {
            Page.openPage();
            Page.waitTillPageLoaded();
        });

        it('Should show lightness by default', () => {
            Page.openColorPicker();
            expect(Page.lightness.isDisplayed()).toEqual(false);
        });

        it('Should hide lightness', () => {
            Page.lightness_field.$('[label="Yes"]').click();
            Page.openColorPicker();
            expect(Page.lightness.isDisplayed()).toEqual(true);
        });

        it('Should show lightness again', () => {
            Page.lightness_field.$('[label="No"]').click();
            Page.openColorPicker();
            expect(Page.lightness.isDisplayed()).toEqual(false);
        });
    });
});
