(function() {
    'use strict';

    var onload = function() {
        if (!window.HTMLImports) {
            document.dispatchEvent(
                new CustomEvent('WebComponentsReady', {bubbles: true})
            );
        }

        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/service-worker.js');
            });
        }

        var drawer = document.querySelector('app-drawer');

        document.querySelector('paper-icon-item').addEventListener('tap', function() {
            drawer.toggle();
        });

        document.querySelector('paper-icon-item').addEventListener('click', function() {
            drawer.toggle();
        });

    };

    onload();
})();

