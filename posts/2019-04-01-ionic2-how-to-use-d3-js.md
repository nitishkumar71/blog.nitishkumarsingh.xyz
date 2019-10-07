---
date: 2017-02-03T18:30:00.000Z
title: Ionic2 - How to use D3 JS
draft: false
tags:
  - angular
  - cordova
  - ionic
  - d3
  - types
excerpt: >-
  During the UI/Mobile app development, we all would have encountered need to
  use data visualization components. D3 JS is one of such powerful tool, being
  used for same.
---
**Note: Purpose for this post is just to show, how to correctly use D3 JS in Ionic2**

During the UI/Mobile app development, we all would have encountered need to use data visualization components. [D3 JS](https://d3js.org/) is one of such powerful tool, being used for same.

Using D3 in Ionic1 was pretty easy. Since Ionic2 has moved on typescript and node modules based development, developers has been facing difficulties about how to include any third party libraries. D3 is one of such libraries. Here in this post we will look how we can include D3 into our ionic2 application.

**Install Typings**

[Typings](https://github.com/typings/typings) is the simple way to manage and install TypeScript definitions. First we need to install typings, use given commnad in cmd/terminal:

```
npm install -g typings
```

**Create Ionic2 blank application**

use the below command to create blank ionic application

```
ionic start --v2 myApp blank
```

this command will create an empty ionic2 project, which will contain two components app and home. app is your main component. you can include as many as page like home and use ionic navcontroller to navigate between them. For this post we don't need to include any more pages. the folder structure will look like as shown:

![D3 Folder Structure](/assets/d3jsionicfolderstructure.png "D3 Folder Structure")

navigate to the root folder myApp of your application into terminal/cmd, and search for typings of d3 using given command

```
typings search d3
```

This will list all the typings available for D3 js in npm, which will look something like this

![D3 Typings](/assets/d3typings.png "D3 Typings")

The purpose for above command is just to check availability of typings for d3.

Now install d3 into your application using command

```
typings install d3 --save
```

once the d3 has been successfully installed. we are ready to use d3 into our application. Now all we have to do is import d3 into home.ts as shown

```
import * as d3 from 'd3';
```

That's it, everthing is ready. we can now use D3 using "d3" object, which is the name we have given it during import. we can now call any D3 function such as pie(), arc() using d3 object as shown d3.pie();

Here we are including an example, where we have d3 in **home.ts**

```
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import * as d3 from 'd3';
@Component({  
    selector: 'page-home',  
    templateUrl: 'home.html'
})
export class HomePage {  
    constructor(private platform: Platform) 
    {  }  
    
    ngAfterViewInit() {    
        this.createChart();  
    }  
    
    createChart() {    
        var data = [10, 20, 50];    
        var width = this.platform.width()-50,      
        height = this.platform.height()-200,      
        radius = Math.min(width, height) / 2;    

        var color = d3.scaleOrdinal()      
        .range(["#993300", "#996600", "#cc6600"]); 

        var arc = d3.arc()      
        .outerRadius(radius - 10)      
        .innerRadius(0);    
        
        var labelArc = d3.arc()      
        .outerRadius(radius - 40)      
        .innerRadius(radius - 40);    
        
        var pie = d3.pie()      
        .sort(null)      
        .value(function (d) { return d; });    
        
        var svg = d3.select(".chart")      
        .attr("width", width)      
        .attr("height", height)      
        .append("g")      
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");   
        
        var g = svg.selectAll(".arc")      
        .data(pie(data))      
        .enter().append("g")      
        .attr("class", "arc");    
        
        g.append("path")      
        .attr("d", arc)      
        .style("fill", function (d) { return color(d.data); });  
        
        g.append("text")      
        .attr("transform", function (d) { 
            return "translate(" + labelArc.centroid(d) + ")"; 
        })      
        .attr("dy", ".35em")      
        .text(function (d) { return d.data; });  
    }
}
```

Cheers!! This was all we needed to begin our development for ionic2 using d3 js

[Github Link](https://github.com/nitishkumar71/Ionic2-D3Example)
