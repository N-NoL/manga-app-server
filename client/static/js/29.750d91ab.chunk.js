(this.webpackJsonpmanga=this.webpackJsonpmanga||[]).push([[29],{519:function(e,a,t){"use strict";t.r(a);var n=t(60),r=t.n(n),c=t(61),s=t(55),i=t(1),l=t.n(i),o=t(366),m=t(167),u=t(134),d=t(63),p=t.n(d),g=t(166),f=t(168),b=t(157),h=t(57),E=t(62),v=t(37),w=t(102),y=(t(92),Object(g.a)((function(e){return{large:{width:60,height:60,marginRight:16}}})));a.default=function(e){var a=e.match.params.userId,t=y(),n=Object(i.useState)(!0),d=Object(s.a)(n,2),g=d[0],x=d[1],N=Object(i.useState)([]),O=Object(s.a)(N,2),j=O[0],k=O[1],_=function(){var e=Object(c.a)(r.a.mark((function e(a){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return x(!0),console.log("fetchSub",a),e.prev=2,e.next=5,p.a.get("".concat("https://manga-in.space/server-api","/friend/").concat(a));case 5:t=e.sent,console.log("\ud83d\udc49 Returned UserMangaList data:",t.data),k(t.data.list.map((function(e){return e.reseiver}))),x(!1),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(2),console.log("\ud83d\ude31 Axios request failed: ".concat(e.t0));case 14:case"end":return e.stop()}}),e,null,[[2,11]])})));return function(a){return e.apply(this,arguments)}}();return Object(i.useEffect)((function(){_(a)}),[e.friendStatus]),g?l.a.createElement("div",{style:{paddingLeft:"calc(50% - 10px)",paddingTop:40}},l.a.createElement(v.a,{color:"secondary"})):l.a.createElement(w.a,{container:!0,spacing:2},j.map((function(e,a){return l.a.createElement(w.a,{key:a,item:!0,xs:6,sm:3},l.a.createElement(m.a,{component:h.b,to:E.b.User.link(e.id),id:e.id,button:!0},l.a.createElement(f.a,null,l.a.createElement(b.a,{className:t.large,alt:e.username,src:e.imgUrl})),l.a.createElement(u.a,{primary:l.a.createElement(o.a,{color:"textPrimary"},e.username)})))})))}},92:function(e,a,t){"use strict";var n=t(1),r=t.n(n),c=(t(93),t(133)),s=t(366),i=t(166),l=Object(i.a)((function(e){return{name:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginTop:e.spacing(1)}}}));a.a=function(e){var a=l();return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"card_head"},r.a.createElement("div",{className:"img_spacer"}),e.load?r.a.createElement("img",{className:"card_head_img MuiSkeleton-pulse",style:{border:"none",background:"rgba(0, 0, 0, 0.04)"}}):r.a.createElement("img",{className:"card_head_img",src:e.src})),r.a.createElement("div",{className:"card_body"},r.a.createElement(s.a,{color:"textPrimary",className:a.name,variant:"subtitle2"},e.load?r.a.createElement(c.a,{className:"",width:"100%"}):e.title),r.a.createElement(s.a,{color:"primary",variant:"caption"},e.load?r.a.createElement(c.a,{className:"",width:"80%"}):e.subtitle)))}},93:function(e,a,t){}}]);
//# sourceMappingURL=29.750d91ab.chunk.js.map