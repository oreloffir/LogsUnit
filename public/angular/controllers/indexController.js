angular.module("main").controller("indexController", ["$scope", "$rootScope", "$http" ,function($scope, $rootScope, $http){
    console.log("indexController");

    $scope.loginInfo = {};
    $scope.connectedUser = null;
    $scope.showLoginModal = false;
    $scope.loginErrors = null;

    $rootScope.isAuth = function(){
        console.log("get connected User->");
        /*$http({
            url: '/connectedUser',
            method: 'GET'
        }).then(function (res) {
            console.log("connectedUser: " +JSON.stringify(res.data));
            if(res.data){
                $rootScope.connectedUser = res.data;
                $rootScope.showLoginModal = false;
            }
            else{
                $scope.connectedUser = null;
                $scope.showLoginModal = true;
            }
        });*/
    };
    $rootScope.isAuth();


    $scope.showLogin = function(){
        $scope.showLoginModal = true;
        console.log("showLogin: "+ $scope.showLoginModal)
    };

    $scope.login = function (email, password) {
        $scope.loginErrors = null;
        $http({
            url: '/login',
            method: 'post',
            data: {userEmail: email ,userPassword: password}
		}).then(function(res){
		    console.log(res);
            if(res.data.success){
                $scope.connectedUser = {};
                $scope.showLoginModal = false;
                $scope.connectedUser.name = res.data.displayName;
                $scope.connectedUser.email = res.data.email;
            }else{
                $scope.loginErrors = res.data.errors;
            }
        });
    };

    $scope.logout = function logout() {
        $http({
            url: '/logout',
            method: 'post'
        }).then(function () {
            $scope.connectedUser = {};
            $scope.showLoginModal = true;
        });
    };



	$scope.setCurrentPage = function (pageName) {
		$scope.activePage = pageName;
	}
}]);