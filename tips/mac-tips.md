---
title: Mac 使用问题汇总
sidebar: auto
---

## Mac 上不能发现`stdio.h`标准库

解决方案可以参考[macOS 软件编译时找不到头文件解决方法](https://zhile.io/2018/09/26/macOS-10.14-install-sdk-headers.html)这篇文章，具体的代码如下：

```bash
csrutil disable   # 需要在恢复模式下运行命令，具体请自行搜索。
xcode-select --install    # 安装常用开发工具，如：git 等。
sudo mount -uw /	# 根目录挂载为可读写，否则无法在/usr/下建立文件，本修改重启前有效。
sudo ln -s "$(xcrun --show-sdk-path)/usr/include" /usr/include
export SDKROOT="$(xcrun --show-sdk-path)" # 设置环境变量
echo "export SDKROOT=\"\$(xcrun --show-sdk-path)\"" >> ~/.bash_profile # zsh 的自行搞定
sudo DevToolsSecurity -enable # 将系统置于开发模式
```
