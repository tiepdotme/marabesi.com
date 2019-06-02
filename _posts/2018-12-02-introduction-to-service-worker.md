---
layout: post
title: Introduction to Service Worker
date: 2018-12-02 01:06:05.000000000 -03:00
image: /images/posts/2018-12-02-introduction-to-service-worker/cover.png
type: post
published: true
status: published
categories:
- javascript
tags:
- web,
- js,
- javascript,
- pwa,
- service worker,
- chrome,
- google,
- HTML,
- cache,
- API,
- offline,
- udacity
---

The following content is inspired by the udacity course with bits from [other
sources as well](#03---references). The main goal is to identify what is a service worker
and what it can offer to incorporate a progressive web app.

# 01 - Offline and lie-fi problem

Service workers improves the user experience in the connectivity aspect.
In the offline, which is the case when the user has no connection at all to the 
internet and the lie-fi, which is a term related to bad connection and high 
latency **[1]**.

Therefore, once is not worse than the other, they are in essence bad for user
experience. Offline means that the user will not receive new data and lie-fi
makes the user disapointed with responses that often tend to show 
the loading progress bar forever.

# 02 - Service workers

A service worker is a script that sits between the request made by the browser
and the response received by the user **[2][7]**, like a proxy server.

The characteritcs that define a service woker are:

- A isolated script that can't access the DOM.
- Intercept requests and decides when to go over the network or send a cached version.
- Has a defined life cycle, installing, waiting and active.
- Must have HTTPs. Though, it is allowed to use without on localhost for
development purposes.

The simplest service worker can be installed and cache assets to decrease the
bandwith usage. The first part is to define what should be cached,
as in the snippet 1.

```javascript
//snippet 1
// defines the cache name, this name is going to appear in the dev tools
// under Application > Cache Storage
var CACHE_NAME = 'marabesi.com_v1';

// what to cache, defined by URL, using / is going to cache everything
var assetsToCache = [
    '/'
];

// puts everything that maches the assetsToCache into the cache to use 
// later.
self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(assetsToCache);
            })
    );
});
```

The `cache` API was introduced along the service worker
specification **[4]**, and it is related with the snippets found in
the internet, which verify only if the brower has the `serviceWorker`
feature available **[8][9][10]**.

Once the assets have beend cached, the service worker can start to serve the
cached content. The event `fetch` is fired when a request is made and the
service worker is active. This event decides to send the
cached content to the user or to go over the network and fetch the data,
as in the snippet 2.

```javascript
// snippet 2
// register a callback to respond to each fetch event
// this event is fired when a request ismade by the browser
self.addEventListener('fetch', function (event) {
    event.respondWith(
        // verify if the request exists in the cache
        caches.match(event.request).then(function (response) {
            if (!response) {
                return response;
            }

            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
                .then(function (cache) {
                    cache.put(event.request, responseToCache);
                });

            return response;
        })
    );
});
```

The last piece is to register the service worker in the browser, so it can
start to do his job. The recommended is to follow the progressive enhancement approach **[3]**,
checking if the browser that the user is using supports the service worker, if
not the service worker is ignored.

```javascript
//snippet 3
// if the serviceWorker property exists in the browser
// it supports the feature and then registers the script
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js');
    });
}
```

As the approach described so far is an enhancement in the user experience it does 
lack the user control **[5]**, and there is no way to remove the old cache
once a new verion is available.

The only way to update the assets is to change the service worker code. The change
can be as small as to change the cache version. In the snippet 1, for instance,
the cache version is set to `marabesi.com_v1`, changing it to `marabesi.com_v2`
would trigger an update event in the service worker and the content would be
fetched and refresh the cache with the new data.

Therefore, the service worker does not show the new content automatically, to
show the new content cached by the new service worker, all instances of the
current one must be terminated **[2][6]**. In this context terminated means, to close the
current page or navigate to a new URL and then come back.

![Service work lifecycle](/images/posts/2018-12-02-introduction-to-service-worker/service_worker_flow.png){:target="_blank"}

The steps to have a site available offline is done, but with that approach the
cache in the users browser would grow as every change made in the service worker.
To address that the `activate` event is used to remove the old cache when a new
version is available, as in the snippet 4:

```javascript
//snippet 4
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('marabesi.com_') &&
                        cacheName != CACHE_NAME;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});
```

To address this issue the service worker API offers methods to control it in a
sofisticaded manner. Giving to the user the ability to decide when to
update the local content with the new one. With that the approach used change, from
online first to offline first, starting serving the cached content and 
checking for updates in the background.

# Letting the user take control

To give the user the ability to decide when to replace the current
cached content with the new one, changes need to be made in the service worker
that we created in the previous section.

So far we used the following events to register the service worker and cache
the assets:

- install
- fetch

To interact with the user there are more events needed. The missing parts
of our service worker is to identify when an update is available and when
the new installed version is ready for use. The service worker API offer two
events to accomplish that:

- updatefound
- statechange

Those events are related to the service worker but they occurr in diferente objects.
The used script to interact with `install` and `fetch` is the single javascript
file `service-worker.js` (snippet 1). 

![Service worker types of events](/images/posts/2018-12-02-introduction-to-service-worker/service_worker_events.png){:target="_blank"}

The events `updatefound` and `statechange`
are events related to the `ServiceWorkerRegistration` object, which is returned 
in the register method.

```javascript
// snippet 5
// setting up the button event and the event to send data from the current page
// to the service worker
 if ('serviceWorker' in navigator) {
    // a button defined in the HTML
    var updateButton = document.querySelector('.update-button');
    var worker;

    // sends a message with a json to the active service worker
    updateButton.addEventListener('click', function() {
        worker.postMessage({ action: 'skip'});
    });

    // setting up the service worker resgistration events
    window.addEventListener('load', function() {
        var registration = navigator.serviceWorker.register('/service-worker.js')

        /**
         * @var registration ServiceWorkerRegistration
         */
        registration.then(function(registration) {
            registration.addEventListener('updatefound', function() {
                worker = registration.installing;

                worker.addEventListener('statechange', function() {
                    if (worker.state == 'installed') {
                        updateButton.classList.remove('hide');
                    }
                });
            });
        });
    });
}
```

Besides that, the service worker does not have access to the DOM in the page which
makes the approach to interact with the user different. To communicate via 
the current web page to the user the service worker provider a message based
system.

The main page (the page that has access to the DOM) send the desired message
through the method `postMessage`, then the service worker listens to the
`message` event.

```javascript
// snippet 5
// listening to data coming from postMessage
self.addEventListener('message', function (event) {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});
```

The snippet 5 is the last part to give the user the control when the update
should be applied. The following have been achieved:

- The site data is cached in the service worker
- The site is accessible in offline mode
- The user has the control when to apply the update, but it happens automatically
once the user leaves the site and comes back


# 03 - References

**[1]** Michael Wales, 'Offline Web Applications by Google', 2016. [Online]. Available: [https://eu.udacity.com/course/offline-web-applications--ud899](https://eu.udacity.com/course/offline-web-applications--ud899){:target="_blank"}. [Accessed: 20 - Dec - 2018]

**[2]** Matt Gaunt, 'Service Workers: An Introduction', 2018. [Online]. Available: [https://developers.google.com/web/fundamentals/primers/service-worker](https://developers.google.com/web/fundamentals/primers/service-workers){:target="_blank"}. [Accessed: 18 - Jan - 2019]

**[3]** W3C, 'Graceful degradation versus progressive enhancement', 2015. [Online]. Available: [https://www.w3.org/wiki/Graceful_degradation_versus_progressive_enhancement](https://www.w3.org/wiki/Graceful_degradation_versus_progressive_enhancement){:target="_blank"}. [Accessed: 18 - Jan - 2019]

**[4]** W3C, 'Service Workers 1 - 
W3C Working Draft, 2 November 2017', 2017. [Online]. Available: [https://www.w3.org/TR/service-workers-1/#cache-objects](https://www.w3.org/TR/service-workers-1/#cache-objects){:target="_blank"}. [Accessed: 18 - Jan - 2019]

**[5]** Dean Hume, 'How to display a "new version available" for a Progressive Web App', 2018. [Online]. Available: [https://deanhume.com/displaying-a-new-version-available-progressive-web-app](https://deanhume.com/displaying-a-new-version-available-progressive-web-app){:target="_blank"}. [Accessed: 18 - Jan - 2019]

**[6]** Jake Archibald, 'The Service Worker Lifecycle', 2018. [Online]. Available: [https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#aguardando](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#aguardando){:target="_blank"}. [Accessed: 18 - Jan - 2019]

**[7]** T. Ater, Building Progressive Web Apps. 2017, p. 22.

**[8]** Google, 'Basic Service Worker Sample', 2016. [Online]. Available: [https://googlechrome.github.io/samples/service-worker/basic/#container](https://googlechrome.github.io/samples/service-worker/basic/#container){:target="_blank"}. [Accessed: 18 - Jan - 2019]

**[9]** Mozilla, 'ServiceWorker', 2018. [Online]. Available: [https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker#Examples](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker#Examples){:target="_blank"}. [Accessed: 18 - Jan - 2019]

**[10]** S. Amarasinghe, Service Worker Development Cookbook. 2016, p. 18.

<!-- https://jakearchibald.com/2014/offline-cookbook/ -->