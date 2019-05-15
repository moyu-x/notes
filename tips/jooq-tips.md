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
    org:
      jooq:
        tools:
          LoggerListener: debug
```
