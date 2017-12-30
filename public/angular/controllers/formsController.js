app.controller("formsController", function($scope, $http){
    console.log("formsController");
    $scope.activePage = 'forms';

    $scope.fileBrowse = function (e) {
        console.log("fileBrowse");
        console.log(e);
    };
});