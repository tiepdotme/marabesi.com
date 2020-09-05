---
layout: post
title: (WIP) ReactJs patterns - A study based on google search
date: 2020-06-22 01:06:05.000000000 -03:00
image: /images/posts/2020-06-22-reactjs-patterns-a-study-based-on-google-search/cover.png
type: article
published: true
status: published
categories:
- web
tags:
- patterns,
- reactjs,
- search,
- google,
- study,
- study based,
- react,
- results,
- web,
- reactjs patterns
---

ReactJS is among one of the most used javascript library according to GitHub it is
one of the mos popular started repository. Given its popularity it is expected
that the communicty around it will start to develop techniques, guides and tutorials
around patterns.

Inspired by the software systematic review literature paper
{% cite tamburri2020success --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}, that collects a broader
overview of the software engineering success and failure factors, this post has
the goal to answer the following questions:

- **Q1.** What is the most popular ReactJS pattern?
- **Q2.** What are the themes that appears related to the patterns?

Opposed to the scientific method presented by the authors (the research was
conducted mining scientific bases, named: IEEE explorer, ACM digital library,
science direct, springer link, scopus and engineering village), this post is
a collection based on google search.

Besides the questions to be answered in this post, the aim is also to be a source to access when in doubt of which reactjs pattern to learn first and also a guide to help beginners to have a picture of the patterns that developers most talk about. 

## Finding reactjs patterns articles

Google blocks the crawling on search, in this case the approach taken was
the google custom search (https://stackoverflow.com/a/30041104/2258921). The custom
search (https://developers.google.com/custom-search/v1/using_rest) API allow
developers to use google search programatically, and works as google search,
the difference is that this integration allow calls progammatically.

The first interaction with the API showed a particular behavior that this service
has, as pointed by {% cite google_employee_search_results --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %},
the total number in the result is not the real number, it is an approximation.

The search string used for explore the first researching question, was "reactjs patterns".
Searching for this string in google.com, in the first page is shown 904 results.
Executing the same query through the programmable search gives 161 results,
and mining the results through the API, gives 96 results. This behavior
is expected as pointed by {% cite google_employee_search_results --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}.

To mine the results a javascript file was developed, the script executes recursively
based on the number of pages that google returns till the last page of results
for a given search string. In total 96 links were found and saved to a XLS file {% cite google_search_results --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}
for further analysis described in the next section.

## Mining results

A manual analysis of the results was made in the following steps:

1. Removed results that does not have reactjs patterns discussions, such as explaining a
pattern or listing a pattern.
2. Classify each search result into a category.

For 1, a manual approach was taken to go through each item in the search result
to apply the exclusion criteria. As result 14 items were removed {% cite google_search_results --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} (the removed
content can be found in the tab "mined").

For 2, the following categories were created to group the search results: book,
course, meetup, post, question, slides, video. The categories were generated
based on a manual review of each item.

|Category |Total|
|---------|-----|
|post     |66   |
|course   |7    |
|book     |3    |
|question |2    |
|video    |2    |
|meetup   |1    |
|slides   |1    |

The category `post` is the most popular, followed by `course` and `book`, `question` and
`video` have the same number of items (2) and in the last two spots are `meetup` and `slides`.

## Analyzing the results

This section dives into the results found, presents a brief explanation of each
item in the list. Therefore, this section does not cover the categories `question`,
`meetup`, `video` and `slides` as they present less than three items.

### Posts

The post category is the most popular with 66, as a first exploration the posts
were read, and for each of them a pattern name was manually assigned, based on the content
of the post. Most of them have more the one pattern associated with it, for
example, the first post, in the list covered 22 patterns.

This process was repeated for each post in the list. Once the classification was done,
the word cloud {% cite word_cloud --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}
visualization was generated (the process is described in the next sentence).

[![Word cloud generated based on the classification](/images/posts/2020-06-22-reactjs-patterns-a-study-based-on-google-search/word_cloud.png "Word cloud generated based on the classification, click to see the visualization")](/artifacts/posts/2020-06-22-reactjs-patterns-a-study-based-on-google-search/word-cloud){:target="_blank"}

The raw classification was processed using the following steps:

1. Similar words were normalized, the word "component" and "components" were normalized
to the word without s (singular form), resulting in "component"
2. Words with capital letter were normalized to use the lower case.
3. Different words used with common mean were normalized, for example, the higher order component
is commonly used as HoC, the shorter version was used.

The word cloud depicts the translation between the most cited patterns used
in the dataset. The most cited pattern is Component, followed by props taking into
consideration just a single word.


## Discussion

This section dive deeper in the results depicted in the previous section,
the first sub section focus on **Q1** and the second section focuses on **Q2**.
The discussion presented in this section is based in the table of result mined
to generate the word cloud in the previous section.


## Reactjs patterns



### Container component

{% cite post_react_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_react_component_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite  post_simple_react_design_patterns_container_view --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} 

{% cite post_implementing_the_container_pattern_using_react_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_introduction_to_react_design_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} 

{% cite post_the_react_redux_container_pattern --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}



### Conditional rendering

{% cite post_evolving_patterns_in_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_react_conditional_rendering --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}



### Compound Components

{% cite post_2019_reactjs_best_practices --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_advanced_react_component_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_five_ways_to_advanced_react_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_seven_patterns_by_example --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}



### Higher-Order-Component

{% cite post_2019_reactjs_best_practices --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_advanced_react_component_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_five_ways_to_advanced_react_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_simple_react_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_advanced_patterns_reactjs --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_reactjs_in_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_evolving_patterns_in_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_patterns_style_composition --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_higher_order_components --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_patterns_for_data_fetching_in_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_5_react_data_fetching --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_how_advanced_react_patterns_changed_with_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_react_component_types_a_complete_overview --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_react_patterns_react_and_ramda --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}



### Render Props

{% cite post_react_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_five_ways_to_advanced_react_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_how_to_master_advanced_react_design_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_simple_react_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_advanced_patterns_reactjs --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_evolving_patterns_in_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_5_react_data_fetching --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite  post_common_i18n_patterns_in_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_introduction_to_react_design_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} 

{% cite post_how_advanced_react_patterns_changed_with_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}



### Render callback

{% cite post_react_component_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_react_patterns_render_callback --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}



### Prop Collections and Getters

{% cite post_advanced_react_component_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}



### State Initializers

{% cite post_advanced_react_component_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}



### State reducer

{% cite post_five_ways_to_advanced_react_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_react_state_reducer_pattern --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}



### Stateful

{% cite post_react_component_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}



### Stateless

{% cite post_react_component_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_patterns_style_composition --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}



### Controlled Components

{% cite post_advanced_react_component_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_five_ways_to_advanced_react_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}



### Provider

{% cite post_advanced_react_component_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_evolving_patterns_in_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_provider_pattern_in_react_using_react_context_api --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}



### Context

{% cite post_four_patterns_for_global_state_with_react_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_provider_pattern_in_react_using_react_context_api --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_angularjs_patterns_in_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_react_state_reducer_pattern --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} 

{% cite post_8_no_flux_strategies_for_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}



### Hooks

{% cite post_patterns_for_data_fetching_in_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_5_react_data_fetching --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_the_facade_pattern_and_applying_to_react_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_react_hooks_design_patterns_creating_components_without_class --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_implementing_the_container_pattern_using_react_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_how_advanced_react_patterns_changed_with_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_discovering_patterns_with_react_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}  

{% cite post_production_level_patterns_for_react_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_friday_frontend_new_react_pattern --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_best_practices_with_react_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_react_hooks_rebirth_of_state_management --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_bloc_pattern_with_react_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}



### Decorated component

{% cite post_patterns_for_testable_react_components --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}



### Controller view

{% cite post_the_reactjs_controller_view_pattern --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}



### Adapter

{% cite post_using_the_adapter_design_pattern_with_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}



### Dependency injection

  {% cite post_dependency_injection --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}



### Event listeners

{% cite post_global_listener_patterns_in_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}



### Redux

{% cite post_redux_design_patterns_reduxsauce --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}

{% cite post_getting_to_know_the_redux_Pattern --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} 



### MVVM

{% cite post_level_up_react_architecture --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} 



### BLoC

{% cite post_bloc_pattern_with_react_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} 




### Q1

For **Q1**, the results point to the most popular pattern being the "component",
followed by "props" which are the foundation of ReactJs, as everything is a component,
and communication happens via props. A first hypothesis into this result is the repetition of those two patterns to explain more complex ones, for developers that are starting into the reactjs, components and props are the first principles to understand.

[![lollipop graph](/images/posts/2020-06-22-reactjs-patterns-a-study-based-on-google-search/lollipop.png "lollipop graph, top 10, click to see the visualization")](/artifacts/posts/2020-06-22-reactjs-patterns-a-study-based-on-google-search/lollipop){:target="_blank"}

In addition to that complex patterns such as hooks and higher order components appear surrounding
the component and prop pattern. Those are the patterns which requires from
the developer a previous understanding of props and components as they are more complex.

### Q2

For **Q2** the surrounding elements are the focus, so for example, terms like
best practices and design were found and are related to reactjs patterns.

Code reuse, separate of concerns, readability, easy to maintain,



## Conclusion

ReactJs is among the most used UI libraries, as a result it has a lot of
content created by the community and by Facebook (which is the company behind
rectJS). The proposed study showed the most used reactjs patterns as well as
the themes that surround the patterns. As it tuns out, the most popular patterns
are components and props, which are the reactjs foundation and not advanced
patterns for experienced reactjs developers. On the other hand, patterns
like Higher order components, hooks and container component requires some previous
knowledge to be used effectively, but those patterns that require
more experience are the ones less popular as well.

## References

{% bibliography --cited_in_order --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}


## Appendix


### Mined content

On the Title column, the original title from the source was preserved and on the
right a short abstract was provided to illustrate what the source content is about.

|Title| Abstract|
|-----|---------|
| React Patterns | {% cite post_react_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} provides a list with patterns used in reactjs, the list has a title and a brief description as well as the code snippet that represents the described pattern. The list works as a friendly guide for developers that need a way to quickly check how to compose a specific pattern. |
| Design Principles – React | {% cite post_design_principles_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} is a collection of the ReactJs design principles that together composes the philosophy and key concepts implemented in ReactJs. Those are used as a guide fo ReactJs evolution and changes for the community around it. |
| 2019 ReactJS Best Practices - Bogdan Kulbida - Medium | {% cite post_2019_reactjs_best_practices --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} presents a best practices guide related to component creation, named: stateful components, stateless components, Higher order components and container components. For each pattern listed, the author goes in details for each one of them. The communication pattern between react components is also cited (known as data/props down, actions/events up). |
| Advanced React Component Patterns | {% cite post_advanced_react_component_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} describes the patterns used in his course, named: compound components, Higher order components, render props, prop collection and getters, state initializers, controlled components an provider. The list just gives a brief description of what is covered in the course and not much detail is given, which might be difficult to understand without a proper context, the author also assumes that the reader already has previous knowledge in React (as the title says it is an advanced reactjs patterns). |
| Five Ways to Advanced React Patterns - DEV | {% cite post_five_ways_to_advanced_react_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} covers the same patterns as {% cite post_advanced_react_component_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}, not all of them though, and also adds the pattern state reducer. |
| How To Master Advanced React Design Patterns — Render Props | {% cite post_how_to_master_advanced_react_design_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} in covers exclusively the render props pattern, this post is part of a series of reactjs patterns that each post covers a single pattern. |
| Simple React Patterns \| Lucas Reis' Blog | {% cite post_simple_react_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} gives code snippets for different reactjs patterns, named as "everyday patterns", such as: container or view pattern (not to be confused by compound pattern), higher order component , render props and the provider pattern. |
| Advanced Patterns in React | {% cite post_advanced_patterns_reactjs --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} dedicates the post to two specific reactjs patterns: higher order components  and render props. |
| React.js in patterns | {% cite post_reactjs_in_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} the author starts by the communication flow that reactjs uses as a foundation as well as the children props, basically setting up a common ground, then the pattern higher order component is introduced. |
| React Component Patterns - Level Up Coding | {% cite post_react_component_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} mentions for the first time in this list stateless and stateful components shows up, those patterns are often used to separate concerns between components. |
| Evolving Patterns in React | {% cite post_evolving_patterns_in_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} starts with patterns that are considered to be simple, such as conditional rendering, passing down props ({% cite post_2019_reactjs_best_practices --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} also mentions the passing props), in the follow up the author mentions the destructuring pattern, which is a javascript functionality and not a reactjs pattern. |
| React Conditional Rendering Patterns \| Building SPAs | {% cite post_react_conditional_rendering --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} focus on the rendering patterns used in reactjs. Those patterns are directly connected to JSX, as reactjs uses JSX to render the component. |
| Patterns for Style Composition in React \| Jxnblk | {% cite post_patterns_style_composition --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} describes the patterns the he used to keep things organized, the goal as mentioned was to (but not limited to): create a well defined visual design, increase maintainability of visual styles and create reusable components. For that, the author used: stateless components (which is also discussed by {% cite post_react_component_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}), styles module, style functions, npm modules, base component and higher order components. Those patterns listed, were used focused on the visual part. |
| Simple React Design Patterns: Container/View - serendipidata | {% cite  post_simple_react_design_patterns_container_view --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} expose his thoughts on the container/view pattern rather than explain how the pattern works. The author gives his opinions and use cases for the pattern, also the author assumes that the read has already some experience with reactjs and knows the vocabulary of the patterns, such as higher order components. |
| Higher-order Components: A React Application Design Pattern ... | {% cite post_higher_order_components --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} focus on the higher order components pattern, the author starts with the basic idea of pure functions as a base for the reader to understand the pattern. |
| Patterns for data fetching in React - LogRocket Blog | {% cite post_patterns_for_data_fetching_in_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}  explore the different patterns to use when fetching data from a server using reactjs. |
| 10 React mini-patterns \| Hacker Noon | {% cite post_10_react_mini_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} explore different approaches and use cases for using react, the pattern passing props down (this same pattern was explored by {% cite post_2019_reactjs_best_practices --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}, {% cite post_evolving_patterns_in_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}) is the only reactjs pattern that is mentioned by the author. |
| 5 React Data-Fetching Patterns - Nordschool | {% cite post_5_react_data_fetching --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} is a shorter version of {% cite post_patterns_for_data_fetching_in_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} and a more detailed one taking care of diving the fetching patterns with a reactjs pattern. |
| The Facade pattern and applying it to React Hooks | {% cite post_the_facade_pattern_and_applying_to_react_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}  explores the idea of the facade pattern and the hooks pattern, mixing those together to abstract the third parties libraries to the application. The main idea of the author is to explore the facade with reactjs hooks. |
| React hooks design patterns and creating components without class | {% cite post_react_hooks_design_patterns_creating_components_without_class --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} gives a brief explanation about the hooks, its functional approach and a comparison between class components and functional components.  The author states that the reactjs patterns known by the class standard are shifting to hooks in a functional approach, and reactjs hooks is the future of react. |
| Common i18n patterns in React — LinguiJS documentation | {% cite  post_common_i18n_patterns_in_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} is all about i18n in reactjs. Due the different ways to render a translation string, the examples given uses the component approach and the render prop. |
| Implementing the Container Pattern using React Hooks | {% cite post_implementing_the_container_pattern_using_react_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} implements the container pattern using hooks, a todo-app like is uses as an example for the usage of the container pattern. Besides that, the interesting part is that the author uses class components and functional components in the code examples. |
| Introduction to React Design Patterns | {% cite post_introduction_to_react_design_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} explores the container pattern and render props, also the flux pattern is introduced in the talk. |
| How advanced React patterns changed with hooks | {% cite post_how_advanced_react_patterns_changed_with_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Four patterns for global state with React hooks: Context or Redux | {% cite post_four_patterns_for_global_state_with_react_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} shares his thoughts on global states in reactjs components, in the following order: prop passing, context and redux. Which for global state context and redux are popular solutions, therefore, passing props is a local state and not a global solution for that. |
| Zemuldo Blog - Patterns For Testable React Components | {% cite post_patterns_for_testable_react_components --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} introduces a pattern named decorated components to make testing easier in react components. In fact, this is the first pattern mentioned with testing. |
| Discovering patterns with React hooks | {% cite post_discovering_patterns_with_react_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| The ReactJS Controller View Pattern | The controller view pattern introduced by {% cite post_the_reactjs_controller_view_pattern --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} is used to delegates the responsibility of handling the state change to a single component. |
| Seven patterns by example: The many ways to `type="radio"` in React | {% cite post_seven_patterns_by_example --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} focuses on the radios input type and based on the HTML input, the author starts to compose the reactjs patterns around it. |
| The React + Redux Container Pattern | {% cite post_the_react_redux_container_pattern --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| React Component Types: A complete Overview - RWieruch | The complete guide of a reactjs component by {% cite post_react_component_types_a_complete_overview --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} goes from the create react class style (the first approach of the library), using mixins as a way to share code between components, ES6 classes and higher order components. In the second part the the functional approach is introduced (as this is the latests and recommended way to write reactjs code). All in all, the complete guide shows the reactjs evolution through time and how new javascript features improved the library style of code and gave different approaches to solve common problems. |
| Production-Level Patterns for React Hooks \| FullStack Labs | {% cite post_production_level_patterns_for_react_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} introduces the idea of effects instead of life cycle events (as reactjs used to be before hooks), in his approach the to-do app is used to re-factor the code from a class component to a functional component that uses hooks to share logic and separate concerns. |
| A Model View Controller Pattern for React - Test Double \| Our Blog | {% cite post_a_model_view_controller_pattern --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} uses the same idea as {% cite post_production_level_patterns_for_react_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} to use MVC in reactjs. The difference here is that {% cite post_a_model_view_controller_pattern --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} goes in detail about why MVC. |
| Provider Pattern in React using React Context API | {% cite post_provider_pattern_in_react_using_react_context_api --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} gives an introduction to the provider pattern. The author explains the concept of the provider pattern and why it exists (prop-drilling). |
| Using the Adapter Design Pattern With React \| SendGrid | The pattern adapter in reactjs presented by {% cite post_using_the_adapter_design_pattern_with_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} introduces a pattern that aims to decouple the source data from the presentational layer. As the author states "Eventually, I decided that having the view so tightly coupled to the API was a poor decision.", therefore, using the adapter pattern, offers the following benefits: reduced coupling, easier maintenance, the view layer focused on only the presentational aspect, updates to changes in the API becomes easier as there will be only one place to change. |
| Dependency injection · React in patterns | {% cite post_dependency_injection --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} uses the dependency injection term to describe how reactjs pass props between components, in this sense, the dependency in a component is what in injected by the consumer. |
| AngularJS Patterns in React \| Greg Babiars's Blog | {% cite post_angularjs_patterns_in_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} translates angular features, such as filters, directives, themes and slots, to its corresponding code in reactjs. |
| Global listener patterns in React - Advanced Web Machinery | {% cite post_global_listener_patterns_in_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} provides patterns used in react to listen and remove listeners to global events. The first example uses the state to keep track of the listeners and also to  remove them once the reacjs component has been unmounted, as pointed by the author, this approach requires three reactjs life cycle methods , otherwise it might produce undesirable behavior. An alternative to that is a simpler approach that relies on the window object to register and remove the listener. |
| Level up your React architecture with MVVM - COBE | {% cite post_level_up_react_architecture --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} introduces the MVVM pattern using reactjs, the pattern consists of separating the controller of updating the view with the responsible to control the update. This is the first time the MVVM appears in this list, which can open for further questions about the MVVM on reactjs. |
| React patterns \| React and Ramda patterns | {% cite post_react_patterns_react_and_ramda --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} expoes code snippets to bring the functional approach to reacjs, ramda is a javascrpt functional library. The reactjs is focusing on functional approaches as well (hooks for example), but the approach is different, given the fact that reacjs wasn't created with functional from scratch. |
| Friday Frontend: New React Patterns | {% cite post_friday_frontend_new_react_pattern --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} is a collection shared by the author with different tips around the reactjs ecosystem, it doesn't focus on any specific subject, but it refers links to patterns such as hooks and recursive reactjs components. |
| React's State Reducer Pattern - DSC Engineering | {% cite post_react_state_reducer_pattern --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| The Unstated React Service Pattern - HMH Engineering | {% cite post_the_unstated_react_service_patttern --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} describes the context pattern as an alternative to redux, mobx and apollo link state. The presented alternative is to use stated to manage the global state in reactjs. |
| Best Practices With React Hooks — Smashing Magazine | {% cite post_best_practices_with_react_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} dives into the details of reactjs hooks,  for a beginner point of view and also for an intermediate developer that already knows hooks but wants to level up the understanding of the subject (section "hooks best practices"). |
| 15 React Best Practices You Need to Follow in 2020 | {% cite post_15_react_best_practices_you_need_to_follow_in_2019 --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} gathered 15 best practices that reactjs developers should follow, therefore, in those practices no specific pattern was mentioned. |
| React Patterns - Render Callback \| Lenny's Blog | {% cite post_react_patterns_render_callback --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} presents the callback render as an alternative to render props, which has the same intent, the difference relies in the callback itself. Whereas the render props renders a given prop, the callback renders a function that is invoked before rendering. |
| Redux design patterns & Reduxsauce | {% cite post_redux_design_patterns_reduxsauce --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} is a source around the redux and reduxsauce and how the author used the flux pattern implementation. |
| React Hooks, the rebirth of State Management and beyond. | {% cite post_react_hooks_rebirth_of_state_management --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} presents his experiments with reactjs hooks its usage with state management. |
| 8 no-Flux strategies for React component communication | {% cite post_8_no_flux_strategies_for_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} shows 8 different strategies to communicate data between reactjs. Even though the alternative claims to be an alternative to flux (the implementation most known is redux). Those alternatives are: props, instance methods, callback functions, event bubbling, parent component, observer pattern, global variables and context. |
| BLoC Pattern with React Hooks — magarcia | {% cite post_bloc_pattern_with_react_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} BLoC stands for Business Logic Component. The focus of BLoC is to remain environment and platform independent, use exclusively observables and also contains business logic. The pattern was created to support angular dart and and flutter, but the author suggests that it can be applicable to reactjs as well. |
| Getting to Know the Redux Pattern \| DotNetCurry | {% cite post_getting_to_know_the_redux_Pattern --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}  offers an approach to the redux pattern introducing the flux (which is the pattern definition - one way data flow) and also exposes a few examples in how to use it as a pure library (no reactjs). The content presented is a base to developers that want to understand how redux works and where it come from. |
| Clean Code vs. Dirty Code: React Best Practices - American ... | {% cite post_clean_code_dirty_code --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} introduces the idea behind clean code and also its counter parts "dirty code". The content is a set of best practices guide instead of a clear pattern implementation. |
| ReactJS - GeeksforGeeks | {% cite post_geeks_for_geeks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} is a material created for beginners, it gives the foundation of reactjs, how it works, what it is, the naming and conventions. The material is recommended as a first approach to the reactjs ecosystem. |
| Reusable Code In React: Inheritance, Composition, Decorators and ... | {% cite post_reusable_code_in_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Killing Switch Statements in React with the Strategy Pattern | {% cite post_killing_switch_statements --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| A state management pattern for Ionic React with React Hooks | {% cite post_a_state_management_pattern_for_ionic_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Advanced React Concepts \| React Resources | {% cite post_advanced_react_concepts --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Reactjs application development tips \| Reactive | {% cite post_reactjs_application_development_tips --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
