---
layout: post
title: WebSocket - HTML5
date: 2015-03-22 18:21:43.000000000 -03:00
image: /images/posts/2015-03-22-websocket-html5/cover.jpg
type: article
published: true
status: publish
categories:
- php
tags:
- code pen,
- html5,
- http,
- php,
- rfc6455,
- slideshare,
- web sockets
---

HTML5 brings a lot of new features came to help developers to create
amazing apps and amazing user experience, one of these features is called web
socket which provides new powers under the HTTP protocol.

Web socket resolves the lack of HTTP when we need updating our clients with real
time data and also server events regardless of a request.

## The client side

First of all let's have a look in the javascript code the easiest step
to get web sockets working.

```javascript
var mySocket = new WebSocket('ws://myserver');

mySocket.onopen = function() {};

mySocket.onclose = function() {};

mySocket.send = function() {};

mySocket.onerror = function() {};

mySocket.onmessage = function() {};
```

With the snippet above we already have a code working but also we can specify
which protocol we want to use through or connection.

```javascript
var mySocket = new WebSocket('ws://myserver', ['myProtocol']);

mySocket.onopen = function() {};

mySocket.onclose = function() {};

mySocket.send = function() {};

mySocket.onerror = function() {};

mySocket.onmessage = function() {};
```

## Handshake
Now that we have the client already is time to concentrate in a key part of the
process, the handshake. I would like to recommend if you don't know
what is and why we must do that please see
[this wikipedia article](http://en.wikipedia.org/wiki/WebSocket#WebSocket_protocol_handshake){:target="_blank"}
and [this from websocket.org](https://www.websocket.org/aboutwebsocket.html){:target="_blank"}.

To perform a handshake we will need the client header and some hash stuff to
return those combined to upgrade our header. The key header that we are looking
for is the Sec-WebSocket-Key. So let's to our example!

```bash
GET ws://echo.websocket.org/?encoding=text HTTP/1.1
Origin: http://websocket.org
Cookie: __utma=99as
Connection: Upgrade
Host: echo.websocket.org
Sec-WebSocket-Key: uRovscZjNol/umbTt5uKmw==
Upgrade: websocket
Sec-WebSocket-Version: 13
```

Our header value is uRovscZjNol/umbTt5uKmw== with that we will do the following
steps on our server:

- Append to the uRovscZjNol/umbTt5uKmw== the value 258EAFA5-E914-47DA-95CA-C5AB0DC85B11
- Create a SHA1 hash with the string
- Apply the base64 enconding to the result of the SHA 1 encode

The above steps translated to PHP code will be something like the example below

```php
<?php
$hds; //headers grabed from the client header

if(preg_match("/Sec-WebSocket-Key: (.*)\r\n/",$hds,$matchs)){ 
  $key = $matchs[1] . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'; 
  $key = base64_encode(sha1($key, true)); 
  $headers = "HTTP/1.1 101 Switching Protocols\r\n". 
             "Upgrade: websocket\r\n". 
             "Connection: Upgrade\r\n". 
             "Sec-WebSocket-Accept: " . $key . "\r\n\r\n";
}
```

To deeper information go ahead and see the
[RFC 6455 documentation](https://tools.ietf.org/html/rfc6455){:target="_blank"}.

## Wrapping everything up!

As you saw on this post to create a websocket server from scratch is a tough
task, roughly we have a couple of projects that do all the hard work for us.

The most common in the PHP world is
[Ratchet](https://github.com/ratchetphp/Ratchet){:target="_blank"},
the documentation is awesome and the repository on github is updated frequently
I do recommend Ratchet.

## Edit: Mar 28, 2015

<iframe width="100%" height="355" style="border: 1px solid #CCC; border-width: 1px; margin-bottom: 5px; max-width: 100%;" src="//www.slideshare.net/slideshow/embed_code/46061464" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" allowfullscreen="allowfullscreen"> </iframe>