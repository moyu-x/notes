# 一 Hibernate 5的介绍

![Hibernate的角色](../Image/BeginningHibernate/Hibernate的角色.jpg)

Hibernate要求所有的POJO提供默认的构造函数，但是当第三方类库不能满足这个有限的要求时它还能正常的工作。

Hibernate Query Language（HQL）：是非常强大的，但是使用不顺畅的

当我们实现是，Hibernate需要做一些事情来告诉他哪个表关联哪个对象。

事实上，如果我们仅使用Hibernate，我们是不需要知道表的名字的，Hibernate会自动通过正确的表名构造查询

# 二 集成和配置Hibernate

配置Hibernate的步骤：

1. 定义一个数据库表示的POJO
2. 确定这些POJO的哪些属性需要被持久化
3. 注解每个POJO，并将java对象的属性配置到一个数据表中的列中
4. 通过模式导出工具创建数据库模式，使用已经存在的数据库或者创建一个你自己的数据库
5. 添加Hibernate的包到你的应用程序的classpath中
6. 创建Hibernate XML配置文件配置你的数据库和你的映射类
7. 在你的Java程序中，创建Hibernate的配置类引用你的配置文件
8. 当然也可以在你的Java程序中从配置对象中创建一个Hibernate SessionFactory 对象
9. 从SessionFactory中检索Hibernate Session对象，和书写你应用程序的数据访问实现逻辑


`@BeforeSuite`方法会在所有的测试前背执行，它给我么一个进行系统初始化的机会。

规范的使用Hibernate自有API：

1. 构造一个SessionFactory，这是Hibernate API的入口点
2. 使用SessionFactory检索短暂的Session对象并通过他执行更新或读取

我们使用自动的资源管理器确保在语句块执行结束的时候关闭它们

# 三 创建一个简单的应用程序

