(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{154:function(e,t,a){"use strict";a.r(t),a.d(t,"graphql",function(){return h}),a.d(t,"StaticQueryContext",function(){return m}),a.d(t,"StaticQuery",function(){return f}),a.d(t,"useStaticQuery",function(){return p});var n=a(0),i=a.n(n),r=a(4),s=a.n(r),l=a(153),o=a.n(l);a.d(t,"Link",function(){return o.a}),a.d(t,"withPrefix",function(){return l.withPrefix}),a.d(t,"navigate",function(){return l.navigate}),a.d(t,"push",function(){return l.push}),a.d(t,"replace",function(){return l.replace}),a.d(t,"navigateTo",function(){return l.navigateTo});var u=a(155),c=a.n(u);a.d(t,"PageRenderer",function(){return c.a});var d=a(33);a.d(t,"parsePath",function(){return d.a});var m=i.a.createContext({}),f=function(e){return i.a.createElement(m.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):i.a.createElement("div",null,"Loading (StaticQuery)")})},p=function(e){i.a.useContext;var t=i.a.useContext(m);if(t[e]&&t[e].data)return t[e].data;throw new Error("The result of this StaticQuery could not be fetched.\n\nThis is likely a bug in Gatsby and if refreshing the page does not fix it, please open an issue in https://github.com/gatsbyjs/gatsby/issues")};function h(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}f.propTypes={data:s.a.object,query:s.a.string.isRequired,render:s.a.func,children:s.a.func}},155:function(e,t,a){var n;e.exports=(n=a(158))&&n.default||n},156:function(e,t,a){"use strict";var n=a(157),i=a(0),r=a.n(i),s=a(4),l=a.n(s),o=a(154),u=a(52),c=a.n(u),d=a(7),m=a.n(d),f=a(159),p=a(142),h=a.n(p),g=function(e){var t=e.d,a=e.size,n=void 0===a?"1em":a,i=e.label,s=e.style;return r.a.createElement("span",{className:h.a.root,style:s,role:"figure"},r.a.createElement("svg",{version:"1.1",width:n,height:n,viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{d:t,className:h.a.icon})),i&&r.a.createElement("span",{className:h.a.label},i))};g.propTypes={d:l.a.string,size:l.a.number,label:l.a.string,style:l.a.object};var b=g,y=a(143),M=a.n(y),E=function(e){var t=e.mainMenu,a=e.mainMenuItems,n=e.isMobileMenu,i=t.slice(0);return!n&&i.splice(a),i.map(function(e,t){return r.a.createElement("li",{key:t},r.a.createElement("a",{href:e.path,target:e.target},e.title))})},v=function(e){var t=e.mainMenu,a=e.mainMenuItems,n=e.onToggleSubMenu,i=t.slice(0);i.splice(0,a);var s=i.map(function(e,t){return r.a.createElement("li",{key:t},r.a.createElement(o.Link,{to:e.path},e.title))});return r.a.createElement(r.a.Fragment,null,s,r.a.createElement("div",{className:M.a.subMenuOverlay,role:"button",tabIndex:0,onClick:n}))},S=function(e){var t=e.mainMenu,a=e.mainMenuItems,n=e.menuMoreText,i=e.isMobileMenuVisible,s=e.isSubMenuVisible,l=e.onToggleMobileMenu,o=e.onToggleSubMenu,u=e.onChangeTheme,c=!(a>=t.length)&&a>0;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:M.a.mobileMenuContainer},r.a.createElement(r.a.Fragment,null,i?r.a.createElement(r.a.Fragment,null,r.a.createElement("ul",{className:M.a.mobileMenu},r.a.createElement(E,{mainMenu:t,isMobileMenu:!0})),r.a.createElement("div",{onClick:l,className:M.a.mobileMenuOverlay})):null,r.a.createElement("button",{className:M.a.menuTrigger,style:{color:"inherit"},onClick:l,type:"button"},r.a.createElement(b,{style:{cursor:"pointer"},size:24,d:"M4 34H40V30H4V34ZM4 24H40V20H4V24ZM4 10V14H40V10H4Z"})))),r.a.createElement("div",{className:M.a.desktopMenuContainer},r.a.createElement("ul",{className:M.a.menu},r.a.createElement(E,{mainMenu:t,mainMenuItems:a}),c?r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{className:M.a.subMenuTrigger,onClick:o,type:"button"},n||"Menu"," ",r.a.createElement("span",{className:M.a.menuArrow},">")),s?r.a.createElement("ul",{className:M.a.subMenu},r.a.createElement(v,{mainMenu:t,mainMenuItems:a,onToggleSubMenu:o})):null):null)),r.a.createElement("button",{className:M.a.themeToggle,onClick:u,type:"button"},r.a.createElement(b,{style:{cursor:"pointer"},size:24,d:"M22 41C32.4934 41 41 32.4934 41 22C41 11.5066 32.4934 3 22\n3C11.5066 3 3 11.5066 3 22C3 32.4934 11.5066 41 22 41ZM7 22C7\n13.7157 13.7157 7 22 7V37C13.7157 37 7 30.2843 7 22Z"})))};S.propTypes={mainMenu:l.a.arrayOf(l.a.shape({title:l.a.string,path:l.a.string,target:l.a.string})),mainMenuItems:l.a.number,menuMoreText:l.a.string,isMobileMenuVisible:l.a.bool,isSubMenuVisible:l.a.bool,onToggleMobileMenu:l.a.func,onToggleSubMenu:l.a.func,onChangeTheme:l.a.func},v.propTypes={mainMenu:l.a.arrayOf(l.a.shape({title:l.a.string,path:l.a.string,target:l.a.string})),mainMenuItems:l.a.number,onToggleSubMenu:l.a.func};var T=S,w=a(144),N=a.n(w),x=function(e){function t(){for(var t,a=arguments.length,n=new Array(a),i=0;i<a;i++)n[i]=arguments[i];return(t=e.call.apply(e,[this].concat(n))||this).state={userTheme:"undefined"!=typeof window&&window.localStorage.getItem("theme")||null,isMobileMenuVisible:!1,isSubMenuVisible:!1},t.onChangeTheme=t.onChangeTheme.bind(c()(t)),t.onToggleMobileMenu=t.onToggleMobileMenu.bind(c()(t)),t.onToggleSubMenu=t.onToggleSubMenu.bind(c()(t)),t}m()(t,e);var a=t.prototype;return a.onChangeTheme=function(){var e=this.state.userTheme,t="dark"===e||null===e?"light":"dark";this.setState({userTheme:t}),"undefined"!=typeof window&&window.localStorage.setItem("theme",t)},a.onToggleMobileMenu=function(){var e=this.state.isMobileMenuVisible;this.setState({isMobileMenuVisible:!e})},a.onToggleSubMenu=function(){var e=this.state.isSubMenuVisible;this.setState({isSubMenuVisible:!e})},a.render=function(){var e=this.props,t=e.siteLogo,a=e.logoText,n=e.siteTitle,i=e.mainMenu,s=e.mainMenuItems,l=e.menuMoreText,u=e.theme,c=this.state,d=c.userTheme,m=c.isSubMenuVisible,p=c.isMobileMenuVisible;return r.a.createElement(r.a.Fragment,null,r.a.createElement(f.Helmet,null,r.a.createElement("title",null,n),r.a.createElement("body",{className:"light"===(d||u)?"light-theme":"dark-theme"})),r.a.createElement("header",{className:N.a.header},r.a.createElement("div",{className:N.a.inner},r.a.createElement(o.Link,{to:"/"},r.a.createElement("div",{className:N.a.logo},t.src?r.a.createElement("img",{src:t.src,alt:t.alt}):r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{className:N.a.mark},">"),r.a.createElement("span",{className:N.a.text},a),r.a.createElement("span",{className:N.a.cursor})))),r.a.createElement("span",{className:N.a.right},r.a.createElement(T,{mainMenu:i,mainMenuItems:s,isMobileMenuVisible:p,isSubMenuVisible:m,menuMoreText:l,onToggleMobileMenu:this.onToggleMobileMenu,onToggleSubMenu:this.onToggleSubMenu,onChangeTheme:this.onChangeTheme})))))},t}(r.a.Component);x.propTypes={siteTitle:l.a.string,siteLogo:l.a.object,logoText:l.a.string,theme:l.a.string,mainMenu:l.a.arrayOf(l.a.shape({title:l.a.string,path:l.a.string})),mainMenuItems:l.a.number,menuMoreText:l.a.string};var L=x,I=(a(145),function(e){var t=e.children;return r.a.createElement(o.StaticQuery,{query:"1100765260",render:function(e){return r.a.createElement("div",{className:"container"},r.a.createElement(L,{siteTitle:e.site.siteMetadata.title,siteLogo:e.site.siteMetadata.logo,logoText:e.site.siteMetadata.logoText,defaultTheme:e.site.siteMetadata.defaultTheme,mainMenu:e.site.siteMetadata.mainMenu,mainMenuItems:e.site.siteMetadata.showMenuItems,menuMoreText:e.site.siteMetadata.menuMoreText}),r.a.createElement("div",{className:"content"},t),r.a.createElement("footer",null,e.site.siteMetadata.copyrights?e.site.siteMetadata.copyrights:r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{className:"footerCopyrights"},"© 2019 ",r.a.createElement("a",{href:"https:/nitishkumarsingh.xyz/"},"Nitishkumar Singh")))))},data:n})});I.propTypes={children:l.a.node.isRequired};t.a=I},157:function(e){e.exports={data:{site:{siteMetadata:{title:"Nitishkumar's Blog Home",logo:{src:"src/images/myAvatar.svg",alt:"A lot of lengthy talks!"},logoText:"Nitishkumar's Blog",defaultTheme:"light",copyrights:"",mainMenu:[{title:"About",path:"https://twitter.com/Nitishkumar071",target:"_blank"}],showMenuItems:2,menuMoreText:"Show more"}}}}},158:function(e,t,a){"use strict";a.r(t);a(32);var n=a(0),i=a.n(n),r=a(4),s=a.n(r),l=a(55),o=a(2),u=function(e){var t=e.location,a=o.default.getResourcesForPathnameSync(t.pathname);return i.a.createElement(l.a,Object.assign({location:t,pageResources:a},a.json))};u.propTypes={location:s.a.shape({pathname:s.a.string.isRequired}).isRequired},t.default=u},163:function(e,t,a){"use strict";var n=a(0),i=a.n(n),r=a(4),s=a.n(r),l=a(154),o=(a(172),a(164)),u=a(149),c=a.n(u),d=function(e){var t=e.title,a=e.date,n=e.slug,r=e.excerpt,s=e.tags,u=e.html,d=e.previousPost,m=e.nextPost,f=d&&d.fields.slug,p=d&&d.frontmatter.title,h=m&&m.fields.slug,g=m&&m.frontmatter.title;return i.a.createElement("div",{className:c.a.post},i.a.createElement("div",{className:c.a.postContent},i.a.createElement("h1",null,r?i.a.createElement(l.Link,{to:n},t):t),i.a.createElement("div",{className:c.a.meta},a),r?i.a.createElement(i.a.Fragment,null,i.a.createElement("p",null,r),i.a.createElement("p",null,s),i.a.createElement(l.Link,{to:n,className:c.a.readMore},"Read more →")):i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{dangerouslySetInnerHTML:{__html:u}}),i.a.createElement(o.a,{previousPath:f,previousLabel:p,nextPath:h,nextLabel:g}))))};d.propTypes={title:s.a.string,date:s.a.string,slug:s.a.string,excerpt:s.a.string,html:s.a.string,tags:s.a.string,previousPost:s.a.object,nextPost:s.a.object},t.a=d},164:function(e,t,a){"use strict";var n=a(0),i=a.n(n),r=a(4),s=a.n(r),l=a(154),o=a(148),u=a.n(o),c=function(e){var t=e.nextPath,a=e.previousPath,n=e.nextLabel,r=e.previousLabel;return a||t?i.a.createElement("div",{className:u.a.navigation},a&&i.a.createElement("span",{className:u.a.button},i.a.createElement(l.Link,{to:a},i.a.createElement("span",{className:u.a.iconPrev},"←"),i.a.createElement("span",{className:u.a.buttonText},r))),t&&i.a.createElement("span",{className:u.a.button},i.a.createElement(l.Link,{to:t},i.a.createElement("span",{className:u.a.buttonText},n),i.a.createElement("span",{className:u.a.iconNext},"→")))):null};c.propTypes={nextPath:s.a.string,previousPath:s.a.string,nextLabel:s.a.string,previousLabel:s.a.string},t.a=c},172:function(e,t,a){"use strict";var n=a(8);t.__esModule=!0,t.default=void 0;var i,r=n(a(7)),s=n(a(52)),l=n(a(160)),o=n(a(161)),u=n(a(0)),c=n(a(4)),d=function(e){var t=(0,o.default)({},e);return t.resolutions&&(t.fixed=t.resolutions,delete t.resolutions),t.sizes&&(t.fluid=t.sizes,delete t.sizes),t},m={},f=function(e){var t=d(e),a=t.fluid?t.fluid.src:t.fixed.src;return m[a]||!1},p=[];var h=function(e,t){(void 0===i&&"undefined"!=typeof window&&window.IntersectionObserver&&(i=new window.IntersectionObserver(function(e){e.forEach(function(e){p.forEach(function(t){t[0]===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(i.unobserve(t[0]),t[1]())})})},{rootMargin:"200px"})),i).observe(e),p.push([e,t])},g=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',a=e.sizes?'sizes="'+e.sizes+'" ':"",n=e.srcSetWebp?"<source type='image/webp' srcSet=\""+e.srcSetWebp+'" '+a+"/>":"",i=e.srcSet?'<source srcSet="'+e.srcSet+'" '+a+"/>":"",r=e.title?'title="'+e.title+'" ':"",s=e.alt?'alt="'+e.alt+'" ':'alt="" ',l=e.width?'width="'+e.width+'" ':"",o=e.height?'height="'+e.height+'" ':"",u=e.opacity?e.opacity:"1";return"<picture>"+n+i+"<img "+l+o+t+s+r+'style="position:absolute;top:0;left:0;transition:opacity 0.5s;transition-delay:'+(e.transitionDelay?e.transitionDelay:"0.5s")+";opacity:"+u+';width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},b=u.default.forwardRef(function(e,t){var a=e.style,n=e.onLoad,i=e.onError,r=(0,l.default)(e,["style","onLoad","onError"]);return u.default.createElement("img",(0,o.default)({},r,{onLoad:n,onError:i,ref:t,style:(0,o.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},a)}))});b.propTypes={style:c.default.object,onError:c.default.func,onLoad:c.default.func};var y=function(e){function t(t){var a;a=e.call(this,t)||this;var n=!0,i=!1,r=t.fadeIn,l=f(t);!l&&"undefined"!=typeof window&&window.IntersectionObserver&&(n=!1,i=!0),"undefined"==typeof window&&(n=!1),t.critical&&(n=!0,i=!1);var o=!(a.props.critical&&!a.props.fadeIn);return a.state={isVisible:n,imgLoaded:!1,IOSupported:i,fadeIn:r,hasNoScript:o,seenBefore:l},a.imageRef=u.default.createRef(),a.handleImageLoaded=a.handleImageLoaded.bind((0,s.default)((0,s.default)(a))),a.handleRef=a.handleRef.bind((0,s.default)((0,s.default)(a))),a}(0,r.default)(t,e);var a=t.prototype;return a.componentDidMount=function(){if(this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:f(this.props)}),this.props.critical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},a.handleRef=function(e){var t=this;this.state.IOSupported&&e&&h(e,function(){var e=f(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0,imgLoaded:e})})},a.handleImageLoaded=function(){var e,t,a;e=this.props,t=d(e),a=t.fluid?t.fluid.src:t.fixed.src,m[a]=!0,this.setState({imgLoaded:!0}),this.state.seenBefore&&this.setState({fadeIn:!1}),this.props.onLoad&&this.props.onLoad()},a.render=function(){var e=d(this.props),t=e.title,a=e.alt,n=e.className,i=e.style,r=void 0===i?{}:i,s=e.imgStyle,l=void 0===s?{}:s,c=e.placeholderStyle,m=void 0===c?{}:c,f=e.placeholderClassName,p=e.fluid,h=e.fixed,y=e.backgroundColor,M=e.Tag,E=e.itemProp,v="boolean"==typeof y?"lightgray":y,S=(0,o.default)({opacity:this.state.imgLoaded?0:1,transition:"opacity 0.5s",transitionDelay:this.state.imgLoaded?"0.5s":"0.25s"},l,m),T=(0,o.default)({opacity:this.state.imgLoaded||!1===this.state.fadeIn?1:0,transition:!0===this.state.fadeIn?"opacity 0.5s":"none"},l),w={title:t,alt:this.state.isVisible?"":a,style:S,className:f};if(p){var N=p;return u.default.createElement(M,{className:(n||"")+" gatsby-image-wrapper",style:(0,o.default)({position:"relative",overflow:"hidden"},r),ref:this.handleRef,key:"fluid-"+JSON.stringify(N.srcSet)},u.default.createElement(M,{style:{width:"100%",paddingBottom:100/N.aspectRatio+"%"}}),N.base64&&u.default.createElement(b,(0,o.default)({src:N.base64},w)),N.tracedSVG&&u.default.createElement(b,(0,o.default)({src:N.tracedSVG},w)),v&&u.default.createElement(M,{title:t,style:{backgroundColor:v,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,transitionDelay:"0.35s",right:0,left:0}}),this.state.isVisible&&u.default.createElement("picture",null,N.srcSetWebp&&u.default.createElement("source",{type:"image/webp",srcSet:N.srcSetWebp,sizes:N.sizes}),u.default.createElement("source",{srcSet:N.srcSet,sizes:N.sizes}),u.default.createElement(b,{alt:a,title:t,src:N.src,style:T,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:E})),this.state.hasNoScript&&u.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:g((0,o.default)({alt:a,title:t},N))}}))}if(h){var x=h,L=(0,o.default)({position:"relative",overflow:"hidden",display:"inline-block",width:x.width,height:x.height},r);return"inherit"===r.display&&delete L.display,u.default.createElement(M,{className:(n||"")+" gatsby-image-wrapper",style:L,ref:this.handleRef,key:"fixed-"+JSON.stringify(x.srcSet)},x.base64&&u.default.createElement(b,(0,o.default)({src:x.base64},w)),x.tracedSVG&&u.default.createElement(b,(0,o.default)({src:x.tracedSVG},w)),v&&u.default.createElement(M,{title:t,style:{backgroundColor:v,width:x.width,opacity:this.state.imgLoaded?0:1,transitionDelay:"0.25s",height:x.height}}),this.state.isVisible&&u.default.createElement("picture",null,x.srcSetWebp&&u.default.createElement("source",{type:"image/webp",srcSet:x.srcSetWebp,sizes:x.sizes}),u.default.createElement("source",{srcSet:x.srcSet,sizes:x.sizes}),u.default.createElement(b,{alt:a,title:t,width:x.width,height:x.height,src:x.src,style:T,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:E})),this.state.hasNoScript&&u.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:g((0,o.default)({alt:a,title:t,width:x.width,height:x.height},x))}}))}return null},t}(u.default.Component);y.defaultProps={critical:!1,fadeIn:!0,alt:"",Tag:"div"};var M=c.default.shape({width:c.default.number.isRequired,height:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string}),E=c.default.shape({aspectRatio:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,sizes:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string});y.propTypes={resolutions:M,sizes:E,fixed:M,fluid:E,fadeIn:c.default.bool,title:c.default.string,alt:c.default.string,className:c.default.oneOfType([c.default.string,c.default.object]),critical:c.default.bool,style:c.default.object,imgStyle:c.default.object,placeholderStyle:c.default.object,placeholderClassName:c.default.string,backgroundColor:c.default.oneOfType([c.default.string,c.default.bool]),onLoad:c.default.func,onError:c.default.func,onStartLoad:c.default.func,Tag:c.default.string,itemProp:c.default.string};var v=y;t.default=v}}]);
//# sourceMappingURL=2-b1a5e56710490e5e1516.js.map