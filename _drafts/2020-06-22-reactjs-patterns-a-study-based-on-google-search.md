---
layout: post
title: ReactJs patterns - A study based on google search
date: 2020-06-22 01:06:05.000000000 -03:00
image: 
type: article
published: true
status: published
categories:
- web
tags:
- search,
- result,
- google,
- reactjs,
- patterns,
- web
---

ReactJS is among one of the most used javascript library according to GitHub it is
one of the mos popular started repository. Given its popularity it is expected
that the communicty around it will start to develop techniques, guides and tutorials
around patterns.

Inspired by the software systematic review literature paper
{% cite tamburri2020success --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}, that collects a broader
overview of the software engineering success and failure factors, this post has
the goal to answer the following questions:

1. What is the most popular ReactJS pattern?
2. What are the themes that appears related to the patterns?

Opposed to the scientific method presented by the authors (the research was
conducted mining scientific bases, named: IEEE explorer, ACM digital library,
science direct, springer link, scopus and engineering village), this post is
a collection based on google search.

## Finding reactjs patterns articles

Google blocks the crawling on search, in this case the approach taken was
the google custom search (https://stackoverflow.com/a/30041104/2258921). The custom
search (https://developers.google.com/custom-search/v1/using_rest) API allow
developers to use google search programatically, and works as google search,
the difference is that this integration allow calls progammatically.

The first interaction with the API showed a particular behavior that this service
has, as pointed by {% cite google_employee_search_results --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %},
the total number in the result is not the real number, it is an approximation.

The searching string used for explore the first researching question, was "reactjs patterns".

Searching for this string in google.com, in the first page is shown 904 results.
Executing the same query through the programmable search gives 161 results,
and mining the results through the API, gives 96 results. This behavior
is expected as pointed by {% cite google_employee_search_results --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}.

To mine the results a javascript file was developed, the script executes recursively
based on the number of pages that google returns till the last page of results
for a given search string. In total 96 links were found and saved to a XLS file
for further analysis described in the next section.

## Mining results

A manual analysis of the results was made in the following steps:

1. Removed results that does not have reactjs patterns discussions, such as explaining a
pattern or listing a pattern.
2. Classify each search result into a category.

For 1, a manual approach was taken to go through each item in the search result
to apply the exclusion criteria. As result 14 items were removed, as they met
the exclusion criteria.

For 2, the following categories were defined to group the search results: book,
course, meetup, post, question, slides, video.

|Category |Total|
|---------|-----|
|post     |66   |
|course   |7    |
|book     |3    |
|question |2    |
|video    |2    |
|meetup   |1    |
|slides   |1    |

The cateogry `post` is the most popular, followed by `course` and `book`, `question` and
`video` have the same number of items (2) and in the last two spots are `meetup` and `slides`.

## Analyzing the results






## References

{% bibliography --cited_in_order --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}