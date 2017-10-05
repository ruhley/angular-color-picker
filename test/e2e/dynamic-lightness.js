var Page = require('../page-object.js');

describe('Options: ', () => {
	describe('DynamicLightness: ', () => {
        beforeAll(() => {
            Page.openPage();
            Page.waitTillPageLoaded();
        });

        it('Should enable dynamic lightness by default', () => {
            Page.openColorPicker();
            expect(Page.dynamicLightness_field.getAttribute('value').toEqual(true));
        });

        it('Should allow dynamic lightness to be turned off', () => {
            Page.dynamicLightness_field.$('[label="No"]').click();
            Page.openColorPicker();
            expect(Page.dynamicLightness_field.getAttribute('value').toEqual(false));
        });
    });
});
