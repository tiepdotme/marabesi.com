(function() {
    'use strict';

    var onload = function() {
        // if ('serviceWorker' in navigator) {
        //     var updateButton = document.querySelector('.update-button');
        //     var worker;

        //     updateButton.addEventListener('click', function() {
        //         worker.postMessage({ action: 'skip'});
        //     });

        //     window.addEventListener('load', function() {
        //         navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
        //             registration.addEventListener('updatefound', function() {
        //                 worker = registration.installing;

        //                 worker.addEventListener('statechange', function() {
        //                     if (worker.state === 'installed') {
        //                         updateButton.classList.remove('hide');
        //                     }
        //                 });
        //             });
        //         });

        //         navigator.serviceWorker.addEventListener('controllerchange', function() {
        //             window.location.reload();
        //         });
        //     });
        // }

        if (document.getElementById('disqus_thread')) {
            var d = document, s = d.createElement('script');

            s.src = '//marabesi.disqus.com/embed.js';

            s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
        }
    };

    onload();
})();

