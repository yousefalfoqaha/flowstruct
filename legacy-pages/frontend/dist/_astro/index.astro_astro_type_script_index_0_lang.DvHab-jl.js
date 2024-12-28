import{c as v,d as s}from"./defaultAttributes.G1e-shi3.js";/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=e=>Array.from(e.attributes).reduce((n,o)=>(n[o.name]=o.value,n),{}),w=e=>typeof e=="string"?e:!e||!e.class?"":e.class&&typeof e.class=="string"?e.class.split(" "):e.class&&Array.isArray(e.class)?e.class:"",y=e=>e.flatMap(w).map(o=>o.trim()).filter(Boolean).filter((o,c,t)=>t.indexOf(o)===c).join(" "),b=e=>e.replace(/(\w)(\w*)(_|-|\s*)/g,(n,o,c)=>o.toUpperCase()+c.toLowerCase()),u=(e,{nameAttr:n,icons:o,attrs:c})=>{const t=e.getAttribute(n);if(t==null)return;const r=b(t),a=o[r];if(!a)return console.warn(`${e.outerHTML} icon name was not found in the provided icons object.`);const i=g(e),[p,m,h]=a,l={...m,"data-lucide":t,...c,...i},d=y(["lucide",`lucide-${t}`,i,c]);d&&Object.assign(l,{class:d});const f=v([p,l,h]);return e.parentNode?.replaceChild(f,e)};/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=["svg",s,[["path",{d:"m6 9 6 6 6-6"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=["svg",s,[["path",{d:"m17 18-6-6 6-6"}],["path",{d:"M7 6v12"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=["svg",s,[["path",{d:"m7 18 6-6-6-6"}],["path",{d:"M17 6v12"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=["svg",s,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=["svg",s,[["path",{d:"M6 8L2 12L6 16"}],["path",{d:"M2 12H22"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=["svg",s,[["path",{d:"M18 8L22 12L18 16"}],["path",{d:"M2 12H22"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=["svg",s,[["circle",{cx:"11",cy:"11",r:"8"}],["path",{d:"m21 21-4.3-4.3"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=["svg",s,[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=({icons:e={},nameAttr:n="data-lucide",attrs:o={}}={})=>{if(!Object.values(e).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof document>"u")throw new Error("`createIcons()` only works in a browser environment.");const c=document.querySelectorAll(`[${n}]`);if(Array.from(c).forEach(t=>u(t,{nameAttr:n,icons:e,attrs:o})),n==="data-lucide"){const t=document.querySelectorAll("[icon-name]");t.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(t).forEach(r=>u(r,{nameAttr:"icon-name",icons:e,attrs:o})))}};S({icons:{MoveRight:E,MoveLeft:N,Info:L,ChevronLast:C,ChevronFirst:M,ChevronDown:A,Search:I,X:j}});
