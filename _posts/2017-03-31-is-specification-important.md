---
layout: post
title: Is specification important?
date: 2017-03-31 01:06:05.000000000 -03:00
type: post
published: true
status: published
categories:
- php
tags:
- specification,
- business,
- software
author:
login: matheusmarabesi
email: matheus.marabesi@gmail.com
display_name: Matheus Marabesi
first_name: Matheus
last_name: Marabesi
---

Recently during my daily work I started to think about software specifications. The development world
is living in the agile era and is even more aggressive with dead and quality.

There are two extreme scenarios which we can begin with, the first is a team where developers don't have documentation
at all. The second is the poor documentation, which means that developers usually have something to guide them
when coding, but a lot of questions appear during the development process.

The best scenario is obviously to have a great document with all the details needed and no change request from our customers.
Basically this is impossible to have. Requirements lead the necessity of the software, do your client understand that?
Programmers often hear "but it is simply, you can do it in 5 minutes".

> Understanding the requirements of a problem is among the most difficult
  tasks that face a software engineer.
  
<small>Software Engineering: A Practitioner's Approach - Pressman Roger S. Pressman p. 119, Chapter 5</small>
  
The client is used to his business rules and his needs, he deals with it everyday on the daily bases and probably 
teach others as well, software is made to solve common problems. It turns in a problem when the client doesn't understand it, and is
not hard to see documentations written like "this page is going to show the list of users". Step back for one minute,
 can you see anything wrong? I can imagine at least the following questions:
 
 1. what kind of users?
 2. what are the needed fields to show? 
 3. Should we paginate the result? If yes, how many users should we display by default, maybe 10? 20?
 
Programmers also have their debit on this, usually the normal approach is jump right in the code before fully understand
the problem.

> Designing and building computer software is challenging, creative, and just plain
  fun. In fact, building software is so compelling that many software developers want
  to jump right in before they have a clear understanding of what is needed.
  
<small>Software Engineering: A Practitioner's Approach - Pressman Roger S. Pressman p. 120, Chapter 5</small>

In the end all this process becomes a cycle without a end, wrong documentation leads to a wrong implementation
which makes customers unhappy.

## Thinking in long term

In the end the solution seems to be easy, isn't it? To fix the documentation problem we could add one more step before
implement the code. The flow would be to create the specification, read it, understand and remove possible gaps, and after that, 
start the coding.

This approach works fine when there is a time to implement and do everything as planned and you have the customer working with you. 
The downside is when the customer tries to workaround the flow, adding pressure to delivery what hasn't been documented and
the lack of technical understanding can lead to a pressure even worse.(In the end everything is fast and easy to implement, right?)

> Working software over comprehensive documentation

<small>Working software over comprehensive documentation - http://agilemanifesto.org/iso/en/manifesto.html</small>

Nowadays the agile term miss understood and miss spread by a lot of professionals on the market is avoiding the 
real needs behind building a real software.

Working software is always preferred than documentation, in the end we are programmers and love code, but the things 
start to be more complicated when we have the following items to deal with, which start to not bring any value
to the customer

* Working remotely
  - To work software over documentation the pre-requisite is to have the customer that you're working for 
    always available, otherwise there is no meaning start coding. How will you ask possible questions?

* client without technical knowledge
   - Following development without any flow, brings to the customer the wrong feeling that software is build
    as he wants to.

* Different languages
    - The documentation is the bridge between the customer and the real implementation is easier to
    change something in the earlier stages.

## In the end, the money is the ruler

I've seen the best professionals in the market get fired even when following the best practices, even more the startup
wave is bringing a new concept of software, where the fast and working is what matters.

All in all I believe is a matter of thinking carefully about each aspect when building software, from the documentation
to the final user.


