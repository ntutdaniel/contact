app.controller('departCtrl', function ($scope, $rootScope, $ionicLoading, $timeout, $filter, Api, $stateParams, $state,DBInitManager, DBInitManager,PeopleManager,DepartManager,ContactManager) {
    //window.clearInterval($rootScope.refreshTimer);

    $scope.orgName = $stateParams.organizationName;
    $scope.departs = DepartManager.listByOrgName($scope.orgName);
    
    $timeout(function () {
        $scope.$apply();
    }, 3);
    
    var getNewDeps = function () {
        $scope.departs = DepartManager.listByOrgName($scope.orgName);
    }

    $scope.href = function (depart) {
        $state.go("tab.people", { organizationName:$scope.orgName, departName: depart.name });
    };
    $scope.toggleClick = function(dep,$event) {
        var orgs = DBInitManager.list();
        var peos = PeopleManager.list();
        var deps = DepartManager.list();
        //判斷是否全亮
        var flag=true;
        for(var key in deps){
            if(deps[key].marked===false){
                flag=false;break;
            }
        }
        for(var key in orgs){
            if(orgs[key].name===dep.org){
                orgs[key].marked=flag;
                DBInitManager.changeOrg(orgs[key]);
                break;
            }
        }
        for(var key in peos){
            if(peos[key].dep===dep.name){
                peos[key].marked=dep.marked;
                PeopleManager.changePeo(peos[key]);
                if(peos[key].marked) ContactManager.add(peos[key]);
                else ContactManager.remove(peos[key]);
            }
        }
        DepartManager.changeDep(dep);
        $event.stopImmediatePropagation();
    };

    $timeout(function () {
        getNewDeps();
        $scope.$apply();
    }, 2000);

    //$rootScope.refreshTimer = window.setInterval(getNewIndustries, 3000);

});