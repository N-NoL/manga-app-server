(this.webpackJsonpmanga=this.webpackJsonpmanga||[]).push([[31],{179:function(e,t,a){"use strict";a.r(t);var n=a(70),r=a(55),c=a(1),l=a.n(c),i=a(523),o=a(370),s=a(157),m=a(367),u=a(369),p=a(556),d=a(372),b=a(267),g=a(169),f=a(557),E=a(166),h=a(149),v=a(371),y=a(373),O=a(230),j=a(57),k=a(62),x=a(58),N=a(60),w=a.n(N),S=a(61),C=a(565),I=a(266),T=a(167),L=a(134),U=a(168),R=a(566),D=a(205),F=a(206),P=a.n(F),z=a(63),A=a.n(z),B=a(366);var q=Object(E.a)((function(e){return{root:{padding:0,paddingTop:8,paddingBottom:8,width:392},item:{height:80,padding:"0px 8px"},text:{paddingTop:e.spacing(1)},itemImg:{height:60,marginRight:e.spacing(1),marginLeft:e.spacing(.5)}}})),J=function(e){return l.a.createElement(m.a,Object.assign({},e,{component:j.b}))},K=function(e){var t=e.sub,a=q(),n=l.a.useState([]),i=Object(r.a)(n,2),o=i[0],s=i[1],m=l.a.useState(!0),u=Object(r.a)(m,2),p=u[0],d=u[1],b=function(){var e=Object(S.a)(w.a.mark((function e(t){var a;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d(!0),e.prev=1,e.next=4,A.a.get("".concat("https://manga-in.space/server-api","/manga/search?sub=").concat(t));case 4:a=e.sent,s(a.data.list),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),s([]),console.log("\ud83d\ude31 Axios request failed: ".concat(e.t0));case 12:d(!1);case 13:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(){b(t)}),[t]),o.length||p?l.a.createElement("div",null,l.a.createElement(I.a,{className:a.root},o.map((function(e){return l.a.createElement(T.a,{key:e.id,to:k.b.Manga.link(e.id),component:J,alignItems:"flex-start",className:a.item},l.a.createElement(U.a,null,l.a.createElement("img",{src:e.imgUrl,className:a.itemImg})),l.a.createElement(L.a,{className:a.text,primary:e.title,secondary:e.englishTitle}))})))):l.a.createElement("div",{style:{padding:16}},l.a.createElement(B.a,{variant:"subtitle1",component:"h6",className:a.subTitle},"\u041d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e"))},M=Object(E.a)((function(e){return{root:{padding:0,paddingTop:8,paddingBottom:8,width:392},item:{height:64,padding:"0px 8px"},itemImg:{height:48,marginRight:e.spacing(1),marginLeft:e.spacing(.5)}}})),_=function(e){var t=e.sub,a=M(),n=l.a.useState([]),i=Object(r.a)(n,2),o=i[0],m=i[1],u=l.a.useState(!0),p=Object(r.a)(u,2),d=p[0],b=p[1],g=function(){var e=Object(S.a)(w.a.mark((function e(t){var a;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return b(!0),e.prev=1,e.next=4,A.a.get("".concat("https://manga-in.space/server-api","/user/search?sub=").concat(t));case 4:a=e.sent,m(a.data.list),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),m([]),console.log("\ud83d\ude31 Axios request failed: ".concat(e.t0));case 12:b(!1);case 13:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(){g(t)}),[t]),o.length||d?l.a.createElement("div",null,l.a.createElement(I.a,{className:a.root},o.map((function(e){return l.a.createElement(T.a,{key:e.id,to:k.b.User.link(e.id),component:J,alignItems:"flex-start",className:a.item},l.a.createElement(U.a,null,l.a.createElement(s.a,{alt:e.username,src:e.imgUrl})),l.a.createElement(L.a,{className:a.text,primary:e.username,secondary:e.isOnline?"Online":"offline"}))})))):l.a.createElement("div",{style:{padding:16}},l.a.createElement(B.a,{variant:"subtitle1",component:"h6",className:a.subTitle},"\u041d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e"))},H=Object(E.a)((function(e){return Object(C.a)({root:{position:"relative"},dropdown:{display:"flex",flexDirection:"column",alignItems:"center",position:"absolute",width:400,top:48,right:0,zIndex:1,boxShadow:e.overrides.MuiPaper.boxShadow,backgroundColor:e.palette.background.paper},tabs:{width:"100%"},divider:{width:"100%"}})}));function W(){var e=H(),t=l.a.useState(!1),a=Object(r.a)(t,2),n=a[0],s=a[1],m=l.a.useState(0),p=Object(r.a)(m,2),d=p[0],b=p[1],g=l.a.useState(""),f=Object(r.a)(g,2),E=f[0],v=f[1],y=l.a.useState(""),O=Object(r.a)(y,2),j=O[0],k=O[1],x=function(e,t){var a=Object(c.useState)(e),n=Object(r.a)(a,2),l=n[0],i=n[1];return Object(c.useEffect)((function(){var a=setTimeout((function(){i(e)}),t);return function(){clearTimeout(a)}}),[e]),l}(E,100);Object(c.useEffect)((function(){k(x)}),[x]);return l.a.createElement(u.a,{onClickAway:function(){v(""),s(!1)}},l.a.createElement("div",{className:e.root},l.a.createElement("div",{style:{padding:"2px 8px",display:"flex",alignItems:"center"}},l.a.createElement(R.a,{value:E,onChange:function(e){return v(e.target.value)},onFocus:function(){s(!0)},placeholder:"\u041f\u043e\u0438\u0441\u043a"}),l.a.createElement(D.a,{size:"small"},l.a.createElement(P.a,null))),n?l.a.createElement("div",{className:"".concat(e.dropdown," search")},l.a.createElement(i.a,{centered:!0,className:e.tabs,value:d,indicatorColor:"primary",textColor:"primary",onChange:function(e,t){return b(t)},"aria-label":"disabled tabs example"},l.a.createElement(o.a,{className:e.tab,label:"\u043c\u0430\u043d\u0433\u0430"}),l.a.createElement(o.a,{className:e.tab,label:"\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c"})),l.a.createElement(h.a,{className:e.divider}),j.trim().length>=3?l.a.createElement("div",null,d?l.a.createElement(_,{sub:j}):l.a.createElement(K,{sub:j})):l.a.createElement("div",{style:{padding:16}},l.a.createElement(B.a,{variant:"subtitle1",component:"h6",className:e.subTitle},"\u0414\u043b\u044f \u043f\u043e\u0438\u0441\u043a\u0430 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0435 \u043c\u0435\u043d\u0435\u0435 \u0442\u0440\u0435\u0445 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"))):null))}var G=a(139),Q=a(207),V=a.n(Q),X=a(564),Y=Object(E.a)((function(e){return{root:{backgroundColor:e.palette.background.paper},toolBar:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingLeft:e.spacing(1.5),paddingRight:e.spacing(1.5),minHeight:48},divider:{height:30,margin:e.spacing(1)},button:{margin:e.spacing(.5)},logo:{borderRadius:0,margin:e.spacing(.5)},tabs:{marginLeft:e.spacing(1.5)},indicator:{opacity:0},selected:{color:"rgba(0, 0, 0, 0.54) !important"},tab:{minWidth:0}}})),Z=Object(x.c)((function(e){var t=e.authStore,a=l.a.useState(2),n=Object(r.a)(a,2),u=n[0],p=n[1],d=l.a.useState(!1),b=Object(r.a)(d,2),g=b[0],f=b[1],E=Y(g),x=Object(O.h)().pathname;Object(c.useEffect)((function(){var e=null;k.c.map((function(t,a){t.path==x&&(e=a,f(!0),p(e))})),null===e&&f(!1)}),[x]);return l.a.createElement(v.a,{elevation:3,className:E.root},l.a.createElement(y.a,{className:E.toolBar},l.a.createElement(X.a,{mdUp:!0},l.a.createElement(te,null)),l.a.createElement(X.a,{smDown:!0},l.a.createElement("div",{style:{display:"flex",alignItems:"center"}},l.a.createElement(s.a,{component:j.b,to:"/",src:"/logo192.png",className:E.logo}),l.a.createElement(i.a,{classes:g?{root:E.tabs}:{root:E.tabs,indicator:E.indicator},value:u,indicatorColor:"primary",textColor:"primary","aria-label":"disabled tabs example"},k.c.map((function(e){return l.a.createElement(o.a,{classes:g||{selected:E.selected},key:e.name,component:j.b,to:e.path,className:E.tab,label:e.ruName})}))))),l.a.createElement("div",{style:{display:"flex",alignItems:"center"}},l.a.createElement(W,null),l.a.createElement(h.a,{orientation:"vertical",className:E.divider}),null===t.current_user?l.a.createElement(l.a.Fragment,null,l.a.createElement(m.a,{component:j.b,to:k.b.SignIn.path,size:"small",className:E.button},"\u0412\u043e\u0439\u0442\u0438"),l.a.createElement(m.a,{component:j.b,to:k.b.SignUp.path,variant:"outlined",size:"small",color:"secondary",className:E.button},"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f")):l.a.createElement(l.a.Fragment,null,l.a.createElement(ee,{user:t.current_user,logout:t.logout})))))})),$=Object(E.a)((function(e){return{root:{display:"flex"},paper:{marginRight:e.spacing(2)}}}));function ee(e){var t=e.user,a=e.logout,n=(Object(O.g)(),$()),c=l.a.useState(!1),i=Object(r.a)(c,2),o=i[0],s=i[1],E=l.a.useRef(null),h=function(e){E.current&&E.current.contains(e.target)||s(!1)};function v(e){"Tab"===e.key&&(e.preventDefault(),s(!1))}var y=l.a.useRef(o);return l.a.useEffect((function(){!0===y.current&&!1===o&&E.current.focus(),y.current=o}),[o]),l.a.createElement("div",{className:n.root},l.a.createElement("div",null,l.a.createElement(m.a,{ref:E,"aria-controls":o?"menu-list-grow":void 0,"aria-haspopup":"true",onClick:function(){s((function(e){return!e}))}},t.username),l.a.createElement(b.a,{open:o,anchorEl:E.current,role:void 0,transition:!0,disablePortal:!0},(function(e){var n=e.TransitionProps,r=e.placement;return l.a.createElement(p.a,Object.assign({},n,{style:{transformOrigin:"bottom"===r?"center top":"center bottom"}}),l.a.createElement(d.a,null,l.a.createElement(u.a,{onClickAway:h},l.a.createElement(f.a,{autoFocusItem:o,id:"menu-list-grow",onKeyDown:v},l.a.createElement(g.a,{component:j.b,to:k.b.User.link(t.id),onClick:h},"\u041f\u0440\u043e\u0444\u0438\u043b\u044c"),k.b.User.tabList.map((function(e){return l.a.createElement(g.a,{id:e.subLink,component:j.b,to:k.b.User.link(t.id)+"/"+e.subLink,onClick:h},e.label)})),l.a.createElement(g.a,{component:j.b,to:k.b.EditProfilePage.path,onClick:h},"\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438"),l.a.createElement(g.a,{component:j.b,to:k.b.SignIn.path,onClick:a},"\u0412\u044b\u0445\u043e\u0434")))))}))))}function te(){var e=l.a.useState({top:!1,left:!1,bottom:!1,right:!1}),t=Object(r.a)(e,2),a=t[0],c=t[1],i=function(e,t){return function(e){("keydown"!==e.type||"Tab"!==e.key&&"Shift"!==e.key)&&c(Object(n.a)(Object(n.a)({},a),{},{left:t}))}};return l.a.createElement("div",null,["left"].map((function(e){return l.a.createElement(l.a.Fragment,{key:e},l.a.createElement(D.a,{onClick:i(0,!0)},l.a.createElement(V.a,null)),l.a.createElement(G.a,{anchor:e,open:a[e],onClose:i(0,!1)},l.a.createElement("div",{role:"presentation",onClick:i(0,!1),onKeyDown:i(0,!1)},l.a.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",padding:8,paddingLeft:0}},l.a.createElement(s.a,{src:"/logo192.png"})),l.a.createElement(I.a,null,k.c.map((function(e){return l.a.createElement(T.a,{button:!0,key:e.name,component:j.b,to:e.path,label:e.ruName},l.a.createElement(L.a,{primary:e.ruName}))}))))))})))}t.default=Object(x.b)("authStore")(Z)}}]);
//# sourceMappingURL=31.cf751942.chunk.js.map