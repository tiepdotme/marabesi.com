---
layout: post
title: Udacity progressive web apps notes
date: 2018-12-02 01:06:05.000000000 -03:00
type: post
published: true
status: published
categories:
- javascript
tags:
- web,
- js,
- javascript,
- pwa
author:
  display_name: Matheus Marabesi
---

# 01 - Offline and lie-fi problem

Service workers were born to improve the user experience in the connectivity aspect.
In the offline, which is the case when the user has no connection at all to the 
internet and the lie-fi, which is a term related to bad connection and high 
latency.

THerefore, once is not worse then the other, they are in essence bad for user
experience. Offline means that the user will not receive new data and lie-fi
makes the user disapointed with responses responses that often tend to show 
the loading progress bar forever.

# 02 - Service workers

Service workers are scripts that sits between the request made by the browser
and the response received by the user.

The key characteritcs that define a service woker are:

- Is a isolated script that can't access the DOM.
- Intercepts requests and decides when to go over the network or send a cached version.
- Has a defined life cycle, installing, waiting and active.
- Must have HTTPs, but is allowed to use without on localhost

The simplest service worker can be installed and cache assets to decrease the
bandwith usage (thinking of mobile networks). The first part is to define what 
should be cached, as in the snippet 1.

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

The `cache` API is a new cache introduced along the service workers.

Once the assets have beend storaged, the service worker can start to intercep
and serve the cached content. The event fired when a request is made and the 
service worker is active is called `fetch`, whithin this event we can
send the cached content to the user, as in the snippet 2.

```javascript
// snippet 2
// register a callback to respond to each fetch event
// this event is fired when a request ismade by the browser
self.addEventListener('fetch', function (event) {
    event.respondWith(
        // verify if the request exists in the cache
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                }

                var fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    function (response) {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            }
        )
    );
});
```

The last piece is to register the service worker in the browser, so it can
start to to his job. The recommended to follow the progressive enhancement approach,
checking if the browser that the user is using supports the service works.

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
As the approach described so far is a enhancement in the user experience it does 
lack the user control. Which can give the user the ability to decide when
receive the desired updates or not. Further with that we achieve the offline
first approach. Starting always serving the offline content and then 
check for updates in the background.


