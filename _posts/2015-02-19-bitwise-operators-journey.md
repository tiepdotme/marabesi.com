---
layout: post
title: Bitwise operators - The Journey
date: 2015-02-19 10:04:16.000000000 -02:00
image: /images/posts/2015-02-19-bitwise-operators-journey/cover.png
type: post
published: true
status: publish
categories:
- php
tags:
- operator,
- Operator,
- table,
- Result,
- Bits,
- operators,
- and,
- bitwise,
- or,
- php,
- web,
- xor,
- certification
---

If you are trying to search about bitwise operators on web you will find loads
of information, although, when I was learning about bitwise none of those in
the web could clarify my mind. But finally I have got a way to me is easier
and faster to understand bitwise, I hope it will help you either.

## The bitwise table

|--- |--- |--- |--- |--- |--- |--- |--- |
|128|64|32|16|8|4|2|1|

The table above represents the chain of bit that we have. This table will be
our guide through the bitwise word, before we continue just have look at the
table and see if we sum up all the values we will have **255** -
Which means it is the highest value of a bit. 

Nevertheless to achieve 255 all the bits on the table must be **true** ( 1 )

|--- |--- |--- |--- |--- |--- |--- |--- |--- |
|128|64|32|16|8|4|2|1|**Result**|
|1|1|1|1|1|1|1|1|**255**|

A few more examples:

|--- |--- |--- |--- |--- |--- |--- |--- |--- |
|128|64|32|16|8|4|2|1|**Result**|
|0|0|0|0|1|0|1|0|**10**|
|0|0|0|0|0|1|0|1|**5**|

Is it easier with the table? What we did is really simple we caught a random
number between 0 and 255 and applied to the table to see its representation
in binary. Now we know 5 in binary is **101** and 10 is **1010**.

## The & (AND) operator

Here our table become a amazing tool to use. The operator & by definition says:
"Bits that are set in both $a and $b are set." ([source](http://php.net/manual/en/language.operators.bitwise.php){:target="_blank"}).
With that definition what will be the result of  the following expression:

```php
<?php
echo (5 & 3);
```

Let's start with the table where now we have on the leftmost the bitwise
operator and in the rightmost the result.

|--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
|**Operator**|128|64|32|16|8|4|2|1|**Result**|
|&|0|0|0|0|0|1|0|1|5|
|&|0|0|0|0|0|0|1|1|3|

Using the operator AND the result of our operation (5 & 3) results in 1

## The | (OR) operator

To use the OR operator we will take the same example we used in the AND
operator to understand the difference. By definition we have:
"Bits that are set in either $a or $b are set."

```php
<?php
echo (5 | 3);
```

Applying the documentation definition in the bitwise table, should look something
like:

|--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
|**Operator**|128|64|32|16|8|4|2|1|**Result**|
|||0|0|0|0|0|1|0|1|5|
|||0|0|0|0|0|0|1|1|3|

This time the result is 7

## The ^ (XOR) operator

Finally we are in the XOR operator. It is close of OR operator but with a big
difference, let's see what the definition says: "Bits that are set in $a or $b
but not both are set."

```php
<?php
echo (5 ^ 3);
```

Can you guess what is the output of the operation (5 ^ 3)?

|--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
|**Operator**|128|64|32|16|8|4|2|1|**Result**|
|||0|0|0|0|0|1|0|1|5|
|||0|0|0|0|0|0|1|1|3|

Yes, that is right! It is 6.
