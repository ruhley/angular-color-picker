var Page = require('../page-object.js');

describe('Options: ', () => {
	describe('Swatch Pos: ', () => {
        beforeAll(() => {
            Page.openPage();
            Page.waitTillPageLoaded();
        });

        it('Should show the swatch on the left by default', () => {
            expect(Page.swatch_left.isPresent()).toEqual(true);
            expect(Page.swatch_right.isPresent()).toEqual(false);
        });

        it('Should show the swatch on the right', () => {
            Page.swatch_pos_field.$('[label="Right"]').click();
            expect(Page.swatch_left.isPresent()).toEqual(false);
            expect(Page.swatch_right.isPresent()).toEqual(true);
        });

        it('Should show the swatch on the left again', () => {
            Page.swatch_pos_field.$('[label="Left"]').click();
            expect(Page.swatch_left.isPresent()).toEqual(true);
            expect(Page.swatch_right.isPresent()).toEqual(false);
        });
    });
});
