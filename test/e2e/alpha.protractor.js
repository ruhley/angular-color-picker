var Page = require('../page-object.js');

describe('Options: ', () => {
	describe('Alpha: ', () => {
        beforeAll(() => {
            Page.openPage();
            Page.waitTillPageLoaded();
        });

        it('Should show alpha by default', () => {
            Page.openColorPicker();
            expect(Page.alpha.isDisplayed()).toEqual(true);
        });

        it('Should hide alpha', () => {
            Page.alpha_field.$('[label="No"]').click();
            Page.openColorPicker();
            expect(Page.alpha.isDisplayed()).toEqual(false);
        });

        it('Should show alpha again', () => {
            Page.alpha_field.$('[label="Yes"]').click();
            Page.openColorPicker();
            expect(Page.alpha.isDisplayed()).toEqual(true);
        });
    });
});
