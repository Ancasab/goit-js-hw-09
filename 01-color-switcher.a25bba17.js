const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),a=document.body;let d=null;t.addEventListener("click",(()=>{d||(d=setInterval((()=>{a.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3),t.disabled=!0)})),e.addEventListener("click",(()=>{clearInterval(d),d=null,t.disabled=!1}));
//# sourceMappingURL=01-color-switcher.a25bba17.js.map
