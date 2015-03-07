
(function () {
    'use strict';

    /*global angular, $ */
    angular
        .module('AudioVideoFrameChild', [])
        .factory('audioVideoFrameChild', [ '$timeout', function ($timeout) {


            var prevWidth,
                prevHeight,
                showVideoCallback,
                factory = {
                    getDim: undefined,
                    sendDim: function () {
                        var dim = this.getDim && this.getDim();

                        if (dim) {
                            if (dim.w !== prevWidth || dim.h !== prevHeight) {
                                prevWidth = dim.w;
                                prevHeight = dim.h;

                                parent.postMessage({
                                    url: location.href,
                                    width: dim.w,
                                    height: dim.h
                                },
                                    parent.location);
                            }
                        }
                    },
                    regShowVideoCallback: function (callback) {
                        showVideoCallback = callback;
                        return true;
                    }

                };

            function getHost(url) {
                var l = document.createElement("a");
                l.href = url;
                return l.host;
            }

            $(window).on('message', function (e) {
                if (getHost(window.location.href) === getHost(e.originalEvent.origin)) {

                    switch (e.originalEvent.data.blocks) {
                    case 'both':
                        if (showVideoCallback) {
                            showVideoCallback(true);
                        }
                        break;
                    case 'audio-only':
                        if (showVideoCallback) {
                            showVideoCallback(false);
                        }
                        break;
                    }

                    $timeout(function () {
                        factory.sendDim();
                    });

                }
            });

            $(window).resize('resize.doResize', function () {
                factory.sendDim();
            });

            return factory;
        }]);
}());