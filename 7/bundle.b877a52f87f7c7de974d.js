!function(){var e={10:function(e,t,n){"use strict";var i=n(537),r=n.n(i),s=n(645),a=n.n(s)()(r());a.push([e.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]),t.Z=a},645:function(e){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",i=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),i&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),i&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,i,r,s){"string"==typeof e&&(e=[[null,e,void 0]]);var a={};if(i)for(var o=0;o<this.length;o++){var l=this[o][0];null!=l&&(a[l]=!0)}for(var c=0;c<e.length;c++){var u=[].concat(e[c]);i&&a[u[0]]||(void 0!==s&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=s),n&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=n):u[2]=n),r&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=r):u[4]="".concat(r)),t.push(u))}},t}},537:function(e){"use strict";e.exports=function(e){var t=e[1],n=e[3];if(!n)return t;if("function"==typeof btoa){var i=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),r="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),s="/*# ".concat(r," */");return[t].concat([s]).join("\n")}return[t].join("\n")}},484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",i="second",r="minute",s="hour",a="day",o="week",l="month",c="quarter",u="year",d="date",p="Invalid Date",v=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,f=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,h={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},m=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},_={s:m,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),r=n%60;return(t<=0?"+":"-")+m(i,2,"0")+":"+m(r,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),r=t.clone().add(i,l),s=n-r<0,a=t.clone().add(i+(s?-1:1),l);return+(-(i+(n-r)/(s?r-a:a-r))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:l,y:u,w:o,d:a,D:d,h:s,m:r,s:i,ms:n,Q:c}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},y="en",b={};b[y]=h;var g="$isDayjsObject",$=function(e){return e instanceof k||!(!e||!e[g])},C=function e(t,n,i){var r;if(!t)return y;if("string"==typeof t){var s=t.toLowerCase();b[s]&&(r=s),n&&(b[s]=n,r=s);var a=t.split("-");if(!r&&a.length>1)return e(a[0])}else{var o=t.name;b[o]=t,r=o}return!i&&r&&(y=r),r||!i&&y},M=function(e,t){if($(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new k(n)},w=_;w.l=C,w.i=$,w.w=function(e,t){return M(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var k=function(){function h(e){this.$L=C(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[g]=!0}var m=h.prototype;return m.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(w.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(v);if(i){var r=i[2]-1||0,s=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],r,i[3]||1,i[4]||0,i[5]||0,i[6]||0,s)):new Date(i[1],r,i[3]||1,i[4]||0,i[5]||0,i[6]||0,s)}}return new Date(t)}(e),this.init()},m.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},m.$utils=function(){return w},m.isValid=function(){return!(this.$d.toString()===p)},m.isSame=function(e,t){var n=M(e);return this.startOf(t)<=n&&n<=this.endOf(t)},m.isAfter=function(e,t){return M(e)<this.startOf(t)},m.isBefore=function(e,t){return this.endOf(t)<M(e)},m.$g=function(e,t,n){return w.u(e)?this[t]:this.set(n,e)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(e,t){var n=this,c=!!w.u(t)||t,p=w.p(e),v=function(e,t){var i=w.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return c?i:i.endOf(a)},f=function(e,t){return w.w(n.toDate()[e].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},h=this.$W,m=this.$M,_=this.$D,y="set"+(this.$u?"UTC":"");switch(p){case u:return c?v(1,0):v(31,11);case l:return c?v(1,m):v(0,m+1);case o:var b=this.$locale().weekStart||0,g=(h<b?h+7:h)-b;return v(c?_-g:_+(6-g),m);case a:case d:return f(y+"Hours",0);case s:return f(y+"Minutes",1);case r:return f(y+"Seconds",2);case i:return f(y+"Milliseconds",3);default:return this.clone()}},m.endOf=function(e){return this.startOf(e,!1)},m.$set=function(e,t){var o,c=w.p(e),p="set"+(this.$u?"UTC":""),v=(o={},o[a]=p+"Date",o[d]=p+"Date",o[l]=p+"Month",o[u]=p+"FullYear",o[s]=p+"Hours",o[r]=p+"Minutes",o[i]=p+"Seconds",o[n]=p+"Milliseconds",o)[c],f=c===a?this.$D+(t-this.$W):t;if(c===l||c===u){var h=this.clone().set(d,1);h.$d[v](f),h.init(),this.$d=h.set(d,Math.min(this.$D,h.daysInMonth())).$d}else v&&this.$d[v](f);return this.init(),this},m.set=function(e,t){return this.clone().$set(e,t)},m.get=function(e){return this[w.p(e)]()},m.add=function(n,c){var d,p=this;n=Number(n);var v=w.p(c),f=function(e){var t=M(p);return w.w(t.date(t.date()+Math.round(e*n)),p)};if(v===l)return this.set(l,this.$M+n);if(v===u)return this.set(u,this.$y+n);if(v===a)return f(1);if(v===o)return f(7);var h=(d={},d[r]=e,d[s]=t,d[i]=1e3,d)[v]||1,m=this.$d.getTime()+n*h;return w.w(m,this)},m.subtract=function(e,t){return this.add(-1*e,t)},m.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||p;var i=e||"YYYY-MM-DDTHH:mm:ssZ",r=w.z(this),s=this.$H,a=this.$m,o=this.$M,l=n.weekdays,c=n.months,u=n.meridiem,d=function(e,n,r,s){return e&&(e[n]||e(t,i))||r[n].slice(0,s)},v=function(e){return w.s(s%12||12,e,"0")},h=u||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i};return i.replace(f,(function(e,i){return i||function(e){switch(e){case"YY":return String(t.$y).slice(-2);case"YYYY":return w.s(t.$y,4,"0");case"M":return o+1;case"MM":return w.s(o+1,2,"0");case"MMM":return d(n.monthsShort,o,c,3);case"MMMM":return d(c,o);case"D":return t.$D;case"DD":return w.s(t.$D,2,"0");case"d":return String(t.$W);case"dd":return d(n.weekdaysMin,t.$W,l,2);case"ddd":return d(n.weekdaysShort,t.$W,l,3);case"dddd":return l[t.$W];case"H":return String(s);case"HH":return w.s(s,2,"0");case"h":return v(1);case"hh":return v(2);case"a":return h(s,a,!0);case"A":return h(s,a,!1);case"m":return String(a);case"mm":return w.s(a,2,"0");case"s":return String(t.$s);case"ss":return w.s(t.$s,2,"0");case"SSS":return w.s(t.$ms,3,"0");case"Z":return r}return null}(e)||r.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,d,p){var v,f=this,h=w.p(d),m=M(n),_=(m.utcOffset()-this.utcOffset())*e,y=this-m,b=function(){return w.m(f,m)};switch(h){case u:v=b()/12;break;case l:v=b();break;case c:v=b()/3;break;case o:v=(y-_)/6048e5;break;case a:v=(y-_)/864e5;break;case s:v=y/t;break;case r:v=y/e;break;case i:v=y/1e3;break;default:v=y}return p?v:w.a(v)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return b[this.$L]},m.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=C(e,t,!0);return i&&(n.$L=i),n},m.clone=function(){return w.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},h}(),D=k.prototype;return M.prototype=D,[["$ms",n],["$s",i],["$m",r],["$H",s],["$W",a],["$M",l],["$y",u],["$D",d]].forEach((function(e){D[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),M.extend=function(e,t){return e.$i||(e(t,k,M),e.$i=!0),M},M.locale=C,M.isDayjs=$,M.unix=function(e){return M(1e3*e)},M.en=b[y],M.Ls=b,M.p={},M}()},110:function(e){e.exports=function(){"use strict";return function(e,t,n){e=e||{};var i=t.prototype,r={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function s(e,t,n,r){return i.fromToBase(e,t,n,r)}n.en.relativeTime=r,i.fromToBase=function(t,i,s,a,o){for(var l,c,u,d=s.$locale().relativeTime||r,p=e.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],v=p.length,f=0;f<v;f+=1){var h=p[f];h.d&&(l=a?n(t).diff(s,h.d,!0):s.diff(t,h.d,!0));var m=(e.rounding||Math.round)(Math.abs(l));if(u=l>0,m<=h.r||!h.r){m<=1&&f>0&&(h=p[f-1]);var _=d[h.l];o&&(m=o(""+m)),c="string"==typeof _?_.replace("%d",m):_(m,i,h.l,u);break}}if(i)return c;var y=u?d.future:d.past;return"function"==typeof y?y(c):y.replace("%s",c)},i.to=function(e,t){return s(e,t,this,!0)},i.from=function(e,t){return s(e,t,this)};var a=function(e){return e.$u?n.utc():n()};i.toNow=function(e){return this.to(a(this),e)},i.fromNow=function(e){return this.from(a(this),e)}}}()},379:function(e){"use strict";var t=[];function n(e){for(var n=-1,i=0;i<t.length;i++)if(t[i].identifier===e){n=i;break}return n}function i(e,i){for(var s={},a=[],o=0;o<e.length;o++){var l=e[o],c=i.base?l[0]+i.base:l[0],u=s[c]||0,d="".concat(c," ").concat(u);s[c]=u+1;var p=n(d),v={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==p)t[p].references++,t[p].updater(v);else{var f=r(v,i);i.byIndex=o,t.splice(o,0,{identifier:d,updater:f,references:1})}a.push(d)}return a}function r(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,r){var s=i(e=e||[],r=r||{});return function(e){e=e||[];for(var a=0;a<s.length;a++){var o=n(s[a]);t[o].references--}for(var l=i(e,r),c=0;c<s.length;c++){var u=n(s[c]);0===t[u].references&&(t[u].updater(),t.splice(u,1))}s=l}}},569:function(e){"use strict";var t={};e.exports=function(e,n){var i=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}},216:function(e){"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:function(e,t,n){"use strict";e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:function(e){"use strict";e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var i="";n.supports&&(i+="@supports (".concat(n.supports,") {")),n.media&&(i+="@media ".concat(n.media," {"));var r=void 0!==n.layer;r&&(i+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),i+=n.css,r&&(i+="}"),n.media&&(i+="}"),n.supports&&(i+="}");var s=n.sourceMap;s&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),t.styleTagTransform(i,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:function(e){"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(i){var r=t[i];if(void 0!==r)return r.exports;var s=t[i]={id:i,exports:{}};return e[i].call(s.exports,s,s.exports,n),s.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.nc=void 0,function(){"use strict";function e(e,t,n="beforeend"){if(!(e instanceof b))throw new Error("Can render only components");if(null===t)throw new Error("Container element doesn't exist");t.insertAdjacentElement(n,e.element)}function t(e,t){if(!(e instanceof b&&t instanceof b))throw new Error("Can replace only components");const n=e.element,i=t.element,r=i.parentElement;if(null===r)throw new Error("Parent element doesn't exist");r.replaceChild(n,i)}function i(e){if(null!==e){if(!(e instanceof b))throw new Error("Can remove only components");e.element.remove(),e.removeElement()}}var r=n(379),s=n.n(r),a=n(795),o=n.n(a),l=n(569),c=n.n(l),u=n(565),d=n.n(u),p=n(216),v=n.n(p),f=n(589),h=n.n(f),m=n(10),_={};_.styleTagTransform=h(),_.setAttributes=d(),_.insert=c().bind(null,"head"),_.domAPI=o(),_.insertStyleElement=v(),s()(m.Z,_),m.Z&&m.Z.locals&&m.Z.locals;const y="shake";class b{#e=null;constructor(){if(new.target===b)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#e||(this.#e=function(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}(this.template)),this.#e}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#e=null}shake(e){this.element.classList.add(y),setTimeout((()=>{this.element.classList.remove(y),e?.()}),600)}}class g extends b{get template(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n            <div class="trip-sort__item  trip-sort__item--day">\n              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n              <label class="trip-sort__btn" for="sort-day">Day</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--event">\n              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n              <label class="trip-sort__btn" for="sort-event">Event</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--time">\n              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n              <label class="trip-sort__btn" for="sort-time">Time</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--price">\n              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n              <label class="trip-sort__btn" for="sort-price">Price</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--offer">\n              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n              <label class="trip-sort__btn" for="sort-offer">Offers</label>\n            </div>\n          </form>'}}const $=[{id:0,title:"Order Uber",price:"20"},{id:1,title:"Add luggage",price:"50"},{id:2,title:"Switch to comfort",price:"80"},{id:3,title:"Rent a car",price:"200"},{id:4,title:"Add breakfast",price:"50"},{id:5,title:"Book tickets",price:"40"},{id:6,title:"Lunch in city",price:"30"},{id:7,title:"Add meal",price:"15"},{id:8,title:"Choose seats",price:"5"},{id:9,title:"Travel by train",price:"40"}],C=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],M=[{id:0,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.",name:"Milan",pictures:[{src:"https://loremflickr.com/248/152?random=1",description:"Consectetur adipiscing elit."},{src:"https://loremflickr.com/248/152?random=2",description:"Ipsum dolor sit amet."}]},{id:1,description:"Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.",name:"Basel",pictures:[{src:"https://loremflickr.com/248/152?random=3",description:"Lectus varius viverra."},{src:"https://loremflickr.com/248/152?random=4",description:"Nullam nunc ex."}]},{id:2,description:"Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.",name:"Praga",pictures:[{src:"https://loremflickr.com/248/152?random=5",description:"Condimentum sed nibh vitae."},{src:"https://loremflickr.com/248/152?random=6",description:"Purus ex euismod diam."}]}],w=[{type:C[0],offers:[$[0]]},{type:C[4],offers:[$[3]]},{type:C[5],offers:[$[1],$[2]]},{type:C[6],offers:[$[4],$[1]]},{type:C[7],offers:[$[5],$[6]]}],k=[{isFavorite:!0,basePrice:160,img:C[0],destination:M[0],event:C[0],offer:w[0],dateFrom:"2024-07-10T21:39",dateTo:"2024-07-18T21:44"},{isFavorite:!1,img:C[4],basePrice:600,destination:M[1],event:C[4],offer:w[1],dateFrom:"2024-08-11T08:11",dateTo:"2024-08-15T08:11"},{isFavorite:!1,basePrice:20,img:C[5],destination:M[2],event:C[5],offer:w[2],dateFrom:"2024-05-09T07:44",dateTo:"2024-05-09T18:44"}],D="everything",A="past",x="present",S="future",T="DEFAULT",E="EDITING";class F extends b{get template(){return'<section class="trip-events">\n    <h2 class="visually-hidden">Trip events</h2>\n\n    <p class="trip-events__msg">Click New Event to create your first point</p>\n  </section>'}}var P=n(484),O=n.n(P),B=n(110),L=n.n(B);O().extend(L());const j=e=>e<10?"0"+e:e,H=(e,t)=>({date:O()(e).format("DD MMM"),time:O()(e).format("HH:mm"),allDate:O()(e).format("YY/MM/DD HH:mm"),difference:()=>{const n=O()(t).diff(O()(e),"day"),i=O()(t).diff(O()(e),"hour"),r=O()(t).diff(O()(e),"minute"),s=i-24*n,a=r-60*i;return i<1?j(r)+"M":i>=1&&i<24?`${j(i)}H ${j(a)}M`:`${j(n)}D ${j(s)}H ${j(a)}M`}});class I extends b{#t=null;#n=null;#i=null;constructor({point:e,onRollupClick:t,onFavoriteClick:n}){super(),this.#t=e,this.#n=t,this.#i=n,this.buttonRollup.addEventListener("click",this.#r),this.favoriteBtn.addEventListener("click",this.#s)}get buttonRollup(){return this.element.querySelector(".event__rollup-btn")}get favoriteBtn(){return this.element.querySelector(".event__favorite-btn")}get template(){return(e=>{const{basePrice:t,event:n,img:i,destination:r,offer:s,dateFrom:a,dateTo:o}=e,{offers:l}=s;return`<div class="event">\n            <time class="event__date" datetime="2019-03-18">${H(a).date}</time>\n            <div class="event__type">\n              <img class="event__type-icon" width="42" height="42" src="img/icons/${i}.png" alt="Event type icon">\n            </div>\n            <h3 class="event__title">${n} ${r.name}</h3>\n            <div class="event__schedule">\n              <p class="event__time">\n                <time class="event__start-time" datetime="2019-03-18T10:30">${H(a).time}</time>\n                &mdash;\n                <time class="event__end-time" datetime="2019-03-18T11:00">${H(o).time}</time>\n              </p>\n              <p class="event__duration">${H(a,o).difference()}</p>\n            </div>\n            <p class="event__price">\n              &euro;&nbsp;<span class="event__price-value">${t}</span>\n            </p>\n            <h4 class="visually-hidden">Offers:</h4>\n            <ul class="event__selected-offers">\n              ${c=l,Object.entries(c).map((([,e])=>`\n      <li class="event__offer">\n        <span class="event__offer-title">${e.title}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${e.price}</span>\n      </li>`)).join("")}\n            </ul>\n            <button class="event__favorite-btn event__favorite-btn--active" type="button">\n              <span class="visually-hidden">Add to favorite</span>\n              <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n              </svg>\n            </button>\n            <button class="event__rollup-btn" type="button">\n              <span class="visually-hidden">Open event</span>\n            </button>\n          </div>`;var c})(this.#t)}#r=e=>{e.preventDefault(),this.#n()};#s=e=>{e.preventDefault(),this.#i()}}class R extends b{#t=null;#a=null;constructor({point:e,onFormSubmit:t}){super(),this.#t=e,this.#a=t,this.currentForm.addEventListener("submit",this.#o),this.rollupBtn.addEventListener("click",this.#o)}get rollupBtn(){return this.element.querySelector(".event__rollup-btn")}get currentForm(){return this.element}get template(){return(e=>{const{basePrice:t,event:n,img:i,destination:r,offer:s,dateFrom:a,dateTo:o}=e,{offers:l}=s,{description:c,pictures:u}=r;return`<form class="event event--edit" action="#" method="post">\n    <header class="event__header">\n      <div class="event__type-wrapper">\n        <label class="event__type  event__type-btn" for="event-type-toggle-1">\n          <span class="visually-hidden">Choose event type</span>\n          <img class="event__type-icon" width="17" height="17" src="img/icons/${i}.png" alt="Event type icon">\n        </label>\n        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n        <div class="event__type-list">\n          <fieldset class="event__type-group">\n            <legend class="visually-hidden">Event type</legend>\n\n            <div class="event__type-item">\n              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">\n              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>\n            </div>\n\n            <div class="event__type-item">\n              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">\n              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>\n            </div>\n\n            <div class="event__type-item">\n              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">\n              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>\n            </div>\n\n            <div class="event__type-item">\n              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">\n              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>\n            </div>\n\n            <div class="event__type-item">\n              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">\n              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>\n            </div>\n\n            <div class="event__type-item">\n              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>\n              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>\n            </div>\n\n            <div class="event__type-item">\n              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">\n              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>\n            </div>\n\n            <div class="event__type-item">\n              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">\n              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>\n            </div>\n\n            <div class="event__type-item">\n              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">\n              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>\n            </div>\n          </fieldset>\n        </div>\n      </div>\n\n      <div class="event__field-group  event__field-group--destination">\n        <label class="event__label  event__type-output" for="event-destination-1">\n          ${n}\n        </label>\n        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${r.name}" list="destination-list-1">\n        <datalist id="destination-list-1">\n          <option value="Amsterdam"></option>\n          <option value="Geneva"></option>\n          <option value="Chamonix"></option>\n        </datalist>\n      </div>\n\n      <div class="event__field-group  event__field-group--time">\n        <label class="visually-hidden" for="event-start-time-1">From</label>\n        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${H(a).allDate}">\n        &mdash;\n        <label class="visually-hidden" for="event-end-time-1">To</label>\n        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${H(o).allDate}">\n      </div>\n\n      <div class="event__field-group  event__field-group--price">\n        <label class="event__label" for="event-price-1">\n          <span class="visually-hidden">Price</span>\n          &euro;\n        </label>\n        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${t}">\n      </div>\n\n      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n      <button class="event__reset-btn" type="reset">Delete</button>\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </header>\n    <section class="event__details">\n      <section class="event__section  event__section--offers">\n        <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n        <div class="event__available-offers">\n          ${d=l,Object.entries(d).map((([,e])=>`\n      <div class="event__offer-selector">\n        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${e.id}" type="checkbox" name="${e.title}" checked>\n        <label class="event__offer-label" for="event-offer-luggage-${e.id}">\n          <span class="event__offer-title">${e.title}</span>\n          &plus;&euro;&nbsp;\n          <span class="event__offer-price">${e.price}</span>\n        </label>\n      </div>`)).join("")}\n        </div>\n      </section>\n\n      <section class="event__section  event__section--destination">\n        <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n        <p class="event__destination-description">${c}</p>\n\n        <div class="event__photos-container">\n          <div class="event__photos-tape">\n            ${(e=>Object.entries(e).map((([,e])=>`<img class="event__photo" src="${e.src}.jpg" alt="${e.description}">`)).join(""))(u)}\n          </div>\n        </div>\n      </section>\n    </section>\n  </form>`;var d})(this.#t)}#o=e=>{e.preventDefault(),this.#a(this.#t)}}class N{#l=null;#c=null;#u=null;#d=null;#p=null;#v=T;constructor({container:e,onDataChange:t,onModeChange:n}){this.#u=e,this.#d=t,this.#p=n}#f=e=>{(e=>27===e.keyCode)(e)&&(e.preventDefault(),this.#h(),document.removeEventListener("keydown",this.#f))};init(n){const r=this.#l,s=this.#c;this.#l=new I({point:n,onRollupClick:()=>{this.#m(),document.addEventListener("keydown",this.#f)},onFavoriteClick:()=>{this.#d({...n,isFavorite:!n.isFavorite})}}),this.#c=new R({point:n,onFormSubmit:()=>{this.#h(),this.#d(n),document.removeEventListener("keydown",this.#f)}}),null!==r&&null!==s?(this.#v===T&&t(this.#l,r),this.#v===E&&t(this.#c,s),i(r),i(s)):e(this.#l,this.#u)}destroy(){i(this.#l),i(this.#c)}resetView(){this.#v!==T&&this.#h()}#m(){t(this.#c,this.#l),this.#p(),this.#v=E}#h(){t(this.#l,this.#c),this.#v=T}}class Y extends b{#_=null;constructor({filters:e}){super(),this.#_=e}get template(){return`\n    <form class="trip-filters" action="#" method="get">\n      ${e=this.#_,Object.entries(e).map((([,e])=>`\n    <div class="trip-filters__filter">\n      <input id="filter-${e.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${e.type}" checked ${e.has?"":"disabled"}>\n      <label class="trip-filters__filter-label" for="filter-${e.type}">${e.type}</label>\n    </div>`)).join("")}\n      <button class="visually-hidden" type="submit">Accept filter</button>\n    </form>`;var e}}const q={[D]:e=>[...e],[S]:e=>e.filter((e=>(e=>O()().isBefore(e.dateFrom))(e))),[x]:e=>e.filter((e=>(e=>O()().isBefore(e.dateTo)&&O()().isAfter(e.dateFrom))(e))),[A]:e=>e.filter((e=>(e=>O()().isAfter(e.dateTo))(e)))};let U=(e=21)=>{let t="",n=crypto.getRandomValues(new Uint8Array(e));for(;e--;)t+="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[63&n[e]];return t};const W=()=>{return{id:U(),...(e=k,e[Math.floor(Math.random()*e.length)])};var e},Z=document.querySelector(".page-body"),V=Z.querySelector(".trip-controls__filters"),z=Z.querySelector(".trip-events"),J=new class{#y=Array.from({length:3},W);getPoints(){return this.#y}},X=new class{#u=null;#b=null;#g=[];#$=new Map;constructor({mainContainer:e,pointModels:t}){this.#u=e,this.#b=t}#C(){for(let e=0;e<this.#g.length;e++)this.#M(this.#g[e])}init(){this.#g=[...this.#b.getPoints()],this.#w(),this.#C(),0===this.#g.length&&e(new F,this.#u)}#w(){e(new g,this.#u)}#M(e){const t=new N({container:this.#u,onDataChange:this.#k,onModeChange:this.#p});t.init(e),this.#$.set(e.id,t)}#k=e=>{var t,n;this.#g=(t=this.#g,n=e,t.map((e=>e.id===n.id?n:e))),this.#$.get(e.id).init(e)};#p=()=>{this.#$.forEach((e=>{e.resetView()}))}}({mainContainer:z,pointModels:J}),K=new class{#D=null;#_=null;constructor({filtersContainer:e,pointModels:t}){var n;this.#D=e,this.#_=(n=t.getPoints(),Object.entries(q).map((([e,t])=>({type:e,has:t(n).length>0}))))}init(){e(new Y({filters:this.#_}),this.#D)}}({filtersContainer:V,pointModels:J});X.init(),K.init()}()}();
//# sourceMappingURL=bundle.b877a52f87f7c7de974d.js.map