---
layout: post
title: ARE YOU NOT USING TDD ?! - PART 1
date: 2015-04-19 20:47:38.000000000 -03:00
image: /assets/2015-04-19-not-using-tdd-part-1/cover.png
type: post
published: true
status: publish
categories:
- TDD
tags:
- blue,
- green,
- red,
- solid,
- tdd,
- software engineering,
- methods,
- test driven development,
- methodology,
- patterns,
- bugs
---

I've been working with TDD for while and everyday I see developers creating
excuses to do not start with TDD, and I ask myself why they do that?
Is there any reason for ? Maybe the procrastination and the fear of new
challenges comes to mind.

TDD has basically a life-cycle to be follow and and here I'll try to show how
to getting started with.

Here is a couple of slides of my presentation
"Introduction to TDD (PHPunit examples)". It may help you to understand the
TDD world combined with this post content, so I hope you enjoy the post and
please if you have any questions, feedback let me know.

<iframe width="100%" height="500" style="border: 1px solid #CCC; border-width: 1px; margin-bottom: 5px; max-width: 100%;" src="//www.slideshare.net/slideshow/embed_code/key/N0I7DDe0jBl069" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" allowfullscreen="allowfullscreen"></iframe>

## RED

The first step is the RED and the most common I guess, the color red in TDD
represents the failure. I have had a lot of bug found in my code before I adopt
TDD because I used to think that piece of code works but, I forgot to test what
I've done with different inputs, different scenarios and so on.

The red stage as we go through will show us many scenarios and many cases
where our code will have a little bug.

Is in red stage as well where we do not write our source code first and indeed
we will write or test first. The benefits of doing this is awesome and we
can enumerate a couple of them:

1. Improvement of our source code design
2. prevent the high complexity
3. Getting confidence with our source code

## GREEN

The green color is a perfect clue to the red after we created our test and
see its failing now its time to pass it and make it green!

The rule here is do not make a complex algorithm instead we will make it pass
as easy as possible and by that I mean with hard code. It seems weird at first
but everything will make sense in the blue stage of TDD where we will do some
code refactoring.

The goal of GREEN stage is to make the test pass and do not the best way of
solve your problem or to create a amazing snippet instead we are trying to
achieve the simplest solution to see our desired green (our test passing).

## BLUE

Finally we have got our BLUE stage known as refactor stage as well.
Now we already have a test passing and we know what we have to have to
solve our problem right ? Let's recap what we've done so far:

1. We created a test and saw it fail
2. We fixed the code to make it pass with hard code

Nowadays programming hard code is not a good practice and worse it will not
solve your problem correctly so now is the perfect time to refactor the hard
code and think in the best way of solving your problem, but of course without
breaking your test.

The test passing is our safeness to refactor and improve our source code without
side-effects. And here we reach in a great benefit of TDD,
**refactoring without fear**. Before TDD I used to change some legacy code to
fix a bug or to improve the code but in a few weeks forward after my change in
the code I had a new bug to fix caused by my own change.

## WRAPPING UP!

This is the first post of a series about TDD. I presented to you the life
cycle of TDD and how to understand each stage of it (red, green and blue).

To get deep into the TDD work I'd recommend the book
[TDD by example by Kent Beck]({{ site.baseurl }}{% post_url 2015-01-26-tdd-by-example %})
(examples in Python and Java), a quick read in
[SOLID principles](http://code.tutsplus.com/series/the-solid-principles--cms-634){:target="_blank"}
and finally try to find some material of TDD in a programming language you are
familiar and do not give up!