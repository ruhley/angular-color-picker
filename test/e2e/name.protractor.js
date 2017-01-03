describe('Options: ', () => {
	describe('Name: ', () => {
        // get the fields
        let name_field = element(by.model('options.name'));
        let input_field = element(by.model('AngularColorPickerController.ngModel'));

        beforeAll(() => {
            // connect to the page
            browser.get('http://localhost/angular-color-picker/test/test.html');

            // wait for the page to load
            browser.wait(() => {
                return input_field.isPresent();
            }, 10000, 'Page not loaded');
        });

        it('Should not have an name by default', () => {
            expect(input_field.getAttribute('name')).toEqual('');
        });

        it('Should update the name', () => {
            let name = 'qwerty';
            name_field.clear().sendKeys(name);
            expect(input_field.getAttribute('name')).toEqual(name);
        });

        it('Should not have an name', () => {
            name_field.clear();
            expect(input_field.getAttribute('name')).toEqual('');
        });

        it('Should update the name again', () => {
            let name = 'asdf';
            name_field.clear().sendKeys(name);
            expect(input_field.getAttribute('name')).toEqual(name);
        });

        it('Should update the name again', () => {
            let name = 'zxcv';
            name_field.clear().sendKeys(name);
            expect(input_field.getAttribute('name')).toEqual(name);
        });
    });
});
