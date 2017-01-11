var Page = require('../page-object.js');

describe('Options: ', () => {
	describe('Button Reset: ', () => {
        beforeAll(() => {
            Page.openPage();
            Page.waitTillPageLoaded();
        });

        it('Should not be visible by default', () => {
            Page.openColorPicker();
            expect(Page.button_reset.isDisplayed()).toEqual(false);
        });

        it('Should update to be visible', () => {
            Page.button_reset_show_field.$('[label="Yes"]').click();
            Page.openColorPicker();
            expect(Page.button_reset.isDisplayed()).toEqual(true);
        });

        it('Should set back to invisible', () => {
            Page.button_reset_show_field.$('[label="No"]').click();
            Page.openColorPicker();
            expect(Page.button_reset.isDisplayed()).toEqual(false);
        });
    });

    describe('Button Class: ', () => {
        beforeAll(() => {
            Page.openPage();
            Page.waitTillPageLoaded();
        });

        it('Should not have an button class by default', () => {
            expect(Page.button_reset.getAttribute('class')).toMatch('');
        });

        it('Should update the button class', () => {
            let button_class = 'qwerty';
            Page.button_reset_show_class.clear().sendKeys(button_class);
            expect(Page.button_reset.getAttribute('class')).toMatch(button_class);
        });

        it('Should not have an button class', () => {
            Page.button_reset_show_class.clear();
            expect(Page.button_reset.getAttribute('class')).toMatch('');
        });

        it('Should update the button class again', () => {
            let button_class = 'asdf';
            Page.button_reset_show_class.clear().sendKeys(button_class);
            expect(Page.button_reset.getAttribute('class')).toMatch(button_class);
        });

        it('Should update the button class again', () => {
            let button_class = 'zxcv';
            Page.button_reset_show_class.clear().sendKeys(button_class);
            expect(Page.button_reset.getAttribute('class')).toMatch(button_class);
        });
    });

    describe('Button Label: ', () => {
        beforeAll(() => {
            Page.openPage();
            Page.waitTillPageLoaded();
            // show the button
            Page.button_reset_show_field.$('[label="Yes"]').click();
        });

        it('Should have an button label by default', () => {
            expect(Page.button_reset.getAttribute('innerHTML')).toEqual('Reset');
        });

        it('Should update the button label', () => {
            let button_label = 'qwerty';
            Page.button_reset_show_label.clear().sendKeys(button_label);
            expect(Page.button_reset.getAttribute('innerHTML')).toEqual(button_label);
        });

        it('Should not have an button label', () => {
            Page.button_reset_show_label.clear();

            expect(Page.button_reset.getAttribute('innerHTML')).toEqual('');
        });

        it('Should update the button label again', () => {
            let button_label = 'asdf';
            Page.button_reset_show_label.clear().sendKeys(button_label);
            expect(Page.button_reset.getAttribute('innerHTML')).toEqual(button_label);
        });

        it('Should update the button label a third time', () => {
            let button_label = 'zxcv';
            Page.button_reset_show_label.clear().sendKeys(button_label);
            expect(Page.button_reset.getAttribute('innerHTML')).toEqual(button_label);
        });
    });
});
