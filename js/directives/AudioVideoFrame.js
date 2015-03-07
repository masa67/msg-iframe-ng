
(function () {
    'use strict';

    /*global angular, $, console */
    angular
        .module('AudioVideoFrame', [])
        .directive('audioVideoFrame', [function () {

            var idCnt = 0;

            function getHost(href) {
                var l = document.createElement("a");
                l.href = href;
                return l.host;
            }

            $(window).on('message', function (e) {
                /*
                if (srcHost !== getHost(e.originalEvent.origin)) {
                    console.log('mismatch: host = ' + srcHost + ', getHost = ' + getHost(e.originalEvent.origin));
                    return;
                }

                console.log('message received');
                angular.element($('*[ng-app]')).scope().$broadcast('msg', e.originalEvent.data);
                */
            });

            return {
                link: function (scope, elem, attrs) {
                    scope.id = ++idCnt;
                    scope.srcHost = getHost(scope.url);

                    (function (scope) {
                        var myScope = scope;

                        function setIframeWidth() {
                            var w = $('#av-block-outer-' + myScope.id).offsetWidth;
                            $('#av-block-iframe-' + myScope.id).attr('width', w);
                        }

                        setIframeWidth();
                        // FFS: resize.doResize won't work
                        $(window).resize('resize.doResize', function () {
                            setIframeWidth();
                        });

                        scope.$on('$destroy', function () {
                            $(window).off('resize.doResize');
                        });

                        function setIframeDim(args) {
                            // '8' below is due to padding added on this page (i.e., not a miscalculation in the iframe).
                            $('#av-block-inner-' + myScope.id).css('width', (args.width + 8) + 'px');
                            $('#av-block-inner-' + myScope.id).css('height', (args.height + 4 + 8) + 'px');
                            $('#av-block-iframe-' + myScope.id).attr('height', args.height);
                        }

                        $(window).on('message', function (e) {
                            console.log('message captured: ');
                            console.log(e.originalEvent.data);
                            if (myScope.srcHost !== getHost(e.originalEvent.origin)) {
                                console.log('Iframe ' + myScope.id + ' skips message for ' + e.originalEvent.origin);
                                return;
                            }
                            setIframeDim(e.originalEvent.data);
                        });

                        scope.$watch(function () {
                            return scope.iframeCfg.blocks;
                        }, function () {
                            var w = $('#av-block-iframe-' + myScope.id)[0].contentWindow;
                            w.postMessage(myScope.iframeCfg, myScope.url);
                        });

                    }(scope));
                },
                restrict: 'E',
                scope: {
                    iframeCfg: '=',
                    url: '='
                },
                template:
                    '<div ng-attr-id="av-block-outer-{{id}}" class="av-block-outer">' +
                        '<div ng-attr-id="av-block-inner-{{id}}" class="av-block-inner">' +
                            '<iframe ' +
                                'ng-attr-id="av-block-iframe-{{id}}" ' +
                                'class="av-block-iframe" scrolling="no" frameborder="0"' +
                                'ng-attr-src="{{url}}"></iframe>' +
                        '</div>' +
                    '</div>'
            };
        }]);
}());