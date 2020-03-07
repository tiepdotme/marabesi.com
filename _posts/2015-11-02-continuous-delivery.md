---
layout: post
title: Continuous Delivery
date: 2015-11-02 22:55:27.000000000 -02:00
image: /images/posts/2015-11-02-continuous-delivery/cover.png
type: article
published: true
status: publish
categories:
- Books review
tags:
- book,
- build,
- CI,
- commit,
- Continuous,
- Delivery,
- Chapter,
- martin fowler,
- pipeline,
- review,
- strategy,
- test,
- stage,
- software,
- martin fowler,
- Humble J. and Farley D.,
- jenkins,
- travis,
- deployment,
- deploy,
- version,
- integration,
- production,
- control
---

As we know the software nowadays exists to support the business rules and I
believe that it is  a huge problem to programmers as well as everyone
involved with software development. Basically as the business grow, the software
might change as well but change isn't the problem, it is the frequency. 

How can we deal with requirements today that change tomorrow? How can we
guarantee our software quality? And the most important how can we delivery
value?

Value is something that the business just has after a software has been deployed
in production. Often release to production is something to worry about.

Software delivers no revenue until it is in the hands of its users.
This is obvious, but in most organizations the release of software into
production is a manually intensive, error-prone,
and risky process **[1, p. xxxiv]**.

## Foundations

Continuous Delivery is more than a tool, it is a practice, a process.
You can't just say, today I'm going to start to use Continuous Delivery.
It takes time and a lot of work to get here. Continuous delivery is the ability
to continuously integrate with production code, which means you must deploy
often. Continuous Delivery is about having a releasable version in any
version.

Every change is, in effect, a release candidate. Every time a change
is committed to version control, the expectation is that it will pass all of
its tests, produce working code, and can be released into
production **[1, p. 24]**.

## Configuration Management

The start point is Configuration Management. It will enable us to manage all
configuration needed to an application. Nowadays is really common to have
version control in projects, but I'm sure that a team in somewhere is not using
it. To use Continuous Delivery is mandatory to have a version control such as
git or svn.

Every single artifact related to the creation of your software should be under
version control **[1, p. 33]**.

It is about managing dependencies, it is almost impossible to write a software
without dependencies. Usually we do use dependencies when we are developing
something that is no the core business of the application.

To display a PDF, to connect to the bank, to login with user's social media
account and so on. Configuration is the key for any software, usually when
developing developers use their environment, Q&amp;A people uses other even in
production environment could be different, it means we must have a good
management in configuration because sooner or later problems will show in
configurations and Continuous Delivery give to exactly proceed.

## Continuous Integration

Continuous integration is an interesting topic because often people confuse
Continuous integration **[2]** with Continuous Delivery. It is true that in order to do
Continuous Delivery we have to have to use continuous integration.

Basically to create a simple continuous integration flow there are few steps to
do. The first step is check-in regularly to you control version, suit test, keep
fast the feedback from CI(Continuous Integration) server, Jenkins **[3]** and
Travis CI **[4]** for example.

To implement continuous integration is to create a paradigm shift in your
team. Without CI, your application is broken until you prove otherwise. With
CI, the default state of your application is working, albeit with a level of
confidence that depends upon the extent of your automated test coverage.
CI creates a tight feedback loop which allows you to find problems as soon as
they are introduced, when they are cheap to fix **[1, p. 82]**.

## Implementing a test strategy

One of the very first steps os Continuous Delivery is testing. To have a good
suite test in which you can easily trust to run and believe that if a green bar
shows up everything is fine, is essential.

Testing is a cross-functional activity that involves the whole team, and should
be done continuously from the beginning of the project **[1, p. 84]**.

We can have different types of tests and different purposes the figure below
show us how to understand it and what are each type of tests and when we apply
them.

[![Testing quadrant]({{ site.baseurl }}/images/posts/2015-11-02-continuous-delivery/unit-test.png)]({{ site.baseurl }}/images/posts/2015-11-02-continuous-delivery/unit-test.png){:target="_blank"}

## The deployment pipeline

If you aren't familiar with CI you don't know what a deployment pipeline
is, we use deployment pipeline to build a flow where we can deploy the source
code into production, the pipeline has steps where each one of it has a simple
purpose, for example unit test, also the steps used in the pipeline usually
were made manually in the past.

At an abstract level, a deployment pipeline is an automated manifestation of
your process for getting software from version control into the hands of your
users. Every change to your software goes through a complex process on its
way to being released **[1, p. 107]**.

To build a pipeline depends in which project you're working on.
The best pipeline for you project could be the worse from mine.
What brings us to a really unique way to develop pipelines, but of
course following some rules and best practices.

## Build and Deployment Scripting

So far we realized we need create a new culture, test things and also automate
our deploy flow, and to achieve that we need to use a build tool.

As soon as the project extends beyond a single person, spans more than a few
days, or produces more than a single executable file as its output, it demands
more control if it is not to become complex and
unwieldy **[1, p. 143]**.

In Java world we have Ant and in PHP we have Phing, both are build tools and
have a lot of features. Those build tools help us when or application
gets to complicated to deploy or is taking several  steps, as a consequence we
reduce errors and increase our productivity.

## The commit stage

Welcome to the one of most important stage in your new pipeline,
the commit stage.

The commit stage represents, in more ways than one, the entrance into the
deployment pipeline. Not only is it the point at which a new release candidate
is created; it is also where many teams start when they begin to implement a
deployment pipeline **[1, p. 169]**.

Definitely if you're going to implement CI the commit stage is the most
important step. Usually, developers send to the repository incomplete features
and some bugs as well, what makes this stage a dangerous stage. When deploying
with continuous integration we must have in mind that each commit can be
delivered to the production.

## Book content

Continuous Delivery from Jez Humble and David Farley tell was exactly how
to apply Continuous Delivery.

- Chapter 1: Foundations
- Chapter 2: Configuration Management
- Chapter 3: Continuous Integration
- Chapter 4: Implementing a test strategy
- Chapter 5: Anatomy of the Deployment Pipeline
- Chapter 6: Build and Deployment Scripting
- Chapter 7: The commit stage
- Chapter 8: Automated Acceptance Testing
- Chapter 9: Testing Nonfunctional Requirements
- Chapter 10: Deploying and Release Application
- Chapter 11: Managing Infrastructure and Environments
- Chapter 12: Managing Data
- Chapter 13: Managing Components and Dependencies
- Chapter 14: Advance version control
- Chapter 15: Managing Continuous Delivery

## Don't be regular programmer

Continuous Delivery is a process that take a while for start to work.
There are many steps to follow, many things to automate, pipeline to be
created, configuration management and commit stages to watch, just to name a
few. To achieve Continuous Delivery we must persist and don't give up.

## References

[1] Humble, J. and Farley, D., 2010. Continuous Delivery: Reliable Software Releases through Build. Test, and Deployment Automation. Addison-Wesley, pp.2013-01.

[2] Continuous Integration [Online]. Available: [http://www.martinfowler.com/articles/continuousIntegration.html](http://www.martinfowler.com/articles/continuousIntegration.html "Continuous Integration by Martin Fowler"){:target="_blank"}. [Accessed: 19 - Jan - 2020]

[3] Jenkins user documentation [Online]. Available: [https://jenkins.io/doc](https://jenkins.io/doc "Jenkins user documentation"){:target="_blank"}. [Accessed: 19 - Jan - 2020]

[4] Travis CI user documentation [Online]. Available: [https://docs.travis-ci.com](https://docs.travis-ci.com "Travis CI user documentation"){:target="_blank"}. [Accessed: 19 - Jan - 2020]