app.controller("tablesController", function($scope, $http){

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

    /** Table creation**/
    $scope.activePage = 'tables';
    $scope.logs = [];

    $scope.updateLogsTable = function () {
        console.log("updateLogsTable")
        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/tables',
            params: {
                limit:20
            }
        }).then(function (response){
            //console.log("response: "+JSON.stringify(response));
            console.log("response: ");
            $scope.logs = response.data.logs;
        });
    };
    $scope.updateLogsTable();



});