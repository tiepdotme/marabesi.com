require('./menu')
require('./lazyLoadImg')
require('./serviceWorkerHandler')
require('simple-jekyll-search/dest/simple-jekyll-search')
require('./disqus')

import '../_sass/tailwind.scss';
import '../_sass/main.scss'

SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('results-container'),
  searchResultTemplate: '<li class="list-reset p-2"><a href="{url}">{title}</a></li>',
  json: '/search.json',
  fuzzy: false,
  noResultsText: 'No results found 😞'
})
