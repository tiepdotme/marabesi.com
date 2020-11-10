---
layout: post
title: Lambda (AWS) - first impressions
date: 2020-07-07 01:06:05.000000000 -03:00
image: 
type: article
published: true
status: published
categories:
- web
tags:
- lambda,
- aws,
- web
---

Lambda has been a hot topic for a while, the proposal is hold in three main
subjects (but not limited to): pay for what you execute only, scalability and composition
(compose with different services such as, AWS s3, Kinesis, IoT etc).
Lambda has changed how users think about cloud computing, giving the end user
the power to chose and to pay for what is indeed executed.

Out of the box, AWS supports different programming languages such as: nodejs,
python, java, ruby, c#, go and powershell {% cite lambda_supported_programming_languages --file 2020-07-07-lambda-first-impressions %}.

## Use case, for export data

Usually the standard setup to export a data from a given database is to build an application
(it can be an API or a monolith) that receives the request from the user. The
request contains the metadata needed for exporting the data, for example, the
time range wanted, which data, and probably more meta information.

The request is made, once the application receives the request, it dispatches an
asynchronus job in the backend to process the data. The async task is important
for two reasons:

1. The data can take time to load/export, which in turn would make the user waiting for a long period of time.
2. Usually requests for servers have builtin timeouts to avoid time consuming requests.

So far we have been discussing the challenges to implement a simple export data feature.
Which can be accomplished by any modern language.

Let's give a concrete tech stack for our problem. We are going to export data using PHP, MySQL and rabbitMq.

Lambda comes in, once you need to scale up this export
feature for hundreds or thousands of users.


<!-- describe here when it can help with lambda -->

## Cons

<!-- vendor lock in -->

## References

{% bibliography --cited_in_order --file 2020-07-07-lambda-first-impressions %}
