var Page = require('../page-object.js');

describe('Options: ', () => {
	describe('Saturation: ', () => {
        beforeAll(() => {
            Page.openPage();
            Page.waitTillPageLoaded();
        });

        it('Should show saturation by default', () => {
            Page.openColorPicker();
            expect(Page.saturation.isDisplayed()).toEqual(false);
        });

        it('Should hide saturation', () => {
            Page.saturation_field.$('[label="Yes"]').click();
            Page.openColorPicker();
            expect(Page.saturation.isDisplayed()).toEqual(true);
        });

        it('Should show saturation again', () => {
            Page.saturation_field.$('[label="No"]').click();
            Page.openColorPicker();
            expect(Page.saturation.isDisplayed()).toEqual(false);
        });
    });
});
