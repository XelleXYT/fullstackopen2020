(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),u=t.n(o),c=(t(19),t(2)),s=function(e){var n=e.newFilter,t=e.handleFilterChange;return r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:n,onChange:t}))},l=t(3),i=t.n(l),m="/api/persons",d=function(){return i.a.get(m).then((function(e){return e.data}))},f=function(e){return i.a.post(m,e).then((function(e){return e.data}))},h=function(e){return i.a.delete("".concat(m,"/").concat(e.id)).then((function(e){return e.data}))},b=function(e){return i.a.put("".concat(m,"/").concat(e.id),e).then((function(e){return e.data}))},p=function(e){var n=e.persons,t=e.setPersons,a=e.newName,o=e.setNewName,u=e.handleNameChange,c=e.newNumber,s=e.setNewNumber,l=e.handleNumberChange,i=e.setMessage,m=e.setMessageType;return r.a.createElement("form",{onSubmit:function(e){if(e.preventDefault(),0!==n.filter((function(e){return e.name===a})).length){var r=n.filter((function(e){return e.name===a}))[0];if(r.number!==c){if(window.confirm("".concat(a," is already added to phonebook, replace the old number with a new one?"))){var u={id:r.id,name:r.name,number:c};b(u).then((function(){d().then((function(e){t(e),m("success"),i("Updated ".concat(a," number"))}))})).catch((function(e){m("error"),i(e.response.data.error),console.error(e.response.data.error)})),o(""),s(""),setTimeout((function(){i(null)}),5e3)}}else alert("".concat(a," is already added to phonebook with that number"))}else{var l={id:n.length+1,name:a,number:c};f(l).then((function(e){t(n.concat(e)),m("success"),i("Added ".concat(a))})).catch((function(e){m("error"),i(e.response.data.error),console.error(e.response.data.error)})),o(""),s(""),setTimeout((function(){i(null)}),5e3)}}},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:a,onChange:u})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:c,onChange:l})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},g=function(e){var n=e.persons,t=e.setPersons,a=e.newFilter,o=e.setMessage,u=e.setMessageType;return r.a.createElement(r.a.Fragment,null,n.filter((function(e){return e.name.toLowerCase().includes(a.toLowerCase())})).map((function(e){return r.a.createElement("div",{key:e.id},e.name," ",e.number," ",r.a.createElement("button",{onClick:function(){!function(e){window.confirm("Delete ".concat(e.name," ?"))&&h(e).then((function(){d().then((function(e){t(e)}))})).catch((function(){u("error"),o("Information of ".concat(e.name," has been removed from server")),t(n.filter((function(n){return n.id!==e.id}))),setTimeout((function(){o(null)}),5e3)}))}(e)}},"delete"))})))},w=function(e){var n=e.message,t=e.type;return null===n?null:r.a.createElement("div",{className:t},n)},v=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),l=Object(c.a)(u,2),i=l[0],m=l[1],f=Object(a.useState)(""),h=Object(c.a)(f,2),b=h[0],v=h[1],E=Object(a.useState)(""),N=Object(c.a)(E,2),j=N[0],O=N[1],C=Object(a.useState)(null),y=Object(c.a)(C,2),k=y[0],M=y[1],S=Object(a.useState)("error"),F=Object(c.a)(S,2),T=F[0],P=F[1];return Object(a.useEffect)((function(){d().then((function(e){o(e)}))}),[]),r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(w,{message:k,type:T}),r.a.createElement(s,{newFilter:j,handleFilterChange:function(e){return O(e.target.value)}}),r.a.createElement("h3",null,"Add a new"),r.a.createElement(p,{persons:t,setPersons:o,newName:i,setNewName:m,handleNameChange:function(e){return m(e.target.value)},newNumber:b,setNewNumber:v,handleNumberChange:function(e){return v(e.target.value)},setMessage:M,setMessageType:P}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(g,{persons:t,setPersons:o,newFilter:j,setMessage:M,setMessageType:P}))};u.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(v,null)),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.a4d10b02.chunk.js.map