/// <reference path="ionic.bundle.js" />

var app = angular.module('Practice', ['ionic', 'Strophe.plugin', 'indexedDB', 'angular.filter', 'openfb'])
    .run(function ($rootScope, $state, $ionicPlatform, $ionicLoading, OpenFB, ContactManager, XMPPClient, Api) {
        
    var preUrl = null;
    localStorage.userId = '77f47c8e-a6ca-43a6-b738-6599c55c3197';
    localStorage.phone = '0935133943';

    //$ionicPlatform.ready(function () {
    //    var fbLoginSuccess = function (userData) {
    //        alert("UserInfo: " + JSON.stringify(userData));
    //    }
    //    facebookConnectPlugin.browserInit('1453276028301884');
    //    facebookConnectPlugin.login(["public_profile,email"],
    //        fbLoginSuccess,
    //        function (error) { alert("" + error) }
    //    );
    //});

    //OpenFB.init('1453276028301884');

    //$ionicPlatform.ready(function () {
    //    OpenFB.login('public_profile,email').then(function () {
    //        OpenFB.get('/me').success(function (user) {
    //            //$scope.user = user;
    //            console.log(user);
    //        });
    //    });
    //});

    function login() {
        //登入狀態
        /*  status code
        Status.ERROR    An error has occurred
        Status.CONNECTING    The connection is currently being made
        Status.CONNFAIL    The connection attempt failed
        Status.AUTHENTICATING    The connection is authenticating
        Status.AUTHFAIL	The authentication attempt failed
        Status.CONNECTED	The connection has succeeded
        Status.DISCONNECTED	The connection has been terminated
        Status.DISCONNECTING	The connection is currently being terminated
        Status.ATTACHED	The connection has been attached
        */
        if (!XMPPClient.onConnect) {
            XMPPClient.onConnect = function (status, condition, reconnect) {
                console.log('onConnect: ' + status);
                if ((status === Strophe.Status.CONNECTED) || (status === Strophe.Status.ATTACHED)) {
                    if ((typeof reconnect !== 'undefined') && (reconnect)) {
                        console.log(status === Strophe.Status.CONNECTED ? 'Reconnected' : 'Reattached');
                    } else {
                        console.log(status === Strophe.Status.CONNECTED ? 'Connected' : 'Attached');

                        XMPPClient.send($pres());
                    }
                } else if (status === Strophe.Status.DISCONNECTED) {
                    if (converse.auto_reconnect) {
                        login();
                    }
                }
            };
        }
        ga_storage._trackEvent('客', '開機', localStorage.userId);
        XMPPClient.login(localStorage.userId);
    }
    
     window.handleOpenURL = function (url) {
        setTimeout(function () {
            if (url && url != preUrl) {
                preUrl = url;
                var arr = url.split('/');
                if (arr.length >= 3) {
                    switch (arr[2]) {
                        case 'auth':
                            var token = arr[3];
                            
                            Api.getPhone(token, function (phone) {
                               localStorage.phone = phone;
                               
                                Api.getMember(phone, function (user) {
                                   localStorage.userId = user.id;
                                   localStorage.name = user.name;
                                   localStorage.balance = user.balance;

                                   login();

                                   ga_storage._trackEvent('客', '安裝', user.name);


                                   //取得別人分享給我的票
                                   Api.getShareTicket(localStorage.userId, localStorage.phone, function () {
                                   });

                                });
                            });
                            $ionicLoading.hide();
                            break;
                    }
                }
            }
        }, 2000);
    }

     $ionicPlatform.ready(function () {

         if (localStorage.phone) {
             Api.getMember(localStorage.phone, function (user) {
                 localStorage.userId = user.id;
                 localStorage.name = user.name;
                 localStorage.balance = user.balance;

                 login();

                 ga_storage._trackEvent('客', '安裝', user.name);


                 //取得別人分享給我的票
                 Api.getShareTicket(localStorage.userId, localStorage.phone, function () {
                 });

             });
         } else {
             window.open('http://apps.csie.ntut.edu.tw/coupon/launchApp.html', '_system');
            //$ionicLoading.show({
            //    template: '驗證中...'
            //});
            //setTimeout(function () {
            //    var ref = window.open("http://apps.csie.ntut.edu.tw/coupon/Account/ExternalLogin?provider=Facebook", "_blank", "location=no");
            //    ref.addEventListener('loadstart', function (event) {
            //        if (event.url.indexOf("http://apps.csie.ntut.edu.tw/coupon/Home#_=_") == 0) {
            //            ref.close();
            //            Api.getUser(function (user) {
            //                localStorage.userId = user.id;
            //                login();
            //            });
            //            $ionicLoading.hide();
            //        }
            //    });
            //}, 2000);
         }
        
         if (window.plugins && window.plugins.webintent) {
             window.plugins.webintent.getUri(handleOpenURL);
             window.plugins.webintent.onNewIntent(handleOpenURL);
         }
         
    });
})
.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $indexedDBProvider) {
    //$ionicConfigProvider.views.maxCache(0);

    $stateProvider
        .state('tab', {
            url: "/tab",
            abstract: true,
            templateUrl: "views/tab.html",
        })
        .state('tab.contact', {
            url: '/contact',
            views: {
                'tab-contact': {
                    templateUrl: "views/contact.html",
                    controller: "contactCtrl"
                }
            }
        })
        .state('tab.peopleDetail', {
            url: '/peopleDetail/:peoId',
            views: {
                'tab-contact': {
                    templateUrl: "views/peopleDetail.html",
                    controller: "peopleDetailCtrl"
                }
            }
        })
        .state('tab.organization', {
            url: '/organization',
            views: {
                'tab-organization': {
                    templateUrl: "views/organization.html",
                    controller: "organizationCtrl"
                }
            }
        })
        .state('tab.depart', {
            url: '/depart/:organizationName',
            views: {
                'tab-organization': {
                    templateUrl: "views/depart.html",
                    controller: "departCtrl"
                }
            }
        })
        .state('tab.people', {
            url: '/people/:organizationName/:departName',
            views: {
                'tab-organization': {
                    templateUrl: "views/people.html",
                    controller: "peopleCtrl"
                }
            }
        })
        .state('tab.setting', {
            url: "/setting",
            views: {
                'tab-setting': {
                    templateUrl: "views/setting.html",
                    controller: "settingCtrl"
                }
            }
        })
    ;

    $urlRouterProvider.otherwise('/tab/contact');
    $ionicConfigProvider.tabs.position('bottom');
    
     $indexedDBProvider
        .connection('Contact_indexedDB')
        .upgradeDatabase(1, function (event, db, tx) {
            var objContact;

            objStore = db.createObjectStore('Organization', { keyPath: 'id', autoIncrement: true });
            objStore.createIndex('name', 'name', { unique: true });

            objStore = db.createObjectStore('Department', { keyPath: 'id', autoIncrement: true });
            objStore.createIndex('name', 'name', { unique: true });

            objStore = db.createObjectStore('People', { keyPath: 'id', autoIncrement: true });
            objStore.createIndex('name', 'name', { unique: true });
            
            objStore = db.createObjectStore('Contact', { keyPath: 'id', autoIncrement: true });
        });
        
});