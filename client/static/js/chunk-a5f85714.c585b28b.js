(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a5f85714"],{4998:function(t,e,a){"use strict";a("f068")},"66d9":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"pageContainer",staticClass:"page-container"},[a("search-panel",{ref:"searchPanel",on:{updatedTableData:t.updatedTableData}}),a("div",{staticClass:"table-container"},[a("el-tag",[t._v("活躍帳戶")]),a("chart",{staticClass:"account-chart"}),a("tableData",{attrs:{"account-total":t.accountTotal,date:t.date}})],1)],1)},r=[],i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"search-panel"},[a("el-tag",[t._v("請輸入查詢條件")]),a("div",{staticStyle:{padding:"5px 0"}}),a("el-form",{ref:"form",attrs:{inline:!0,model:t.searchform,rules:t.rules}},["DAU"===t.date||"NRU"===t.date?[a("el-form-item",{attrs:{prop:"startDate"}},[a("el-date-picker",{attrs:{"value-format":"timestamp",type:"date",placeholder:"選擇開始日期","picker-options":t.startPickerOptions},model:{value:t.searchform.startDate,callback:function(e){t.$set(t.searchform,"startDate",e)},expression:"searchform.startDate"}})],1),a("el-form-item",{attrs:{prop:"endDate"}},[a("el-date-picker",{attrs:{"value-format":"timestamp",type:"date",placeholder:"選擇結束日期","picker-options":t.endPickerOptions},model:{value:t.searchform.endDate,callback:function(e){t.$set(t.searchform,"endDate",e)},expression:"searchform.endDate"}})],1)]:[a("el-form-item",{attrs:{prop:"startDate"}},[a("el-date-picker",{attrs:{"value-format":"timestamp",type:"year",placeholder:"選擇年","picker-options":t.startPickerOptions},model:{value:t.searchform.startDate,callback:function(e){t.$set(t.searchform,"startDate",e)},expression:"searchform.startDate"}})],1)],a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.$parent.initPage(),t.handleSearch()}}},[t._v("查詢")])],2)],1)},s=[],o=a("c1df"),c=a.n(o),l={name:"SearchPanel",data:function(){return{loading:!1,isStartDateError:!1,searchform:{startDate:this.getMonthStart(),endDate:this.getNowMoment(),type:"ALL"},rules:{startDate:[{required:!0,trigger:"change",message:"開始日期不得為空"}],endDate:[{required:!0,trigger:"change",message:"結束日期不得為空"}]},typeOptions:[{value:"all",label:"ALL"},{value:"android",label:"Android"},{value:"ios",label:"iOS"}],date:"DAU",startDate_DAU:this.getMonthStart(),endDate_DAU:this.getNowMoment(),startDate_WAU:this.getYearStart(),startDate_MAU:this.getYearStart(),startDate_NRU:this.getMonthStart(),endDate_NRU:this.getNowMoment()}},computed:{endPickerOptions:function(){var t=this;return{disabledDate:function(e){return!t.isStartDateError&&(c()(e)<c()(t.searchform.startDate)||c()(e)>c()())}}},startPickerOptions:function(){var t=this;return{disabledDate:function(e){return!t.isStartDateError&&c()(e)>c()()}}}},mounted:function(){this.handleSearch()},methods:{saveDate:function(){this["startDate_".concat(this.date)]=this.searchform.startDate,"WAU"!==this.date&&"MAU"!==this.date&&(this["endDate_".concat(this.date)]=this.searchform.endDate)},setDate:function(){this.searchform.startDate=this["startDate_".concat(this.date)],"WAU"!==this.date&&"MAU"!==this.date&&(this.searchform.endDate=this["endDate_".concat(this.date)])},handleSearch:function(){var t=this;this.loading=!0,this.$refs["form"].validate((function(e,a){if(!e)return console.log("error submit!!"),!1;var n={};n.startDate=t.searchform.startDate,"DAU"===t.date||"NRU"===t.date?n.endDate=t.searchform.endDate:n.endDate=c()(t.searchform.startDate).endOf("year").valueOf(),n.page=t.$parent.pageData.page,n.pageSize=t.$parent.pageData.pagesize,t.$emit("updatedTableData",n,t.loading)}))},getMonthStart:function(){return c()().startOf("month").valueOf()},getYearStart:function(){return c()().startOf("year").valueOf()},getNowMoment:function(){return c()().format("x")},changeType:function(t){this.saveDate(),this.date=t,this.setDate()}}},u=l,h=a("2877"),d=Object(h["a"])(u,i,s,!1,null,null,null),f=d.exports,p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}},t._l(t.dateOptions,(function(t){return a("el-tab-pane",{key:t.value,attrs:{label:t.label,name:t.value}})})),1),t.$parent.loading?t._e():a("line-marker",{attrs:{type:t.date}})],1)},m=[],g=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{style:{height:t.height,width:t.width}})},b=[],D=(a("4160"),a("159b"),a("313e")),v=a.n(D),y=a("ed08"),_={data:function(){return{$_sidebarElm:null,$_resizeHandler:null}},mounted:function(){this.initListener()},activated:function(){this.$_resizeHandler||this.initListener(),this.resize()},beforeDestroy:function(){this.destroyListener()},deactivated:function(){this.destroyListener()},methods:{$_sidebarResizeHandler:function(t){"width"===t.propertyName&&this.$_resizeHandler()},initListener:function(){var t=this;this.$_resizeHandler=Object(y["a"])((function(){t.resize()}),100),window.addEventListener("resize",this.$_resizeHandler),this.$_sidebarElm=document.getElementsByClassName("sidebar-container")[0],this.$_sidebarElm&&this.$_sidebarElm.addEventListener("transitionend",this.$_sidebarResizeHandler)},destroyListener:function(){window.removeEventListener("resize",this.$_resizeHandler),this.$_resizeHandler=null,this.$_sidebarElm&&this.$_sidebarElm.removeEventListener("transitionend",this.$_sidebarResizeHandler)},resize:function(){var t=this.chart;t&&t.resize()}}};a("817d");var k={mixins:[_],props:{className:{type:String,default:"chart"},width:{type:String,default:"100%"},height:{type:String,default:"250px"},autoResize:{type:Boolean,default:!0},type:{type:String,default:""}},inject:["group"],data:function(){return{chart:null,dateList:[],yAxisList:[]}},watch:{"group.tableData":{deep:!0,handler:function(t){t&&this.setOptions(this.group.tableData)}}},beforeDestroy:function(){this.chart&&(this.chart.dispose(),this.chart=null)},mounted:function(){var t=this;this.$nextTick((function(){t.initChart()}))},methods:{initChart:function(){this.chart=v.a.init(this.$el,"macarons"),this.setOptions(this.group.tableData)},setOptions:function(t){var e=this;this.dateList=[],this.yAxisList=[];var a=Object(y["b"])(t);a.sort((function(t,e){return t[0]-e[0]})),a.forEach((function(t){e.dateList.push(c()(t[0]).format("YYYY-MM-DD")),e.yAxisList.push(t[1])})),this.chart.setOption({title:{text:a.length?"":"無資料"},xAxis:{data:this.dateList,boundaryGap:!1,axisTick:{show:!1}},grid:{left:40,right:40,bottom:20,top:30,containLabel:!0},tooltip:{trigger:"axis",axisPointer:{type:"cross"},padding:[5,10]},yAxis:{axisTick:{show:!1}},legend:{data:["DAU","WAU","MAU"]},series:[{name:"".concat(this.group.date),type:"line",symbolSize:5,symbol:"circle",smooth:0,itemStyle:{normal:{color:"#3888fa",lineStyle:{color:"#3888fa",width:2},areaStyle:{color:"#f3f8ff"}}},data:this.yAxisList,animationDuration:2800,animationEasing:"quadraticOut"}]})}}},$=k,S=Object(h["a"])($,g,b,!1,null,null,null),O=S.exports,A={name:"Chart",inject:["group"],components:{LineMarker:O},data:function(){return{date:"DAU",dateOptions:[{value:"DAU",label:"DAU"},{value:"WAU",label:"WAU"},{value:"MAU",label:"MAU"},{value:"NRU",label:"NRU"}]}},methods:{handleClick:function(){this.$parent.changeType(this.date)}}},U=A,x=(a("4998"),Object(h["a"])(U,p,m,!1,null,"1f824036",null)),z=x.exports,w=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-table",{attrs:{border:"","header-cell-style":t.headerStyle,data:t.$parent.tableData}},[a("el-table-column",{attrs:{label:"日期"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(t._f("moment")(e.row[0],"YYYY-MM-DD"))+" ")]}}])}),a("el-table-column",{attrs:{label:t.$parent.date},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row[1])+" ")]}}])})],1),a("div",{staticClass:"table-pagination"},[a("el-pagination",{attrs:{"current-page":1,"page-sizes":[25,50,75,10],"page-size":25,layout:"total, sizes, prev, pager, next, jumper",total:t.accountTotal},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)},E=[],C=(a("a9e3"),{name:"TableData",props:{accountTotal:{type:Number,default:0}},data:function(){return{headerStyle:{}}},methods:{handleSizeChange:function(t){this.$parent.handleSizeChange(t)},handleCurrentChange:function(t){this.$parent.handleCurrentChange(t)}}}),L=C,j=Object(h["a"])(L,w,E,!1,null,null,null),M=j.exports,T=a("94b0"),P={name:"Index",components:{searchPanel:f,chart:z,tableData:M},data:function(){return{loading:!1,tableData:[],date:"DAU",totalAmount:0,createdTimes:0,accountdata:[],accountTotal:0,pageData:{pagesize:25,page:1}}},provide:function(){return{group:this}},methods:{updatedTableData:function(t,e){switch(this.loading=!0,this.date){case"DAU":Object(T["b"])(t).then(this.callbackSuccess).catch(this.callbackError);break;case"WAU":Object(T["f"])(t).then(this.callbackSuccess).catch(this.callbackError);break;case"MAU":Object(T["d"])(t).then(this.callbackSuccess).catch(this.callbackError);break;case"NRU":Object(T["e"])(t).then(this.callbackSuccess).catch(this.callbackError);break}},callbackSuccess:function(t){var e=this,a=t.data;a.success?(this.accountTotal=a.content.total,this.tableData=a.content.data,this.tableData.sort((function(t,e){return e[0]-t[0]}))):(this.tableData=[],this.$message.warning(a.msg)),this.$nextTick((function(){e.$refs.pageContainer.scrollTo({top:0,behavior:"smooth"})})),this.loading=!1},callbackError:function(t){console.log(t),this.tableData=[],this.loading=!1},changeType:function(t){this.date!==t&&(this.date=t,this.initPage(),this.$refs.searchPanel.changeType(t),this.$refs.searchPanel.handleSearch())},handleSizeChange:function(t){this.pageData.pagesize=t,this.initPage(),this.$refs.searchPanel.handleSearch()},handleCurrentChange:function(t){this.pageData.page=t,this.$refs.searchPanel.handleSearch()},initPage:function(){this.pageData.page=1}}},N=P,R=(a("e97d"),Object(h["a"])(N,n,r,!1,null,"6374c40c",null));e["default"]=R.exports},"94b0":function(t,e,a){"use strict";a.d(e,"g",(function(){return r})),a.d(e,"h",(function(){return i})),a.d(e,"b",(function(){return s})),a.d(e,"a",(function(){return o})),a.d(e,"c",(function(){return c})),a.d(e,"f",(function(){return l})),a.d(e,"d",(function(){return u})),a.d(e,"e",(function(){return h}));var n=a("b775");function r(t){return Object(n["a"])({url:"/analysis_getremain",method:"post",data:t})}function i(t){return Object(n["a"])({url:"/analysis_getrevenue",method:"post",data:t})}function s(t){return Object(n["a"])({url:"/analysis/user/dau",method:"get",params:t})}function o(t){return Object(n["a"])({url:"/analysis/user",method:"get",params:t})}function c(t){return Object(n["a"])({url:"/analysis/user/log",method:"get",params:t})}function l(t){return Object(n["a"])({url:"/analysis/user/wau",method:"get",params:t})}function u(t){return Object(n["a"])({url:"/analysis/user/mau",method:"get",params:t})}function h(t){return Object(n["a"])({url:"/analysis/user/nru",method:"get",params:t})}},c281:function(t,e,a){},e97d:function(t,e,a){"use strict";a("c281")},f068:function(t,e,a){}}]);