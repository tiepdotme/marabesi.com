---
layout: post
title: ZCPE 5.5 here we go – PHP Basics (Language constructs)
date: 2015-08-26 01:01:47.000000000 -03:00
image: /images/posts/2015-08-26-zcpe-5-5-here-we-go-php-basics-language-constructs/cover.jpg
type: article
published: true
status: publish
categories:
- php
- ZCPE
tags:
- die,
- echo,
- empty,
- eval,
- exit,
- include,
- include_once,
- isset,
- language construct,
- list,
- php,
- print,
- require,
- require_once,
- return,
- unset,
- zcpe,
- certification
---

Zend divided language constructs in three main categories **output construct**,
**evaluation construct** and **others constructs**, you can find this division
in zend [study guide for PHP 5.5 exam](http://www.zend.com/en/services/certification/php-certification-study-guide).

## Output

|Construct|Description|
|--- |--- |
|die / exit|Used to output a result and then terminate the running script|
|echo / print|Used to output a result|
|return|Used to halt a execution of a function or a script|

## Evaluation

|Construct|Description|
|--- |--- |
|empty|Used to identify if an variable is empty (without an value)|
|eval|Used to evaluate string content|
|include/include_once|Used to include a file (using this just a warning is thrown if the file not exists)|
|require/require_once|Used to include a file (using this a fatal error is thrown)|

## Others

|Construct|Description|
|--- |--- |
|isset|Used to identify if a variable exists|
|unset|Used to unset("delete") an existing variable|
|list|Used to make easier to use an array values|

## What is the difference?

You can argue that those language constructs are just regular functions and
they haven't anything in special, but actually they have. In PHP language
constructs can be used with or without parentheses, so let's illustrate:

```php
<?php
require 'foo/bar.php';   //valid
require ('foo/bar.php'); //valid
```

Both are correct to use, but it is recommended to do not use with parentheses
for the sake of good practice. Therefore we aren't allowed to use any function
provided by PHP without parentheses:

```php
<?php
$a = [];
$b = [];

array_merge($a, $b); //valid
array_merge $a, $b;  //invalid
```

Some posts in the internet said language constructs are faster than built-in
functions, but we must remember that it is a matter of microseconds and I think
it is worthless to bother about it.
