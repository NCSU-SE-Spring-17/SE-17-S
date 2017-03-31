/**
 * Created by Eugenedjj on 3/14/17.
 */
Firebase=MockFirebase;
describe("profile", function () {
    var ref= new Firebase().child('data');
    var user = {
        name: 'djj'
    };
    beforeEach(function () {
        var fixture = '<div id="fixture"><input id="x" type="text">' +
            '<a id="showError"></a></div>';
        document.body.insertAdjacentHTML(
            'afterbegin',
            fixture);

        MockFirebase.override();
        ref.changeAuthState(user);
        ref.flush();
    });
    it('user authentication',function () {
        expect(ref.getAuth()).toEqual(user);
    });

});
