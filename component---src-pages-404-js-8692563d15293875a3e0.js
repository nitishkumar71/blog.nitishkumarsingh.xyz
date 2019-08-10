(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{157:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(161),s=a(182),o=a(4),l=a.n(o),u=a(164),c=a.n(u),m=a(159);function g(e){var t=e.description,a=e.lang,n=e.meta,r=e.keywords,o=e.title;return i.a.createElement(m.StaticQuery,{query:h,render:function(e){var s=t||e.site.siteMetadata.description;return i.a.createElement(c.a,{htmlAttributes:{lang:a},title:o,titleTemplate:"%s | "+e.site.siteMetadata.title,meta:[{name:"description",content:s},{property:"og:title",content:o},{property:"og:description",content:s},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:title",content:o},{name:"twitter:description",content:s}].concat(r.length>0?{name:"keywords",content:r.join(", ")}:[]).concat(n)})},data:s})}g.defaultProps={lang:"en",meta:[],keywords:[]},g.propTypes={description:l.a.string,lang:l.a.string,meta:l.a.array,keywords:l.a.arrayOf(l.a.string),title:l.a.string.isRequired};var d=g,h="1315885718";t.default=function(){return i.a.createElement(r.a,null,i.a.createElement(d,{title:"404: Not found"}),i.a.createElement("h1",null,"NOT FOUND"),i.a.createElement("p",null,"Page you are requesting does not exist."))}},159:function(e,t,a){"use strict";a.r(t),a.d(t,"graphql",function(){return p}),a.d(t,"StaticQueryContext",function(){return g}),a.d(t,"StaticQuery",function(){return d}),a.d(t,"useStaticQuery",function(){return h});var n=a(0),i=a.n(n),r=a(4),s=a.n(r),o=a(158),l=a.n(o);a.d(t,"Link",function(){return l.a}),a.d(t,"withPrefix",function(){return o.withPrefix}),a.d(t,"navigate",function(){return o.navigate}),a.d(t,"push",function(){return o.push}),a.d(t,"replace",function(){return o.replace}),a.d(t,"navigateTo",function(){return o.navigateTo});var u=a(160),c=a.n(u);a.d(t,"PageRenderer",function(){return c.a});var m=a(33);a.d(t,"parsePath",function(){return m.a});var g=i.a.createContext({}),d=function(e){return i.a.createElement(g.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):i.a.createElement("div",null,"Loading (StaticQuery)")})},h=function(e){i.a.useContext;var t=i.a.useContext(g);if(t[e]&&t[e].data)return t[e].data;throw new Error("The result of this StaticQuery could not be fetched.\n\nThis is likely a bug in Gatsby and if refreshing the page does not fix it, please open an issue in https://github.com/gatsbyjs/gatsby/issues")};function p(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}d.propTypes={data:s.a.object,query:s.a.string.isRequired,render:s.a.func,children:s.a.func}},160:function(e,t,a){var n;e.exports=(n=a(163))&&n.default||n},161:function(e,t,a){"use strict";var n=a(162),i=a(0),r=a.n(i),s=a(4),o=a.n(s),l=a(159),u=a(52),c=a.n(u),m=a(7),g=a.n(m),d=a(164),h=a(147),p=a.n(h),M=function(e){var t=e.d,a=e.size,n=void 0===a?"1em":a,i=e.label,s=e.style;return r.a.createElement("span",{className:p.a.root,style:s,role:"figure"},r.a.createElement("svg",{version:"1.1",width:n,height:n,viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{d:t,className:p.a.icon})),i&&r.a.createElement("span",{className:p.a.label},i))};M.propTypes={d:o.a.string,size:o.a.number,label:o.a.string,style:o.a.object};var b=M,f=a(148),y=a.n(f),T=function(e){var t=e.mainMenu,a=e.mainMenuItems,n=e.isMobileMenu,i=t.slice(0);return!n&&i.splice(a),i.map(function(e,t){return r.a.createElement("li",{key:t},r.a.createElement("a",{href:e.path,target:e.target},e.title))})},E=function(e){var t=e.mainMenu,a=e.mainMenuItems,n=e.onToggleSubMenu,i=t.slice(0);i.splice(0,a);var s=i.map(function(e,t){return r.a.createElement("li",{key:t},r.a.createElement(l.Link,{to:e.path},e.title))});return r.a.createElement(r.a.Fragment,null,s,r.a.createElement("div",{className:y.a.subMenuOverlay,role:"button",tabIndex:0,onClick:n}))},v=function(e){var t=e.mainMenu,a=e.mainMenuItems,n=e.menuMoreText,i=e.isMobileMenuVisible,s=e.isSubMenuVisible,o=e.onToggleMobileMenu,l=e.onToggleSubMenu,u=(e.onChangeTheme,!(a>=t.length)&&a>0);return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:y.a.mobileMenuContainer},r.a.createElement(r.a.Fragment,null,i?r.a.createElement(r.a.Fragment,null,r.a.createElement("ul",{className:y.a.mobileMenu},r.a.createElement(T,{mainMenu:t,isMobileMenu:!0})),r.a.createElement("div",{onClick:o,className:y.a.mobileMenuOverlay})):null,r.a.createElement("button",{className:y.a.menuTrigger,style:{color:"inherit"},onClick:o,type:"button"},r.a.createElement(b,{style:{cursor:"pointer"},size:24,d:"M4 34H40V30H4V34ZM4 24H40V20H4V24ZM4 10V14H40V10H4Z"})))),r.a.createElement("div",{className:y.a.desktopMenuContainer},r.a.createElement("ul",{className:y.a.menu},r.a.createElement(T,{mainMenu:t,mainMenuItems:a}),u?r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{className:y.a.subMenuTrigger,onClick:l,type:"button"},n||"Menu"," ",r.a.createElement("span",{className:y.a.menuArrow},">")),s?r.a.createElement("ul",{className:y.a.subMenu},r.a.createElement(E,{mainMenu:t,mainMenuItems:a,onToggleSubMenu:l})):null):null)))};v.propTypes={mainMenu:o.a.arrayOf(o.a.shape({title:o.a.string,path:o.a.string,target:o.a.string})),mainMenuItems:o.a.number,menuMoreText:o.a.string,isMobileMenuVisible:o.a.bool,isSubMenuVisible:o.a.bool,onToggleMobileMenu:o.a.func,onToggleSubMenu:o.a.func,onChangeTheme:o.a.func},E.propTypes={mainMenu:o.a.arrayOf(o.a.shape({title:o.a.string,path:o.a.string,target:o.a.string})),mainMenuItems:o.a.number,onToggleSubMenu:o.a.func};var w=v,S=a(149),k=a.n(S),x=function(e){function t(){for(var t,a=arguments.length,n=new Array(a),i=0;i<a;i++)n[i]=arguments[i];return(t=e.call.apply(e,[this].concat(n))||this).state={userTheme:"undefined"!=typeof window&&window.localStorage.getItem("theme")||null,isMobileMenuVisible:!1,isSubMenuVisible:!1},t.onChangeTheme=t.onChangeTheme.bind(c()(t)),t.onToggleMobileMenu=t.onToggleMobileMenu.bind(c()(t)),t.onToggleSubMenu=t.onToggleSubMenu.bind(c()(t)),t}g()(t,e);var a=t.prototype;return a.onChangeTheme=function(){var e=this.state.userTheme,t="dark"===e||null===e?"light":"dark";this.setState({userTheme:t}),"undefined"!=typeof window&&window.localStorage.setItem("theme",t)},a.onToggleMobileMenu=function(){var e=this.state.isMobileMenuVisible;this.setState({isMobileMenuVisible:!e})},a.onToggleSubMenu=function(){var e=this.state.isSubMenuVisible;this.setState({isSubMenuVisible:!e})},a.render=function(){var e=this.props,t=e.siteLogo,a=(e.logoText,e.siteTitle),n=e.mainMenu,i=e.mainMenuItems,s=e.menuMoreText,o=e.theme,u=this.state,c=u.userTheme,m=u.isSubMenuVisible,g=u.isMobileMenuVisible;return r.a.createElement(r.a.Fragment,null,r.a.createElement(d.Helmet,null,r.a.createElement("title",null,a),r.a.createElement("body",{className:"light"===(c||o)?"light-theme":"dark-theme"})),r.a.createElement("header",{className:k.a.header},r.a.createElement("div",{className:k.a.inner},r.a.createElement(l.Link,{to:"/"},r.a.createElement("div",{className:k.a.logo},r.a.createElement("span",{className:k.a.text},t.alt))),r.a.createElement("span",{className:k.a.right},r.a.createElement(w,{mainMenu:n,mainMenuItems:i,isMobileMenuVisible:g,isSubMenuVisible:m,menuMoreText:s,onToggleMobileMenu:this.onToggleMobileMenu,onToggleSubMenu:this.onToggleSubMenu,onChangeTheme:this.onChangeTheme})))))},t}(r.a.Component);x.propTypes={siteTitle:o.a.string,siteLogo:o.a.object,logoText:o.a.string,theme:o.a.string,mainMenu:o.a.arrayOf(o.a.shape({title:o.a.string,path:o.a.string})),mainMenuItems:o.a.number,menuMoreText:o.a.string};var N=x,C=(a(150),function(e){var t=e.children;return r.a.createElement(l.StaticQuery,{query:"1100765260",render:function(e){return r.a.createElement("div",{className:"container"},r.a.createElement(N,{siteTitle:e.site.siteMetadata.title,siteLogo:e.site.siteMetadata.logo,logoText:e.site.siteMetadata.logoText,defaultTheme:e.site.siteMetadata.defaultTheme,mainMenu:e.site.siteMetadata.mainMenu,mainMenuItems:e.site.siteMetadata.showMenuItems,menuMoreText:e.site.siteMetadata.menuMoreText}),r.a.createElement("div",{className:"content"},t),r.a.createElement("footer",null,e.site.siteMetadata.copyrights?e.site.siteMetadata.copyrights:r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{className:"footerCopyrights"},"© 2019 ",r.a.createElement("a",{href:"https:/nitishkumarsingh.xyz/"},"Nitishkumar Singh")))))},data:n})});C.propTypes={children:o.a.node.isRequired};t.a=C},162:function(e){e.exports={data:{site:{siteMetadata:{title:"Nitishkumar's Blog Home",logo:{src:"static/myAvatar.svg",alt:"A lot of lengthy talks!"},logoText:"A lot of lengthy talks!",defaultTheme:"light",copyrights:"",mainMenu:[{title:"About",path:"https://twitter.com/Nitishkumar071",target:"_blank"}],showMenuItems:2,menuMoreText:"Show more"}}}}},163:function(e,t,a){"use strict";a.r(t);a(32);var n=a(0),i=a.n(n),r=a(4),s=a.n(r),o=a(55),l=a(2),u=function(e){var t=e.location,a=l.default.getResourcesForPathnameSync(t.pathname);return i.a.createElement(o.a,Object.assign({location:t,pageResources:a},a.json))};u.propTypes={location:s.a.shape({pathname:s.a.string.isRequired}).isRequired},t.default=u},182:function(e){e.exports={data:{site:{siteMetadata:{title:"Nitishkumar's Blog Home",description:"Let's talk about everything in technology"}}}}}}]);
//# sourceMappingURL=component---src-pages-404-js-8692563d15293875a3e0.js.map