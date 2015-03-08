
(function () {
    'use strict';

    /*global angular, $ */
    angular
        .module('AudioVideoFrameChild', [])
        .factory('audioVideoFrameChild', [ '$timeout', function ($timeout) {


            var prevWidth,
                prevHeight,
                factory = {
                    getDimCallback: undefined,
                    setShowVideoCallback: undefined,
                    sendDim: function () {
                        var dim = this.getDimCallback && this.getDimCallback();

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
                };

            function getHost(url) {
                var l = document.createElement("a");
                l.href = url;
                return l.host;
            }

            $(window).on('message', function (e) {
                if (getHost(window.location.href) === getHost(e.originalEvent.origin)) {
                    if (factory.setShowVideoCallback) {
                        switch (e.originalEvent.data.blocks) {
                        case 'both':
                            showVideoCallback(true);
                            break;
                        case 'audio-only':
                            showVideoCallback(false);
                             break;
                        }

                        $timeout(function () {
                            factory.sendDim();
                        });
                    }
                }
            });

            $(window).on('resize', function () {
                factory.sendDim();
            });

            return factory;
        }]);
}());