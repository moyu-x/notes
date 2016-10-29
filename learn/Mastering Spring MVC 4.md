# Mastering Spring MVC 4

## 基础

当有`@SpringBootApplication`注解时候，他已经包含了`@Configuration`、`@EnableAutoConfiguration`、`@ComponentScan`三个注解的作用了

**典型的初始化：**

1. 初始化的配置Spring MVC和DispatcherServlet
2. 配置一个编码配置器，以确保连接请求的编码正确的
3. 配置视图解析器(jsp)
4. 配置静态资源的访问(js,css)
5. 进行国际化配置和资源包
6. 配置文件的上传
7. 配置web服务器和持续集成
8. 配置错误处理

DispatcherServletAutoConfiguration是一个典型的Spring Boot配置文件类：

* 有一个和其他的Spring配置类一样的注解：`@configuration`
* 有关于加载序列的配置
* 也可包含一个提示如`@AutoConfigureAfter`或`@AutoConfigureBefore`去提供更进一步的执行序列的配置
* 在一定条件下启用。

在application.properties中配置spring.view.prefix和spring.view.suffix来配置视图解析器

关于本地资源的两件事情：

* 在classpath中的任意资源文件可以被“webjar”访问
* 我们的静态资源文件可以放置在以下几个文件夹中/META-INF/resources/ , /resources/ , /static/ , or /public/ 

只能有一个本地的处理器，并且允许我们通过spring.mvc.locale来进行配置

可以通过application.properties中使用error.whitelable.enabled来配置错误页面

默认的编码配置为utf-8，但是可以通过配置spring.http.encoding.charset来设置编码格式和spring.http.encoding.enabled来启用自定义的编码格式

默认情况下，Spring Boot默认使用嵌入的Tomcat API

可以使用Tomcat，tc-server，Jetty或者Undertow的web服务器

可以通过server.port来配置http的访问端口

Spring Boot提供的其余三样东西：

* 使用Jackson来处理JSON的序列化，在JacksonAutoConfiguration配置
* 在HttpMessageConvertersAutoConfiguration中有默认的HttpMessageConverters
* 在JmxAutoConfiguration中有JMX的容量

## 结构

MVC结构：

![mvc结构](..\image\mvc结构.png)

An Anemic Model typically exhibits the following symptoms:
• The model is constituted from very simple plain old Java objects (POJOs)
with only getters and setters
• All the business logic is handled inside a service layer
• Validation of the model is found outside this model, for instance, in
controllers

How to avoid domain anemia is explained here:
• The Service layer is good for application-level abstraction like transaction
handling, not business logic.
• Your domain should always be in a valid state. Leave validation inside the
form objects using validators or JSR-303's validation annotations.
• translate the inputs into meaningful domain objects.
• Think of your data layer in term of repositories with domain queries (refer to
Spring Data Specification, for example)
• Decouple your domain logic from the underlying persistence framework
• Use real objects as much as possible. For instance, manipulate the FirstName
class rather than a string.



可以使用`spring.thymeleaf.cache=false`来关闭thyemleaf的cache使用显示

### DispatcherServlet的结构

![DispatcherServlet结构](..\image\DispatcherServlet结构.png)



### Spring Expression Language(SpEL)

![SpEL](..\image\SpEL.png)

### 网页

进行如下配置可以直接使用jQuery和Materialize CSS

```groovy
compile 'org.webjars:materializecss:0.96.0'
compile 'org.webjars:jquery:2.1.4'
```



### application.properities

 Spring Boot will draw properties from several property sources, including the following:

1 Command-line arguments
2 JNDI attributes from java:comp/env
3 JVM system properties
4 Operating system environment variables
5 Randomly generated values for properties prefixed with random.* (referenced
when setting other properties, such as `${random.long} )
6 An application.properties or application.yml file outside of the application

7 An application.properties or application.yml file packaged inside of the
application
8 Property sources specified by @PropertySource
9 Default properties