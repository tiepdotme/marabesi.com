---
layout: post
title: Intel Galileo and Debian
date: 2017-03-13 01:06:05.000000000 -03:00
image: /images/posts/2017-03-19-intel-galileo-and-debian/cover.jpg
type: post
published: true
status: published
categories:
- Post
tags:
- image,
- Debian,
- Intel,
- error,
- version,
- SSH,
- Yocto,
- distribution,
- Gen,
- node,
- interface,
- Linux,
- iot,
- Galileo,
- galileo,
- gen2,
- debian,
- yocto,
- linux
---

It's been a while since we have Intel Galileo board in the market as well as Intel Galileo Gen2, which is a version
with performance improvements.

Yocto is the official Linux distribution that Intel has chosen to create a full environment where makers can
build awesome IoT projects.

Unfortunately Yocto does not have a easy learning curve, most of the packes are not up to date and the software
repositories offer are restricted.

the community as developed other ways to get a Linux distribution running, such as Debian and Ubuntu. Both are used worldwide
and is easy to get started.

I struggled in finding the correct version to be used in the Galileo Gen2 and I fell that others will too, for this reason 
I'e written a post in how to use a Debian distribution with Intel Galileo Gen2.

## Getting the image

The first result when searching for the term ["galileo and debian" is a sourceforge link to download the image](https://sourceforge.net/p/galileodebian/wiki/Home){:target="_blank"}
and a few references to read about assembling the image and expand the SD Card size.

Grab the latest link from the image list, download the image called **galileo.img_v.1.0.0.7z**, in case of not found or any error
I've uploaded my own [image on google drive](https://drive.google.com/file/d/0B8eXZIvTLcpjdlNKRDdYVGVWRWs/view?usp=sharing){:target="_blank"}.

> Use the credential "user" and the password "user"

The next step will be to create a bootable SD Card within the Debian image, as Intel provide us a good tutorial to achieve this
 I'm not going to focus on installing the image. Visit this [link](https://software.intel.com/en-us/get-started-galileo-linux-step1){:target="_blank"} to instructions in how to setup the image.

## Issues found while using Debian on Intel Galileo

### Issue 1 (unsolved)

The first big issue was to get the SSH running since the error message "[   88.235310] sshd[2303]: segfault at b7118c7d ip b70f3539 sp bfd9ac90 error ffff0006 in libpthread-2.19.so[b70ed000+17000]" was shown
every time a SSH connection was made.

The first approach was to remove the openssh-server and reinstall it, but the error persists.

### Issue 2 (solved)

The ethernet interface is not up by default, each time that the system reboots the interface eth0 is down.

The easiest way to fix this issue was to execute the following commands in the shell(as root)

```bash
ifconfig eth0 up && dhclient eth0
```

To automate the initialization a script has been placed at **/etc/rc.local** with the same statements.

## EDIT: April 5 2017

I changed the approach, so now I' trying to have node red working on the intel Galileo. The first challenge is to update the node version to at least 4.*.

## EDIT: April 16 2017

As a final word, I gave up on Galileo Debian image, I decide to step back and try again the Yocto image. There are many issues
to work when using Debian such as the MRAA library, SSH and even the network some times doesn't work.

