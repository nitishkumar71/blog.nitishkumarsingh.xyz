---
date: 2019-08-24T06:48:37.094Z
title: Django app testing with unmanaged database
tags:
  - django
  - models
  - unittest
excerpt: >-
  We want to write unit test cases for databases which are not being managed by
  Django. Do you want to know how to do it?
---
**Before reading this post, you should know how to write unit test cases in Django, if you don't know it. Please go through** [**documentation**](https://docs.djangoproject.com/en/2.2/topics/testing/overview/#) **and then comeback to this post.**



There are cases when we want to work with legacy databases, databases which are used bey several applications or we don't want to use all of the columns of database in [Django](https://www.djangoproject.com/start/overview/) application. In these cases we don't want to change the DB schema based on Django models. In such cases we keep [**`Managed=False`**](https://docs.djangoproject.com/en/2.2/topics/db/models/#differences-between-proxy-inheritance-and-unmanaged-models) for the models.

It's an good solution provided by Django, but it creates problem while writing unit test for such applications. By setting **`Manged=False`**, we are instructing Django apps to not create tables if they don't exist. So while executing unit test we can't create test database to run unit test for database.

Thanks to Django, we already have an hack for it. The answer is **TestRunner** in Django. A test runner is a class defining a `run_tests()` method. Django ships with a [**DiscoverRunner**](https://docs.djangoproject.com/en/2.2/topics/testing/advanced/#defining-a-test-runner) class that defines the default Django testing behavior. This class defines the `run_tests()` entry point, plus a selection of other methods that are used to by `run_tests()` to set up, execute and tear down the test suite.

Below is the code, which can be used for to run test cases for unmanaged models

```
from django.test.runner import DiscoverRunner
from django.db.models.loading import get_models


class UnmanagedTestRunner(DiscoverRunner):

    """
    Custom test runner to change managed property of django models before 
    test execution starts
    """

    def setup_test_environment(self, *args, **kwargs):
        # set manged=True for all models
        for m in get_models():
            m._meta.managed = True
        super(UnmanagedTestRunner, self).setup_test_environment(*args,
                                                       **kwargs)

    def teardown_test_environment(self, *args, **kwargs):
        # set manged=True for all models
        for m in get_models():
            m._meta.managed = False 
        super(UnmanagedTestRunner,self).teardown_test_environment(*args,                                            **kwargs)
```

Above code will set Managed=True for all the django models, which will instruct Django to create table for each Django model.



That's it, go ahead and write unit test cases for unmanaged Django databases.
