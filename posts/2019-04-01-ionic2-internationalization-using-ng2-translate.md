---
date: 2017-02-10T18:30:00.000Z
title: Ionic2 - Internationalization using ng2-translate
tags:
  - angular
  - ng2-translate
  - ionic
  - cordova
excerpt: >-
  To target target people from different countries, i18n support is required for
  your mobile app . Here in India where there are so many local languages, i18n
  support in mobile apps is must.
---
To target target people from different countries, i18n support is required for your mobile app . Here in India where there are so many local languages, i18n support in mobile apps is must.



In This blog, we will look how we can achieve i18n in ionic2 apps.



We all know ionic2 is based on angular version 2. New angular version has it's own [internationalization(i18n) approach](https://angular.io/docs/ts/latest/cookbook/i18n.html), but sadly this approach is [not yet supported in ionic2](https://github.com/driftyco/ionic/issues/8542).



Ionic team suggests to use ng2-translate for the internationalization in ionic2. Let's begin with it



Create a blank application in ionic2

`ionic start --v2 i18Ionic blank`
