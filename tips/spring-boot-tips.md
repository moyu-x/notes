---
title: Spring 及 Spring boot 使用过程问题汇总
prev: false
next: false
sidebar: auto
---

## 一、Gradle 使用阿里镜像

在`build.gradle`文件中加入如下配置：

``` groovy
repositories {
    maven {url 'http://maven.aliyun.com/nexus/content/groups/public/'}
}
```

## 二、对`List`中的数据进行验证

如果只是要求`List`中必须有值，使用`@Min`注解就行，如果还需要对其中的元素进行验证，还需要使用`@Valid`进行验证传递
