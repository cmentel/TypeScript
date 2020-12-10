(this.webpackJsonphomepage=this.webpackJsonphomepage||[]).push([[0],{121:function(e,t,a){},122:function(e,t,a){},156:function(e,t,a){"use strict";a.r(t);var s=a(8),n=a(0),c=a.n(n),r=a(9),i=a.n(r),l=(a(121),a(122),a(104)),o=a(29),d=a(194),j=a(205),b=a(202),u=a(197),p=a(199),m=a(200),O=a(206),h=a(204),x=Object(d.a)((function(e){return Object(j.a)({container:{display:"flex",flexWrap:"wrap",width:500,margin:"".concat(e.spacing(0)," auto")},loginBtn:{marginTop:e.spacing(2),flexGrow:1},header:{textAlign:"center",background:"#131c9c",color:"#fff"},card:{marginTop:e.spacing(10)}})})),g={username:"",password:"",isButtonDisabled:!0,helperText:"",isError:!1},y=function(e,t){switch(t.type){case"setUsername":return Object(o.a)(Object(o.a)({},e),{},{username:t.payload});case"setPassword":return Object(o.a)(Object(o.a)({},e),{},{password:t.payload});case"setIsButtonDisabled":return Object(o.a)(Object(o.a)({},e),{},{isButtonDisabled:t.payload});case"loginSuccess":return Object(o.a)(Object(o.a)({},e),{},{helperText:t.payload,isError:!1});case"loginFailed":return Object(o.a)(Object(o.a)({},e),{},{helperText:t.payload,isError:!0});case"setIsError":return Object(o.a)(Object(o.a)({},e),{},{isError:t.payload})}},f=function(){var e=x(),t=Object(n.useReducer)(y,g),a=Object(l.a)(t,2),c=a[0],r=a[1];Object(n.useEffect)((function(){c.username.trim()&&c.password.trim()?r({type:"setIsButtonDisabled",payload:!1}):r({type:"setIsButtonDisabled",payload:!0})}),[c.username,c.password]);var i=function(){"steve@email.com"===c.username&&"minecraft"===c.password?r({type:"loginSuccess",payload:"SUCCESS"}):r({type:"loginFailed",payload:"Incorrect username or password"})},o=function(e){13!==e.keyCode&&13!==e.which||c.isButtonDisabled||i()};return Object(s.jsx)("form",{className:e.container,noValidate:!0,autoComplete:"off",children:Object(s.jsxs)(u.a,{className:e.card,children:[Object(s.jsx)(O.a,{className:e.header,title:"Minecraft Steve's Plagiarism Detector"}),Object(s.jsx)(p.a,{children:Object(s.jsxs)("div",{children:["username = steve@email.com password = minecraft",Object(s.jsx)(b.a,{error:c.isError,fullWidth:!0,id:"username",type:"email",label:"Username",placeholder:"Username",margin:"normal",onChange:function(e){r({type:"setUsername",payload:e.target.value})},onKeyPress:o}),Object(s.jsx)(b.a,{error:c.isError,fullWidth:!0,id:"password",type:"password",label:"Password",placeholder:"Password",margin:"normal",helperText:c.helperText,onChange:function(e){r({type:"setPassword",payload:e.target.value})},onKeyPress:o})]})}),Object(s.jsx)(m.a,{children:Object(s.jsx)(h.a,{variant:"contained",size:"large",color:"secondary",className:e.loginBtn,onClick:i,disabled:c.isButtonDisabled,children:"Login"})})]})})},v=a(95),w=a(96),I=a(108),C=a(105),B=a(201),T=a(83),S=a(203),D=a(207),E=a(208),k=a(209),P=a(210),F=a(211),N=B.a.Header,U=B.a.Content,A=B.a.Footer,H=B.a.Sider,K=T.a.SubMenu,L=function(e){Object(I.a)(a,e);var t=Object(C.a)(a);function a(){var e;Object(v.a)(this,a);for(var s=arguments.length,n=new Array(s),c=0;c<s;c++)n[c]=arguments[c];return(e=t.call.apply(t,[this].concat(n))).state={collapsed:!1},e.onCollapse=function(t){console.log(t),e.setState({collapsed:t})},e}return Object(w.a)(a,[{key:"render",value:function(){var e=this.state.collapsed;return Object(s.jsxs)(B.a,{style:{minHeight:"100vh"},children:[Object(s.jsxs)(H,{collapsible:!0,collapsed:e,onCollapse:this.onCollapse,children:[Object(s.jsx)("div",{className:"logo"}),Object(s.jsxs)(T.a,{theme:"dark",defaultSelectedKeys:["1"],mode:"inline",children:[Object(s.jsx)(T.a.Item,{icon:Object(s.jsx)(D.a,{}),children:"Option 1"},"1"),Object(s.jsx)(T.a.Item,{icon:Object(s.jsx)(E.a,{}),children:"Option 2"},"2"),Object(s.jsxs)(K,{icon:Object(s.jsx)(k.a,{}),title:"User",children:[Object(s.jsx)(T.a.Item,{children:"Tom"},"3"),Object(s.jsx)(T.a.Item,{children:"Bill"},"4"),Object(s.jsx)(T.a.Item,{children:"Alex"},"5")]},"sub1"),Object(s.jsxs)(K,{icon:Object(s.jsx)(P.a,{}),title:"Team",children:[Object(s.jsx)(T.a.Item,{children:"Team 1"},"6"),Object(s.jsx)(T.a.Item,{children:"Team 2"},"8")]},"sub2"),Object(s.jsx)(T.a.Item,{icon:Object(s.jsx)(F.a,{}),children:"Files"},"9")]})]}),Object(s.jsxs)(B.a,{className:"site-layout",children:[Object(s.jsx)(N,{className:"site-layout-background",style:{padding:0}}),Object(s.jsxs)(U,{style:{margin:"0 16px"},children:[Object(s.jsxs)(S.a,{style:{margin:"16px 0"},children:[Object(s.jsx)(S.a.Item,{children:"User"}),Object(s.jsx)(S.a.Item,{children:"Bill"})]}),Object(s.jsx)("div",{className:"site-layout-background",style:{padding:24,minHeight:360},children:"Bill is a cat."})]}),Object(s.jsx)(A,{style:{textAlign:"center"},children:"Ant Design \xa92018 Created by Ant UED"})]})]})}}]),a}(c.a.Component);var M=function(){var e=!1;return e?Object(s.jsx)(L,{}):(e=!0,Object(s.jsx)(f,{}))},W=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,213)).then((function(t){var a=t.getCLS,s=t.getFID,n=t.getFCP,c=t.getLCP,r=t.getTTFB;a(e),s(e),n(e),c(e),r(e)}))};i.a.render(Object(s.jsx)(c.a.StrictMode,{children:Object(s.jsx)(M,{})}),document.getElementById("root")),W()}},[[156,1,2]]]);
//# sourceMappingURL=main.78a88250.chunk.js.map