import"./assets/modulepreload-polyfill-3cfb730f.js";import{i as n}from"./assets/vendor-77e16229.js";const i=document.querySelector(".form");i.addEventListener("submit",async e=>{e.preventDefault();const t=i.elements.delay,r=i.elements.state,s=parseInt(t.value),a=r.value;try{const o=await m(s,a);a==="fulfilled"?n.success({message:`✅ Fulfilled promise in ${s}ms`}):n.error({message:`❌ Rejected promise in ${o}ms`})}catch(o){n.error({message:`❌ Rejected promise in ${s}ms`}),console.error(o)}});function m(e,t){return new Promise((r,s)=>{setTimeout(()=>{t==="fulfilled"?r(e):s(e)},e)})}
//# sourceMappingURL=commonHelpers2.js.map
