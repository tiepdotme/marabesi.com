---
layout: post
title: PHPUnit coverage on vagrant
image: /images/posts/2017-09-08-phpunit-coverage-on-vagrant/cover.jpg
date: 2017-09-08 01:06:05.000000000 -03:00
type: article
published: true
status: published
categories:
- php
tags:
- vagrant,
- laravel,
- environment,
- php,
- tip,
- PHPUnit,
- run,
- coverage,
- xdebug,
- PHP,
- extension,
- Homestead,
- composer,
- version
---

Vagrant is the official tool that Laravel supports in the development stage, 
which means that you can use vagrant and Homestead to create a simple and 
powerful environment.

[Homestead(a box to use with vagrant)](https://github.com/laravel/homestead){:target="_blank"} has
 been created to give everything that developers need to run Laravel. Web server, 
 PHP (including extensions), database, cache drivers and so on.

To run vagrant you must use a virtualization provider, such as virtualbox and
vmware.

# Installing PHPUnit

Homestead doesn't come with any specific PHPUnit version, which means that
you must download yourself the desired version. To keep this post as simple
as possible, we are going to consider that the PHPunit is not installed and we are going to use
composer to install it.

In an empty directory, create a `composer.json` file with the following content:

```json
{
    "name": "vendor/package",
    "description": "phpunit coverage with homestead",
    "require-dev": {
        "phpunit/phpunit": "4.8.*"
    }
}
```

After that, run `composer install`. The command will take some time, and
when it finishes you will have a  `vendor` folder inside the current directory.

# Running PHPUnit

Finally we can run PHPUnit. Normally we would run `phpunit tests/` but
as our focus here is to generate the coverage for the source code, we are
going to add an extra argument.

```
phpunit tests/ --coverage-html coverage
```

The tests will run normally, but a warning will show up. PHPUnit will complain
about the xdebug extension. The extension comes disabled because of performance.

```
PHPUnit 4.8.36 by Sebastian Bergmann and contributors.
Warning:        The Xdebug extension is not loaded
                No code coverage will be generated.



Time: 781 ms, Memory: 4.00MB
```

To fix that is simple, homestead comes with the extension already, we just 
need to activate it. The following command enables the xdebug extension
in the CLI mode:

```
sudo ln -s /etc/php/7.1/mods-available/xdebug.ini /etc/php/7.1/cli/conf.d/
```

Now, try to run PHPunit again, and the message should disappear. 

# A few considerations before we go

You may have noticed that the command in the previous section uses PHP 7.1,
which might not be true for you. As homestead supports various PHP versions
you must double check which is the one you want.

Of the most cases, you will change only the version in the command.

PHP 5.6
```
sudo ln -s /etc/php/5.6/mods-available/xdebug.ini /etc/php/5.6/cli/conf.d/
```

PHP 7.0
```
sudo ln -s /etc/php/7.0/mods-available/xdebug.ini /etc/php/7.0/cli/conf.d/
```

The thing to take home here is the `xdebug.ini` file. If you know where it is
just make a symbolic link to the CLI folder.