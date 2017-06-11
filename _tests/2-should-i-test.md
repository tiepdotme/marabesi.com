---
layout: post
title: 2. Should I test?
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

Software is all about getting the right requirements working through the source code, and accomplish the customer
necessity. Software is also about solving problems.

Usually software projects are divided in a few steps, the waterfall approach is to have the specification upfront,
implement the code, test it and delivery the final result to the client. Nowadays we follow the "agile" way, which
is focused on delivery value to the customer as soon as possible, dividing the flow in iteration between the team and 
the client.

Is true that software is powerful, Facebook for example connects billions of people around the world. Google has a amazing
search engine that we can use and find anything in seconds. Besides being software what else they have in common?
Both companies are improving their product(software) often, giving to the users new features and new possibilities. The only
truth is that software changes and always will.

Is not difficult to see teams in different stages, the design team is always the closer to the client and is where the 
changes start, while the development team is working in the version 1.0 the design team is focused on the 2.0.

## Guarantee

If changes are the only truth, how would you prevent the code to break when a change is done? Conventional programmers
write code that follows the happy path, which is the correct flow to be used. The exceptions are often found by a QA (quality assurance)
team.

Think about changing the programming language version, for instance PHP 5 to PHP 7, how can we guarantee that everything
is working correctly? Again in a scenario without tests the QA team is responsible for that, there is no way to give a 
satisfactory answer to that.




