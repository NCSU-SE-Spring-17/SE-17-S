/**
 * Created by Eugenedjj on 3/14/17.
 */
Firebase=MockFirebase;
var ref;
beforeEach(function () {
    ref = new Firebase().child('data');
    MockFirebase.override();
});
describe("login error", function () {
    beforeEach(function () {
        var fixture = '<div id="fixture"> <a id="showError"></a></div>';
        document.body.insertAdjacentHTML(
            'afterbegin',
            fixture);

        var showError=document.getElementById('showError');
    });

    afterEach(function () {
        document.body.removeChild(document.getElementById('fixture'));
    });

    it('with empty input',function () {
        login("","");
        expect(showError.innerHTML).toEqual("Please input email and password");
        login("email","");
        expect(showError.innerHTML).toEqual("Please input email and password");
        login("","password");
        expect(showError.innerHTML).toEqual("Please input email and password");
    });
    //
    it('with wrong input',function () {
        login("test1@1.com","111111");
        expect(showError.innerHTML).toEqual("");
    });

});
describe('changeAuthState', function () {
    it('sets the auth data', function () {
        var user = {};
        ref.changeAuthState(user);
        ref.flush();
        expect(ref.getAuth()).toEqual(user);
    });
});
