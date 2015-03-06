
(function () {
    'use strict';

    /*global angular */
    angular
        .module('AudioVideoFrame', [])
        .directive('audioVideoFrame', function () {
            return {
                restrict: 'E',
                scope: {
                    url: '='
                },
                template:
                    '<div id="video-block-outer">' +
                        '<div id="video-block-inner" class="video-block-inner">' +
                            '<iframe id="video-block-iframe" class="video-block-iframe" scrolling="no" frameborder="0"' +
                                'src="{{url}}"></iframe>' +
                        '</div>' +
                    '</div>'
            };
        });
}());