'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
        'ngResource',
        'ui.router',
        'ui.bootstrap',
        'loginModule'
    ])
    // constant
    .constant('initConstant', {
        coursesUrl: {
            name: '/rest/courses',
            value: "http://EPUAKHAW0876:3001/rest/courses"
        },
        'loginState': {
            name: "login",
            value: "/login"
        },
        'mainState': {
            name: "courses",
            value: "/courses"
        }
    })

    //config
    .config(function ($urlRouterProvider, $stateProvider, initConstant) {
        // if the path doesn't match any of the urls you configured
        // otherwise will take care of routing the user to the specified url

        $urlRouterProvider.otherwise(initConstant.loginState.name);

        $stateProvider.state(initConstant.loginState.name, {
            url: initConstant.loginState.value,
            template: '<login></login>'
        });

        $stateProvider.state(initConstant.mainState.name, {
            url: initConstant.mainState.value,
            template: "<courses><breadcrumbs></breadcrumbs></courses>"
        });

        $stateProvider.state('add', {
            url: '/courses/new',
            template: '<add><breadcrumbs></breadcrumbs></add>'
        });

        $stateProvider.state('edit', {
            url: '/courses/:id',
            template: "<edit><breadcrumbs></breadcrumbs></edit>"
        });

    })

    // services
    .service('coursesApi', function (initConstant, $resource) {
        var url = initConstant.coursesUrl.value;

        return $resource(url,
            {},
            {
                allCourses: {
                    method: 'GET',
                    isArray: true
                },
                getCourseById: {
                    method: 'GET',
                    url: url + "/:id"
                },
                updateCourseById: {
                    method: 'POST',
                    url: url
                },
                addCourse: {
                    method: 'PUT',
                    url: url
                },
                removeCourseById: {
                    method: 'DELETE',
                    isArray: true,
                    url: url + "/:id"
                }
            }
        )
    })

    // filter
    .filter("durationFilter", function () {
        return function (data) {
            var minInHours = 60,
                hours = Math.floor(data / minInHours),
                minutes = hours % minInHours;
            return hours + " часа " + minutes + " мин ";
        };
    })

    //controllers
    .controller("breadCrumbsCtrl", function ($scope, $state) {
        $scope.state = $state;
    })
    .controller("CoursesCtrl", function ($scope, $state, coursesApi) {
        $scope.items = coursesApi.allCourses();

        $scope.searchValue = "";

        $scope.search = function () {
            $scope.searchValue = $scope.search.input;
        };

        $scope.remove = function (param) {
            coursesApi.removeCourseById({id: param}).$promise
                .then(function (data) {
                    $scope.items = data;
                });
        }
    })
    .controller("AddCtrl", function ($scope, $state, coursesApi) {
        var nextState = "courses";

        $scope.save = function () {
            if ($scope.add_form.$valid) {
                var data = $scope.item;
                coursesApi.addCourse(data).$promise
                    .then (function () {
                        $state.go(nextState);
                    });
            }
        };

        $scope.cancel = function () {
            $state.go(nextState);
        }
    })
    .controller("EditCtrl", function ($scope, $state, coursesApi) {
        var nextState = "courses",
            id = $state.params.id;

        $scope.item = coursesApi.getCourseById({id: id});

        $scope.save = function () {
            if ($scope.add_form.$valid) {
                coursesApi.updateCourseById({data: $scope.item}).$promise.then(function () {
                    $state.go("courses")
                });
            }
        };

        $scope.cancel = function () {
            $state.go(nextState);
        }
    })

    //directives
    .directive('breadcrumbs', function () {
        return {
            transclude: true,
            controller: 'breadCrumbsCtrl',
            templateUrl: '/app/templates/breadcrumbs.html',
            scope: {}
        }
    })
    .directive('courses', function () {
        return {
            transclude: true,
            controller: 'CoursesCtrl',
            templateUrl: '/app/templates/courses.html',
            scope: {}
        }
    })
    .directive('add', function () {
        return {
            transclude: true,
            controller: 'AddCtrl',
            templateUrl: '/app/templates/add.html',
            scope: {}
        }
    })
    .directive('edit', function () {
        return {
            transclude: true,
            controller: 'EditCtrl',
            templateUrl: '/app/templates/add.html',
            scope: {}
        }
    })


    //run
    .run(function ($rootScope, $state) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
            $state.previous = fromState;
        });
    });












