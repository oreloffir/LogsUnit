app.controller("indexController", function($scope){
    console.log("indexController");

    $scope.Name = 'Orel Offir';
	$scope.Role = 'Web Designer';
	$scope.setCurrentPage = function (pageName) {
		$scope.activePage = pageName;
	}
});