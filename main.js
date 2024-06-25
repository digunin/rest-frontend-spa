(()=>{"use strict";var e,t,n,r,o,a={4573:(e,t,n)=>{n.d(t,{B:()=>d,_:()=>f});var r=n(5816),o=n(378),a=n(4549),i=n(4092),c=n(3496),u=a.D.HOST_URL,s=a.D.LOGIN_URL,l=a.g.POST,d=(0,r.xP)({reducerPath:"signIn",baseQuery:(0,o.cw)({baseUrl:u}),endpoints:function(e){return{login:e.mutation({query:function(e){return{url:s,method:l,body:e}},transformResponse:i.S,transformErrorResponse:c.Mv})}}}),f=d.useLoginMutation},3496:(e,t,n)=>{n.d(t,{Lc:()=>b,Mv:()=>h,c3:()=>v,c5:()=>y,cX:()=>E,eV:()=>O});var r=n(5816),o=n(378),a=n(4549),i=n(4092),c=n(967),u=a.D.HOST_URL,s=a.D.READ_URL,l=a.D.CREATE_URL,d=a.D.UPDATE_URL,f=a.D.DELETE_URL,m=a.g.POST,p=a.g.PUT,g=a.g.DELETE,h=function(e){return 403===e.status?Promise.reject(c._L.accessDeny):Promise.reject(e.status)},y=(0,r.xP)({reducerPath:"database",tagTypes:["Rows"],baseQuery:(0,o.cw)({baseUrl:u,prepareHeaders:function(e,t){var n=(0,t.getState)().userState.token;return n&&e.set("x-auth",n),e}}),endpoints:function(e){return{loadData:e.query({query:function(){return{url:s}},providesTags:function(e){return e?e.map((function(e){return{type:"Rows",id:e.id}})):[]},transformResponse:i.S,transformErrorResponse:h}),createRow:e.mutation({query:function(e){return{url:l,method:m,body:e}},invalidatesTags:["Rows"],transformResponse:i.S,transformErrorResponse:h}),updateRow:e.mutation({query:function(e){var t=e.id,n=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n}(e,["id"]);return{url:"".concat(d,"/").concat(t),method:p,body:n}},invalidatesTags:["Rows"],transformResponse:i.S,transformErrorResponse:h}),deleteRow:e.mutation({query:function(e){return{url:"".concat(f,"/").concat(e),method:g}},invalidatesTags:["Rows"],transformResponse:i.S,transformErrorResponse:h})}}}),v=y.useLoadDataQuery,b=y.useCreateRowMutation,E=y.useUpdateRowMutation,O=y.useDeleteRowMutation},4549:(e,t,n)=>{n.d(t,{D:()=>o,g:()=>a});var r=n(1470),o=r.A?{HOST_URL:"https://test.v5.pryaniky.com",LOGIN_URL:"/ru/data/v3/testmethods/docs/login",READ_URL:"/ru/data/v3/testmethods/docs/userdocs/get",CREATE_URL:"/ru/data/v3/testmethods/docs/userdocs/create",UPDATE_URL:"/ru/data/v3/testmethods/docs/userdocs/set",DELETE_URL:"/ru/data/v3/testmethods/docs/userdocs/delete"}:{HOST_URL:"http://localhost:3300",LOGIN_URL:"login",READ_URL:"data",CREATE_URL:"data",UPDATE_URL:"data",DELETE_URL:"data"},a=r.A?{GET:"GET",POST:"POST",PUT:"POST",DELETE:"POST"}:{GET:"GET",POST:"POST",PUT:"PUT",DELETE:"DELETE"}},6386:(e,t,n)=>{n.d(t,{A:()=>i});var r=n(6540),o=n(7458),a=n(9067);const i=function(e){var t={height:"5px"};return e.show?r.createElement(o.A,{sx:t}):r.createElement(a.A,{component:"div",sx:t})}},9934:(e,t,n)=>{n.d(t,{A:()=>m});var r=n(7414),o=n(4389),a=n(7037),i=n(6831),c=n(2477),u=n(7867),s=n(8763),l=n(6990),d=n(6540),f=n(967);const m=function(e){var t,n=e.title,m=e.body,p=e.open,g=e.onClose,h=e.onConfirm,y=(0,d.useState)(!1),v=y[0],b=y[1];return d.createElement(a.A,{open:p,onClose:g,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},d.createElement(i.A,{id:"alert-dialog-title"},n),d.createElement(c.A,null,d.createElement(u.A,{id:"alert-dialog-description"},m)),d.createElement(s.A,null,d.createElement(r.A,{control:d.createElement(o.A,{checked:v,onChange:function(){return b(!v)}}),label:f.R_.askConfirm,labelPlacement:"end"})),d.createElement(s.A,null,d.createElement(l.A,{onClick:(t=!v,function(){h(t)})},"Удалить"),d.createElement(l.A,{onClick:g,autoFocus:!0},"Отмена")))}},9789:(e,t,n)=>{n.d(t,{G:()=>o});var r=n(6540),o=function(){var e=(0,r.useState)(!0),t=e[0],n=e[1],o=(0,r.useState)(),a=o[0],i=o[1],c=(0,r.useCallback)((function(){i(void 0)}),[]),u=(0,r.useCallback)((function(){return function(e){n(e),a&&(a(),i(void 0))}}),[a]);return{askConfirm:t,confirmOpen:a,onClose:c,onConfirm:u,setConfirmOpen:i}}},4213:(e,t,n)=>{n.d(t,{k:()=>u});var r=n(6540),o=n(7514),a=n(1641),i=n(7809);const c=function(e){var t=e.onclose;return r.createElement(r.Fragment,null,r.createElement(a.A,{size:"small","aria-label":"close",color:"inherit",onClick:t},r.createElement(i.A,{fontSize:"small"})))};var u=function(){var e=(0,o.dh)().enqueueSnackbar;return{showSnackbar:function(t,n){t&&e(t,{variant:n||"error",action:function(e){return r.createElement(c,{onclose:function(){return(0,o.mk)(e)}})}})}}}},8774:(e,t,n)=>{n.d(t,{m:()=>a});var r=n(9127),o=function(){return o=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},o.apply(this,arguments)},a=function(e,t){var n=(0,r.jL)();return{formPayload:i(e),handleChange:function(e){return function(r,o){n(t(e,r,o))}},dispatch:n}},i=function(e){return Object.keys(e).reduce((function(t,n){var r,a=((r={})[n]=e[n].value,r);return o(o({},t),a)}),{})}},2731:(e,t,n)=>{var r=n(6540),o=n(5338),a=n(1468),i=n(7834),c=n(9127),u=function(){var e=(0,c.GV)((function(e){return e.userState})),t=e.username,n=e.token;return{isAuth:!!n,username:t,token:n}},s=n(8987),l=function(e){s.A.remove(e)},d=function(e){return s.A.get(e)},f=n(1817),m=n(538),p=n(3496),g=n(8774),h=n(1680),y=n(8773),v=n(9789),b=function(){return b=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},b.apply(this,arguments)},E=n(6386),O=n(9934),w=function(){return w=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},w.apply(this,arguments)},A=(0,r.lazy)((function(){return Promise.all([n.e(76),n.e(765),n.e(239),n.e(103),n.e(77)]).then(n.bind(n,77))})),R=(0,r.lazy)((function(){return Promise.all([n.e(76),n.e(765),n.e(396),n.e(382)]).then(n.bind(n,2382))}));const S=function(){var e=(0,p.c3)(),t=e.data,n=e.isLoading,o=(0,c.GV)((function(e){return e.dbRowModeState.muiDataGridView})),a=function(){var e=(0,c.GV)((function(e){return e.dbRowModeState})),t=e.isCreate,n=e.isEdit,o=(0,c.GV)((function(e){return e.dbRecordFormState})),a=(0,c.GV)(h.pd),i=(0,g.m)(o,h.qg),u=i.formPayload,s=i.handleChange,l=i.dispatch,d=(0,v.G)(),f=d.askConfirm,m=d.confirmOpen,E=d.onClose,O=d.onConfirm,w=d.setConfirmOpen,A=(0,p.c3)().data,R=(0,p.Lc)()[0],S=(0,p.cX)()[0],_=(0,p.eV)()[0],D=(0,r.useCallback)((function(){l((0,h._H)()),a&&(t&&R(u).unwrap().then((function(){l((0,h.E2)()),l((0,y.fd)())})).catch((function(e){})),null!==n&&S(b({id:n},u)).unwrap().then((function(){l((0,h.E2)()),l((0,y.fd)())})).catch((function(e){})))}),[a,t,u,n]),P=(0,r.useCallback)((function(e){l((0,y.op)(e));var t=A.find((function(t){return t.id===e})),n=(t.id,function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n}(t,["id"]));l((0,h.x1)(n))}),[A]),k=(0,r.useCallback)((function(){l((0,y.fd)()),l((0,h.E2)())}),[]);return{oninput:s,onedit:P,ondelete:(0,r.useCallback)((function(e){f?w((function(){return function(){return _(e)}})):_(e)}),[f]),onsave:D,oncancel:k,onCreate:(0,r.useCallback)((function(){l((0,y.xp)())}),[]),confirmOpen:m,onClose:E,onConfirm:O,isCreate:t,isEdit:n,inputFields:o}}(),i=a.isCreate,u=a.isEdit,s=a.inputFields,l=a.confirmOpen,d=a.onClose,f=a.onConfirm,S=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n}(a,["isCreate","isEdit","inputFields","confirmOpen","onClose","onConfirm"]),_=(0,c.GV)((function(e){return e.databaseStatusState.fetchingID}));return r.createElement(r.Suspense,null,r.createElement(m.A,null,o?r.createElement(R,{data:t||[],loading:n}):r.createElement(r.Fragment,null,r.createElement(E.A,{show:n}),r.createElement(A,w({data:t||[],oneLineRowBreakpoint:"lg",isCreate:i,isEdit:u,inputFields:s,fetchingID:_},S)),r.createElement(O.A,{title:"Подтвердите удаление",body:"",open:!!l,onClose:d,onConfirm:f()}))))};var _=n(4213),D=n(967),P=n(9828),k=n(9067),j=n(4073),C=n(1641),L=n(7451),T=n(8532),M=n(6990);const x=function(){var e=(0,c.jL)(),t=u(),n=t.isAuth,o=t.username,a=(0,c.GV)((function(e){return e.dbRowModeState.muiDataGridView}));return r.createElement(k.A,{sx:{flexGrow:1}},r.createElement(P.A,{position:"fixed"},r.createElement(T.A,{sx:{paddingRight:{xs:1},minHeight:{xs:"".concat(56,"px")}}},r.createElement(j.A,{variant:"h6",component:"div",sx:{flexGrow:1}},D.R_.app_bar_title),n&&r.createElement(r.Fragment,null,r.createElement(k.A,{sx:{backgroundColor:"white",mr:3,borderRadius:"5px"}},r.createElement(M.A,{size:"small",variant:"outlined",onClick:function(){return e((0,y.rX)())}},"Включить ".concat(a?"собственный компонент":"MUI DataGrid"))),r.createElement(j.A,{variant:"h6",component:"span"},o),r.createElement(C.A,{size:"medium",color:"inherit","aria-label":"logout",sx:{ml:1},onClick:function(){e((0,f.g)({username:null,token:null}))}},r.createElement(L.A,null))))))};var I=(0,r.lazy)((function(){return Promise.all([n.e(76),n.e(239),n.e(854)]).then(n.bind(n,3854))}));var F=n(5793),U=(0,n(6544).A)({components:{MuiButton:{defaultProps:{disableRipple:!0}},MuiTextField:{defaultProps:{size:"small",margin:"dense"}}}}),V=n(7514),G=document.getElementById("root");(0,o.H)(G).render(r.createElement(r.StrictMode,null,r.createElement(a.Kq,{store:c.M_},r.createElement(F.A,{theme:U},r.createElement(V.n,{maxSnack:3},r.createElement((function(){var e,t,n,o,a,m=function(){var e=(0,c.jL)(),t=u(),n=t.isAuth,o=t.username,a=t.token,i=(0,r.useState)(!0),m=i[0],p=i[1];return(0,r.useEffect)((function(){var t={username:d("username")||null,token:d("token")||null},n=t.username,r=t.token;e(n&&r?(0,f.g)({username:n,token:r}):(0,f.g)({username:null,token:null})),p(!1)}),[]),(0,r.useEffect)((function(){var e;n||m||(l("username"),l("token")),n&&!m&&o&&a&&(e={username:o,token:a},Object.keys(e).forEach((function(t){return s.A.set(t,e[t])})))}),[n]),{isAuth:n,username:o}}().isAuth;return t=(0,c.jL)(),n=(0,_.k)().showSnackbar,o=(e=(0,c.GV)((function(e){return e.userState})),{loading:"loading"===e.status,error:e.error}).error,a=(0,c.GV)((function(e){return e.databaseStatusState.error})),(0,r.useEffect)((function(){o&&n(o),a&&n(a),a===D.Jm[D._L.accessDeny]&&t((0,f.g)({username:null,token:null}))}),[o,a]),r.createElement(r.Fragment,null,r.createElement(x,null),r.createElement(i.A,{id:"app",maxWidth:"lg",sx:{mt:"".concat(56,"px")}},!m&&r.createElement(r.Suspense,null,r.createElement(I,null)),m&&r.createElement(S,null)))}),null))))))},6017:(e,t,n)=>{n.d(t,{A:()=>f,c:()=>u});var r=n(5307),o=n(967),a=n(3496),i=n(4573),c=function(e,t,n){if(n||2===arguments.length)for(var r,o=0,a=t.length;o<a;o++)!r&&o in t||(r||(r=Array.prototype.slice.call(t,0,o)),r[o]=t[o]);return e.concat(r||Array.prototype.slice.call(t))},u="new-row",s=function(e){return o.Jm[e]||e},l=function(e,t){return e.includes(t)?e:c(c([],e,!0),[t],!1)},d=function(e,t){return e.filter((function(e){return e!==t}))};const f=(0,r.Z0)({name:"database-errors",initialState:{error:"",fetchingID:[]},reducers:{},extraReducers:function(e){e.addMatcher(i.B.endpoints.login.matchPending,(function(e,t){e.error=""})),e.addMatcher(a.c5.endpoints.loadData.matchRejected,(function(e,t){e.error=s(t.error.message||"")})),e.addMatcher(a.c5.endpoints.createRow.matchRejected,(function(e,t){e.error=s(t.error.message||""),e.fetchingID=d(e.fetchingID,u)})),e.addMatcher(a.c5.endpoints.createRow.matchPending,(function(e,t){e.fetchingID=l(e.fetchingID,u)})),e.addMatcher(a.c5.endpoints.createRow.matchFulfilled,(function(e,t){e.fetchingID=d(e.fetchingID,u)})),e.addMatcher(a.c5.endpoints.updateRow.matchRejected,(function(e,t){e.error=s(t.error.message||"");var n=t.meta.arg.originalArgs.id;e.fetchingID=d(e.fetchingID,n)})),e.addMatcher(a.c5.endpoints.updateRow.matchPending,(function(e,t){var n=t.meta.arg.originalArgs.id;e.fetchingID=l(e.fetchingID,n)})),e.addMatcher(a.c5.endpoints.updateRow.matchFulfilled,(function(e,t){var n=t.meta.arg.originalArgs.id;e.fetchingID=d(e.fetchingID,n)})),e.addMatcher(a.c5.endpoints.deleteRow.matchRejected,(function(e,t){e.error=s(t.error.message||"");var n=t.meta.arg.originalArgs;e.fetchingID=d(e.fetchingID,n)})),e.addMatcher(a.c5.endpoints.deleteRow.matchPending,(function(e,t){var n=t.meta.arg.originalArgs;e.fetchingID=l(e.fetchingID,n)})),e.addMatcher(a.c5.endpoints.deleteRow.matchFulfilled,(function(e,t){var n=t.meta.arg.originalArgs;e.fetchingID=d(e.fetchingID,n)}))}}).reducer},8773:(e,t,n)=>{n.d(t,{Ay:()=>d,fd:()=>c,op:()=>s,rX:()=>l,xp:()=>u});var r,o=n(5307),a=function(){return a=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},a.apply(this,arguments)},i=(0,o.Z0)({name:"rowMode",initialState:{isView:!0,isCreate:!1,isEdit:null,muiDataGridView:!1},reducers:{setViewMode:function(e){return a(a({},e),{isView:!0,isCreate:!1,isEdit:null})},setCreateMoode:function(e){return a(a({},e),{isView:!1,isCreate:!0,isEdit:null})},setEditMode:function(e,t){return a(a({},e),{isView:!1,isCreate:!1,isEdit:t.payload})},toggleDBViewMode:function(e){e.muiDataGridView=!e.muiDataGridView}}}),c=(r=i.actions).setViewMode,u=r.setCreateMoode,s=r.setEditMode,l=r.toggleDBViewMode;const d=i.reducer},1680:(e,t,n)=>{n.d(t,{Ay:()=>g,E2:()=>p,_H:()=>m,pd:()=>l,qg:()=>f,x1:()=>d});var r,o=n(5307),a=n(8589),i=n(7584),c=n(967),u=function(){return u=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},u.apply(this,arguments)},s=(0,o.Z0)((0,a.F2)("dbrecord",{setDbrecordInputField:a.Kv},{employeeNumber:u(u({},i.i),{error:c._L.notEmpty}),employeeSigDate:u(u({},i.i),{error:c._L.notEmpty}),documentStatus:u(u({},i.i),{error:c._L.notEmpty}),documentType:u(u({},i.i),{error:c._L.notEmpty}),documentName:u(u({},i.i),{error:c._L.notEmpty}),companySigDate:u(u({},i.i),{error:c._L.notEmpty}),companySignatureName:u(u({},i.i),{error:c._L.notEmpty}),employeeSignatureName:u(u({},i.i),{error:c._L.notEmpty})})),l=function(e){return(0,a.HK)(e.dbRecordFormState)},d=(r=s.actions).setInitialValues,f=r.setDbrecordInputField,m=r.setTouchedAll,p=r.resetForm;const g=s.reducer},8589:(e,t,n)=>{n.d(t,{F2:()=>o,HK:()=>a,Kv:()=>i});var r=function(){return r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},r.apply(this,arguments)},o=function(e,t,n){return{name:"form/".concat(e),initialState:n,reducers:r({setInitialValues:function(e,t){var n=t.payload;Object.keys(n).forEach((function(t){var r=t,o=n[r];e[r].value=o,""!==o&&(e[r].error="")}))},setTouchedAll:function(e){for(var t=0,n=Object.keys(e);t<n.length;t++)e[n[t]].unTouched=!1},resetForm:function(e){return n}},t)}},a=function(e){for(var t=0,n=Object.values(e);t<n.length;t++)if(n[t].error)return!1;return!0},i={reducer:function(e,t){e[t.payload.name]=r(r({},t.payload.inputPayload),{unTouched:!1})},prepare:function(e,t,n){return{payload:{name:e,inputPayload:{value:t,error:n}}}}}},3278:(e,t,n)=>{n.d(t,{Ay:()=>p,E2:()=>m,_H:()=>f,mA:()=>d,pd:()=>l});var r,o=n(5307),a=n(8589),i=n(7584),c=n(967),u=function(){return u=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},u.apply(this,arguments)},s=(0,o.Z0)((0,a.F2)("login",{setLoginInputField:a.Kv},{username:u(u({},i.i),{error:c._L.notEmpty}),password:u(u({},i.i),{error:c._L.notEmpty})})),l=function(e){return(0,a.HK)(e.loginFormState)},d=((r=s.actions).setInitialValues,r.setLoginInputField),f=r.setTouchedAll,m=r.resetForm;const p=s.reducer},7584:(e,t,n)=>{n.d(t,{i:()=>r});var r={error:"",value:"",unTouched:!0}},9127:(e,t,n)=>{n.d(t,{M_:()=>p,jL:()=>g,GV:()=>h});var r,o=n(5307),a=n(1468),i=n(1817),c=n(3278),u=n(1680),s=n(4573),l=n(3496),d=n(6017),f=n(8773);const m=((r={userState:i.A,loginFormState:c.Ay,dbRecordFormState:u.Ay,databaseStatusState:d.A})[s.B.reducerPath]=s.B.reducer,r[l.c5.reducerPath]=l.c5.reducer,r.dbRowModeState=f.Ay,r);var p=(0,o.U1)({reducer:m,middleware:function(e){return e().concat(s.B.middleware).concat(l.c5.middleware)}}),g=a.wA,h=a.d4},1817:(e,t,n)=>{n.d(t,{A:()=>u,g:()=>c});var r=n(5307),o=n(967),a=n(4573),i=(0,r.Z0)({name:"user",initialState:{username:null,token:null,status:"idle",error:""},reducers:{setUser:function(e,t){var n=t.payload,r=n.username,o=n.token;e.username=r,e.token=o}},extraReducers:function(e){e.addMatcher(a.B.endpoints.login.matchPending,(function(e){e.status="loading",e.error=""})),e.addMatcher(a.B.endpoints.login.matchRejected,(function(e,t){var n=t.error.message;e.status="failed";var r=n===o._L.accessDeny?o._L.signIn:"";e.error=r||o.Jm[n||"unknown"]})),e.addMatcher(a.B.endpoints.login.matchFulfilled,(function(e,t){var n=t.payload.token,r=t.meta;e.status="idle",e.error="",e.token=n,e.username=r.arg.originalArgs.username}))}}),c=i.actions.setUser;const u=i.reducer},1470:(e,t,n)=>{n.d(t,{A:()=>r});const r=!0},967:(e,t,n)=>{var r;n.d(t,{Jm:()=>a,R_:()=>i,_5:()=>c,_L:()=>o});var o={notEmpty:"Поле не должно быть пустым",accessDeny:"Access deny",signIn:"Неверный логин или пароль",documentNotFound:"Document not found",aborted:"Aborted",abortedErrorName:"AbortError",unknown_error:"Неизвестная ошибка"},a=((r={})["Access deny"]="Требуется авторизация",r["Document not found"]="Документ не найден",r["Bad request"]="Некорректный запрос",r.Aborted="Отмена",r.FETCH_ERROR="Проблема с соединением",r.unknown="Неизвестная ошибка",r),i={login:"Логин",password:"Пароль",app_bar_title:"База данных",addNewRecord:"Добавить запись",abortFetch:"Отменить отправку",askConfirm:"больше не спрашивать"},c={employeeNumber:"employee number",employeeSigDate:"employee signature date",documentStatus:"document status",documentType:"document type",documentName:"document name",companySigDate:"company signature date",companySignatureName:"company signature name",employeeSignatureName:"employee signature name"}},4092:(e,t,n)=>{n.d(t,{S:()=>r});var r=n(1470).A?function(e){var t=e.error_code,n=e.data,r=e.error_message,o=e.error_text;return 0===t?n:Promise.reject(o||r)}:function(e){return e}}},i={};function c(e){var t=i[e];if(void 0!==t)return t.exports;var n=i[e]={exports:{}};return a[e].call(n.exports,n,n.exports,c),n.exports}c.m=a,e=[],c.O=(t,n,r,o)=>{if(!n){var a=1/0;for(l=0;l<e.length;l++){for(var[n,r,o]=e[l],i=!0,u=0;u<n.length;u++)(!1&o||a>=o)&&Object.keys(c.O).every((e=>c.O[e](n[u])))?n.splice(u--,1):(i=!1,o<a&&(a=o));if(i){e.splice(l--,1);var s=r();void 0!==s&&(t=s)}}return t}o=o||0;for(var l=e.length;l>0&&e[l-1][2]>o;l--)e[l]=e[l-1];e[l]=[n,r,o]},c.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return c.d(t,{a:t}),t},n=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,c.t=function(e,r){if(1&r&&(e=this(e)),8&r)return e;if("object"==typeof e&&e){if(4&r&&e.__esModule)return e;if(16&r&&"function"==typeof e.then)return e}var o=Object.create(null);c.r(o);var a={};t=t||[null,n({}),n([]),n(n)];for(var i=2&r&&e;"object"==typeof i&&!~t.indexOf(i);i=n(i))Object.getOwnPropertyNames(i).forEach((t=>a[t]=()=>e[t]));return a.default=()=>e,c.d(o,a),o},c.d=(e,t)=>{for(var n in t)c.o(t,n)&&!c.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},c.f={},c.e=e=>Promise.all(Object.keys(c.f).reduce(((t,n)=>(c.f[n](e,t),t)),[])),c.u=e=>e+".js",c.miniCssF=e=>{},c.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),c.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r={},o="test-frontend-spa:",c.l=(e,t,n,a)=>{if(r[e])r[e].push(t);else{var i,u;if(void 0!==n)for(var s=document.getElementsByTagName("script"),l=0;l<s.length;l++){var d=s[l];if(d.getAttribute("src")==e||d.getAttribute("data-webpack")==o+n){i=d;break}}i||(u=!0,(i=document.createElement("script")).charset="utf-8",i.timeout=120,c.nc&&i.setAttribute("nonce",c.nc),i.setAttribute("data-webpack",o+n),i.src=e),r[e]=[t];var f=(t,n)=>{i.onerror=i.onload=null,clearTimeout(m);var o=r[e];if(delete r[e],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach((e=>e(n))),t)return t(n)},m=setTimeout(f.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=f.bind(null,i.onerror),i.onload=f.bind(null,i.onload),u&&document.head.appendChild(i)}},c.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;c.g.importScripts&&(e=c.g.location+"");var t=c.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");if(n.length)for(var r=n.length-1;r>-1&&(!e||!/^http(s?):/.test(e));)e=n[r--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),c.p=e})(),(()=>{var e={792:0};c.f.j=(t,n)=>{var r=c.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else{var o=new Promise(((n,o)=>r=e[t]=[n,o]));n.push(r[2]=o);var a=c.p+c.u(t),i=new Error;c.l(a,(n=>{if(c.o(e,t)&&(0!==(r=e[t])&&(e[t]=void 0),r)){var o=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;i.message="Loading chunk "+t+" failed.\n("+o+": "+a+")",i.name="ChunkLoadError",i.type=o,i.request=a,r[1](i)}}),"chunk-"+t,t)}},c.O.j=t=>0===e[t];var t=(t,n)=>{var r,o,[a,i,u]=n,s=0;if(a.some((t=>0!==e[t]))){for(r in i)c.o(i,r)&&(c.m[r]=i[r]);if(u)var l=u(c)}for(t&&t(n);s<a.length;s++)o=a[s],c.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return c.O(l)},n=self.webpackChunktest_frontend_spa=self.webpackChunktest_frontend_spa||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var u=c.O(void 0,[178],(()=>c(2731)));u=c.O(u)})();
//# sourceMappingURL=main.js.map