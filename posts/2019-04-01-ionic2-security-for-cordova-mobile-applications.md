---
date: 2017-02-18T18:30:00.000Z
title: Ionic2 - Security for Cordova mobile applications
draft: false
tags:
  - angular
  - cordova
  - ionic
  - security
  - whitelist
excerpt: >-
  One of the great challenge for mobile developers is securing it. In case of
  Cordova based mobile applications, this challenge is more complex. Since, all
  the cordova based mobile applications are nothing but an website with
  index.html. The only difference here is that this website runs within your
  mobile and all the html pages are wrapped within native container of mobile
  platforms.
---
 One of the great challenge for mobile developers is securing it. In case of Cordova based mobile applications, this challenge is more complex. Since, all the cordova based mobile applications are nothing but an website with index.html. The only difference here is that this website runs within your mobile and all the html pages are wrapped within native container of mobile platforms.

Let's look at the some of the points to be taken care while securing your mobile application:

## [Cordova Whitelist Plugin](https://cordova.apache.org/docs/en/latest/guide/appdev/whitelist/)

This helps in restricting the access from your application to external websites. It prevents attackers to get information about user by injecting their own javascript code into your application. By default access policy is set to allow access for all domains.

```
<access origin="*" />
```

Change this to point only to your site

```
<access origin="https://yoursite.com/" />
```

##  **Transfer Data Using Https:**

Data transferred over http can be intercepted and altered, but data sent over https can not be intercepted and altered.

## **Don't Store Sensitive information in LocalStorage**

One of the biggest mistake that is being done by hybrid developers is that many of them store sensitive information like username and password into the localstorage. Localstorage of one application can be accessed  by the other application. It's like storing username and password into browser, which is of course not advisable.

Instead of storing username and password, try storing tokens such as JWT tokens. One thing to take care is that, do not use password while creating JWT tokens. Since JWT tokens are a key, which can be intercepted by attacker, but then also it does not provide any sensitive information to attacker. JWT tokens does not contain any sensitive information about user. They are just use to authenticate users.  Although, if someone was able to get JWT tokens, they can log on behalf of user, We need to consider this while developing our application.



## Use Authentication Service

You can also develop your own authentication  service for mobile application. It should also be taken care that, developing an own authentication service is difficult task as w need to take about a lot of security perspectives. You can use Social providers such as Google, Facebook, Github etc. for authenticating users. There are also Services like Auth0 or OAuth which can be used to secure your application.

You can also integrate your server with [Ionic Auth](http://docs.ionic.io/services/auth/) for authentication purpose.

Hope this post would have given you clear understanding about authentication in hybrid mobile applications., white
