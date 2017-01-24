var Page = require('../page-object.js');

describe('Options: ', () => {
	describe('Input Class: ', () => {
        beforeAll(() => {
            Page.openPage();
            Page.waitTillPageLoaded();
        });

        it('Should not have an inputClass by default', () => {
            expect(Page.input_field.getAttribute('class')).toMatch('');
        });

        it('Should update the inputClass', () => {
            let inputClass = 'qwerty';
            Page.inputClass_field.clear().sendKeys(inputClass);
            expect(Page.input_field.getAttribute('class')).toMatch(inputClass);
        });

        it('Should not have an inputClass', () => {
            Page.inputClass_field.clear();
            expect(Page.input_field.getAttribute('class')).toMatch('');
        });

        it('Should update the inputClass again', () => {
            let inputClass = 'asdf';
            Page.inputClass_field.clear().sendKeys(inputClass);
            expect(Page.input_field.getAttribute('class')).toMatch(inputClass);
        });

        it('Should update the inputClass again', () => {
            let inputClass = 'zxcv';
            Page.inputClass_field.clear().sendKeys(inputClass);
            expect(Page.input_field.getAttribute('class')).toMatch(inputClass);
        });
    });
});
