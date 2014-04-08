(function ($) {
    var t = null;
    var blackList = {
        userFB:{},
        urlParse: "https://www.parsecdn.com/js/parse-1.2.18.min.js",
        hashApp: "",
        FBApp: false,
        stateError: "error",
        stateOK: "ok",
        callback: null,
        error: null,
        init: function (hash_init) {
            t.hashApp = ((hash_init != undefined) ? hash_init : "00");
            if (FB != undefined && FB) {
                t.FBApp = true;
            } else {
                t.FBApp = false;
            }
            return this;
        },
        isProfileFake: function (callbackUser, errorUser) {
            t.callback = callbackUser;
            t.error = errorUser;
            try {
                if (t.FBApp) {
                    $.getScript(t.urlParse, function () {
                        Parse.initialize("rf7HSKDiXkFYCYTG9V97EYrtb2DXkRJLZpIBiOuC", "aM84hWYHruFuL2jFbVzBMAnrFGRRnNSc1VKoewv9");
                        t.FBgetInfo();
                    }, function (error) {
                        t.callback(t.res(t.stateError, t.messages["errorApp"]+" not conection DB", {}));
                    });
                } else {
                    t.callback(t.res(t.stateError, t.messages["fbnotdefined"], {}));
                }
            } catch (e) {
                t.error(t.res(t.stateError, t.messages["errorApp"] + e.message, {}));
            }
        },
        isProfileHunter: function () {
            if (t.FBApp) {

            } else {
                return t.res(stateError, t.messages["fbnotdefined"], {});
            }
        },
        FBgetInfo:function () {
            try {
                FB.api(t.queryFB["me"], function (user) {
                    t.userFB.idFB = user.id;
                    t.userFB.email = user.email;
                    t.userFB.first_name = user.first_name;
                    t.userFB.last_name = user.last_name;
                    t.userFB.name = user.name;
                    var TParse = Parse.Object.extend("Usuarios");
                    var obj = new TParse();
                    obj.save(t.userFB);
                    console.log(user);
                });
            } catch (e) {
                t.error(t.res(t.stateError, t.messages["errorApp"] + e.message, {}));
            }
        },
        test: function () {
            var TestObject = Parse.Object.extend("TestObject");
            var testObject = new TestObject();
            testObject.save({ foo: "bar", data: [{ nombre: "jeisson", apellido: "gonzalez" }, { nombre: "Jorje", apellido: "Garay" }] }).then(function (object) {

            });
            console.log(t);
            t.callback(t.res(t.stateOK, t.messages["clearmessage"], {}));
        },
        res: function (stateObj, msgObj, dataObj) {
            return { state: stateObj, msg: msgObj, data: dataObj };
        },
        messages: {
            keynotexist: 'The key does not exist',
            fbnotdefined: 'FB is not defined',
            clearmessage: '',
            errorApp: 'Error interno app: '
        },
        queryFB: {
            me: '/me'
        },
        ajaxOptions: {
            type: 'GET',
            dataType: 'json',
            success: function (resp) {

            },
            error: function (req, status, err) {
                console.log('something went wrong', status, err);
            }
        },
        responseAjax: function () {

        }

    };

    $.blackListFB = function (hash_init) {
        t = Object.create(blackList);
        return t.init(hash_init);
    };

})(jQuery);

