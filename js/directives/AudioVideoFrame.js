
(function () {
    'use strict';

    /*global angular, $ */
    angular
        .module('AudioVideoFrame', [])
        .directive('audioVideoFrame', [ '$timeout', function ($timeout) {

            var idCnt = 0;

            return {
                link: function (scope, elem, attrs) {
                    idCnt += 1;
                    scope.id = idCnt;
                    scope.hidden = true;

                    (function (scope) {
                        var myScope = scope;

                        function setIframeWidth() {
                            var w = $('#av-block-outer-' + myScope.id)[0].offsetWidth;
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
                            var elInner = $('#av-block-inner-' + myScope.id);
                            elInner.width(args.width);
                            elInner.height(args.height);
                            $('#av-block-iframe-' + myScope.id).attr('height', args.height);

                            if (scope.hidden) {
                                scope.hidden = false;
                                $('#av-block-outer-' + myScope.id).css('visibility', 'visible');
                            }
                        }

                        $(window).on('message', function (e) {
                            if (myScope.url === e.originalEvent.data.url) {
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
                    '<div ng-attr-id="av-block-outer-{{id}}" class="av-block-outer" style="visibility: hidden">' +
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