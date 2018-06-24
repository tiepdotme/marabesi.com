(function() {
    'use strict';

    var onload = function() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/service-worker.js');
            });
        }

        if (document.getElementById('disqus_thread')) {
            var d = document, s = d.createElement('script');

            s.src = '//marabesi.disqus.com/embed.js';

            s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
        }
    };

    onload();
})();

