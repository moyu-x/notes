# Spring boot

## 基础

spring-boot-starter：核心模块，包括自动化配置支持，日志和YAML

spring-boot-test：测试模块

配置文件位于application.properties或application.yml中

配置文件的用处：

1. 自定义的属性与加载——在配置文件定义完成之后使用`@Value(${属性名})`进行使用
2. 参数间的引用
3. 使用随机数——可以使用${random}来产生int值，long值或值String字符串
4. 可以通过命令行设置属性值
5. 多环境配置

在配置文件中通过spring.profile.active属性来设置对应的profile值

@RestController：Spring4新加注解，取代之前的@Controller和@RequestBody配合返回JSON的写法

## 文档注释

使用Swagger2构建API文档的步骤：

1. 添加Swagger2依赖
2. 创建Swagger2的配置类——在Application.java同级别下创建配置类Swagger2，，通过`@Configuration`注解，让Spring来加载该类配置。再通过`@EnableSwagger2`注解来启用Swagger2。再通过`createRestApi`函数创建`Docket`的Bean之后，`apiInfo()`用来创建该Api的基本信息（这些基本信息会展现在文档页面中）。`select()`函数返回一个`ApiSelectorBuilder`实例用来控制哪些接口暴露给Swagger来展现，本例采用指定扫描的包路径来定义，Swagger会扫描该包下所有Controller定义的API，并产生文档内容（除了被`@ApiIgnore`指定的请求）。
3. 添加上文档
   1. 通过@ApiOption注解来个API增加说明
   2. 通过`@ApiImplicitParams`、`@ApiImplicitParam`注解来给参数增加说明。

## 统一异常处理

1. 创建全局异常处理类：通过使用`@ControllerAdvice`定义统一的异常处理类，而不是在每个Controller中逐个定义。`@ExceptionHandler`用来定义函数针对的异常类型，最后将Exception对象和请求URL映射到`error.html`中
2. 实现error.html页面

我们只需要在Controller中抛出Exception，当然我们可能会有多种不同的Exception。然后在@ControllerAdvice类中，根据抛出的具体Exception类型匹配@ExceptionHandler中配置的异常类型来匹配错误映射和处理。

返回JSON格式：

本质上，只需在`@ExceptionHandler`之后加入`@ResponseBody`，就能让处理函数return的内容转换为JSON格式。

## 使用JdbcTemplate访问数据库

数据源的配置：

1. 连接数据库
2. 在application.properties中配置数据源信息
3. 使用JdbcTemplate操作数据库





