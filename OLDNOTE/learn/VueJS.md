# VueJS

## MVVM模式 ![MVVM](..\image\MVVM.png)

使用Vue的过程就是定义MVVM各个组成部分的过程的过程。

1. **定义View**
2. **定义Model**
3. **创建一个Vue实例或"ViewModel"，它用于连接View和Model**

## 实例

### 简单实例

html部分：

``` html
<div id="app">
  {{ message }}
</div>
```

script部分：

```javascript
<script>
    // model
    var exampleData = {
        message: 'hello world'
    };

    // 创建一个 Vue 实例或 "ViewModel"
    // 它连接 View 与 Model
    new Vue({
        el: '#app',
        data: exampleData
    });
</script>
```

### 双向绑定

html部分：

``` html
<div id="app">
    <p>{{ message }}</p>
    <input type="text" v-model="message"/>
</div>
```

### 常用指令

Vue.js提供了一些常用的内置指令，接下来我们将介绍以下几个内置指令：

- v-if指令
- v-show指令
- v-else指令
- v-for指令
- v-bind指令
- v-on指令

`v-if`是条件渲染指令，它根据表达式的真假来删除和插入元素，它的基本语法如下：

```html
v-if="expression"
```

`v-show`也是条件渲染指令，和v-if指令不同的是，使用`v-show`指令的元素始终会被渲染到HTML，它只是简单地为元素设置CSS的style属性。

可以用`v-else`指令为`v-if`或`v-show`添加一个“else块”。`v-else`元素必须立即跟在`v-if`或`v-show`元素的后面——否则它不能被识别。

`v-for`指令基于一个数组渲染一个列表，它和JavaScript的遍历语法相似：

```html
v-for="item in items"
```

`v-bind`指令可以在其名称后面带一个参数，中间放一个冒号隔开，这个参数通常是HTML元素的特性（attribute），例如：`v-bind:class`

```html
v-bind:argument="expression"
```

`v-on`指令用于给监听DOM事件，它的用语法和v-bind是类似的，例如监听<a>元素的点击事件：

```html
<a v-on:click="doSomething">
```

## Vue组件

Vue.js的组件的使用有3个步骤：**创建组件构造器、注册组件和使用组件。**

 ![vue组件的创建和注册](..\image\vue组件的创建和注册.png)



## 理解组件的创建和注册

我们用以下几个步骤来理解组件的创建和注册：

1. `Vue.extend()`是Vue构造器的扩展，调用`Vue.extend()`创建的是一个组件构造器，而不是一个具体的组件实例。 
2. `Vue.extend()`构造器有一个选项对象，选项对象的`template`属性用于定义组件要渲染的HTML。 
3. 使用`Vue.component()`注册组件时，需要提供2个参数，第1个参数时组件的标签，第2个参数是组件构造器。 
4. `Vue.component()`方法内部会调用组件构造器，创建一个组件实例。 
5. 组件应该挂载到某个Vue实例下，否则它不会生效。

**调用Vue.component()注册组件时，组件的注册是全局的，这意味着该组件可以在任意Vue示例下使用。**
如果不需要全局注册，或者是让组件使用在其它组件内，可以用**选项对象的components属性实现局部注册**。

### 父组件和子组件

我们分几个步骤来理解这段代码：

1. `var Child = Vue.extend(...)`定义一了个Child组件构造器
2. `var Parent = Vue.extend(...)`定义一个Parent组件构造器
3. `components: { 'child-component': Child }`，将Child组件注册到Parent组件，并将Child组件的标签设置为`child-component`。
4. `template :'This is a Parent component'`，在Parent组件内以标签的形式使用Child组件。
5. `Vue.component('parent-component', Parent) `全局注册Parent组件
6. 在页面中使用<parent-component>标签渲染Parent组件的内容，同时Child组件的内容也被渲染出来

 ![父组件和子组件](..\image\父组件和子组件.png)



## 组件注册语法糖

以上组件注册的方式有些繁琐，Vue.js为了简化这个过程，提供了注册语法糖。

**使用Vue.component()直接创建和注册组件：**

```javascript
// 全局注册，my-component1是标签名称
Vue.component('my-component1',{
    template: '<div>This is the first component!</div>'
})

var vm1 = new Vue({
    el: '#app1'
})
```

`Vue.component()`的第1个参数是标签名称，第2个参数是一个选项对象，使用选项对象的template属性定义组件模板。
使用这种方式，Vue在背后会自动地调用`Vue.extend()`。

**在选项对象的components属性中实现局部注册：**

```javascript
var vm2 = new Vue({
    el: '#app2',
    components: {
        // 局部注册，my-component2是标签名称
        'my-component2': {
            template: '<div>This is the second component!</div>'
        },
        // 局部注册，my-component3是标签名称
        'my-component3': {
            template: '<div>This is the third component!</div>'
        }
    }
})
```

## 使用script或template标签

尽管语法糖简化了组件注册，但在template选项中拼接HTML元素比较麻烦，这也导致了HTML和JavaScript的高耦合性。庆幸的是，Vue.js提供了两种方式将定义在JavaScript中的HTML模板分离出来。

1. 使用`<script>`标签
2. 使用`<template>`标签

传入Vue构造器的多数选项也可以用在 `Vue.extend()` 或`Vue.component()`中，不过有两个特例： `data` 和`el`。
Vue.js规定：**在定义组件的选项时，data和el选项必须使用函数。**

将父组件数据通过已定义好的props属性传递给子组件：

```html
<div id="app">
    <my-component v-bind:my-name="name" v-bind:my-age="age"></my-component>
</div>
```

在父组件中使用子组件时，通过以下语法将数据传递给子组件：

```html
<child-component v-bind:子组件prop="父组件数据属性"></child-component>
```

prop默认是单向绑定：当父组件的属性变化时，将传导给子组件，但是反过来不会。这是为了防止子组件无意修改了父组件的状态

可以使用`.sync`显式地指定双向绑定，这使得子组件的数据修改会回传给父组件。

```html
<my-component v-bind:my-name.sync="name" v-bind:my-age.sync="age"></my-component>
```

可以使用`.once`显式地指定单次绑定，单次绑定在建立之后不会同步之后的变化，这意味着即使父组件修改了数据，也不会传导给子组件。

```html
<my-component v-bind:my-name.once="name" v-bind:my-age.once="age"></my-component>
```