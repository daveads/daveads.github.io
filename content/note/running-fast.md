+++
title = "running fast"
date = 2022-06-29
[taxonomies]
notec = ["Computer-architecture"]
notet = ["concurrency","parallelism"]
+++

### language features 

Concurrency and Parallelism

Parallelism: Performing multiple operations at the same time. This is hardware-related and takes advantage of the multi-core infrastructure of the CPU.

Concurrency: When two tasks can start, run, and complete in overlapping time periods. It takes advantage of CPU time slicing.

Concurrency is achieved through multithreading. Multithreading is a software implementation allowing different threads to be executed concurrently. A multithreaded program appears to be doing several things at the same time even when it's running on a single-core machine.

Synchronous: Tasks are performed one at a time, and you need to wait for one task to finish before moving to the next.

Asynchronous: Can move to another task before the previous one finishes. This is not related to concurrency and parallelism and means that your program performs non-blocking operations.

Async I/O: Async is a concurrent programming design, using async/await.

Threading: This is a concurrent execution model where multiple threads take turns to execute tasks.

Terminology: 

- Threading
- Locking
- Mutex
- Thread Safety

Issues involved with multithreading:

- Deadlock
- Race conditions
- Starvation
- Livelock