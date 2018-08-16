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
