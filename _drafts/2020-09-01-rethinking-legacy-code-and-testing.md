---
layout: post
title: Rethinking legacy code and testing
date: 2020-09-01 01:06:05.000000000 -03:00
image: 
type: article
published: true
status: published
categories:
- testing
tags:
- testing,
---

Previously I discussed about legacy code and the strategies to test legacy
code bases {% cite strategy_to_test_legacy_code --file 2020-09-01-rethinking-legacy-code-and-testing %}.
In short the strategy is based
on a code base without any automated tests, the suggested approach is to follow
a strategy starting from an acceptance testing and gradually refactor the code
and get to the unit testing level. Ideally the code base would have several
acceptance tests and then, the refactoring will start replacing the acceptance
test suite with unit tests.

The proposed strategy, is based in a single real world project, which
may not fit all projects. Previously to that, I wrote an introduction to
TDD following the red-blue-green flow {% cite not_using_tdd_part_i --file 2020-09-01-rethinking-legacy-code-and-testing %}
and I also discussed about using TDD as a strategy to improve
the structure of legacy code {% cite not_using_tdd_part_ii --file 2020-09-01-rethinking-legacy-code-and-testing %}.
Though, those are rather technical and focused only on the fact that
the messy code was already there. This post is a reflection on my thinking
and experience since those posts.

## Companies and dead lines

Often, programmers are againt the clock to meet dead lines that usually
are not set by them, the dead line is given by management and there is no
negotiation. The pressure to write code and delivery on time
plays a important role in not allowing the programmer to think and expand
on important areas, such as security, testing and the maintainability of the
code. Everything is for yesterday, everything is late so we need to hurry
and delivery as fast as possible.

The SCRUM era tried to mitigate the time issue, with sprints. Which at some
extent helped teams to self organize and negotiate what will be delivered
in a specific time frame. Of course this is not silver bullet, which 
brings an old known friend, the estimation.

Even though the benefits from having a specific time frame and not anymore
the management imposing a deadline, programmers face the pressure to delivery,
due the lack of the "precise" estimation.

## Developers that don't know testing

<!-- often developers starting their careers are not awere of testing -->

## Management, often an issue

<!-- Even though management knows the down sides of legacy code, the more important
thing is to have something "done" -->

## References

{% bibliography --cited_in_order --file 2020-09-01-rethinking-legacy-code-and-testing %}
