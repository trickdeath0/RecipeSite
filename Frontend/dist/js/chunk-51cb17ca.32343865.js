(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-51cb17ca"],{"7c4b":function(e,t,i){"use strict";i.r(t);var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",{attrs:{id:"background"}}),i("h1",{staticClass:"title"},[e._v("My Family")]),i("div",{staticClass:"grid"},[i("InternalRecipesGridCards",{attrs:{recipesArray:this.recipes}})],1)])},s=[],a=i("2909"),c=(i("96cf"),i("1da1")),n=i("ad3b"),o={name:"MyFamilyPage",components:{InternalRecipesGridCards:n["a"]},data:function(){return{recipes:[]}},created:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var i,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.recipes=[],t.next=4,e.axios.get(e.$root.store.server_domain+"/users/familyRecipes",{withCredentials:!0,params:{recipeFamily:e.$route.query.recipeFamily}});case 4:r=t.sent,console.log("MyFamilyPage response"),console.log(r),(i=e.recipes).push.apply(i,Object(a["a"])(r.data)),console.log("MyFamilyPage recipes"),console.log(e.recipes),t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](0),console.log(t.t0);case 15:case"end":return t.stop()}}),t,null,[[0,12]])})))()}},l=o,d=(i("d1e8"),i("2877")),u=Object(d["a"])(l,r,s,!1,null,null,null);t["default"]=u.exports},"81e3":function(e,t,i){},ad3b:function(e,t,i){"use strict";var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticStyle:{width:"80rem"}},e._l(e.recipeLines,(function(t,r){return i("b-row",{key:r,staticClass:"recipe-line"},e._l(t,(function(e){return i("b-col",{key:e.id},[i("br"),i("InternalRecipeCard",{staticClass:"recipePreview",attrs:{recipe:e}})],1)})),1)})),1)},s=[],a=(i("4160"),i("159b"),function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"card",staticStyle:{width:"18rem"}},[r("router-link",{staticClass:"recipe-preview",attrs:{to:{name:"myRecipeView",params:{recipeId:e.recipe.recipes_id},query:{recipeFamily:e.recipe.isFamily}}}},[r("img",{staticClass:"recipe-image",attrs:{src:e.recipe.image,alt:"image from spooncalor"}})]),r("div",{staticClass:"card-body"},[r("h5",{staticClass:"recipe-title"},[e._v(e._s(e.recipe.title))])]),r("ul",{staticClass:"recipe-overview"},[r("li",[e._v("⏳ "+e._s(e.recipe.ready_in_minutes)+" minutes")]),r("li",[e._v(" 0 likes "),e.like?e._e():r("img",{staticClass:"button",attrs:{src:i("5241"),width:"30",height:"30"},on:{click:function(t){return e.addLike(e.recipe.id)}}}),e.like?r("img",{attrs:{src:i("8e44"),width:"30",height:"30"}}):e._e()]),e.recipe.isFamily?r("div",[e.recipe.creatorBy?r("li",[e._v(" Who is the genius? "+e._s(e.recipe.creatorBy)+" ")]):e._e(),e.recipe.usualTime?r("li",[e._v(" Usual time to prepared: "+e._s(e.recipe.usualTime)+" ")]):e._e()]):e._e(),e.recipe.vegetarian?[r("img",{attrs:{src:i("183b"),width:"60",height:"60",id:"icon"}})]:e._e(),e.recipe.glutenFree?[r("img",{attrs:{src:i("ec7b"),width:"60",height:"60",id:"icon"}})]:e._e(),e.recipe.vegan?[r("img",{attrs:{src:i("0fea"),width:"60",height:"60",id:"icon"}})]:e._e()],2),e.favorites?e._e():r("img",{staticClass:"button",attrs:{src:i("8bfb"),width:"40",height:"40"},on:{click:function(t){return e.addFavorite(e.recipe.id)}}}),e.favorites?r("img",{attrs:{src:i("27c2"),width:"40",height:"40"}}):e._e()],1)}),c=[],n={mounted:function(){null==this.recipe.image&&(this.recipe.image="../assets/ImageNF.png")},data:function(){return{image_load:!1,like:!1,favorites:!1}},props:{recipe:{type:Object,required:!0}},methods:{addLike:function(e){this.$root.store.username?(this.$root.toast("Add Like","Like was added successfully","success"),this.like=!this.like,this.$emit("like",this.like)):this.$root.toast("Add to favorites","Must login to like this recipe","danger")},addFavorite:function(e){this.$root.store.username?(this.$root.toast("Add to favorites","Recipe was added successfully","success"),this.favorites=!this.favorites,this.$emit("like",this.favorites)):this.$root.toast("Add to favorites","Must login to add favorites","danger")}}},o=n,l=(i("c299"),i("2877")),d=Object(l["a"])(o,a,c,!1,null,"9b158b7c",null),u=d.exports,p={name:"InternalRecipeGridCards",components:{InternalRecipeCard:u},props:{recipesArray:{type:Array,required:!0}},computed:{recipeLines:function(){var e=this,t=4,i=[],r=[];return this.recipesArray.forEach((function(s,a){r.push(s),r.length!==t&&a!==e.recipesArray.length-1||(i.push(r),r=[])})),console.log("recipeLines"),console.log(i),i}}},h=p,m=Object(l["a"])(h,r,s,!1,null,"9f3332de",null);t["a"]=m.exports},c299:function(e,t,i){"use strict";var r=i("d2f7"),s=i.n(r);s.a},d1e8:function(e,t,i){"use strict";var r=i("81e3"),s=i.n(r);s.a},d2f7:function(e,t,i){}}]);
//# sourceMappingURL=chunk-51cb17ca.32343865.js.map