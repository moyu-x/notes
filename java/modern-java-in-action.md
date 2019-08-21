# Modern Java in Action

## chapter 1

`Stream<T>` is a sequence of items of type `T`

languages need to evolve to track changing hardware or programmer expectations

Methods and lambdas as first-class citizens

new Streams API behaves similarly to Java’s existing Collections API: both provide access to sequences of data items.

Parallelism in Java and no shared mutable state：

-   the library handles partitioning—breaking down a big stream into several smaller streams to be processed in parallel for you
-   his parallelism almost for free from streams, works only if the methods passed to library methods like filter don’t interact. But it turns out that this restriction feels natural to a coder
