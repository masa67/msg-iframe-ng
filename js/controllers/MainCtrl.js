
(function () {
    'use strict';

    /*global angular, $ */
    angular
        .module('MainPage', [])
        .controller('MainController', [ '$scope', '$window', '$location', '$sce',
            function ($scope, $window, $location, $sce) {
                var l, baseUrl;

                $scope.iframeCfg = {
                    blocks: 'both'
                };

                l = document.createElement("a");
                l.href = $location.absUrl();
                baseUrl = $location.absUrl().replace(l.hash, '');
                $scope.iframeUrl = $sce.trustAsResourceUrl(baseUrl + 'iframe_1.html');
                $scope.iframeUrl2 = $sce.trustAsResourceUrl(baseUrl + 'iframe_2.html');
            }]);
}());