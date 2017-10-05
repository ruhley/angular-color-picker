var Page = require('../page-object.js');

describe('Options: ', () => {
	describe('DynamicAlpha: ', () => {
        beforeAll(() => {
            Page.openPage();
            Page.waitTillPageLoaded();
        });

        it('Should enable dynamic alpha by default', () => {
            Page.openColorPicker();
            expect(Page.dynamicAlpha_field.getAttribute('value').toEqual(true));
        });

        it('Should allow dynamic alpha to be turned off', () => {
            Page.dynamicAlpha_field.$('[label="No"]').click();
            Page.openColorPicker();
            expect(Page.dynamicAlpha_field.getAttribute('value').toEqual(false));
        });
    });
});
