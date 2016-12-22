# 基本

配置hibernate.cfg.xml：

1. 数据库的配置

2. hibernate的配置

   2.1 数据的连接配置

   2.2 hibernate的方言

   2.3 是否在控制台显示sql语句

   2.4是否对sql语言进行格式化

   2.5 指定自动生成数据表的策略

3. 映射文件的配置

基本的文件

1. 创建一个SessionFactory对象
2. 创建一个Session对象
3. 开启事务
4. 执行保存工作
5. 提交事务
6. 关闭session
7. 关闭SessionFactory对象


# 创建持久化Java类

* 提供一个无参的构造器:使Hibernate可以使用Constructor.newInstance() 来实例化持久化类
* 提供一个标识属性(identifier property): 通常映射为数据库表的主键字段. 如果没有该属性，一些功能将不起作用，如：Session.saveOrUpdate()
* 为类的持久化类字段声明访问方法(get/set): Hibernate对JavaBeans 风格的属性实行持久化。
* 使用非 final 类: 在运行时生成代理是 Hibernate 的一个重要的功能. 如果持久化类没有实现任何接口, Hibnernate 使用 CGLIB 生成代理. 如果使用的是 final 类, 则无法生成 CGLIB 代理.
* 重写 eqauls 和 hashCode 方法: 如果需要把持久化类的实例放到 Set 中(当需要进行关联映射时), 则应该重写这两个方法

java持久化类：Hibernate 不要求持久化类继承任何父类或实现接口，这可以保证代码不被污染。这就是Hibernate被称为低侵入式设计的原因

`<generator class="native">`指定主键的生成方式：native，使用数据库底层的生成方式

## Configuration类

Configuration 类负责管理 Hibernate 的配置信息。包括如下内容：

* Hibernate 运行的底层信息：数据库的URL、用户名、密码、JDBC驱动类，数据库Dialect,数据库连接池等（对应 hibernate.cfg.xml 文件）。
* 持久化类与数据表的映射关系（*.hbm.xml 文件）

创建 Configuration 的两种方式

* 属性文件（hibernate.properties）:`Configuration cfg = new Configuration();`


* Xml文件（hibernate.cfg.xml）:`Configuration cfg = new Configuration().configure();`

* Configuration 的 configure 方法还支持带参数的访问：

  ```java
  File file = new File(“simpleit.xml”);

  Configuration cfg = new Configuration().configure(file);
  ```


## SessionFactory接口

* 针对单个数据库映射关系经过编译后的内存镜像，是线程安全的。 
* SessionFactory 对象一旦构造完毕，即被赋予特定的配置信息
* SessionFactory是生成Session的工厂
* 构造 SessionFactory 很消耗资源，一般情况下一个应用中只初始化一个 SessionFactory 对象。
* Hibernate4 新增了一个 ServiceRegistry 接口，所有基于 Hibernate 的配置或者服务都必须统一向这个 ServiceRegistry  注册后才能生效

## Session接口

Session 是应用程序与数据库之间交互操作的一个单线程对象，是 Hibernate 运作的中心，所有持久化对象必须在 session 的管理下才可以进行持久化操作。此对象的生命周期很短。Session 对象有一个一级缓存，显式执行 flush 之前，所有的持久层操作的数据都缓存在 session 对象处。相当于 JDBC 中的 Connection。

持久化类与 Session 关联起来后就具有了持久化的能力。

Session 类的方法：

* 取得持久化对象的方法： get() load()
* 持久化对象都得保存，更新和删除：save(),update(),saveOrUpdate(),delete()
* 开启事务: beginTransaction().
* 管理 Session 的方法：isOpen(),flush(), clear(), evict(), close()等

## Transction事务

代表一次原子操作，它具有数据库事务的概念。所有持久层都应该在事务管理下进行，即使是只读操作。 
常用方法:

* commit():提交相关联的session实例
* rollback():撤销事务操作
* wasCommitted():检查事务是否提交

## 配置

hbm2ddl.auto：该属性可帮助程序员实现正向工程, 即由 java 代码生成数据库脚本, 进而生成具体的表结构 。取值 create | update | create-drop | validate

* create : 会根据 .hbm.xml  文件来生成数据表, 但是每次运行都会删除上一次的表 ,重新生成表, 哪怕二次没有任何改变 
* create-drop : 会根据 .hbm.xml 文件生成表,但是SessionFactory一关闭, 表就自动删除 
* update : 最常用的属性值，也会根据 .hbm.xml 文件生成表, 但若 .hbm.xml  文件和数据库中对应的数据表的表结构不同, Hiberante  将更新数据表结构，但不会删除已有的行和列 
* validate : 会和数据库中的表进行比较, 若 .hbm.xml 文件中的列在数据表中不存在，则抛出异常

format_sql：是否将 SQL 转化为格式良好的 SQL . 取值 true | false

# Session

## 概述

* Session 接口是 Hibernate 向应用程序提供的操纵数据库的最主要的接口, **它提供了基本的保存, 更新, 删除和加载 Java 对象的方法.**
* **Session 具有一个缓存, 位于缓存中的对象称为持久化对象, 它和数据库中的相关记录对应.** Session 能够在某些时间点, 按照缓存中对象的变化来执行相关的 SQL 语句, 来同步更新数据库, 这一过程被称为刷新缓存(flush)
* **站在持久化的角度, Hibernate 把对象分为 4 种状态: 持久化状态, 临时状态, 游离状态, 删除状态. Session 的特定方法能使对象从一个状态转换到另一个状态.** 

## 缓存

 在 Session 接口的实现中包含一系列的 Java 集合, 这些 Java 集合构成了 Session 缓存. 只要 Session 实例没有结束生命周期, 且没有清理缓存，则存放在它缓存中的对象也不会结束生命周期
Session 缓存可减少 Hibernate 应用程序访问数据库的频率。

`flush()`：是数据表中的记录和Session缓存中的对象的状态保持一致，为了保持一致，则可能发送对于的SQL语句

1. 调用Transction的commit方法中：先调用session的flush方法，在提交事务
2. flush方法可能发送SQL语句，但不会提交事务

注意：

1. 在未提交事务或显示调用`session.flush()`方法之前，也有可能会进行`flush()`操作:执行HQL或QBC查询，会先进行flush()操作，已得到数据库最新的记录；若记录ID使用底层数据库使用自增方式生成的，则在调用save()方法时，就会立即发送INSERT语句，必须保证对象的ID是存在的

## flush缓存

flush：Session 按照缓存中对象的属性变化来同步更新数据库
默认情况下 Session 在以下时间点刷新缓存：

* 显式调用 Session 的 flush() 方法
* 当应用程序调用 Transaction 的 commit（）方法的时, 该方法先 flush ，然后在向数据库提交事务
* 当应用程序执行一些查询(HQL, Criteria)操作时，如果缓存中持久化对象的属性已经发生了变化，会先 flush 缓存，以保证查询结果能够反映持久化对象的最新状态

flush 缓存的例外情况: 如果对象使用 native 生成器生成 OID, 那么当调用 Session 的 save() 方法保存对象时, 会立即执行向数据库插入该实体的 insert 语句.

commit() 和 flush() 方法的区别：flush 执行一系列 sql 语句，但不提交事务；commit 方法先调用flush() 方法，然后提交事务. 意味着提交事务意味着对数据库操作永久保存下来。

refresh会强制发送select语句，以使session缓存中对象的状态和数据表中的数据保持一致

## 数据库的隔离级别

对于同时运行的多个事务, 当这些事务访问数据库中相同的数据时, 如果没有采取必要的隔离机制, 就会导致各种并发问题:

* 脏读: 对于两个事物 T1, T2, T1 读取了已经被 T2 更新但还没有被提交的字段. 之后, 若 T2 回滚, T1读取的内容就是临时且无效的.
* 不可重复读: 对于两个事物 T1, T2, T1 读取了一个字段, 然后 T2 更新了该字段. 之后, T1再次读取同一个字段, 值就不同了.
* 幻读: 对于两个事物 T1, T2, T1 从一个表中读取了一个字段, 然后 T2 在该表中插入了一些新的行. 之后, 如果 T1 再次读取同一个表, 就会多出几行.

数据库事务的隔离性: 数据库系统必须具有隔离并发运行各个事务的能力, 使它们不会相互影响, 避免各种并发问题. 
一个事务与其他事务隔离的程度称为隔离级别. 数据库规定了多种事务隔离级别, 不同隔离级别对应不同的干扰程度, 隔离级别越高, 数据一致性就越好, 但并发性越弱

Oracle 支持的 2 种事务隔离级别：READ COMMITED, SERIALIZABLE. Oracle 默认的事务隔离级别为: READ COMMITED 
Mysql 支持 4 中事务隔离级别. Mysql 默认的事务隔离级别为: REPEATABLE READ

### 在 MySql 中设置隔离级别

每启动一个 mysql 程序, 就会获得一个单独的数据库连接. 每个数据库连接都有一个全局变量 @@tx_isolation, 表示当前的事务隔离级别. MySQL 默认的隔离级别为 Repeatable Read
查看当前的隔离级别: SELECT @@tx_isolation;
设置当前 mySQL 连接的隔离级别:  

* set transaction isolation level read committed;

设置数据库系统的全局的隔离级别:

* set global transaction isolation level read committed;

### 在 Hibernate 中设置隔离级别

JDBC 数据库连接使用数据库系统默认的隔离级别. 在 Hibernate 的配置文件中可以显式的设置隔离级别. 每一个隔离级别都对应一个整数:
1. READ UNCOMMITED
2. READ COMMITED
3. REPEATABLE READ
4. SERIALIZEABLE

Hibernate 通过为 Hibernate 映射文件指定 hibernate.connection.isolation 属性来设置事务的隔离级别

