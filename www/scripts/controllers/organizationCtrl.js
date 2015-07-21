app.controller('organizationCtrl', function ($scope, $rootScope, $ionicLoading, $timeout, $filter, Api, $state, DBInitManager,PeopleManager,DepartManager,ContactManager) {
    //window.clearInterval($rootScope.refreshTimer);
    
    $scope.organizations = DBInitManager.list();
    
    $timeout(function () {
        getNewOrgs();
    }, 3);
    
    var getNewOrgs = function () {
        var orgs=DBInitManager.getOrg();
        for(var key in orgs){
            var org={
                name:key,
                marked:false
            };
            DBInitManager.insertOrg(org);
            var deps=DBInitManager.getDep(key);
            for(var key2 in deps){
                var dep={
                    org:key,
                    name:key2,
                    marked:false
                };
                DBInitManager.insertDep(dep);
                var peos=DBInitManager.getPeople(key,key2);
                for(var key3 in peos){
                    var per=peos[key3];
                    var peo={
                        org:key,
                        dep:key2,
                        name:per.name,
                        phone:per.phone,
                        email:per.email,
                        tel:per.tel,
                        marked:per.marked
                    }
                    DBInitManager.insertPeo(peo);
                }
            }
        }
        $scope.organizations = DBInitManager.list();
    };

    $scope.href = function (organization) {
        $state.go("tab.depart", { organizationName: organization.name });
    };
    $scope.toggleClick = function(org,$event) {
        var deps = DepartManager.listByOrgName(org.name);
        //org鈕控制與判定
        for(key in deps){
            deps[key].marked= org.marked;
            DepartManager.changeDep(deps[key]);
            var peos = PeopleManager.list(deps[key].name);
            for(key2 in peos){
                peos[key2].marked=deps[key].marked;
                PeopleManager.changePeo(peos[key2]);
                if(peos[key2].marked) ContactManager.add(peos[key2]);
                else ContactManager.remove(peos[key2]);
            }
        }
        DBInitManager.changeOrg(org);
        $event.stopImmediatePropagation();
    };

    $timeout(function () {
        $scope.$apply();
    }, 2000);

    //$rootScope.refreshTimer = window.setInterval(getNewIndustries, 3000);
    

});