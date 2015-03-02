
(function () {
    'use strict';

    /*global angular, Modernizr */
    angular
        .module('MainPage', [])
        .controller('MainController', [ '$scope', function ($scope) {

            $scope.$on('msg', function(event, args) {
                console.log('controller captured the message: ' + args.msg);
            })
        }]);

}());