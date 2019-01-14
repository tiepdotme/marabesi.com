---
layout: post
title: Udacity progressive web apps notes
date: 2018-12-02 01:06:05.000000000 -03:00
image: https://cdn.freebiesupply.com/logos/large/2x/udacity-logo-png-transparent.png
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
- API
author:
  display_name: Matheus Marabesi
---

# 01 - Offline and lie-fi problem

Service workers were born to improve the user experience in the connectivity aspect.
In the offline, which is the case when the user has no connection at all to the 
internet and the lie-fi, which is a term related to bad connection and high 
latency **[1]**.

Therefore, once is not worse then the other, they are in essence bad for user
experience. Offline means that the user will not receive new data and lie-fi
makes the user disapointed with responses responses that often tend to show 
the loading progress bar forever.

# 02 - Service workers

Service workers is a script that sits between the request made by the browser
and the response received by the user **[2]**.

The characteritcs that define a service woker are:

- A isolated script that can't access the DOM.
- Intercepts requests and decides when to go over the network or send a cached version.
- Has a defined life cycle, installing, waiting and active.
- Must have HTTPs, but it is allowed to use without on localhost

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
specification **[4]**, and it
is correlated with the snippets found in the internet, which verify only
if the brower has the serviceWorker features.

Once the assets have beend cached, the service worker can start to serve the
cached content. The event fired when a request is made and the
service worker is active is called `fetch`, whithin this event we can
send the cached content to the user, as in the snippet 2.

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
checking if the browser that the user is using supports the service worker.

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
lack the user control **[5]**, and there is no way to force the cache to refresh
once a new verion is available. The user must leave the page and then come back
to have the new version **[6]**.

![Service work lifecycle](/assets/udacity-pwa-service-workers/service_worker_flow.png)

The only way to update the assets is to change the service worker code. The change
can be as small as to change the cache version. In the snippet 1, for instance,
the cache version is set to `marabesi.com_v1`, changing it to `marabesi.com_v2`
would trigger an update event in the service worker and the content would be
fetched again.

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
update the local content with the new one. With that we achieve the offline
first approach. Starting always serving the offline content and 
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

![Service worker types of events](/assets/udacity-pwa-service-workers/service_worker_events.png)

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


Besides that, service worker does not have access to the DOM in the page which
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
- The user has the control when to apply the update, but it happens autmatically
once the user leaves the site and comes back


# 03 - References

- [1] https://eu.udacity.com/course/offline-web-applications--ud899
- [2] https://developers.google.com/web/fundamentals/primers/service-workers
- [3] https://www.w3.org/wiki/Graceful_degradation_versus_progressive_enhancement
- [4] https://www.w3.org/TR/service-workers-1/#cache-objects
- [5] https://deanhume.com/displaying-a-new-version-available-progressive-web-app
- [6] https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#aguardando
- [7] https://www.oreilly.com/library/view/building-progressive-web/9781491961643
