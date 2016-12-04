@Import注解可以引入配置类

@ImportResource注解可以引入xml控制文件



在拥有Spring Boot Devtool的时候可以实现自动重启或自动从新加载，排除资源文件的方法为在application.properties中加入`spring.devtools.restart.exclude`的设置就可以了。当文件不在classpath下时，又需要自动重启的话，可以在文件中加入`spring.devtools.restart.additional-paths`设置

## 关闭重启

当需要关闭自动重启的时候可以使用`spring.devtools.restart.enablded`设置，但是其还是会监视文件的变化，只是不会做出相关的改变而已。而完全关闭则需要在run方法前进行设置，如

```java 
System.setProperty("spring.devtools.restart.enabled","false");
```

## 自定义

当需要在多个模式的（multi-moudle）工程中工作时候，一模式下文件的改变可能无法让另外一个模式下的程序重启，这是就要创建一个`MATE-INF/spring-devtools.properties`文件，这个文件下可以包含使用正则的`restart.exclude`和`restart.include`



