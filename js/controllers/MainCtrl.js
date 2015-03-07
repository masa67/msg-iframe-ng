
(function () {
    'use strict';

    /*global angular, $ */
    angular
        .module('MainPage', [])
        .controller('MainController', [ '$scope', '$window', '$location',
            function ($scope, $window, $location) {
                var l, baseUrl;

                l = document.createElement("a");
                l.href = $location.absUrl();
                baseUrl = $location.absUrl().replace(l.hash, '');

                $scope.iframeCfg = {
                    blocks: 'both',
                    url: baseUrl + 'index.html'
                };

                $scope.iframeUrl = baseUrl + 'index2.html';
                $scope.iframeUrl2 = baseUrl + 'index3.html';
            }]);
}());