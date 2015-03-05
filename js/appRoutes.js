
(function () {
    'use strict';

    /*global angular */
    angular
        .module('appRoutes', [])
        .config(['$routeProvider', '$locationProvider',
            function ($routeProvider, $locationProvider) {

                $routeProvider
                    .when('/', {
                        templateUrl: 'partials/view.html',
                        controller: 'MainController'
                    });

                /* $locationProvider.html5Mode(true); */
            }]);
}());
