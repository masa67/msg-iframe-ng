
(function () {
    'use strict';

    /*global angular, Modernizr, document, $ */
    angular
        .module('MainPage', [])
        .controller('MainController', [ '$scope', '$location', function ($scope, $location) {

            $scope.iframeCfg = {
                blocks: 'both'
            };

            var l = document.createElement("a");
            l.href = $location.absUrl();
            $scope.iframeUrl = $location.absUrl().replace(l.hash, '') + 'index2.html';
        }]);
}());