
(function () {
    'use strict';

    /*global angular, $ */
    angular
        .module('MainPage', [])
        .controller('MainController', [ '$scope', '$window', '$location',
            function ($scope, $window, $location) {
                var l, baseUrl;

                $scope.iframeCfg = {
                    blocks: 'both'
                };

                $scope.frame1Perm = {
                    audio: false,
                    video: false
                };

                $scope.frame2Perm = {
                    audio: false,
                    video: false
                };

                l = document.createElement("a");
                l.href = $location.absUrl();
                baseUrl = $location.absUrl().replace(l.hash, '');
                $scope.frame1Url = baseUrl + 'iframe_1.html';
                $scope.frame2Url = baseUrl + 'iframe_2.html';
            }]);
}());