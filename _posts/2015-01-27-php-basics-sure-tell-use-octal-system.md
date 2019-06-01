---
layout: post
title: PHP basics, are you sure? So tell me how to use octal system!
date: 2015-01-27 11:25:14.000000000 -02:00
image: /assets/2015-01-27-php-basics-sure-tell-use-octal-system/cover.png
type: post
published: true
status: publish
categories:
- php
tags:
- octal,
- php,
- php basics,
- zce,
- zcpe,
- certification,
- math
---

The program language PHP is a weak typing program language and with that comes
a few tricks. The first one is the octal format, can you guess how to write a
octal representation in PHP?

```php
<?php echo 01234;
```

## What the code above will output?

For our surprise the code will output **668**! It is because in PHP the octal
format is represented adding in the beginning of the string a simple 0 (zero).
Doing that the PHP will convert the given string in this case
**1234** to **668** decimal. You can find further information about that in the
PHP documentation **[1]**.

## Octal system

The octal system works with 8 numbers starting from 0 and ending with 7
{ 0, 1, 2, 3, 4, 5, 6, 7 }.

## Converting

Converting to decimal format is really simple, let's have a look in the same
example **1234<sub>8</sub>**.

1×8³ + 2×8² + 3×8¹ + 4×8⁰ = 668<sub>10</sub>

The first thing first, so if you have look in the expression above is simple to
deduce that we are splitting the numbers and then applying times 8.
So the right question is why are we using ³, ², ¹ and ⁰?
It comes from { 0, 1, 2, 3, 4, 5, 6, 7 }, do you remember that? So for each
number in the expression you'll use these numbers **from right to left**.

1×8**³** + 2×8**²** + 3×8**¹** + 4×8**⁰** = 668<sub>10</sub>

## Breaking down into peaces and then stick together again

1×8³ = 512
2×8² = 128
3×8¹ = 24
4×8⁰ = 4
512 + 128 + 24 + 4 = **668<sub>10</sub>**

## References

[1] [PHP documentation - Language types](http://php.net/manual/en/language.types.integer.php){:target="_blank"}