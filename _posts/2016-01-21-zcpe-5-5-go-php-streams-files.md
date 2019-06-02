---
layout: post
title: ZCPE 5.5 here we go – PHP Streams (Files/Http)
date: 2016-01-21 09:44:36.000000000 -02:00
type: post
published: true
status: publish
image: /images/posts/2016-01-21-zcpe-5-5-go-php-streams-files/cover.jpg
categories:
- php
- ZCPE
tags:
- file,
- php,
- streams,
- zcpe,
- zce,
- phar,
- ssh2,
- rar,
- data,
- data flow
---

PHP has a great section about stream which is not used frequently by developers.
Streams as the PHP documentation says:

"In its simplest definition, a stream is a resource object which exhibits
streamable behavior. That is, it can be read from or written to in a linear
fashion" - [php.net](http://php.net/manual/en/intro.stream.php){:target="_blank"}.
In many cases streams are used  unconsciously when handling a file for example.

```php
<?php
print file_get_contents('http://www.marabesi.com/my_file.php');
```

Look the code above where we are using the **http://** wrapper. Wrapper is what we use to handle a stream in PHP and there are a couple of wrappers in PHP **file://**, **http://**,** ftp://**,** php://**, **zlib://**, **data://**, **glob://**, **phar://**, **ssh2://**, **rar://**,** ogg://**, **expect://**. Each wrapper is used for a specific purpose in our example we used http because we are reading a file in a server, to access a file in a FTP server instead we might use **ftp://** or to find files in a given pattern we might use **glob://** and so on.
By default when no one is spefied PHP uses **file://**.

```php
<?php
print file_get_contents('/foo/bar/file.txt');

print file_get_contents('file:///foo/bar/file.txt');
```

Both reproduce the same result. A interesting point is you can use PHP with any
function that handles I/O.

```php
<?php
$file = fopen('file:///foo/bar/file.txt', 'r');

print fgets($file);
```

Write to is very simple with streams as well.

```php
<?php
print file_put_contents('file:///foo/bar/file.txt', 'text data');
```

## Adding context

Some times when using **http://** wrapper we need to add some context such as
headers in the request and to achieve that we need to use
[**stream_context_create**](http://php.net/manual/en/function.stream-context-create.php){:target="_blank"}.

```php
<?php
$http = [
  'http' => [
    'method' => 'GET',
    'header'=> 'Token: my_token'
  ]
];

$context = stream_context_create($http);
```

Think about context as our scenario, something that we need to have to complete
an action. Once created our context we just need apply it to a stream.

```php
<?php
print file_get_contents('http://marabesi.com/file.txt', false, $context);
```

In our example we are trying to read a file protected by a token. To read the
file successfully we pass the token through the header in the request using our
context, if we didn't pass the token we weren't able to read the file. If you
aren't convinced yet, lets move to the next example where we need to read a file
over HTTP protocol within a proxy. How would you do that?

```php
<?php
$context = stream_context_create([
    'http' => [
        'timeout' => 10,
        'proxy' => 'tcp://my_proxy:3128',
        'request_fulluri' => true,
    ]
]);
```

With streams we just created a context to apply in or **file_get_contents**
function. But in our proxy settings we don't use any authentication, to do that
we need to add  a header in our context.

```php
<?php
$auth = base64_encode('user:password');

$context = stream_context_create([
    'http' => [
        'timeout' => 10,
        'proxy' => 'tcp://my_proxy:3128',
        'header' => "Proxy-Authorization: Basic $auth",
        'request_fulluri' => true,
    ]
]);
```

## Consider to use streams

Streams are powerful and help us to build more robust PHP programs, in the past
I used to use CURL to consume a simple web service, until I discover streams.
Just look how good streams are:

- No extension needed (not true for all, some of them need eg: **ssh2://** and **ogg://**)
- Easy to use, to write we just to have to use functions like **file_put_contenst** or **fwrite** (depends if you are using with resource or a real file)
- Handle errors are much easier

CURL is a amazing extension but we can do better natively with PHP, but it is
up to you! Just check out the official documentation about streams
[here](http://php.net/manual/en/wrappers.php){:target="_blank"}.

You may wondering where you find all context options you can use with
**stream_create_context** and this question is easily answered if you visit the
PHP documentation in
[http://php.net/manual/en/context.php](http://php.net/manual/en/context.php){:target="_blank"}.
There you can find all of them and use it as you wish.

## Edit: Jun 25, 2016

<iframe src="//www.slideshare.net/slideshow/embed_code/key/17RreQzcXK45Dl" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="100%" height="485" style="border: 1px solid #CCC; border-width: 1px; margin-bottom: 5px; max-width: 100%;" allowfullscreen></iframe>

## Edit: May 31, 2016

<iframe width="100%" height="485" style="border: 1px solid #CCC; border-width: 1px; margin-bottom: 5px; max-width: 100%;" src="//www.slideshare.net/slideshow/embed_code/key/16zvfeBdq17ErP" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" allowfullscreen="allowfullscreen"></iframe>
