---
title: Cloud Native Java
footer: MIT Licensed | Copyright © 2018-present idwangmo
prev: /
sidebar: auto
---

## 第一章

![Cloud computing stack](./imgs/cloud_native_java/cloud_computing_stack.png)

源码仓库要能存下一整个程序的信息和他的相关依赖，并且不需要在各个环境中重新编译
或打包代码

![Codebase](./imgs/cloud_native_java/codebase.png)

1. 一个代码库在一个版本控制库中，能在多个环境中部署
2. 明确的声明和隔离依赖
3. 将配置文件放入到环境中：应用成员应该严格的根据配置划分
4. 将支持的服务视为附加资源
5. 严格的分卡构建阶段和运行阶段
6. 将应用程序视为一个或多个无状态进程
7. 通过特定的端口暴露服务
8. 通过流程模型横线扩展
9. 通过快速启动和正常的
10. 尽可能的保证开发，预发和生成的一致
11. 将日志视为一个事件流
12. 将管理 / 管理任务作为一次性流程运行

## 第二章

`Spring`框架的`Assert`类支持契约式设计而不仅仅用于单元测试。

可以在一个类中创建所有的对象，并建立他们之间的联系，这个原理被称为反转控制（IOC)。

可以创建只依赖基础类型和接口的组建代码，而不依赖于特定的实现，这被称为依赖注入（DI）。

切点描述了应用内部的匹配方式

在含有`@Configuration`的应用程序配置类中加入`@EnableAspectJAutoProxy`，然后我们只需要将横切面转换成一个类，并在其上加入`@Aspect`注解

将`@EnableTransactionManagement`添加到配置类中，然后使用`@Transactional`注解划定业务服务的事务边界。

在`Spring boot`中，提供默认和高可用的配置是最高优先级，约定优于配置

Spring boot 实现了开闭原则：对扩展开放，但是对修改关闭

当需要对 Spring boot 进行调试时候，可以再 Spring boot 应用启动时候加入`--Debug=true`，这会打印出当前的所有配置项

## 第三章

### Spring 框架对配置的支持

[十二要素程序宣言](https://12factor.net/)

`Enviornment`接口提供了运行中应用程序及其运行时环境之间的隔离，并允许应用程序提出关于环境的问题。

`@PropertySource`将可以是 Spring 从文件中加载配置文件，特别是以类似于以前版本的 Spring 属性占位符解析的方式

`Profile`可以用来描述从一个环境变化到另一个环境的 bean 和 bean 图

`@Value`注解提供了一种将环境变量注入到构造器，setter 及属性中的方法

命令行参数会覆盖由`JNDI`提供的属性值，而`JNDI`的属性值又会覆盖由`System.getProperties()`提供的属性值

Spring boot 也会自动的加载`.yml`配置文件

Spring 允许映射所有的配置到 POJO 类似的配置当中

`@EnableConfigurationProperties`注解将让 Spring 映射配置到有`@ConfigurationProperties`注解的 POJO 上

### Spring Cloud

在 Spring Cloud 系统中运行时，Spring boot 应用程序需要一个唯一的名字，这个名字最好容易记住

在有配置的注解的类上加入`@RefreshScope`注解，可以让 Spring boot 应用程序自动更新配置，自己重新构建`Bean`，在这种情况下，只要触发了`refresh`事件，就会重建其所注解的类，初始化其生命周期，并重新建立`@Value`和`@Autowried`注入。

`Spring`会重新创建所有标记了`@RefreshScope`注解的`bean`，而且是直接丢弃整个`bean`并创建一个新的`bean`

所有刷新范围的 Bean 都将在收到 Spring 应用程序上下文的`RefreshScopeRefreshedEvent`类型的时间后进行更新

`Spring Cloud Bus`支持刷新多个应用程序上下文实例

`Spring Cloud Stream`支持不同的消息技术

对于其他用于常规性、非总线相关处理的实例，可以使用`Sring`限定符注解`@Primary`来进行注解

## 第四章

集成测试的实践侧重于针对一组相互依赖的软件模块编写和执行测试用例。云原生应用应该专注于如何设计集成测试，使它能够在与其他应用软件无关的临时环境中执行

无论采用何种方式，一定确保得向生产环境部署二进制包之前，能够自动的运行所有测试用例。

十二要素程序中的一个重要原则是，应该尽量减少开发环境和生产环境之间的差异

`Mock`对象允许我们隔离测试系统的一部分，通过一种受控的方式，用具有类似测试行为对象来代替实际的对象

端到端测试侧重于从用户角度测试功能

`Spring`中集成测试是指在测试执行期间需要访问`Spring`应用程序的上下文，而单元测试 不需要访问`Spring`应用程序上下文

`@RunWith`注解告诉`JUnit`使用那个测试运行器策略

`@SpringBootTest`注解将指明此类是一个 Spring Boot 的测试类，并且提供了扫描`ContextConfiguration`的支持，并且告诉如何加载 ContextConfiguration。当没有自定义的配置类被扫描到的时候，将会加载在 Spring 框架包中的配置文件。

在集成测试执行的过程中任何测试都需要访问 Spring context，而单元测试的不需要Spring context。

在 Spring boot 程序中，我们需要部署`.jar`文件，所以`@SpringBooTest`支持`webEnvironment`
属性去描述 Spring boot 在程序运行的时候应该怎么配置嵌入式的容器

`@JsonTest`注解运行仅仅是测试 JSON 的序列化和反序列化。

`@DataJpaTest`提供了在使用 Sring data JPA 的项目中进行测试方法。`TestEntityManager`
提供了无需数据库就能与底层数据存储进行交互的方式。

`@RestClientTest`注解可以将一个 service 注解一个实例以及将一个 RestTemplate
注册为自动测试配置的一部分

契约测试始终隐藏生产者 API 的实现

## 第五章

Spring session 是 Servert HTTP Session API 的用 SPI 处理同步的插入式替换。

Servlet API 要求对象必须重新实现 Java 的序列化以此来重写 HTTP Session。

## 第六章

[REST 成熟度模型](https://martinfowler.com/articles/richardsonMaturityModel.html)：

0. The swamp of Pox
1. Resource
2. HTTP verbs
3. Hypermedia controls

基本上，使用例如 Spring MVC 或者 Flask 之类的框架的时候，已经处于第二个级别了

servlet 容器维护着一个 HTTP 请求的线程池

`@ExceptionHandler`处理程序与可能抛出异常的处理程序位于同一个控制器组件中。

错误应该唯一且简明地指示客户端的错误状况并支持自然语言，并且最终解决或着解释错误的发生。

Spring HATEOAS 提供了 VndError 和 VndErrors 来对个别的错误或者错误集进行封装


