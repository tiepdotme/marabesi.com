---
layout: post
title: GitHub badges! (PHP repository)
date: 2015-06-28 20:27:09.000000000 -03:00
type: article
published: true
status: publish
image: /images/posts/2015-06-28-github-badges-php-repository/cover.png
categories:
- php
tags:
- badges,
- build,
- CI,
- coveralls,
- downloads,
- git,
- github,
- license,
- packagist,
- php,
- poser,
- travis,
- travis CI
---

Disclaimer : If you don't know what are badges I'd suggest a quick view to
[https://poser.pugx.org](https://poser.pugx.org){:target="_blank"} which
is a open source project with badges for PHP projects. Also for this post I'm
assume you have a experience with GitHub already and know how to commit, push,
pull or use GitHub from web interface.

Repository used for this post you can find
[here](https://github.com/marabesi/gnrephp){:target="_blank"}. Badges that we're going to use:

- Build Status
- Coverage Status
- Total Downloads
- Latest Stable Version
- Latest Unstable Version
- License

## Final result

[![GitHub badges]({{ site.baseurl }}/images/posts/2015-06-28-github-badges-php-repository/badges2.png)]({{ site.baseurl }}/images/posts/2015-06-28-github-badges-php-repository/badges2.png){:target="_blank"}

## Travis CI

First step is go to
[https://travis-ci.org](https://travis-ci.org){:target="_blank"} and
click in Sign in with GitHub and Travis will ask you to sign with
your GitHub account. Fill the fields Username/Email and Password and click in
sign in (Don't forget to allow Travis in your GitHub account). Now we have to go
to our profile in Travis and enable which repository we're going to build.

[![Travis CI repository list]({{ site.baseurl }}/images/posts/2015-06-28-github-badges-php-repository/travis2.png)]({{ site.baseurl }}/images/posts/2015-06-28-github-badges-php-repository/travis2.png){:target="_blank"}

If you have any issue doing this follow the step in travis CI website!

## .travis.yml

We have to tell Travis which configuration we're going to use and to do that we
use a file called .travis.yml and push it to the root of the repository.

```yml
php:
  - 5.3
  - 5.4
  - 5.5
  - 5.6
  - hhvm

before_script:
  - composer install
```

## README.md

The last step to use the **Build Badge** is update the file README.md
in your GitHub repository.

[![Getting link to the badge]({{ site.baseurl }}/images/posts/2015-06-28-github-badges-php-repository/travis5.png)]({{ site.baseurl }}/images/posts/2015-06-28-github-badges-php-repository/travis5.png){:target="_blank"}

1. click on Build Passing in the left side of your repository name and a modal will appear.
2. Select which branch you're going to use
3. Select Markdown in the select box
4. Copy the text in the text area
5. Create a file in your repository called README.md (or just update it if exists) with the copied text in the step 4.

## Coveralls

To use coverage badge we're going to use
[https://coveralls.io](https://coveralls.io){:target="_blank"} and as we
did with Travis we have to allow coveralls in our GitHub account. Go to
[https://coveralls.io](https://coveralls.io){:target="_blank"} and click
in Free GitHub Sign-in. After a successful login click in add repos.

[![Adding repositories in coveralls.io]({{ site.baseurl }}/images/posts/2015-06-28-github-badges-php-repository/coverall.png)]({{ site.baseurl }}/images/posts/2015-06-28-github-badges-php-repository/coverall.png){:target="_blank"}

Just like Travis select which one you're going yo use.

[![Coveralls repository list]({{ site.baseurl }}/images/posts/2015-06-28-github-badges-php-repository/coveralls3.png)]({{ site.baseurl }}/images/posts/2015-06-28-github-badges-php-repository/coveralls3.png){:target="_blank"}

## .travis.yml

To use coveralls.io you must have a test suite. Here we're going to use phpunit
to execute our tests. We must update our .travis.yml file to execute our tests
and generate coverage in a XML format for coveralls.io.

```yml
language: php

php:
  - 5.3
  - 5.4
  - 5.5
  - 5.6
  - hhvm

before_script:
  - composer install

script:
  - mkdir -p build/logs 
  - phpunit --coverage-clover build/logs/clover.xml

after_script:
  - php vendor/bin/coveralls -v
```

As you can see we add some extra tasks to Travis, just update yours
.travis.yml and push it to the repository.

## .coveralls.yml

To get coveralls working correctly we should create a file called .coveralls.yml
with the following content:

```yml
src_dir: .
```

After that push it to your repository. Otherwise you'll get an
InvalidArgumentException from Travis build:

[![Coveralls error]({{ site.baseurl }}/images/posts/2015-06-28-github-badges-php-repository/error-co.png)]({{ site.baseurl }}/images/posts/2015-06-28-github-badges-php-repository/error-co.png){:target="_blank"}

## README.md

Now we have Travis working together with coveralls.io. We need just
to update our README.me with the badge.

[![Coveralls report]({{ site.baseurl }}/images/posts/2015-06-28-github-badges-php-repository/c-badge.png)]({{ site.baseurl }}/images/posts/2015-06-28-github-badges-php-repository/c-badge.png){:target="_blank"}

1. Go to https://coveralls.io/repos
2. Select your repository in the list
3. In the rightmost look at the bottom and find Readme Badge and click on it.
4. Wen the pop-up shows select the Markdown text
5. Update your README.md on GitHub with this text

## IMPORTANT

To follow the next section, your repository must be hosted at
[https://packagist.org](https://packagist.org){:target="_blank"} otherwise it
wont work.

## Total Downloads, Latest Stable Version, Latest Unstable Version, License

Now we have our two badges(Build with Travis and Code Coverage with Coveralls)
in our repository, but we have 4 badges to be done yet. The reason I left those
for last is simple: you can find them at
[https://poser.pugx.org](https://poser.pugx.org){:target="_blank"}.


1. Type your repository name in the text box
2. Select which you want to and select the Markdown text or click in Copy to clipboard
3. Update your README.md in your repository

[![Poser website]({{ site.baseurl }}/images/posts/2015-06-28-github-badges-php-repository/poser-c.png)]({{ site.baseurl }}/images/posts/2015-06-28-github-badges-php-repository/poser-c.png){:target="_blank"}

## References

InvalidArgumentException with Coveralls - [https://github.com/lemurheavy/coveralls-public/issues/45](https://github.com/lemurheavy/coveralls-public/issues/45){:target="_blank"}

Adding Build Badge with Travis - [http://stackoverflow.com/questions/19810386/showing-travis-build-status-in-github-repo](http://stackoverflow.com/questions/19810386/showing-travis-build-status-in-github-repo){:target="_blank"}
