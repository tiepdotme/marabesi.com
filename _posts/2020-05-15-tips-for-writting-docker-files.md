---
layout: post
title: Tips for writting docker files
date: 2020-05-15 01:06:05.000000000 -03:00
image: 
type: article
published: true
status: published
categories:
- devops
tags:
- docker,
- Docker,
- image,
- user,
- build,
- root,
- network,
- setup,
- compose,
- container,
- program
---

Docker has revolutionized how developers build and deploy applications.
Docker has support for differen programming languages and runs natively on linux,
as opposed to virtual machines that mimics an entired operational system,
docker containers run on linux namespaces, removing the overread
that virtual machines have, for example, the boot time. The virtual machine
needs time to boot, while docker is a service that starts in the operational
system.

As opposed to the official best practices {% cite best_practices_docker_hub --file 2020-05-15-tips-for-writting-docker-files %} on writting docker files,
the goal here is to share tips on approaches in how to write the docker files.

## 1. Make the basic setup with standard image

Starting to build docker images requires steps and previous knowledge on the
docker platform and ad least to understand a few commands such as RUN, COPY and
FROM. Based on those commands, the generated image can be big or small, it depends.

Docker hub offers ready to use images without the need to build one, and they are
classified as (from the biggest to the smallest): standard image, slim and alphine.

Usually the setup using the basic image is faster as it comes with almos everything
to run the program. on the other side though, the alphine version has almos
nothing to run the program, it has just the core, nothing else. Which in many 
cases will make the program to not run, depending on the dependencies.

## 2. The root user

The root user is the default user in which the container runs, which makes
easier the process to set up permissions to access files or to setup configurations.
Usually this is a bad practice to, the container should not run with the root
user due security issues {% cite best_practices_nodejs_dockercon --file 2020-05-15-tips-for-writting-docker-files %}.

Though for the process to set up the docker image this can be a bit harder,
given the fact that setting up a different user with less permission can
difficult the image setup.

This tip relies on the same approach as the previous one, first, make it work
with the root user, then start to trick around permissions with a specific user.

## 3. Separate conserns, avoid building different services into one image

As a best practice the recommended way to build containers is, once container equals
to one process. Which can avoid problems when it comes to managing them.

## 4. setup docker file first, and then move to docker compose (if needed)

Usually, docker compose is the next step when building services to use with docker,
though developers tend to skip the first step which is to understand how the
image works and then move on to compose.

## 5. Networking and sharing hosts

Docker creates its own network interface, which in turn containers communicate
between each other. Therefore, there are scenerios in which this behavior
is not desired. For example, a database. As the database holds state (the data)
usually it is used an external provider (RDS, mongodb atlas etc).

By default the container can't access external ports, which in turn will
block the databse connection. There are two posible options for that, using
a `network` flag or using the `add-host` flag.

There is a side effect using the network flag, which will ignore the docker
network created automatically by docker and the container will run as if
it were in the host. Impacting the port that the application run and therefore
prevents the possibility of blue-green
deployments {% cite docker_blue_green_no_down_time --file 2020-05-15-tips-for-writting-docker-files %},
which requires two intances of the same app running, each on its specific port.

## 6. Different docker compose files for different evnrionments 

Docker compose files are used to compose the container orchestration, therefore
sometimes it is needed to use different behavior based on the environment
that the application is one. For example, in development mode, the database
container might be needed, but in production it might not be the case.

For that, it is possible to create different docker compose files for each
environment. For example, for development, staging and production we might have:

- development: `docker-compose-dev.yml`
- staging and production: `docker-compose-deploy.yml`

It is also posible to share code among each docker file, which might make
sense to create a `docker-compose.yml` as the base for the two files previously
mentioned.

## References

{% bibliography --cited_in_order --file 2020-05-15-tips-for-writting-docker-files %}