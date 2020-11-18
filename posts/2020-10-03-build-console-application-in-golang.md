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
draft: false
---
There has been situations when we would have build some shell script or something for some mundane task and we have been creating script for it and sharing it with team members. We need to accept parameter and give appropriate error messages, building such script need quite good amount of time. What if we can create an binary and share it with whoever we want. What if we have an framework, which can facilitate in building cli applications?

[Cobra](https://github.com/spf13/cobra#overview) is an simple interface which helps in designing CLI applications in golang. It provides an easy to implement template which can be used quickly build an powerful CLI application. Cobra provides support for 

* sub-commands with nested capability
* flags with optional default value
* capability to define help and usage section
* ability to define mandatory and optional parameters
* intelligent suggestion capabilities

## Build CLI Application

### Setup Structure

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

### Root Command

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

`init` function gets executed at the start of the application. `AddCommand` function is used to add the sub-command for the root. We will discuss about `createNewFileCommand` and `createNewDirectoryCommand` function later in the post, for now just understand that it returns the same structure as `rootCmd`. This single file is enough if you don't  need any nested sub-command, just remove init function and write your own logic inside Run function and your CLI application is ready. All you need to do is package and distribute your binaries. You can check **Build CLI Application** section below.

### Define Sub-Command

Let's Define a sub-command which will provide information about directories. We will put the entire code for this command in `cmd/dir.go` 

```go
package cmd

import (
	"fmt"
	"io/ioutil"

	"github.com/nitishkumar71/blog/go-cli/pkg"

	"github.com/spf13/cobra"
)

var dSize bool

// CreateNewDirectoryCommand : create new directory command
func createNewDirectoryCommand() *cobra.Command {
	var dirCmd = &cobra.Command{
		Use:   "dir",
		Short: "Perform operations on Directory",
		Long:  `This will allow users to perform operations on Directory`,
		Args:  cobra.MinimumNArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			// Do Stuff Here
			processDirCommand(args[0])
		},
	}

	dirCmd.Flags().BoolVarP(&dSize, "size", "s", false, "Size of the directory")

	return dirCmd
}

func processDirCommand(dName string) {
	if dName == "" {
		fmt.Printf("File name is not provided\n")
		return
	}

	size, filesCount, dirCount, err := getDirInfo(dName)

	if err != nil {
		return
	}

	if dSize {
		fmt.Printf("Size of Directory: %s\n", pkg.FormatSize(size))
		return
	}

	fmt.Printf("Directory Name: %s\n", dName)
	fmt.Printf("Size of Directory: %s\n", pkg.FormatSize(size))
	fmt.Printf("Total %d files and %d directories found\n", filesCount, dirCount)

}

func getDirInfo(dName string) (int64, int64, int64, error) {
	files, err := ioutil.ReadDir(dName)

	var size, filesCount, dirCount int64
	size, filesCount, dirCount = 0, 0, 0

	if err != nil {
		fmt.Printf("Issue faced while accessing file %v\n", err)
		return 0, 0, 0, err
	}

	for _, file := range files {
		size += file.Size()
		if file.IsDir() {
			dirCount++
			tSize, tFilesCount, tdirCount, _ := getDirInfo(fmt.Sprintf("%s/%s", dName, file.Name()))
			size += tSize
			filesCount += tFilesCount
			dirCount += tdirCount
		} else {
			filesCount++
		}
	}

	return size, filesCount, dirCount, nil
}
```

The `createNewDirectoryCommand` creates `dir` sub-command which we use in `root.go` and add the `dir` command as sub-command of `go-cli` command. Here `Args` option is used to define different criteria for the no of arguments. We have made it compulsory to provide at least one argument for `the` dir sub-command.

As already mentioned Cobra allows to register flags for the command. `dirCmd.Flags().BoolVarP(&dSize, "size", "s", false, "Size of the directory")` allows to register the size flag with boolean value. Cobra allows to register a no of premitives types flag as per developer convienence. 

There are various `*VarP` which can be used to setup different flags. These methods takes following arguments

* Variable name where value need to be stored
* Flag name for for cli application
* Shorthand for the given flag
* Default value for the flag
* Description of the flag

The Run function is used to the main logic of the sub-command. I leave up to you to figure out the the processing logic and another sub-command `file` which is inside `cmd/file.go`. 

## Build CLI Application

Run the command from the folder of the application

`go build -o bin/go-cli`

It will generate an `binary` named `go-cli` in bin folder of golang application

## Demo

![GO CLI Demo](/assets/go_cli_demo.gif "GO CLI Demo")



## Github Repo

Please follow the [link](https://github.com/nitishkumar71/blog/tree/master/go-cli) for repository