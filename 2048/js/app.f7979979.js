(function(e){function t(t){for(var r,c,a=t[0],s=t[1],u=t[2],v=0,d=[];v<a.length;v++)c=a[v],Object.prototype.hasOwnProperty.call(i,c)&&i[c]&&d.push(i[c][0]),i[c]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);l&&l(t);while(d.length)d.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,a=1;a<n.length;a++){var s=n[a];0!==i[s]&&(r=!1)}r&&(o.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},i={app:0},o=[];function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="games/2048/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],s=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var l=s;o.push(["b8ef","chunk-vendors"]),n()})({7107:function(e,t,n){},"9e00":function(e,t,n){"use strict";n("7107")},a40c:function(e,t,n){"use strict";n("d658")},b8ef:function(e,t,n){"use strict";n.r(t);var r=n("3a34"),i=n.n(r),o=(n("5cfb"),n("2b0e")),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"content"},[n("div",{staticClass:"name"},[e._v("2048")]),n("div",{staticClass:"menu"},[n("div",{staticClass:"btn",on:{click:e.restart}},[e._v("restart")])])]),n("div",{ref:"box",staticClass:"box",attrs:{id:"box"}},[n("div",{attrs:{id:"pixi"}})]),n("game-over",{directives:[{name:"show",rawName:"v-show",value:e.data.isGameOver,expression:"data.isGameOver"}]})],1)},a=[],s=n("c8b5"),u=n.n(s);function l(e){var t=new u.a.Manager(e);return t.add(new u.a.Swipe),t}n("8e6e"),n("456d"),n("7514");var v=n("bd86"),d=(n("8449"),n("ac6a"),n("6c7b"),n("22a2")),f=n("2ef0"),p=n.n(f),h={};function y(){h.dimension=4,h.margin=6,h.speed=10,h.currentScore=0,h.highestScore=0,h.isGameOver=!1}y();var g=h;function m(e){var t={};return t.code=e,t.release=void 0,t.upHandler=function(e){e.keyCode===t.code&&t.release&&t.release(),e.preventDefault()},window.addEventListener("keyup",t.upHandler.bind(t),!1),t}function x(e,t){return Math.floor(Math.random()*(t-e+1))+e}function b(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:12;return+parseFloat(e.toPrecision(t))}function w(e,t){return{y:_.floor(e/t),x:e%t}}function O(e,t){for(var n=[[e[0]]],r=1;r<e.length;r++){if(!e[r])break;_.last(_.last(n))[t]!==e[r][t]?n.push([e[r]]):_.last(n).push(e[r])}return n}function S(e,t){var n=0,r=1,i=setInterval((function(){n+=.09*t*r,e.scale.set(b(n),b(n)),e.visible=!0,b(n)>=1.3*t&&(r=-1),b(n)<=t&&-1===r&&(e.scale.set(t,t),clearInterval(i))}),12)}function D(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function W(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?D(Object(n),!0).forEach((function(t){Object(v["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):D(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var j=window.devicePixelRatio,C=g.dimension,M=g.margin,P=g.speed,B=0,E=new d["a"]({width:B,height:B}),k={correction:0,isInitRandomSprite:!1,isMoving:!1,spriteWidth:b(B/C-2*M),probability:90,sprites:[],mergeSprites:[],textures:[],chessBgStage:[],moveDirection:0,moveSteps:[],rectContainer:null,spriteContainer:null,left:m(37),up:m(38),right:m(39),down:m(40),moveSprite:X,initView:R,drawRectSprite:J},I={initView:R};function N(){y(),B=.9*g.width*j,M*=j;var e=C;k.spriteWidth=b(B/e-2*M),k.correction=k.spriteWidth/2,g.speed=b(k.spriteWidth/5),k.isInitRandomSprite=!1,k.moveSteps=[],k.sprites=[],k.textures=[],k.chessBgStage=[],k.moveDirection=0,k.chessBgStage=p.a.fill(Array(e*e),0,0,e*e)}function R(){N(),E=new d["a"]({width:B,height:B}),document.getElementById("pixi").replaceWith(E.view),E.renderer.view.id="pixi",E.renderer.backgroundColor=12299680,E.renderer.view.style.verticalAlign="top",E.renderer.view.style.transform="scale(".concat(1/j,")"),E.renderer.view.style.transformOrigin="0 0",E.renderer.view.style.border="".concat(M,"px solid #bbada0"),k.rectContainer=new d["b"],k.spriteContainer=new d["b"],E.loader.add([{name:"numberJson",url:"./game-img/2048/number.json"}]).on("progress",$).load((function(){A(),G(),E.ticker.add(H)}))}function G(){F(k.chessBgStage),Z(),L(),k.isInitRandomSprite=!1,L()}function A(){k.textures=E.loader.resources["numberJson"].textures}function F(e){e.forEach((function(e,t){V(w(t,C))})),E.stage.addChild(k.rectContainer),E.stage.addChild(k.spriteContainer),k.sprites=E.stage.children[1].children}function V(e){var t=e.x,n=e.y,r=new d["c"],i=b(M+(k.spriteWidth+2*M)*t),o=b(M+(k.spriteWidth+2*M)*n);r.beginFill(13418675),r.drawRoundedRect(i,o,k.spriteWidth,k.spriteWidth,20),r.endFill(),k.rectContainer.addChild(r)}function J(e){var t=e.x,n=e.y,r=e.value,i=b(M+(k.spriteWidth+2*M)*t+k.correction),o=b(M+(k.spriteWidth+2*M)*n+k.correction);T({x:i,y:o,value:r})}function T(e){var t=e.x,n=e.y,r=e.value,i=e.v,o=void 0===i?{vx:0,vy:0}:i,c=new d["d"](k.textures["n".concat(r,".png")]);c.x=b(t),c.x1=2*c.x,c.vx=o.vx,c.vy=o.vy,c.y=b(n),c.y1=2*c.y,c.value=r,c.isNew=!0,c.visible=!1,c.width=k.spriteWidth,c.height=k.spriteWidth,c.anchor.set(.5,.5),c.aid=p.a.uniqueId(),k.spriteContainer.addChild(c),S(c,c.scale.x)}function $(e,t){console.log("loading: "+t.url),console.log("progress: "+e.progress+"%")}function q(e){if(2===e){var t=p.a.sortBy(k.sprites,["y","x"]);return O(t,"y")}if(4===e){var n=p.a.sortBy(k.sprites,["y",function(e){return-e.x}]);return O(n,"y")}if(8===e){var r=p.a.sortBy(k.sprites,["x","y"]);return O(r,"x")}if(16===e){var i=p.a.sortBy(k.sprites,["x",function(e){return-e.y}]);return O(i,"x")}}function H(){if(k.sprites.every((function(e){return 0===e.vx&&0===e.vy})))return k.isMoving=!1,void(k.sprites.every((function(e){return Math.abs(e.x-e.x1)<1&&Math.abs(e.y-e.y1)<1}))||(L(),Q()&&(g.isGameOver=!0)));var e=b(B-k.spriteWidth-M+k.correction),t=2===k.moveDirection||8===k.moveDirection?1:-1;q(k.moveDirection).forEach((function(n){for(var r=0;r<n.length;r++){var i=n[r];if(2===k.moveDirection&&i.x<=M+k.correction)i.x=M+k.correction,i.vx=0;else if(4===k.moveDirection&&i.x>=e)i.x=e,i.vx=0;else if(16===k.moveDirection&&i.y>=e)i.y=e,i.vy=0;else if(8===k.moveDirection&&i.y<=M+k.correction)i.y=M+k.correction,i.vy=0;else{var o=n[r-1];if(o){var c=!1;if(c=2===k.moveDirection?i.x+i.vx<=o.x+(k.spriteWidth+M)*t:8===k.moveDirection?i.y+i.vy<=o.y+(k.spriteWidth+M)*t:4===k.moveDirection?i.x+i.vx>=o.x+(k.spriteWidth+M)*t:i.y+i.vy>=o.y+(k.spriteWidth+M)*t,!o.vx&&!o.vy&&c&&(i.value!==o.value||o.isNew||i.isNew)){2===k.moveDirection&&(i.x=b(o.x+k.spriteWidth+2*M),i.vx=0),4===k.moveDirection&&(i.x=b(o.x-k.spriteWidth-2*M),i.vx=0),8===k.moveDirection&&(i.y=b(o.y+k.spriteWidth+2*M),i.vy=0),16===k.moveDirection&&(i.y=b(o.y-k.spriteWidth-2*M),i.vy=0);continue}var a=(2===k.moveDirection||4===k.moveDirection)&&Math.abs(o.x-i.x)<=P||(8===k.moveDirection||16===k.moveDirection)&&Math.abs(o.y-i.y)<=P;o.value!==i.value||!a||o.isNew||i.isNew||(console.log("will be push in hitMerge arr s1:".concat(i.aid,", x: ").concat(i.x,", y: ").concat(i.y,", value: ").concat(i.value,", vx: ").concat(i.vx,", vy: ").concat(i.vy)),console.log("will be push in hitMerge arr s2:".concat(o.aid,", x: ").concat(o.x,", y: ").concat(o.y,", value: ").concat(o.value,", vx: ").concat(o.vx,", vy: ").concat(o.vy)),Y(o,i),r++)}i.x+=i.vx,i.y+=i.vy}}})),k.mergeSprites.forEach((function(e){console.log("foreach hitMerge arr s1:".concat(e.s1.aid,", x: ").concat(e.s1.x,", y: ").concat(e.s1.y,", value: ").concat(e.s1.value)),console.log("foreach hitMerge arr s2:".concat(e.s2.aid,", x: ").concat(e.s2.x,", y: ").concat(e.s2.y,", value: ").concat(e.s2.value)),Y(e.s1,e.s2)})),k.mergeSprites=[]}function L(){if(!k.isInitRandomSprite){k.isInitRandomSprite=!0,console.log("数组长度：".concat(k.sprites.length));var e=x(0,C*C-1);k.randomSpriteIndex=e,console.log("初始随机位置：".concat(e)),e=z(e),console.log("去重后随机位置：".concat(e));var t=x(0,100)>k.probability?4:2;J(W(W({},w(e,C)),{},{value:t}))}}function z(e){return K(e)?(e=++e%(C*C),z(e)):e}function K(e){var t=w(e,C),n=t.x,r=t.y;console.log("随机位置对应的x：".concat(n,", y: ").concat(r));var i=b(M+(k.spriteWidth+2*M)*n+k.correction),o=b(M+(k.spriteWidth+2*M)*r+k.correction);return k.sprites.find((function(e){return Math.abs(e.x-i)<1&&Math.abs(e.y-o)<1}))}function Q(){if(k.sprites.length===C*C){var e=p.a.sortBy(k.sprites,["y","x"]),t=U(e,"y");return t||(e=p.a.sortBy(k.sprites,["x","y"]),t=U(e,"x")),!t}return!1}function U(e,t){return e.find((function(n,r){return!!e[r+1]&&(n[t]===e[r+1][t]&&n.value===e[r+1].value)}))}function X(e){k.isMoving||(k.isMoving=!0,k.isInitRandomSprite=!1,k.moveDirection=e,k.moveSteps.push(e),k.sprites.forEach((function(e){return e.isNew=!1})),console.warn("方向：".concat(e)),k.sprites.forEach((function(t){t.isNew=!1,t.x1=t.x,t.y1=t.y,2===e&&(t.vx=-P),4===e&&(t.vx=P),8===e&&(t.vy=-P),16===e&&(t.vy=P)})))}function Y(e,t){console.log("hitMerge-s1: aid: ".concat(e.aid,", x: ").concat(e.x,", y: ").concat(e.y,", value: ").concat(e.value)),console.log("hitMerge-s2: aid: ".concat(t.aid,", x: ").concat(t.x,", y: ").concat(t.y,", value: ").concat(t.value)),t.value=2*t.value,t.isNew=!0,t.texture=k.textures["n".concat(t.value,".png")],e.visible=!1;var n=E.stage.children[1].removeChild(e);console.log("removeChild-s1: aid: ".concat(n&&n.aid))}function Z(){l(document.getElementById("pixi")).on("swipe",(function(e){X(e.offsetDirection)})),k.left.release=function(){X(2)},k.right.release=function(){X(4)},k.down.release=function(){X(16)},k.up.release=function(){X(8)}}var ee=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"game-over"},[n("div",{staticClass:"text"},[e._v("game over!")]),n("div",{staticClass:"btn",on:{click:e.newGame}},[e._v("new game")])])},te=[],ne={name:"GameOver",props:{},methods:{newGame:function(){g.width=document.getElementById("app").clientWidth,I.initView()}}},re=ne,ie=(n("a40c"),n("2877")),oe=Object(ie["a"])(re,ee,te,!1,null,"72be6538",null),ce=oe.exports,ae={name:"Games-2048",components:{GameOver:ce},data:function(){return{data:g}},mounted:function(){g.width=document.getElementById("box").clientWidth,I.initView()},methods:{restart:function(){g.width=document.getElementById("box").clientWidth,I.initView()}}},se=ae,ue=(n("d599"),n("9e00"),Object(ie["a"])(se,c,a,!1,null,"e215ddf6",null)),le=ue.exports,ve=n("9483");Object(ve["a"])("".concat("games/2048/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},cached:function(){console.log("Content has been cached for offline use.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),o["a"].config.productionTip=!1,new i.a,new o["a"]({render:function(e){return e(le)}}).$mount("#app")},d599:function(e,t,n){"use strict";n("ed80")},d658:function(e,t,n){},ed80:function(e,t,n){}});
//# sourceMappingURL=app.f7979979.js.map