
(function () {
    'use strict';

    /*global angular */
    angular
        .module('appRoutes', [])
        .config(['$routeProvider', '$locationProvider',
            function ($routeProvider, $locationProvider) {

                $locationProvider.html5Mode(true);
            }]);
}());
