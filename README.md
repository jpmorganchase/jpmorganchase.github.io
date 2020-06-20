# jpmorganchase.github.io

This Project is built under Jekyll framework , Jekyll is a Ruby Gem that can be installed on most systems.
Jekyll is a simple, blog-aware, static site generator for personal, project, or organization sites.
Written in Ruby by Tom Preston-Werner, GitHub's co-founder, it is distributed under the open source MIT license.

Prerequisites 

1)Ruby version 2.5.0 or above, including all development headers (ruby version can be checked by running ruby -v)
2)Jekyll started a web development trend towards static websites.
3)As of 2017, Jekyll is the most popular static site generator, largely due to its adoption by GitHub.
4)RubyGems (which you can check by running gem -v)
5)GCC and Make (in case your system doesn’t have them installed, which you can check by running gcc -v,g++ -v and 
  make -v in your system’s command line interface)

[https://jekyllrb.com/docs/installation/]  official website for jekyll installation 

After following the steps to set environment in you system wrt to your OS 

Run the following commands 

````````````````
bundle install
````````````````
if the above installation fails ,check you bundle version 
````````````````
bundle --version
````````````````

The project requires bundle verion  1.16.1 

Follow the below commands and install 1.16.1 version 
 ````````````````
 sudo gem install bundler --version 1.16.1
                or
 sudo gem install bundler:1.16.1
 
 bundle install
 ````````````````

 check the version , and your local repo for a new folder <code>_site</code> would be generated in local repo.

 Serve the file from the root directory
 ````````````````
 bundle exec jekyll serve
 
 check your [ localhost:4000 ]
 `````````````````````````         

If you face the issue installation of bundle check following :

1)Getting started with bundler is easy! Open a terminal window and run this command:
````````````````
$ gem install bundler

source 'https://rubygems.org'
gem 'nokogiri'
gem 'rack', '~> 2.0.1'
gem 'rspec'
````````````````
2)Install all of the required gems from your specified sources:
````````````````
$ bundle install
$ git add Gemfile Gemfile.lock
````````````````

3)For further issue in bundler do check:
````````````````
 Bundler Slack 
 
 ````````````````
 
For Installing JekyllPermalink

Installation via RubyInstallerPermalink
The easiest way to run Jekyll is by using the RubyInstaller for Windows.

RubyInstaller is a self-contained Windows-based installer that includes the Ruby language, an execution environment, 
important documentation, and more. We only cover RubyInstaller-2.4 and newer here,
older versions need to install the Devkit manually.

Download and Install a Ruby+Devkit version from RubyInstaller Downloads.
Use default options for installation.
Run the ridk install step on the last stage of the installation wizard.
This is needed for installing gems with native extensions.
You can find additional information regarding this in the RubyInstaller Documentation.
Open a new command prompt window from the start menu, so that changes to the PATH environment variable becomes effective. Install Jekyll and Bundler via: gem install jekyll bundler
 ````````````````
Check if Jekyll installed properly: jekyll -v
That’s it, you’re ready to use Jekyll!
 ````````````````
