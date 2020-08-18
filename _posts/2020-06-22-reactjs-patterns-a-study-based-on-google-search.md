---
layout: post
title: ReactJs patterns - A study based on google search
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

The cateogry `post` is the most popular, followed by `course` and `book`, `question` and
`video` have the same number of items (2) and in the last two spots are `meetup` and `slides`.

## Analyzing the results

This section dives into the results found, presents a brief exaplanation of each
item in the list. Therefore, this section does not cover the categories `question`,
`meetup`, `video` and `slides` as they present less than three items.

### Posts

The post category is the most popular with 66, as a first exploration the posts
were read, and for each of them a pattern name was manually asigned, based on the content
of the post. Most of them have more the one pattern associated with it, for
example, the first post, in the list covered 22 patterns.

This process was repeated for each post in the list. Once the classification was done,
the word cloud {% cite word_cloud --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}
vizualization was generated following a process.

![Word cloud generated based on the classification](/images/posts/2020-06-22-reactjs-patterns-a-study-based-on-google-search/word_cloud.png "Word cloud generated based on the classification")

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
the first sub section focus on **Q1** and the second section focuses on **Q2**,
but before looking into the research questions, the following table details
the content used to create the visualization in the previous section.

On the Title column, the original title from the source was preserverd and on the
right a short abstract was provided to ilustrate the source content.

|Title| Abstract|
|-----|---------|
| React Patterns | {% cite post_react_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}  |
| Design Principles – React | {% cite post_design_principles_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| 2019 ReactJS Best Practices - Bogdan Kulbida - Medium | {% cite post_2019_reactjs_best_practices --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Advanced React Component Patterns | {% cite post_advanced_react_component_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Five Ways to Advanced React Patterns - DEV | {% cite post_five_ways_to_advanced_react_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| How To Master Advanced React Design Patterns — Render Props | {% cite post_how_to_master_advanced_react_design_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Simple React Patterns \| Lucas Reis' Blog | {% cite post_simple_react_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Advanced Patterns in React | {% cite post_advanced_patterns_reactjs --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| React.js in patterns | {% cite post_reactjs_in_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| React Component Patterns - Level Up Coding | {% cite post_react_component_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Evolving Patterns in React | {% cite post_evolving_patterns_in_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| React Conditional Rendering Patterns \| Building SPAs | {% cite post_react_conditional_rendering --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Patterns for Style Composition in React \| Jxnblk | {% cite post_patterns_style_composition --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Simple React Design Patterns: Container/View - serendipidata | {% cite  post_simple_react_design_patterns_container_view --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Higher-order Components: A React Application Design Pattern ... | {% cite post_higher_order_components --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Patterns for data fetching in React - LogRocket Blog | {% cite post_patterns_for_data_fetching_in_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| 10 React mini-patterns \| Hacker Noon | {% cite post_10_react_mini_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| 5 React Data-Fetching Patterns - Nordschool | {% cite post_5_react_data_fetching --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| The Facade pattern and applying it to React Hooks | {% cite post_the_facade_pattern_and_applying_to_react_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| React hooks design patterns and creating components without class | {% cite post_react_hooks_design_patterns_creating_components_without_class --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Common i18n patterns in React — LinguiJS documentation | {% cite  post_common_i18n_patterns_in_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Implementing the Container Pattern using React Hooks | {% cite post_implementing_the_container_pattern_using_react_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Introduction to React Design Patterns | {% cite post_introduction_to_react_design_patterns --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| How advanced React patterns changed with hooks | {% cite post_how_advanced_react_patterns_changed_with_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Four patterns for global state with React hooks: Context or Redux | {% cite post_four_patterns_for_global_state_with_react_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Zemuldo Blog - Patterns For Testable React Components | {% cite post_patterns_for_testable_react_components --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Discovering patterns with React hooks |  {% cite post_discovering_patterns_with_react_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| The ReactJS Controller View Pattern | {% cite post_the_reactjs_controller_view_pattern --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Seven patterns by example: The many ways to `type="radio"` in React | {% cite post_seven_patterns_by_example --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| The React + Redux Container Pattern | {% cite post_the_react_redux_container_pattern --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| React Component Types: A complete Overview - RWieruch | {% cite post_react_component_types_a_complete_overview --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Production-Level Patterns for React Hooks \| FullStack Labs | {% cite post_production_level_patterns_for_react_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| A Model View Controller Pattern for React - Test Double \| Our Blog | {% cite post_a_model_view_controller_pattern --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Provider Pattern in React using React Context API | {% cite post_provider_pattern_in_react_using_react_context_api --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Using the Adapter Design Pattern With React \| SendGrid | {% cite post_using_the_adapter_design_pattern_with_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Dependency injection · React in patterns | {% cite post_dependency_injection --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| AngularJS Patterns in React \| Greg Babiars's Blog | {% cite post_angularjs_patterns_in_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Global listener patterns in React - Advanced Web Machinery | {% cite post_global_listener_patterns_in_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Level up your React architecture with MVVM - COBE | {% cite post_level_up_react_architecture --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| React patterns \| React and Ramda patterns | {% cite post_react_patterns_react_and_ramda --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Friday Frontend: New React Patterns | {% cite post_friday_frontend_new_react_pattern --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| React's State Reducer Pattern - DSC Engineering | {% cite post_react_state_reducer_pattern --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| The Unstated React Service Pattern - HMH Engineering | {% cite post_the_unstated_react_service_patttern --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Best Practices With React Hooks — Smashing Magazine | {% cite post_best_practices_with_react_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| 15 React Best Practices You Need to Follow in 2020 | {% cite post_15_react_best_practices_you_need_to_follow_in_2019 --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| React Patterns - Render Callback \| Lenny's Blog | {% cite post_react_patterns_render_callback --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Redux design patterns & Reduxsauce | {% cite post_redux_design_patterns_reduxsauce --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| React Hooks, the rebirth of State Management and beyond. | {% cite post_react_hooks_rebirth_of_state_management --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| 8 no-Flux strategies for React component communication | {% cite post_8_no_flux_strategies_for_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| BLoC Pattern with React Hooks — magarcia | {% cite post_bloc_pattern_with_react_hooks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Getting to Know the Redux Pattern \| DotNetCurry | {% cite post_getting_to_know_the_redux_Pattern --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Clean Code vs. Dirty Code: React Best Practices - American ... | {% cite post_clean_code_dirty_code --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| ReactJS - GeeksforGeeks | {% cite post_geeks_for_geeks --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Reusable Code In React: Inheritance, Composition, Decorators and ... | {% cite post_reusable_code_in_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Killing Switch Statements in React with the Strategy Pattern | {% cite post_killing_switch_statements --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| A state management pattern for Ionic React with React Hooks | {% cite post_a_state_management_pattern_for_ionic_react --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Advanced React Concepts \| React Resources | {% cite post_advanced_react_concepts --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |
| Reactjs application development tips \| Reactive | {% cite post_reactjs_application_development_tips --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %} |

### Q1

For **Q1**, the results point to the most popular pattern being the "component",
followed by "props" which are the foundation of ReactJs, as everything is a component,
and communication happens via props, but taking into consideration more experienced
reactjs developers those two are just the firt principles to understand.

Complex patterns such as hooks and higher order components appear surrounding
the component and prop pattern. Those are the patterns which requires from
the developer a previous understanding of props and components.

### Q2

For **Q2** the surrounding elements are the focus, so for example, terms like
best practices and design were found and are related to reactjs patterns.

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

<!-- One posible cause for this ti happen, is that the interest in react  -->

## References

{% bibliography --cited_in_order --file 2020-06-22-reactjs-patterns-a-study-based-on-google-search %}