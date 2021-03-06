---
layout: post
title: Raspberry Pi - Meeting the RPi-Cam-Web-Interface
date: 2015-01-31 05:04:02.000000000 -02:00
image: /images/posts/2015-01-31-raspberry-pi-meeting-rpi-cam-web-interface/cover.png
type: article
published: true
status: publish
categories:
- IoT
tags:
- raspberry,
- Raspberry,
- interface,
- Interface,
- Web,
- Cam,
- RPi,
- picture,
- Code,
- Meeting,
- socket,
- text,
- message,
- changed,
- port,
- host,
- WebSocket,
- container,
- clients,
- server,
- HTML,
- camera,
- internet of things,
- iot,
- javascript,
- php,
- raspberry pi,
- streaming,
- web,
- code
---

If you are not familiar with raspberry PI please go ahead and see
[this](https://www.raspberrypi.org){:target="_blank"} web site, I'm not
going to be talking about what is and what it can do rather I want to go
further and focus on just the raspberry PI + camera.

[![]({{ site.baseurl }}/images/posts/2015-01-31-raspberry-pi-meeting-rpi-cam-web-interface/cover.png)]({{ site.baseurl }}/images/posts/2015-01-31-raspberry-pi-meeting-rpi-cam-web-interface/cover.png){:target="_blank"}

RPi-Cam-Web-Interface is a simple interface that enable the users to interact
with the camera module on the raspberry PI, it has a lot of documentation and
the [code](https://github.com/silvanmelchior/RPi_Cam_Web_Interface){:target="_blank"}
is really easy to understand if you're a programmer.

The interface is very easy to use and it has a lot of features such as
resolution adjust, control of brightness, saturation and contrast.

[![]({{ site.baseurl }}/images/posts/2015-01-31-raspberry-pi-meeting-rpi-cam-web-interface/rpi-web-interface2.png)]({{ site.baseurl }}/images/posts/2015-01-31-raspberry-pi-meeting-rpi-cam-web-interface/rpi-web-interface2.png){:target="_blank"}

I think the main feature of the the RPi-Cam-Web-Interface is be web based.
Easy to use easy to share across multiple devices and easy to modify as well.

## Behind the scenes, how does it works?

The web interface was wrote in PHP and it has a interaction with the linux in
the raspberry in resume what the web interface does is, time by time the script
takes a picture and save it in a directory (you can easily change the default
folder where it is saved) and then refresh the the page with the new picture
through the javascript.

## Would you like to try?

You can find the official tutorial in the
[raspberry website](https://www.raspberrypi.org/forums/viewtopic.php?t=63276){:target="_blank"}
and loads more on google
