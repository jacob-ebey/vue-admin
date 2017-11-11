webpackJsonp([25],{163:function(t,a,s){s(687);var e=s(0)(s(577),s(781),"data-v-63939ba7",null);t.exports=e.exports},577:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=s(2),i=s(6),o=Object.assign||function(t){for(var a=1;a<arguments.length;a++){var s=arguments[a];for(var e in s)Object.prototype.hasOwnProperty.call(s,e)&&(t[e]=s[e])}return t};a.default={components:{Tooltip:i.a},computed:o({},s.i(e.mapGetters)({loading:"loading"})),mounted:function(){this.loadProjects(!1),this.loadGateways(!1)},methods:o({},s.i(e.mapActions)(["doLoad"]),{loadProjects:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.doLoad({http:this.$http,whatToLoad:"projects",forceLoad:t})},loadGateways:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.doLoad({http:this.$http,whatToLoad:"gateways",forceLoad:t})}})}},645:function(t,a,s){a=t.exports=s(133)(!0),a.push([t.i,"","",{version:3,sources:[],names:[],mappings:"",file:"index.vue",sourceRoot:""}])},687:function(t,a,s){var e=s(645);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);s(134)("2e50b85e",e,!0)},781:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("div",{staticClass:"tile is-ancestor"},[s("div",{staticClass:"tile is-parent"},[s("article",{staticClass:"tile is-child box"},[s("router-link",{staticClass:"title",attrs:{tag:"h4",to:"projects"}},[t._v("Projects")]),t._v(" "),s("table",{staticClass:"table is-striped"},[s("thead",[s("tr",[s("th",[t.loading.projects.isLoading?s("button",{staticClass:"button is-white is-loading"}):t._e(),t._v(" "),t.loading.projects.isLoading?t._e():s("tooltip",{attrs:{label:"Reload projects",placement:"top-right"}},[s("button",{staticClass:"button is-small has-text-centered",on:{click:t.loadProjects}},[s("i",{staticClass:"fa fa-refresh center-icon"})])])],1),t._v(" "),s("th",[t._v("Name")]),t._v(" "),s("th",[t._v("ID")])])]),t._v(" "),t.loading.projects.data?s("tbody",t._l(t.loading.projects.data.slice(0,5),function(a){return s("router-link",{key:a.id,attrs:{to:"projects/view/"+a.id,tag:"tr"}},[s("td",[s("i",{staticClass:"fa fa-check has-text-success"})]),t._v(" "),s("td",[t._v(t._s(a.title))]),t._v(" "),s("td",[t._v(t._s(a.id))])])})):t._e()]),t._v(" "),t.loading.projects.isLoading?t._e():s("tooltip",{attrs:{label:"Add new project",placement:"bottom-right"}},[s("router-link",{staticClass:"button is-success has-text-centered",attrs:{to:"projects/add",tag:"button"}},[s("i",{staticClass:"fa fa-plus center-icon"})])],1),t._v(" "),t.loading.projects.isLoading?t._e():s("tooltip",{attrs:{label:"See all projects",placement:"bottom-right"}},[s("router-link",{staticClass:"button has-text-centered",attrs:{to:"projects",tag:"button"}},[s("i",{staticClass:"fa fa-ellipsis-h center-icon"})])],1)],1)]),t._v(" "),s("div",{staticClass:"tile is-parent"},[s("article",{staticClass:"tile is-child box"},[s("router-link",{staticClass:"title",attrs:{tag:"h4",to:"gateways"}},[t._v("Gateways")]),t._v(" "),s("table",{staticClass:"table is-striped"},[s("thead",[s("tr",[s("th",[t.loading.gateways.isLoading?s("button",{staticClass:"button is-white is-loading"}):t._e(),t._v(" "),t.loading.gateways.isLoading?t._e():s("tooltip",{attrs:{label:"Reload gateways",placement:"top-right"}},[s("button",{staticClass:"button is-small has-text-centered",on:{click:t.loadGateways}},[s("i",{staticClass:"fa fa-refresh center-icon"})])])],1),t._v(" "),s("th",[t._v("Name")]),t._v(" "),s("th",[t._v("ID")])])]),t._v(" "),t.loading.gateways.data?s("tbody",t._l(t.loading.gateways.data.slice(5,10),function(a){return s("router-link",{key:a.id,attrs:{to:"gateways/view/"+a.id,tag:"tr"}},[s("td",[s("i",{staticClass:"fa fa-check has-text-success"})]),t._v(" "),s("td",[t._v(t._s(a.title))]),t._v(" "),s("td",[t._v(t._s(a.id))])])})):t._e()]),t._v(" "),t.loading.gateways.isLoading?t._e():s("tooltip",{attrs:{label:"Add new gateway",placement:"bottom-right"}},[s("router-link",{staticClass:"button is-success has-text-centered",attrs:{to:"gateways/add",tag:"button"}},[s("i",{staticClass:"fa fa-plus center-icon"})])],1),t._v(" "),t.loading.gateways.isLoading?t._e():s("tooltip",{attrs:{label:"See all gateways",placement:"bottom-right"}},[s("router-link",{staticClass:"button has-text-centered",attrs:{to:"gateways",tag:"button"}},[s("i",{staticClass:"fa fa-ellipsis-h center-icon"})])],1)],1)])])])},staticRenderFns:[]}}});
//# sourceMappingURL=25.2574898d626c5074a692.js.map