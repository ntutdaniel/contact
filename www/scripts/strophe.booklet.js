
angular.module('Strophe.plugin', []).run(function ($rootScope) {

    Strophe.addConnectionPlugin('booklet', {
        _conn: null,

        init: function (conn) {
            this._conn = conn;
            Strophe.addNamespace('BOOKLET', 'http://eticketing.com.tw/custom/booklet');
        },

        statusChanged: function (status, condition) {
            if (status === Strophe.Status.CONNECTED || status === Strophe.Status.ATTACHED) {
                this._conn.addHandler(this._onReceiveBooklet.bind(this), Strophe.NS.BOOKLET, "message");
            }
        },

        _onReceiveBooklet: function (message) {
            window.console.log((new XMLSerializer()).serializeToString(message));
            var booklet = $('booklet[xmlns="' + Strophe.NS.BOOKLET + '"]', message);
            
            $rootScope.$broadcast('xmpp:booklet:add', {
                from: message.getAttribute('from'),
                to: message.getAttribute('to'),
                booklet: {
                    id: booklet.attr('id'),
                    merchantId: booklet.attr('merchantId'),
                    name: booklet.attr('name'),
                    status: booklet.attr('status'),
                    period: booklet.attr('period'),
                    usage: booklet.attr('usage'),
                    description: booklet.attr('description'),
                    price: booklet.attr('price'),
                    ticketValue: booklet.attr('ticketValue')
                }
            });
            return true;
        }
    });

});