# Bean基础

使用Bean：

1. 读取spring的配置文件
2. 获取配置的bean
3. 调用方法

配置bean：

* class：bean的全类名，通过反射的方式在IOC容器中创建Bean，所有要求Bean中必须有无参的构造器
* id：标识容器中bean，id唯一，在 IOC 容器中必须是唯一的若 id 没有指定，Spring 自动将权限定性类名作为 Bean 的名字id 可以指定多个名字，名字之间可用逗号、分号、或空格分隔

ApplicationContext代表IoC容器

spring中提供了两种类型的IoC容器实现：

* BeanFactory: IOC 容器的基本实现.
* ApplicationContext: 提供了更多的高级特性. 是 BeanFactory 的子接口.

BeanFactory 是 Spring 框架的基础设施，面向 Spring 本身；ApplicationContext 面向使用 Spring 框架的开发者，几乎所有的应用场合都直接使用 ApplicationContext 而非底层的 BeanFactory无论使用何种方式, 配置文件时相同的

ApplicationContext 的主要实现类：

* ClassPathXmlApplicationContext：从 类路径下加载配置文件
* FileSystemXmlApplicationContext: 从文件系统中加载配置文件

ConfigurableApplicationContext 扩展于 ApplicationContext，新增加两个主要方法：refresh() 和 close()， 让 ApplicationContext 具有启动、刷新和关闭上下文的能力ApplicationContext 在初始化上下文时就实例化所有单例的 Bean。WebApplicationContext 是专门为 WEB 应用而准备的，它允许从相对于 WEB 根目录的路径中完成初始化工作

# 依赖注入

## 基本

Spring 支持 3 种依赖注入的方式

* 属性注入
* 构造器注入
* 工厂方法注入（很少使用，不推荐）

使用构造器注入属性值可以指定参数的位置和参数的类型，以区分重载的类型

字面值：

* 字面值：可用字符串表示的值，可以通过` <value> `元素标签或 value 属性进行注入。
* 基本数据类型及其封装类、String 等类型都可以采取字面值注入的方式
* 若字面值中包含特殊字符，可以使用 <![CDATA[]]> 把字面值包裹起来

可以使用property的ref属性建立bean之间的引用关系，也可以使用`<ref>`子标签来建立此种关系

内部bean不能被外部引用，只能在内部使用

可以使用专用的` <null/> `元素标签为 Bean 的字符串或其它对象类型的属性注入 null 值

为级联属性赋值，注意：属性需要先初始化后才可以级联属性赋值，否则会有异常，和struts2不同

## 集合

集合属性：在 Spring中可以通过一组内置的 xml 标签(例如:` <list>`, `<set>` 或 `<map>`) 来配置集合属性.
配置 java.util.List 类型的属性, 需要指定` <list> ` 标签, 在标签里包含一些元素. 这些标签可以通过 `<value> `指定简单的常量值, 通过 `<ref> `指定对其他 Bean 的引用. 通过`<bean> `指定内置 Bean 定义. 通过 `<null/>` 指定空元素. 甚至可以内嵌其他集合.数组的定义和 List 一样, 都使用` <list>`配置 java.util.Set 需要使用 `<set> `标签, 定义元素的方法与 List 一样.Java.util.Map 通过 `<map> `标签定义,` <map> `标签里可以使用多个` <entry>` 作为子标签. 每个条目包含一个键和一个值. 必须在 `<key> `标签里定义键因为键和值的类型没有限制, 所以可以自由地为它们指定` <value>`, `<ref`, `<bean>` 或 `<null>` 元素. 可以将 Map 的键和值作为` <entry> `的属性定义: 简单常量使用 key 和 value 来定义; Bean 引用通过 key-ref 和 value-ref 属性定义使用` <props>` 定义 java.util.Properties, 该标签使用多个 <prop> 作为子标签. 每个` <prop>` 标签必须定义 key 属性

使用map节点及猫的entry子节点配置Map类型成员变量

配置单例的集合bean，以供多个bean进行引用，需要导入util命名空间

通过p命名空间位bean的属性赋值，需要先导入p命名空间，相对于传统的配置方式更加简洁

## 自动装配

Spring IOC 容器可以自动装配 Bean. 需要做的仅仅是在` <bean> `的 autowire 属性里指定自动装配的模式:

* byType(根据类型自动装配): 若 IOC 容器中有多个与目标 Bean 类型一致的 Bean. 在这种情况下, Spring 将无法判定哪个 Bean 最合适该属性, 所以不能执行自动装配.若IoC容器中有1个以上的匹配类型的bean，则抛异常
* byName(根据名称自动装配): 必须将目标 Bean 的名称和属性名设置的完全相同.更加bean的名字和当前bean的setter风格的属性名进行自动装配，若有匹配的，则进行进行自动装配，反之则不装配
* constructor(通过构造器自动装配): 当 Bean 中存在多个构造器时, 此种自动装配方式将会很复杂. **不推荐使用**

自动装配的缺点：

* 在 Bean 配置文件里设置 autowire 属性进行自动装配将会装配 Bean 的所有属性. 然而, 若只希望装配个别属性时, autowire 属性就不够灵活了. 
* autowire 属性要么根据类型自动装配, 要么根据名称自动装配, 不能两者兼而有之.
* 一般情况下，在实际的项目中很少使用自动装配功能，因为和自动装配功能所带来的好处比起来，明确清晰的配置文档更有说服力一些


## 继承

bean配置的继承：使用bean的parent属性指定继承哪个bean的配置

抽象bean：bean的abstract属性为true的bean，这样的bean不能被IoC容器实例化，只用来被继承配置，若某一个bean的class属性没有指定，则该bean必须是一个抽象bean

Spring 允许用户通过 depends-on 属性设定 Bean 前置依赖的Bean，前置依赖的 Bean 会在本 Bean 实例化之前创建好。如果前置依赖于多个 Bean，则可以通过逗号，空格或的方式配置 Bean 的名称

## 作用域

使用bean的scope属性配置bean的作用域：

* singleton：默认值，容器初始时创建bean实例，在整个容器的生命周期只创建一个实例
* prototype：原型的，容器初始化时不创建bean的实例，而在每次请求时都创建一个新的实例并返回

在配置文件里配置 Bean 时, 有时需要在 Bean 的配置里混入系统部署的细节信息(例如: 文件路径, 数据源配置信息等). 而这些部署细节实际上需要和 Bean 配置相分离
Spring 提供了一个 PropertyPlaceholderConfigurer 的 BeanFactory 后置处理器, 这个处理器允许用户将 Bean 配置的部分内容外移到属性文件中. 可以在 Bean 配置文件里使用形式为` ${var} `的变量, PropertyPlaceholderConfigurer 从属性文件里加载属性, 并使用这些属性来替换变量.Spring 还允许在属性文件中使用` ${propName}`，以实现属性之间的相互引用。

导入属性文件，使用外部化属性文件的属性，通过`<context:property-placeholder>`进行属性文件的指定，在引用处引用属性文件

## SpEL表达式

SpEL：

1. 为属性配置一个字面值
2. 引用其他对象
3. 引用其他对象的属性
4. 调用其他方法，还可以链式操作
5. 算术运算符：+、-、*、/、%、^
6. 加号还可以用作字符串连接符
7. 比较运算符：<、>、==、>=、lt、gt,、eq、le,、 ge
8. 逻辑运算符：and、or、not
9. `boolException ? true : false`表达式及其变式
10. 正则表达式
11. 调用静态方法或静态属性
12. 使用SpEL引用类的静态属性
13. 引用其他bean的属性

## bean的生命周期

Spring IOC 容器可以管理 Bean 的生命周期, Spring 允许在 Bean 生命周期的特定点执行定制的任务

Spring IOC 容器对 Bean 的生命周期进行管理的过程:

1. 通过构造器或工厂方法创建 Bean 实例
2. 为 Bean 的属性设置值和对其他 Bean 的引用
3. 调用 Bean 的初始化方法
4. Bean 可以使用了
5. 当容器关闭时, 调用 Bean 的销毁方法

在 Bean 的声明Bean 后置处理器允许在调用初始化方法前后对 Bean 进行额外的处理.
Bean 后置处理器对 IOC 容器里的所有 Bean 实例逐一处理, 而非单一实例. 其典型应用是: 检查 Bean 属性的正确性或根据特定的标准更改 Bean 的属性.里设置 init-method 和 destroy-method 属性, 为 Bean 指定初始化和销毁方法

实现BeanPostProcessor接口，并提供

```java
// init-method之前被调用
Object postProcessBeforeInitialization(Object bean, String beanName);
// init-method之后被调用
Object postProcessAfterInitialization(Object bean, String beanName);
// bean:bean实例本身
// beanName：IoC容器配置的bean的名字
// 返回值：是实际上放回给用户的那个bean，注意：可以在以上两个方法中修改返回的bean，甚至返回一个新bean
```

配置bean的后置处理器，不需配置id，IoC容器自动识别是一个BeanPostProcessor

## 其他调用bean的方法

静态工厂方法：直接调用某一个类的静态方法就可以返回bean的实例

通过静态工厂方法来配置bean，猪儿不是配置静态工厂方法实例，而是配置bean实例

调用静态工厂方法创建 Bean是将对象创建的过程封装到静态方法中. 当客户端需要对象时, 只需要简单地调用静态方法, 而不同关心创建对象的细节.
要声明通过静态方法创建的 Bean, 需要在 Bean 的 class 属性里指定拥有该工厂的方法的类, 同时在 factory-method 属性里指定工厂方法的名称. 最后, 使用 <constrctor-arg> 元素为该方法传递方法参数.

实例工厂方法: 将对象的创建过程封装到另外一个对象实例的方法里. 当客户端需要请求对象时, 只需要简单的调用该实例方法而不需要关心对象的创建细节

实例工厂方法，即需要创建工厂本身，在调用工厂方法来放回bean的实例

自定义的BeanFactory需要实现BeanFactory接口

## 自动配置

接受的注解：

* `@Component`: 基本注解, 标识了一个受 Spring 管理的组件
* `@Respository`: 标识持久层组件
* `@Service`: 标识服务层(业务层)组件
* `@Controller`: 标识表现层组件

对于扫描到的组件, Spring 有默认的命名策略: 使用非限定类名, 第一个字母小写. 也可以在注解中通过 value 属性值标识组件的名称

`<context:component-scan> `扫描需要的包，需要多个包是使用逗号分隔

`<context:include-filter> `子节点表示要包含的目标类

`<context:exclude-filter> `子节点表示要排除在外的目标类

`<context:component-scan> `下可以拥有若干个` <context:include-filter> `和` <context:exclude-filter> `子节点

`<context:component-scan> `元素还会自动注册 AutowiredAnnotationBeanPostProcessor 实例, 该实例可以自动装配具有 @Autowired 和 @Resource 、@Inject注解的属性.

@Autowired 注解自动装配具有兼容类型的单个 Bean属性:

* 构造器, 普通字段(即使是非 public), 一切具有参数的方法都可以应用@Authwired 注解
* 默认情况下, 所有使用 @Authwired 注解的属性都需要被设置. 当 Spring 找不到匹配的 Bean 装配属性时, 会抛出异常, 若某一属性允许不被设置, 可以设置 @Authwired 注解的 required 属性为 false
* 默认情况下, 当 IOC 容器里存在多个类型兼容的 Bean 时, 通过类型的自动装配将无法工作. 此时可以在 **@Qualifier 注解里提供 Bean 的名称. Spring 允许对方法的入参标注 @Qualifiter 已指定注入 Bean 的名称**
* @Authwired 注解也可以应用在数组类型的属性上, 此时 Spring 将会把所有匹配的 Bean 进行自动装配.
* @Authwired 注解也可以应用在集合属性上, 此时 Spring 读取该集合的类型信息, 然后自动装配所有与之兼容的 Bean. 
* @Authwired 注解用在 java.util.Map 上时, 若该 Map 的键值为 String, 那么 Spring 将自动装配与之 Map 值类型兼容的 Bean, 此时 Bean 的名称作为键值

@Resource 注解要求提供一个 Bean 名称的属性，若该属性为空，则自动采用标注处的变量或方法名作为 Bean 的名称

@Inject 和 @Autowired 注解一样也是按类型匹配注入的 Bean， 但没有 reqired 属性

## 泛型依赖注入

子类会自动继承父类（泛型）的一些依赖关系

# Spring　AOP

问题：

1. 代码混乱：原有的业务方法急剧膨胀.  每个方法在处理核心逻辑的同时还必须兼顾其他多个关注点
2. 代码分散：.如果日志需求发生变化, 必须修改所有模块.

InvacationHandler方法参数：

1. proxy：正在返回的那个代理对象，一般情况下，在invoke方法中都不使用该对象
2. method：正在被调用的方法
3. args：调用方法时，传入的参数

## 术语

* 切面(Aspect):  横切关注点(跨越应用程序多个模块的功能)被模块化的特殊对象
* 通知(Advice):  切面必须要完成的工作
* 目标(Target): 被通知的对象
* 代理(Proxy): 向目标对象应用通知之后创建的对象
* 连接点（Joinpoint）：程序执行的某个特定位置：如类某个方法调用前、调用后、方法抛出异常后等。连接点由两个信息确定：方法表示的程序执行点；相对点表示的方位。例如 ArithmethicCalculator#add() 方法执行前的连接点，执行点为 ArithmethicCalculator#add()； 方位为该方法执行前的位置
* 切点（pointcut）：每个类都拥有多个连接点：例如 ArithmethicCalculator 的所有方法实际上都是连接点，即连接点是程序类中客观存在的事务。AOP 通过切点定位到特定的连接点。类比：连接点相当于数据库中的记录，切点相当于查询条件。切点和连接点不是一对一的关系，一个切点匹配多个连接点，切点通过 org.springframework.aop.Pointcut 接口进行描述，它使用类和方法作为连接点的查询条件。

## 切面编程

将一个类声明为切面：需要把该类放入到IoC容器中，再声明为一个切面

`<aop:aspectj-autoproxy/>`将自动的为匹配到的切点增加切面内容

要在 Spring 中声明 AspectJ 切面, 只需要在 IOC 容器中将切面声明为 Bea在 AspectJ 注解中, 切面只是一个带有 @Aspect 注解的 Java 类. 通知是标注有某种注解的简单的 Java 方法.n 实例. 
AspectJ 支持 5 种类型的通知注解: 

* @fore: 前置通知, 在方法执行之前执行
* @After: 后置通知, 在方法执行之后执行 
* @AfterRunning: 返回通知, 在方法返回结果之后执行
* @AfterThrowing: 异常通知, 在方法抛出异常之后
* @Around: 环绕通知, 围绕着方法执行

可以在通知方法中声明一个类型为 JoinPoint 的参数. 然后就能访问链接细节. 如方法名称和参数值.

后置通知是在连接点完成之后执行的, 即连接点返回结果或者抛出异常的时候, 下面的后置通知记录了方法的终止. 
一个切面可以包括一个或者多个通知

后置通知中不能访问目标方法的执行结果

返回通知可以方位结果

异常通知：可以访问到异常对象，且可以指定在出现特定异常时在执行通知代码

环绕通知需要携带ProceedingsJoinPoint类型参数，环绕通知类似于动态代理的全过程，ProceedingsJoinPoint类型参数可以决定是否执行目标方法，且环绕通知必须有放回值，放回值即为目标方法的返回值

可以使用@Order注解指定切面的优先级，值越小，优先级越高

## 重用切点表达式

定义一个方法，用于声明切入点表达式，一般地，该方法中不在需要添如其他代码

使用@Pointcut来声明切入点表达式

后面的其他通知直接使用方法名来引用当前的切入点表达式

##  基于XML配置的方式



