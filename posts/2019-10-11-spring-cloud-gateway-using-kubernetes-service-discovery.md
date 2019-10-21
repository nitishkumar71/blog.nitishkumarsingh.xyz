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
draft: false
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
