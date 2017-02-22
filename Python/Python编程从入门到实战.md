# 变量和基本类型

## 命名

在 Python 中使用变量时，需要遵守一些规则和指南。违反这些规则将引发错误，而指南旨在让你编写的代码更容易阅读和理解。请务必牢记下述有关变量的规则:

* 变量名只能包含字母、数字和下划线。变量名可以字母或下划线打头，但不能以数字打头
* 变量名不能包含空格，但可使用下划线来分隔其中的单词
* 不要将 Python 关键字和函数名用作变量名，即不要使用 Python 保留用于特殊用途的单词，如 print 。
* 变量名应既简短又具有描述性
* 慎用小写字母 l 和大写字母 O ，因为它们可能被人错看成数字 1 和 0 。

Python 解释器不会对代码做拼写检查，但要求变量名的拼写一致

## 字符串

Python 使用加号（ + ）来合并字符串。这种合并字符串的方法称为 拼接 。通过拼接，可使用存储在变量中的信息来创建完整的消息。

Python 能够找出字符串开头和末尾多余的空白。要确保字符串末尾没有空白，可使用方法 rstrip() 。你还可以剔除字符串开头的空白，或同时剔除字符串两端的空白。为此，可分别使用方法 lstrip() 和 strip() 。

Python 3 中的 print 是一个函数，因此括号必不可少。

## 数值

在 Python 中，可对整数执行加（ + ）减（ - ）乘（ * ）除（ / ）运算。

Python 将带小数点的数字都称为 浮点数 。大多数编程语言都使用了这个术语，它指出了这样一个事实：小数点可出现在数字的任何位置。每种编程语言都须细心设计，以妥善地处理浮点数，确保不管小数点出现在什么位置，数字的行为都是正常的。从很大程度上说，使用浮点数时都无需考虑其行为。你只需输入要使用的数字， Python 通常都会按你期望的方式处理它们。

## 注释

编写注释的主要目的是阐述代码要做什么，以及是如何做的。在开发项目期间，你对各个部分如何协同工作了如指掌，但过段时间后，有些细节你可能不记得了。当然，你总是可以通过研究代码来确定各个部分的工作原理，但通过编写注释，以清晰的自然语言对解决方案进行概述，可节省很多时间。要成为专业程序员或与其他程序员合作，就必须编写有意义的注释。

## Python之禅

使用import this可以查看

```txt
Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!
```

