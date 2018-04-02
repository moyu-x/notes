# 深入理解Spring Cloud与微服务构建

## 第五章

Eureka包含了三种组件：

1. Register Service:服务注册中心
2. Provider Service:服务提供者
3. Consumer Service:服务消费者

Eureka的基本概念

1. Register
2. Renew:间隔30s发送心跳包进行服务续约
3. Fetch Registers：获取服务注册实例，并将其缓存到本地
4. Cancel：
5. Eviction：连续90s没有发出心跳包

一个新注册的实例默认延时40s向服务中心注册，所以不能马上被Eureka server发现


