var Page = require('../page-object.js');

describe('Options: ', () => {
	describe('ID: ', () => {
        beforeAll(() => {
            Page.openPage();
            Page.waitTillPageLoaded();
        });

        it('Should not have an id by default', () => {
            expect(Page.input_field.getAttribute('id')).toEqual('');
        });

        it('Should update the id', () => {
            let id = 'qwerty';
            Page.id_field.clear().sendKeys(id);
            expect(Page.input_field.getAttribute('id')).toEqual(id);
        });

        it('Should not have an id', () => {
            Page.id_field.clear();
            expect(Page.input_field.getAttribute('id')).toEqual('');
        });

        it('Should update the id again', () => {
            let id = 'asdf';
            Page.id_field.clear().sendKeys(id);
            expect(Page.input_field.getAttribute('id')).toEqual(id);
        });

        it('Should update the id again', () => {
            let id = 'zxcv';
            Page.id_field.clear().sendKeys(id);
            expect(Page.input_field.getAttribute('id')).toEqual(id);
        });
    });
});
