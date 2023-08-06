+++
title = "Concurrency vs Multi-threading vs Asynchronous Programming"
date = 2022-06-29
[taxonomies]
notec = ["Computer-architecture"]
notet = ["concurrency","parallelism","threads","asynchronous"]
+++

* Concurrency && Parallelism
* Threads (multi-threaded) && Processes
* Synchronous && Asynchronous

### Concurrency && Parallelism

**Concurrency:**

Imagine a task where you have to "sing and eat":

1. Sing for a time
2. Eat for a time

This task is performed concurrently. Concurrency is executing tasks at the same time but not necessarily simultaneously.

Concurrency is handled differently in various processors. In a single core, concurrency is handled via a process called **context-switching**.

**Parallelism:**

Given a task of ***cooking and speaking to a friend over the phone***, these two tasks can be done simultaneously.

> "Parallelism means performing two or more tasks simultaneously. Parallel computing in computer science refers to the process of performing multiple calculations simultaneously."

Concurrency and parallelism refer to computer architectures focused on how tasks or computations are performed:

* In a single core, concurrency happens with tasks executing over the same time period via context switching, i.e. only one task gets executed.
* In a multi-core environment, concurrency can be achieved via parallelism, in which multiple tasks are executed simultaneously.

## Threads & Processes

**Threads:** These are sequences of executing code that can be executed independently of one another. A program can be single-threaded or multi-threaded. It's the smallest unit of a task that can be executed by an OS.

**Processes:** A program is an instance of a running program. A program can have multiple processes. A process usually starts with a single thread but down the line of execution, it can create multiple threads.

**Sync and Async**

Tasks are executed one after the other, e.g. giving a task to write a letter to your mom and a letter to your friend.

**Async:** When one task gets executed, you could switch to a different task without waiting for the previous one to get completed.

* Sync and Async are *programming models*.

### Synchronous and Asynchronous in a Single and Multi-threaded Environment

**Synchronous:**

- Single-threaded: Each task gets executed one after another. Each task waits for its previous task to get executed.
- Multi-threaded: Tasks get executed in different threads but wait for any other executing tasks on any other thread.

**Asynchronous:**

- Single-threaded: Tasks start executing without waiting for a different task to finish. At a given time, a single task gets executed.
- Multi-threaded: Tasks get executed in different threads without waiting for any tasks and independently finish off their executions.

Concurrency and Parallelism:
* The way tasks are executed.

Synchronous and Asynchronous ->
* Programming models.

Single-threaded and Multi-threaded ->
* The environment of task execution.

Async helps to achieve concurrency. Async in a multithread environment is a way to achieve parallelism.

Synchronously: This is how we code normally:

> "You wait for an operation to finish before going to the next or moving over to the other one."

----------------------------------------
- Concurrency: Threading, async I/O
- Parallelism: Multiprocessing
----------------------------------------

Links:
[Medium Article](https://medium.com/swift-india/concurrency-parallelism-threads-processes-async-and-sync-related-39fd951bc61d)