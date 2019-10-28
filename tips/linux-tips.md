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

```bash
sudo pacman -S jpegoptim
```

具体的使用方式如下：

```bash
jpegoptim example.jpeg

# 需要压缩的情况
jpegiptim --size=100k example.jpeg
```

## 三、 关闭`tab`补全的警报

修改`/etc/inputrc`文件，将`bell-style`设置为如下：

```bash
set bell-style none
```

## 四、 提示 `Broken pip`

这个时候在`~/.ssh/config`中加入如下的配置：

```bash
Host *
  ServerAliveInterval 120
  IPQoS=throughput
```

## 五、 `PTY allocation request failed on channel 0`

`PTY`是一个伪终端，提示为伪终端分配失败，然后提示成功后输出欢迎信息，最后连接被关闭了。这是因为基于`SSH`的`Git`不需要一个 tty，所以被拒绝分配成一个`tty`接入站点，这个时候使用`ssh -T`就行

## 六、在`WSL`中使用`pipenv`

出现在`wsl`中调用`pipenv`出现调用`Windows`中的`Python`的情况时候，需要在使用`pipenv`的时候指定`Python`版本的情况：

```bash
pipenv --python /usr/bin/python
```

## 七、备份数据库

备份数据库但是不备份非数据相关的库：

```sql
mysql -h 127.0.0.1 -uciticaozl '-p0000' -e 'show databases;'|grep -E -v "Database|information_schema|mysql|performance_schema" |xargs mysqldump -uciticaozl -h127.0.0.1  '-p00000' --databases > /tmp/source.sql
```
