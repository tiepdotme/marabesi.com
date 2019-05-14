(function() {
    'use strict';

    var onload = function() {
        if ('serviceWorker' in navigator) {
            var updateButton = document.querySelector('.update-button');
            var menuWrapper = document.querySelector('.menu-wrapper');
            var worker;

            updateButton.addEventListener('click', function() {
                worker.postMessage({ action: 'skip'});
            });
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
                    registration.addEventListener('updatefound', function() {
                        worker = registration.installing;

                        worker.addEventListener('statechange', function() {
                            if (worker.state === 'installed') {
                                updateButton.classList.remove('hidden');
                                menuWrapper.classList.add('mt-10')
                            }
                        });
                    });
                });

                navigator.serviceWorker.addEventListener('controllerchange', function() {
                    window.location.reload();
                });
            });
        }

        if (document.getElementById('disqus_thread')) {
            var d = document, s = d.createElement('script');

            s.src = '//marabesi.disqus.com/embed.js';

            s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
        }

        const menuList = document.querySelector('#menu-list')

        document.querySelector('#menu').addEventListener('click', function() {
            if (menuList.classList.contains('flex')) {
                menuList.classList.remove('flex')
                menuList.classList.add('hidden')
            } else {
                menuList.classList.remove('hidden')
                menuList.classList.add('flex')
                menuList.classList.add('open')
            }
        });

        SimpleJekyllSearch({
            searchInput: document.getElementById('search-input'),
            resultsContainer: document.getElementById('results-container'),
            searchResultTemplate: '<li class="list-reset p-2"><a href="{url}">{title}</a></li>',
            json: '/search.json',
            fuzzy: false,
            noResultsText: 'No results found 😞'
        })
    };

    onload();
})();

