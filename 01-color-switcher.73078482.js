const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),r=document.querySelector("body");function d(){r.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}e.setAttribute("disabled",!0);const a={intervalId:null,start(){this.isActive=!0,t.setAttribute("disabled",!0),e.removeAttribute("disabled"),this.intervalId=setInterval((()=>{d()}),1e3)},stop(){clearInterval(this.intervalId),t.removeAttribute("disabled"),e.setAttribute("disabled",!0)}};t.addEventListener("click",(()=>{a.start()})),e.addEventListener("click",(()=>{a.stop()}));
//# sourceMappingURL=01-color-switcher.73078482.js.map
