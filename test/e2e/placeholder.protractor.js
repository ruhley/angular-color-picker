var Page = require('../page-object.js');

describe('Options: ', () => {
	describe('Placeholder: ', () => {
        beforeAll(() => {
            Page.openPage();
            Page.waitTillPageLoaded();
        });

        it('Should not have an placeholder by default', () => {
            expect(Page.input_field.getAttribute('placeholder')).toEqual('');
        });

        it('Should update the placeholder', () => {
            let placeholder = 'qwerty';
            Page.placeholder_field.clear().sendKeys(placeholder);
            expect(Page.input_field.getAttribute('placeholder')).toEqual(placeholder);
        });

        it('Should not have an placeholder', () => {
            Page.placeholder_field.clear();
            expect(Page.input_field.getAttribute('placeholder')).toEqual('');
        });

        it('Should update the placeholder again', () => {
            let placeholder = 'asdf';
            Page.placeholder_field.clear().sendKeys(placeholder);
            expect(Page.input_field.getAttribute('placeholder')).toEqual(placeholder);
        });

        it('Should update the placeholder again', () => {
            let placeholder = 'zxcv';
            Page.placeholder_field.clear().sendKeys(placeholder);
            expect(Page.input_field.getAttribute('placeholder')).toEqual(placeholder);
        });
    });
});
