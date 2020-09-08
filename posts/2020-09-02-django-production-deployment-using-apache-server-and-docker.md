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

The correct configuration to maximize the throughput of application is not just limited to properly configuring web-servers but also databases, messaging queues and other components of the entire application. In this article we will focus on how we can configure [Django](https://www.djangoproject.com/) application on [Apache web-server](https://httpd.apache.org/) on Unix based operating system to maximize the output. We will not talk about why should we use an server to host our applications. I would recommend you to search about it on your own.

Before looking at final configuration let's understand few terms and about application

* **mod_wsgi**: It provides an Apache module based on the python [WSGI](https://www.python.org/dev/peps/pep-3333/) specification. WSGI standard helps to setup an standard interface between web-servers and web-frameworks. The idea behind WSGI to have server and application. server will invoke your application. There could be some "middleware" too which helps both side to communicate with each other. I would recommend to read [WSGI](https://www.python.org/dev/peps/pep-3333/) specification to understand more about it.  [mod_wsgi](https://modwsgi.readthedocs.io/en/develop/index.html) allows to deploy code for frameworks like like Django, Flask, Pyramid and etc
* **Movie App**: We have built an django application named imdb. This is an simple application which returns a list of movies already populated into the sqllite DB. We will not deep dive into the how rest APIs can be built into Django app. We have already exposed an API `/movie` which will return list of movies.

  ![Application Folder Structure](assets/django_apache_project_structure.png "Application Folder Structure")

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

* **Embedded Mode**: This mode is also known as prefork mode, this is implemented by [Apache MPM prefork](https://httpd.apache.org/docs/2.4/mod/prefork.html) module. This is the default mode for the Apache server. In this mode both the proxy and the response processes are being managed by Apache only which is why it's called embedded mode. This mode is suitable for non-threaded applications or libraries. Here process are the ones which serve the request. Each process is isolated from another process. So even if there is an issue with one process, another will not be affected due to it. 

  ![Embedded Mode](assets/embedded_mode_apache.png "Embedded Mode Representations")

  Let's discuss about the configuration shown below
* **Virtual Host**: This is the block where we mention the application entry-point to mod_wsgi. All the settings shown inside virtual host willl be common for deamon and embedded mode. In case of deamon mode there will be few additional settings

  * **ServerName**: It can be the domain name by which we want to access the application or it can be the IP address of the server
  * **WSGIScriptAlias**: It is used to specify physical path of the wsgi script for the given application
  * **WSGIApplicationGroup**: It is used to group the applications hosted in single server. If there are multiple applications hosted in, we can group them to use the same python sub interpreter. If there is single applicaton you can set it **%{GLOBAL}**
  * **Directory-Files**: This makes sure that apache can access wsgi.py file
* **WSGIPythonPath**: This allows wsgi to search python modules. As Django application is bult of modules and wsgi.py shown above tries to access imdb module.
* **mpm_prefork_module**: Here we set the configuration for our server. As in embedded mode requests are served by process. So, we will look here what is the meaning of each directive

  * **StartServer**: The number of server process which should be active by default when server starts. Be cautious of the number you set here. As each process is an copy of the application you want to run and each one of it will reserve memory for itself. So setting very high number will throw you out of memory and processes will compete with each other to get memory without serving any request.

    **MinSpareServers**: It represents the number of ideal servers, who will be up and running but will not serve any request.

```xml
<IfModule mpm_prefork_module>
   StartServers 2
   MinSpareServers 2
   MaxSpareServers 6
   MaxRequestWorkers 30
   #ServerLimit
   #MaxConnectionsPerChild 5
</IfModule>

WSGIPythonPath /var/www/imdb
<VirtualHost *:80>
    ServerName localhost
    WSGIScriptAlias / /var/www/imdb/imdb/wsgi.py
    WSGIApplicationGroup %{GLOBAL}
    <Directory /var/www/imdb/imdb>
        <Files wsgi.py>
            Require all granted
        </Files>
    </Directory>
</VirtualHost>
```

**Daemon Mode**: This is know as worker mode and implemented by [mpm_worker_module](https://httpd.apache.org/docs/2.4/mod/worker.html)