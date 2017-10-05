var Page = require('../page-object.js');

describe('Options: ', () => {
	describe('DynamicSaturation: ', () => {
        beforeAll(() => {
            Page.openPage();
            Page.waitTillPageLoaded();
        });

        it('Should enable dynamic saturation by default', () => {
            Page.openColorPicker();
            expect(Page.dynamicSaturation_field.getAttribute('value').toEqual(true));
        });

        it('Should allow dynamic saturation to be turned off', () => {
            Page.dynamicSaturation_field.$('[label="No"]').click();
            Page.openColorPicker();
            expect(Page.dynamicSaturation_field.getAttribute('value').toEqual(false));
        });
    });
});
