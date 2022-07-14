+++
title = "running fast"
date = 2022-06-29
[taxonomies]
notec = ["parallelism"]
notet = ["concurrency","parallelism"]
+++

### language features 


Concurrency and Parallelism

parallelism : performing multiple operations at the same time
// This is hardware related
at the same time using multi-core infrastructure of the cpu



concurrency: when two tasks can start, run, and complete in overlapping time periods. takes advantage of cpu time slicing


//performing more than one task at the same time but not executing two tasks at the same time instant

**concurrency is acheived through multhreading**

Multithreading— This is a software implementation allowing different threads to be executed concurrently. A multithreaded program appears to be doing several things at the same time even when it’s running on a single-core machine.



Synchronous -: task are perfromed one at a time
// you need to wait for one task to finish


### Asynchronous
Asynchronous -: can move to other task before the previous one finishes

This is not realated to the concurrency and parallelism. 
This means that your program performs non-blocking operations






#### async io
async is a concurrent programming design 
* async/await


**threading** this are concurrent execution model where by multiple threads takes turns to execute tasks


terminology:
* threading
* Locking
* Mutex
* Thread Safety

## issues involved with multhreading

* Deadlock
* Race conditions
* Starvation
* Livelock

