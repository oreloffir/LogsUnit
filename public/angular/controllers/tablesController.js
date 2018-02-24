angular.module("main").controller("tablesController", function($scope, $http){

    /** Pagination **/
    $scope.totalItems = 80;
    $scope.currentPage = 1;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;
    $scope.page = 1;

    /** Table creation**/
    $scope.activePage = 'tables';
    $scope.logs = [];

    $scope.updateLogsTable = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/tables',
            params : {
                query: {},
                page: $scope.page,
                filters:{}
            }

        }).then(function (response){
            if(response.data.errors)
                console.log("UpdateLogsTable Error:\n" + response.data.errors);
            else
                $scope.logs = response.data.logs;
            //console.log("response: "+JSON.stringify(response));
        });
    };
    $scope.updateLogsTable();



});