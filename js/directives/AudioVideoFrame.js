
(function () {
    'use strict';

    /*global angular, window, $, addEventListener, attachEvent */
    angular
        .module('AudioVideoFrame', [])
        .directive('audioVideoFrame', ['$window', function ($window) {

            /*
            function listener(event) {
                //if (event.origin !== "http://localhost:63342/" ) {
                //    return;
                //}
                angular.element($('*[ng-app]')).scope().$broadcast('msg', event.data);
            }

            if (window.addEventListener) {
                addEventListener("message", listener, false);
            } else {
                attachEvent("onmessage", listener);
            }
            */

            angular.element($window).on('message', function(e) {
                //if (event.origin !== "http://localhost:63342/" ) {
                //    return;
                //}
                angular.element($('*[ng-app]')).scope().$broadcast('msg', event.data);
            });

            return {
                restrict: 'E',
                scope: {
                    url: '='
                },
                template:
                    '<div id="video-block-outer">' +
                        '<div id="video-block-inner" class="video-block-inner">' +
                            '<iframe id="video-block-iframe" class="video-block-iframe" scrolling="no" frameborder="0"' +
                                'src="{{url}}"></iframe>' +
                        '</div>' +
                    '</div>'
            };
        }]);
}());