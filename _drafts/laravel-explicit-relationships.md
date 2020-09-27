---
layout: post
title: Laravel explicit relationships (Join)
date: 2017-08-29 01:06:05.000000000 -03:00
type: post
published: true
status: published
categories:
- php
tags:
- php,
- laravel,
- join,
- has many,
- has one
---

## Before start

This post will require knowledge in Laravel relationships, such as 
one-one, one-many and many-many. If you don't know anything about that
I'd recommend to go to [Laravel's documentation](https://laravel.com/docs/eloquent-relationships#defining-relationships).

## Warming up

To define a relationship with Laravel is easy, we just need two things. 
Two models defined and properly configured(by that I mean its properties), and
the database tables.

Let's refresh our minds defining a relationship one-one:

```php
```