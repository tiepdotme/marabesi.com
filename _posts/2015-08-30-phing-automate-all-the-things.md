---
layout: post
title: Phing? Automate all the things!
image: /assets/2015-08-30-phing-automate-all-the-things/cover.gif
date: 2015-08-30 19:46:48.000000000 -03:00
type: post
published: true
status: publish
categories:
- php
tags:
- automate,
- gnu,
- phing,
- php,
- tasks,
- xml
---

Phing is a tool based on Apache ant to automate tasks. Sometimes we as
developers do repetitive tasks such as copy from a host to another, checkout
new branches even deploying to a new server, in this scenario Phing comes to
stage to help us to automate everything.

**PH**ing **I**s **N**ot **GN**U make; it's a PHP project build system or build tool based on Apache Ant. You can do anything with it that you could do with a traditional build system like GNU make, and its use of simple XML build files and extensible PHP "task" classes make it an easy-to-use and highly flexible build framework. Features include running PHPUnit and SimpleTest unit tests (including test result and coverage reports), file transformations (e.g. token replacement, XSLT transformation, Smarty template transformations), file system operations, interactive build support, SQL execution, CVS/SVN operations, tools for creating PEAR packages, documentation generation (DocBlox, PhpDocumentor) and much more ([phing.info](https://www.phing.info/docs/guide/stable/pr01.html).)
From official documentation, Phing is defined as:

Phing is a project build system based on Apache ant (See [ant](https://www.phing.info/docs/guide/stable/app.bibliography.html#ant)).

You can do anything with Phing that you could do with a traditional build system
like Gnu make (See [gnumake](https://www.phing.info/docs/guide/stable/app.bibliography.html#gnumake)), and Phing's use of simple XML build files and extensible PHP task classes make it an easy-to-use and highly flexible build framework. ([phing.info](https://www.phing.info/docs/guide/stable/ch.introduction.html))

## Why should I use Phing?

Developers are lazy, right? Better, good developers are lazy. We know that humans are more likely to make mistakes doing repetitive tasks even in computers. Usually in projects we have a process to do before to start to code. Checkout the repository, run unit tests, run integration tests, create coverage and finally start to code (this process was created with example purposes, you could have a process much bigger or smaller than that). It looks boring, isn't it? Maybe for just one project its fine to do manually those steps, but think about two, three or four projects. Shall we repeat every step in each project manually? What will happened if we forget to run unit tests and then start to code? How about the integration test?

Phing comes on stage to helps us to automate everything! With Phing is easy to automate boring tasks such as cloning a repository and run unit tests. Of course Phing is much stronger than that. Phing can integrate with a bunch of tools such as <a href="http://dbdeploy.com/" target="_blank">dbDeploy</a> and <a href="https://jenkins-ci.org/" target="_blank">Jenkins</a> to make our life easier.
Phing has a great documentation and a great folks involved on it, you can find more about it in in the official documentation <a href="https://www.phing.info/docs/guide/stable/index.html" target="_blank">here</a> or in the offical website <a href="https://www.phing.info/" target="_blank">here</a>. Also if you want to contribute they are open source and you can check the github repository <a href="https://github.com/phingofficial/phing" target="_blank">here</a>.

## Getting started

First of all, we must have Phing installed. Please go ahead and
check [here](https://www.phing.info/trac/wiki/Users/Installation)
to installation process through pear, composer or phar.

Phing uses XML to compose tasks. Every build.xml file must have an root node
called **project**, with an atributte called **default**(you have to fill
**default** with your default task you would like to run when Phing is activated,
you can see in the example below I use **dist**, it must be the same name of
one **target**) and at least one child node called **target**.

```php
<?xml version="1.0" encoding="utf-8"?>
<project name="Basic Task" default="dist">
  <target name="dist">
  </target>
</project>
```

Output :

```bash
Warning: target 'dist' has no tasks or dependencies

Basic Task > dist:


BUILD FINISHED

Total time: 0.1204 seconds
```

Actually our build.xml doesn't do anything but you can read Phing documentation
to find out core tasks and how to create your own as well.

## Running Phing, a little trick

Phing assumes by default a build.xml  to run. In other words if you don't
specify with -f what file you want to run, Phing will run build.xml
automatically.

```bash
phing                //will assume build.xml

phing -f myfile.xml  //will run myfile.xml
```

## Going further

I would like to recommend you dear reader, to have a quickly view
<a href="https://www.phing.info/docs/guide/stable/app.coretasks.html" target="_blank">here</a>,
in the core tasks. They are really important, because with core tasks
(**MkdirTask** to create directories, **DeleteTask** to remove directories,
**EchoTask** to show an message, **CopyTask** to copy files)you have many tasks
already in Phing, you just have to use it, and you don't have to re-create it.

Also looking further you will need optional tasks. Optional tasks are tasks
not related with the core of Phing but it can help you a lot. To name a few Phing
has optional task called **PhpLintTask** which provide a easy way to check
<a href="http://php.net" target="_blank">PHP</a> sintax through files (Phing has
an javascript version of this task called **JslLintTask**), **TarTask** to create
tarballs from files or directories, **ZipTask** to create .zip files from files
or directories and much more. Go ahead and check Phing
<a href="https://www.phing.info/docs/guide/stable/index.html" target="_blank">documentation</a>
for more information.

To understand what is the difference between core and optional tasks just keep
in mind the most essential task we do in our day, for example, creating folders,
giving user feedback, logging and so on those are essensial tasks that every
project must have and is not dependent of the used feature, and in Phing's world
are known as **Core Tasks**. Otherwise **Optional tasks** comes in a different
approach, lets say for instance I'm going to use phpunit to run my unit test
suit, but you can use behat or phpspec and those are your choice, and thats why
they are called Optional Tasks.
