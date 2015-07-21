app.controller('peopleDetailCtrl', function ($scope, $rootScope, $ionicLoading, $timeout, $filter, ContactManager, Api, $stateParams, $state) {
    //window.clearInterval($rootScope.refreshTimer);

    var peoId = $stateParams.peoId;
    
    $scope.people = ContactManager.get(peoId);
    
    $scope.href = function (url) {
        window.open(url, '_system');
    };
    
    $timeout(function () {
        $scope.$apply();
    }, 2000);

    //$rootScope.refreshTimer = window.setInterval(getNewIndustries, 3000);
    
});