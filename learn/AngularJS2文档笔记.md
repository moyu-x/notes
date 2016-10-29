典型的Angular项目需要一系列的配置文件：

- **package.json** 用来标记出本项目所需的 npm 依赖包。
- **tsconfig.json** 定义了 TypeScript 编译器如何从项目源文件生成 JavaScript 代码。
- **typings.json** 为那些 TypeScript 编译器无法识别的库提供了额外的定义文件。
- **systemjs.config.js** 为模块加载器提供了该到哪里查找应用模块的信息，并注册了所有必备的依赖包。 它还包括文档中后面的例子需要用到的包。

 Angular 组件相同的基本结构：

- **import 语句 **。它让你能访问 Angular 核心库中的 [`@Component` 装饰器函数 ](https://angular.cn/docs/ts/latest/api/core/index/Component-decorator.html)。
- **@Component 装饰器 **，它会把一份 *元数据 *关联到 `AppComponent` 组件类上：
  - *selector* 为用来代表该组件的 HTML 元素指定简单的 CSS 选择器。
  - *template* 用来告诉 Angular 如何渲染该组件的视图。
- **组件类 **通过它的模板来控制视图的外观和行为。这里，你只有一个根组件 `AppComponent` 。由于这个简单的 QuickStart 范例中并不需要应用逻辑，因此它是空的。