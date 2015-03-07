
(function () {
    'use strict';

    /*global angular, $, console */
    angular
        .module('AudioVideoFrame', [])
        .directive('audioVideoFrame', [ '$timeout', function ($timeout) {

            var idCnt = 0;

            function getHost(href) {
                var l = document.createElement("a");
                l.href = href;
                return l.host;
            }

            return {
                link: function (scope, elem, attrs) {
                    scope.id = ++idCnt;

                    (function (scope) {
                        var myScope = scope;

                        function setIframeWidth() {
                            var w = $('#av-block-outer-' + myScope.id)[0].offsetWidth;
                            // console.log('iframe #' + myScope.id + ': setIframeWidth ' + w);
                            $('#av-block-iframe-' + myScope.id).attr('width', w);
                        }

                        $timeout(function () {
                            setIframeWidth();
                        });

                        // FFS: resize.doResize won't work
                        $(window).resize('resize.doResize', function () {
                            setIframeWidth();
                        });

                        scope.$on('$destroy', function () {
                            $(window).off('resize.doResize');
                        });

                        function setIframeDim(args) {
                            // console.log('iframe #' + myScope.id + ': set dimensions');

                            var elInner = $('#av-block-inner-' + myScope.id);
                            elInner.width(args.width);
                            elInner.height(args.height);
                            $('#av-block-iframe-' + myScope.id).attr('height', args.height);
                        }

                        $(window).on('message', function (e) {
                            if (myScope.url !== e.originalEvent.data.url) {
                                // console.log('iframe #' + myScope.id + ': skip message for ' + e.originalEvent.data.url);
                            } else {
                                // console.log('message captured: ');
                                // console.log(e.originalEvent.data);
                                setIframeDim(e.originalEvent.data);
                            }
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