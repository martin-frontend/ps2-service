(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ca3ba174"],{"1af6":function(t,e,a){},9206:function(t,e,a){"use strict";a("1af6")},"94b0":function(t,e,a){"use strict";a.d(e,"g",(function(){return r})),a.d(e,"h",(function(){return s})),a.d(e,"b",(function(){return o})),a.d(e,"a",(function(){return i})),a.d(e,"c",(function(){return u})),a.d(e,"f",(function(){return l})),a.d(e,"d",(function(){return c})),a.d(e,"e",(function(){return d}));var n=a("b775");function r(t){return Object(n["a"])({url:"/analysis_getremain",method:"post",data:t})}function s(t){return Object(n["a"])({url:"/analysis_getrevenue",method:"post",data:t})}function o(t){return Object(n["a"])({url:"/analysis/user/dau",method:"get",params:t})}function i(t){return Object(n["a"])({url:"/analysis/user",method:"get",params:t})}function u(t){return Object(n["a"])({url:"/analysis/user/log",method:"get",params:t})}function l(t){return Object(n["a"])({url:"/analysis/user/wau",method:"get",params:t})}function c(t){return Object(n["a"])({url:"/analysis/user/mau",method:"get",params:t})}function d(t){return Object(n["a"])({url:"/analysis/user/nru",method:"get",params:t})}},e59a:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"pageContainer",staticClass:"page-container"},[a("searchPanel",{attrs:{"page-data":t.pageData},on:{onSearch:t.onSearch}}),a("div",{staticClass:"table-container"},[a("el-tag",{staticStyle:{"margin-bottom":"10px"}},[t._v("遊戲歷程")]),a("el-table",{attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{prop:"logText",label:"Log 記錄",width:"250"}}),a("el-table-column",{attrs:{prop:"createdAt",label:"時間",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.TransformTime(e.row.createdAt)))]}}])})],1),a("div",{staticClass:"table-pagination"},[a("el-pagination",{attrs:{"current-page":1,"page-sizes":[25,50,75,10],"page-size":25,layout:"total, sizes, prev, pager, next, jumper",total:t.tableTotal},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)],1)},r=[],s=a("2909"),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"search-panel"},[a("el-tag",[t._v("請輸入查詢條件")]),a("div",{staticStyle:{padding:"5px 0"}}),a("el-form",{ref:"form",attrs:{inline:!0,model:t.formData,rules:t.rules}},[a("el-form-item",{attrs:{prop:"text"}},[a("el-input",{attrs:{clearable:"",placeholder:"請輸入角色帳號"},model:{value:t.formData.text,callback:function(e){t.$set(t.formData,"text",e)},expression:"formData.text"}})],1),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.handleSearch()}}},[t._v("查詢")])],1)],1)},i=[],u=a("94b0"),l={name:"SearchPanel",props:{pageData:{type:Object,default:function(){}}},data:function(){return{isStartDateError:!1,formData:{type:"user_id",startdate:"",enddate:""},typeOptions:[{value:"user_id",label:"角色ID"},{value:"user_name",label:"角色名稱"}],rules:{type:[{required:!0,message:"請選擇角色",trigger:"change"}],text:[{required:!0,message:"請填寫內容",trigger:"change"}]}}},watch:{pageData:{handler:function(t,e){this.$refs["form"]&&this.handleSearch()},immediate:!0,deep:!0}},methods:{handleSearch:function(){var t=this;this.$refs["form"].validate((function(e,a){if(e){var n={};n.account=t.formData.text,n.pageSize=t.pageData.pagesize,n.page=t.pageData.page,Object(u["c"])(n).then((function(e){var a=e.data;a.success?t.$emit("onSearch",a.content):t.$message.warning(a.msg)})).catch((function(t){console.log(t)}))}}))}}},c=l,d=a("2877"),p=Object(d["a"])(c,o,i,!1,null,null,null),f=p.exports,g=a("c1df"),h=a.n(g),m={name:"Index",components:{searchPanel:f},data:function(){return{tableData:[],tableTotal:0,pageData:{pagesize:25,page:1}}},methods:{onSearch:function(t){var e=this;t&&(t.data.length?(this.tableData=Object(s["a"])(t.data),this.tableTotal=t.total):this.tableData=[]),this.$nextTick((function(){e.$refs.pageContainer.scrollTo({top:0,behavior:"smooth"})}))},handleSizeChange:function(t){this.pageData.pagesize=t},handleCurrentChange:function(t){this.pageData.page=t},TransformTime:function(t){return h()(t).format("YYYY-MM-DD HH:mm:ss")}}},b=m,v=(a("9206"),Object(d["a"])(b,n,r,!1,null,"699ebb91",null));e["default"]=v.exports}}]);