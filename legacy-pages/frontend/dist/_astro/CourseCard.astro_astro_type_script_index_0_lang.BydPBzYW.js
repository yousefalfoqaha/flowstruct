import{d as t,c as n}from"./defaultAttributes.G1e-shi3.js";/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=["svg",t,[["path",{d:"M19 15V9"}],["path",{d:"M15 15h-3v4l-7-7 7-7v4h3v6z"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=["svg",t,[["path",{d:"M18 15h-6v4l-7-7 7-7v4h6v6z"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=["svg",t,[["path",{d:"M5 9v6"}],["path",{d:"M9 9h3V5l7 7-7 7v-4H9V9z"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=["svg",t,[["path",{d:"M9 18v-6H5l7-7 7 7h-4v6H9z"}]]],q=document.querySelectorAll("course-card > div");let o=null;class g extends HTMLElement{course;constructor(){super(),this.course=JSON.parse(this.dataset.course||"{}"),this.addEventListener("click",()=>{if(this.resetHighlights(),o===this.course.id){o=null;return}o=this.course.id,this.querySelector("div")?.classList.add("selected"),this.highlightRelatedCourses(),this.scrollIntoView({behavior:"smooth",inline:"center",block:"center"})}),this.querySelector(".info-button")?.addEventListener("click",s=>{s.stopPropagation(),window.showCourseDialog(this.course)})}highlightRelatedCourses=()=>{[...this.course.prerequisites.map(e=>({id:e.prerequisite,className:"prerequisite",icon:h})),...this.course.corequisites.map(e=>({id:e,className:"corequisite",icon:p})),...this.course.sequences.prerequisiteSequence.map(e=>({id:e,className:"prerequisite-sequence",icon:l})),...this.course.sequences.postrequisiteSequence.map(e=>({id:e,className:"postrequisite-sequence",icon:d}))].forEach(({id:e,className:a,icon:u})=>{const i=document.querySelector(`course-card[id="${e}"] > div`),c=i?.querySelector(".indicator");if(!i||!c)return;i.classList.add(a);const r=n(u);r.classList.add("opacity-0","transition-opacity","duration-300","size-5","lg:size-6"),c.appendChild(r),requestAnimationFrame(()=>{r.classList.remove("opacity-0")})})};resetHighlights=()=>{q.forEach(s=>{s.classList.remove("selected","prerequisite","corequisite","prerequisite-sequence","postrequisite-sequence");const e=s.querySelector(".indicator");e&&(e.innerHTML="")})}}customElements.define("course-card",g);
