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

        document.querySelector('paper-icon-button').addEventListener('click', function() {
            drawer.toggle();
        });

        if (document.getElementById('disqus_thread')) {
            var d = document, s = d.createElement('script');

            s.src = '//marabesi.disqus.com/embed.js';

            s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
        }
    };

    onload();
})();

