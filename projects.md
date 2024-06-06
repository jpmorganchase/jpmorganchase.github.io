---
layout: page
title: Open Source Projects at JP Morgan Chase
permalink: /projects
---

<!-- css styles --- start -->
<style>
  .repo-container {
    border-left: 3px solid #CCC;
    padding-left: 10px;
    margin-bottom: 30px;
    margin-top: 30px;
  }

  .projectList {
    margin-top: 30px;
  }

  .repo-description {
    margin-top: 10px; 
  }

  .no-results {
    margin-top: 20px;
    font-style: italic;
    color: #888;
    display: none; /* Hide the "No results" message by default */
  }

  .reload-link {
    margin-top: 10px; 
    display: none; /* Hide the reload link by default */
  }
</style>
<!-- css styles --- end -->


<div class="search-container">
  <input type="text" id="searchInput" placeholder="Search...">
  <button onclick="performSearch()">Search</button>
</div>

<div class="projectList-wrapper">
  {% assign orderedRepos = site.github.public_repositories | sort: 'stargazers_count' | reverse %}
  <div id="resultsContainer">
    {% for repository in orderedRepos %}
      <div class="repo-container">
        {% assign homepageLength = repository.homepage | size %}
        {% if homepageLength > 0 %}
          <h3>{{repository.name}} | <a href="{{ repository.html_url }}">repo</a> | <a href="{{ repository.homepage }}">pages</a></h3>
        {% else %}
          <h3>{{repository.name}} | <a href="{{ repository.html_url }}">repo</a></h3>
        {% endif %}
        <div class="repo-description">
          <i>{{repository.description}}</i>
          <p style="margin-top: 5px">
            <span style="margin-right:10px">{% octicon repo-forked size:small%} {{repository.forks_count}}</span>
            {% octicon star size:small %} {{repository.stargazers_count}}
          </p>
        </div>
      </div>
    {% endfor %}
  </div>
  <p class="no-results" id="noResultsMessage">No results | <a href="#" onclick="reloadPage()">Reload</a></p>
</div>

<!-- Search Function -- start -->
<script>
  function performSearch() {
    var input, filter, projects, repoContainers, repo, i, txtValue, noResultsMessage, reloadLink;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    projects = document.getElementsByClassName("projectList-wrapper")[0];
    repoContainers = projects.getElementsByClassName("repo-container");
    noResultsMessage = document.getElementById("noResultsMessage");

    var hasResults = false;

    for (i = 0; i < repoContainers.length; i++) {
      repo = repoContainers[i];
      txtValue = repo.textContent || repo.innerText;

      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        repo.style.display = "";
        hasResults = true;
      } else {
        repo.style.display = "none";
      }
    }

    // Show/hide the "No results" message
    noResultsMessage.style.display = hasResults ? "none" : "block";
  }

  function reloadPage() {
    location.reload();
  }
</script>
<!-- Search Function -- end -->
