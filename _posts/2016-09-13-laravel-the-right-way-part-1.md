---
layout: post
title: Laravel the right way (PART 1) - 10 Laravel meetup
date: 2016-09-13 01:06:05.000000000 -03:00
type: post
published: true
status: published
image: /images/posts/2016-09-13-laravel-the-right-way-part-1/cover.svg
categories:
- php
tags:
- Laravel,
- business,
- data,
- service,
- layer,
- right,
- different,
- application,
- php,
- laravel,
- right way,
- models,
- framework,
- laracast,
- laranews
---

Recently I've been to the <a href="http://www.meetup.com/pt-BR/Laravel-SP/events/233563455" target="_blank">Laravel meetup</a> and I had the pleasure to talk about good pratices and common
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

![Models](/images/posts/2016-09-13-laravel-the-right-way-part-1/models.png "Models")

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

![Business rules inside a model](/images/posts/2016-09-13-laravel-the-right-way-part-1/model-rules.png "Business rules inside a model")

There is nothing to fear when dealing with small applications, but if you have a application a little bit
bigger you are going to start to have many methods inside a single file. Don't believe me? Let's have a look
at a real application

![Too many methods](/images/posts/2016-09-13-laravel-the-right-way-part-1/methods.png "Too many methods")

What's the problem with that? It seems perfect, right? The first problem here is the coupled access
to the data in the database, this is tighten into the models's method. The second problem is that
if we need to reuse the code in a other method, let's say only the where clause it would be impossible.

Besides the persistence layer we have coupled a few business into our models as figure above show us. We have got at
least 8 methods and by their names we can see that there are rules behind it.

## Introducing services

My point of view in doing all of this is, ok, you have got the MVC pattern and can build your application really fine, but
there are a few gaps. The first is the project organization (should I always add the business rule inside a model? What if I have the
same rule but in a different kind? How would you use polymorphism?). The second is the size of the project, with
three main folders model-view-controller it will get too many files really quick and the last is the modularity
how would you use modules?

![regular MVC](/images/posts/2016-09-13-laravel-the-right-way-part-1/mvc.png "regular MVC")

For those reasons we could start using the service layer. The service layer is where all the business rules lives.

The basic approach is to build the services and the service is going to use the models, and the controllers will use
the service. This must by single direction, which means that services doesn't uses controller otherwise there is
no point to have a layer specific to it.

![MVC and service layer](/images/posts/2016-09-13-laravel-the-right-way-part-1/mvc-service-layer.png "MVC and service layer")

The good point of using a layer service is the flexibility that i gives to you, is possible to concentrate 
the business rules inside of this layer and consume them.

Imagine two different controllers one, needs to return JSON to the client and the other XML, in the regular MVC
you could have two different methods inside your model, call in each controller the methods needed and everything just 
works. But one of the problems is the testability and the S.O.L.I.D violation.


