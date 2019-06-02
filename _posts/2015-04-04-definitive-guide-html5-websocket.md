---
layout: post
title: The definitive guide to HTML5 WebSocket
date: 2015-04-04 16:06:44.000000000 -03:00
image: /images/posts/2015-04-04-definitive-guide-html5-websocket/cover.jpg
type: post
published: true
status: publish
categories:
- Books review
tags:
- html5,
- IETF,
- MDN,
- security,
- W3C,
- web sockets,
- web,
- www,
- chat,
- sockets,
- xmpp,
- review
---

The book "The definitive guide to HTML5 WebSocket" is a short book with a great
content, if you are looking for web sockets this book is definitely a good
start.

## Book content

- Chapter 1: Introduction to HTML5 WebSocket
- Chapter 2: The WebSocket API
- Chapter 3: The WebSocket protocol
- Chapter 4: Building instant Messaging and Chat over WebSocket with XMPP
- Chapter 5: Using Messaging over WebSocket with STOMP
- Chapter 6: VNC with the Remote Framebuffer Protocol
- Chapter 7: WebSocket Security
- Chapter 8: Deployment Considerations

## Highlight sections

I would like to highlight three sections of the book that I do recommend
a second read.

### Chapter 2: The WebSocket API

If you are not familiar with sockets you should read more than once this
section. The authors have had the caution of explain each part of the API to
the readers and also a amazing example of drag-in-drop image is given in the
last item of this chapter.

### Chapter 3: The WebSocket Protocol

Protocols are a essential part of the
computers and therefore are also true for WebSockets. A brief introduction of
protocols is given in this chapter and how you can inspect and understand the
WebSockets protocol, also the handshake is presented. Be aware in the handshake
steps because it is a hard task to accomplish it involves headers from the
client and a little bit of operation with sha1, the authors chose nodejs to
create a simple handshake between client and server but if you're interested in
PHP you can see [this post]({% post_url 2015-03-22-websocket-html5 %}) to a
PHP version.

### Chapter 7: WebSocket Security

As a every application the security is a point of attention. This section of
the books brings to us how WebSockets work with security to prevent DDoS,
Proxy Server attacks, Man-In-the-middle and so on. The book in this section has
great examples and explanation about security and also shows a handshake feature
in the security point of view.

## Before you go...

Check these links to further information about WebSockets!

[MDN documentation](https://developer.mozilla.org/en/docs/WebSockets){:target="_blank"}

[W3C](http://www.w3.org/TR/websockets){:target="_blank"}

[IETF](http://www.ietf.org/rfc/rfc6454.txt){:target="_blank"}

[Official book page](http://www.apress.com/9781430247401){:target="_blank"}