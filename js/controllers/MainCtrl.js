
(function () {
    'use strict';

    /*global angular, Modernizr, document, $ */
    angular
        .module('MainPage', [])
        .controller('MainController', [ '$scope', function ($scope) {

            function setIframeWidth() {
                var w = document.getElementById('video-block-outer').offsetWidth;
                document.getElementById('video-block-iframe').width = w;
            }

            function sendConfigToIframe() {
                var w = document.getElementById('video-block-iframe').contentWindow;
                w.postMessage($scope.iframeCfg, 'http://localhost:63342/msg-iframe-ng/index2_nodir.html');
            }

            $scope.clickConfig = function () {
                sendConfigToIframe();
            };

            setIframeWidth();
            $(window).resize('resize.doResize', function () {
                setIframeWidth();
            });

            $scope.iframeCfg = {
                blocks: 'both'
            };

            $scope.$on('msg', function (event, args) {
                if (args.source !== 'no-directive') {
                    return;
                }

                // '8' below is due to padding added on this page (i.e., not a miscalculation in the iframe).
                document.getElementById('video-block-inner').style.width = (args.width + 8) + 'px';
                document.getElementById('video-block-inner').style.height = (args.height + 4 + 8) + 'px';
                document.getElementById('video-block-iframe').height = args.height;
            });

            $scope.$on('$destroy', function () {
                $(window).off('resize.doResize');
            });

        }]);
}());