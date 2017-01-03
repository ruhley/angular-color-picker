describe('Options: ', () => {
	describe('ID: ', () => {
        // get the fields
        let id_field = element(by.model('options.id'));
        let input_field = element(by.model('AngularColorPickerController.ngModel'));

        beforeAll(() => {
            // connect to the page
            browser.get('http://localhost/angular-color-picker/test/test.html');

            // wait for the page to load
            browser.wait(() => {
                return input_field.isPresent();
            }, 10000, 'Page not loaded');
        });

        it('Should not have an id by default', () => {
            expect(input_field.getAttribute('id')).toEqual('');
        });

        it('Should update the id', () => {
            let id = 'qwerty';
            id_field.clear().sendKeys(id);
            expect(input_field.getAttribute('id')).toEqual(id);
        });

        it('Should not have an id', () => {
            id_field.clear();
            expect(input_field.getAttribute('id')).toEqual('');
        });

        it('Should update the id again', () => {
            let id = 'asdf';
            id_field.clear().sendKeys(id);
            expect(input_field.getAttribute('id')).toEqual(id);
        });

        it('Should update the id again', () => {
            let id = 'zxcv';
            id_field.clear().sendKeys(id);
            expect(input_field.getAttribute('id')).toEqual(id);
        });
    });
});
