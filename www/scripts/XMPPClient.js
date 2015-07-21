/// <reference path="app.js" />

app.factory('XMPPClient', function ($timeout, $rootScope, $ionicPlatform, $location, BookletManager, TicketManager, TransactionLogManager, Api) {
    var connection = null;
    try {
        // WebSocket
        connection = new Openfire.Connection("http://apps.csie.ntut.edu.tw:7070/http-bind/");
    } catch (ex) {
        // BOSH
        connection = new Strophe.Connection("http://apps.csie.ntut.edu.tw:7070/http-bind/");
    }

    var loginData = {
        user: null,
        password: null
    };

    var xmppClient = {
        connection: connection,
        login: function (userId) {
            loginData.user = userId;
            loginData.password = userId;
            xmppClient.domain = '@apps.csie.ntut.edu.tw';
            xmppClient.jid = loginData.user + xmppClient.domain;

            connection.connect(xmppClient.jid, loginData.password, this.onConnect);
        },
        jid: null,
        loginData: loginData,
        logout: function () {
            loginData.user = null;
            loginData.password = null;
            connection.disconnect();
        },
        onConnect: null,
        send: function (status) {
            connection.send(status);
        },
        sendCoupon: function (to, body) {
            var id = connection.message.send(to + xmppClient.domain, body);
            return id;
        },
    };

    $rootScope.$on('xmpp:booklet:add', function (event, data) {
        ga_storage._trackEvent('商-券', '推達', localStorage.name);   //推達
        var booklet = data.booklet;
        console.log(booklet);

        BookletManager.add(booklet);

        $timeout(function () {
            $rootScope.$apply();
            $rootScope.$broadcast('ctrl:booklet:refresh');
        }, 500);

    });

    $rootScope.$on('xmpp:ticket', function (event, data) {

        var action = data.action;
        var ticket = data.ticket;
        console.log(ticket);
    
        if (action == 'add') {   	//已購買
            console.log("Add Ticket");
            TicketManager.add(ticket);
        }
        else if (action == 'check') {  //已驗票
            console.log("Check Ticket");
            TicketManager.update(ticket);

            $rootScope.$broadcast('xmpp:ticket:refresh', {});
        } else if (action == 'remove') {    //分享成功
            console.log("Remove Ticket");
            TicketManager.remove(ticket);
        }

        $timeout(function () {
            $rootScope.$apply();
        }, 1000);

    });

    $rootScope.$on('xmpp:transactionLog', function (event, data) {

        var transactionLog = data.transactionLog;
        console.log(transactionLog);

        TransactionLogManager.add(transactionLog);

        Api.getUserBalance(localStorage.userId, function (data) {
            localStorage.balance = data;
        });
        $timeout(function () {
            $rootScope.$apply();
            $rootScope.$broadcast('ctrl:balance:refresh');
            $rootScope.$broadcast('ctrl:transactionLog:refresh');
        }, 1000);

    });


    $ionicPlatform.on('pause', function () {
        console.log('pause');
        connection.disconnect();
    });

    var reconnect = function () {
        xmppClient.login(loginData.user, xmppClient.onConnect);
    };

    $ionicPlatform.on('resume', function () {
        console.log('resume');
        if (!loginData.user)
            return;
        $timeout(reconnect, 300);
    });

    return xmppClient;
});