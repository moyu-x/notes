# Pro Spring Boot

## chapter 3

`@SpringBootApplication`注解包含了以下3个注解的功能：`@ComponentScan`、`@Configuration`和`@EnableAutoConfiguration`

SpringApplication是Spring Boot的入口程序，其引导着Spring Boot软件的执行

可以使用实现`Banner()`接口来在开始Spring Boot程序的时候打印一个标语，数字标语可以在http://patorjk.com/上面进行设计

`SpringApplicationBuilder`提供了一系列流畅的API来对Spring Boot进行设置

Spring Boot 允许你在程序运行前执行代码，可以通过实现ApplicationRunner和CommandLinerRunner的接口来实现

保存程序配置的方式：

* 可以使用名为`application.properties`的文件，这个文件位于classpath的根之下
* 可以使用YAML格式的文件，其文件名为`application.yml`
* 使用环境变量
* 可以使用命令行参数

也可以在需要的配置的参数之上使用`@Value`标签，其中的默认值为配置的标签的内容

spring boot命令行参数的优先级：

* Command-line arguments
* SPRING_APPLICATION_JSON
* JNDI (java:comp/env)
* System.getProperties()
*  OS environment variables
* RandomValuePropertySource (random.*)
* Profile-specific ( application-{profile}.jar ) outside of the package JAR
* Profile-specific ( application-{profile}.jar ) inside of the package JAR
* Application properties ( application.properties ) outside of the package JAR
* Application properties ( application.properties ) inside of the package JAR
* @PropertySource
* SpringApplication.setDefaultProperties

Spring Boot配置文件的位置为以下中的一个：

* 当前文件夹下的`/config`子文件夹
* 当前文件夹下
* 一个classpath或config包
* classpath的根目录下

Spring Boot查找配置文件的顺序：

* classpath
* classpath:/config
* file:
* file:config/

可以通过使用`spring.config.location property`来改变配置文件的存放位置

可以为不同的环境配置不同的配置文件，并且不需要重新书写代码，可以使用以下几种方式来做到：

* `@ActiveProfiles`来标明使用的环境位置
* `SPRING_PROFILES_ACTIVE`环境变量
* `spring.profiles.active`配置

而配置文件的命名方式则为：`application-{profile}.properties `



### 自定义的配置

Spring Boot允许自定义的配置文件，其配置方式为：一个有`@ConfigurationProperties`注解的Java类，对于其中的属性有getter和setter方法，在使用时使用`@Value`注解



