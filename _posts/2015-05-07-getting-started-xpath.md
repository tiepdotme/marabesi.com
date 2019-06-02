---
layout: post
title: Getting started with Xpath
date: 2015-05-07 11:12:05.000000000 -03:00
image: /images/posts/2015-05-07-getting-started-xpath/cover.gif
type: post
published: true
status: publish
categories:
- php
tags:
- dom,
- nodes,
- php,
- simplexml,
- W3C,
- web,
- xpath,
- certification,
- xml
---

Its been a long time since my last post and now I came up with a new subject
interesting to me because I could find around me people that know and
understand Xpath, so here I'm going to show what I've found about Xpath and
the little particularities on it in PHP.

##  A little bit of history

The [first version (1.0)](http://www.w3.org/TR/xpath){:target="_blank"}
of Xpath was released in 1999 and the [second version (2.0)](http://www.w3.org/TR/xpath20){:target="_blank"}
came in 2011 and nowadays we have the [Xpath 3.0](http://www.w3.org/TR/xpath-30){:target="_blank"}
released in 2014.

Xpath was created to be able to easily navigate between nodes in a XML document
and be able to find specific node as well by criteria using a query language.

## Xpath sintax

The Xpath became famous for its light syntax and facilities of manipulating
nodes on XML documents. Xpath syntax queries are alike URL's, for example you
can use a common XPath such as "/rootNode/child/lastchild" to refer to lastchild
directly, let's see the example bellow and make the things cleaner.

```xml
<?xml version="1.0" encoding="utf-8"?>
<library>
  <book id="1">
    <author>Author 1</author>
    <summary>Summary 1</summary>
  </book>
  <book id="2">
    <author>Author 2</author>
    <summary>Summary 2</summary>
  </book>
  <book id="3">
    <author>Author 3</author>
    <summary>Summary 3</summary>
  </book>
</library>
```

Following our thoughts to reach the tag <book> we can do "/library/book" so this
way we are going to have three elements. We can also be more specific with our
document, let's say that we want to have just the book with the id 1, this way
we can use "/library/book[@id=1]"

*tip: Google for <strong>xpath tester</strong> and try out the examples in this post*

|Expression|Description|
|--- |--- |
|/|Selects from the root node|
|//|Selects nodes in the document from the current node that
match the selection no matter where they are|
|.|Selects the current node|
|..|Selects the parent of the current node|
|@|Selects attributes|

<small>Example from w3schools: [w3schools](https://www.w3schools.com/xml/xpath_syntax.asp){:target="_blank"}</small>

## Xpath and PHP

Now we have the basics of Xpath we can play around with PHP and see how it
interacts with Xpath. The first thing we must have in mind is that PHP have
two alternatives to accomplish this task and one is using simplexml family
functions or we have also the DOMXpath family.

```php
<?php
$xml = simplexml_load_file('library.xml');

$xml->xpath('/library/book[@id=1]');
```
    
Using simplexml the function will return to us all matched elements inside an array
with SimpleXMLElement on it.

```php
Array
(
    [0] => SimpleXMLElement Object
        (
            [@attributes] => Array
                (
                    [id] => 1
                )

            [author] => Author 1
            [summary] => Summary 1
        )
)
```

Otherwise we can use the DOMXpath to complete or task but we will need a few
more lines but we have a OOP approach.

```php
<?php
$dom = new DOMDocument();
$dom->load('library.xml');

$xpath = new DOMXpath($dom);
```

Therefore the return change as well

```php
DOMNodeList Object
(
    [length] => 1
)
```

## Try it yourself

We have many possibilities when we are using Xpath and also we can do a lot of
things with it, the only way to get know is getting your hands dirty and try
different queries in different files!
