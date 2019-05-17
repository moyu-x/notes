---
title: Jooq 使用问题汇总
prev: false
next: false
sidebar: auto
---

## 一、 查看日志

在使用`Spring boot`的时候，查看日志可以在`bootstrap.yml`中加入如下配置：

``` yaml
logging:
  level:
    org.jooq.tools.LoggerListener: debug
```

## 二、Java8 时间问题

当使用`JPA`生成实体的时候，使用到`Java8`的时间，会出现`Record`转换不对的情况，这个时候在配置文件中加入如下配置：

``` xml
<generate>
  <javaTimeTypes>true</javaTimeTypes>
</generate>
```
