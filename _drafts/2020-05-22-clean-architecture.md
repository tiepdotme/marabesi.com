---
layout: post
title: Clean architecture
date: 2020-05-15 01:06:05.000000000 -03:00
image: 
type: article
published: false
status: published
categories:
- architecture
tags:
- docker,
---

Separation of consern, isolating pieces of code that repeats and decoupling
responsabilities from differents parts of the code base seems to be a
common approach among experienced developers. Therefore, through the experience
comes the opinionated approach, some developers might decide to create
specific directories or others might use longer file names to express intent.

I have published my own thoughts on that matter as well, and then I discovered
the clean architecture book {% cite clean_architecture_book --file 2020-05-22-clean-architecture %},
which dives much deeper on that subject and also explores the pros of
having a architecture in place and design.

### The hexagonal architecture

As I first started my path through the clean architecture I often found asking myself: is
hexagonal architecture {% cite hexagonal_architecutre --file 2020-05-22-clean-architecture %}
the same as clean architecutre? Not the same, but they have something in common
{% cite clean_architecture_article --file 2020-05-22-clean-architecture %}.

The clean architecture, shares decisions compared with the hexagonal architecture.
For example, 

### Clean architecture in a glance

Clean architecture focuses on the separation of concerns and also it takes
care of the evolution of the code, to no couple to any specific implementation.


### Implementaion details



## References

{% bibliography --cited_in_order --file 2020-05-22-clean-architecture %}


robert c martin blog post https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html

clean architecture hands dirty https://leanpub.com/get-your-hands-dirty-on-clean-architecture

student summary: http://courses.cecs.anu.edu.au/courses/CSPROJECTS/19S2/reports/u6052043_report.pdf
another student summary: http://courses.cecs.anu.edu.au/courses/CSPROJECTS/19S1/reports/u6022913_report.pdf

hexagonal architecture https://alistair.cockburn.us/hexagonal-architecture

12 factors to consider when chosing frameworks https://www.zend.com/blog/php-frameworks-top-12-factors-consider

https://www.youtube.com/watch?v=5OjqD-ow8GE GOTO 2018 - Modular Monoliths - Simon Brown