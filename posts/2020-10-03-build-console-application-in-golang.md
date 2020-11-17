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

Let's talk about `main.go` first. It's the entrypoint for the CLI application

```go
package main

import "github.com/nitishkumar71/blog/go-cli/cmd"

func main() {
	cmd.Execute()
}
```

Let's talk about `root.go`, this is the main command under which all the sub-commands will be nested

```go
package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "go-cli",
	Short: "go-cli is sample cli tool for demo purpose ",
	Long: `go-cli is an sample cli tool being built for demo purpose.
		It will be used to give demo og cobra library`,
	Run: func(cmd *cobra.Command, args []string) {
		// Do Stuff Here
		fmt.Println("PProvide sub-command")
	},
}

func init() {
	rootCmd.AddCommand(createNewFileCommand())
	rootCmd.AddCommand(createNewDirectoryCommand())
}

// Execute functionn is the entry point for command
func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

```

The `rootCmd` defines the main command with name `go-cli`. Cobra provides different options for the command we will talk about only a few. 

* **Use**: Defines the name for the root or sub-command
* **Short**: Provides short description of the command
* **Long**: Provides long description of the command
* **Run**: It's the function which will execute when we call the given command or sub-command

`init` function gets executed at the start of the application. `AddCommand` function is used to add the sub-command for the root. We will discuss about `createNewFileCommand` and `createNewDirectoryCommand` function later in the post, for now just understand that it returns the same structure as `rootCmd`.