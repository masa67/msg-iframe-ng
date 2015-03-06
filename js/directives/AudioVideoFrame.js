
(function () {
    'use strict';

    /*global angular, window, $, console */
    angular
        .module('AudioVideoFrame', [])
        .directive('audioVideoFrame', ['$window', function ($window) {

            var srcHost;

            function getHost(href) {
                var l = document.createElement("a");
                l.href = href;
                return l.host;
            }

            angular.element($window).on('message', function () {
                if (srcHost !== getHost(event.origin)) {
                    console.log('Host mismatch: srcHost = ' + srcHost + ', evHost = ' + getHost(event.origin));
                    return;
                }
                angular.element($('*[ng-app]')).scope().$broadcast('msg', event.data);
            });

            return {
                link: function (scope, elem, attrs) {
                    srcHost = getHost(scope.url);
                },
                restrict: 'E',
                scope: {
                    url: '='
                },
                template:
                    '<div id="video-block-outer">' +
                        '<div id="video-block-inner" class="video-block-inner">' +
                            '<iframe ' +
                                'id="video-block-iframe" class="video-block-iframe" scrolling="no" frameborder="0"' +
                                'src="{{url}}"></iframe>' +
                        '</div>' +
                    '</div>'
            };
        }]);
}());