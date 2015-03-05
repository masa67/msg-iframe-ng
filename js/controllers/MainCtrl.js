
(function () {
    'use strict';

    /*global angular, Modernizr */
    angular
        .module('MainPage', [])
        .controller('MainController', [ '$scope', '$window', function ($scope, $window) {

            function setIframeWidth() {
                var w = document.getElementById('video-block-outer').offsetWidth;
                document.getElementById('video-block-iframe').width = w;
            }

            setIframeWidth();
            $(window).resize('resize.doResize', function () {
                setIframeWidth();
            });

            $scope.$on('msg', function (event, args) {
                // '8' below is due to padding added on this page (i.e., not a miscalculation in the iframe).
                document.getElementById('video-block-inner').style.width = (args.width + 8) + 'px';
                document.getElementById('video-block-inner').style.height = (args.height + 4 + 8) + 'px';
            });

            $scope.$on('$destroy', function () {
                $(window).off('resize.doResize');
            });

        }]);

}());