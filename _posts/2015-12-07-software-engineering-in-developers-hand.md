---
layout: post
title: Software engineering, in the developer's hand?
date: 2015-12-07 21:27:30.000000000 -02:00
image: /images/posts/2015-12-07-software-engineering-in-developers-hand/cover.jpeg
type: post
published: true
status: publish
categories:
- OOP
- Software Engineering
tags:
- engineering,
- graph,
- software,
- uml,
- use case
---

If you're a programmer, analyst or something related to I.T
(Information Technology) you probably already have heard about software
engineering. What is that? What can engineering do for software? Great part
of people who heard "engineering" thought about numbers, equations,
formulas and crazy people. Therefore software engineering is about practices,
techniques to build a great software with quality, security. maintainability
and so on.

**Software engineering** is the study and an application of **engineering** to
the design, development and maintenance of **software** **[1]**.

Software engineering is the study and an application of engineering to the
design, development and maintenance of software **[2]**.
Software engineering (SE) is concerned with developing and maintaining software
systems that behave reliably and efficiently, are affordable to develop and
maintain, and satisfy all the requirements that customers have defined for them.

Inside of Software engineering we have a couple of subjects Requirements
engineering **[3]**, software design, configuration management, tests,
deployment management, architecture to name a few.

Modeling also is a subject of software development and is where UML comes up **[4]**.
Since I started my software engineering degree I've been thinking in how we
can make the software development painless, I found two
amazing topics: Planing and Modeling.

## Use case diagram

Use case diagram is one of the UML diagrams used to help to understand
scenarios of the software, this diagram has a main purpose to expose the user
point of view.

[![]({{ site.baseurl }}/images/posts/2015-12-07-software-engineering-in-developers-hand/u11.png)]({{ site.baseurl }}/images/posts/2015-12-07-software-engineering-in-developers-hand/u11.png){:target="_blank"}

Above we can see the simplest use case possible. On left side we have an actor
that can represents a regular user or even another system and in the right side
we have the use case, in other words what the actor does.

Our first step to get into the software rules and in the mind of our
users (it is a good deal, isn't it?).

## It is not just about images

Going further with use case diagram we can document each of use case. Here I
present a standard document to use thus you can adapt it to satisfy your need.

|Use case name|Do something|
|--- |--- |
|Actor|Actor|
|Resume|An actor should do something when he is asked for|
|Pre-condition|The actor should be registered|
|Main-flow|Actor click on the button to do something System shows up a popup with the response, it is possible to go to alternateive-flow 1 if something goes wrong System close the popup and close the window|
|Alternative-flow|1) Display an error message|
|Post-condition|The actor should have done at least one thing|

The problem with this approch is time. Above we have a graph comparing between
creating a diagram before code and not create a diagram.

[![Planing chart]({{ site.baseurl }}/images/posts/2015-12-07-software-engineering-in-developers-hand/chart1.png)]({{ site.baseurl }}/images/posts/2015-12-07-software-engineering-in-developers-hand/chart1.png){:target="_blank"}

As we can see it takes longer but as you can imagine the quality grows.
Why should we start to draw or planing before do code?

- It improves quality
- It improves maintenance
- It makes easy to integrate a new member to the code base
- As the time goes its cheaper to maitain the source code

## Start to think then act

The conclusion here is don't wait for someone to do the right thing in your
project. Here we have a example in how to use a simple UML diagram to our
project and start to thing in software engineering and everything made by a
developer.

As a regular developer we always want to get our hands dirty but if you want
to step up in your career stop doing and start thinking. We have thousands of
sites who try to explain why software fails being successful

- [outsource2india](https://www.outsource2india.com/software/SoftwareProjectFailure.asp){:target="_blank"}
- [InfoQ](http://www.infoq.com/articles/software-failure-reasons){:target="_blank"}
- [Stackoverflow](http://stackoverflow.com/questions/528221/why-do-many-software-projects-fail-today){:target="_blank"}

The most commons are bad management, lack of knowlegde about the business,
stakeholders not interested, lack of time, pressure and so on. But let's have a
look at [Dr. Paul Dorsey paper](http://www.ksg.harvard.edu/m-rcbg/ethiopia/Publications/Top%2010%20Reasons%20Why%20Systems%20Projects%20Fail.pdf){:target="_blank"}
he has more to tells us about it.

If a bunch of electricians, plumbers, carpenters and contractors meet in a
field, talk for a few hours and then start building, the building will be
unstable if it even gets built at all. At one of my presentations, an audience
member shared the quip that “If building engineers built buildings with the same
care as software engineers build systems, the first woodpecker to come along
would be the end of civilization as we know it” (Dr. Paul Dorsey).

Indeed its true, in I.T industry as usual project managers or any member of
the management team think that is like a manufacturing to build software, just
like add one more on the team if the dead line is close and then make it on
time, unfortunatelly it is not. Another good point he gave to us is about
developers who just got interested in programming or related subjects.

## References

[1] [Webopedia](http://www.webopedia.com/TERM/S/software_engineer.html){:target="_blank"}

[2] [Wikipedia](https://en.wikipedia.org/wiki/Software_engineering){:target="_blank"}

[3] [Computing Degrees Careers](http://computingcareers.acm.org/?page_id=12){:target="_blank"}

[4] [UML](http://www.uml.org){:target="_blank"}