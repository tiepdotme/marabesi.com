---
layout: post
title: Is TDD dead ?
date: 2015-12-29 23:33:11.000000000 -02:00
type: post
published: true
status: publish
image: /images/posts/2015-12-29-is-tdd-dead/cover.jpg
categories:
- TDD
tags:
- code,
- dead,
- software,
- tdd,
- testing,
- software testing,
- laravel,
- zf2,
- symfony
---

Recently I've heard about the death of TDD, but is it true ? Some argues that TDD is dead and who had used it in the
past nowadays is not using anymore. Frequently I tried to follow all the rules of TDD when I'm coding but I have to
confess, it is not easy. Though I do write unit test (and functional as well), sometimes without following the gold
circle ([Write the test first see it failing and then make it pass]({{ site.baseurl }}{% post_url 2015-04-19-not-using-tdd-part-1 %})).

## How about the frameworks?

The first thing I'd like to understand is why frameworks are worried about testing ? Let's see Laravel, a very popular
framework for web artisan what they say about testing

_"Laravel is built with testing in mind. In fact, support for testing with PHPUnit is included out of the box"_
(Laravel's website)

While I'm writing this post the latest version of Laravel is the 5.2 and as we can see Laravel has many facilities to
use TDD. Find more information in the offical website
[https://laravel.com/docs/5.2/testing](https://laravel.com/docs/5.2/testing){:target="_blank"}.

The next chose one is Zend Framework 2.

_"A solid unit test suite is essential for ongoing development in large projects, especially those with many people
involved. Going back and manually testing every individual component of an application after every change is
impractical. Your unit tests will help alleviate that by automatically testing your application’s components and
alerting you when something is not working the same way it was when you wrote your tests."_ (ZF 2 official website)

You can also see more details in the ZF 2 website in
[http://framework.zend.com/manual/current/en/tutorials/unittesting.html](http://framework.zend.com/manual/current/en/tutorials/unittesting.html){:target="_blank"}.
By now we have two great frameworks who have a huge preoccupation in TDD and testing, now I ask to you: Is TDD dead ?

Are you not convinced yet ?

Symfony's documentation goes further saying we must write unit tests and functional test to better quality of code

_"Whenever you write a new line of code, you also potentially add new bugs. To build better and more reliable
applications, you should test your code using both functional and unit tests."_
(http://symfony.com/doc/current/book/testing.html)

## The key point

The nature of any test is to guarantee that something still working after a change, or even better when we are driven by
tests where it can improve how we build things. Also we can point out the flexibility it brings to when we need to test
the entire application, imagine you have an application with twenty modules and 200 or even more functionalities, after
a change how can you guarantee that you haven't broken anything ? Of course you could test every piece manually, but
think again, how long it will take ?

Its true also that TDD philosophy says we must to write the test FIRST, which means we should write the test and then
the source code. Sometimes we don't know how the things could fit together and how can we start by the test ? I'm not a
TDD nazi but sometimes and in some cases we can brake the rule and write the source code first and then give it a
coverage using tests. Choosing this path we can lose some goodness of TDD but it is your choice.

## Going further

Martin Fowler, Kent Beck and David Heinemer shared they knowledge about this topic and you can find it
[here](http://martinfowler.com/articles/is-tdd-dead){:target="_blank"}
I do recommend to listen to it is a rich material and if you want more you can
find the video on youtube as well.