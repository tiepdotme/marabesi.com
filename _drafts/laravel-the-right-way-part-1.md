---
layout: post
title: Laravel the right way (PART 1) - 10 Laravel meetup
date: 2016-09-13 01:06:05.000000000 -03:00
type: post
published: true
status: published
categories:
- php
tags:
- php,
- laravel,
- right way,
- models,
- framework,
- laracast,
- laranews
meta:
_edit_last: '1'
_login_radius_meta: '0'
_yoast_wpseo_primary_category: '47'
_yoast_wpseo_focuskw_text_input: stream
_yoast_wpseo_focuskw: stream
_yoast_wpseo_linkdex: '31'
author:
login: matheusmarabesi
email: matheus.marabesi@gmail.com
display_name: Matheus Marabesi
first_name: Matheus
last_name: Marabesi
---

Recently I've been to the <a href="http://www.meetup.com/pt-BR/Laravel-SP/events/233563455/" target="_blank">Laravel meetup</a> and I had the pleasure to talk about good pratices and common
 mistakes that newbies in Laravel do in the daily basis. We  had also Guilherme Guitte's
 talk who had spoken how elastic serach work.

## Laravel the right way

There are a few topics that I've been across over and over during my daily basis as a developer using Laravel.
This bothers me because some of them are so easy to understand to use that I decided to divide it in a few 
topics and try to guide the developers to a better Laravel usage. We will be through composer packages, directory 
structures and the Laravel docs to compose this topics, so let's dive in.

## Models

Laravel is a framework with that give to the developer a big responsability, it gives the ability to you to free chose the location
of your models. Laravel doesn't care if you want to place it in the root directory, divide it into sub directories or
just throw it away on the framework.
The freedom that we have is huge, and sometimes new developers doesn't know how to handle that (or if you're
a experienced developer you may not know what are the best place to store the files

![Models](/assets/laravel-the-right-way-part-1/models.png "Models")

So here I present what I've found useful in how to handle with the models and the solution is simple, store input
in a folder called <strong>Models</strong>.

To keep things even better you can also create sub directories inside the <strong>Models</strong> folder, as long as it makes
sense to do it.

## Models don't least forever, repositories for the rescue

This topic is totally apart from Laravel's framework base, which means that we are going to talk about
a package called l5-repository. This package is used into the Laravel's framework to be possible to use
the repository patter.

> It queries the data source for the data, maps the data from the data source to a business entity,
and persists changes in the business entity to the data source. A repository separates the business
logic from the interactions with the underlying data source or Web service.

As our application grows is normal to have a lot of files, a lot of classes and many assets to handle.
It is not different with our models, in the MVC pattern we use the models to store the business logic.

<!-- add here an example of business rule inside a model -->

There is nothing to fear when dealing with small applications, but if you have a application a little bit
bigger you are giong to start to have many methods inside a single file. Don't believe me ? Let's have a look
at a real application

<!-- add here an example of model with many methods -->

What's the problem with that? It seems perfect, right? The first problem here is the coupled access
to the data in the dabase, this is tighten into the models's method. The second problem is that
if we need to reuse the code in a other method, let's say only the where clause it would be impossible,
we sould have to write a new method.


