/**
 * Created by Eugenedjj on 3/14/17.
 */
Firebase=MockFirebase;
describe("config", function () {
    var ref= new Firebase().child('data');
    var user = {
        uid:'1',
        name: 'djj'
    };
    beforeEach(function () {
        MockFirebase.override();
        ref.changeAuthState(user);
        ref.flush();
    });
    it('create team info',function () {
        var info=teaminfo(3,1);
        expect(info[1]).toContain('no');
        expect(info[2]).toContain('no');
        expect(info[3]).toContain('no');
    });
    it('config team info',function () {
        var config=configinfo(3,1,1,1,1);
        var positions=config['positions'];
        expect(config['teamNumber']).toEqual(3);

        expect(positions[1]).toEqual('frontEnd');
        expect(positions[2]).toEqual('backEnd');
        expect(positions[3]).toEqual('database');
        expect(positions[4]).toEqual('other');
    });
});
