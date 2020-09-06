---
date: 2020-09-02T17:57:02.361Z
title: Django Production Deployment on Apache Server
tags:
  - docker
  - django
  - apache
  - deployment
  - production
excerpt: Do you use python manage.py runserver to deploy web applications
  written in django? Please don't do it. Learn in this post how to deploy it in
  production using docker and apache webserver
draft: true
---
Building an software application using different algorithms, data-structures, frameworks, databases and messaging queues which can solve the mentioned problem efficiently and effectively. This is the first part of solving the problem. The second part is to deploy and maintain the application for high scalability and availability. This is as important as developing algorithms and building software applications.

To understand it's importance assume you have an application like imdb which will provide information related to movies, actors and their works. The expected workload on average could be 1000 requests per second with 300ms serving time for each request. The numbers are not quite high for some SQL db based application right? But without proper configuration applications will not be able serve even 100 request per second. Are you thinking we can increase just the number of servers to server more request as cloud providers allows to scale very quickly. Don't do that, it's possible that you will spend more money than you will generate.

The correct configuration to maximize the throughput of application is not just limited to properly configuring web-servers but also databases, messaging queues and other components of the entire application. In this article we will focus on how we can configure [Django](https://www.djangoproject.com/) application on [Apache web-server](https://httpd.apache.org/) to maximize the output. We will not talk about why should we use an server to host our applications. I would recommend you to search about it on your own.

Before looking at final configuration let's understand few terms and about application

* **mod_wsgi**: It provides an Apache module based on the python [WSGI](https://www.python.org/dev/peps/pep-3333/) specification. WSGI standard helps to setup an standard interface between web-servers and web-frameworks. The idea behind WSGI to have server and application. server will invoke your application. There could be some "middleware" too which helps both side to communicate with each other. I would recommend to read [WSGI](https://www.python.org/dev/peps/pep-3333/) specification to understand more about it.  [mod_wsgi](https://modwsgi.readthedocs.io/en/develop/index.html) allows to deploy code for frameworks like like Django, Flask, Pyramid and etc
* **Movie App**: We have built an django application named imdb. This is an simple application which returns a list of movies already populated into the sqllite DB. We will not deep dive into the how rest APIs can be built into Django app. We have already exposed an API `/movie` which will return list of movies.

  ![Tree Structure of Application](assets/screenshot-from-2020-09-06-21-13-16.png "Application Folder Structure")

  Let's look at the `wsgi.py` present inside `imdb/imdb` folder. wsgi.py file is entrypoint for mod_wsgi to call the application. Later in article we will see how we provide entry-point for our application to apache module of mod_wsgi. There is a small change we have done so that the `imdb` app will have it's own process. We will deep dive further into this later in the article.

```python
"""
WSGI config for imdb project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
# comment and add new line so the process deamon will not be shared between multiple applications
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'imdb.settings')
  os.environ["DJANGO_SETTINGS_MODULE"] = "imdb.settings"

application = get_wsgi_application()
```

Django app will have line number 14 by default, which will cause app to share the process with other applications hosted by mod_wsgi in the same machine. By commenting line number 14 and adding line number 15, we are instructing mod_wsgi to use separate process for this application.



Apache allows to host applications in three ways Embedded, Daemon and Event mode. We will only talk about first two in the this article.

* Embedded Mode
* Daemon Mode