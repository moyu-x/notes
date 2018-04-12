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

# 第六章

负载均衡是指将负载分摊到多个执行单元上

1. 一种是独立的进程单元
2. 一种是将负载均衡逻辑以代买的形式封装到服务消费的客户端上

Ribbon有两种模式：

1. 和`RestTemplate`相结合
2. 和`Feign`相结合

`LoadBancerClient`从Eureka中获取服务注册的列表并在本地缓存一份，在调用`choose()`方法时候根据负载均衡策略选择一个服务实例的信息，从而进行负载均衡。如果禁止获取服务注册的信息，则需要自己去维护一份服务注册列表信息

IRule默认有7个实现：

1. BestAvailibleRule:选择最小请求数
2. ClentConfigEnableRoundRibbonRule:轮询
3. RandomRule:随机选择一个服务
4. RoundRobbinRule:轮询选择
5. RetryRule:轮询重试
6. WeightedResponseTimeRule:根据响应时间分配一个权重，权重越低，被选择的可能性就越低
7. ZoneAvoidanceRule:根据服务的zone区域和可用性来轮询选择

Ribbon的负载均衡主要是通过`LoadBalancerClient`来实现的，`LoadBalancerClient`交给了`ILoadBalancer`来处理，其通过配置`IRule`、`IPing`等，向`EurekaClient`获取服务注册信息并且没10s向其发送信息以确定是否需要更新注册信息，最后根据策略进行负载均衡。

# 第七章

Feign Client默认的配置类是FeignClientConfiguration,重写其中的Bean可以达到自定义配置的目的

Feign是一个伪Java Http客户端，Feign不做任何处理请求，其通过注解生成Request模板，从而简化Http的API开发



