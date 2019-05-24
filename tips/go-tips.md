---
title: Go 使用问题汇总
prev: false
next: false
siderbar: auto
---

## 环境变量的问题

 一定要将当前目录添加到`GOPATH`中，不然在代码补全或者使用`dep`管理依赖的时候会提示当前目录不再`GOPATH`中

## Dep 管理依赖

当使用`dep`初始化一个空目录的时候，也就是没有`Go`代码的情况下，会提示报错，这个时候最简单的解决方法就是在当前目录下面创建一个空的`Go`代码，这个时候就不会有报错的提示了

```bash
touch main.go
```
