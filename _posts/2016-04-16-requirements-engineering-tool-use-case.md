---
layout: post
title: Requirements Engineering - A tool for Use Case
date: 2016-04-16 20:13:33.000000000 -03:00
type: post
published: true
status: publish
image: /images/posts/2016-04-16-requirements-engineering-tool-use-case/cover.jpg
categories:
- Software Engineering
tags:
- actors,
- application,
- development,
- engineering,
- nasa,
- requirements,
- software,
- step,
- use case,
- version,
- mba
- uml diagram,
- uml
---

Recently I've finished my MBA in software engineering and as a result my group and I ended up with and tool for use case management. We were aimed to develop something that helps teams build a better software and we founded in requirements a gap to be fill.

As usual in Brazil software development is a big issue (I'm specifically talking about Brazil because is my country and where I have experience) with impossible dead lines, crap documentation and bosses even worse. In resume software here is just a matter of money and doesn't matter if you built it with quality or not, what matters is how much the company will earn with it.

Software engineers should have the knowledge and power to change it. Therefore we also have a lack of tools to help us to build better software. Let's assume a waterfall model to build software:

[![Waterfall model]({{ site.baseurl }}/images/posts/2016-04-16-requirements-engineering-tool-use-case/waterfall.jpg "Waterfall model")](http://www.maxwideman.com/papers/linearity/waterfall.jpg){:target="_blank"}

Just looking to the diagram we identified that the problem is in the first three steps:

[![Waterfall model and the problem]({{ site.baseurl }}/images/posts/2016-04-16-requirements-engineering-tool-use-case/waterfall-problem.jpg)]({{ site.baseurl }}/images/posts/2016-04-16-requirements-engineering-tool-use-case/waterfall-problem.jpg){:target="_blank"}

Assuming that we did a research to confirm our thesis and let's see what experts have to say to us:

Problems of scope. The boundary of the system is ill-defined or the customers/users specify unnecessary technical detail that may confuse, rather than clarify, overall system objectives (PRESSMAN, Software Engineering - A PRACTITIONER ’ S APPROACH, page 121)

### IT DOES APPLY TO AGILE METHODS AS WELL

To us is very clear the problem is in the documentation and to improve this
field we came up with an new tool to increase the requirements field.
The tool is totally based in the Use Case from UML (The use case description).
We believe that the use case is the very first step to have a good documentation
and where both business and technology can understand for some reasons:

- Use case is a simple matter of who does what
- The diagram and the description is really intuitive
- Once you learn how to create is really easy to repeat (in meetings where the user will be interviewed is common to use use case approach)

![Use case diagram]({{ site.baseurl }}/images/posts/2016-04-16-requirements-engineering-tool-use-case/use-cases-newspapar.gif){:target="_blank"}

Use case diagram Of course the diagram is much easier to understand than the description one. Just looking to the image you know that you'll have a user with the journalist role and a reader, really easy isn't it ? Unfortunately what we have is not the diagram itself in our tool rather we have the description one

![Description use case]({{ site.baseurl }}/images/posts/2016-04-16-requirements-engineering-tool-use-case/Description-of-Use-Cases.jpg)

Description use case Usually Use case descriptions are created and stored in word documents and as you can imagine they can be very hard to maintain and even create them. Our solution provides a easily way to create and store use case description based on an application. You can see the tool here [https://shielded-headland-1947.herokuapp.com](https://shielded-headland-1947.herokuapp.com).
The following section will introduce to the tool and give to a explanation in how we ported the use case description.

## Application

Once you have visited the link you'll see the following image to create an application

[![Use case management - Application]({{ site.baseurl }}/images/posts/2016-04-16-requirements-engineering-tool-use-case/application.png)]({{ site.baseurl }}/images/posts/2016-04-16-requirements-engineering-tool-use-case/application.png)

The first screen is where you define your application, you can have as many
application as you want. Usually when you are creating a use case you are creating
it to a given application, for instance let's say you are developing requirements
to a application called **Fly Cotrol**, so you should use the same name in this
screen. To understand the flow we propose I drawled the following flow chart:

[![Basic flow to create use case]({{ site.baseurl }}/images/posts/2016-04-16-requirements-engineering-tool-use-case/flow.png)]({{ site.baseurl }}/images/posts/2016-04-16-requirements-engineering-tool-use-case/flow.png){:target="_blank"}

Keep it in mind because we're going to follow this as well

## Actor

As the name already said here we are going o manage our actor. You can insert,
delete and update an actor.

[![Use case management - Actors]({{ site.baseurl }}/images/posts/2016-04-16-requirements-engineering-tool-use-case/actors.png)]({{ site.baseurl }}/images/posts/2016-04-16-requirements-engineering-tool-use-case/actors.png)

## Version

In this section is where you going to define the versions of your use cases. A simple example here is when you create the first version called 1.0.0, then comes the need to upgrade some functionalities and then you create the version 2.0.0 to specify only what has been changed.

[![Use case management - Version]({{ site.baseurl }}/images/posts/2016-04-16-requirements-engineering-tool-use-case/version-1.png)]({{ site.baseurl }}/images/posts/2016-04-16-requirements-engineering-tool-use-case/version-1.png)

## Use case

Finally we can now create our use case, here is where all we have done before get together. The first select box is where you select your application to create a use case:

[![Use case management - Use case]({{ site.baseurl }}/images/posts/2016-04-16-requirements-engineering-tool-use-case/use_case_-1.png)]({{ site.baseurl }}/images/posts/2016-04-16-requirements-engineering-tool-use-case/use_case_-1.png)

Then the select box of named Version comes, here is where you select which
version your use case is going to use. Following the same idea you can select
one or more actors to be in your use case.

## Steps

[![Use case management - Version]({{ site.baseurl }}/images/posts/2016-04-16-requirements-engineering-tool-use-case/steps.png)]({{ site.baseurl }}/images/posts/2016-04-16-requirements-engineering-tool-use-case/steps.png)

Here we are in the last step to create our use case, this is the last section
because is complex to explain. Here is where you use case is going to be detailed
with each step and they can be **Main**, **Alternate** or **Exception**
(if you are not understand the point go ahead and take a look in the use case
description in the beginning of the post).

## There is more to be done

The tool was just to prove our point of view in how requirements affects the
software development and there are improvements to be done yet. The main features
I can think now are: user authentication, generate use case diagram and allow
relation between use cases.

If you liked the tool or want to contribute with feel free to, all the code was
developed in PHP and Laravel Framework you can see the source code in
[https://github.com/marabesi/use-case-management](https://github.com/marabesi/use-case-management).

## Conclusion

In this study what I felt is that requirements and documentation is a business
need and the problem resides on the developers hand. As a developer/software
engineers we should demonstrate a path to the users and instigate them to give
us the correct information.

In the past we were addicted to word's document and Excel sheets but nowadays
its more than that, simple text documents doesn't help us to delivery quality
in our softwares. The Use Case management tool is a try to improve this field
and prevent all issues in the software development.

As a resume we learnt we HAVE TO elicit correctly requirements and
Use Case Management toll helps a lot with that, storing all use cases need to a
given application.

## Edit: May 30, 2016

<iframe src="https://drive.google.com/file/d/0B8eXZIvTLcpjQUtKNEtmLXdrQ2p2c19sR2Z2REo5SkI1dDRv/preview" width="100%" height="480"></iframe>