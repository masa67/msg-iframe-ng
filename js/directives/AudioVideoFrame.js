
(function () {
    'use strict';

    /*global angular, $, console */
    angular
        .module('AudioVideoFrame', [])
        .directive('audioVideoFrame', [function () {

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
                    scope.srcHost = getHost(scope.url);

                    (function (scope, elem) {
                        var myScope = scope;
                        var myElem = elem;

                        function setIframeWidth() {
                            var w = myElem.find('.av-block-outer')[0].offsetWidth;
                            myElem.find('.av-block-iframe').attr('width', w);
                        }

                        setIframeWidth();
                        $(window).resize('resize.doResize', function () {
                            setIframeWidth();
                        });

                        scope.$on('$destroy', function () {
                            $(window).off('resize.doResize');
                        });

                        function setIframeDim(args) {
                            // '8' below is due to padding added on this page (i.e., not a miscalculation in the iframe).
                            myElem.find('.av-block-inner').css('width', (args.width + 8) + 'px');
                            myElem.find('.av-block-inner').css('height', (args.height + 4 + 8) + 'px');
                            myElem.find('.av-block-iframe').attr('height', args.height);
                        }

                        $(window).on('message', function (e) {
                            if (myScope.srcHost !== getHost(e.originalEvent.origin)) {
                                return;
                            }
                            setIframeDim(e.originalEvent.data);
                        });

                        scope.$watch(function () {
                            return scope.iframeCfg.blocks;
                        }, function () {
                            var w = myElem.find('.av-block-iframe')[0].contentWindow;
                            w.postMessage(myScope.iframeCfg, myScope.url);
                        });

                    }(scope, elem));
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
                                'class="av-block-iframe" scrolling="no" frameborder="0"' +
                                'ng-attr-src="{{url}}"></iframe>' +
                        '</div>' +
                    '</div>'
            };
        }]);
}());