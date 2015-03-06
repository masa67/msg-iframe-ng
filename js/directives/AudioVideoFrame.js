
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
                    console.log('mismatch: host = ' + srcHost + ', getHost = ' + getHost(event.origin));
                    return;
                }
                angular.element($('*[ng-app]')).scope().$broadcast('msg', event.data);
            });

            return {
                link: function (scope, elem, attrs) {
                    srcHost = getHost(scope.url);

                    function setIframeWidth() {
                        var w = elem.find('.av-block-outer')[0].offsetWidth;
                        elem.find('.av-block-iframe').attr('width', w);
                    }

                    setIframeWidth();
                    $(window).resize('resize.doResize', function () {
                        setIframeWidth();
                    });

                    scope.$on('$destroy', function () {
                        $(window).off('resize.doResize');
                    });

                    scope.$on('msg', function (event, args) {
                        if (args.source !== 'directive') {
                            return;
                        }

                        // '8' below is due to padding added on this page (i.e., not a miscalculation in the iframe).
                        elem.find('.av-block-inner').css('width', (args.width + 8) + 'px');
                        elem.find('.av-block-inner').css('height', (args.height + 4 + 8) + 'px');
                        elem.find('.av-block-iframe').attr('height', args.height);
                    });

                    scope.$watch(function (scope) {
                        return scope.iframeCfg;
                    }, function (newValue, oldValue) {
                        var w = elem.find('.av-block-iframe')[0].contentWindow;
                        w.postMessage(newValue, scope.url);
                    });
                },
                restrict: 'E',
                scope: {
                    iframeCfg: '=',
                    url: '='
                },
                template:
                    '<div class="av-block-outer">' +
                        '<div class="av-block-inner">' +
                            '<iframe ' +
                                'class="av-block-iframe" iframe-cfg="iframeCfg" scrolling="no" frameborder="0"' +
                                'src="{{url}}"></iframe>' +
                        '</div>' +
                    '</div>'
            };
        }]);
}());