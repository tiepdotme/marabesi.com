---
layout: post
title: Streams, understand deep each one in PHP
date: 2016-07-01 01:06:05.000000000 -03:00
type: post
published: true
status: published
categories:
- php
tags:
- PHP,
- streams,
- data,
- wrappers,
- fopen,
- file_get_contents,
author:
  login: matheusmarabesi
  email: matheus.marabesi@gmail.com
  display_name: Matheus Marabesi
  first_name: Matheus
  last_name: Marabesi
---

Usually streams in a common sense are a data that flow through some kind of "pipe" and in PHP we can use it in a 
simple way, here I would like to go through all possibilities but unfortunately it will not be possible given the 
whole world of edge cases that we could have. The PHP streams are powerful but also they lack maintenance, it 
changed since PHP 7.0 has been released but it is not the cure, the ogg wrapper for example is not compatible with 
PHP 5.+ anymore.

## Streams

Streams are defined simply as a data flow, where we have a live flow between input, process and output.

## How can I use it ?

The PHP world provides two different families to use it, functions starting with **f\*** and functions starting with
**file_\***. The main difference between those two are the type of data returned and how we handle each one, the f* family
works using resources(resource is a well known data type in PHP).

Resource is the abstraction to any possible data, all functions starting with f* receives a resource as the first 
argument.

```php
<?php

$resource = fopen('file.txt', 'r+'); 

fwrite($resource, 'my string');
```

The second family handles the content directly, the most common function used is called **file_get_contents**

```php
<?php

print file_get_contents('file.txt'); 
```

