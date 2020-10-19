(function(){/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var p;function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}
var ba="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};
function ca(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");}
var da=ca(this);function t(a,b){if(b)a:{for(var c=da,d=a.split("."),e=0;e<d.length-1;e++){var f=d[e];if(!(f in c))break a;c=c[f]}d=d[d.length-1];e=c[d];f=b(e);f!=e&&null!=f&&ba(c,d,{configurable:!0,writable:!0,value:f})}}
t("Symbol",function(a){function b(e){if(this instanceof b)throw new TypeError("Symbol is not a constructor");return new c("jscomp_symbol_"+(e||"")+"_"+d++,e)}
function c(e,f){this.f=e;ba(this,"description",{configurable:!0,writable:!0,value:f})}
if(a)return a;c.prototype.toString=function(){return this.f};
var d=0;return b});
t("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var b="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),c=0;c<b.length;c++){var d=da[b[c]];"function"===typeof d&&"function"!=typeof d.prototype[a]&&ba(d.prototype,a,{configurable:!0,writable:!0,value:function(){return ea(aa(this))}})}return a});
function ea(a){a={next:a};a[Symbol.iterator]=function(){return this};
return a}
function u(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:aa(a)}}
function ha(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c}
var ia="function"==typeof Object.create?Object.create:function(a){function b(){}
b.prototype=a;return new b},ja;
if("function"==typeof Object.setPrototypeOf)ja=Object.setPrototypeOf;else{var ka;a:{var la={a:!0},ma={};try{ma.__proto__=la;ka=ma.a;break a}catch(a){}ka=!1}ja=ka?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var pa=ja;
function qa(a,b){a.prototype=ia(b.prototype);a.prototype.constructor=a;if(pa)pa(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.A=b.prototype}
function ra(){this.l=!1;this.h=null;this.o=void 0;this.g=1;this.i=this.j=0;this.v=this.f=null}
function sa(a){if(a.l)throw new TypeError("Generator is already running");a.l=!0}
ra.prototype.m=function(a){this.o=a};
function ta(a,b){a.f={la:b,X:!0};a.g=a.j||a.i}
ra.prototype["return"]=function(a){this.f={"return":a};this.g=this.i};
function ua(a,b){a.g=5;return{value:b}}
ra.prototype.S=function(a){this.g=a};
function va(a){a.j=2;a.i=3}
function wa(a){a.j=0;a.f=null}
function xa(a){a.v=[a.f];a.j=0;a.i=0}
function ya(a){var b=a.v.splice(0)[0];(b=a.f=a.f||b)?b.X?a.g=a.j||a.i:void 0!=b.S&&a.i<b.S?(a.g=b.S,a.f=null):a.g=a.i:a.g=4}
function Ca(a){this.f=new ra;this.g=a}
function Ea(a,b){sa(a.f);var c=a.f.h;if(c)return Fa(a,"return"in c?c["return"]:function(d){return{value:d,done:!0}},b,a.f["return"]);
a.f["return"](b);return Ga(a)}
function Fa(a,b,c,d){try{var e=b.call(a.f.h,c);if(!(e instanceof Object))throw new TypeError("Iterator result "+e+" is not an object");if(!e.done)return a.f.l=!1,e;var f=e.value}catch(g){return a.f.h=null,ta(a.f,g),Ga(a)}a.f.h=null;d.call(a.f,f);return Ga(a)}
function Ga(a){for(;a.f.g;)try{var b=a.g(a.f);if(b)return a.f.l=!1,{value:b.value,done:!1}}catch(c){a.f.o=void 0,ta(a.f,c)}a.f.l=!1;if(a.f.f){b=a.f.f;a.f.f=null;if(b.X)throw b.la;return{value:b["return"],done:!0}}return{value:void 0,done:!0}}
function Ha(a){this.next=function(b){sa(a.f);a.f.h?b=Fa(a,a.f.h.next,b,a.f.m):(a.f.m(b),b=Ga(a));return b};
this["throw"]=function(b){sa(a.f);a.f.h?b=Fa(a,a.f.h["throw"],b,a.f.m):(ta(a.f,b),b=Ga(a));return b};
this["return"]=function(b){return Ea(a,b)};
this[Symbol.iterator]=function(){return this}}
function Ia(a,b){var c=new Ha(new Ca(b));pa&&a.prototype&&pa(c,a.prototype);return c}
t("Reflect.setPrototypeOf",function(a){return a?a:pa?function(b,c){try{return pa(b,c),!0}catch(d){return!1}}:null});
t("Object.setPrototypeOf",function(a){return a||pa});
function x(a,b){return Object.prototype.hasOwnProperty.call(a,b)}
var Ja="function"==typeof Object.assign?Object.assign:function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(d)for(var e in d)x(d,e)&&(a[e]=d[e])}return a};
t("Object.assign",function(a){return a||Ja});
t("Promise",function(a){function b(g){this.f=0;this.h=void 0;this.g=[];this.m=!1;var h=this.i();try{g(h.resolve,h.reject)}catch(k){h.reject(k)}}
function c(){this.f=null}
function d(g){return g instanceof b?g:new b(function(h){h(g)})}
if(a)return a;c.prototype.g=function(g){if(null==this.f){this.f=[];var h=this;this.h(function(){h.j()})}this.f.push(g)};
var e=da.setTimeout;c.prototype.h=function(g){e(g,0)};
c.prototype.j=function(){for(;this.f&&this.f.length;){var g=this.f;this.f=[];for(var h=0;h<g.length;++h){var k=g[h];g[h]=null;try{k()}catch(l){this.i(l)}}}this.f=null};
c.prototype.i=function(g){this.h(function(){throw g;})};
b.prototype.i=function(){function g(l){return function(m){k||(k=!0,l.call(h,m))}}
var h=this,k=!1;return{resolve:g(this.ga),reject:g(this.j)}};
b.prototype.ga=function(g){if(g===this)this.j(new TypeError("A Promise cannot resolve to itself"));else if(g instanceof b)this.ia(g);else{a:switch(typeof g){case "object":var h=null!=g;break a;case "function":h=!0;break a;default:h=!1}h?this.va(g):this.l(g)}};
b.prototype.va=function(g){var h=void 0;try{h=g.then}catch(k){this.j(k);return}"function"==typeof h?this.ja(h,g):this.l(g)};
b.prototype.j=function(g){this.o(2,g)};
b.prototype.l=function(g){this.o(1,g)};
b.prototype.o=function(g,h){if(0!=this.f)throw Error("Cannot settle("+g+", "+h+"): Promise already settled in state"+this.f);this.f=g;this.h=h;2===this.f&&this.ha();this.v()};
b.prototype.ha=function(){var g=this;e(function(){if(g.G()){var h=da.console;"undefined"!==typeof h&&h.error(g.h)}},1)};
b.prototype.G=function(){if(this.m)return!1;var g=da.CustomEvent,h=da.Event,k=da.dispatchEvent;if("undefined"===typeof k)return!0;"function"===typeof g?g=new g("unhandledrejection",{cancelable:!0}):"function"===typeof h?g=new h("unhandledrejection",{cancelable:!0}):(g=da.document.createEvent("CustomEvent"),g.initCustomEvent("unhandledrejection",!1,!0,g));g.promise=this;g.reason=this.h;return k(g)};
b.prototype.v=function(){if(null!=this.g){for(var g=0;g<this.g.length;++g)f.g(this.g[g]);this.g=null}};
var f=new c;b.prototype.ia=function(g){var h=this.i();g.J(h.resolve,h.reject)};
b.prototype.ja=function(g,h){var k=this.i();try{g.call(h,k.resolve,k.reject)}catch(l){k.reject(l)}};
b.prototype.then=function(g,h){function k(r,q){return"function"==typeof r?function(v){try{l(r(v))}catch(w){m(w)}}:q}
var l,m,n=new b(function(r,q){l=r;m=q});
this.J(k(g,l),k(h,m));return n};
b.prototype["catch"]=function(g){return this.then(void 0,g)};
b.prototype.J=function(g,h){function k(){switch(l.f){case 1:g(l.h);break;case 2:h(l.h);break;default:throw Error("Unexpected state: "+l.f);}}
var l=this;null==this.g?f.g(k):this.g.push(k);this.m=!0};
b.resolve=d;b.reject=function(g){return new b(function(h,k){k(g)})};
b.race=function(g){return new b(function(h,k){for(var l=u(g),m=l.next();!m.done;m=l.next())d(m.value).J(h,k)})};
b.all=function(g){var h=u(g),k=h.next();return k.done?d([]):new b(function(l,m){function n(v){return function(w){r[v]=w;q--;0==q&&l(r)}}
var r=[],q=0;do r.push(void 0),q++,d(k.value).J(n(r.length-1),m),k=h.next();while(!k.done)})};
return b});
function Na(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""}
t("String.prototype.endsWith",function(a){return a?a:function(b,c){var d=Na(this,b,"endsWith");b+="";void 0===c&&(c=d.length);for(var e=Math.max(0,Math.min(c|0,d.length)),f=b.length;0<f&&0<e;)if(d[--e]!=b[--f])return!1;return 0>=f}});
t("String.prototype.startsWith",function(a){return a?a:function(b,c){var d=Na(this,b,"startsWith");b+="";for(var e=d.length,f=b.length,g=Math.max(0,Math.min(c|0,d.length)),h=0;h<f&&g<e;)if(d[g++]!=b[h++])return!1;return h>=f}});
function Oa(a,b){a instanceof String&&(a+="");var c=0,d=!1,e={next:function(){if(!d&&c<a.length){var f=c++;return{value:b(f,a[f]),done:!1}}d=!0;return{done:!0,value:void 0}}};
e[Symbol.iterator]=function(){return e};
return e}
t("Array.prototype.keys",function(a){return a?a:function(){return Oa(this,function(b){return b})}});
t("Array.prototype.values",function(a){return a?a:function(){return Oa(this,function(b,c){return c})}});
t("Object.is",function(a){return a?a:function(b,c){return b===c?0!==b||1/b===1/c:b!==b&&c!==c}});
t("Array.prototype.includes",function(a){return a?a:function(b,c){var d=this;d instanceof String&&(d=String(d));var e=d.length,f=c||0;for(0>f&&(f=Math.max(f+e,0));f<e;f++){var g=d[f];if(g===b||Object.is(g,b))return!0}return!1}});
t("String.prototype.includes",function(a){return a?a:function(b,c){return-1!==Na(this,b,"includes").indexOf(b,c||0)}});
t("Object.entries",function(a){return a?a:function(b){var c=[],d;for(d in b)x(b,d)&&c.push([d,b[d]]);return c}});
t("Array.prototype.entries",function(a){return a?a:function(){return Oa(this,function(b,c){return[b,c]})}});
t("WeakMap",function(a){function b(k){this.f=(h+=Math.random()+1).toString();if(k){k=u(k);for(var l;!(l=k.next()).done;)l=l.value,this.set(l[0],l[1])}}
function c(){}
function d(k){var l=typeof k;return"object"===l&&null!==k||"function"===l}
function e(k){if(!x(k,g)){var l=new c;ba(k,g,{value:l})}}
function f(k){var l=Object[k];l&&(Object[k]=function(m){if(m instanceof c)return m;Object.isExtensible(m)&&e(m);return l(m)})}
if(function(){if(!a||!Object.seal)return!1;try{var k=Object.seal({}),l=Object.seal({}),m=new a([[k,2],[l,3]]);if(2!=m.get(k)||3!=m.get(l))return!1;m["delete"](k);m.set(l,4);return!m.has(k)&&4==m.get(l)}catch(n){return!1}}())return a;
var g="$jscomp_hidden_"+Math.random();f("freeze");f("preventExtensions");f("seal");var h=0;b.prototype.set=function(k,l){if(!d(k))throw Error("Invalid WeakMap key");e(k);if(!x(k,g))throw Error("WeakMap key fail: "+k);k[g][this.f]=l;return this};
b.prototype.get=function(k){return d(k)&&x(k,g)?k[g][this.f]:void 0};
b.prototype.has=function(k){return d(k)&&x(k,g)&&x(k[g],this.f)};
b.prototype["delete"]=function(k){return d(k)&&x(k,g)&&x(k[g],this.f)?delete k[g][this.f]:!1};
return b});
t("Map",function(a){function b(){var h={};return h.previous=h.next=h.head=h}
function c(h,k){var l=h.f;return ea(function(){if(l){for(;l.head!=h.f;)l=l.previous;for(;l.next!=l.head;)return l=l.next,{done:!1,value:k(l)};l=null}return{done:!0,value:void 0}})}
function d(h,k){var l=k&&typeof k;"object"==l||"function"==l?f.has(k)?l=f.get(k):(l=""+ ++g,f.set(k,l)):l="p_"+k;var m=h.g[l];if(m&&x(h.g,l))for(var n=0;n<m.length;n++){var r=m[n];if(k!==k&&r.key!==r.key||k===r.key)return{id:l,list:m,index:n,s:r}}return{id:l,list:m,index:-1,s:void 0}}
function e(h){this.g={};this.f=b();this.size=0;if(h){h=u(h);for(var k;!(k=h.next()).done;)k=k.value,this.set(k[0],k[1])}}
if(function(){if(!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var h=Object.seal({x:4}),k=new a(u([[h,"s"]]));if("s"!=k.get(h)||1!=k.size||k.get({x:4})||k.set({x:4},"t")!=k||2!=k.size)return!1;var l=k.entries(),m=l.next();if(m.done||m.value[0]!=h||"s"!=m.value[1])return!1;m=l.next();return m.done||4!=m.value[0].x||"t"!=m.value[1]||!l.next().done?!1:!0}catch(n){return!1}}())return a;
var f=new WeakMap;e.prototype.set=function(h,k){h=0===h?0:h;var l=d(this,h);l.list||(l.list=this.g[l.id]=[]);l.s?l.s.value=k:(l.s={next:this.f,previous:this.f.previous,head:this.f,key:h,value:k},l.list.push(l.s),this.f.previous.next=l.s,this.f.previous=l.s,this.size++);return this};
e.prototype["delete"]=function(h){h=d(this,h);return h.s&&h.list?(h.list.splice(h.index,1),h.list.length||delete this.g[h.id],h.s.previous.next=h.s.next,h.s.next.previous=h.s.previous,h.s.head=null,this.size--,!0):!1};
e.prototype.clear=function(){this.g={};this.f=this.f.previous=b();this.size=0};
e.prototype.has=function(h){return!!d(this,h).s};
e.prototype.get=function(h){return(h=d(this,h).s)&&h.value};
e.prototype.entries=function(){return c(this,function(h){return[h.key,h.value]})};
e.prototype.keys=function(){return c(this,function(h){return h.key})};
e.prototype.values=function(){return c(this,function(h){return h.value})};
e.prototype.forEach=function(h,k){for(var l=this.entries(),m;!(m=l.next()).done;)m=m.value,h.call(k,m[1],m[0],this)};
e.prototype[Symbol.iterator]=e.prototype.entries;var g=0;return e});
t("Set",function(a){function b(c){this.f=new Map;if(c){c=u(c);for(var d;!(d=c.next()).done;)this.add(d.value)}this.size=this.f.size}
if(function(){if(!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var c=Object.seal({x:4}),d=new a(u([c]));if(!d.has(c)||1!=d.size||d.add(c)!=d||1!=d.size||d.add({x:4})!=d||2!=d.size)return!1;var e=d.entries(),f=e.next();if(f.done||f.value[0]!=c||f.value[1]!=c)return!1;f=e.next();return f.done||f.value[0]==c||4!=f.value[0].x||f.value[1]!=f.value[0]?!1:e.next().done}catch(g){return!1}}())return a;
b.prototype.add=function(c){c=0===c?0:c;this.f.set(c,c);this.size=this.f.size;return this};
b.prototype["delete"]=function(c){c=this.f["delete"](c);this.size=this.f.size;return c};
b.prototype.clear=function(){this.f.clear();this.size=0};
b.prototype.has=function(c){return this.f.has(c)};
b.prototype.entries=function(){return this.f.entries()};
b.prototype.values=function(){return this.f.values()};
b.prototype.keys=b.prototype.values;b.prototype[Symbol.iterator]=b.prototype.values;b.prototype.forEach=function(c,d){var e=this;this.f.forEach(function(f){return c.call(d,f,f,e)})};
return b});
var y=this||self;function z(a,b){for(var c=a.split("."),d=b||y,e=0;e<c.length;e++)if(d=d[c[e]],null==d)return null;return d}
function Pa(){}
function Qa(a){var b=typeof a;b="object"!=b?b:a?Array.isArray(a)?"array":b:"null";return"array"==b||"object"==b&&"number"==typeof a.length}
function A(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}
function Ra(a){return Object.prototype.hasOwnProperty.call(a,Ta)&&a[Ta]||(a[Ta]=++Ua)}
var Ta="closure_uid_"+(1E9*Math.random()>>>0),Ua=0;function Va(a,b,c){return a.call.apply(a.bind,arguments)}
function Wa(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var e=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(e,d);return a.apply(b,e)}}return function(){return a.apply(b,arguments)}}
function Xa(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?Xa=Va:Xa=Wa;return Xa.apply(null,arguments)}
function Ya(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var d=c.slice();d.push.apply(d,arguments);return a.apply(this,d)}}
function B(a,b){var c=a.split("."),d=y;c[0]in d||"undefined"==typeof d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===b?d[e]&&d[e]!==Object.prototype[e]?d=d[e]:d=d[e]={}:d[e]=b}
function C(a,b){function c(){}
c.prototype=b.prototype;a.A=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Ja=function(d,e,f){for(var g=Array(arguments.length-2),h=2;h<arguments.length;h++)g[h-2]=arguments[h];return b.prototype[e].apply(d,g)}}
function Za(a){return a}
;function $a(a,b){var c=void 0;return new (c||(c=Promise))(function(d,e){function f(k){try{h(b.next(k))}catch(l){e(l)}}
function g(k){try{h(b["throw"](k))}catch(l){e(l)}}
function h(k){k.done?d(k.value):(new c(function(l){l(k.value)})).then(f,g)}
h((b=b.apply(a,void 0)).next())})}
;function ab(a){if(Error.captureStackTrace)Error.captureStackTrace(this,ab);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}
C(ab,Error);ab.prototype.name="CustomError";var bb=Array.prototype.indexOf?function(a,b){return Array.prototype.indexOf.call(a,b,void 0)}:function(a,b){if("string"===typeof a)return"string"!==typeof b||1!=b.length?-1:a.indexOf(b,0);
for(var c=0;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},D=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e="string"===typeof a?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},cb=Array.prototype.reduce?function(a,b,c){return Array.prototype.reduce.call(a,b,c)}:function(a,b,c){var d=c;
D(a,function(e,f){d=b.call(void 0,d,e,f,a)});
return d};
function db(a,b){a:{var c=a.length;for(var d="string"===typeof a?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){c=e;break a}c=-1}return 0>c?null:"string"===typeof a?a.charAt(c):a[c]}
function eb(a,b){var c=bb(a,b),d;(d=0<=c)&&Array.prototype.splice.call(a,c,1);return d}
function fb(a){return Array.prototype.concat.apply([],arguments)}
function gb(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]}
function mb(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(Qa(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var g=0;g<f;g++)a[e+g]=d[g]}else a.push(d)}}
;function nb(a){var b=!1,c;return function(){b||(c=a(),b=!0);return c}}
;function ob(a,b){for(var c in a)b.call(void 0,a[c],c,a)}
function pb(a){var b=qb,c;for(c in b)if(a.call(void 0,b[c],c,b))return c}
function rb(a,b){for(var c in a)if(!(c in b)||a[c]!==b[c])return!1;for(var d in b)if(!(d in a))return!1;return!0}
function sb(a){if(!a||"object"!==typeof a)return a;if("function"===typeof a.clone)return a.clone();var b=Array.isArray(a)?[]:"function"!==typeof ArrayBuffer||"function"!==typeof ArrayBuffer.isView||!ArrayBuffer.isView(a)||a instanceof DataView?{}:new a.constructor(a.length),c;for(c in a)b[c]=sb(a[c]);return b}
var tb="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function ub(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<tb.length;f++)c=tb[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}}
;var vb;var wb=String.prototype.trim?function(a){return a.trim()}:function(a){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]},xb=/&/g,yb=/</g,zb=/>/g,Ab=/"/g,Bb=/'/g,Cb=/\x00/g,Db=/[\x00&<>"']/;
function Eb(a,b){return a<b?-1:a>b?1:0}
;var F;a:{var Fb=y.navigator;if(Fb){var Gb=Fb.userAgent;if(Gb){F=Gb;break a}}F=""}function G(a){return-1!=F.indexOf(a)}
;function Hb(){}
;function Ib(a){Ib[" "](a);return a}
Ib[" "]=Pa;var Jb=G("Opera"),Kb=G("Trident")||G("MSIE"),Lb=G("Edge"),Mb=G("Gecko")&&!(-1!=F.toLowerCase().indexOf("webkit")&&!G("Edge"))&&!(G("Trident")||G("MSIE"))&&!G("Edge"),Nb=-1!=F.toLowerCase().indexOf("webkit")&&!G("Edge");function Ob(){var a=y.document;return a?a.documentMode:void 0}
var Pb;a:{var Qb="",Rb=function(){var a=F;if(Mb)return/rv:([^\);]+)(\)|;)/.exec(a);if(Lb)return/Edge\/([\d\.]+)/.exec(a);if(Kb)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(Nb)return/WebKit\/(\S+)/.exec(a);if(Jb)return/(?:Version)[ \/]?(\S+)/.exec(a)}();
Rb&&(Qb=Rb?Rb[1]:"");if(Kb){var Zb=Ob();if(null!=Zb&&Zb>parseFloat(Qb)){Pb=String(Zb);break a}}Pb=Qb}var $b=Pb,ac={},bc;if(y.document&&Kb){var cc=Ob();bc=cc?cc:parseInt($b,10)||void 0}else bc=void 0;var dc=bc;var ec=G("iPhone")&&!G("iPod")&&!G("iPad")||G("iPod"),fc=G("iPad");var gc={},hc=null;var H=window;function ic(a){var b=z("window.location.href");null==a&&(a='Unknown Error of type "null/undefined"');if("string"===typeof a)return{message:a,name:"Unknown error",lineNumber:"Not available",fileName:b,stack:"Not available"};var c=!1;try{var d=a.lineNumber||a.line||"Not available"}catch(g){d="Not available",c=!0}try{var e=a.fileName||a.filename||a.sourceURL||y.$googDebugFname||b}catch(g){e="Not available",c=!0}b=jc(a);if(!(!c&&a.lineNumber&&a.fileName&&a.stack&&a.message&&a.name)){c=a.message;if(null==
c){if(a.constructor&&a.constructor instanceof Function){if(a.constructor.name)c=a.constructor.name;else if(c=a.constructor,kc[c])c=kc[c];else{c=String(c);if(!kc[c]){var f=/function\s+([^\(]+)/m.exec(c);kc[c]=f?f[1]:"[Anonymous]"}c=kc[c]}c='Unknown Error of type "'+c+'"'}else c="Unknown Error of unknown type";"function"===typeof a.toString&&Object.prototype.toString!==a.toString&&(c+=": "+a.toString())}return{message:c,name:a.name||"UnknownError",lineNumber:d,fileName:e,stack:b||"Not available"}}a.stack=
b;return a}
function jc(a,b){b||(b={});b[lc(a)]=!0;var c=a.stack||"",d=a.Ka;d&&!b[lc(d)]&&(c+="\nCaused by: ",d.stack&&0==d.stack.indexOf(d.toString())||(c+="string"===typeof d?d:d.message+"\n"),c+=jc(d,b));return c}
function lc(a){var b="";"function"===typeof a.toString&&(b=""+a);return b+a.stack}
var kc={};function mc(a){this.f=a||{cookie:""}}
p=mc.prototype;p.isEnabled=function(){return navigator.cookieEnabled};
p.set=function(a,b,c){var d=!1;if("object"===typeof c){var e=c.Ra;d=c.secure||!1;var f=c.domain||void 0;var g=c.path||void 0;var h=c.Y}if(/[;=\s]/.test(a))throw Error('Invalid cookie name "'+a+'"');if(/[;\r\n]/.test(b))throw Error('Invalid cookie value "'+b+'"');void 0===h&&(h=-1);this.f.cookie=a+"="+b+(f?";domain="+f:"")+(g?";path="+g:"")+(0>h?"":0==h?";expires="+(new Date(1970,1,1)).toUTCString():";expires="+(new Date(Date.now()+1E3*h)).toUTCString())+(d?";secure":"")+(null!=e?";samesite="+e:"")};
p.get=function(a,b){for(var c=a+"=",d=(this.f.cookie||"").split(";"),e=0,f;e<d.length;e++){f=wb(d[e]);if(0==f.lastIndexOf(c,0))return f.substr(c.length);if(f==a)return""}return b};
p.remove=function(a,b,c){var d=void 0!==this.get(a);this.set(a,"",{Y:0,path:b,domain:c});return d};
p.isEmpty=function(){return!this.f.cookie};
p.clear=function(){for(var a=(this.f.cookie||"").split(";"),b=[],c=[],d,e,f=0;f<a.length;f++)e=wb(a[f]),d=e.indexOf("="),-1==d?(b.push(""),c.push(e)):(b.push(e.substring(0,d)),c.push(e.substring(d+1)));for(a=b.length-1;0<=a;a--)this.remove(b[a])};
var nc=new mc("undefined"==typeof document?null:document);function oc(a,b){this.width=a;this.height=b}
p=oc.prototype;p.clone=function(){return new oc(this.width,this.height)};
p.aspectRatio=function(){return this.width/this.height};
p.isEmpty=function(){return!(this.width*this.height)};
p.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
p.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
p.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};function pc(a,b){var c,d;var e=document;e=b||e;if(e.querySelectorAll&&e.querySelector&&a)return e.querySelectorAll(a?"."+a:"");if(a&&e.getElementsByClassName){var f=e.getElementsByClassName(a);return f}f=e.getElementsByTagName("*");if(a){var g={};for(c=d=0;e=f[c];c++){var h=e.className,k;if(k="function"==typeof h.split)k=0<=bb(h.split(/\s+/),a);k&&(g[d++]=e)}g.length=d;return g}return f}
function qc(){var a=document;var b="IFRAME";"application/xhtml+xml"===a.contentType&&(b=b.toLowerCase());return a.createElement(b)}
function rc(a,b){for(var c=0;a;){if(b(a))return a;a=a.parentNode;c++}return null}
;var sc=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function tc(a){return a?decodeURI(a):a}
function I(a){return tc(a.match(sc)[3]||null)}
function uc(a){var b=a.match(sc);a=b[1];var c=b[2],d=b[3];b=b[4];var e="";a&&(e+=a+":");d&&(e+="//",c&&(e+=c+"@"),e+=d,b&&(e+=":"+b));return e}
function vc(a,b,c){if(Array.isArray(b))for(var d=0;d<b.length;d++)vc(a,String(b[d]),c);else null!=b&&c.push(a+(""===b?"":"="+encodeURIComponent(String(b))))}
function wc(a){var b=[],c;for(c in a)vc(c,a[c],b);return b.join("&")}
var xc=/#|$/;function yc(a){var b=zc;if(b)for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&a.call(void 0,b[c],c,b)}
function Ac(){var a=[];yc(function(b){a.push(b)});
return a}
var zc={wa:"allow-forms",xa:"allow-modals",ya:"allow-orientation-lock",za:"allow-pointer-lock",Aa:"allow-popups",Ba:"allow-popups-to-escape-sandbox",Ca:"allow-presentation",Da:"allow-same-origin",Ea:"allow-scripts",Fa:"allow-top-navigation",Ga:"allow-top-navigation-by-user-activation"},Bc=nb(function(){return Ac()});
function Cc(){var a=qc(),b={};D(Bc(),function(c){a.sandbox&&a.sandbox.supports&&a.sandbox.supports(c)&&(b[c]=!0)});
return b}
;function Dc(){this.h=this.h;this.i=this.i}
Dc.prototype.h=!1;Dc.prototype.dispose=function(){this.h||(this.h=!0,this.H())};
Dc.prototype.H=function(){if(this.i)for(;this.i.length;)this.i.shift()()};var Ec={};function Fc(){}
function Gc(a,b){if(b!==Ec)throw Error("Bad secret");this.f=a}
qa(Gc,Fc);Gc.prototype.toString=function(){return this.f};new Gc("about:blank",Ec);new Gc("about:invalid#zTSz",Ec);var Hc=(new Date).getTime();function Ic(a){if(!a)return"";a=a.split("#")[0].split("?")[0];a=a.toLowerCase();0==a.indexOf("//")&&(a=window.location.protocol+a);/^[\w\-]*:\/\//.test(a)||(a=window.location.href);var b=a.substring(a.indexOf("://")+3),c=b.indexOf("/");-1!=c&&(b=b.substring(0,c));a=a.substring(0,a.indexOf("://"));if("http"!==a&&"https"!==a&&"chrome-extension"!==a&&"moz-extension"!==a&&"file"!==a&&"android-app"!==a&&"chrome-search"!==a&&"chrome-untrusted"!==a&&"chrome"!==a&&"app"!==a&&"devtools"!==a)throw Error("Invalid URI scheme in origin: "+
a);c="";var d=b.indexOf(":");if(-1!=d){var e=b.substring(d+1);b=b.substring(0,d);if("http"===a&&"80"!==e||"https"===a&&"443"!==e)c=":"+e}return a+"://"+b+c}
;function Jc(){function a(){e[0]=1732584193;e[1]=4023233417;e[2]=2562383102;e[3]=271733878;e[4]=3285377520;m=l=0}
function b(n){for(var r=g,q=0;64>q;q+=4)r[q/4]=n[q]<<24|n[q+1]<<16|n[q+2]<<8|n[q+3];for(q=16;80>q;q++)n=r[q-3]^r[q-8]^r[q-14]^r[q-16],r[q]=(n<<1|n>>>31)&4294967295;n=e[0];var v=e[1],w=e[2],E=e[3],Sa=e[4];for(q=0;80>q;q++){if(40>q)if(20>q){var fa=E^v&(w^E);var Da=1518500249}else fa=v^w^E,Da=1859775393;else 60>q?(fa=v&w|E&(v|w),Da=2400959708):(fa=v^w^E,Da=3395469782);fa=((n<<5|n>>>27)&4294967295)+fa+Sa+Da+r[q]&4294967295;Sa=E;E=w;w=(v<<30|v>>>2)&4294967295;v=n;n=fa}e[0]=e[0]+n&4294967295;e[1]=e[1]+
v&4294967295;e[2]=e[2]+w&4294967295;e[3]=e[3]+E&4294967295;e[4]=e[4]+Sa&4294967295}
function c(n,r){if("string"===typeof n){n=unescape(encodeURIComponent(n));for(var q=[],v=0,w=n.length;v<w;++v)q.push(n.charCodeAt(v));n=q}r||(r=n.length);q=0;if(0==l)for(;q+64<r;)b(n.slice(q,q+64)),q+=64,m+=64;for(;q<r;)if(f[l++]=n[q++],m++,64==l)for(l=0,b(f);q+64<r;)b(n.slice(q,q+64)),q+=64,m+=64}
function d(){var n=[],r=8*m;56>l?c(h,56-l):c(h,64-(l-56));for(var q=63;56<=q;q--)f[q]=r&255,r>>>=8;b(f);for(q=r=0;5>q;q++)for(var v=24;0<=v;v-=8)n[r++]=e[q]>>v&255;return n}
for(var e=[],f=[],g=[],h=[128],k=1;64>k;++k)h[k]=0;var l,m;a();return{reset:a,update:c,digest:d,ka:function(){for(var n=d(),r="",q=0;q<n.length;q++)r+="0123456789ABCDEF".charAt(Math.floor(n[q]/16))+"0123456789ABCDEF".charAt(n[q]%16);return r}}}
;function Kc(a,b,c){var d=[],e=[];if(1==(Array.isArray(c)?2:1))return e=[b,a],D(d,function(h){e.push(h)}),Lc(e.join(" "));
var f=[],g=[];D(c,function(h){g.push(h.key);f.push(h.value)});
c=Math.floor((new Date).getTime()/1E3);e=0==f.length?[c,b,a]:[f.join(":"),c,b,a];D(d,function(h){e.push(h)});
a=Lc(e.join(" "));a=[c,a];0==g.length||a.push(g.join(""));return a.join("_")}
function Lc(a){var b=Jc();b.update(a);return b.ka().toLowerCase()}
;function Mc(a){var b=Ic(String(y.location.href)),c;(c=y.__SAPISID||y.__APISID||y.__OVERRIDE_SID)?c=!0:(c=new mc(document),c=c.get("SAPISID")||c.get("APISID")||c.get("__Secure-3PAPISID")||c.get("SID"),c=!!c);if(c&&(c=(b=0==b.indexOf("https:")||0==b.indexOf("chrome-extension:")||0==b.indexOf("moz-extension:"))?y.__SAPISID:y.__APISID,c||(c=new mc(document),c=c.get(b?"SAPISID":"APISID")||c.get("__Secure-3PAPISID")),c)){b=b?"SAPISIDHASH":"APISIDHASH";var d=String(y.location.href);return d&&c&&b?[b,Kc(Ic(d),
c,a||null)].join(" "):null}return null}
;function Nc(){this.g=[];this.f=-1}
Nc.prototype.set=function(a,b){b=void 0===b?!0:b;0<=a&&52>a&&0===a%1&&this.g[a]!=b&&(this.g[a]=b,this.f=-1)};
Nc.prototype.get=function(a){return!!this.g[a]};
function Oc(a){-1==a.f&&(a.f=cb(a.g,function(b,c,d){return c?b+Math.pow(2,d):b},0));
return a.f}
;function Pc(a,b){this.h=a;this.i=b;this.g=0;this.f=null}
Pc.prototype.get=function(){if(0<this.g){this.g--;var a=this.f;this.f=a.next;a.next=null}else a=this.h();return a};
function Qc(a,b){a.i(b);100>a.g&&(a.g++,b.next=a.f,a.f=b)}
;function Rc(a){y.setTimeout(function(){throw a;},0)}
var Sc;function Tc(){var a=y.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!G("Presto")&&(a=function(){var e=qc();e.style.display="none";document.documentElement.appendChild(e);var f=e.contentWindow;e=f.document;e.open();e.close();var g="callImmediate"+Math.random(),h="file:"==f.location.protocol?"*":f.location.protocol+"//"+f.location.host;e=Xa(function(k){if(("*"==h||k.origin==h)&&k.data==g)this.port1.onmessage()},this);
f.addEventListener("message",e,!1);this.port1={};this.port2={postMessage:function(){f.postMessage(g,h)}}});
if("undefined"!==typeof a&&!G("Trident")&&!G("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var e=c.W;c.W=null;e()}};
return function(e){d.next={W:e};d=d.next;b.port2.postMessage(0)}}return function(e){y.setTimeout(e,0)}}
;function Uc(){this.g=this.f=null}
var Wc=new Pc(function(){return new Vc},function(a){a.reset()});
Uc.prototype.add=function(a,b){var c=Wc.get();c.set(a,b);this.g?this.g.next=c:this.f=c;this.g=c};
Uc.prototype.remove=function(){var a=null;this.f&&(a=this.f,this.f=this.f.next,this.f||(this.g=null),a.next=null);return a};
function Vc(){this.next=this.scope=this.f=null}
Vc.prototype.set=function(a,b){this.f=a;this.scope=b;this.next=null};
Vc.prototype.reset=function(){this.next=this.scope=this.f=null};function Xc(a,b){Yc||Zc();$c||(Yc(),$c=!0);ad.add(a,b)}
var Yc;function Zc(){if(y.Promise&&y.Promise.resolve){var a=y.Promise.resolve(void 0);Yc=function(){a.then(bd)}}else Yc=function(){var b=bd;
"function"!==typeof y.setImmediate||y.Window&&y.Window.prototype&&!G("Edge")&&y.Window.prototype.setImmediate==y.setImmediate?(Sc||(Sc=Tc()),Sc(b)):y.setImmediate(b)}}
var $c=!1,ad=new Uc;function bd(){for(var a;a=ad.remove();){try{a.f.call(a.scope)}catch(b){Rc(b)}Qc(Wc,a)}$c=!1}
;function wd(){this.g=-1}
;function xd(){this.g=64;this.f=[];this.l=[];this.m=[];this.i=[];this.i[0]=128;for(var a=1;a<this.g;++a)this.i[a]=0;this.j=this.h=0;this.reset()}
C(xd,wd);xd.prototype.reset=function(){this.f[0]=1732584193;this.f[1]=4023233417;this.f[2]=2562383102;this.f[3]=271733878;this.f[4]=3285377520;this.j=this.h=0};
function yd(a,b,c){c||(c=0);var d=a.m;if("string"===typeof b)for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.f[0];c=a.f[1];var g=a.f[2],h=a.f[3],k=a.f[4];for(e=0;80>e;e++){if(40>e)if(20>e){f=h^c&(g^h);var l=1518500249}else f=c^g^h,l=1859775393;else 60>e?(f=c&g|h&(c|g),l=2400959708):
(f=c^g^h,l=3395469782);f=(b<<5|b>>>27)+f+k+l+d[e]&4294967295;k=h;h=g;g=(c<<30|c>>>2)&4294967295;c=b;b=f}a.f[0]=a.f[0]+b&4294967295;a.f[1]=a.f[1]+c&4294967295;a.f[2]=a.f[2]+g&4294967295;a.f[3]=a.f[3]+h&4294967295;a.f[4]=a.f[4]+k&4294967295}
xd.prototype.update=function(a,b){if(null!=a){void 0===b&&(b=a.length);for(var c=b-this.g,d=0,e=this.l,f=this.h;d<b;){if(0==f)for(;d<=c;)yd(this,a,d),d+=this.g;if("string"===typeof a)for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.g){yd(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.g){yd(this,e);f=0;break}}this.h=f;this.j+=b}};
xd.prototype.digest=function(){var a=[],b=8*this.j;56>this.h?this.update(this.i,56-this.h):this.update(this.i,this.g-(this.h-56));for(var c=this.g-1;56<=c;c--)this.l[c]=b&255,b/=256;yd(this,this.l);for(c=b=0;5>c;c++)for(var d=24;0<=d;d-=8)a[b]=this.f[c]>>d&255,++b;return a};var zd="StopIteration"in y?y.StopIteration:{message:"StopIteration",stack:""};function Ad(){}
Ad.prototype.next=function(){throw zd;};
Ad.prototype.B=function(){return this};
function Bd(a){if(a instanceof Ad)return a;if("function"==typeof a.B)return a.B(!1);if(Qa(a)){var b=0,c=new Ad;c.next=function(){for(;;){if(b>=a.length)throw zd;if(b in a)return a[b++];b++}};
return c}throw Error("Not implemented");}
function Cd(a,b){if(Qa(a))try{D(a,b,void 0)}catch(c){if(c!==zd)throw c;}else{a=Bd(a);try{for(;;)b.call(void 0,a.next(),void 0,a)}catch(c){if(c!==zd)throw c;}}}
function Dd(a){if(Qa(a))return gb(a);a=Bd(a);var b=[];Cd(a,function(c){b.push(c)});
return b}
;function Ed(a,b){this.h={};this.f=[];this.i=this.g=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a)if(a instanceof Ed)for(c=Fd(a),d=0;d<c.length;d++)this.set(c[d],a.get(c[d]));else for(d in a)this.set(d,a[d])}
function Fd(a){Gd(a);return a.f.concat()}
p=Ed.prototype;p.equals=function(a,b){if(this===a)return!0;if(this.g!=a.g)return!1;var c=b||Hd;Gd(this);for(var d,e=0;d=this.f[e];e++)if(!c(this.get(d),a.get(d)))return!1;return!0};
function Hd(a,b){return a===b}
p.isEmpty=function(){return 0==this.g};
p.clear=function(){this.h={};this.i=this.g=this.f.length=0};
p.remove=function(a){return Object.prototype.hasOwnProperty.call(this.h,a)?(delete this.h[a],this.g--,this.i++,this.f.length>2*this.g&&Gd(this),!0):!1};
function Gd(a){if(a.g!=a.f.length){for(var b=0,c=0;b<a.f.length;){var d=a.f[b];Object.prototype.hasOwnProperty.call(a.h,d)&&(a.f[c++]=d);b++}a.f.length=c}if(a.g!=a.f.length){var e={};for(c=b=0;b<a.f.length;)d=a.f[b],Object.prototype.hasOwnProperty.call(e,d)||(a.f[c++]=d,e[d]=1),b++;a.f.length=c}}
p.get=function(a,b){return Object.prototype.hasOwnProperty.call(this.h,a)?this.h[a]:b};
p.set=function(a,b){Object.prototype.hasOwnProperty.call(this.h,a)||(this.g++,this.f.push(a),this.i++);this.h[a]=b};
p.forEach=function(a,b){for(var c=Fd(this),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};
p.clone=function(){return new Ed(this)};
p.B=function(a){Gd(this);var b=0,c=this.i,d=this,e=new Ad;e.next=function(){if(c!=d.i)throw Error("The map has changed since the iterator was created");if(b>=d.f.length)throw zd;var f=d.f[b++];return a?f:d.h[f]};
return e};var Id=!Kb||9<=Number(dc),Jd;
if(Jd=Kb){var Kd;if(Object.prototype.hasOwnProperty.call(ac,"9"))Kd=ac["9"];else{for(var Ld=0,Md=wb(String($b)).split("."),Nd=wb("9").split("."),Od=Math.max(Md.length,Nd.length),Pd=0;0==Ld&&Pd<Od;Pd++){var Qd=Md[Pd]||"",Rd=Nd[Pd]||"";do{var Sd=/(\d*)(\D*)(.*)/.exec(Qd)||["","","",""],Td=/(\d*)(\D*)(.*)/.exec(Rd)||["","","",""];if(0==Sd[0].length&&0==Td[0].length)break;Ld=Eb(0==Sd[1].length?0:parseInt(Sd[1],10),0==Td[1].length?0:parseInt(Td[1],10))||Eb(0==Sd[2].length,0==Td[2].length)||Eb(Sd[2],Td[2]);
Qd=Sd[3];Rd=Td[3]}while(0==Ld)}Kd=ac["9"]=0<=Ld}Jd=!Kd}var Ud=Jd,Vd=function(){if(!y.addEventListener||!Object.defineProperty)return!1;var a=!1,b=Object.defineProperty({},"passive",{get:function(){a=!0}});
try{y.addEventListener("test",Pa,b),y.removeEventListener("test",Pa,b)}catch(c){}return a}();function Wd(a,b){this.type=a;this.f=this.target=b;this.defaultPrevented=this.g=!1}
Wd.prototype.stopPropagation=function(){this.g=!0};
Wd.prototype.preventDefault=function(){this.defaultPrevented=!0};function Xd(a,b){Wd.call(this,a?a.type:"");this.relatedTarget=this.f=this.target=null;this.button=this.screenY=this.screenX=this.clientY=this.clientX=0;this.key="";this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.state=null;this.pointerId=0;this.pointerType="";this.h=null;a&&this.init(a,b)}
C(Xd,Wd);var Yd={2:"touch",3:"pen",4:"mouse"};
Xd.prototype.init=function(a,b){var c=this.type=a.type,d=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement;this.f=b;var e=a.relatedTarget;if(e){if(Mb){a:{try{Ib(e.nodeName);var f=!0;break a}catch(g){}f=!1}f||(e=null)}}else"mouseover"==c?e=a.fromElement:"mouseout"==c&&(e=a.toElement);this.relatedTarget=e;d?(this.clientX=void 0!==d.clientX?d.clientX:d.pageX,this.clientY=void 0!==d.clientY?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||
0):(this.clientX=void 0!==a.clientX?a.clientX:a.pageX,this.clientY=void 0!==a.clientY?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0);this.button=a.button;this.keyCode=a.keyCode||0;this.key=a.key||"";this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.pointerId=a.pointerId||0;this.pointerType="string"===typeof a.pointerType?a.pointerType:Yd[a.pointerType]||"";this.state=a.state;
this.h=a;a.defaultPrevented&&this.preventDefault()};
Xd.prototype.stopPropagation=function(){Xd.A.stopPropagation.call(this);this.h.stopPropagation?this.h.stopPropagation():this.h.cancelBubble=!0};
Xd.prototype.preventDefault=function(){Xd.A.preventDefault.call(this);var a=this.h;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Ud)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var Zd="closure_listenable_"+(1E6*Math.random()|0),$d=0;function ae(a,b,c,d,e){this.listener=a;this.f=null;this.src=b;this.type=c;this.capture=!!d;this.K=e;this.key=++$d;this.F=this.I=!1}
function be(a){a.F=!0;a.listener=null;a.f=null;a.src=null;a.K=null}
;function ce(a){this.src=a;this.listeners={};this.f=0}
ce.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.listeners[f];a||(a=this.listeners[f]=[],this.f++);var g=de(a,b,d,e);-1<g?(b=a[g],c||(b.I=!1)):(b=new ae(b,this.src,f,!!d,e),b.I=c,a.push(b));return b};
ce.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.listeners))return!1;var e=this.listeners[a];b=de(e,b,c,d);return-1<b?(be(e[b]),Array.prototype.splice.call(e,b,1),0==e.length&&(delete this.listeners[a],this.f--),!0):!1};
function ee(a,b){var c=b.type;c in a.listeners&&eb(a.listeners[c],b)&&(be(b),0==a.listeners[c].length&&(delete a.listeners[c],a.f--))}
function de(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.F&&f.listener==b&&f.capture==!!c&&f.K==d)return e}return-1}
;var fe="closure_lm_"+(1E6*Math.random()|0),ge={},he=0;function ie(a,b,c,d,e){if(d&&d.once)je(a,b,c,d,e);else if(Array.isArray(b))for(var f=0;f<b.length;f++)ie(a,b[f],c,d,e);else c=ke(c),a&&a[Zd]?a.f.add(String(b),c,!1,A(d)?!!d.capture:!!d,e):le(a,b,c,!1,d,e)}
function le(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var g=A(e)?!!e.capture:!!e,h=me(a);h||(a[fe]=h=new ce(a));c=h.add(b,c,d,g,f);if(!c.f){d=ne();c.f=d;d.src=a;d.listener=c;if(a.addEventListener)Vd||(e=g),void 0===e&&(e=!1),a.addEventListener(b.toString(),d,e);else if(a.attachEvent)a.attachEvent(oe(b.toString()),d);else if(a.addListener&&a.removeListener)a.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");he++}}
function ne(){var a=pe,b=Id?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);
if(!c)return c};
return b}
function je(a,b,c,d,e){if(Array.isArray(b))for(var f=0;f<b.length;f++)je(a,b[f],c,d,e);else c=ke(c),a&&a[Zd]?a.f.add(String(b),c,!0,A(d)?!!d.capture:!!d,e):le(a,b,c,!0,d,e)}
function qe(a,b,c,d,e){if(Array.isArray(b))for(var f=0;f<b.length;f++)qe(a,b[f],c,d,e);else(d=A(d)?!!d.capture:!!d,c=ke(c),a&&a[Zd])?a.f.remove(String(b),c,d,e):a&&(a=me(a))&&(b=a.listeners[b.toString()],a=-1,b&&(a=de(b,c,d,e)),(c=-1<a?b[a]:null)&&re(c))}
function re(a){if("number"!==typeof a&&a&&!a.F){var b=a.src;if(b&&b[Zd])ee(b.f,a);else{var c=a.type,d=a.f;b.removeEventListener?b.removeEventListener(c,d,a.capture):b.detachEvent?b.detachEvent(oe(c),d):b.addListener&&b.removeListener&&b.removeListener(d);he--;(c=me(b))?(ee(c,a),0==c.f&&(c.src=null,b[fe]=null)):be(a)}}}
function oe(a){return a in ge?ge[a]:ge[a]="on"+a}
function se(a,b,c,d){var e=!0;if(a=me(a))if(b=a.listeners[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.capture==c&&!f.F&&(f=te(f,d),e=e&&!1!==f)}return e}
function te(a,b){var c=a.listener,d=a.K||a.src;a.I&&re(a);return c.call(d,b)}
function pe(a,b){if(a.F)return!0;if(!Id){var c=b||z("window.event"),d=new Xd(c,this),e=!0;if(!(0>c.keyCode||void 0!=c.returnValue)){a:{var f=!1;if(0==c.keyCode)try{c.keyCode=-1;break a}catch(k){f=!0}if(f||void 0==c.returnValue)c.returnValue=!0}c=[];for(f=d.f;f;f=f.parentNode)c.push(f);f=a.type;for(var g=c.length-1;!d.g&&0<=g;g--){d.f=c[g];var h=se(c[g],f,!0,d);e=e&&h}for(g=0;!d.g&&g<c.length;g++)d.f=c[g],h=se(c[g],f,!1,d),e=e&&h}return e}return te(a,new Xd(b,this))}
function me(a){a=a[fe];return a instanceof ce?a:null}
var ue="__closure_events_fn_"+(1E9*Math.random()>>>0);function ke(a){if("function"===typeof a)return a;a[ue]||(a[ue]=function(b){return a.handleEvent(b)});
return a[ue]}
;function J(){Dc.call(this);this.f=new ce(this);this.l=this;this.j=null}
C(J,Dc);J.prototype[Zd]=!0;J.prototype.addEventListener=function(a,b,c,d){ie(this,a,b,c,d)};
J.prototype.removeEventListener=function(a,b,c,d){qe(this,a,b,c,d)};
J.prototype.dispatchEvent=function(a){var b=this.j;if(b){var c=[];for(var d=1;b;b=b.j)c.push(b),++d}b=this.l;d=a.type||a;if("string"===typeof a)a=new Wd(a,b);else if(a instanceof Wd)a.target=a.target||b;else{var e=a;a=new Wd(d,b);ub(a,e)}e=!0;if(c)for(var f=c.length-1;!a.g&&0<=f;f--){var g=a.f=c[f];e=ve(g,d,!0,a)&&e}a.g||(g=a.f=b,e=ve(g,d,!0,a)&&e,a.g||(e=ve(g,d,!1,a)&&e));if(c)for(f=0;!a.g&&f<c.length;f++)g=a.f=c[f],e=ve(g,d,!1,a)&&e;return e};
J.prototype.H=function(){J.A.H.call(this);if(this.f){var a=this.f,b=0,c;for(c in a.listeners){for(var d=a.listeners[c],e=0;e<d.length;e++)++b,be(d[e]);delete a.listeners[c];a.f--}}this.j=null};
function ve(a,b,c,d){b=a.f.listeners[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.F&&g.capture==c){var h=g.listener,k=g.K||g.src;g.I&&ee(a.f,g);e=!1!==h.call(k,d)&&e}}return e&&!d.defaultPrevented}
;var we=y.JSON.stringify;function K(a){this.f=0;this.m=void 0;this.i=this.g=this.h=null;this.j=this.l=!1;if(a!=Pa)try{var b=this;a.call(void 0,function(c){xe(b,2,c)},function(c){xe(b,3,c)})}catch(c){xe(this,3,c)}}
function ye(){this.next=this.context=this.onRejected=this.g=this.f=null;this.h=!1}
ye.prototype.reset=function(){this.context=this.onRejected=this.g=this.f=null;this.h=!1};
var ze=new Pc(function(){return new ye},function(a){a.reset()});
function Ae(a,b,c){var d=ze.get();d.g=a;d.onRejected=b;d.context=c;return d}
function Be(a){if(a instanceof K)return a;var b=new K(Pa);xe(b,2,a);return b}
function Ce(a,b,c){De(a,b,c,null)||Xc(Ya(b,a))}
function Ee(a){return new K(function(b,c){var d=a.length,e=[];if(d)for(var f=function(l,m){d--;e[l]=m;0==d&&b(e)},g=function(l){c(l)},h=0,k;h<a.length;h++)k=a[h],Ce(k,Ya(f,h),g);
else b(e)})}
K.prototype.then=function(a,b,c){return Fe(this,"function"===typeof a?a:null,"function"===typeof b?b:null,c)};
K.prototype.$goog_Thenable=!0;function Ge(a){var b=void 0===b?{}:b;b=He(b);return Fe(b,null,a,void 0)}
K.prototype.cancel=function(a){if(0==this.f){var b=new Ie(a);Xc(function(){Je(this,b)},this)}};
function Je(a,b){if(0==a.f)if(a.h){var c=a.h;if(c.g){for(var d=0,e=null,f=null,g=c.g;g&&(g.h||(d++,g.f==a&&(e=g),!(e&&1<d)));g=g.next)e||(f=g);e&&(0==c.f&&1==d?Je(c,b):(f?(d=f,d.next==c.i&&(c.i=d),d.next=d.next.next):Ke(c),Le(c,e,3,b)))}a.h=null}else xe(a,3,b)}
function Me(a,b){a.g||2!=a.f&&3!=a.f||Ne(a);a.i?a.i.next=b:a.g=b;a.i=b}
function Fe(a,b,c,d){var e=Ae(null,null,null);e.f=new K(function(f,g){e.g=b?function(h){try{var k=b.call(d,h);f(k)}catch(l){g(l)}}:f;
e.onRejected=c?function(h){try{var k=c.call(d,h);void 0===k&&h instanceof Ie?g(h):f(k)}catch(l){g(l)}}:g});
e.f.h=a;Me(a,e);return e.f}
K.prototype.v=function(a){this.f=0;xe(this,2,a)};
K.prototype.G=function(a){this.f=0;xe(this,3,a)};
function xe(a,b,c){0==a.f&&(a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself")),a.f=1,De(c,a.v,a.G,a)||(a.m=c,a.f=b,a.h=null,Ne(a),3!=b||c instanceof Ie||Oe(a,c)))}
function De(a,b,c,d){if(a instanceof K)return Me(a,Ae(b||Pa,c||null,d)),!0;if(a)try{var e=!!a.$goog_Thenable}catch(g){e=!1}else e=!1;if(e)return a.then(b,c,d),!0;if(A(a))try{var f=a.then;if("function"===typeof f)return Pe(a,f,b,c,d),!0}catch(g){return c.call(d,g),!0}return!1}
function Pe(a,b,c,d,e){function f(k){h||(h=!0,d.call(e,k))}
function g(k){h||(h=!0,c.call(e,k))}
var h=!1;try{b.call(a,g,f)}catch(k){f(k)}}
function Ne(a){a.l||(a.l=!0,Xc(a.o,a))}
function Ke(a){var b=null;a.g&&(b=a.g,a.g=b.next,b.next=null);a.g||(a.i=null);return b}
K.prototype.o=function(){for(var a;a=Ke(this);)Le(this,a,this.f,this.m);this.l=!1};
function Le(a,b,c,d){if(3==c&&b.onRejected&&!b.h)for(;a&&a.j;a=a.h)a.j=!1;if(b.f)b.f.h=null,Qe(b,c,d);else try{b.h?b.g.call(b.context):Qe(b,c,d)}catch(e){Re.call(null,e)}Qc(ze,b)}
function Qe(a,b,c){2==b?a.g.call(a.context,c):a.onRejected&&a.onRejected.call(a.context,c)}
function Oe(a,b){a.j=!0;Xc(function(){a.j&&Re.call(null,b)})}
var Re=Rc;function Ie(a){ab.call(this,a)}
C(Ie,ab);Ie.prototype.name="cancel";function M(a){Dc.call(this);this.m=1;this.j=[];this.l=0;this.f=[];this.g={};this.o=!!a}
C(M,Dc);p=M.prototype;p.subscribe=function(a,b,c){var d=this.g[a];d||(d=this.g[a]=[]);var e=this.m;this.f[e]=a;this.f[e+1]=b;this.f[e+2]=c;this.m=e+3;d.push(e);return e};
function Se(a,b,c){var d=Te;if(a=d.g[a]){var e=d.f;(a=db(a,function(f){return e[f+1]==b&&e[f+2]==c}))&&d.O(a)}}
p.O=function(a){var b=this.f[a];if(b){var c=this.g[b];0!=this.l?(this.j.push(a),this.f[a+1]=Pa):(c&&eb(c,a),delete this.f[a],delete this.f[a+1],delete this.f[a+2])}return!!b};
p.M=function(a,b){var c=this.g[a];if(c){for(var d=Array(arguments.length-1),e=1,f=arguments.length;e<f;e++)d[e-1]=arguments[e];if(this.o)for(e=0;e<c.length;e++){var g=c[e];Ue(this.f[g+1],this.f[g+2],d)}else{this.l++;try{for(e=0,f=c.length;e<f;e++)g=c[e],this.f[g+1].apply(this.f[g+2],d)}finally{if(this.l--,0<this.j.length&&0==this.l)for(;c=this.j.pop();)this.O(c)}}return 0!=e}return!1};
function Ue(a,b,c){Xc(function(){a.apply(b,c)})}
p.clear=function(a){if(a){var b=this.g[a];b&&(D(b,this.O,this),delete this.g[a])}else this.f.length=0,this.g={}};
p.H=function(){M.A.H.call(this);this.clear();this.j.length=0};function Ve(a){this.f=a}
Ve.prototype.set=function(a,b){void 0===b?this.f.remove(a):this.f.set(a,we(b))};
Ve.prototype.get=function(a){try{var b=this.f.get(a)}catch(c){return}if(null!==b)try{return JSON.parse(b)}catch(c){throw"Storage: Invalid value was encountered";}};
Ve.prototype.remove=function(a){this.f.remove(a)};function We(a){this.f=a}
C(We,Ve);function Xe(a){this.data=a}
function Ye(a){return void 0===a||a instanceof Xe?a:new Xe(a)}
We.prototype.set=function(a,b){We.A.set.call(this,a,Ye(b))};
We.prototype.g=function(a){a=We.A.get.call(this,a);if(void 0===a||a instanceof Object)return a;throw"Storage: Invalid value was encountered";};
We.prototype.get=function(a){if(a=this.g(a)){if(a=a.data,void 0===a)throw"Storage: Invalid value was encountered";}else a=void 0;return a};function Ze(a){this.f=a}
C(Ze,We);Ze.prototype.set=function(a,b,c){if(b=Ye(b)){if(c){if(c<Date.now()){Ze.prototype.remove.call(this,a);return}b.expiration=c}b.creation=Date.now()}Ze.A.set.call(this,a,b)};
Ze.prototype.g=function(a){var b=Ze.A.g.call(this,a);if(b){var c=b.creation,d=b.expiration;if(d&&d<Date.now()||c&&c>Date.now())Ze.prototype.remove.call(this,a);else return b}};function $e(){}
;function af(){}
C(af,$e);af.prototype.clear=function(){var a=Dd(this.B(!0)),b=this;D(a,function(c){b.remove(c)})};function bf(a){this.f=a}
C(bf,af);p=bf.prototype;p.isAvailable=function(){if(!this.f)return!1;try{return this.f.setItem("__sak","1"),this.f.removeItem("__sak"),!0}catch(a){return!1}};
p.set=function(a,b){try{this.f.setItem(a,b)}catch(c){if(0==this.f.length)throw"Storage mechanism: Storage disabled";throw"Storage mechanism: Quota exceeded";}};
p.get=function(a){a=this.f.getItem(a);if("string"!==typeof a&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
p.remove=function(a){this.f.removeItem(a)};
p.B=function(a){var b=0,c=this.f,d=new Ad;d.next=function(){if(b>=c.length)throw zd;var e=c.key(b++);if(a)return e;e=c.getItem(e);if("string"!==typeof e)throw"Storage mechanism: Invalid value was encountered";return e};
return d};
p.clear=function(){this.f.clear()};
p.key=function(a){return this.f.key(a)};function cf(){var a=null;try{a=window.localStorage||null}catch(b){}this.f=a}
C(cf,bf);function df(a,b){this.g=a;this.f=null;if(Kb&&!(9<=Number(dc))){ef||(ef=new Ed);this.f=ef.get(a);this.f||(b?this.f=document.getElementById(b):(this.f=document.createElement("userdata"),this.f.addBehavior("#default#userData"),document.body.appendChild(this.f)),ef.set(a,this.f));try{this.f.load(this.g)}catch(c){this.f=null}}}
C(df,af);var ff={".":".2E","!":".21","~":".7E","*":".2A","'":".27","(":".28",")":".29","%":"."},ef=null;function gf(a){return"_"+encodeURIComponent(a).replace(/[.!~*'()%]/g,function(b){return ff[b]})}
p=df.prototype;p.isAvailable=function(){return!!this.f};
p.set=function(a,b){this.f.setAttribute(gf(a),b);hf(this)};
p.get=function(a){a=this.f.getAttribute(gf(a));if("string"!==typeof a&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
p.remove=function(a){this.f.removeAttribute(gf(a));hf(this)};
p.B=function(a){var b=0,c=this.f.XMLDocument.documentElement.attributes,d=new Ad;d.next=function(){if(b>=c.length)throw zd;var e=c[b++];if(a)return decodeURIComponent(e.nodeName.replace(/\./g,"%")).substr(1);e=e.nodeValue;if("string"!==typeof e)throw"Storage mechanism: Invalid value was encountered";return e};
return d};
p.clear=function(){for(var a=this.f.XMLDocument.documentElement,b=a.attributes.length;0<b;b--)a.removeAttribute(a.attributes[b-1].nodeName);hf(this)};
function hf(a){try{a.f.save(a.g)}catch(b){throw"Storage mechanism: Quota exceeded";}}
;function jf(a,b){this.g=a;this.f=b+"::"}
C(jf,af);jf.prototype.set=function(a,b){this.g.set(this.f+a,b)};
jf.prototype.get=function(a){return this.g.get(this.f+a)};
jf.prototype.remove=function(a){this.g.remove(this.f+a)};
jf.prototype.B=function(a){var b=this.g.B(!0),c=this,d=new Ad;d.next=function(){for(var e=b.next();e.substr(0,c.f.length)!=c.f;)e=b.next();return a?e.substr(c.f.length):c.g.get(e)};
return d};var kf=window.yt&&window.yt.config_||window.ytcfg&&window.ytcfg.data_||{};B("yt.config_",kf);function lf(a){var b=arguments;1<b.length?kf[b[0]]=b[1]:1===b.length&&Object.assign(kf,b[0])}
function O(a,b){return a in kf?kf[a]:b}
;var mf=[];function nf(a){mf.forEach(function(b){return b(a)})}
function of(a){return a&&window.yterr?function(){try{return a.apply(this,arguments)}catch(b){pf(b),nf(b)}}:a}
function pf(a){var b=z("yt.logging.errors.log");b?b(a,"ERROR",void 0,void 0,void 0):(b=O("ERRORS",[]),b.push([a,"ERROR",void 0,void 0,void 0]),lf("ERRORS",b))}
function qf(a){var b=z("yt.logging.errors.log");b?b(a,"WARNING",void 0,void 0,void 0):(b=O("ERRORS",[]),b.push([a,"WARNING",void 0,void 0,void 0]),lf("ERRORS",b))}
;var rf=0;B("ytDomDomGetNextId",z("ytDomDomGetNextId")||function(){return++rf});var sf={stopImmediatePropagation:1,stopPropagation:1,preventMouseEvent:1,preventManipulation:1,preventDefault:1,layerX:1,layerY:1,screenX:1,screenY:1,scale:1,rotation:1,webkitMovementX:1,webkitMovementY:1};
function tf(a){this.type="";this.state=this.source=this.data=this.currentTarget=this.relatedTarget=this.target=null;this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.ctrlKey=this.altKey=!1;this.clientY=this.clientX=0;this.changedTouches=this.touches=null;try{if(a=a||window.event){this.event=a;for(var b in a)b in sf||(this[b]=a[b]);var c=a.target||a.srcElement;c&&3==c.nodeType&&(c=c.parentNode);this.target=c;var d=a.relatedTarget;if(d)try{d=d.nodeName?d:null}catch(e){d=null}else"mouseover"==
this.type?d=a.fromElement:"mouseout"==this.type&&(d=a.toElement);this.relatedTarget=d;this.clientX=void 0!=a.clientX?a.clientX:a.pageX;this.clientY=void 0!=a.clientY?a.clientY:a.pageY;this.keyCode=a.keyCode?a.keyCode:a.which;this.charCode=a.charCode||("keypress"==this.type?this.keyCode:0);this.altKey=a.altKey;this.ctrlKey=a.ctrlKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey}}catch(e){}}
tf.prototype.preventDefault=function(){this.event&&(this.event.returnValue=!1,this.event.preventDefault&&this.event.preventDefault())};
tf.prototype.stopPropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopPropagation&&this.event.stopPropagation())};
tf.prototype.stopImmediatePropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopImmediatePropagation&&this.event.stopImmediatePropagation())};var qb=y.ytEventsEventsListeners||{};B("ytEventsEventsListeners",qb);var uf=y.ytEventsEventsCounter||{count:0};B("ytEventsEventsCounter",uf);
function vf(a,b,c,d){d=void 0===d?{}:d;a.addEventListener&&("mouseenter"!=b||"onmouseenter"in document?"mouseleave"!=b||"onmouseenter"in document?"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"):b="mouseout":b="mouseover");return pb(function(e){var f="boolean"===typeof e[4]&&e[4]==!!d,g=A(e[4])&&A(d)&&rb(e[4],d);return!!e.length&&e[0]==a&&e[1]==b&&e[2]==c&&(f||g)})}
function wf(a){a&&("string"==typeof a&&(a=[a]),D(a,function(b){if(b in qb){var c=qb[b],d=c[0],e=c[1],f=c[3];c=c[4];d.removeEventListener?xf()||"boolean"===typeof c?d.removeEventListener(e,f,c):d.removeEventListener(e,f,!!c.capture):d.detachEvent&&d.detachEvent("on"+e,f);delete qb[b]}}))}
var xf=nb(function(){var a=!1;try{var b=Object.defineProperty({},"capture",{get:function(){a=!0}});
window.addEventListener("test",null,b)}catch(c){}return a});
function yf(a,b,c){var d=void 0===d?{}:d;if(a&&(a.addEventListener||a.attachEvent)){var e=vf(a,b,c,d);if(!e){e=++uf.count+"";var f=!("mouseenter"!=b&&"mouseleave"!=b||!a.addEventListener||"onmouseenter"in document);var g=f?function(h){h=new tf(h);if(!rc(h.relatedTarget,function(k){return k==a}))return h.currentTarget=a,h.type=b,c.call(a,h)}:function(h){h=new tf(h);
h.currentTarget=a;return c.call(a,h)};
g=of(g);a.addEventListener?("mouseenter"==b&&f?b="mouseover":"mouseleave"==b&&f?b="mouseout":"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"),xf()||"boolean"===typeof d?a.addEventListener(b,g,d):a.addEventListener(b,g,!!d.capture)):a.attachEvent("on"+b,g);qb[e]=[a,b,c,g,d]}}}
;function zf(a,b){"function"===typeof a&&(a=of(a));return window.setTimeout(a,b)}
function Af(a){"function"===typeof a&&(a=of(a));return window.setInterval(a,250)}
;function Bf(a){var b=[];ob(a,function(c,d){var e=encodeURIComponent(String(d)),f;Array.isArray(c)?f=c:f=[c];D(f,function(g){""==g?b.push(e):b.push(e+"="+encodeURIComponent(String(g)))})});
return b.join("&")}
function Cf(a){"?"==a.charAt(0)&&(a=a.substr(1));a=a.split("&");for(var b={},c=0,d=a.length;c<d;c++){var e=a[c].split("=");if(1==e.length&&e[0]||2==e.length)try{var f=decodeURIComponent((e[0]||"").replace(/\+/g," ")),g=decodeURIComponent((e[1]||"").replace(/\+/g," "));f in b?Array.isArray(b[f])?mb(b[f],g):b[f]=[b[f],g]:b[f]=g}catch(k){if("q"!=e[0]){var h=Error("Error decoding URL component");h.params={key:e[0],value:e[1]};pf(h)}}}return b}
function ig(a,b,c){var d=a.split("#",2);a=d[0];d=1<d.length?"#"+d[1]:"";var e=a.split("?",2);a=e[0];e=Cf(e[1]||"");for(var f in b)!c&&null!==e&&f in e||(e[f]=b[f]);b=a;a=wc(e);a?(c=b.indexOf("#"),0>c&&(c=b.length),f=b.indexOf("?"),0>f||f>c?(f=c,e=""):e=b.substring(f+1,c),b=[b.substr(0,f),e,b.substr(c)],c=b[1],b[1]=a?c?c+"&"+a:a:c,a=b[0]+(b[1]?"?"+b[1]:"")+b[2]):a=b;return a+d}
;var jg={};function kg(a){return jg[a]||(jg[a]=String(a).replace(/\-([a-z])/g,function(b,c){return c.toUpperCase()}))}
;var lg={},mg=[],Te=new M,ng={};function og(){for(var a=u(mg),b=a.next();!b.done;b=a.next())b=b.value,b()}
function pg(a,b){b||(b=document);var c=gb(b.getElementsByTagName("yt:"+a));var d="yt-"+a;var e=b||document;d=e.querySelectorAll&&e.querySelector?e.querySelectorAll("."+d):pc(d,b);d=gb(d);return fb(c,d)}
function P(a,b){var c;"yt:"==a.tagName.toLowerCase().substr(0,3)?c=a.getAttribute(b):c=a?a.dataset?a.dataset[kg(b)]:a.getAttribute("data-"+b):null;return c}
function qg(a,b){Te.M.apply(Te,arguments)}
;function rg(a){this.g=a||{};this.h=this.f=!1;a=document.getElementById("www-widgetapi-script");if(this.f=!!("https:"==document.location.protocol||a&&0==a.src.indexOf("https:"))){a=[this.g,window.YTConfig||{}];for(var b=0;b<a.length;b++)a[b].host&&(a[b].host=a[b].host.replace("http://","https://"))}}
function Q(a,b){for(var c=[a.g,window.YTConfig||{}],d=0;d<c.length;d++){var e=c[d][b];if(void 0!=e)return e}return null}
function sg(a,b,c){tg||(tg={},yf(window,"message",Xa(a.i,a)));tg[c]=b}
rg.prototype.i=function(a){if(a.origin==Q(this,"host")||a.origin==Q(this,"host").replace(/^http:/,"https:")){try{var b=JSON.parse(a.data)}catch(c){return}this.h=!0;this.f||0!=a.origin.indexOf("https:")||(this.f=!0);if(a=tg[b.id])a.o=!0,a.o&&(D(a.m,a.V,a),a.m.length=0),a.ea(b)}};
var tg=null;function R(a){a=ug(a);return"string"===typeof a&&"false"===a?!1:!!a}
function vg(a,b){var c=ug(a);return void 0===c&&void 0!==b?b:Number(c||0)}
function ug(a){var b=O("EXPERIMENTS_FORCED_FLAGS",{});return void 0!==b[a]?b[a]:O("EXPERIMENT_FLAGS",{})[a]}
;function wg(){}
function xg(a){var b=5E3;isNaN(b)&&(b=void 0);var c=z("yt.scheduler.instance.addJob");c?c(a,0,b):void 0===b?a():zf(a,b||0)}
;function yg(){}
qa(yg,wg);yg.prototype.start=function(){var a=z("yt.scheduler.instance.start");a&&a()};
yg.f=void 0;yg.g=function(){yg.f||(yg.f=new yg)};
yg.g();var zg=y.ytPubsubPubsubInstance||new M,Ag=y.ytPubsubPubsubSubscribedKeys||{},Bg=y.ytPubsubPubsubTopicToKeys||{},Cg=y.ytPubsubPubsubIsSynchronous||{};M.prototype.subscribe=M.prototype.subscribe;M.prototype.unsubscribeByKey=M.prototype.O;M.prototype.publish=M.prototype.M;M.prototype.clear=M.prototype.clear;B("ytPubsubPubsubInstance",zg);B("ytPubsubPubsubTopicToKeys",Bg);B("ytPubsubPubsubIsSynchronous",Cg);B("ytPubsubPubsubSubscribedKeys",Ag);var S=window,Dg=S.ytcsi&&S.ytcsi.now?S.ytcsi.now:S.performance&&S.performance.timing&&S.performance.now&&S.performance.timing.navigationStart?function(){return S.performance.timing.navigationStart+S.performance.now()}:function(){return(new Date).getTime()};var Eg=vg("initial_gel_batch_timeout",1E3),Fg=Math.pow(2,16)-1,Gg=null,Hg=0,Ig=void 0,Jg=0,Kg=0,Lg=0,Mg=!0,Ng=y.ytLoggingTransportGELQueue_||new Map;B("ytLoggingTransportGELQueue_",Ng);var Og=y.ytLoggingTransportTokensToCttTargetIds_||{};B("ytLoggingTransportTokensToCttTargetIds_",Og);function Pg(){return new K(function(a){window.clearTimeout(Jg);window.clearTimeout(Kg);Kg=0;Ig&&Ig.isReady()?(Qg(a),Ng.clear()):(Rg(),a())})}
function Rg(){R("web_gel_timeout_cap")&&!Kg&&(Kg=zf(Pg,6E4));window.clearTimeout(Jg);var a=O("LOGGING_BATCH_TIMEOUT",vg("web_gel_debounce_ms",1E4));R("shorten_initial_gel_batch_timeout")&&Mg&&(a=Eg);Jg=zf(Pg,a)}
function Qg(a){for(var b=Ig,c=Math.round(Dg()),d=Ng.size,e=u(Ng),f=e.next();!f.done;f=e.next()){var g=u(f.value);f=g.next().value;var h=g.next().value;g=sb({context:Sg(b.f||Tg())});g.events=h;(h=Og[f])&&Ug(g,f,h);delete Og[f];Vg(g,c);Wg(b,"log_event",g,{retry:!0,onSuccess:function(){d--;d||a();Hg=Math.round(Dg()-c)},
onError:function(){d--;d||a()}});
Mg=!1}}
function Vg(a,b){a.requestTimeMs=String(b);R("unsplit_gel_payloads_in_logs")&&(a.unsplitGelPayloadsInLogs=!0);var c=O("EVENT_ID",void 0);if(c){var d=O("BATCH_CLIENT_COUNTER",void 0)||0;!d&&R("web_client_counter_random_seed")&&(d=Math.floor(Math.random()*Fg/2));d++;d>Fg&&(d=1);lf("BATCH_CLIENT_COUNTER",d);c={serializedEventId:c,clientCounter:String(d)};a.serializedClientEventId=c;Gg&&Hg&&R("log_gel_rtt_web")&&(a.previousBatchInfo={serializedClientEventId:Gg,roundtripMs:String(Hg)});Gg=c;Hg=0}}
function Ug(a,b,c){if(c.videoId)var d="VIDEO";else if(c.playlistId)d="PLAYLIST";else return;a.credentialTransferTokenTargetId=c;a.context=a.context||{};a.context.user=a.context.user||{};a.context.user.credentialTransferTokens=[{token:b,scope:d}]}
;var Xg=y.ytLoggingGelSequenceIdObj_||{};B("ytLoggingGelSequenceIdObj_",Xg);function Yg(a){var b=Zg;a=void 0===a?z("yt.ads.biscotti.lastId_")||"":a;b=Object.assign($g(b),ah(b));b.ca_type="image";a&&(b.bid=a);return b}
function $g(a){var b={};b.dt=Hc;b.flash="0";a:{try{var c=a.f.top.location.href}catch(f){a=2;break a}a=c?c===a.g.location.href?0:1:2}b=(b.frm=a,b);b.u_tz=-(new Date).getTimezoneOffset();var d=void 0===d?H:d;try{var e=d.history.length}catch(f){e=0}b.u_his=e;b.u_java=!!H.navigator&&"unknown"!==typeof H.navigator.javaEnabled&&!!H.navigator.javaEnabled&&H.navigator.javaEnabled();H.screen&&(b.u_h=H.screen.height,b.u_w=H.screen.width,b.u_ah=H.screen.availHeight,b.u_aw=H.screen.availWidth,b.u_cd=H.screen.colorDepth);
H.navigator&&H.navigator.plugins&&(b.u_nplug=H.navigator.plugins.length);H.navigator&&H.navigator.mimeTypes&&(b.u_nmime=H.navigator.mimeTypes.length);return b}
function ah(a){var b=a.f;try{var c=b.screenX;var d=b.screenY}catch(n){}try{var e=b.outerWidth;var f=b.outerHeight}catch(n){}try{var g=b.innerWidth;var h=b.innerHeight}catch(n){}b=[b.screenLeft,b.screenTop,c,d,b.screen?b.screen.availWidth:void 0,b.screen?b.screen.availTop:void 0,e,f,g,h];c=a.f.top;try{var k=(c||window).document,l="CSS1Compat"==k.compatMode?k.documentElement:k.body;var m=(new oc(l.clientWidth,l.clientHeight)).round()}catch(n){m=new oc(-12245933,-12245933)}k=m;m={};l=new Nc;y.SVGElement&&
y.document.createElementNS&&l.set(0);c=Cc();c["allow-top-navigation-by-user-activation"]&&l.set(1);c["allow-popups-to-escape-sandbox"]&&l.set(2);y.crypto&&y.crypto.subtle&&l.set(3);y.TextDecoder&&y.TextEncoder&&l.set(4);l=Oc(l);m.bc=l;m.bih=k.height;m.biw=k.width;m.brdim=b.join();a=a.g;return m.vis={visible:1,hidden:2,prerender:3,preview:4,unloaded:5}[a.visibilityState||a.webkitVisibilityState||a.mozVisibilityState||""]||0,m.wgl=!!H.WebGLRenderingContext,m}
var Zg=new function(){var a=window.document;this.f=window;this.g=a};
B("yt.ads_.signals_.getAdSignalsString",function(a){return Bf(Yg(a))});var bh="XMLHttpRequest"in y?function(){return new XMLHttpRequest}:null;
function ch(){if(!bh)return null;var a=bh();return"open"in a?a:null}
;var dh={Authorization:"AUTHORIZATION","X-Goog-Visitor-Id":"SANDBOXED_VISITOR_ID","X-YouTube-Client-Name":"INNERTUBE_CONTEXT_CLIENT_NAME","X-YouTube-Client-Version":"INNERTUBE_CONTEXT_CLIENT_VERSION","X-YouTube-Device":"DEVICE","X-Youtube-Identity-Token":"ID_TOKEN","X-YouTube-Page-CL":"PAGE_CL","X-YouTube-Page-Label":"PAGE_BUILD_LABEL","X-YouTube-Variants-Checksum":"VARIANTS_CHECKSUM"},eh="app debugcss debugjs expflag force_ad_params force_viral_ad_response_params forced_experiments innertube_snapshots innertube_goldens internalcountrycode internalipoverride absolute_experiments conditional_experiments sbb sr_bns_address client_dev_root_url".split(" "),
fh=!1;
function gh(a,b){b=void 0===b?{}:b;if(!c)var c=window.location.href;var d=a.match(sc)[1]||null,e=I(a);d&&e?(d=c,c=a.match(sc),d=d.match(sc),c=c[3]==d[3]&&c[1]==d[1]&&c[4]==d[4]):c=e?I(c)==e&&(Number(c.match(sc)[4]||null)||null)==(Number(a.match(sc)[4]||null)||null):!0;d=R("web_ajax_ignore_global_headers_if_set");for(var f in dh)e=O(dh[f]),!e||!c&&I(a)||d&&void 0!==b[f]||(b[f]=e);if(c||!I(a))b["X-YouTube-Utc-Offset"]=String(-(new Date).getTimezoneOffset());(c||!I(a))&&(f="undefined"!=typeof Intl?(new Intl.DateTimeFormat).resolvedOptions().timeZone:
null)&&(b["X-YouTube-Time-Zone"]=f);if(c||!I(a))b["X-YouTube-Ad-Signals"]=Bf(Yg(void 0));return b}
function hh(a){var b=window.location.search,c=I(a),d=tc(a.match(sc)[5]||null);d=(c=c&&(c.endsWith("youtube.com")||c.endsWith("youtube-nocookie.com")))&&d&&d.startsWith("/api/");if(!c||d)return a;var e=Cf(b),f={};D(eh,function(g){e[g]&&(f[g]=e[g])});
return ig(a,f||{},!1)}
function ih(a,b){if(window.fetch&&"XML"!=b.format){var c={method:b.method||"GET",credentials:"same-origin"};b.headers&&(c.headers=b.headers);a=jh(a,b);var d=kh(a,b);d&&(c.body=d);b.withCredentials&&(c.credentials="include");var e=!1,f;fetch(a,c).then(function(g){if(!e){e=!0;f&&window.clearTimeout(f);var h=g.ok,k=function(l){l=l||{};var m=b.context||y;h?b.onSuccess&&b.onSuccess.call(m,l,g):b.onError&&b.onError.call(m,l,g);b.T&&b.T.call(m,l,g)};
"JSON"==(b.format||"JSON")&&(h||400<=g.status&&500>g.status)?g.json().then(k,function(){k(null)}):k(null)}});
b.ba&&0<b.timeout&&(f=zf(function(){e||(e=!0,window.clearTimeout(f),b.ba.call(b.context||y))},b.timeout))}else lh(a,b)}
function lh(a,b){var c=b.format||"JSON";a=jh(a,b);var d=kh(a,b),e=!1,f=mh(a,function(k){if(!e){e=!0;h&&window.clearTimeout(h);a:switch(k&&"status"in k?k.status:-1){case 200:case 201:case 202:case 203:case 204:case 205:case 206:case 304:var l=!0;break a;default:l=!1}var m=null,n=400<=k.status&&500>k.status,r=500<=k.status&&600>k.status;if(l||n||r)m=nh(a,c,k,b.La);if(l)a:if(k&&204==k.status)l=!0;else{switch(c){case "XML":l=0==parseInt(m&&m.return_code,10);break a;case "RAW":l=!0;break a}l=!!m}m=m||
{};n=b.context||y;l?b.onSuccess&&b.onSuccess.call(n,k,m):b.onError&&b.onError.call(n,k,m);b.T&&b.T.call(n,k,m)}},b.method,d,b.headers,b.responseType,b.withCredentials);
if(b.L&&0<b.timeout){var g=b.L;var h=zf(function(){e||(e=!0,f.abort(),window.clearTimeout(h),g.call(b.context||y,f))},b.timeout)}}
function jh(a,b){b.Pa&&(a=document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:"")+a);var c=O("XSRF_FIELD_NAME",void 0),d=b.ua;d&&(d[c]&&delete d[c],a=ig(a,d||{},!0));return a}
function kh(a,b){var c=O("XSRF_FIELD_NAME",void 0),d=O("XSRF_TOKEN",void 0),e=b.postBody||"",f=b.u,g=O("XSRF_FIELD_NAME",void 0),h;b.headers&&(h=b.headers["Content-Type"]);b.Oa||I(a)&&!b.withCredentials&&I(a)!=document.location.hostname||"POST"!=b.method||h&&"application/x-www-form-urlencoded"!=h||b.u&&b.u[g]||(f||(f={}),f[c]=d);f&&"string"===typeof e&&(e=Cf(e),ub(e,f),e=b.da&&"JSON"==b.da?JSON.stringify(e):wc(e));if(!(c=e)&&(c=f)){a:{for(var k in f){f=!1;break a}f=!0}c=!f}!fh&&c&&"POST"!=b.method&&
(fh=!0,pf(Error("AJAX request with postData should use POST")));return e}
function nh(a,b,c,d){var e=null;switch(b){case "JSON":try{var f=c.responseText}catch(g){throw d=Error("Error reading responseText"),d.params=a,qf(d),g;}a=c.getResponseHeader("Content-Type")||"";f&&0<=a.indexOf("json")&&(e=JSON.parse(f));break;case "XML":if(a=(a=c.responseXML)?oh(a):null)e={},D(a.getElementsByTagName("*"),function(g){e[g.tagName]=ph(g)})}d&&qh(e);
return e}
function qh(a){if(A(a))for(var b in a){var c;(c="html_content"==b)||(c=b.length-5,c=0<=c&&b.indexOf("_html",c)==c);if(c){c=b;var d=a[b];if(void 0===vb){var e=null;var f=y.trustedTypes;if(f&&f.createPolicy){try{e=f.createPolicy("goog#html",{createHTML:Za,createScript:Za,createScriptURL:Za})}catch(g){y.console&&y.console.error(g.message)}vb=e}else vb=e}(e=vb)&&e.createHTML(d);a[c]=new Hb}else qh(a[b])}}
function oh(a){return a?(a=("responseXML"in a?a.responseXML:a).getElementsByTagName("root"))&&0<a.length?a[0]:null:null}
function ph(a){var b="";D(a.childNodes,function(c){b+=c.nodeValue});
return b}
function mh(a,b,c,d,e,f,g){function h(){4==(k&&"readyState"in k?k.readyState:0)&&b&&of(b)(k)}
c=void 0===c?"GET":c;d=void 0===d?"":d;var k=ch();if(!k)return null;"onloadend"in k?k.addEventListener("loadend",h,!1):k.onreadystatechange=h;R("debug_forward_web_query_parameters")&&(a=hh(a));k.open(c,a,!0);f&&(k.responseType=f);g&&(k.withCredentials=!0);c="POST"==c&&(void 0===window.FormData||!(d instanceof FormData));if(e=gh(a,e))for(var l in e)k.setRequestHeader(l,e[l]),"content-type"==l.toLowerCase()&&(c=!1);c&&k.setRequestHeader("Content-Type","application/x-www-form-urlencoded");k.send(d);
return k}
;function rh(){for(var a={},b=u(Object.entries(Cf(O("DEVICE","")))),c=b.next();!c.done;c=b.next()){var d=u(c.value);c=d.next().value;d=d.next().value;"cbrand"===c?a.deviceMake=d:"cmodel"===c?a.deviceModel=d:"cbr"===c?a.browserName=d:"cbrver"===c?a.browserVersion=d:"cos"===c?a.osName=d:"cosver"===c?a.osVersion=d:"cplatform"===c&&(a.platform=d)}return a}
;function sh(){return"INNERTUBE_API_KEY"in kf&&"INNERTUBE_API_VERSION"in kf}
function Tg(){return{innertubeApiKey:O("INNERTUBE_API_KEY",void 0),innertubeApiVersion:O("INNERTUBE_API_VERSION",void 0),ma:O("INNERTUBE_CONTEXT_CLIENT_CONFIG_INFO"),na:O("INNERTUBE_CONTEXT_CLIENT_NAME","WEB"),innertubeContextClientVersion:O("INNERTUBE_CONTEXT_CLIENT_VERSION",void 0),pa:O("INNERTUBE_CONTEXT_HL",void 0),oa:O("INNERTUBE_CONTEXT_GL",void 0),qa:O("INNERTUBE_HOST_OVERRIDE",void 0)||"",sa:!!O("INNERTUBE_USE_THIRD_PARTY_AUTH",!1),ra:!!O("INNERTUBE_OMIT_API_KEY_WHEN_AUTH_HEADER_IS_PRESENT",
!1),appInstallData:O("SERIALIZED_CLIENT_CONFIG_DATA",void 0)}}
function Sg(a){var b={client:{hl:a.pa,gl:a.oa,clientName:a.na,clientVersion:a.innertubeContextClientVersion,configInfo:a.ma}},c=window.devicePixelRatio;c&&1!=c&&(b.client.screenDensityFloat=String(c));c=O("EXPERIMENTS_TOKEN","");""!==c&&(b.client.experimentsToken=c);c=[];var d=O("EXPERIMENTS_FORCED_FLAGS",{});for(e in d)c.push({key:e,value:String(d[e])});var e=O("EXPERIMENT_FLAGS",{});for(var f in e)f.startsWith("force_")&&void 0===d[f]&&c.push({key:f,value:String(e[f])});0<c.length&&(b.request={internalExperimentFlags:c});
a.appInstallData&&R("web_log_app_install_experiments")&&(b.client.configInfo=b.client.configInfo||{},b.client.configInfo.appInstallData=a.appInstallData);O("DELEGATED_SESSION_ID")&&!R("pageid_as_header_web")&&(b.user={onBehalfOfUser:O("DELEGATED_SESSION_ID")});b.client=Object.assign(b.client,rh());return b}
function th(a,b,c){c=void 0===c?{}:c;var d={"X-Goog-Visitor-Id":c.visitorData||O("VISITOR_DATA","")};if(b&&b.includes("www.youtube-nocookie.com"))return d;(b=c.Ia||O("AUTHORIZATION"))||(a?b="Bearer "+z("gapi.auth.getToken")().Ha:b=Mc([]));b&&(d.Authorization=b,d["X-Goog-AuthUser"]=O("SESSION_INDEX",0),R("pageid_as_header_web")&&(d["X-Goog-PageId"]=O("DELEGATED_SESSION_ID")));return d}
;function uh(a){a=Object.assign({},a);delete a.Authorization;var b=Mc();if(b){var c=new xd;c.update(O("INNERTUBE_API_KEY",void 0));c.update(b);b=c.digest();c=3;Qa(b);void 0===c&&(c=0);if(!hc){hc={};for(var d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),e=["+/=","+/","-_=","-_.","-_"],f=0;5>f;f++){var g=d.concat(e[f].split(""));gc[f]=g;for(var h=0;h<g.length;h++){var k=g[h];void 0===hc[k]&&(hc[k]=h)}}}c=gc[c];d=[];for(e=0;e<b.length;e+=3){var l=b[e],m=(f=e+1<b.length)?
b[e+1]:0;k=(g=e+2<b.length)?b[e+2]:0;h=l>>2;l=(l&3)<<4|m>>4;m=(m&15)<<2|k>>6;k&=63;g||(k=64,f||(m=64));d.push(c[h],c[l],c[m]||"",c[k]||"")}a.hash=d.join("")}return a}
;function vh(){var a=new cf;(a=a.isAvailable()?new jf(a,"yt.innertube"):null)||(a=new df("yt.innertube"),a=a.isAvailable()?a:null);this.f=a?new Ze(a):null;this.g=document.domain||window.location.hostname}
vh.prototype.set=function(a,b,c,d){c=c||31104E3;this.remove(a);if(this.f)try{this.f.set(a,b,Date.now()+1E3*c);return}catch(f){}var e="";if(d)try{e=escape(we(b))}catch(f){return}else e=escape(b);b=this.g;nc.set(""+a,e,{Y:c,path:"/",domain:void 0===b?"youtube.com":b,secure:!1})};
vh.prototype.get=function(a,b){var c=void 0,d=!this.f;if(!d)try{c=this.f.get(a)}catch(e){d=!0}if(d&&(c=nc.get(""+a,void 0))&&(c=unescape(c),b))try{c=JSON.parse(c)}catch(e){this.remove(a),c=void 0}return c};
vh.prototype.remove=function(a){this.f&&this.f.remove(a);var b=this.g;nc.remove(""+a,"/",void 0===b?"youtube.com":b)};var wh;function xh(){wh||(wh=new vh);return wh}
function yh(a,b,c,d){if(d)return null;d=xh().get("nextId",!0)||1;var e=xh().get("requests",!0)||{};e[d]={method:a,request:b,authState:uh(c),requestTime:Math.round(Dg())};xh().set("nextId",d+1,86400,!0);xh().set("requests",e,86400,!0);return d}
function zh(a){var b=xh().get("requests",!0)||{};delete b[a];xh().set("requests",b,86400,!0)}
function Ah(a){var b=xh().get("requests",!0);if(b){for(var c in b){var d=b[c];if(!(6E4>Math.round(Dg())-d.requestTime)){var e=d.authState,f=uh(th(!1));rb(e,f)&&(e=d.request,"requestTimeMs"in e&&(e.requestTimeMs=Math.round(Dg())),Wg(a,d.method,e,{}));delete b[c]}}xh().set("requests",b,86400,!0)}}
;new J;var Bh=ec||fc;function Ch(){var a=/WebKit\/([0-9]+)/.exec(F);return!!(a&&600<=parseInt(a[1],10))}
function Dh(){var a=/WebKit\/([0-9]+)/.exec(F);return!!(a&&602<=parseInt(a[1],10))}
;function Eh(a){if(!a)throw Error();throw a;}
function Fh(a){return a}
function U(a){var b=this;this.g=a;this.state={status:"PENDING"};this.f=[];this.onRejected=[];this.g(function(c){if("PENDING"===b.state.status){b.state={status:"FULFILLED",value:c};c=u(b.f);for(var d=c.next();!d.done;d=c.next())d=d.value,d()}},function(c){if("PENDING"===b.state.status){b.state={status:"REJECTED",
reason:c};c=u(b.onRejected);for(var d=c.next();!d.done;d=c.next())d=d.value,d()}})}
U.all=function(a){return new U(function(b,c){var d=[],e=a.length;0===e&&b(d);for(var f={D:0};f.D<a.length;f={D:f.D},++f.D)Gh(U.resolve(a[f.D]).then(function(g){return function(h){d[g.D]=h;e--;0===e&&b(d)}}(f)),function(g){c(g)})})};
U.resolve=function(a){return new U(function(b,c){a instanceof U?a.then(b,c):b(a)})};
U.reject=function(a){return new U(function(b,c){c(a)})};
U.prototype.then=function(a,b){var c=this,d=null!==a&&void 0!==a?a:Fh,e=null!==b&&void 0!==b?b:Eh;return new U(function(f,g){"PENDING"===c.state.status?(c.f.push(function(){Hh(c,c,d,f,g)}),c.onRejected.push(function(){Ih(c,c,e,f,g)})):"FULFILLED"===c.state.status?Hh(c,c,d,f,g):"REJECTED"===c.state.status&&Ih(c,c,e,f,g)})};
function Gh(a,b){a.then(void 0,b)}
function Hh(a,b,c,d,e){try{if("FULFILLED"!==a.state.status)throw Error("calling handleResolve before the promise is fulfilled.");var f=c(a.state.value);f instanceof U?Jh(a,b,f,d,e):d(f)}catch(g){e(g)}}
function Ih(a,b,c,d,e){try{if("REJECTED"!==a.state.status)throw Error("calling handleReject before the promise is rejected.");var f=c(a.state.reason);f instanceof U?Jh(a,b,f,d,e):d(f)}catch(g){e(g)}}
function Jh(a,b,c,d,e){b===c?e(new TypeError("Circular promise chain detected.")):c.then(function(f){f instanceof U?Jh(a,b,f,d,e):d(f)},function(f){e(f)})}
;function Kh(a,b,c){function d(){c(a.error);f()}
function e(){b(a.result);f()}
function f(){try{a.removeEventListener("success",e),a.removeEventListener("error",d)}catch(g){}}
a.addEventListener("success",e);a.addEventListener("error",d)}
function Lh(a){return new K(function(b,c){Kh(a,b,c)})}
function V(a){return new U(function(b,c){Kh(a,b,c)})}
;function Mh(a,b){return new U(function(c,d){function e(){var f=a?b(a):null;f?f.then(function(g){a=g;e()},d):c()}
e()})}
;function Nh(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];d=Error.call(this,a);this.message=d.message;"stack"in d&&(this.stack=d.stack);this.args=[].concat(c instanceof Array?c:ha(u(c)))}
qa(Nh,Error);var Oh=[];var Ph={},Qh=(Ph.AUTH_INVALID="No user identifier specified.",Ph.EXPLICIT_ABORT="Transaction was explicitly aborted.",Ph.IDB_NOT_SUPPORTED="IndexedDB is not supported.",Ph.MISSING_OBJECT_STORE="Object store not created.",Ph.UNKNOWN_ABORT="Transaction was aborted for unknown reasons.",Ph.QUOTA_EXCEEDED="The current transaction exceeded its quota limitations.",Ph.QUOTA_MAYBE_EXCEEDED="The current transaction may have failed because of exceeding quota limitations.",Ph);
function Rh(a,b,c){b=void 0===b?{}:b;c=void 0===c?Qh[a]:c;Nh.call(this,c,Object.assign({name:"YtIdbKnownError",isSw:void 0===self.document,isIframe:self!==self.top,type:a},b));this.type=a;this.message=c;Object.setPrototypeOf(this,Rh.prototype)}
qa(Rh,Nh);function Sh(a,b){Rh.call(this,"UNKNOWN_ABORT",{objectStoreNames:a.join(),dbName:b});Object.setPrototypeOf(this,Sh.prototype)}
qa(Sh,Rh);function Th(a,b){this.f=a;this.options=b}
p=Th.prototype;p.add=function(a,b,c){return Uh(this,[a],"readwrite",function(d){return Vh(d,a).add(b,c)})};
p.clear=function(a){return Uh(this,[a],"readwrite",function(b){return Vh(b,a).clear()})};
p.close=function(){var a;this.f.close();(null===(a=this.options)||void 0===a?0:a.closed)&&this.options.closed()};
p.count=function(a,b){return Uh(this,[a],"readonly",function(c){return Vh(c,a).count(b)})};
p["delete"]=function(a,b){return Uh(this,[a],"readwrite",function(c){return Vh(c,a)["delete"](b)})};
p.get=function(a,b){return Uh(this,[a],"readwrite",function(c){return Vh(c,a).get(b)})};
function Uh(a,b,c,d){a=a.f.transaction(b,void 0===c?"readonly":c);a=new Wh(a);return Xh(a,d)}
function Yh(a){this.f=a}
p=Yh.prototype;p.add=function(a,b){return V(this.f.add(a,b))};
p.clear=function(){return V(this.f.clear()).then(function(){})};
p.count=function(a){return V(this.f.count(a))};
function Zh(a,b){return $h(a,{query:b},function(c){return c["delete"]().then(function(){c.f["continue"](void 0);return ai(c.request)})}).then(function(){})}
p["delete"]=function(a){return a instanceof IDBKeyRange?Zh(this,a):V(this.f["delete"](a))};
p.get=function(a){return V(this.f.get(a))};
p.index=function(a){return new bi(this.f.index(a))};
p.getName=function(){return this.f.name};
function $h(a,b,c){a=a.f.openCursor(b.query,b.direction);return ai(a).then(function(d){return Mh(d,c)})}
function Wh(a){var b=this;this.f=a;this.g=new Map;this.aborted=!1;this.done=new K(function(c,d){b.f.addEventListener("complete",function(){c()});
b.f.addEventListener("error",function(e){e.currentTarget===e.target&&d(b.f.error)});
b.f.addEventListener("abort",function(){var e=b.f.error;if(e){var f;"QuotaExceededError"===e.name?f=new Rh("QUOTA_EXCEEDED"):"UnknownError"===e.name&&(f=new Rh("QUOTA_MAYBE_EXCEEDED"));f&&(qf(f),Oh.push({type:"EVENT",eventType:"QUOTA_EXCEEDED",payload:void 0}),10<Oh.length&&Oh.shift());d(e)}else if(!b.aborted){e=Sh;f=b.f.objectStoreNames;for(var g=[],h=0;h<f.length;h++){var k=f.item(h);if(null===k)throw Error("Invariant: item in DOMStringList is null");g.push(k)}e=new e(g,b.f.db.name);qf(e);d(e)}})})}
function Xh(a,b){var c=new K(function(d,e){Gh(b(a).then(function(f){a.commit();d(f)}),e)});
return Ee([c,a.done]).then(function(d){return u(d).next().value})}
Wh.prototype.abort=function(){this.f.abort();this.aborted=!0;var a=new Rh("EXPLICIT_ABORT");a.sampleWeight=0;throw a;};
Wh.prototype.commit=function(){var a=this.f;a.commit&&!this.aborted&&a.commit()};
function Vh(a,b){var c=a.f.objectStore(b),d=a.g.get(c);d||(d=new Yh(c),a.g.set(c,d));return d}
function bi(a){this.f=a}
bi.prototype.count=function(a){return V(this.f.count(a))};
bi.prototype.get=function(a){return V(this.f.get(a))};
function ci(a,b){this.request=a;this.f=b}
function ai(a){return V(a).then(function(b){return null===b?null:new ci(a,b)})}
ci.prototype["delete"]=function(){return V(this.f["delete"]()).then(function(){})};
ci.prototype.update=function(a){return V(this.f.update(a))};function He(a){function b(){m||(m=new c(e.result,{closed:l}));return m}
var c=Th,d=Wh,e=self.indexedDB.open("yt-idb-test-do-not-use",void 0),f=a.blocked,g=a.blocking,h=a.Sa,k=a.upgrade,l=a.closed,m;k&&e.addEventListener("upgradeneeded",function(n){if(null===n.newVersion)throw Error("Invariant: newVersion on IDbVersionChangeEvent is null");if(null===e.transaction)throw Error("Invariant: transaction on IDbOpenDbRequest is null");var r=b(),q=new d(e.transaction);k(r,n.oldVersion,n.newVersion,q)});
f&&e.addEventListener("blocked",function(){f()});
return Lh(e).then(function(n){g&&n.addEventListener("versionchange",function(){g(b())});
h&&n.addEventListener("close",function(){h()});
return b()})}
;var di,ei,fi=["getAll","getAllKeys","getKey","openKeyCursor"],gi=["getAll","getAllKeys","getKey","openKeyCursor"];function hi(){return $a(this,function b(){var c,d;return Ia(b,function(e){switch(e.g){case 1:if(Bh&&Ch()&&!Dh()&&!R("ytidb_allow_on_ios_safari_v8_and_v9")||Lb)return e["return"](!1);try{if(c=self,!(c.indexedDB&&c.IDBIndex&&c.IDBKeyRange&&c.IDBObjectStore))return e["return"](!1)}catch(f){return e["return"](!1)}va(e);return ua(e,Ge(function(){}));
case 5:if(d=e.o,!d)return e["return"](!1);case 3:xa(e);if(d)try{d.close()}catch(f){}ya(e);break;case 2:return wa(e),e["return"](!1);case 4:return e["return"](!0)}})})}
function ii(){return void 0!==di?Be(di):new K(function(a){hi().then(function(b){di=b;a(b)})})}
function ji(){return void 0!==ei?Be(ei):ii().then(function(a){if(!a)return!1;var b=u(fi);for(a=b.next();!a.done;a=b.next())if(!IDBObjectStore.prototype[a.value])return!1;b=u(gi);for(a=b.next();!a.done;a=b.next())if(!IDBIndex.prototype[a.value])return!1;return IDBObjectStore.prototype.getKey?!0:!1}).then(function(a){return ei=a})}
;function ki(){J.call(this);this.g=li();mi(this);ni(this)}
qa(ki,J);function li(){var a=window.navigator.onLine;return void 0===a?!0:a}
function ni(a){window.addEventListener("online",function(){a.g=!0;a.o&&a.o()})}
function mi(a){window.addEventListener("offline",function(){a.g=!1;a.m&&a.m()})}
;function oi(a,b){b=void 0===b?{}:b;pi(a,b)}
function pi(a,b){b=void 0===b?{}:b;qi().then(function(){ki.f||(ki.f=new ki);ki.f.g!==li()&&pf(Error("NetworkStatusManager isOnline does not match window status"));lh(a,b)})}
function qi(){return $a(this,function b(){return Ia(b,function(c){return R("networkless_logging")?(2===vg("networkless_ytidb_version")&&ji().then(function(d){return d}),c["return"](ii())):c["return"](!1)})})}
;function ri(a){var b=this;this.f=null;a?this.f=a:sh()&&(this.f=Tg());xg(function(){Ah(b)})}
ri.prototype.isReady=function(){!this.f&&sh()&&(this.f=Tg());return!!this.f};
function Wg(a,b,c,d){!O("VISITOR_DATA")&&"visitor_id"!==b&&.01>Math.random()&&qf(new Nh("Missing VISITOR_DATA when sending innertube request.",b,c,d));if(!a.isReady()){var e=new Nh("innertube xhrclient not ready",b,c,d);pf(e);e.sampleWeight=0;throw e;}var f={headers:{"Content-Type":"application/json"},method:"POST",u:c,da:"JSON",L:function(){d.L()},
ba:d.L,onSuccess:function(n,r){if(d.onSuccess)d.onSuccess(r)},
aa:function(n){if(d.onSuccess)d.onSuccess(n)},
onError:function(n,r){if(d.onError)d.onError(r)},
Qa:function(n){if(d.onError)d.onError(n)},
timeout:d.timeout,withCredentials:!0},g="";(e=a.f.qa)&&(g=e);var h=a.f.sa||!1,k=th(h,g,d);Object.assign(f.headers,k);f.headers.Authorization&&!g&&(f.headers["x-origin"]=window.location.origin);e="/youtubei/"+a.f.innertubeApiVersion+"/"+b;var l={alt:"json"};a.f.ra&&f.headers.Authorization||(l.key=a.f.innertubeApiKey);var m=ig(""+g+e,l||{},!0);qi().then(function(n){if(d.retry&&R("retry_web_logging_batches")&&"www.youtube-nocookie.com"!=g){if(R("networkless_gel")&&!n||!R("networkless_gel"))var r=yh(b,
c,k,h);if(r){var q=f.onSuccess,v=f.aa;f.onSuccess=function(w,E){zh(r);q(w,E)};
c.aa=function(w,E){zh(r);v(w,E)}}}try{R("use_fetch_for_op_xhr")?ih(m,f):R("networkless_gel")&&d.retry?(f.method="POST",oi(m,f)):(f.method="POST",f.u||(f.u={}),lh(m,f))}catch(w){if("InvalidAccessError"==w.name)r&&(zh(r),r=0),qf(Error("An extension is blocking network request."));
else throw w;}r&&xg(function(){Ah(a)})})}
;var si=[{Z:function(a){return"Cannot read property '"+a.key+"'"},
U:{TypeError:[{regexp:/Cannot read property '([^']+)' of (null|undefined)/,groups:["key","value"]},{regexp:/\u65e0\u6cd5\u83b7\u53d6\u672a\u5b9a\u4e49\u6216 (null|undefined) \u5f15\u7528\u7684\u5c5e\u6027\u201c([^\u201d]+)\u201d/,groups:["value","key"]},{regexp:/\uc815\uc758\ub418\uc9c0 \uc54a\uc74c \ub610\ub294 (null|undefined) \ucc38\uc870\uc778 '([^']+)' \uc18d\uc131\uc744 \uac00\uc838\uc62c \uc218 \uc5c6\uc2b5\ub2c8\ub2e4./,groups:["value","key"]},{regexp:/No se puede obtener la propiedad '([^']+)' de referencia nula o sin definir/,
groups:["key"]},{regexp:/Unable to get property '([^']+)' of (undefined or null) reference/,groups:["key","value"]}],Error:[{regexp:/(Permission denied) to access property "([^']+)"/,groups:["reason","key"]}]}},{Z:function(a){return"Cannot call '"+a.key+"'"},
U:{TypeError:[{regexp:/(?:([^ ]+)?\.)?([^ ]+) is not a function/,groups:["base","key"]},{regexp:/([^ ]+) called on (null or undefined)/,groups:["key","value"]},{regexp:/Object (.*) has no method '([^ ]+)'/,groups:["base","key"]},{regexp:/Object doesn't support property or method '([^ ]+)'/,groups:["key"]},{regexp:/\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u306f '([^']+)' \u30d7\u30ed\u30d1\u30c6\u30a3\u307e\u305f\u306f\u30e1\u30bd\u30c3\u30c9\u3092\u30b5\u30dd\u30fc\u30c8\u3057\u3066\u3044\u307e\u305b\u3093/,
groups:["key"]},{regexp:/\uac1c\uccb4\uac00 '([^']+)' \uc18d\uc131\uc774\ub098 \uba54\uc11c\ub4dc\ub97c \uc9c0\uc6d0\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4./,groups:["key"]}]}}];function ti(){this.f=[];this.g=[]}
var ui;var vi=new M;var wi=new Set,xi=0,yi=["PhantomJS","Googlebot","TO STOP THIS SECURITY SCAN go/scan"];function zi(a,b,c,d){c+="."+a;a=String(JSON.stringify(b)).substr(0,500);d[c]=a;return c.length+a.length}
;function W(a,b,c){this.l=this.f=this.g=null;this.j=Ra(this);this.h=0;this.o=!1;this.m=[];this.i=null;this.v=c;this.G={};c=document;if(a="string"===typeof a?c.getElementById(a):a)if(c="iframe"==a.tagName.toLowerCase(),b.host||(b.host=c?uc(a.src):"https://www.youtube.com"),this.g=new rg(b),c||(b=Ai(this,a),this.l=a,(c=a.parentNode)&&c.replaceChild(b,a),a=b),this.f=a,this.f.id||(this.f.id="widget"+Ra(this.f)),lg[this.f.id]=this,window.postMessage){this.i=new M;Bi(this);b=Q(this.g,"events");for(var d in b)b.hasOwnProperty(d)&&
this.addEventListener(d,b[d]);for(var e in ng)Ci(this,e)}}
p=W.prototype;p.setSize=function(a,b){this.f.width=a;this.f.height=b;return this};
p.ta=function(){return this.f};
p.ea=function(a){this.N(a.event,a)};
p.addEventListener=function(a,b){var c=b;"string"==typeof b&&(c=function(){window[b].apply(window,arguments)});
if(!c)return this;this.i.subscribe(a,c);Di(this,a);return this};
function Ci(a,b){var c=b.split(".");if(2==c.length){var d=c[1];a.v==c[0]&&Di(a,d)}}
p.destroy=function(){this.f.id&&(lg[this.f.id]=null);var a=this.i;a&&"function"==typeof a.dispose&&a.dispose();if(this.l){a=this.f;var b=a.parentNode;b&&b.replaceChild(this.l,a)}else(a=this.f)&&a.parentNode&&a.parentNode.removeChild(a);tg&&(tg[this.j]=null);this.g=null;a=this.f;for(var c in qb)qb[c][0]==a&&wf(c);this.l=this.f=null};
p.P=function(){return{}};
function Ei(a,b,c){c=c||[];c=Array.prototype.slice.call(c);b={event:"command",func:b,args:c};a.o?a.V(b):a.m.push(b)}
p.N=function(a,b){if(!this.i.h){var c={target:this,data:b};this.i.M(a,c);qg(this.v+"."+a,c)}};
function Ai(a,b){for(var c=document.createElement("iframe"),d=b.attributes,e=0,f=d.length;e<f;e++){var g=d[e].value;null!=g&&""!=g&&"null"!=g&&c.setAttribute(d[e].name,g)}c.setAttribute("frameBorder",0);c.setAttribute("allowfullscreen",1);c.setAttribute("allow","accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");c.setAttribute("title","YouTube "+Q(a.g,"title"));(d=Q(a.g,"width"))&&c.setAttribute("width",d);(d=Q(a.g,"height"))&&c.setAttribute("height",d);var h=
a.P();h.enablejsapi=window.postMessage?1:0;window.location.host&&(h.origin=window.location.protocol+"//"+window.location.host);h.widgetid=a.j;window.location.href&&D(["debugjs","debugcss"],function(k){var l=window.location.href;var m=l.search(xc);b:{var n=0;for(var r=k.length;0<=(n=l.indexOf(k,n))&&n<m;){var q=l.charCodeAt(n-1);if(38==q||63==q)if(q=l.charCodeAt(n+r),!q||61==q||38==q||35==q)break b;n+=r+1}n=-1}if(0>n)l=null;else{r=l.indexOf("&",n);if(0>r||r>m)r=m;n+=k.length+1;l=decodeURIComponent(l.substr(n,
r-n).replace(/\+/g," "))}null!==l&&(h[k]=l)});
c.src=Q(a.g,"host")+a.R()+"?"+wc(h);return c}
p.ca=function(){this.f&&this.f.contentWindow?this.V({event:"listening"}):window.clearInterval(this.h)};
function Bi(a){sg(a.g,a,a.j);a.h=Af(Xa(a.ca,a));yf(a.f,"load",Xa(function(){window.clearInterval(this.h);this.h=Af(Xa(this.ca,this))},a))}
function Di(a,b){a.G[b]||(a.G[b]=!0,Ei(a,"addEventListener",[b]))}
p.V=function(a){a.id=this.j;a.channel="widget";var b=we(a),c=this.g,d=uc(this.f.src||"");var e=0==d.indexOf("https:")?[d]:c.f?[d.replace("http:","https:")]:c.h?[d]:[d,d.replace("http:","https:")];if(this.f.contentWindow)for(var f=0;f<e.length;f++)try{this.f.contentWindow.postMessage(b,e[f])}catch(Ka){if(Ka.name&&"SyntaxError"==Ka.name){if(!(Ka.message&&0<Ka.message.indexOf("target origin ''"))){var g=void 0,h=void 0,k=Ka;h=void 0===h?{}:h;h.name=O("INNERTUBE_CONTEXT_CLIENT_NAME",1);h.version=O("INNERTUBE_CONTEXT_CLIENT_VERSION",
void 0);var l=h||{},m="WARNING";m=void 0===m?"ERROR":m;g=void 0===g?!1:g;if(k){if(R("console_log_js_exceptions")){var n=k,r=[];r.push("Name: "+n.name);r.push("Message: "+n.message);n.hasOwnProperty("params")&&r.push("Error Params: "+JSON.stringify(n.params));r.push("File name: "+n.fileName);r.push("Stacktrace: "+n.stack);window.console.log(r.join("\n"),n)}if((window&&window.yterr||g)&&!(5<=xi)&&0!==k.sampleWeight){var q=void 0,v=k,w=l,E=ic(v),Sa=E.message||"Unknown Error",fa=E.name||"UnknownError",
Da=E.lineNumber||"Not available",Ki=E.fileName||"Not available",Li=E.stack||v.f||"Not available";if(v.hasOwnProperty("args")&&v.args&&v.args.length)for(var na=0,Sb=0;Sb<v.args.length;Sb++){var N=v.args[Sb],za="params."+Sb;na+=za.length;if(N)if(Array.isArray(N)){for(var Mi=w,cd=na,hb=0;hb<N.length&&!(N[hb]&&(cd+=zi(hb,N[hb],za,Mi),500<cd));hb++);na=cd}else if("object"===typeof N){var Tb=void 0,Ni=w,dd=na;for(Tb in N)if(N[Tb]&&(dd+=zi(Tb,N[Tb],za,Ni),500<dd))break;na=dd}else w[za]=String(JSON.stringify(N)).substring(0,
500),na+=w[za].length;else w[za]=String(JSON.stringify(N)).substring(0,500),na+=w[za].length;if(500<=na)break}else if(v.hasOwnProperty("params")&&v.params){var Ub=v.params;if("object"===typeof v.params){var Df=0;for(q in Ub)if(Ub[q]){var Ef="params."+q,Ff=String(JSON.stringify(Ub[q])).substr(0,500);w[Ef]=Ff;Df+=Ef.length+Ff.length;if(500<Df)break}}else w.params=String(JSON.stringify(Ub)).substr(0,500)}navigator.vendor&&!w.hasOwnProperty("vendor")&&(w.vendor=navigator.vendor);var ed={message:Sa,name:fa,
lineNumber:Da,fileName:Ki,stack:Li,params:w},Gf=Number(v.columnNumber);isNaN(Gf)||(ed.lineNumber=ed.lineNumber+":"+Gf);for(var Y,Aa=ed,Hf=u(si),fd=Hf.next();!fd.done;fd=Hf.next()){var gd=fd.value;if(gd.U[Aa.name])for(var If=u(gd.U[Aa.name]),hd=If.next();!hd.done;hd=If.next()){var Jf=hd.value,Vb=Aa.message.match(Jf.regexp);if(Vb){Aa.params["error.original"]=Vb[0];for(var id=Jf.groups,Kf={},La=0;La<id.length;La++)Kf[id[La]]=Vb[La+1],Aa.params["error."+id[La]]=Vb[La+1];Aa.message=gd.Z(Kf);break}}}Y=
Aa;window.yterr&&"function"===typeof window.yterr&&window.yterr(Y);if(!(wi.has(Y.message)||0<=Y.stack.indexOf("/YouTubeCenter.js")||0<=Y.stack.indexOf("/mytube.js"))){vi.M("handleError",Y);if(R("kevlar_gel_error_routing")){var Wb=void 0,Lf=m,L=Y;a:{for(var Mf=u(yi),jd=Mf.next();!jd.done;jd=Mf.next()){var Nf=F;if(Nf&&0<=Nf.toLowerCase().indexOf(jd.value.toLowerCase())){var Of=!0;break a}}Of=!1}if(!Of){var ib={stackTrace:L.stack};L.fileName&&(ib.filename=L.fileName);var Z=L.lineNumber&&L.lineNumber.split?
L.lineNumber.split(":"):[];0!==Z.length&&(1!==Z.length||isNaN(Number(Z[0]))?2!==Z.length||isNaN(Number(Z[0]))||isNaN(Number(Z[1]))||(ib.lineNumber=Number(Z[0]),ib.columnNumber=Number(Z[1])):ib.lineNumber=Number(Z[0]));var Oi=L.message,Pi=L.name;ui||(ui=new ti);var Pf=ui;a:{for(var Qf=u(Pf.g),kd=Qf.next();!kd.done;kd=Qf.next()){var Rf=kd.value;if(L.message&&L.message.match(Rf.f)){var ld=Rf.weight;break a}}for(var Sf=u(Pf.f),md=Sf.next();!md.done;md=Sf.next()){var Tf=md.value;if(Tf.f(L)){ld=Tf.weight;
break a}}ld=1}var nd={level:"ERROR_LEVEL_UNKNOWN",message:Oi,errorClassName:Pi,sampleWeight:ld};"ERROR"===Lf?nd.level="ERROR_LEVEL_ERROR":"WARNING"===Lf&&(nd.level="ERROR_LEVEL_WARNNING");var Qi={isObfuscated:!0,browserStackInfo:ib},Ma={pageUrl:window.location.href};O("FEXP_EXPERIMENTS")&&(Ma.experimentIds=O("FEXP_EXPERIMENTS"));Ma.kvPairs=[];var od=L.params;if(od)for(var Uf=u(Object.keys(od)),pd=Uf.next();!pd.done;pd=Uf.next()){var Vf=pd.value;Ma.kvPairs.push({key:"client."+Vf,value:String(od[Vf])})}var Wf=
O("SERVER_NAME",void 0),Xf=O("SERVER_VERSION",void 0);Wf&&Xf&&(Ma.kvPairs.push({key:"server.name",value:Wf}),Ma.kvPairs.push({key:"server.version",value:Xf}));var Ri={errorMetadata:Ma,stackTrace:Qi,logMessage:nd};Wb=void 0===Wb?{}:Wb;var Yf=ri;O("ytLoggingEventsDefaultDisabled",!1)&&ri==ri&&(Yf=null);var Si=Yf,T=Wb;T=void 0===T?{}:T;var jb={};jb.eventTimeMs=Math.round(T.timestamp||Dg());jb.clientError=Ri;var Ti=String;if(T.timestamp)var Zf=-1;else{var $f=z("_lact",window);Zf=null==$f?-1:Math.max(Date.now()-
$f,0)}jb.context={lastActivityMs:Ti(Zf)};if(R("log_sequence_info_on_gel_web")&&T.fa){var Ui=jb.context,kb=T.fa;Xg[kb]=kb in Xg?Xg[kb]+1:0;Ui.sequence={index:Xg[kb],groupKey:kb};T.Na&&delete Xg[T.fa]}var Vi=jb,Xb=T.Ma,ag=Si,qd="";if(Xb){var Yb=Xb,rd={};Yb.videoId?rd.videoId=Yb.videoId:Yb.playlistId&&(rd.playlistId=Yb.playlistId);Og[Xb.token]=rd;qd=Xb.token}var sd=Ng.get(qd)||[];Ng.set(qd,sd);sd.push(Vi);ag&&(Ig=new ag);var Wi=vg("web_logging_max_batch")||100,bg=Dg();sd.length>=Wi?Pg():10<=bg-Lg&&(Rg(),
Lg=bg);Pg()}}if(!R("suppress_error_204_logging")){var td,Ba=Y,lb=Ba.params||{},oa={ua:{a:"logerror",t:"jserror",type:Ba.name,msg:Ba.message.substr(0,250),line:Ba.lineNumber,level:m,"client.name":lb.name},u:{url:O("PAGE_NAME",window.location.href),file:Ba.fileName},method:"POST"};lb.version&&(oa["client.version"]=lb.version);if(oa.u){Ba.stack&&(oa.u.stack=Ba.stack);for(var cg=u(Object.keys(lb)),ud=cg.next();!ud.done;ud=cg.next()){var dg=ud.value;oa.u["client."+dg]=lb[dg]}if(td=O("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS",
void 0))for(var eg=u(Object.keys(td)),vd=eg.next();!vd.done;vd=eg.next()){var fg=vd.value;oa.u[fg]=td[fg]}var gg=O("SERVER_NAME",void 0),hg=O("SERVER_VERSION",void 0);gg&&hg&&(oa.u["server.name"]=gg,oa.u["server.version"]=hg)}lh(O("ECATCHER_REPORT_HOST","")+"/error_204",oa)}wi.add(Y.message);xi++}}}}}else throw Ka;}else console&&console.warn&&console.warn("The YouTube player is not attached to the DOM. API calls should be made after the onReady event. See more: https://developers.google.com/youtube/iframe_api_reference#Events")};function Fi(a){return(0===a.search("cue")||0===a.search("load"))&&"loadModule"!==a}
function Gi(a){return 0===a.search("get")||0===a.search("is")}
;function X(a,b){if(!a)throw Error("YouTube player element ID required.");var c={title:"video player",videoId:"",width:640,height:360};if(b)for(var d in b)c[d]=b[d];W.call(this,a,c,"player");this.C={};this.playerInfo={}}
qa(X,W);p=X.prototype;p.R=function(){return"/embed/"+Q(this.g,"videoId")};
p.P=function(){var a=Q(this.g,"playerVars");if(a){var b={},c;for(c in a)b[c]=a[c];a=b}else a={};window!=window.top&&document.referrer&&(a.widget_referrer=document.referrer.substring(0,256));if(c=Q(this.g,"embedConfig")){if(A(c))try{c=JSON.stringify(c)}catch(d){console.error("Invalid embed config JSON",d)}a.embed_config=c}return a};
p.ea=function(a){var b=a.event;a=a.info;switch(b){case "apiInfoDelivery":if(A(a))for(var c in a)this.C[c]=a[c];break;case "infoDelivery":Hi(this,a);break;case "initialDelivery":window.clearInterval(this.h);this.playerInfo={};this.C={};Ii(this,a.apiInterface);Hi(this,a);break;default:this.N(b,a)}};
function Hi(a,b){if(A(b))for(var c in b)a.playerInfo[c]=b[c]}
function Ii(a,b){D(b,function(c){this[c]||("getCurrentTime"==c?this[c]=function(){var d=this.playerInfo.currentTime;if(1==this.playerInfo.playerState){var e=(Date.now()/1E3-this.playerInfo.currentTimeLastUpdated_)*this.playerInfo.playbackRate;0<e&&(d+=Math.min(e,1))}return d}:Fi(c)?this[c]=function(){this.playerInfo={};
this.C={};Ei(this,c,arguments);return this}:Gi(c)?this[c]=function(){var d=0;
0===c.search("get")?d=3:0===c.search("is")&&(d=2);return this.playerInfo[c.charAt(d).toLowerCase()+c.substr(d+1)]}:this[c]=function(){Ei(this,c,arguments);
return this})},a)}
p.getVideoEmbedCode=function(){var a=parseInt(Q(this.g,"width"),10),b=parseInt(Q(this.g,"height"),10),c=Q(this.g,"host")+this.R();Db.test(c)&&(-1!=c.indexOf("&")&&(c=c.replace(xb,"&amp;")),-1!=c.indexOf("<")&&(c=c.replace(yb,"&lt;")),-1!=c.indexOf(">")&&(c=c.replace(zb,"&gt;")),-1!=c.indexOf('"')&&(c=c.replace(Ab,"&quot;")),-1!=c.indexOf("'")&&(c=c.replace(Bb,"&#39;")),-1!=c.indexOf("\x00")&&(c=c.replace(Cb,"&#0;")));return'<iframe width="'+a+'" height="'+b+'" src="'+c+'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'};
p.getOptions=function(a){return this.C.namespaces?a?this.C[a].options||[]:this.C.namespaces||[]:[]};
p.getOption=function(a,b){if(this.C.namespaces&&a&&b)return this.C[a][b]};
function Ji(a){if("iframe"!=a.tagName.toLowerCase()){var b=P(a,"videoid");b&&(b={videoId:b,width:P(a,"width"),height:P(a,"height")},new X(a,b))}}
;function Xi(a,b){var c={title:"Thumbnail",videoId:"",width:120,height:68};if(b)for(var d in b)c[d]=b[d];W.call(this,a,c,"thumbnail")}
qa(Xi,W);Xi.prototype.R=function(){return"/embed/"+Q(this.g,"videoId")};
Xi.prototype.P=function(){return{player:0,thumb_width:Q(this.g,"thumbWidth"),thumb_height:Q(this.g,"thumbHeight"),thumb_align:Q(this.g,"thumbAlign")}};
Xi.prototype.N=function(a,b){W.prototype.N.call(this,a,b?b.info:void 0)};
function Yi(a){if("iframe"!=a.tagName.toLowerCase()){var b=P(a,"videoid");if(b){b={videoId:b,events:{},width:P(a,"width"),height:P(a,"height"),thumbWidth:P(a,"thumb-width"),thumbHeight:P(a,"thumb-height"),thumbAlign:P(a,"thumb-align")};var c=P(a,"onclick");c&&(b.events.onClick=c);new Xi(a,b)}}}
;B("YT.PlayerState.UNSTARTED",-1);B("YT.PlayerState.ENDED",0);B("YT.PlayerState.PLAYING",1);B("YT.PlayerState.PAUSED",2);B("YT.PlayerState.BUFFERING",3);B("YT.PlayerState.CUED",5);B("YT.get",function(a){return lg[a]});
B("YT.scan",og);B("YT.subscribe",function(a,b,c){Te.subscribe(a,b,c);ng[a]=!0;for(var d in lg)Ci(lg[d],a)});
B("YT.unsubscribe",function(a,b,c){Se(a,b,c)});
B("YT.Player",X);B("YT.Thumbnail",Xi);W.prototype.destroy=W.prototype.destroy;W.prototype.setSize=W.prototype.setSize;W.prototype.getIframe=W.prototype.ta;W.prototype.addEventListener=W.prototype.addEventListener;X.prototype.getVideoEmbedCode=X.prototype.getVideoEmbedCode;X.prototype.getOptions=X.prototype.getOptions;X.prototype.getOption=X.prototype.getOption;mg.push(function(a){a=pg("player",a);D(a,Ji)});
mg.push(function(){var a=pg("thumbnail");D(a,Yi)});
"undefined"!=typeof YTConfig&&YTConfig.parsetags&&"onload"!=YTConfig.parsetags||og();var Zi=y.onYTReady;Zi&&Zi();var $i=y.onYouTubeIframeAPIReady;$i&&$i();var aj=y.onYouTubePlayerAPIReady;aj&&aj();}).call(this);
