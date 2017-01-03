describe('Options: ', () => {
	describe('Placeholder: ', () => {
        // get the fields
        let placeholder_field = element(by.model('options.placeholder'));
        let input_field = element(by.model('AngularColorPickerController.ngModel'));

        beforeAll(() => {
            // connect to the page
            browser.get('http://localhost/angular-color-picker/test/test.html');

            // wait for the page to load
            browser.wait(() => {
                return input_field.isPresent();
            }, 10000, 'Page not loaded');
        });

        it('Should not have an placeholder by default', () => {
            expect(input_field.getAttribute('placeholder')).toEqual('');
        });

        it('Should update the placeholder', () => {
            let placeholder = 'qwerty';
            placeholder_field.clear().sendKeys(placeholder);
            expect(input_field.getAttribute('placeholder')).toEqual(placeholder);
        });

        it('Should not have an placeholder', () => {
            placeholder_field.clear();
            expect(input_field.getAttribute('placeholder')).toEqual('');
        });

        it('Should update the placeholder again', () => {
            let placeholder = 'asdf';
            placeholder_field.clear().sendKeys(placeholder);
            expect(input_field.getAttribute('placeholder')).toEqual(placeholder);
        });

        it('Should update the placeholder again', () => {
            let placeholder = 'zxcv';
            placeholder_field.clear().sendKeys(placeholder);
            expect(input_field.getAttribute('placeholder')).toEqual(placeholder);
        });
    });
});
