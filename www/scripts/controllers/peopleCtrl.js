app.controller('peopleCtrl', function ($scope, $rootScope, $ionicLoading, $timeout, $filter, Api, $stateParams, $state, DBInitManager,PeopleManager,DepartManager,ContactManager) {
    //window.clearInterval($rootScope.refreshTimer);
    
    $scope.orgName = $stateParams.organizationName;
    $scope.depName = $stateParams.departName;
    
    $scope.peoples = PeopleManager.listByDepName($scope.depName);
    
    $timeout(function () {
        $scope.$apply();
    }, 3);
    
    var getNewPeos = function () {
        $scope.peoples = PeopleManager.listByDepName($scope.depName);
    }
    
    $scope.change = function(people) {
        people.marked=!people.marked;
        var orgs = DBInitManager.list();
        var peos = PeopleManager.list();
        var deps = DepartManager.list();
        
        
        var flag=true;
        for(var key in peos){
            if(peos[key].marked===false){
                flag=false;break;
            }
        }
        for(var key in deps){
            if(deps[key].name==people.dep){
                deps[key].marked=flag;
                DepartManager.changeDep(deps[key]);
                break;
            }
        }
        for(var key in orgs){
            if(orgs[key].name===people.org){
                orgs[key].marked=flag;
                DBInitManager.changeOrg(orgs[key]);
                break;
            }
        }
        
        PeopleManager.changePeo(people);
        if(people.marked) ContactManager.add(people);
        else ContactManager.remove(people);
    };
    
   $timeout(function () {
        getNewPeos();
        $scope.$apply();
    }, 2000);

    //$rootScope.refreshTimer = window.setInterval(getNewIndustries, 3000);

});