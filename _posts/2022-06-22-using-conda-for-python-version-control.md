---
layout: post
author: David Conmy
title: Using Anaconda for Controlling Python Versions
title-image: 
title-image-alt:
categories:
tags:
    - programming
    - python
---

When using Python in multiple projects it is almost inevitable that you will need to use different versions of python depending on the target version of the current project.
Unless you want to uninstall and reinstall python between work sessions on the various projects you will want to use 'python environments'.

I could use `pyenv` to control this. Set up my environment with `pyenv` and switch with this easy-to-use tool.

I could also use `venv` which comes packaged with python3. This could be a viable option - but some projects I tinker with still use python2.

However, for me, my background is in using python for data science. I like to use anaconda and so I decided to manage my python environments with anaconda.

The Anaconda documentation has really [easy to follow documentation](https://docs.anaconda.com/anaconda/user-guide/tasks/switch-environment/) on how to do this and this is the approach I've decided to take too.

I simply run

`conda create --name py2 python=2.7`

and 

`conda create --name py3 python=3.5`

This creates separate python3 and python2 environments which I can switch with `conda activate py2` or `conda activate py3` depending on the project I am using at the time.
