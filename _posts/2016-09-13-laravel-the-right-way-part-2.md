---
layout: post
title: Laravel the right way (PART 2) - 10 Laravel meetup
date: 2016-09-13 01:06:05.000000000 -03:00
image: /assets/2016-09-13-laravel-the-right-way-part-2/cover.svg
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
author:
login: matheusmarabesi
email: matheus.marabesi@gmail.com
display_name: Matheus Marabesi
first_name: Matheus
last_name: Marabesi
---

## Modules

Modules are always required by many applications and its not different in PHP, but again, to take this decision
there are things to think about. The first is the size of your application, if you have a small app there is no need
for modules since it will increase the amount of code and will bring no advantage. The second thing is how you' like
to organize your app, modules give us the ability to isolate responsibilities and instead of talking with classes only
we could do the communication between modules.

Unfortunately Laravel doesn't comes with a modular system, which gave to the community the power to create many packages
to get this job done.

In general all of the modules package built to work with Laravel have the following structure:

```
app/
bootstrap/
vendor/
Modules/
  ├── Blog/
      ├── Assets/
      ├── Config/
      ├── Console/
      ├── Database/
          ├── Migrations/
          ├── Seeders/
      ├── Entities/
      ├── Http/
          ├── Controllers/
          ├── Middleware/
          ├── Requests/
          ├── routes.php
      ├── Providers/
          ├── BlogServiceProvider.php
      ├── Resources/
          ├── lang/
          ├── views/
      ├── Repositories/
      ├── Tests/
      ├── composer.json
      ├── module.json
      ├── start.php
```

The example above was taken from [nWidart/laravel-modules](https://github.com/nWidart/laravel-modules){:target="_blank"}. I believe that
it is the most used packaged in the Laravel community, and the important part here is to notice that with it we have
one mini-laravel inside the **Modules** folder.

The folder **Modules** is where all modules in your application will leave, and the name **Modules** is configurable, which
means that if you don't like it you can change to the name you want to.

## Custom modules

In case you don't want to use any solution provided by the community there is the option to implement your own modular
system using the service provider that Laravel has, and for that, we have a couple of examples  distributed in the web:

- [kamranahmed.info](http://kamranahmed.info/blog/2015/12/03/creating-a-modular-application-in-laravel){:target="_blank"}
- [ziyahanalbeniz](https://ziyahanalbeniz.blogspot.com.br/2015/03/modular-structure-in-laravel-5.html){:target="_blank"}

I would't recommend this approach for two reasons, the first is the lack of support that you will get and the second
is the extra work to maintain the modular system. Besides that the good part is that you have the power to decide
which struture to use or what should your folders be called (far way more customizable).

## Conclusion

In general all enterprise applications should use a modular system. It gives all the good parts described here and
also the ability to split your team to focus on a specific module.

Although the decision to use or not a modular system must be taken in the beginning of the project, otherwise will
be a huge change to implement it once code is running in production(will be big bug not impossible).
