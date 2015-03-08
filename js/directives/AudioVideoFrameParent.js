
(function () {
    'use strict';

    /*global angular, $ */
    angular
        .module('AudioVideoFrameParent', [])
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
                            var w = angular.element('#av-block-outer-' + myScope.id)[0].offsetWidth;
                            angular.element('#av-block-iframe-' + myScope.id).attr('width', w);
                        }

                        $timeout(function () {
                            setIframeWidth();
                        });

                        $(window).resize('resize.doResize', function () {
                            setIframeWidth();
                        });

                        function setIframeDim(e) {
                            var args = e.originalEvent.data, elInner;
                            if (myScope.url === e.originalEvent.data.url) {
                                elInner = angular.element('#av-block-inner-' + myScope.id);
                                elInner.width(args.width);
                                elInner.height(args.height);
                                angular.element('#av-block-iframe-' + myScope.id).attr('height', args.height);

                                if (scope.hidden) {
                                    scope.hidden = false;
                                    angular.element('#av-block-outer-' + myScope.id).css('visibility', 'visible');
                                }
                            }
                        }

                        $(window).on('message', setIframeDim);

                        scope.$watch(function () {
                            return scope.iframeCfg.blocks;
                        }, function () {
                            var w = angular.element('#av-block-iframe-' + myScope.id)[0].contentWindow;
                            w.postMessage(myScope.iframeCfg, myScope.url);
                        });

                        scope.$on('$destroy', function () {
                            $(window).off('resize.doResize');
                            $(window).off('message', setIframeDim);
                        });

                    }(scope));
                },
                restrict: 'E',
                scope: {
                    iframeCfg: '=',
                    url: '@'
                },
                template:
                    '<div id="av-block-outer-{{id}}" class="av-block-outer" style="visibility: hidden">' +
                        '<div id="av-block-inner-{{id}}" class="av-block-inner">' +
                            '<iframe ' +
                                'id="av-block-iframe-{{id}}" ' +
                                'class="av-block-iframe" scrolling="no" frameborder="0"' +
                                'src="{{url}}"></iframe>' +
                        '</div>' +
                    '</div>'
            };
        }]);
}());