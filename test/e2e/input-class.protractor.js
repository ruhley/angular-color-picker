var Page = require('../page-object.js');

describe('Options: ', () => {
	describe('Input Class: ', () => {
        beforeAll(() => {
            Page.openPage();
            Page.waitTillPageLoaded();
        });

        it('Should not have an input_class by default', () => {
            expect(Page.input_field.getAttribute('class')).toMatch('');
        });

        it('Should update the input_class', () => {
            let input_class = 'qwerty';
            Page.input_class_field.clear().sendKeys(input_class);
            expect(Page.input_field.getAttribute('class')).toMatch(input_class);
        });

        it('Should not have an input_class', () => {
            Page.input_class_field.clear();
            expect(Page.input_field.getAttribute('class')).toMatch('');
        });

        it('Should update the input_class again', () => {
            let input_class = 'asdf';
            Page.input_class_field.clear().sendKeys(input_class);
            expect(Page.input_field.getAttribute('class')).toMatch(input_class);
        });

        it('Should update the input_class again', () => {
            let input_class = 'zxcv';
            Page.input_class_field.clear().sendKeys(input_class);
            expect(Page.input_field.getAttribute('class')).toMatch(input_class);
        });
    });
});
