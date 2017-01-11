var Page = require('../page-object.js');

describe('Options: ', () => {
	describe('Name: ', () => {
        beforeAll(() => {
            Page.openPage();
            Page.waitTillPageLoaded();
        });

        it('Should not have an name by default', () => {
            expect(Page.input_field.getAttribute('name')).toEqual('');
        });

        it('Should update the name', () => {
            let name = 'qwerty';
            Page.name_field.clear().sendKeys(name);
            expect(Page.input_field.getAttribute('name')).toEqual(name);
        });

        it('Should not have an name', () => {
            Page.name_field.clear();
            expect(Page.input_field.getAttribute('name')).toEqual('');
        });

        it('Should update the name again', () => {
            let name = 'asdf';
            Page.name_field.clear().sendKeys(name);
            expect(Page.input_field.getAttribute('name')).toEqual(name);
        });

        it('Should update the name again', () => {
            let name = 'zxcv';
            Page.name_field.clear().sendKeys(name);
            expect(Page.input_field.getAttribute('name')).toEqual(name);
        });
    });
});
