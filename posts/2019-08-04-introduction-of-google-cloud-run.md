---
date: 2019-08-04T13:32:11.884Z
title: Introduction of Google Cloud Run
tags:
  - serverless
  - cloudrun
  - gcp
  - aws
excerpt: >-
  Google Cloud Run is a managed service that enables you to run stateless
  containers that are invocable via web requests or Cloud Pub/Sub events. It
  manages all infrastructure management, so developers can focus on building
  applications.
---
There has been always pretty much hype around serverless from the day one. Although, all the workload is only going to run on servers itself. If that is the case, then why we call it serverless?

![Serverless!? Doesn't anyone relize there are still serveres?](/assets/serverless-meme.jpg "Serverless!? Doesn't anyone relize there are still serveres?")

The idea behind serverless is to provide an framework, where developers can build and deploy small applications quickly without being concerned about deployment overhead. If you need a lot of resources like high memory and lots of disk space, serverless is probably not a great approach. But If you can’t predict the volume, and you’re doing lots of small transactional workloads, then serverless is really good.

OK, so that was the same repeated information you will find in every other blogs. But do you know there has been great adoption of serverless framework by different cloud provideres. Even there are different open source frameworks, which allows us to host and deploy our serverless environment. Although, managing serverless environment is not that easy. There is a small learning curve around it.

**Some of the opensource framework for serverelss environments are:**

1. [kubeless](https://kubeless.io/)
2. [knative](https://knative.dev/)
3. [fn](https://fnproject.io/)
4. [openwhisk](http://openwhisk.apache.org/)

**Some of the managed services provided by cloud providers**

1. Google Cloud Functions
2. AWS lambda
3. Azure functions

We won't get into the details of all of them, as there is too much information provided around it. We would be looking into the Google Cloud Run, which is an managed service build on knative as depicted below

![Google Cloud Run](/assets/cloud-run-on-gke.jpg "Google Cloud Run")

**So, what is special about Cloud Run?** 

Cloud Run follows the same principal of serverless, but allows developer to run containers in serverless environment. These containers could be your normal containers with any application packaged within them. 

**How Cloud Run is different is from other managed serverless frameworks such as Google cloud functions, AWS lambda and etc?**

In other managed frameworks, we are dependent on cloud providers to support and language or framework, but in cloud run we can use any language or framework of our choice.

**Let's see an example of how we can deploy an django app on google cloud run**

1. **Create Django APP**

   We will not go in detail, about how an app can be created in django. Please follow the official [documentation](https://docs.djangoproject.com/en/2.2/intro/tutorial01/) for the same. We have created an simple GET api. The final application structure would be something like below.

   ![Cloud Run Django app](/assets/cloud_run_django_app.png "Cloud Run Django app")

   There will be no **_Dockerfile_** and **_httpd-foreground_** by default, when django application get created.

2. **Write Docker File**

   We won't be covering details about how this dockerfile works in this blog post.

```
        FROM alpine:3.9
        LABEL author="Nitishkumar Singh"
        
        RUN apk --update --no-cache add python3 python3-dev apache2 apache2-dev  wget ca-certificates make gcc musl-dev;\
        ln -s pip3 /usr/bin/pip; pip install -U pip setuptools wheel
        
        # mod_wsgi compilation
        RUN wget -O /tmp/mod_wsgi.tar.gz https://storage.googleapis.com/google-code-archive-downloads/v2/code.google.com/modwsgi/mod_wsgi-3.4.tar.gz && \
            tar -C /tmp -xvf /tmp/mod_wsgi.tar.gz && \
            rm /tmp/mod_wsgi.tar.gz
        
        WORKDIR /tmp/mod_wsgi-3.4
        RUN ln -s /usr/lib/libpython3.6m.so /usr/lib/libpython3.6.so && \
            ./configure --with-python=/usr/bin/python3.6 --with-apxs=/usr/bin/apxs && \
            make && make install clean; rm -rf /tmp/mod_wsgi-3.4 \
        mkdir -p /var/www/my_django_app; mkdir -p /etc/apache2/sites-available/; \
        mkdir -p /etc/apache2/mods-available/
        
        WORKDIR /var/www/my_django_app
        COPY . /var/www/my_django_app
        
        # ARG PORT
        
        RUN echo -e "import os\n\
        import sys\n\
        path='/var/www/my_django_app'\n\
        if path not in sys.path:\n\
            sys.path.append(path)\n\
        os.environ['DJANGO_SETTINGS_MODULE'] = 'my_django_app.settings'\n\
        from django.core.wsgi import get_wsgi_application\n\
        application = get_wsgi_application()" >> /var/www/my_django_app/django.wsgi; \
        sed -i -r 's@#(LoadModule rewrite_module modules/mod_rewrite.so)@\1@i' /etc/apache2/httpd.conf; \
        sed -i -r 's@Errorlog .*@Errorlog /var/log/apache2/error.log@i' /etc/apache2/httpd.conf; \
        sed -i -r 's@#Servername .*@ServerName localhost@i' /etc/apache2/httpd.conf; \
        sed -i -r 's@Listen 80.*@Listen 8080@i' /etc/apache2/httpd.conf; \
        echo -e 'Transferlog /dev/stdout\n\
        LoadModule wsgi_module modules/mod_wsgi.so\n\
        WSGIPythonPath /usr/lib/python3.6\n\
        WSGIScriptAlias / /var/www/my_django_app/django.wsgi\n\
        <Directory /var/www/my_django_app>\n\
            Options ExecCGI Indexes FollowSymLinks\n\
            AllowOverride All\n\
            Require all granted\n\
            <Files django.wsgi>\n\
                Require all granted\n\
            </Files>\n\
        </Directory>' >> /etc/apache2/httpd.conf
        RUN pip install -r requirements.txt; chown apache:apache /etc/apache2/; \
        chown -R apache:apache /var/www/
        COPY httpd-foreground /usr/local/bin/
        EXPOSE 8080
        # ENTRYPOINT ["httpd", "-D", "FOREGROUND", "-e", "info", "&"]
        CMD ["httpd-foreground"]
```
 
   Here we are exposing application on port 8080(default for Cloud  Run) and excecuting httpd-foreground file.

3. **Write httpd-foreground file**


```
        #!/bin/sh
        set -e
        
        # Apache gets grumpy about PID files pre-existing
        rm -f /usr/local/apache2/logs/httpd.pid
        
        exec httpd -DFOREGROUND
```

   httpd-foreground is an simple shell script, which we will be using to run apache on foreground.

4. **Build Docker Image and push to GCR**

   Build docker image locally

   `sudo docker build .`

   [Tag image to upload to GCR](https://cloud.google.com/container-registry/docs/pushing-and-pulling#tag_the_local_image_with_the_registry_name)

   `sudo docker tag <IMAGE_ID> asia.gcr.io/<project_name>/my_django_app`

   [Push Image to GCR](https://cloud.google.com/container-registry/docs/pushing-and-pulling#push_the_tagged_image_to)``

   `sudo docker push asia.gcr.io/<project_name>/my_django_app`

5. **Create Cloud Run Service**

   Open Cloud Run Portal, and click on **create service**

   ![Create Service](/assets/create-service.png "Create create serviceService")

   After click, you will be shown below page

   ![Cloud Run with options](/assets/cloud-run-service-with-options.png "Cloud Run with options")

   As, you would have noticed, you can set environment variables as well as configure multiple [Cloud SQL services](https://cloud.google.com/sql/docs/), which are needed to be accessed by Cloud RUN. You should only select [_**Allow unauthenticated invocations**_](https://cloud.google.com/run/docs/authenticating/public), if and only if you want to allow end-points to be publicly accessible.

   After selecting all the required options, your form will look something like this.

   ![Cloud Run With completed options](/assets/screenshot_my_django_app_cloud_run.png "Cloud Run With completed options")

   Click on create button to deploy the docker image. after successful deployment, you will be redirected to below page

   ![Cloud Run Deployed](/assets/cloud_run_my_django_app_deployed.png "Cloud Run Deployed")

   You can use **URL** to access the application, being deployed on cloud run. As visible from page, you can have multiple versions of app deployed. We can also redirect a part of traffic to test the canary releases.

   That's it about how we can deploy an application on cloud run. To explore further follow the documentation of Google Cloud Run.

   Django App [GitLab Repository](https://github.com/nitishkumar71/blog/tree/master/google-cloud-run) for Cloud Run

**Refrences**

* [**Google Cloud Run on VM and GKE**](https://twitter.com/ahmetb/status/1116041166359654400/photo/1)
* [**Google Cloud Run Docs**](https://cloud.google.com/run/docs/)
