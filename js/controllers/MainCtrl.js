
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

            var baseUrl = $location.absUrl().replace(l.hash, '');
            $scope.iframeUrl = baseUrl + 'index2.html';
            $scope.iframeUrl2 = baseUrl + 'index3.html';
        }]);
}());