var Page = require('../page-object.js');

describe('Options: ', () => {
	describe('Swatch Only: ', () => {
        beforeAll(() => {
            Page.openPage();
            Page.waitTillPageLoaded();
        });

        it('Should show the field by default', () => {
            expect(Page.input_field.isDisplayed()).toEqual(true);
        });

        it('Should hide the field', () => {
            Page.swatch_only_field.$('[label="Yes"]').click();
            expect(Page.input_field.isDisplayed()).toEqual(false);
        });

        it('Should show the field again', () => {
            Page.swatch_only_field.$('[label="No"]').click();
            expect(Page.input_field.isDisplayed()).toEqual(true);
        });
    });
});
