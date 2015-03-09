
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

                        $timeout(setIframeWidth);
                        $(window).on('resize', setIframeWidth);

                        function setIframeDim(e) {
                            var args = e.originalEvent.data, elInner;
                            if (myScope.url === args.url) {
                                switch (args.type) {
                                case 'dimensions':
                                    elInner = angular.element('#av-block-inner-' + myScope.id);
                                    elInner.width(args.width);
                                    elInner.height(args.height);
                                    angular.element('#av-block-iframe-' + myScope.id).attr('height', args.height);

                                    if (scope.hidden) {
                                        scope.hidden = false;
                                        angular.element('#av-block-outer-' + myScope.id).css('visibility', 'visible');
                                    }
                                    break;
                                case 'permissions':
                                    scope.perm.audio = args.audio;
                                    scope.perm.video = args.video;
                                    scope.$apply();
                                    break;
                                }
                            }
                        }

                        $(window).on('message', setIframeDim);

                        scope.$watch('iframeCfg.blocks',
                            function () {
                                var w = angular.element('#av-block-iframe-' + myScope.id)[0].contentWindow;
                                w.postMessage(myScope.iframeCfg, '*');
                            });

                        scope.$on('$destroy', function () {
                            $(window).off('resize', setIframeWidth);
                            $(window).off('message', setIframeDim);
                        });

                    }(scope));
                },
                restrict: 'E',
                scope: {
                    iframeCfg: '=',
                    url: '=',
                    perm: '='
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