# Angular权威指南

## 第一章

我们的应用将会在app-route标签处进行渲染

angular背后的指导思想之一就是组件化

定义一个新组件：

1. Component注解
2. 组件定义类

`import`语句定义了我们写代码时候要用到的哪些代买块

定义模板的两种方式：

1. 使用`@Component`对象中的template属性
2. 指定templateUrl属性

为了把一个值传入组件，就要在模板中使用方括号语法`[]`

`@NgModule`注解有三个属性：

1. `declarations`指定了在该模块中定义的组件
2. `imports`描述了该模块有那些依赖
3. `bootstrap`告诉Angular，当使用该模块引导应用时，我们要把APPComponent加载位顶层组件

当组件添加到页面中后没有进行渲染，可能的情况就是不在此组件的命名空间中。

写Angular代码时的最佳实践之一就算尝试从组件代码中把正在使用的数据结构隔离出来。

迪米特法则是指：一个对想对其他对象的结构或属性所作的假设应该越少越好。

MVC指南：胖模型，皮包骨的控制器，其核心思想是我们要把大部分的领域逻辑迁移到模型中，以便让组件只做尽可能少的工作

大部分Angular应用程序的做法：

1. 把应用拆分成组件
2. 创建视图
3. 定义模型
4. 显示模型
5. 添加交互

## 第二章

TypeScript相对于ES5的五大改善：

1. 类型
2. 类
3. 注解
4. 模块导入
5. 语言工具包

## 第三章

Angular应用是由组件构成的

一个Angular应用其实就是一颗由组件构成的树

Angular不要求使用指定的数据模型库

当开发新的Angular应用时，先画出原型图，然后拆分成组件

每个组件都由三个部分组成：

1. 组件注解
2. 视图
3. 控制器

组件的控制器是由一个TypeScript类定义的

`@Component`会配置你的组件如何与外界交互

如果希望把模板放到一个单独的文件中，可以将组件的`template`配置项改为`templateUrl`配置项，把配置的内容设置位模板文件名即可

方括号[]用来传递输入，圆括号()用来处理输出

在`inputs`输入数组中，当字符串的值是`key: value`的格式的时候，含义如下：

* 键表示要输入的属性在控制器中看来如何被绑定
* 值表示属性在外界看来如何

创建一个可以触发自定义事件的组件：

1. 在`@Component`配置中，指定outputs配置项
2. 在实例属性中，设置一个`EventEmitter`
3. 在适当的时候，通过`EventEmitter`触发事件

`host`配置可以在宿主元素上配置元素属性

第四章 内置指令

如果希望根据一个条件来决定显示或隐藏一个元素，可以使用`ngIf`指令，如果只是想改变一个元素的CSS可见性，就应该使用`ngStyle`或`class`指令

`ngSwitch`指令背后的思想：对表达式进行一次求值，然后根据其结果来决定如何显示指令内的嵌套元素

使用`ngSwitchCase`指令描述已知结果

使用`ngSwitchDefault`指令处理所有其他未知情况

使用`ngStyle`指令可以通过Angular表达式给特定的DOM元素设定CSS属性

`ngClass`指令在HTML模板中用ngClass属性来表示，能动态设置和改变一个给定的DOM元素的CSS类

JavaScript对想不允许字面量的键值出现连字符

`ngFor`指令的任务是重复一个给定的DOM元素，每次重复都会从数组中取一个不同的值

告诉Angular不要编译或者绑定页面中的某个特殊部分时候，要使用`ngNodbindable`

## 第五章

在Angular中，经常将一个类以属性的形式附加DOM上

`FormControl`代表单一的输入字段，它封装了这些字段的值和状态

`FormGroup`则可以位一组`FormControl`提供总包接口

`FormGroup`和`FormControl`都继承字同一个祖先`AbstractControl`

`NgForm`提供了两项重要的功能：

1. 一个名叫`ngForm`的`FormGroup`对象
2. 一个输出事件`ngSubmit`

如果要绑定一个现有的`FormGroup`和`FormControl`，使用：

* ngForm
* ngModel

如果要绑定一个现有的`FormGroup`和`FormControl`，使用：

* formGroup
* formControl

使用验证器`Validators`来检查用户输入的数据格式

1. 为`FormControl`对象指定一个验证器
2. 在视图中检查验证器状态，并据此采取行动

一个验证器：

1. 接收一个`FormControl`作为输入
2. 当验证失败时，会返回一个`StringMap<string, boolean>`对象

利用`Validators.compose`来实现整合多个验证

想监听控件变化，要：

1. 通过调用`control.valueChanges`访问到这个`EventEmitter`
2. 使用`.subscribe`方法添加一个监听器
