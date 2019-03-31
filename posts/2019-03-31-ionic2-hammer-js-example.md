---
date: 2017-03-13T14:40:28.697Z
title: Ionic2 - Hammer JS Example
tags:
  - angular
  - Cordova
  - gesture
  - Hammer.js
  - Ionic
excerpt: >-
  Gesture event support is also one of the reason behind popularity of mobile
  applications. Capturing gesture events can be easily done in case of native
  mobile applications, since all the mobile platform expose gesture events in
  native code.
---
Gesture event support is also one of the reason behind popularity of mobile
applications. Capturing gesture events can be easily done in case of native
mobile applications, since all the mobile platform expose gesture events in
native code. Since Hybrid mobile applications are built over html and 
javascript,  html don't support gesture events.
There could be scenario's, where you wants to provide support for your hybrid
mobile application. In such cases, we can use Hammer.JS . Angular version 2
also provides support for Hammer.JS, about the same we will look into this
post.
Let's say we want to design a simple box, which we can rotate in any direction
as shown
![Hammer JS With Ionic](/assets/ezgif.com-video-to-gif.gif "Hammer JS With
Ionic")


Here we are trying to rotate the box in any direction by using Gesture events.
To perform rotation we need to use two fingers. Let's see how we can implement
the same in Ionic. Let's create a blank application using command

```

ionic start hammerjsExample blank --v2
```


Now let's add Hammer.JS into our application using the command

```

npm install hammerjs --save
```


We will implement rotation event, which is by default disabled. So first we
need to enable rotation event. As we have mentioned earlier, angular version 2
also has support for Hammer.js. Let's see how we can achieve this.
Angular defines defines one dependency token and one class, which can be used
to customize behavior of Hammer.js. They are:

* **HAMMER_GESTURE_CONFIG** : it can be used to provide HammerGestureConfig,
  which can be used to configure Hammer gestures
* **HammerGestureConfig** : This class is helpful to override the default
  settings of Hammer. To know more about the gesture events configuration,
  please look into official documentation of Hammer.


To enable rotation first we need to import **HAMMER_GESTURE_CONFIG**,
**HammerGestureConfig** into app.module.ts

```

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from
'@angular/platform-browser';
```


Now let's create our own **CustomHammerConfig** class in app.module.ts, which
will extend class **HammerGestureConfig** to override Hammer.js Configuration.

```

export class CustomHammerConfig extends HammerGestureConfig {
overrides = {
'rotate': { enable: true } //rotate is disabled by default, so we need to
enable it
}
}
```


Now let's change providers in NgModule as shown

```

@NgModule({
declarations: [
MyApp,
HomePage,
RotateCustomeDirective
],
imports: [
IonicModule.forRoot(MyApp)
],
bootstrap: [IonicApp],
entryComponents: [
MyApp,
HomePage
],
providers: [{
provide: ErrorHandler,
useClass: IonicErrorHandler,
}, {
provide: HAMMER_GESTURE_CONFIG,
useClass: CustomHammerConfig
}]
})
export class AppModule { }
```


In above code you can see **RotateCustomeDirective** in declarations section,
for now just understand it's the directive we are going to implement. To
capture Gesture events, let's create a directive. To create directive, create
a folder directives named in **_src folder_** of our ionic application. In
directives folder, let's create a directive named **RotateCustomeDirective**
in the file rotate-custom-directive.ts.


Let's register **rotatemove** event using **HostListener**, as well as emit
the output angle using **EventEmitter**. The output will be applied to change
the angle of the object using style properties.
Our custom directive **RotateCustomeDirective** code present in
**_src/directives/rotate-custom-directive.ts_** will look something as shown

```

import { Directive, Output, EventEmitter, HostListener } from
'@angular/core';
@Directive({
selector: '[rotateCustom]'
})
export class RotateCustomeDirective {
@Output() angleChange = new EventEmitter<any>();
//although rotatestart is not required here, but we are keeping it here
for reference purpose
/*
@HostListener('rotatestart', ['$event']) protected onRotateStart(event)
{
event.preventDefault();
//put your code
}
*/
@HostListener('rotatemove', ['$event']) protected onRotateMove(event) {
event.preventDefault();
this.angleChange.emit({ angle: event.angle });
}
}
```


Here **angleChange** will be capture by the component, which will be rotated.
it will return rotation angle which we will be using to implement rotation.
Let's change the **HomePage**, to capture this event. First change the code
for **_home.html_**, **_home.scss_** and **_home.ts_** as shown
**home.html**

```

<ion-header>
<ion-navbar>
<ion-title>
Hammer JS Example
</ion-title>
</ion-navbar>
</ion-header>
<ion-content padding>
<div anglechange class="box" event onrotation rotatecustom style.transform
transformstyle>
<div class="label">
{{title}}</div>
</div>
</ion-content>
```


here we applied **rotateCustom** on the div and registering **OnRotation()**
event to receive the angle for rotation. The received angle will be used to
update style.transform css property using variable transformStyle.
**home.scss**
page-home {
}
.box {
margin: 50px 0 0 50px;
width:200px;
height:200px;
background-color: #9933ff;
}
.box .label{
text-align: center;
color: #fff;
font-weight: bold;
font-size: 16px;
padding: 45% 0 0 0;
}
.box:hover {
cursor:pointer;
}

**home.ts**
import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
@Component({
selector: 'page-home',
templateUrl: 'home.html'
})
export class HomePage {
angle: Number;
transformStyle: String;
title = 'Rotate Me!';
constructor(public navCtrl: NavController) {
// set default angle to 0deg
this.angle=0;
this.transformStyle="rotate(0deg)";
}
onRotation(event: any): void {
this.angle=event.angle;
this.transformStyle="rotate("+this.angle+"deg)";
}
}


In constructor we applied zero degree be default. **onRotation** function will
capture the angle and update the transform variable to apply changes in style.
That's it, we are ready to build and run our application in mobile.
[Github Link for Example](https://github.com/nitishkumar71/hammerjsExample)
