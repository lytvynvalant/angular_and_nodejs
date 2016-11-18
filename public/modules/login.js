'use strict';

angular.module('loginModule', [])
     // services
    .service('authApi', function ($resource) {
        return $resource("",
            {},
            {
                logIn: {
                    method: 'POST',
                    url: '/auth'
                }
            }
        )
    })

    // controllers
    .controller("LogCtrl", function ($scope, $state, authApi) {
        $scope.errorResult = "";

        // todo... remove
        $scope.onHoverInput = function (data) {
            console.log(data)
        };

        $scope.Auth = function () {
            var login = $scope.login,
                password = $scope.password;

            authApi.logIn({login: login, password: password}).$promise.then(function (data) {
                if (data.auth) {
                    $scope.errorResult = "";
                    $state.go("courses")
                } else {
                    $scope.errorResult = "Не верно введён логин или пароль"
                }
            });
        };
    })

    //directives
    .directive("login", function () {
        return {
            require: 'ngModel',
            templateUrl: "/modules/login.html",
            controller: "LogCtrl"
        }
    });





