
angular.module('Strophe.plugin').run(function ($rootScope) {

	Strophe.addConnectionPlugin('transactionLog', {
		_conn: null,

		init: function (conn) {
			this._conn = conn;
			Strophe.addNamespace('TRANSACTIONLOG', 'http://eticketing.com.tw/custom/transactionlog');
		},

		statusChanged: function (status, condition) {
			if (status === Strophe.Status.CONNECTED || status === Strophe.Status.ATTACHED) {
			    this._conn.addHandler(this._onReceiveTransactionLog.bind(this), Strophe.NS.TRANSACTIONLOG, "message");
			}
		},

		_onReceiveTransactionLog: function (message) {
			window.console.log((new XMLSerializer()).serializeToString(message));
			var transactionLog = $('transactionlog[xmlns="' + Strophe.NS.TRANSACTIONLOG + '"]', message);

			$rootScope.$broadcast('xmpp:transactionLog', {
				from: message.getAttribute('from'),
				to: message.getAttribute('to'),
				transactionLog: {
				    id: transactionLog.attr('id'),
					userId: transactionLog.attr('userId'),
					//logId: transactionLog.attr('logId'),
					amount: transactionLog.attr('amount'),
					balance: transactionLog.attr('balance'),
					action: transactionLog.attr('action'),
					timestamp: transactionLog.attr('timestamp')
				},
			});
			return true;
		}
	});

});