---
layout: post
title: 'The Linux Command line interface(0)'
date: 2020-04-25
categories: [General]
last_modified_at: 2021-01-10
tags: linux
---

![cmd](/assets/gifs/cmd(0).gif)

I spend 90% of my time in the Terminal emulator (not really sure about that tho), for me it offer's great flexibility and control than the GUI, and it can be really intimidating at first but it worth your time.


Prerequisites: unix or unix-like operating system.

Goals:

* Learn what a command line is and how to use it
* Learn common useful commands and what they mean


### What a [command line interface](https://en.wikipedia.org/wiki/Command-line_interface)?

when talking about the command line we are actually refering to **The Shell**. The shell is a program that takes in Commands or #keywords and passes them to the operating system to carry out. it's a way of interacting with the computer os, similiar to the **GUI** but faster and more powerful. The program which handles this commands in the terminal emulator is the **Command-line interpreter** (shell). 


### Shell Scripting:
 
As earlier said a Unix shell or shell is a command-line interpreter but also a programming language, the programming language features allows us to combine commands or (utilities) together in a file and run them as a scripts, and yea you can also call it a **Script language** for now the major focus is getting you to understand the command line and having the feels of it without getting intimidated.. will write more on Shell script on **Using The Linux Command Line(1)** or probably the next.


### Running the Termainal emulator:

**[Computer terminal](https://en.wikipedia.org/wiki/Computer_terminal):**<br>


![termainal](/assets/images/terminal.png)

Before really going into what the **Terminal emulator** actually is, it important to know where it all started decades ago Computer's had no GUI for accessing or modifying data, the computer terminal was the only means of entering data display and printing of data then the terminal were actualy physical computing devices examples usIBM 3270, VT100 and many others hardware terminals. check out [computer terminal >> wiki](https://en.wikipedia.org/wiki/Computer_terminal) for more details. 


**What's a Terminal emulator:**
The Terminal emulator is a software made to replicate the functions of **Computer terminal** it is the Gui application needed to access **the unix shell** environment which provides an interface to invoke commands, scripts and programs available on your system and also allows you to view and browse through the contents of directory just like you would with a **FILE MANAGER APPLICATION**. 


**Every linux distro comes with a default termainal emulator** Ubuntu and fedora comes with Gnome terminal emulator same with other linux distros,
the first thing you see in the terminal emulator is the **"command prompt"** which shows  $, %, # or > which also includes information about the current working directory and the current user, it also shows the readiness of the shell to accept commands from you. 

* "#" : root access (super user)
* "$" : user access

The default shell for most unix or unix like system is the [bash shell](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) 

other shells includes

1. sh 
2. bash 
3. zsh 
4. csh [e.t.c](https://en.wikipedia.org/wiki/Shell_(computing))

to find out the shells available on your system use the command 

```````````````
cat /etc/shells

```````````````

### Display content in your file directory 
The ```ls``` command is use to print out the current directory out to the termainal emualator screen you will get the same result using the **File Manager** 

![ls_cmd](/assets/gifs/ls_cmd.gif)

![file_manager](/assets/images/file_m.png)

To find out what a command actually means through the command line type this

```
whatis ls
```

you can also make use of the system's manual pager for full doc

```
man ls
```

To print your current working directory use the command ```pwd``` 
![pwd](/assets/images/pwd.png)<br><br>
The pwd is a builtin command within the bash shell itself type ```help``` to find out more on builtin in commands.<br>

 
### Time for Experiments
here's are common commands

**Command** | **Meaning** 
```clear``` | clear the termainal screen
```cd```    | change current directory
```mkdir``` | create a new directory **folder**
```man```   | Manual
```nano```  | Nano's ANother editor
```&&```    | And
```cp```    | copy files
```mv```    | move files
```touch``` | create a new file
```

**Resources**
[The Missing Semester of Your CS Education By Mit](https://missing.csail.mit.edu/)
