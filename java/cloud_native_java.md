---
title: Cloud Native Java
footer: MIT Licensed | Copyright © 2018-present idwangmo
prev: /
sidebar: auto
---

# Cloud Native Java

## 第一章

![Cloud computing stack](./imgs/cloud_native_java/cloud_computing_stack.png)

源码仓库要能存下一整个程序的信息和他的相关依赖，并且不需要在各个环境中重新编译或打包代码

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
12. 将管理/管理任务作为一次性流程运行

## 第二章

### AOP

切点描述了应用内部的匹配方式

在含有`@Configuration`的应用程序配置类中加入`@EnableAspectJAutoProxy`，然后我们只需要将横切面转换成一个类，并在方法上面加入注解就行

将`@EnableTransactionManagement`添加到配置类中，然后使用`@Transaction`注释划定业务服务的事务边界。

在Spring boot中，提供默认和高可用的配置是最高优先级

Spring boot实现了开闭原则：对扩展开放，但是对修改关闭

当需要对Spring boot进行调试时候，可以再Spring boot应用启动时候加入`--Debug=true`

## 第三章

`@PropertySource`将可以是Spring从文件中加载配置文件，特别是以类似于以前版本的Spring属性占位符解析的方式

`@Value`注解提供了一种将环境变量注入到构造器，setter及属性中的方法

Spring boot也会自动的加载`.yml`配置文件

Spring允许映射所有的配置到POJO类似的配置当中

`@EnableConfigurationProperties`注解将让Spring映射配置到有`@ConfigurationProperties`注解的POJO上

在Spring Cloud系统中运行时，Spring boot应用程序需要一个唯一的名字，这个名字最好容易记住

在有配置的注解的类上加入`@RefreshScope`注解，可以让Spring boot应用程序自动更新配置

所有刷新范围的Bean都将在收到Spring应用程序上下文的`RefreshScopeRefreshedEvent`类型的时间后进行更新

Spring Cloud Bus支持刷新多个应用程序上下文实例

Spring Cloud Stream支持不同的消息技术
