/**
 * Created by Eugenedjj on 3/14/17.
 */
Firebase=MockFirebase;
describe("approach3", function () {
    var ref= new Firebase().child('data');
    var user = {
        uid:'1',
        name: 'djj'
    };
    beforeEach(function () {
        var fixture = '< id="fixture"> <table id="app3Teams"></table></div>';
        document.body.insertAdjacentHTML(
            'afterbegin',
            fixture);

        MockFirebase.override();
        ref.changeAuthState(user);
        ref.flush();
    });
    it('initialize table',function () {
        initTable(ref);
        expect(document.getElementById('thead')).not.toEqual(null);
    });
    it('show all table',function () {
        // showTable(ref);
        // expect(document.getElementById('thead')).not.toEqual(null);
    });

});
