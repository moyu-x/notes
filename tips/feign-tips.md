---
title: Feign 使用问题汇总
prev: false
next: false
sidebar: auto
---

## 一、查看日志

首先都要将日志的级别设置为`DEBUG`才行，需要将工程的包目录设置成`DEBUG`级别的日志，然后再进行接下来的操作，两种任选一种：

### 修改代码方式

```java
    @Bean
    Logger.Level feignLoggerLevel() {
        return Logger.Level.FULL;
    }
```

### 修改配文件方式

```yaml
feign:
    client:
        config:
            default:
                loggerLevel: full
```
