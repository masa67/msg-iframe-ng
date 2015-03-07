
(function () {
    'use strict';

    /*global angular, $ */
    angular
        .module('AudioVideoFrameChild', [])
        .factory('audioVideoFrameChild', function () {

            var prevWidth,
                prevHeight,
                url,
                factory = {
                    showVideo: true,
                    getDim: undefined,
                    sendDim: function () {
                        var dim = this.getDim && this.getDim();

                        if (dim) {
                            if (dim.w !== prevWidth || dim.h !== prevHeight) {
                                prevWidth = dim.w;
                                prevHeight = dim.h;

                                url = parent.location;
                                parent.postMessage({
                                    url: location.href,
                                    width: dim.w,
                                    height: dim.h
                                },
                                    url);
                            }
                        }
                    }
                };

            function getHost(url) {
                var l = document.createElement("a");
                l.href = url;
                return l.host;
            }

            $(window).on('message', function (e) {
                if (getHost(window.location.href) === getHost(e.originalEvent.origin)) {
                    url = e.originalEvent.data.url;
                    switch (e.originalEvent.data.blocks) {
                    case 'both':
                        factory.showVideo = true;
                        break;
                    case 'audio-only':
                        factory.showVideo = false;
                        break;
                    }
                    $timeout(function() {
                        factory.sendDim();
                    })

                }
            });

            $(window).resize('resize.doResize', function () {
                factory.sendDim();
            });

            return factory;
        });
}());