(function(e){function t(t){for(var r,c,a=t[0],s=t[1],u=t[2],v=0,d=[];v<a.length;v++)c=a[v],Object.prototype.hasOwnProperty.call(i,c)&&i[c]&&d.push(i[c][0]),i[c]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);l&&l(t);while(d.length)d.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,a=1;a<n.length;a++){var s=n[a];0!==i[s]&&(r=!1)}r&&(o.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},i={app:0},o=[];function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],s=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var l=s;o.push(["b8ef","chunk-vendors"]),n()})({7107:function(e,t,n){},"9e00":function(e,t,n){"use strict";n("7107")},a40c:function(e,t,n){"use strict";n("d658")},b8ef:function(e,t,n){"use strict";n.r(t);n("5cfb");var r=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"content"},[n("div",{staticClass:"name"},[e._v("2048")]),n("div",{staticClass:"menu"},[n("div",{staticClass:"btn",on:{click:e.restart}},[e._v("restart")])])]),n("div",{ref:"box",staticClass:"box",attrs:{id:"box"}},[n("div",{attrs:{id:"pixi"}})]),n("game-over",{directives:[{name:"show",rawName:"v-show",value:e.data.isGameOver,expression:"data.isGameOver"}]})],1)},o=[],c=n("c8b5"),a=n.n(c);function s(e){var t=new a.a.Manager(e);return t.add(new a.a.Swipe),t}n("8e6e"),n("456d"),n("7514");var u=n("bd86"),l=(n("8449"),n("ac6a"),n("6c7b"),n("22a2")),v=n("2ef0"),d=n.n(v),f={};function p(){f.dimension=4,f.margin=6,f.speed=10,f.currentScore=0,f.highestScore=0,f.isGameOver=!1}p();var h=f;function y(e){var t={};return t.code=e,t.release=void 0,t.upHandler=function(e){e.keyCode===t.code&&t.release&&t.release(),e.preventDefault()},window.addEventListener("keyup",t.upHandler.bind(t),!1),t}function g(e,t){return Math.floor(Math.random()*(t-e+1))+e}function m(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:12;return+parseFloat(e.toPrecision(t))}function x(e,t){return{y:_.floor(e/t),x:e%t}}function b(e,t){for(var n=[[e[0]]],r=1;r<e.length;r++){if(!e[r])break;_.last(_.last(n))[t]!==e[r][t]?n.push([e[r]]):_.last(n).push(e[r])}return n}function w(e,t){var n=0,r=1,i=setInterval((function(){n+=.09*t*r,e.scale.set(m(n),m(n)),e.visible=!0,m(n)>=1.3*t&&(r=-1),m(n)<=t&&-1===r&&(e.scale.set(t,t),clearInterval(i))}),12)}function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function S(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){Object(u["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var j=window.devicePixelRatio,D=h.dimension,W=h.margin,C=h.speed,M=0,P=new l["a"]({width:M,height:M}),B={correction:0,isInitRandomSprite:!1,isMoving:!1,spriteWidth:m(M/D-2*W),probability:90,sprites:[],mergeSprites:[],textures:[],chessBgStage:[],moveDirection:0,moveSteps:[],rectContainer:null,spriteContainer:null,left:y(37),up:y(38),right:y(39),down:y(40),moveSprite:Q,initView:I,drawRectSprite:F},E={initView:I};function k(){p(),M=.9*h.width*j,W*=j;var e=D;B.spriteWidth=m(M/e-2*W),B.correction=B.spriteWidth/2,h.speed=m(B.spriteWidth/5),B.isInitRandomSprite=!1,B.moveSteps=[],B.sprites=[],B.textures=[],B.chessBgStage=[],B.moveDirection=0,B.chessBgStage=d.a.fill(Array(e*e),0,0,e*e)}function I(){k(),P=new l["a"]({width:M,height:M}),document.getElementById("pixi").replaceWith(P.view),P.renderer.view.id="pixi",P.renderer.backgroundColor=12299680,P.renderer.view.style.verticalAlign="top",P.renderer.view.style.transform="scale(".concat(1/j,")"),P.renderer.view.style.transformOrigin="0 0",P.renderer.view.style.border="".concat(W,"px solid #bbada0"),B.rectContainer=new l["b"],B.spriteContainer=new l["b"],P.loader.add([{name:"numberJson",url:"https://turbojavascript.github.io/games/2048/game-img/2048/number.json"}]).on("progress",J).load((function(){R(),N(),P.ticker.add($)}))}function N(){G(B.chessBgStage),X(),q(),B.isInitRandomSprite=!1,q()}function R(){B.textures=P.loader.resources["numberJson"].textures}function G(e){e.forEach((function(e,t){A(x(t,D))})),P.stage.addChild(B.rectContainer),P.stage.addChild(B.spriteContainer),B.sprites=P.stage.children[1].children}function A(e){var t=e.x,n=e.y,r=new l["c"],i=m(W+(B.spriteWidth+2*W)*t),o=m(W+(B.spriteWidth+2*W)*n);r.beginFill(13418675),r.drawRoundedRect(i,o,B.spriteWidth,B.spriteWidth,20),r.endFill(),B.rectContainer.addChild(r)}function F(e){var t=e.x,n=e.y,r=e.value,i=m(W+(B.spriteWidth+2*W)*t+B.correction),o=m(W+(B.spriteWidth+2*W)*n+B.correction);V({x:i,y:o,value:r})}function V(e){var t=e.x,n=e.y,r=e.value,i=e.v,o=void 0===i?{vx:0,vy:0}:i,c=new l["d"](B.textures["n".concat(r,".png")]);c.x=m(t),c.x1=2*c.x,c.vx=o.vx,c.vy=o.vy,c.y=m(n),c.y1=2*c.y,c.value=r,c.isNew=!0,c.visible=!1,c.width=B.spriteWidth,c.height=B.spriteWidth,c.anchor.set(.5,.5),c.aid=d.a.uniqueId(),B.spriteContainer.addChild(c),w(c,c.scale.x)}function J(e,t){console.log("loading: "+t.url),console.log("progress: "+e.progress+"%")}function T(e){if(2===e){var t=d.a.sortBy(B.sprites,["y","x"]);return b(t,"y")}if(4===e){var n=d.a.sortBy(B.sprites,["y",function(e){return-e.x}]);return b(n,"y")}if(8===e){var r=d.a.sortBy(B.sprites,["x","y"]);return b(r,"x")}if(16===e){var i=d.a.sortBy(B.sprites,["x",function(e){return-e.y}]);return b(i,"x")}}function $(){if(B.sprites.every((function(e){return 0===e.vx&&0===e.vy})))return B.isMoving=!1,void(B.sprites.every((function(e){return Math.abs(e.x-e.x1)<1&&Math.abs(e.y-e.y1)<1}))||(q(),z()&&(h.isGameOver=!0)));var e=m(M-B.spriteWidth-W+B.correction),t=2===B.moveDirection||8===B.moveDirection?1:-1;T(B.moveDirection).forEach((function(n){for(var r=0;r<n.length;r++){var i=n[r];if(2===B.moveDirection&&i.x<=W+B.correction)i.x=W+B.correction,i.vx=0;else if(4===B.moveDirection&&i.x>=e)i.x=e,i.vx=0;else if(16===B.moveDirection&&i.y>=e)i.y=e,i.vy=0;else if(8===B.moveDirection&&i.y<=W+B.correction)i.y=W+B.correction,i.vy=0;else{var o=n[r-1];if(o){var c=!1;if(c=2===B.moveDirection?i.x+i.vx<=o.x+(B.spriteWidth+W)*t:8===B.moveDirection?i.y+i.vy<=o.y+(B.spriteWidth+W)*t:4===B.moveDirection?i.x+i.vx>=o.x+(B.spriteWidth+W)*t:i.y+i.vy>=o.y+(B.spriteWidth+W)*t,!o.vx&&!o.vy&&c&&(i.value!==o.value||o.isNew||i.isNew)){2===B.moveDirection&&(i.x=m(o.x+B.spriteWidth+2*W),i.vx=0),4===B.moveDirection&&(i.x=m(o.x-B.spriteWidth-2*W),i.vx=0),8===B.moveDirection&&(i.y=m(o.y+B.spriteWidth+2*W),i.vy=0),16===B.moveDirection&&(i.y=m(o.y-B.spriteWidth-2*W),i.vy=0);continue}var a=(2===B.moveDirection||4===B.moveDirection)&&Math.abs(o.x-i.x)<=C||(8===B.moveDirection||16===B.moveDirection)&&Math.abs(o.y-i.y)<=C;o.value!==i.value||!a||o.isNew||i.isNew||(console.log("will be push in hitMerge arr s1:".concat(i.aid,", x: ").concat(i.x,", y: ").concat(i.y,", value: ").concat(i.value,", vx: ").concat(i.vx,", vy: ").concat(i.vy)),console.log("will be push in hitMerge arr s2:".concat(o.aid,", x: ").concat(o.x,", y: ").concat(o.y,", value: ").concat(o.value,", vx: ").concat(o.vx,", vy: ").concat(o.vy)),U(o,i),r++)}i.x+=i.vx,i.y+=i.vy}}})),B.mergeSprites.forEach((function(e){console.log("foreach hitMerge arr s1:".concat(e.s1.aid,", x: ").concat(e.s1.x,", y: ").concat(e.s1.y,", value: ").concat(e.s1.value)),console.log("foreach hitMerge arr s2:".concat(e.s2.aid,", x: ").concat(e.s2.x,", y: ").concat(e.s2.y,", value: ").concat(e.s2.value)),U(e.s1,e.s2)})),B.mergeSprites=[]}function q(){if(!B.isInitRandomSprite){B.isInitRandomSprite=!0,console.log("数组长度：".concat(B.sprites.length));var e=g(0,D*D-1);B.randomSpriteIndex=e,console.log("初始随机位置：".concat(e)),e=H(e),console.log("去重后随机位置：".concat(e));var t=g(0,100)>B.probability?4:2;F(S(S({},x(e,D)),{},{value:t}))}}function H(e){return L(e)?(e=++e%(D*D),H(e)):e}function L(e){var t=x(e,D),n=t.x,r=t.y;console.log("随机位置对应的x：".concat(n,", y: ").concat(r));var i=m(W+(B.spriteWidth+2*W)*n+B.correction),o=m(W+(B.spriteWidth+2*W)*r+B.correction);return B.sprites.find((function(e){return Math.abs(e.x-i)<1&&Math.abs(e.y-o)<1}))}function z(){if(B.sprites.length===D*D){var e=d.a.sortBy(B.sprites,["y","x"]),t=K(e,"y");return t||(e=d.a.sortBy(B.sprites,["x","y"]),t=K(e,"x")),!t}return!1}function K(e,t){return e.find((function(n,r){return!!e[r+1]&&(n[t]===e[r+1][t]&&n.value===e[r+1].value)}))}function Q(e){B.isMoving||(B.isMoving=!0,B.isInitRandomSprite=!1,B.moveDirection=e,B.moveSteps.push(e),B.sprites.forEach((function(e){return e.isNew=!1})),console.warn("方向：".concat(e)),B.sprites.forEach((function(t){t.isNew=!1,t.x1=t.x,t.y1=t.y,2===e&&(t.vx=-C),4===e&&(t.vx=C),8===e&&(t.vy=-C),16===e&&(t.vy=C)})))}function U(e,t){console.log("hitMerge-s1: aid: ".concat(e.aid,", x: ").concat(e.x,", y: ").concat(e.y,", value: ").concat(e.value)),console.log("hitMerge-s2: aid: ".concat(t.aid,", x: ").concat(t.x,", y: ").concat(t.y,", value: ").concat(t.value)),t.value=2*t.value,t.isNew=!0,t.texture=B.textures["n".concat(t.value,".png")],e.visible=!1;var n=P.stage.children[1].removeChild(e);console.log("removeChild-s1: aid: ".concat(n&&n.aid))}function X(){s(document.getElementById("pixi")).on("swipe",(function(e){Q(e.offsetDirection)})),B.left.release=function(){Q(2)},B.right.release=function(){Q(4)},B.down.release=function(){Q(16)},B.up.release=function(){Q(8)}}var Y=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"game-over"},[n("div",{staticClass:"text"},[e._v("game over!")]),n("div",{staticClass:"btn",on:{click:e.newGame}},[e._v("new game")])])},Z=[],ee={name:"GameOver",props:{},methods:{newGame:function(){h.width=document.getElementById("app").clientWidth,E.initView()}}},te=ee,ne=(n("a40c"),n("2877")),re=Object(ne["a"])(te,Y,Z,!1,null,"72be6538",null),ie=re.exports,oe={name:"Games-2048",components:{GameOver:ie},data:function(){return{data:h}},mounted:function(){h.width=document.getElementById("box").clientWidth,E.initView()},methods:{restart:function(){h.width=document.getElementById("box").clientWidth,E.initView()}}},ce=oe,ae=(n("d599"),n("9e00"),Object(ne["a"])(ce,i,o,!1,null,"e215ddf6",null)),se=ae.exports,ue=n("9483");Object(ue["a"])("".concat("","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},cached:function(){console.log("Content has been cached for offline use.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(se)}}).$mount("#app")},d599:function(e,t,n){"use strict";n("ed80")},d658:function(e,t,n){},ed80:function(e,t,n){}});
//# sourceMappingURL=app.0ac90743.js.map