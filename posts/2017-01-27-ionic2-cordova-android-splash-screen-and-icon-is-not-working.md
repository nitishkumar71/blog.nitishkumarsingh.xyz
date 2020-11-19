---
date: 2017-01-27T14:40:28.697Z
title: Ionic2/Cordova - Android splash screen and icon is not working
draft: false
tags:
  - angular
  - Cordova
  - Ionic
excerpt: >-
  An attractive icon and splash screen are always important for your  
  mobileapplication. after all they are the first thing anyone will look into.
---
An attractive icon and splash screen are always important for your mobile    application. after all they are the first thing anyone will look into.

But this has been always a great headache for the developers. Since they need to support multiple platforms and devices with different screen sizes. Each platform and device requires different size of icons and splash screen.



We are lucky that Ionic team has taken care of this for us. We can read about all this from there documentation. 

[Ionic Icon and Splash Screen Image Generation](https://ionicframework.com/docs/cli/commands/cordova-resources)

After the release of Cordova 6.0, icon and splash screen is not updating for android platform and it is showing default icon and splash screen. Actually there was an issue in Cordova 6.0 version, which is now fixed in latest Cordova android version. 

Since Ionic2 is still referring to the old Cordova 6 version, this issue is occurring for all the new applications that are being created. There is a solution for the same which we will look here now.

Open terminal/command prompt, navigate to ionic project root folder and enter below commands

**Remove android platform**

```
ionic platform rm android
```

**Add latest Cordova android version**

```
ionic platform add android@latest
```

Generate icon and splash screen using ionic CLI

if you don't know anything about ionic icon and splash screen generation, then please read link mentioned above. 

We can use ionic CLI to generate the icon and splash screen required for all different platforms and devices. use the below commands for icons and splash screen respectively.

```
ionic resources --icon 
ionic resources --splash
```

or we can use one command to generate both the icon and splash screen

```
ionic resources
```

**Set config.xml for splash screen**

```
<preference name="SplashMaintainAspectRatio" value="true"/>
<preference name="FadeSplashScreenDuration" value="3000"/>
<preference name="SplashScreen" value="screen"/>
<preference name="SplashScreenDelay" value="2000"/>
<preference name="SplashShowOnlyFirstTime" value="false"/>
<preference name="AutoHideSplashScreen" value="false"/>
<preference name="ShowSplashScreenSpinner" value="false"/>
```

That's it, we can build our application and it will work like a Charm.
