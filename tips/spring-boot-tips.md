---
title: Spring 及 Spring boot 使用过程问题汇总
prev: false
next: false
sidebar: auto
---

## Gradle 使用阿里镜像

在`build.gradle`文件中加入如下配置：

```groovy
repositories {
    maven {url 'http://maven.aliyun.com/nexus/content/groups/public/'}
}
```

## 对`List`中的数据进行验证

如果只是要求`List`中必须有值，使用`@Min`注解就行，如果还需要对其中的元素进行验证，还需要使用`@Valid`进行验证传递

## Feign From 的使用

建立一个`feign`的配置文件，并在其中写入如下代码：

``` kotlin
@Bean
fun encoder(): Encoder {
    return FormEncoder()
}
```

然后在请求到接口上加入`consumes = [MediaType.APPLICATION_FORM_URLENCODED_VALUE]`，
对于请求到参数，使用`model`进行封装，然后使用`map`封装请求参数

## feign 在 spring boot 2.0 中提示错误

当使用 `Spring boot 2.0` 的时候，idea 会提示无法注入，这个时候在`client`中加入
`@Component`注解就可以了

## 自动注入冲突

在使用`Spring boot 2.0`的时候，有可能会出现多个自动配置到`Bean`冲突到情况，这个
时候可以将不需要注入到`Bean`加入到`spring.autoconfigure.exclude`中就可以了，例如
`consul`和`kubernetes`冲突到情况，可以用如下设置：

``` yaml
spring:
  autoconfigure:
    exclude:
      - org.springframework.cloud.kubernetes.discovery.KubernetesDiscoveryClientAutoConfiguratio
```

## lombok 在 IDE 提示报错到情况

当出现lombok报错的时候，在 peferences -> build -> annotation processors 中设置

## feign 的 name 同名提示报错

当在`Spring boot 2.0`使用`feign`的时候，使用`Bean`提示如下错误：

``` txt
Description:

The bean Bean 的名称, defined in null, could not be registered. A bean with that name has already been defined in null and overriding is disabled.

Action:

Consider renaming one of the beans or enabling overriding by setting spring.main.allow-bean-definition-overriding=tru
```

此时，可以考虑如下两个解决办法：

1. 在配置文件中加入运行使用同名`Bean`的配置

    ``` yaml
    spring:
      main:
        allow-bean-definition-overriding: true
    ```

2. 将每个`Bean`配置成不同的名称

## Java 和 Kotlin 类型不兼容

在使用spring data redis允许lua脚本的时候会出现返回值是Int，然后在kotlin中出现了类型不兼容的情况，这是因为kotlin中的Long指向的是Java中的long，并且在接口上做了不可以为空判定，大部分情况下是可以兼容的，但是spring框架类中使用了反射强制获取了Java中的Long类型，也就是在获取包装类型的情况下，只能强制指定返回的类型为包装类习惯，这是因为在不指定的话默认的类型转换是不可空的，如下

``` kotlin
java.lang.Long
java.lang.Long::class.java
```

## 简单的分布式锁的实现

实现分布式锁最简单的方式就是在reids中执行lua脚本，因为lua是单进程执行的，在不是集群部署的情况下实现一个分布式锁或者进行分布式限流相对来说是比较简单的。当在系统部署的时候使用了集群的方式，应该考虑的是数据在每个slot中同步的问题，一个简单的解决办法是在少数节点只进行写入操作，在多数节点进行写操作。在spring中，使用spring data redis对大部分的redis操作进行了封装，并且可以在使用集群的情况下设置写入节点和读取节点，然后在其中对数据进行处理，所有的后续操作都要等到redis中的数据真实有效变更后才能进行后续操作

## Git 重置所有提交记录

基本思想是新建一个分支,然后把本地的master分支删了,然后重命名当前分支,具体操作如
下:

``` bash
# 新建分支
git checkout --orphan latest_branch

# 进行提交
git add -A
git commit -am "commit message"

# 删除master分支
git branch -D master

# 重命名当前分支
git branch -m master

# 按需进行强制提交
git push -f origin master
```

## Consul 和 Kubernetes 同时使用时候冲突的解决

`Spring boot`的一个功能就是提供了大量的自动配置，当多种同类型的自动配置进行加载的时候，就会出现冲突，继而导致应用不能启动，这个时候就需要在系统中根据不同的环境加载不同的配置文件，`Spring boot`提供了不加载某些自动配置的配置项，下面以不加载`Consul`，而使用`Kubernetes`为例:

``` yml
spring:
    autoconfigure:
        exclude:
            - org.springframework.cloud.consul.serviceregistry.ConsulAutoServiceRegistrationAutoConfiguration
```
