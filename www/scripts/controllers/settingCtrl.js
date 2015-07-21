app.controller('settingCtrl', function ($scope, $timeout, $state, $ionicModal, Api, $rootScope) {
	
    $scope.me = {
        name: localStorage['name'],
        phone: localStorage['phone'],
    };

    $scope.balance = localStorage['balance'];

    $rootScope.$on('ctrl:balance:refresh', function (event) {
        $scope.balance = localStorage['balance'];
    });

    $scope.deposit = function () {
        $scope.creditDepositModal.show();
    }

    $ionicModal.fromTemplateUrl('creditDeposit.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (creditDepositModal) {
        $scope.creditDepositModal = creditDepositModal;
    });

    $scope.creditConfirm = function () {
        $scope.creditDepositModal.hide();

    }

});