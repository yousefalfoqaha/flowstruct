/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=(e,o,t=[])=>{const i=document.createElementNS("http://www.w3.org/2000/svg",e);return Object.keys(o).forEach(s=>{i.setAttribute(s,String(o[s]))}),t.length&&t.forEach(s=>{const n=h(...s);i.appendChild(n)}),i};var p=([e,o,t])=>h(e,o,t);/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=e=>Array.from(e.attributes).reduce((o,t)=>(o[t.name]=t.value,o),{}),E=e=>typeof e=="string"?e:!e||!e.class?"":e.class&&typeof e.class=="string"?e.class.split(" "):e.class&&Array.isArray(e.class)?e.class:"",k=e=>e.flatMap(E).map(t=>t.trim()).filter(Boolean).filter((t,i,s)=>s.indexOf(t)===i).join(" "),N=e=>e.replace(/(\w)(\w*)(_|-|\s*)/g,(o,t,i)=>t.toUpperCase()+i.toLowerCase()),d=(e,{nameAttr:o,icons:t,attrs:i})=>{const s=e.getAttribute(o);if(s==null)return;const n=N(s),c=t[n];if(!c)return console.warn(`${e.outerHTML} icon name was not found in the provided icons object.`);const r=A(e),[y,v,b]=c,l={...v,"data-lucide":s,...i,...r},u=k(["lucide",`lucide-${s}`,r,i]);u&&Object.assign(l,{class:u});const q=p([y,l,b]);return e.parentNode?.replaceChild(q,e)};/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=["svg",a,[["path",{d:"M19 15V9"}],["path",{d:"M15 15h-3v4l-7-7 7-7v4h3v6z"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=["svg",a,[["path",{d:"M18 15h-6v4l-7-7 7-7v4h6v6z"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=["svg",a,[["path",{d:"M5 9v6"}],["path",{d:"M9 9h3V5l7 7-7 7v-4H9V9z"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=["svg",a,[["path",{d:"M9 18v-6H5l7-7 7 7h-4v6H9z"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=["svg",a,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=({icons:e={},nameAttr:o="data-lucide",attrs:t={}}={})=>{if(!Object.values(e).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof document>"u")throw new Error("`createIcons()` only works in a browser environment.");const i=document.querySelectorAll(`[${o}]`);if(Array.from(i).forEach(s=>d(s,{nameAttr:o,icons:e,attrs:t})),o==="data-lucide"){const s=document.querySelectorAll("[icon-name]");s.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(s).forEach(n=>d(n,{nameAttr:"icon-name",icons:e,attrs:t})))}};L({icons:{Info:S,ArrowBigRightDash:f,ArrowBigLeftDash:g,ArrowBigLeft:m,ArrowBigUp:w}});class C extends HTMLElement{prerequisites;corequisites;sequences;constructor(){super(),this.prerequisites=JSON.parse(this.dataset.prerequisites||"[]"),this.corequisites=JSON.parse(this.dataset.corequisites||"[]"),this.sequences=JSON.parse(this.dataset.sequences||"{}"),this.addEventListener("mouseenter",this.highlightRelatedCourses),this.addEventListener("mouseleave",this.resetHighlights)}highlightRelatedCourses=()=>{[...this.prerequisites.map(t=>({id:t.prerequisite,classes:["bg-orange-300"],icon:m})),...this.corequisites.map(t=>({id:t,classes:["bg-gray-400","text-white"],icon:w})),...this.sequences.prerequisiteSequence.map(t=>({id:t,classes:["bg-yellow-200"],icon:g})),...this.sequences.postrequisiteSequence.map(t=>({id:t,classes:["bg-sky-800","text-white"],icon:f}))].forEach(({id:t,classes:i,icon:s})=>{const n=document.querySelector(`sticky-note[id="${t}"] > div`),c=n?.querySelector(".indicator");if(!n||!c)return;n.classList.add(...i);const r=p(s);r.classList.add("opacity-0","transition-opacity","duration-300"),c.appendChild(r),requestAnimationFrame(()=>{r.classList.remove("opacity-0")})})};resetHighlights=()=>{document.querySelectorAll("sticky-note > div").forEach(t=>{t.classList.remove("bg-orange-300","bg-yellow-200","bg-sky-800","bg-gray-400","text-white");const i=t.querySelector(".indicator");i&&(i.innerHTML="")})}}customElements.define("sticky-note",C);
