---
date: 2023-05-22T12:39:48.590Z
title: Instrument Go applications using OpenTelemetry
tags:
  - golang
excerpt: Learn about to how to instrument go application using OpenTelemetry.
draft: true
---
We all must have heard of instrumenting you software applications. Still, I will just repeat the same old definition here. **Instrumentation helps to measure your applications performance and identify what are the bottlenecks**. Metric instrumentation is basically defining a set of measures which gives you insight about your system. What can be some use case for instrumentation

* Define SLA for services. You need to define some metrics which can define if application is performing within the given SLA
* Identify degradation in quality of service. This helps you to set alerts and perform operations to recover your services while it's within the threshold of acceptable degradation.

Now, as we have discussed about instrumentation let's come to the actual topic of this blog post. In this post, we will see how we can use [OpenTelemetry](https://opentelemetry.io/) to instrument golang applications. Why OpenTelemetry? OpenTelemetry defines a set of [specs](https://opentelemetry.io/docs/specs/otel/) for making systems observable by allowing tracing, metrics and logs. \
\
OpenTelemetry allows to generate observability data in vendor agnostic way withing application and with the help of collector it can be exported in any format to the any vendor.

![OpenTelemetry Architecture](/assets/opentelemetry-2023-05-01-2222.png "OpenTelemetry Architecture")

As Shown in the above image responsibility of sending metrics to collector lies with application i.e. it's push based model. We can share metrics via http or grpc. After receiving metrics, we can process these metrics and using exporter the same can be converted to any desired forma before publishing to any third party application. This removes the vendor lock-in from the application and we can simply export the way we want to.\
\
Now back to the golang instrumentation, we will create a simple golang app server without any framework and try to instrument the application.