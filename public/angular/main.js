var app = angular.module("main", ["ngRoute","chart.js","ui.bootstrap"]);
var routes =
    {
        '/': {
            templateUrl: 'angular/pages/home.html',
            controller: 'homeController',
            requireLogin: true
        },
        '/login': {
            templateUrl: 'angular/pages/login.html',
            controller: 'indexController',
            requireLogin: false
        },
        '/tables': {
            templateUrl: 'angular/pages/tables.html',
            controller: 'tablesController',
            requireLogin: true
        },
        '/forms': {
            templateUrl: 'angular/pages/forms.html',
            controller: 'formsController',
            requireLogin: true
        }
    };

app.config(["$routeProvider", "$httpProvider", "$locationProvider", function ($routeProvider, $httpProvider, $locationProvider) {

    $httpProvider.defaults.withCredentials = true;

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });


    $routeProvider
        .when('/', {
        templateUrl: 'angular/pages/home.html',
        controller: 'homeController'
        })
        .when('/tables', {
		templateUrl: 'angular/pages/tables.html',
		controller: 'tablesController'
        })
        .when('/forms', {
        templateUrl: 'angular/pages/forms.html',
        controller: 'formsController'
        })

    //ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
}]);

app.directive('ngModal', ['$uibModal', function ($uibModal) {
    return {
        restrict: 'A',
        replace: true,
        scope: false,
        link: function postLink(scope, element, attrs) {
            if (scope.modalInstance == undefined)
                scope.modalInstance = {};
            scope.modalInstance[attrs.visible] = null;
            scope.$watch(attrs.visible, function (value) {
                if (value == true)
                {
                    scope.modalInstance[attrs.visible] = $uibModal.open({
                        animation: attrs.animation == 'false' ? false : true,
                        templateUrl: attrs.template,
                        size: attrs.size ? attrs.size : 'lg',
                        backdrop: attrs.backdrop ? attrs.backdrop : true,
                        backdropClass: attrs.backdropclass ? attrs.backdropclass : '',
                        keyboard: attrs.keyboard == 'false' ? false : true,
                        scope: scope
                    });
                    scope.modalInstance[attrs.visible].result.then(function () {
                    }, function () {
                        scope[attrs.visible] = false;
                        scope.modalInstance[attrs.visible] = null;
                    });
                } else {
                    if (scope.modalInstance[attrs.visible] != null){
                        scope.modalInstance[attrs.visible].dismiss();
                    }
                }
            });
        }
    };
}]);

app.directive('login', function ($uibModal) {
    return{
        restrict : 'EA',
        templateUrl : './angular/pages/login.html',
        replace : true,
        scope: {
            onLoginRequest: '&',
            errors: '='
        },
        link : function ($scope) {
            $scope.loginInfo = {};
            // ------------------------------------------------------- //
            // Transition Placeholders
            // ------------------------------------------------------ //
            $('input.input-material').on('focus', function () {
                console.log("front script");
                $(this).siblings('.label-material').addClass('active');
            });

            $('input.input-material').on('blur', function () {
                $(this).siblings('.label-material').removeClass('active');

                if ($(this).val() !== '') {
                    $(this).siblings('.label-material').addClass('active');
                } else {
                    $(this).siblings('.label-material').removeClass('active');
                }
            });

            // ------------------------------------------------------- //
            // Functions
            // ------------------------------------------------------ //
            $scope.loginAction = function loginAction() {
                console.log("login action" +$scope.loginInfo);
                $scope.onLoginRequest({email: $scope.loginInfo.email, password: $scope.loginInfo.password})
            }
        }
    };
});