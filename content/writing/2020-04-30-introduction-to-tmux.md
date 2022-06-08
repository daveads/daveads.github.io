---
layout: post
title: 'A quick introduction to tmux(0)'
date: 2020-04-30
categories: [General]
tags: linux tools
---

![tmux(0)](/assets/images/tmux(0).png)<br>

Prerequisite:
* Have a basic understanding of the linux [command line](https://daveads.github.io/tools/linux/2020/04/25/The-Linux-Command-Line.html)
* Install tmux

Goal:
* Learn what tmux is
* Get a quick feel of tmux 

### [Tmux](https://en.wikipedia.org/wiki/Tmux)...?
If you are anything like me then you probably have about ```>= 5``` terminal windows open on your computer when working, And you have a hard time navigating through those terminal (windows) and keeping track of them.

**[tmux](https://github.com/tmux/tmux)** is a terminal multiplexer that helps creates and keep track of termianls from a single screen and does alot more than that, it makes multitasking much easier. 


### Using Tmux:

For now, the major focus is to get acquainted with tmux as qucikly as possible before understanding the way it works.

* Open your terminal and type ```tmux``` if available should open a default window like the pics below.

![tmux(0)_a.png](/assets/images/tmux(0)_a.png)<br>


* Press  ```ctrl + b``` and key at the same time and then release it and then ```shift + "``` 
**This split the screen into two top and bottom**, the splitted screens are called pane.
![tmux(0)_a.png](/assets/images/tmux(0)_b.png)<br>

* To navigate between the splitted screen ```ctrl + b``` which open the prefix then ```o``` key


### keywords in tmux

* window
* pane
* sessions
* server
* client
* prefix

// will talk more on this on the next article

[tmux source code](https://github.com/tmux/tmux)
