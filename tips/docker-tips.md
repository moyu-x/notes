---
title: Docker 指南
---

## 添加用户到 Docker 用户组

在安装`Docker`之后，用如下指令将当前用户加入到用户组：

```bash
sudo usermod -aG docker $USER
```

如果提示`/var/run/docker.sock`权限不足，使用如下指令解决：

```bash
sudo chmod a+rw /var/run/docker.sock
```

## 配置 Docker 为国内镜像

编辑`/etc/docker/daemon.json`文件后，然后重启`Docker`服务：

```json
{
    "registry-mirrors": ["https://registry.docker-cn.com"]
}
```
