
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

                    scope.$on('msg', function (event, args) {
                        // '8' below is due to padding added on this page (i.e., not a miscalculation in the iframe).
                        elem.find('.video-block-inner').css('width', (args.width + 8) + 'px');
                        elem.find('.video-block-inner').css('height', (args.height + 4 + 8) + 'px');
                        elem.find('.video-block-iframe').attr('height', args.height);
                    });
                },
                restrict: 'E',
                scope: {
                    url: '='
                },
                template:
                    '<div class="video-block-outer">' +
                        '<div class="video-block-inner">' +
                            '<iframe ' +
                                'class="video-block-iframe" scrolling="no" frameborder="0"' +
                                'src="{{url}}"></iframe>' +
                        '</div>' +
                    '</div>'
            };
        }]);
}());