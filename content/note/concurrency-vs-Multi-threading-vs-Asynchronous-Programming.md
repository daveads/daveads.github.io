+++
title = "Concurrency vs Multi-threading vs Asynchronous Programming"
date = 2022-06-29
[taxonomies]
notec = ["Parallelism"]
notet = ["concurrency","parallelism","threads","asynchronous"]
+++

* concurrency && parallelism
* Threads(multi-threaded) && Processes, 
* Synchronous && Asynchronous


### concurrency && parallelism
**concurrency :**  

Imagine a task of were you have to "sing and eat"

sing for a time  and then

eat for a time.


so this tasked is performed concurrently...

concurrency : is executing the task at the same time but not neccessary simultaneously


# concurrency is handled differently in various processor

In a single core: concurrency is handled via a process called **context-switching**


**PARALLELISM**

Given a task of ***cooking and speaking to a friend over a phone*** these two task can be done simultaneously.


"""
Parallelism means performing two or more tasks simultaneously.

Parallel computing in computer science refers to the process of performing multiple calculations simultaneously.
"""

concurrency and parallelism refer to computer architectures which is focus on how our tasks or computations are performed

* in a single core concurrency happens with tasks executing over same time period via context switching i.e only a task get executed.


* in a multi-core environment, concurrency can be achieved via parallelism in which multiple tasks are executed simultaneously


## Threads & processes

THREADS: this are sequence of executing code which can be executed independently of one another. a program can be single threaded or multi-threaded

its smallest unit of a task that can be executed by an os


PROCESS : a program is an instance of a running program. a program can have multiple processes. 

a process usually starts with a single thread but down the line can execution it can create multiple threads.



**sync and async**

task are executed one after the other e.g. giving a task to write a letter to your mom and a letter to your friend


async : when one task get executed, you could switch to a diff task without waiting for the previous to get completed.


* sync and Async are *programming models*


### Synchronous and Asynchronous in a single and multi-threaded environment

# Synchronous
single threads : Each task gets executed one after another. Each task waits for its previous task to get executed.

multi threads: Tasks get executed in different threads but wait for any other executing tasks on any other thread.

#Asynchronous
Single Threaded: Tasks start executing without waiting for a different task to finish. At a given time a single task gets executed.

Multi-Threaded: Tasks get executed in different threads without waiting for any tasks and independently finish off their executions.






concurrency and parallelism:
* way tasks are executed

Synchronous and Asynchronous ->
* Programming model.

Single Threaded and Multi-Threaded ->
* The environment of task execution.


async helps to achieve concurrency.
async in a multithread environment is a way to achieve paralleism.


synchronously : This is how we code normally

/** 
you wait for an operation to finish before going to the next or moving over to the other one
**/


----------------------------------------
- concurrency : Threading, async io

- parallelism : multiprocessing
----------------------------------------


Links
https://medium.com/swift-india/concurrency-parallelism-threads-processes-async-and-sync-related-39fd951bc61d

