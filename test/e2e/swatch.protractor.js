var Page = require('../page-object.js');

describe('Options: ', () => {
	describe('Swatch: ', () => {
        beforeAll(() => {
            Page.openPage();
            Page.waitTillPageLoaded();
        });

        it('Should show the swatch by default', () => {
            expect(Page.swatch.isDisplayed()).toEqual(true);
        });

        it('Should hide the swatch', () => {
            Page.swatch_field.$('[label="No"]').click();
            expect(Page.swatch.isDisplayed()).toEqual(false);
        });

        it('Should show the swatch again', () => {
            Page.swatch_field.$('[label="Yes"]').click();
            expect(Page.swatch.isDisplayed()).toEqual(true);
        });
    });
});
