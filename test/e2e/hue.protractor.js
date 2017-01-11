var Page = require('../page-object.js');

describe('Options: ', () => {
	describe('Hue: ', () => {
        beforeAll(() => {
            Page.openPage();
            Page.waitTillPageLoaded();
        });

        it('Should show hue by default', () => {
            Page.openColorPicker();
            expect(Page.hue.isDisplayed()).toEqual(true);
        });

        it('Should hide hue', () => {
            Page.hue_field.$('[label="No"]').click();
            Page.openColorPicker();
            expect(Page.hue.isDisplayed()).toEqual(false);
        });

        it('Should show hue again', () => {
            Page.hue_field.$('[label="Yes"]').click();
            Page.openColorPicker();
            expect(Page.hue.isDisplayed()).toEqual(true);
        });
    });
});
