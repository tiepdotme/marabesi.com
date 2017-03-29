---
layout: post
title: Running PHP with Arduino
date: 2017-03-13 01:06:05.000000000 -03:00
type: post
published: true
status: published
categories:
- Post
tags: []
author:
  login: matheusmarabesi
  email: matheus.marabesi@gmail.com
  display_name: Matheus Marabesi
  first_name: Matheus
  last_name: Marabesi
---

Lately I'e been playing with Arduino and PHP to create simple demos and see how the interaction
between them works. For my surprise it worked really well and I could at least do the blink example with few lines
of code.

From now on I' assuming that you'e played around with Arduino and feel familiar with some terms like, execution loop,
setup, pins and LED.

I used Arduino Uno to keep the things as simple as possible, but any Arduino family board is supported.

## Arduino and PHP

The first thing that came to my mind at least was to use the command line to interact with the serial port in the 
Arduino board. It could have worked as expected but for sure is not the best approach, since we are using a workaround.

I say workaround based on other languages where we can have native integration with those devices, have you ever heard
about pi4j? What about Jhonnyfive? Those libraries provide a simple, elegant and the most important a native connection
direct to the board.

To interact via command line with our Arduino we would simply do, something like this (assuming that the Arduino is
connected via USB cable)
 
``` bash
echo '1' >> /dev/cu.wchusbserial1410
```

The command above will send 1 to the Arduino serial port and blink the RX LED in the Arduino board.

We have taken the first step and communicated successfully to our Arduino board, but it is terminal only. Our
goal here is do it via PHP, and as programmers we usually take the easiest path. Which means to send this command
line through PHP script.

``` php
<?php
shell_exec("echo '1' >> /dev/cu.wchusbserial1410");
```

The PHP script above does the job well, but its not elegant. The error handling is terrible.

Comes in place PHP streams, I'm sure you've used them before. PHP developers are used to streams and don' know that. 

## Understanding a bit of streams

PHP.net has a entire section dedicated to streams, from there we can grab the following definition

> Streams are the way of generalizing file, network, data compression, and other operations which share a common set 
of functions and uses. In its simplest definition, a stream is a resource object which exhibits streamable behavior. 
That is, it can be read from or written to in a linear fashion, and may be able to fseek() to an arbitrary locations 
within the stream.

Despite fseek, we can resume streams as a generalization of data being read and written. The PHP world provide us
functions like **fopen**, **file**, **fseek**, **fstats** and so on to interact with streams in the daily basis.

``` php
<?php
print file_get_contents('/foo/bar/my_file.txt');
```

The source code above represents the simplest use of streams in PHP, reading a file content. Though PHP allow us to use
wrappers such as **http://**, **ftp://**, **php://**, **phar://** and so on (a full list is given at [PHP official 
documentation](http://php.net/manual/en/wrappers.http.php)).

