(this["webpackJsonptrello-react"]=this["webpackJsonptrello-react"]||[]).push([[0],{11:function(e,t,a){e.exports=a(23)},20:function(e,t,a){},22:function(e,t,a){},23:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(4),o=a.n(c),l=a(5),i=a(6),s=a(7),d=a(9),u=a(8),p=a(10),m=a(1),f=a(2);a(20),a(21);function g(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function h(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?g(a,!0).forEach((function(t){Object(l.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):g(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var b=function(e,t){var a=t.removedIndex,n=t.addedIndex,r=t.payload;if(null===a&&null===n)return e;var c=Object(m.a)(e),o=r;return null!==a&&(o=c.splice(a,1)[0]),null!==n&&c.splice(n,0,o),c},O=["#0079BF","#D29034","#4BBF6B","#B03642"],C=function(e){function t(){var e,a;Object(i.a)(this,t);for(var r=arguments.length,c=new Array(r),o=0;o<r;o++)c[o]=arguments[o];return(a=Object(d.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(c)))).state={bgColor:"#0079BF",colorBoolean:!1,listTilteEdit:"-1",addCardOpen:"-1",addListOpen:!1,trello:{type:"container",props:{orientation:"horizontal"},children:[{id:"0",title:"todo1",type:"container",props:{orientation:"vertical",className:"card-container"},children:[{id:"00",title:"todo1-1",description:"todo1-1",comments:[{id:0,comment:"todo1-1"}],type:"draggable",props:{className:"card"}},{id:"01",title:"todo1-2",description:"todo1-2",comments:[{id:0,comment:"todo1-2"}],type:"draggable",props:{className:"card"}}]},{id:"1",title:"todo2",type:"container",props:{orientation:"vertical",className:"card-container"},children:[{id:"10",title:"todo2-1",description:"todo2-1",comments:[{id:0,comment:"todo2-1"}],type:"draggable",props:{className:"card"}},{id:"11",title:"todo2-2",description:"todo2-2",comments:[{id:0,comment:"todo2-2"}],type:"draggable",props:{className:"card"}}]}]}},a.inputRef=Object(n.createRef)(),a.getCardPayload=function(e,t){return a.state.trello.children.filter((function(t){return t.id===e}))[0].children[t]},a.onColumnDrop=function(e){var t=Object.assign({},a.state.trello);t.children=b(t.children,e),a.setState({trello:t})},a.onCardDrop=function(e,t){if(null!==t.removedIndex||null!==t.addedIndex){var n=Object.assign({},a.state.trello),r=n.children.filter((function(t){return t.id===e}))[0],c=n.children.indexOf(r),o=Object.assign({},r);o.children=b(o.children,t),n.children.splice(c,1,o),a.setState({trello:n})}},a.closeOpened=function(e){e.target.classList.contains("bg-change-box")||e.target.classList.contains("bg-change-btn")||e.target.classList.contains("fa-paint-brush")||a.setState({colorBoolean:!1}),e.target.classList.contains("list-card-composer-textarea")||e.target.classList.contains("textarea-box")||e.target.classList.contains("add-btn")||e.target.classList.contains("add-card-btn")||e.target.classList.contains("fa-plus")||e.target.classList.contains("card-composer")||a.setState({addCardOpen:"-1"}),e.target.classList.contains("add-list-btn")||e.target.classList.contains("fa-plus")||e.target.classList.contains("add-list-wrap")||e.target.classList.contains("list-title-input")||e.target.classList.contains("add-btn")||e.target.classList.contains("card-composer")||(a.setState({addListOpen:!1}),a.inputRef.current.value="")},a.toggleBGMenu=function(){a.setState((function(e){return{colorBoolean:!e.colorBoolean}}))},a.listTitleOpen=function(e,t){e.target.nextSibling.focus(),a.setState({listTilteEdit:t})},a.listTitleClose=function(){a.setState({listTilteEdit:"-1"})},a.listTitleChange=function(e,t){var n=e.target.value;n.trim()&&a.setState((function(e){return{trello:h({},e.trello,{children:Object(m.a)(e.trello.children).map((function(e){return e.id===t?h({},e,{title:n}):e}))})}}))},a.cardTitleResize=function(e,t){if(13===e.keyCode){if(!e.target.value)return;e.shiftKey||a.addCard(t)}else e.target.style.height="1px",e.target.style.height="".concat(e.target.scrollHeight,"px")},a.generateCardId=function(e){return e.length?Math.max.apply(Math,Object(m.a)(e.map((function(e){return 1*e.id.split("")[1]}))))+1:0},a.addCard=function(e){var t=document.querySelector("#textarea".concat(e)),n=t.value;n.trim()&&(a.setState((function(t){return{trello:h({},t.trello,{children:Object(m.a)(t.trello.children).map((function(t){return t.id===e?h({},t,{children:[].concat(Object(m.a)(t.children),[{id:"".concat(e).concat(a.generateCardId(t.children)),title:n,description:"",comments:[],type:"draggable",props:{className:"card"}}])}):t}))})}})),t.value="")},a.addCardOpen=function(e){document.querySelector("#textarea".concat(e)).focus(),a.setState({addCardOpen:e})},a.removeCard=function(e,t){a.setState((function(a){return{trello:h({},a.trello,{children:Object(m.a)(a.trello.children).map((function(a){return a.id===e?h({},a,{children:Object(m.a)(a.children.filter((function(e){return e.id!==t})))}):a}))})}}))},a.addListOpen=function(){a.setState({addListOpen:!0}),a.inputRef.current.focus()},a.generateListId=function(e){return e.length?Math.max.apply(Math,Object(m.a)(e.map((function(e){return 1*e.id}))))+1:0},a.addList=function(e){var t=a.inputRef.current.value;13!==e.keyCode&&"click"!==e.type||!t.trim()||(a.setState((function(e){return{trello:h({},e.trello,{children:[].concat(Object(m.a)(e.trello.children),[{id:"".concat(a.generateListId(e.trello.children)),title:t,type:"container",props:{orientation:"vertical",className:"card-container"},children:[]}])})}})),a.inputRef.current.value="")},a.removeList=function(e){a.setState((function(t){return{trello:h({},t.trello,{children:Object(m.a)(t.trello.children.filter((function(t){return t.id!==e})))})}}))},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"changeBgColor",value:function(e){this.setState({colorBoolean:!1,bgColor:e})}},{key:"render",value:function(){var e=this;return r.a.createElement("section",{className:"wrapper",style:{backgroundColor:this.state.bgColor},onClick:this.closeOpened},r.a.createElement("header",null,r.a.createElement("h1",{className:"logo"},r.a.createElement("i",{className:"fa fa-trello"})," Trello"),r.a.createElement("button",{className:"bg-change-btn",onClick:this.toggleBGMenu},r.a.createElement("i",{className:"fa fa-paint-brush"})),this.state.colorBoolean?r.a.createElement("div",{className:"bg-change-box"},O.map((function(t,a){return r.a.createElement("div",{key:a,className:"color-picker",style:{backgroundColor:t},onClick:function(){return e.changeBgColor(t)}})}))):""),r.a.createElement("section",{className:"board-title-wrap"},r.a.createElement("h2",{className:"board-title"},"projectTitle")),r.a.createElement("section",{className:"card-trello"},r.a.createElement(f.Container,{orientation:"horizontal",onDrop:this.onColumnDrop,dragHandleSelector:".column-drag-handle",dropPlaceholder:{animationDuration:150,showOnTop:!0,className:"cards-drop-preview"}},this.state.trello.children.map((function(t){return r.a.createElement(f.Draggable,{key:t.id},r.a.createElement("div",{className:t.props.className},r.a.createElement("div",{className:"card-column-header".concat(e.state.listTilteEdit===t.id?" is-edit":"")},r.a.createElement("span",{className:"column-drag-handle",onClick:function(a){return e.listTitleOpen(a,t.id)}}),r.a.createElement("textarea",{className:"list-title",value:t.title,onChange:function(a){return e.listTitleChange(a,t.id)},onBlur:e.listTitleClose}),r.a.createElement("button",{className:"list-delete-btn",onClick:function(){return e.removeList(t.id)}},r.a.createElement("i",{className:"fa fa-trash-o"}))),r.a.createElement(f.Container,Object.assign({},t.props,{groupName:"col",onDragStart:function(e){return console.log("drag started",e)},onDragEnd:function(e){return console.log("drag end",e)},onDrop:function(a){return e.onCardDrop(t.id,a)},getChildPayload:function(a){return e.getCardPayload(t.id,a)},dragClass:"card-ghost",dropClass:"card-ghost-drop",onDragEnter:function(){console.log("drag enter:",t.id)},onDragLeave:function(){console.log("drag leave:",t.id)},onDropReady:function(e){return console.log("Drop ready: ",e)},dropPlaceholder:{animationDuration:150,showOnTop:!0,className:"drop-preview"},dropPlaceholderAnimationDuration:200}),t.children.map((function(a){return r.a.createElement(f.Draggable,{key:a.id},r.a.createElement("div",a.props,r.a.createElement("button",{className:"card-open-btn"},a.title),r.a.createElement("span",{className:"remove-card-btn",onClick:function(){return e.removeCard(t.id,a.id)}},r.a.createElement("i",{className:"fa fa-trash-o"}))))}))),r.a.createElement("div",{className:"card-composer".concat(e.state.addCardOpen!==t.id?" readable-hidden":"")},r.a.createElement("div",{className:"textarea-box"},r.a.createElement("textarea",{className:"list-card-composer-textarea",placeholder:"Enter a title for this card\u2026",onKeyUp:function(a){return e.cardTitleResize(a,t.id)},spellCheck:"false",id:"textarea".concat(t.id)})),r.a.createElement("button",{className:"add-btn",onClick:function(){return e.addCard(t.id)}},"Add Card"),r.a.createElement("button",{className:"cancle-btn",onClick:function(){return e.setState({addCardOpen:"-1"})}},r.a.createElement("i",{className:"fa fa-times"}))),r.a.createElement("button",{className:"add-card-btn".concat(e.state.addCardOpen===t.id?" readable-hidden":""),onClick:function(){return e.addCardOpen(t.id)}},r.a.createElement("i",{className:"fa fa-plus"})," Add Card")))}))),r.a.createElement("div",{className:"list-wrap"},r.a.createElement("button",{className:"add-list-btn".concat(this.state.addListOpen?" readable-hidden":""),onClick:this.addListOpen},r.a.createElement("i",{className:"fa fa-plus"})," Add List"),r.a.createElement("div",{className:"add-list-wrap".concat(this.state.addListOpen?"":" readable-hidden")},r.a.createElement("input",{type:"text",ref:this.inputRef,className:"list-title-input",onKeyUp:this.addList,placeholder:"Enter list title..."}),r.a.createElement("button",{className:"add-btn",onClick:this.addList},"Add List"),r.a.createElement("button",{className:"cancle-btn",onClick:function(){return e.setState({addListOpen:!1})}},r.a.createElement("i",{className:"fa fa-times"}))))))}}]),t}(n.Component);a(22);o.a.render(r.a.createElement(C,null),document.getElementById("root"))}},[[11,1,2]]]);
//# sourceMappingURL=main.c07b62ff.chunk.js.map