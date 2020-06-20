# jpmorganchase.github.io

This Project is built under Jekyll framework , Jekyll is a Ruby Gem that can be installed on most systems.

Prerequisites 

1)Ruby version 2.5.0 or above, including all development headers (ruby version can be checked by running ruby -v)
2)RubyGems (which you can check by running gem -v)
3)GCC and Make (in case your system doesn’t have them installed, which you can check by running gcc -v,g++ -v and 
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
 
Feel free to contribute to this project and other J.P.Morgan open source projects [https://github.com/jpmorganchase]. 
PS: check the .gitignore file , incase you face problem during commit
 
