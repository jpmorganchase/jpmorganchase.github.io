---
layout: default
---

## Our Projects
{% assign orderedRepos = site.github.public_repositories | sort: 'stargazers_count' | reverse %}
{% for repository in orderedRepos %}

{% assign homepageLength = repository.homepage | size %}
{% if homepageLength > 0 %}
### {{repository.name}} | [repo]({{ repository.html_url }}) | [pages]({{ repository.homepage }}) 
{% else %}
### {{repository.name}} | [repo]({{ repository.html_url }})
{% endif %}
<div style="border-left: 3px solid #CCC; padding-left: 10px; margin-bottom: 30px">
<i>{{repository.description}}</i>
<p style="margin-top: 5px"><span style="margin-right:10px">{% octicon repo-forked size:small%} {{repository.forks_count}}</span> {% octicon star size:small %} {{repository.stargazers_count}} </p>
</div>

{% endfor %}

