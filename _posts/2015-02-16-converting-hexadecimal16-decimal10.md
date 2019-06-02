---
layout: post
title: Converting Hexadecimal(16) to Decimal(10)
date: 2015-02-16 23:51:27.000000000 -02:00
image: /images/posts/2015-02-16-converting-hexadecimal16-decimal10/cover.png
type: post
published: true
status: publish
categories:
- php
tags:
- development,
- hex,
- hexadecimal,
- octal,
- php,
- php basics,
- web,
- zce,
- zcpe,
- certification
---

The Hexadecimal system work in base 16 which  means that we have 15 (fifteen) numbers as shown bellow.

|HEX|Value|
|--- |--- |
|0|0|
|1|1|
|2|2|
|3|3|
|4|4|
|0|0|
|0|0|
|5|5|
|6|6|
|7|7|
|8|8|
|9|9|
|A|10|
|B|11|
|C|12|
|D|13|
|E|14|
|F|15|

## PHP and Hex

In the table above we have 16 numbers and its corresponding values, the highest
is 15 and the lowest is 0. Knowing this rule what will the code bellow will
output?

```php
<?php
echo 0xFF;
```

The right answer is **255**!
When I first saw this expression I thought, it will output 1515. No doubts!
If in the content table above the F represents 15 it is easy,
with two F it will concatenate.

Be careful with that! It is wrong thinking, the conversion is made as the
same way as octal conversion
([you can see the octal post conversion here]({% post_url 2015-01-27-php-basics-sure-tell-use-octal-system %})).

First of all we need to convert the letters F into numbers which are 15,
if it was the letter A would be 10 and so on, just look to the hexadecimal table.

> tip: I like to think that from A to F its just 10 to 15

Now that we have the value of F we can use this in the equation:

15×16¹ + 15×16° = 255<sub>10</sub>
15×16¹ = 240
15×16° = 15
240 + 15 =**<span style="text-decoration: underline;"> 255 !</span>**

Remember the sample that we use is  { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F }
