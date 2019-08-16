---
title: Spring Cloud 微服务实战
sidebar: auto
---

## 基础

### 微服务的挑战

* 运维的新挑战
* 接口的一致性
* 分布式的复杂性

### 微服务的九大特性

* 服务组建化
* 按业务组织团队
* 做“产品”的态度
* 智能端点与哑管道
* 去中心化治理
* 去中心化管理数据
* 基础设施自动化
  * 自动化测试
  * 自动化部署
* 容错设计

## Spring boot

### Spring boot的加载顺序

1. 命令行中传入的参数
2. `SPRING_APPLICATION_JSON`中的属性
3. `java:comp/env`中的JNDI属性
4. Java 的系统属性
5. 操作系统的环境变量
6. 通过`random.*`配置的随机属性
7. 位于jar包之外，针对不同`{profile}`环境的配置文件内容
8. 位于当前应用jar包之内，针对不同`{profile}`环境的配置文件内容
9. 位于当前应用jar包之外的`application.properties`和YAML配置内容
10. 位于当前应用jar包之内的`application.properties`和YAML配置内容
11. 在`@Configuration`注解修改的类中，通过`@PropertySource`注解定义的属性
12. 应用默认属性

### 原生端点

* 应用配置类
* 度量指标类
* 操作控制类

## 服务治理

服务治理包含：

* 服务注册中心
* 服务提供者
* 服务消费者

Euraka中有Regoion和 Zone 的概念，一个Regoin可以包含多个Zone，每个服务客户端需要
被注册到一个Zone中，所以每个客户端对应一个Regoin和一个Zone

Jersery是JAX-RS的参考实现：

* 核心服务器
* 核心客户端
* 集成

## 负载均衡

