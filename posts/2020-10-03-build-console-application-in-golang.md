---
date: 2020-10-03T19:06:20.648Z
title: Build Console Application in Golang
tags:
  - console
  - golang. cli
excerpt: Have you used Kubernetes or some other CNCF projects which are built on
  Golang. You would have surely used some CLI tool to interact with them like
  kubectl and etc. Have you ever thought how these tools are built? Let's
  explore the same in this post.
draft: true
---
There has been situations when we would have build some shell script or something for some mundane task and we have been creating script for it and sharing it with team members. We need to accept parameter and give appropriate error messages, building such script need quite good amount of time. What if we can create an binary and share it with whoever we want. What if we have an framework, which can facilitate in building cli applications?

[Cobra](https://github.com/spf13/cobra#overview) is an simple interface which helps in designing CLI applications in golang. It provides an easy to implement template which can be used quickly build an powerful CLI application. Cobra provides support for 

* sub-commands with nested capability
* flags with optional default value
* capability to define help and usage section
* ability to define mandatory and optional parameters
* intelligent suggestion capabilities

Let's jump and see how we can build an CLI application step by step.

Initialize golang application, replace module name with your module name. Install Cobra module in your golang application

```shell
mkdir go-cli
go mod init github.com/nitishkumar71/blog/go-cli
go get -u github.com/spf13/cobra/cobra
```

There should be only two files named `go.mod` and `go.sum` in your folder. Update the folder structure as per below screenshot, we will discuss about the content of each file seperately later in the post

![GO CLI App Folder Structure](/assets/screenshot-from-2020-11-17-08-31-49.png "GO CLI App Folder Structure")