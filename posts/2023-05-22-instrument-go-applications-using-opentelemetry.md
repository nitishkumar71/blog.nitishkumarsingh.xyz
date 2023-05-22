---
date: 2023-05-22T12:39:48.590Z
title: Instrument Go applications using OpenTelemetry
tags:
  - golang
excerpt: Learn about to how to instrument go application using OpenTelemetry.
draft: false
---
We all must have heard of instrumenting your software applications. Still, I will just repeat the same old definition here. **Instrumentation helps to measure your applications performance and identify what are the bottlenecks**. Metric instrumentation is basically defining a set of measures which gives you insight about your system. What can be some use case for instrumentation?

* Define SLA for services. You need to define some metrics which can define if application is performing within the given SLA
* Identify degradation in quality of service. This helps you to set alerts and perform operations to recover your services while it's within the threshold of acceptable degradation.

Now, as we have discussed about instrumentation let's come to the actual topic of this blog post. In this post, we will see how we can use [OpenTelemetry](https://opentelemetry.io/) to instrument golang applications. Why OpenTelemetry? OpenTelemetry defines a set of [specs](https://opentelemetry.io/docs/specs/otel/) for making systems observable by allowing tracing, metrics and logs. \
\
OpenTelemetry allows to generate observability data in vendor agnostic way and with the help of collector it can be exported in any format to the any vendor.

![OpenTelemetry Architecture](/assets/opentelemetry-2023-05-01-2222.png "OpenTelemetry Architecture")

As Shown in the above image responsibility of sending metrics to collector lies with application i.e. it's push based model. We can share metrics via http or grpc. After receiving metrics, we can process these metrics and using exporter the same can be converted to any desired format before publishing to any third party application. This removes the vendor lock-in from the application and we can simply export the way we want to.\
\
Now back to the golang instrumentation, we will create a simple golang app server without any framework and try to instrument the application. \
\
[Resource](https://opentelemetry.io/docs/specs/otel/resource/) are the application which generate the metrics/traces. OpenTelemetry provides the [convention](https://opentelemetry.io/docs/specs/otel/resource/semantic_conventions/) to define Resource which is inherited from [OpenCensus Resource Standard](https://github.com/census-instrumentation/opencensus-specs/blob/master/resource/StandardResources.md). OpenTelemetry provides some predefined  conventions for [browser](https://opentelemetry.io/docs/specs/otel/resource/semantic_conventions/browser/), [container](https://opentelemetry.io/docs/specs/otel/resource/semantic_conventions/container/), [cloud](https://opentelemetry.io/docs/specs/otel/resource/semantic_conventions/cloud/) and etc. Here is how we can define resource using go SDK.

```go
	r := resource.NewWithAttributes(
		semconv.SchemaURL, // schema URL for semantic convenetion, this is will contain URL for semantic schema
		semconv.ServiceName("go-instrumentation"), // service name which is being instrumented
		semconv.ServiceVersion("0.0.1"), // service version
	)
```

Next is **MeterProvider**. It's the starting point for creating metrics and instruments. This is the one responsible to provide meters on application level and store stateful configurations inside it. MeterProvider takes two inputs first resource and second **Reader.** Reader is a wrapper for exporter. OpenTelemetry allows several exporters to export the metrics. In this case, we will use console exporter. It will push metrics in the console.

```go
	// create console exporter
	// OpenTelemetry allows to create your own custom exporter using OTLP
	// Else we can use default exporter https://github.com/open-telemetry/opentelemetry-go/tree/v1.15.1/exporters
	exp, err := stdoutmetric.New()
	if err != nil {
		log.Fatal().Msg(fmt.Sprintf("Failed to Start: %v", err))
	}

	// reader is a wrapper for exporter
	// it allowes to define several properties to control behaviour of export
	// such as duration at which metric should be exported or timeout for export 
	reader := sdkmetric.NewPeriodicReader(exp, sdkmetric.WithInterval(time.Duration(10000*time.Millisecond)))

	meterProvider := sdkmetric.NewMeterProvider(
		// resource created in early step
		sdkmetric.WithResource(r),  
		// reader for the metrics. It can be OTEL collector  
		sdkmetric.WithReader(reader), 
	)

	defer func() {
		// meter provider should be shutdown before exiting application
		// it will flush all the pending telemetry data
		err = meterProvider.Shutdown(context.Background())
		if err != nil {
			log.Error().Msg(fmt.Sprintf("Failed to shutown: %v", err))
		}
	}()
```

Once MeterProvider is configured we can use it to get **Meter**. Meter is generally to group different instrument i.e metric within namespace. Usually meter represent different groups which can have same metric. An example could be `http` and `database`. Both can have common metric named `duration` where duration for http will represent http request duration and for database it will represent duration for database queries . `http` and `database` both will represent different instance of metric. 

```go
	// Create Metric to group http metric
	// instrument to represent http metrics will be created using this meter
	httpMeter := meterProvider.Meter("http")
	// create duration instrument
	// it will represent duration for http request
	durationIns, err := httpMeter.Int64Histogram(
		"requests.duration",
	)

	if err != nil {
		log.Fatal().Msg(fmt.Sprintf("Failed to Start: %v", err))
	}
```

Now we are ready with setup for instrumentation. Let's create simple API calls which we want to instrument. We will use `net/http` package from the standard go library to create an http server.

```go
	// create server mux
	mux := http.NewServeMux()
	// simple hello world api call
	helloHandler := http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		io.WriteString(w, "Hello, World!\n")
	})


	// simple API which calls another third party api and return the response from it
	userHandler := http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		res, err := http.Get("https://random-data-api.com/api/users/random_user")
		if err != nil {
			log.Err(err).Msg("user request failed!")
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		users, err := io.ReadAll(res.Body)
		if err != nil {
			log.Err(err).Msg("user request failed!")
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusOK)
		w.Write(users)
	})
```

These are two simple API. Let's assume they do their job well and we don't need to improve them. Now let's see how we can instrument these APIs to record their duration. We first need to define an middleware which will wrap the above function handler to add instrumentation functionality.

```go
// It's a middleware function
// we will wrap the func handlers using this function
func httpInstrumentationMiddleware(next http.Handler, durationIns metric.Int64Histogram) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// start time for the API call
		startTime := time.Now()
		// call the server API request
		next.ServeHTTP(w, r)
		// finish time for the API call
		end := time.Now()
		// difference between the start and end
		diff := end.Sub(startTime).Milliseconds()
		// record the metric using instrument with attributes such as path
		// attributes provide more info about any metric
		// attributes can be used for filter and grouping of metrics to make better sense out of metrics
		durationIns.Record(r.Context(), diff, metric.WithAttributes(attribute.String("path", r.URL.Path)))
	})
}
```

\
Above defined function will be wrapped around function handlers to add more functionality. This approach is also called **decoration**.

```go
	// decorate function handlers to provide additional functionality
	mux.Handle("/hello", httpInstrumentationMiddleware(helloHandler, durationIns))
	mux.Handle("/user", httpInstrumentationMiddleware(userHandler, durationIns))

	// serve the http request
	err = http.ListenAndServe(":8080", mux)
	if err != nil {
		log.Fatal().Msg(fmt.Sprintf("Failed to Start: %v", err))
	}
```

That's it. We have done the simple instrumentation for our http requests. Now we can simply build the application and run the application in local. Call the above APIs and within 10 seconds metrics should be printed on your console. You can change console exporter with some other [predefined](https://github.com/open-telemetry/opentelemetry-go/tree/v1.15.1/exporters) exporters or create a new one. Creating or using other exporters is out of scope for this article.\
\
You can find the example for same [here](https://github.com/nitishkumar71/blog/tree/master/go-instrumentation). Use the below command in theproject  directory to run the application. Use port 8080 from localhost to access the application. 

```shell
make vendor
make build
bin/go-instrumentation
```

## Happy Instrumenting!