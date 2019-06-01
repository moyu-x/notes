```yaml
title: Kubernetes 使用问题汇总
prev: false
next: false
sidebar: auto
```

## Mac 开启 k8s

因为墙存在的原因，所以得变通下安装的方法，这个时候请参考[maguowei/k8s-docker-for-mac](https://github.com/maguowei/k8s-docker-for-mac)上的解决办法，通过使用国内的镜像源和预先下载好镜像，并且主要一定要使用`Edge`版本的`Docker`

## Helm 的安装

`Helm`大部分的安装都可以按照文档进行处理，但是提示`tiller`需要升级，并且发现`titler`不能启动，这个时候会提示拉不到这个镜像，解决办法是先查看镜像的版本是多少：

```bash
kubectl describe pod tiller-deploy-668c95696c-jtnb9 -n kube-system
```

然后使用[azure]([http://mirror.azure.cn/help/gcr-proxy-cache.html](http://mirror.azure.cn/help/gcr-proxy-cache.html)的镜像将其获取下来，最后修改`deploment`中的镜像数据：

```bash
# 获取对应版本的 Tiller
docker pull gcr.azk8s.cn/kubernetes-helm/tiller:v2.14.0

# 获取当前 Tiller 的 deployment 然后修改其中的数据
kubectl get deployment tiller-deploy -n kube-system -o yaml > tiller-deploy.yml

# 删除原有的 deployment
kubectl delete deployment tiller-deploy -n kube-system

# 使用修改后的 deployment
kubectl apply -f tiller-deploy.yml
```
