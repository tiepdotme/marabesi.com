---
layout: post
title: ZCPE 5.5 here we go - PHP Basics (Variable variables)
date: 2015-07-28 20:44:09.000000000 -03:00
image: /images/posts/2015-07-28-zcpe-5-5-here-we-go-php-basics-variable-variables/cover.jpg
type: article
published: true
status: publish
categories:
- php
- ZCPE
tags:
- certification,
- certified,
- php,
- php5.5,
- variable variables,
- zcpe,
- zce,
- zend,
- certification
---

PHP Basics is the first topic of ZCPE where is covered many topics and one of
them is variable variables.

Variable variables in PHP is useful but must be used with careful. In this post
I'll try to explain to you how to use the simplest form of variable variables.

When you start to learn PHP often you are told that a variable start with an
dollar sign ($) and it must be followed by and underscore (_) or an character
and not an numeric value. With that information is clear to know which below
is not a valid PHP variable, right?

1. `$_abc`
2. `$_1`
3. `$1_`
4. `$$a`

## Variable variables

I guess you have noticed a weird notation in the given example as I did when
I first see that. The option 4 has a strange notation with two dollars sign in
the name of the variable, is that possible? is it a normal notation in PHP?
When should I use this? Yes! We can do that in PHP but we should take care
when use it.

The easiest way to understand is giving you an simple example, probably you'll
read this twice before completely get that but it is normal and I'd recommend
you play around with variable variables as well.

```php
<?php
$hello = 'world';

$a = 'hello';

print $$a;
```

PHP will try to interpreter what we have inside $a as a variable, so when we use
$$a PHP expects that we have an variable with the same name of the content inside
$a, in this case 'hello', otherwise PHP will throw a notice (Undefined variable).

```php
<?php
$hello = 'world';
```

Nothing new just a normal variable in PHP within a string.

```php
<?php
$a = 'hello';
```

Now we can pay attention to the variable $a that has the string
hello which is the same name of our variable $hello with world
inside. In the next step PHP will expects an existing variable called $hello.

```php
<?php
print $$a;
```

Here is where the magic happens $$a in this context means $hello because PHP
will interpreter the content of $a as a variable in this case hello. $hello has
a string world inside resulting in the output world.

## is it a mistake?

Without any knowledge of variable variables in PHP you could think that the guy
how left the the code made a mistake or just typed twice the dollar sign. To
be more specific with that kind of code PHP allows us to use curly braces with
that.

```php
<?php
print ${$a};
```

Using curly braces the result is the same and you re-force that you want to use
variable variables and also turns it more readable to the guy who is going to
maintain your code.
