---
date: 2019-10-11T04:31:30.041Z
title: Spring Cloud Gateway using Kubernetes Service Discovery
tags:
  - spring
  - gateway
  - cloud
  - kubernetes
  - springcloudgateway
excerpt: >-
  Do you want to expose your microservices API deployed in Kubernetes to the
  external world?  Do you want to expose all frontend API on the same domain? Do
  you want to know, how to onboard new apis dynamically as and when they are
  deployed in your kubernetes architecture? Look into the article to answer, all
  of these questions.
draft: true
---
Before going through the actual content of the blog, you should be aware of few of the concepts, such as 

* **What is Service Discovery**

> Please follow this [POST](https://blog.nitishkumarsingh.xyz/2019-10-07-service-discvery-in-microservices/) to understand more about service discovery.

* **What is API Gateway and why we need it?**

> Please follow this [POST](<>) to understand more about API Gateway.

We won't go in detail about what is Kubernetes and it's components in this post. Let's see how we can use API gateway from scratch.

1. **Create Spring Gateway application**

Go to [Spring Initalizr](https://start.spring.io/), select the gateway as dependencies.

![Spring Gateway Configuration](/assets/screenshot-from-2019-10-21-20-45-06.png)

> <small> update `springCloudVersion` from `Hoxton.M3` to `Hoxton.M2`, as there is an [issue](https://github.com/spring-cloud/spring-cloud-kubernetes/issues/479) in spring cloud kubernetes release due to which routing will not work correctly. </small>

Include [spring-cloud-starter-kubernetes](https://spring.io/projects/spring-cloud-kubernetes), [spring-cloud-starter-kubernetes-ribbon](https://cloud.spring.io/spring-cloud-static/spring-cloud-kubernetes/1.0.3.RELEASE/multi/multi__ribbon_discovery_in_kubernetes.html) and [spring-boot-starter-actuator](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#production-ready).

* spring-cloud-starter-kubernetes provides common interface implementations that consume kubernetes native services.
* spring-cloud-starter-kubernetes-ribbon is client side load-balancing based on Netflix Ribbon for kubernetes services.
* spring-boot-starter-actuator provides additional features to monitor and manage your applications.

After adding all the dependecies, your build.gradle should look something like

```
plugins {
	id 'org.springframework.boot' version '2.2.0.RELEASE'
	id 'io.spring.dependency-management' version '1.0.8.RELEASE'
	id 'java'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '1.8'

repositories {
	mavenCentral()
	maven { url 'https://repo.spring.io/milestone' }
}

ext {
	set('springCloudVersion', "Hoxton.M2")
}

dependencies {
	implementation 'org.springframework.cloud:spring-cloud-starter-gateway'
	implementation 'org.springframework.boot:spring-boot-starter-actuator'
	implementation 'org.springframework.cloud:spring-cloud-starter-kubernetes'
	implementation 'org.springframework.cloud:spring-cloud-starter-kubernetes-ribbon'
	testImplementation ('org.springframework.boot:spring-boot-starter-test')
}

dependencyManagement {
	imports {
		mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
	}
}
```

That's it, we don't need to add any additional code for gateway to work. Now let's create the configuration file _**application.yml**_ in **src/main/resources** as shown below

```
spring:
  application.name: gateway
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true
          lowerCaseServiceId: true
          # url-expression: "'http://'+serviceId"
    kubernetes:
      reload:
        enabled: true
        mode: polling
        period: 5000
server:
  port: 8080
logging:
  level:
    org.springframework.cloud.gateway: TRACE
    org.springframework.cloud.loadbalancer: TRACE
management:
  endpoints:
    web:
      exposure:
        include: '*'
  endpoint:
    health:
      enabled: true
    info:
      enabled: true
```


There are few additional files we need to create for deployment in Kubernetes.

First we need to create an **Dockerfile**

```
FROM openjdk:8-jdk-alpine as build
COPY . /app/gateway
WORKDIR /app/gateway
RUN ./gradlew clean build

FROM openjdk:8-jdk-alpine
COPY --from=build /app/gateway/build/libs/gateway-0.0.1-SNAPSHOT.jar /app/gateway.jar
EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "/app/gateway.jar" ]
```

In the above given docker file, we are using multi-stage docker file, where we first build project

- - -
