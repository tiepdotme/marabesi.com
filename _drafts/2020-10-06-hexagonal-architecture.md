---
layout: post
title: Hexagonal architecture
date: 2020-10-06 01:06:05.000000000 -03:00
image: 
type: article
published: false
status: published
categories:
- review
tags:
- search,
---

## Motivation

1. The software can’t be tested with automated test suites because part of the logic needing to be tested is dependent on visual details.
2. it becomes impossible to shift from a human-driven use of the system to a batch-run system.
3. it becomes difficult or impossible to allow the program to be driven by another program when that becomes attractive.

## The solution

