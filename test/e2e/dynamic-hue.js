var Page = require('../page-object.js');

describe('Options: ', () => {
	describe('DynamicHue: ', () => {
        beforeAll(() => {
            Page.openPage();
            Page.waitTillPageLoaded();
        });

        it('Should enable dynamic hue by default', () => {
            Page.openColorPicker();
            expect(Page.dynamicHue_field.getAttribute('value').toEqual(true));
        });

        it('Should allow dynamic hue to be turned off', () => {
            Page.dynamicHue_field.$('[label="No"]').click();
            Page.openColorPicker();
            expect(Page.dynamicHue_field.getAttribute('value').toEqual(false));
        });
    });
});
