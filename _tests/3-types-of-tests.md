---
layout: post
title: 3. Types of tests?
date: 2017-03-13 23:39:18.000000000 -02:00
type: post
published: true
status: publish
categories:
- Tests
tags:
- testing
author:
- Matheus Marabesi
---

When deciding that testing is the right decision and it needs to be done, comes the second big
issue, what kind of test do I need to do?

In the software industry we have the piramyd of test, 

This section aims to clarify each type of test and how to apply them. Martin fowler wrote a good article
and explains in his first paragraph:

>Its essential point is that you should have many more low-level unit tests than high level end-to-end tests running through a GUI.

<div class="right-with-margin-bottom">
    <small>
        <a href="https://martinfowler.com/bliki/TestPyramid.html">martinfowler.com</a>
    </small>
</div>

The pyramid defines that UI tests are expensive in it's execution and unit test are faster.

## Unit tests

Nowadays unit test is (in my opinion) the most used one, and the big reason is that it provides
a way to test the unit, which means the very small piece of your application. Is hard to think in unit when we have to handle HTTP request, query the database or even validate the data coming, but besides that unit test is the esiest to get started.

In object oriented programming an unit means a method. A method is the behavior that an object has and itself can be considered a unit. The interaction os objects is common as well, but for unit, we should guarantee that only one thing will be tested at the time.

The simplest example we can demonstrate here is a mathematical operation, where we would have a class called Math and for each operation a method.

```php
class Math
{
    public function sum($a, $b)
    {
        return $a + b;
    }

    public function multiply($a, $b)
    {
        return $a - b;
    }
}
```

## Integration tests

-

## Acceptance tests

-
