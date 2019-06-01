---
layout: post
title: Bitwise operators – The Journey Part II
date: 2015-02-24 01:27:27.000000000 -03:00
image: /assets/2015-02-24-bitwise-operators-journey-part-ii/cover.png
type: post
published: true
status: publish
categories:
- php
tags:
- bitwise,
- php,
- web,
- zce,
- zcpe,
- certification
---
If you didn't see the first part of this post click 
[here]({% post_url 2015-02-19-bitwise-operators-journey %}) and enjoy!

## The << (Shift left) operator

Do you remember of our bitwise table in part I? We are not going to need it
anymore. What we are going to do here is simple math, so let's start with the
left shift operator that uses multiplication ( * ). 

The full definition from php is : "Shift the bits of $a $b steps to the left
(each step means "multiply by two")" The formula is:
bit leftmost *  2 ^ bit rightmost

```php
<?php
echo ( 7 << 9 );
```

bit leftmost = 7;

bit rightmost = 9;

7 * 2 ^ 9 =? (2 * 2 * 2 * 2 * 2 * 2 * 2 * 2 * 2)
2 ^ 9 = 512
7 * 512 =3584

## The >> (Shift right) operator

"Shift the bits of $a $b steps to the right (each step means "divide by two")".
Even easy, isn't it? Let's try an example!

```php
<?php
echo ( 4 >> 6 );
```

Can you guess what will be the output?

Our formula this time will by : bit leftmost / 2 ^ bit rightmost

bit leftmost = 4;

bit rightmost = 6;

4 / 2 ^ 6 =? (2 * 2 * 2 * 2 * 2 * 2)
2 ^ 6 = 64
4 / 64 = 0

## The ~ (Not) operator

Finally we have got the last operator and of course the easiest one.
To achieve the NOT operator we must follow the formula ~x = -x -1 (
To further information please [click here](http://php.net/manual/en/language.operators.bitwise.php#105821){:target="_blank"}).

```php
<?php
echo ~9;
```

What we have to do is simply apply the formula swifting the X by 9.

~x = ~9;
-x = -9;
-1 = -1;

**~9 = -9 -1 = - 10**
