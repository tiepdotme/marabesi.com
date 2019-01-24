---
layout: post
title: Errors compiling PHP from source on a Raspberry Pi
image: 
date: 2019-01-12 01:06:05.000000000 -03:00
image: https://cdn.sparkfun.com//assets/parts/1/1/4/1/8/13825-01.jpg
type: post
published: true
status: published
categories:
- IoT
- raspberrypi
- php
tags:
- web,
- php,
- source,
- php-src,
- raspberry pi,
- rasp,
- compiling,
- common erros,
- errors,
- sqlite3,
- bison,
- rec2c,
- libxml2-dev
author:
  display_name: Matheus Marabesi
---

The PHP version used is 7.2 directly from the git reository from github. Newer
version might not work as expected.

The version used to compile is the
[Raspbian](https://www.raspberrypi.org/downloads/raspbian) (Raspbian Stretch
with desktop and recommended software):

- Version: November 2018
- Release date: 2018-11-13
- Kernel version: 4.14

# Getting the source code

```
git clone https://github.com/php/php-src
```

Entering the cloned repository to start the compilation process

```
cd php-src
```

Chage to the version 7.2

```
git tag php-7.2.0
```

The following errors are sequential when trying to install PHP in a Raspberry Pi,
the errors show up in the following commands:

- ./buildconf
- ./configure

# Error (buildconf): autoconf out of date

Executed command: `./buildconf`.

```
buildconf: checking installation...
buildconf: autoconf not found.
           You need autoconf version 2.68 or newer installed
           to build PHP from Git.
build/build.mk:36: fallo en las instrucciones para el objetivo 'buildmk.stamp'
make: *** [buildmk.stamp] Error 1
```

### Solution

```
apt-get install autoconf
```


### Success output

```
buildconf: checking installation...
buildconf: autoconf version 2.69 (ok)
rebuilding aclocal.m4
rebuilding configure
rebuilding main/php_config.h.in
```


# Error (configure): bison out of date

Executed command `./configure`

```
configure: WARNING: This bison version is not supported for regeneration of the Zend/PHP parsers (found: none, min: 204, excluded: ).
```

### Solution

```
sudo apt-get install bison
```


# Error (configure): rec2c not installed 

Executed command: `./configure`

```
checking for re2c... no
configure: error: You will need re2c 0.13.4 or later to generate PHP lexers.
```

### Solution

```
sudo apt-get install re2c
```

# Error (configure): libxml2 dev dependecy not installed

Executed command: `./configure`

```
checking libxml2 install dir... no
checking for xml2-config path...
configure: error: libxml2 not found. Please check your libxml2 installation.
```

### Solution

```
sudo apt-get install libxml2-dev
```

# Error (configure): sqlite3 dev dependecy not installed

Executed command: `./configure`

```
checking for sqlite3 files in default path... not found
configure: error: Please reinstall the sqlite distribution from http://www.sqlite.org
```

### Solution

```
sudo apt-get install libsqlite3-dev
```

### Success output

```terminal
Generating files
configure: creating ./config.status
creating main/internal_functions.c
creating main/internal_functions_cli.c
+--------------------------------------------------------------------+
| License:                                                           |
| This software is subject to the PHP License, available in this     |
| distribution in the file LICENSE.  By continuing this installation |
| process, you are bound by the terms of this license agreement.     |
| If you do not agree with the terms of this license, you must abort |
| the installation process at this point.                            |
+--------------------------------------------------------------------+

Thank you for using PHP.

config.status: creating php7.spec
config.status: creating main/build-defs.h
config.status: creating scripts/phpize
config.status: creating scripts/man1/phpize.1
config.status: creating scripts/php-config
config.status: creating scripts/man1/php-config.1
config.status: creating sapi/cli/php.1
config.status: creating sapi/phpdbg/phpdbg.1
config.status: creating sapi/cgi/php-cgi.1
config.status: creating ext/phar/phar.1
config.status: creating ext/phar/phar.phar.1
config.status: creating main/php_config.h
config.status: executing default commands
```
