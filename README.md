
This project is build in Jekyll. It is a simple, blog-aware, static site generator for personal, project, or organization sites. Written in Ruby by Tom Preston-Werner, GitHub's co-founder, it is distributed under the open source MIT license.
To install Kekyll and bundler gems. Run.<br>
1.) Install a full Ruby development environment (https://jekyllrb.com/docs/installation/).<br>
2.) Install Jekyll and bundler gems.<br>
<code>gem install jekyll bundler</code><br>
3.) Create a new Jekyll site at
<code>jekyll new myblog</code><br>
4.) Change into your new directory.
<code>cd myblog</code><br>
5.) Build the site and make it available on a local server.
<code>bundle exec jekyll serve</code><br>
6.)Browse to http://localhost:4000



Requirememts:

1)Ruby version 2.5.0 or above, including all development headers (ruby version can be checked by running ruby -v) 
2)RubyGems (which you can check by running gem -v) 
3)GCC and Make (in case your system doesn’t have them installed, which you can check by running gcc -v,g++ -v and make -v in your system’s command line interface)

[https://jekyllrb.com/docs/installation/] official website for jekyll installation

After following the steps to set environment in you system wrt to your OS

Run the following commands

<code>bundle install</code>
It is used to install the dependencies specified in your Gemfile
if the above installation fails ,check you bundle version

<code>bundle --version</code>
The project requires bundle verion 1.16.1
If <code>bundle --version</code> doesnt work then check  you have an executable named <code> rails</code> on your <code>PATH</code>

Follow the below commands and install 1.16.1 version

<code>sudo gem install bundler --version 1.16.1</code><br>
               <code>or</code><br>
<code>sudo gem install bundler:1.16.1</code><br>
<code>bundle install</code><br>
check the version , and your local repo for a new folder <code>_site</code> would be generated in local repo.


Serve the file from the root directory
<code>
bundle exec jekyll serve
check your [ localhost:4000 ]
</code>

