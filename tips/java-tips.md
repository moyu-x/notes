---
title: Java 问题收集
sidebar: auto
---

## 字节码

`Java`编译成的`class`文件如果直接查看他的十六进制编码会显示如下的信息：

```bash
$ od -x AccountServerApplication.class
0000000 feca beba 0000 3700 1c00 000a 0004 0714
0000020 1500 000a 0016 0717 1800 0001 3c06 6e69
```

本来应该显示的是`cafe babe`但是显示成`feca beba`了，这是因为`JVM`采用的是大端法表示的，换种参数就显示如下：

```bash
$ hexdump -C AccountServerApplication.class
00000000  ca fe ba be 00 00 00 37  00 1c 0a 00 04 00 14 07  |.......7........|
00000010  00 15 0a 00 16 00 17 07  00 18 01 00 06 3c 69 6e  |.............<in|
```
