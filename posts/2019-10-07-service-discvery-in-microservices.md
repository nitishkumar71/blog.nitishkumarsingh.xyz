---
date: 2019-10-07T10:26:32.932Z
title: Service Discvery in microservices
tags:
  - microservices
  - servicediscovery
  - communication
excerpt: >-
  What is service discovery in microservices? What problems can it solve for us?
  Do we really need it?
---
So until and unless anyone of us was living in a cave, we all have heard about the buzzword microservices. It's not that you always need to build microservices every small functionality, a lot of problem can be easily solved by monolith. But that discussion is out of the context for this article.

Whether you need microservice or not can be answered based on few questions

* Do you have independent business domains which are independent and functions as separate entity within applications?
* Do you have large team of developers, who are split into small teams based on business domain?
* Do you want to rollout new functionality for different modules quickly and independent of other modules?

These are not the complete list of questions, but these can be served as the base to decide whether you should go for microservices or not. 

So let's now assume we have decided to go with microservices approach and we have designed our microservices to be loosely coupled with each other. 

Now there are two problems, we may want to solve

* **Cross Service Communication** There would be situation, where we need to access some functionality of other services. In monolithic approach, it would be just some function call. But in monolith services are not in the same code base, let's see what are the different options we can have.
* **How External world can access microservices functionality?** There could be external application or REST api exposed for web application for each service. How request for these microservices can be mapped?

**Case 1: All Microservices in deployed in all machines**

![Microservices in Single Instance](/assets/microservices-in-single-machine.png "Microservices in Single Instance")

So, here we have deployed all the services together on the same machine. All the services are hosted on different ports and they have exposed REST endpoints.

Whenever gateway receives an request for any service, it will simply redirect to the given instance, solving the first problem. These endpoints can be called by respective services instead of calling the function of the services, solving the second problem.

Although this approach solves the problem of cross service communication, but it has some of it's disadvantages too.

* Bigger machine size is required, as all the services are deployed in single machine. Different services can have their different requirements. some services may only need higher processing other only needs higher memory. Considering all of these constraints, we may have to choose a higher configuration machine, which can accommodate all of these services. As the no of services grow, we would have to increase the size of machine too.
* monitor health check of all services and mechanism to handle failure of single service. Either by restarting service or allocating new machine dynamically.
* Some services don't need to be up and running always.
* Gateway need to be hard coded for port no of each service and need to be updated for each new service. Even service need to hard code port no of service, which they want to call.
* Above solution will work in case of single instance, but in real world there will be multiple instances. To handle this, we will need an Loadbalancer before those set of instances so the requests are being distributed evenly between those instances from gateway. 

**Case 2: Deploy Services independently & use Service Discovery**

![microservice in service discovery](/assets/microservices-service-discovery.png "microservice in service discovery")

Let's understand what is happening here. All the services are hosted in different machines, it's completely up to us how we want to deploy them. They can be clubbed together or deployed separately on any of the instance. Each service registers it self into Service Registry.

<sub>**NOTE: There are different deployment orchestration technologies are available . Those are out of context for this article.**</sub>

**Service Registry** is key value pair database. The database consists of **unique id for each service, service name, machine IP address, port number and Health Monitoring API** of each service. Service Registry will invoke health monitoring API on fixed interval to check if service is healthy or not.

Now let's see how above problem are being solved

**Cross Service Communication** Consider the first scenario where, Service1 want to access Service3. To do so, Service1 will query service registry database for service3 and fetch the list of instances where Service3 is available. Using the IP address and port number, Service1 can now access Service3. This is also called **Client-Side Service Discovery** pattern.

**How External world can access microservices functionality?** Consider the second scenario, where Gateway wants to redirect external request to Service1. Gateway queries the Service Registry and fetches the list of instances where Service1 is available. Using the IP address and port number Gateway redirects request to any of machines where Service1 is available. The approach where external clients are accessing microservices using service discovery is called **Service-Side Service Discovery** pattern.

**Benefits of Approach 2** 

* No need to hard code IP address or port number of services, as it can find out dynamically at the time of request only.
* Deployment is independent of microservice communication architecture.
* Based on their health status request can be sent to only healthy services
* No need of any kind of loadbalancer, as service address can be find out dynamically.
* Strategies to distribute load evenly between available machines can be implemented and client side and gateway.

**BONUS**

As we have seen, Gateway has played an crucial role in both the approaches, Gateway is routing the requests form external clients to respective microservices. It's serving as the backend for any external client. This approach is called **API Gateway** pattern.
