---
title: Linux 或 WSL 使用问题汇总
prev: false
next: false
sidebar: auto
---

## 一、 关闭`tab`补全的警报

修改`/etc/inputrc`文件，将`bell-style`设置为如下：

```bash
set bell-style none
```

## 二、图片压缩

先安装`jpegiptim`工具：

``` bash
sudo pacman -S jpegiptim
```

具体的使用方式如下：

``` bash
jpegiptim example.jpeg

# 需要压缩的情况
jpegiptim --size=100k example.jpeg
```

## 三、 关闭`tab`补全的警报

修改`/etc/inputrc`文件，将`bell-style`设置为如下：

```bash
set bell-style none
```

## 四、图片压缩

先安装`jpegiptim`工具：

``` bash
sudo pacman -S jpegiptim
```

具体的使用方式如下：

``` bash
jpegiptim example.jpeg

# 需要压缩的情况
jpegiptim --size=100k example.jpeg
```
