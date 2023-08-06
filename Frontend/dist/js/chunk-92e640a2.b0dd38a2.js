(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-92e640a2"],{"14c3":function(e,t,r){var i=r("c6b6"),n=r("9263");e.exports=function(e,t){var r=e.exec;if("function"===typeof r){var s=r.call(e,t);if("object"!==typeof s)throw TypeError("RegExp exec method returned something other than an Object or null");return s}if("RegExp"!==i(e))throw TypeError("RegExp#exec called on incompatible receiver");return n.call(e,t)}},5319:function(e,t,r){"use strict";var i=r("d784"),n=r("825a"),s=r("7b0b"),a=r("50c4"),o=r("a691"),c=r("1d80"),l=r("8aa5"),u=r("14c3"),d=Math.max,v=Math.min,p=Math.floor,g=/\$([$&'`]|\d\d?|<[^>]*>)/g,f=/\$([$&'`]|\d\d?)/g,h=function(e){return void 0===e?e:String(e)};i("replace",2,(function(e,t,r,i){var x=i.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,m=i.REPLACE_KEEPS_$0,_=x?"$":"$0";return[function(r,i){var n=c(this),s=void 0==r?void 0:r[e];return void 0!==s?s.call(r,n,i):t.call(String(n),r,i)},function(e,i){if(!x&&m||"string"===typeof i&&-1===i.indexOf(_)){var s=r(t,e,this,i);if(s.done)return s.value}var c=n(e),p=String(this),g="function"===typeof i;g||(i=String(i));var f=c.global;if(f){var b=c.unicode;c.lastIndex=0}var k=[];while(1){var $=u(c,p);if(null===$)break;if(k.push($),!f)break;var w=String($[0]);""===w&&(c.lastIndex=l(p,a(c.lastIndex),b))}for(var R="",I=0,C=0;C<k.length;C++){$=k[C];for(var y=String($[0]),S=d(v(o($.index),p.length),0),A=[],P=1;P<$.length;P++)A.push(h($[P]));var T=$.groups;if(g){var L=[y].concat(A,S,p);void 0!==T&&L.push(T);var U=String(i.apply(void 0,L))}else U=E(y,p,S,A,T,i);S>=I&&(R+=p.slice(I,S)+U,I=S+y.length)}return R+p.slice(I)}];function E(e,r,i,n,a,o){var c=i+e.length,l=n.length,u=f;return void 0!==a&&(a=s(a),u=g),t.call(o,u,(function(t,s){var o;switch(s.charAt(0)){case"$":return"$";case"&":return e;case"`":return r.slice(0,i);case"'":return r.slice(c);case"<":o=a[s.slice(1,-1)];break;default:var u=+s;if(0===u)return t;if(u>l){var d=p(u/10);return 0===d?t:d<=l?void 0===n[d-1]?s.charAt(1):n[d-1]+s.charAt(1):t}o=n[u-1]}return void 0===o?"":o}))}}))},6619:function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"container"},[i("div",{attrs:{id:"background2"}}),e.recipe?i("div",[i("div",{staticClass:"recipe-header mt-3 mb-4"},[i("h1",{staticClass:"text-center"},[e._v(e._s(e.recipe.title))]),i("img",{staticClass:"img-fluid rounded mx-auto d-block",attrs:{src:e.recipe.image,alt:"Recipe Image"}})]),i("div",{staticClass:"recipe-body"},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-md-6"},[i("div",{staticClass:"mb-4"},[e.like?e._e():i("img",{staticClass:"button",attrs:{src:r("5241"),width:"30",height:"30"},on:{click:function(t){return e.addLike(e.recipe.id)}}}),e.like?i("img",{attrs:{src:r("8e44"),width:"30",height:"30"}}):e._e(),e.favorites?e._e():i("img",{staticClass:"button",attrs:{src:r("8bfb"),width:"40",height:"40"},on:{click:function(t){return e.addFavorite(e.recipe.id)}}}),e.favorites?i("img",{attrs:{src:r("27c2"),width:"40",height:"40"}}):e._e(),i("h3",[e._v("Recipe Details")]),i("hr"),e.recipe.vegetarian?[i("img",{attrs:{src:r("183b"),width:"60",height:"60",id:"icon"}})]:e._e(),e.recipe.glutenFree?[i("img",{attrs:{src:r("ec7b"),width:"60",height:"60",id:"icon"}})]:e._e(),e.recipe.vegan?[i("img",{attrs:{src:r("0fea"),width:"60",height:"60",id:"icon"}})]:e._e(),i("div",[i("div",{staticClass:"me-4"},[i("strong",[e._v("Ready in:")]),i("span",{staticClass:"text-muted"},[e._v(e._s(e.recipe.readyInMinutes)+" minutes ")])]),i("div",[i("strong",[e._v("Likes:")]),i("span",{staticClass:"text-muted"},[e._v(e._s(e.recipe.popularity)+" likes ")])]),i("div",[i("strong",[e._v("Servings :")]),i("span",{staticClass:"text-muted"},[e._v(e._s(e.recipe.servings)+" servings")])])])],2),i("div",{staticClass:"mb-4"},[i("h3",[e._v("Ingredients")]),i("hr"),i("ul",e._l(e.recipe.ingredients,(function(t,r){return i("li",{key:r+"_"+t.id},[e._v(e._s(t.original))])})),0)])]),i("div",{staticClass:"col-md-6"},[i("div",{staticClass:"mb-4"},[i("h3",[e._v("Instructions")]),i("hr"),i("ol",[i("div",{domProps:{innerHTML:e._s(e.formattedInstructions)}})])])])])])]):e._e()])},n=[],s=(r("ac1f"),r("5319"),r("96cf"),r("1da1")),a={data:function(){return{recipe:null,favorites:!1,like:!1}},computed:{formattedInstructions:function(){return this.recipe.instructions}},created:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r,i,n,s,a,o,c,l,u,d,v,p,g,f,h,x;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log("@@@@@@RecipeViewPage@@@@@@@@@@@@@@@@@@@@"),console.log(e.$route.params.recipeId),t.prev=2,t.prev=3,t.next=6,e.axios.get(e.$root.store.server_domain+"/recipes/"+e.$route.params.recipeId,{withCredentials:!0});case 6:r=t.sent,200!==r.status&&e.$router.replace("/NotFound"),t.next=15;break;case 10:return t.prev=10,t.t0=t["catch"](3),console.log("error.response.status",t.t0.response.status),e.$router.replace("/NotFound"),t.abrupt("return");case 15:i=r.data,n=i.id,s=i.title,a=i.readyInMinutes,o=i.image,c=i.popularity,l=i.vegan,u=i.vegetarian,d=i.glutenFree,v=i.instructions,p=i.servings,g=i.ingredients,f={id:n,title:s,readyInMinutes:a,image:o,popularity:c,vegan:l,vegetarian:u,glutenFree:d,instructions:v,servings:p,ingredients:g},e.recipe=f,console.log("this.recipe",e.recipe),t.next=24;break;case 21:t.prev=21,t.t1=t["catch"](2),console.log(t.t1);case 24:return t.prev=24,t.next=27,e.axios.get(e.$root.store.server_domain+"/users/favorites/"+e.recipe.id,{withCredentials:!0});case 27:h=t.sent,console.log("favorites items response"),console.log(h),console.log("data response"),console.log(h.data),e.favorites=h.data,t.next=38;break;case 35:t.prev=35,t.t2=t["catch"](24),console.log(t.t2);case 38:return t.prev=38,t.next=41,e.axios.get(e.$root.store.server_domain+"/users/Like/"+e.recipe.id,{withCredentials:!0});case 41:x=t.sent,console.log("like response"),console.log(x),console.log("like response"),console.log(x.data),e.like=x.data,t.next=52;break;case 49:t.prev=49,t.t3=t["catch"](38),console.log(t.t3);case 52:case"end":return t.stop()}}),t,null,[[2,21],[3,10],[24,35],[38,49]])})))()},methods:{addLike:function(e){var t=this;this.$root.store.username?this.axios.post(this.$root.store.server_domain+"/users/Like",{recipeId:e},{withCredentials:!0}).then((function(e){t.$root.toast("Add Like","Like was added successfully","success"),t.like=!t.like,t.$emit("like",t.like)}))["catch"]((function(e){t.$root.toast("Add Like","Like was not added","danger")})):this.$root.toast("Add to favorites","Must login to like this recipe","danger")},addFavorite:function(e){var t=this;this.$root.store.username?this.axios.post(this.$root.store.server_domain+"/users/favorites",{recipeId:e},{withCredentials:!0}).then((function(e){t.$root.toast("Add to favorites","Recipe was added successfully","success"),t.favorites=!t.favorites,t.$emit("like",t.favorites)}))["catch"]((function(e){t.$root.toast("Add to favorites","Recipe was not added","danger")})):this.$root.toast("Add to favorites","Must login to add favorites","danger")}}},o=a,c=(r("f004"),r("2877")),l=Object(c["a"])(o,i,n,!1,null,"604d3462",null);t["default"]=l.exports},"77d9":function(e,t,r){},"8aa5":function(e,t,r){"use strict";var i=r("6547").charAt;e.exports=function(e,t,r){return t+(r?i(e,t).length:1)}},9263:function(e,t,r){"use strict";var i=r("ad6d"),n=r("9f7f"),s=RegExp.prototype.exec,a=String.prototype.replace,o=s,c=function(){var e=/a/,t=/b*/g;return s.call(e,"a"),s.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),l=n.UNSUPPORTED_Y||n.BROKEN_CARET,u=void 0!==/()??/.exec("")[1],d=c||u||l;d&&(o=function(e){var t,r,n,o,d=this,v=l&&d.sticky,p=i.call(d),g=d.source,f=0,h=e;return v&&(p=p.replace("y",""),-1===p.indexOf("g")&&(p+="g"),h=String(e).slice(d.lastIndex),d.lastIndex>0&&(!d.multiline||d.multiline&&"\n"!==e[d.lastIndex-1])&&(g="(?: "+g+")",h=" "+h,f++),r=new RegExp("^(?:"+g+")",p)),u&&(r=new RegExp("^"+g+"$(?!\\s)",p)),c&&(t=d.lastIndex),n=s.call(v?r:d,h),v?n?(n.input=n.input.slice(f),n[0]=n[0].slice(f),n.index=d.lastIndex,d.lastIndex+=n[0].length):d.lastIndex=0:c&&n&&(d.lastIndex=d.global?n.index+n[0].length:t),u&&n&&n.length>1&&a.call(n[0],r,(function(){for(o=1;o<arguments.length-2;o++)void 0===arguments[o]&&(n[o]=void 0)})),n}),e.exports=o},"9f7f":function(e,t,r){"use strict";var i=r("d039");function n(e,t){return RegExp(e,t)}t.UNSUPPORTED_Y=i((function(){var e=n("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=i((function(){var e=n("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},ac1f:function(e,t,r){"use strict";var i=r("23e7"),n=r("9263");i({target:"RegExp",proto:!0,forced:/./.exec!==n},{exec:n})},d784:function(e,t,r){"use strict";r("ac1f");var i=r("6eeb"),n=r("d039"),s=r("b622"),a=r("9263"),o=r("9112"),c=s("species"),l=!n((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),u=function(){return"$0"==="a".replace(/./,"$0")}(),d=s("replace"),v=function(){return!!/./[d]&&""===/./[d]("a","$0")}(),p=!n((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var r="ab".split(e);return 2!==r.length||"a"!==r[0]||"b"!==r[1]}));e.exports=function(e,t,r,d){var g=s(e),f=!n((function(){var t={};return t[g]=function(){return 7},7!=""[e](t)})),h=f&&!n((function(){var t=!1,r=/a/;return"split"===e&&(r={},r.constructor={},r.constructor[c]=function(){return r},r.flags="",r[g]=/./[g]),r.exec=function(){return t=!0,null},r[g](""),!t}));if(!f||!h||"replace"===e&&(!l||!u||v)||"split"===e&&!p){var x=/./[g],m=r(g,""[e],(function(e,t,r,i,n){return t.exec===a?f&&!n?{done:!0,value:x.call(t,r,i)}:{done:!0,value:e.call(r,t,i)}:{done:!1}}),{REPLACE_KEEPS_$0:u,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:v}),_=m[0],E=m[1];i(String.prototype,e,_),i(RegExp.prototype,g,2==t?function(e,t){return E.call(e,this,t)}:function(e){return E.call(e,this)})}d&&o(RegExp.prototype[g],"sham",!0)}},f004:function(e,t,r){"use strict";var i=r("77d9"),n=r.n(i);n.a}}]);
//# sourceMappingURL=chunk-92e640a2.b0dd38a2.js.map