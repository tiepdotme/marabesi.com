---
layout: page
title: Dev guide
date: 2016-11-21 01:06:05.000000000 -03:00
type: page
published: true
status: publish
categories: []
tags: []
---

Throughout my career I've been across many developers in the beginning of their journey in become a programmer.
In general what I observed was common doubts and common mistakes.

In this section I'm going to bring all the content that an beginner should start to learn and also
further references to take it to the a next level.

<div style="margin-top: 20px;">
    <h1>Git</h1>
    <ul>
        {% for post in site.newbies %}
            <li>
                <a href="{{ post.url | prepend: site.baseurl }}">
                    {{ post.title }}
                </a>
            </li>
        {% endfor %}
    </ul>
</div>