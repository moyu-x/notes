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

Spring 支持 3 种依赖注入的方式

* 属性注入
* 构造器注入
* 工厂方法注入（很少使用，不推荐）

使用构造器注入属性值可以指定参数的位置和参数的类型，以区分重载的类型

字面值：

* 字面值：可用字符串表示的值，可以通过 <value> 元素标签或 value 属性进行注入。
* 基本数据类型及其封装类、String 等类型都可以采取字面值注入的方式
* 若字面值中包含特殊字符，可以使用 <![CDATA[]]> 把字面值包裹起来

可以使用property的ref属性建立bean之间的引用关系，也可以使用`<ref>`子标签来建立此种关系

内部bean不能被外部引用，只能在内部使用

可以使用专用的` <null/> `元素标签为 Bean 的字符串或其它对象类型的属性注入 null 值

为级联属性赋值，注意：属性需要先初始化后才可以级联属性赋值，否则会有异常，和struts2不同

