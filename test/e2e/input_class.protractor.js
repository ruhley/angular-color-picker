describe('Options: ', () => {
	describe('Input Class: ', () => {
        // get the fields
        let input_class_field = element(by.model('options.input_class'));
        let input_field = element(by.model('AngularColorPickerController.ngModel'));

        beforeAll(() => {
            // connect to the page
            browser.get('http://localhost/angular-color-picker/test/test.html');

            // wait for the page to load
            browser.wait(() => {
                return input_field.isPresent();
            }, 10000, 'Page not loaded');
        });

        it('Should not have an input_class by default', () => {
            expect(input_field.getAttribute('class')).toMatch('');
        });

        it('Should update the input_class', () => {
            let input_class = 'qwerty';
            input_class_field.clear().sendKeys(input_class);
            expect(input_field.getAttribute('class')).toMatch(input_class);
        });

        it('Should not have an input_class', () => {
            input_class_field.clear();
            expect(input_field.getAttribute('class')).toMatch('');
        });

        it('Should update the input_class again', () => {
            let input_class = 'asdf';
            input_class_field.clear().sendKeys(input_class);
            expect(input_field.getAttribute('class')).toMatch(input_class);
        });

        it('Should update the input_class again', () => {
            let input_class = 'zxcv';
            input_class_field.clear().sendKeys(input_class);
            expect(input_field.getAttribute('class')).toMatch(input_class);
        });
    });
});
