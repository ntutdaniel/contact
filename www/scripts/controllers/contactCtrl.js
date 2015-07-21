app.controller('contactCtrl', function ($scope, $rootScope, $ionicLoading, $timeout, $filter, DBInitManager, Api, $state,ContactManager) {
    //window.clearInterval($rootScope.refreshTimer);
    
    $scope.contactList = ContactManager.list();
    
    $timeout(function () {
        getNewContact();
    }, 3);
    
    var getNewContact=function(){
        $scope.contactList = ContactManager.list();    
    }
    
    $scope.href = function (item) {
        $state.go("tab.peopleDetail", { peoId:item.id });
    };

    $timeout(function () {
        $scope.$apply();
    }, 2000);

    //$rootScope.refreshTimer = window.setInterval(getNewIndustries, 3000);

});