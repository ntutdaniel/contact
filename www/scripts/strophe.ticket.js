
angular.module('Strophe.plugin').run(function ($rootScope) {

	Strophe.addConnectionPlugin('ticket', {
		_conn: null,

		init: function (conn) {
			this._conn = conn;
			Strophe.addNamespace('TICKET', 'http://eticketing.com.tw/custom/ticket');
		},

		statusChanged: function (status, condition) {
			if (status === Strophe.Status.CONNECTED || status === Strophe.Status.ATTACHED) {
				this._conn.addHandler(this._onReceiveTicket.bind(this), Strophe.NS.TICKET, "message");
			}
		},

		_onReceiveTicket: function (message) {
			window.console.log((new XMLSerializer()).serializeToString(message));
			var ticket = $('ticket[xmlns="' + Strophe.NS.TICKET + '"]', message);

			$rootScope.$broadcast('xmpp:ticket', {
				from: message.getAttribute('from'),
				to: message.getAttribute('to'),
				ticket: {
				    id: ticket.attr('id'),
				    bookletId: ticket.attr('bookletId'),
				    status: ticket.attr('status'),
				    timestamp: ticket.attr('timestamp')
				},
                action: ticket.attr('action')
			});
			return true;
		}
	});

});