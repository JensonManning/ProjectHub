import{a as B}from"./chunk-5XAABUMC.js";import{i as $,j as w}from"./chunk-T7MGDWGT.js";import{Y as I,a as F,aa as M,sa as S}from"./chunk-NB76KGKE.js";import{Eb as C,Fb as z,Lc as U,O as l,P as v,U as n,Wb as D,Ya as u,Za as g,ab as h,ca as a,jb as f,k as s,lb as m,mb as y,na as d,ob as j,pc as c,qc as k,ub as b,vb as P,z as p}from"./chunk-U6KPTH7L.js";var V=class e{http=n(F);userService=n(B);apiUrl=w.apiUrl;selectedProjects=d([]);selectedProject=d({id:0,name:"",description:"",startDate:new Date,endDate:new Date,status:0,type:0,projectPhases:[],projectResources:[],projectNotebooks:[]});allProjects=c(()=>this.getAllProjectsResource.value()||[]);allProjectsByUser=c(()=>this.allProjects().filter(i=>i.projectResources.some(r=>r.userId===this.userService.currentUser().id)));getAllProjectsResource=$({loader:()=>this.http.get(this.apiUrl+"Project").pipe(p(()=>s([])))});getProject(i){return this.http.get(this.apiUrl+"Project/"+i)}editProject(i,r){return this.http.put(this.apiUrl+"Project/"+i,r)}createProject(i){return this.http.post(this.apiUrl+"Project",i)}deleteProject(i){this.http.delete(this.apiUrl+"Project/"+i).subscribe(()=>{this.getAllProjectsResource.reload(),console.log(i,"deleted")})}createProjectForm(i){return this.http.post(this.apiUrl+"Project",i)}editProjectForm(i,r){return this.http.put(this.apiUrl+"Project/"+i,r)}createCompleteProject(i){return this.http.post(this.apiUrl+"Project/complete",i)}constructor(){}eff=k(()=>{console.log(this.allProjects()),console.log(this.selectedProject())});static \u0275fac=function(r){return new(r||e)};static \u0275prov=l({token:e,factory:e.\u0275fac,providedIn:"root"})};var E=["*"],H=({dt:e})=>`
.p-divider-horizontal {
    display: flex;
    width: 100%;
    position: relative;
    align-items: center;
    margin: ${e("divider.horizontal.margin")};
    padding: ${e("divider.horizontal.padding")};
}

.p-divider-horizontal:before {
    position: absolute;
    display: block;
    inset-block-start: 50%;
    inset-inline-start: 0;
    width: 100%;
    content: "";
    border-block-start: 1px solid ${e("divider.border.color")};
}

.p-divider-horizontal .p-divider-content {
    padding: ${e("divider.horizontal.content.padding")};
}

.p-divider-vertical {
    min-height: 100%;
    display: flex;
    position: relative;
    justify-content: center;
    margin: ${e("divider.vertical.margin")};
    padding: ${e("divider.vertical.padding")};
}

.p-divider-vertical:before {
    position: absolute;
    display: block;
    inset-block-start: 0;
    inset-inline-start: 50%;
    height: 100%;
    content: "";
    border-inline-start: 1px solid ${e("divider.border.color")};
}

.p-divider.p-divider-vertical .p-divider-content {
    padding: ${e("divider.vertical.content.padding")};
}

.p-divider-content {
    z-index: 1;
    background: ${e("divider.content.background")};
    color: ${e("divider.content.color")};
}

.p-divider-solid.p-divider-horizontal:before {
    border-block-start-style: solid;
}

.p-divider-solid.p-divider-vertical:before {
    border-inline-start-style: solid;
}

.p-divider-dashed.p-divider-horizontal:before {
    border-block-start-style: dashed;
}

.p-divider-dashed.p-divider-vertical:before {
    border-inline-start-style: dashed;
}

.p-divider-dotted.p-divider-horizontal:before {
    border-block-start-style: dotted;
}

.p-divider-dotted.p-divider-vertical:before {
    border-inline-start-style: dotted;
}

.p-divider-left:dir(rtl),
.p-divider-right:dir(rtl) {
    flex-direction: row-reverse;
}
`,N={root:({props:e})=>({justifyContent:e.layout==="horizontal"?e.align==="center"||e.align===null?"center":e.align==="left"?"flex-start":e.align==="right"?"flex-end":null:null,alignItems:e.layout==="vertical"?e.align==="center"||e.align===null?"center":e.align==="top"?"flex-start":e.align==="bottom"?"flex-end":null:null})},T={root:({props:e})=>["p-divider p-component","p-divider-"+e.layout,"p-divider-"+e.type,{"p-divider-left":e.layout==="horizontal"&&(!e.align||e.align==="left")},{"p-divider-center":e.layout==="horizontal"&&e.align==="center"},{"p-divider-right":e.layout==="horizontal"&&e.align==="right"},{"p-divider-top":e.layout==="vertical"&&e.align==="top"},{"p-divider-center":e.layout==="vertical"&&(!e.align||e.align==="center")},{"p-divider-bottom":e.layout==="vertical"&&e.align==="bottom"}],content:"p-divider-content"},R=(()=>{class e extends M{name="divider";theme=H;classes=T;inlineStyles=N;static \u0275fac=(()=>{let r;return function(t){return(r||(r=a(e)))(t||e)}})();static \u0275prov=l({token:e,factory:e.\u0275fac})}return e})();var q=(()=>{class e extends S{style;styleClass;layout="horizontal";type="solid";align;_componentStyle=n(R);get hostClass(){return this.styleClass}static \u0275fac=(()=>{let r;return function(t){return(r||(r=a(e)))(t||e)}})();static \u0275cmp=u({type:e,selectors:[["p-divider"]],hostVars:33,hostBindings:function(o,t){o&2&&(f("aria-orientation",t.layout)("data-pc-name","divider")("role","separator"),j(t.hostClass),m("justify-content",t.layout==="horizontal"?t.align==="center"||t.align===void 0?"center":t.align==="left"?"flex-start":t.align==="right"?"flex-end":null:null)("align-items",t.layout==="vertical"?t.align==="center"||t.align===void 0?"center":t.align==="top"?"flex-start":t.align==="bottom"?"flex-end":null:null),y("p-divider",!0)("p-component",!0)("p-divider-horizontal",t.layout==="horizontal")("p-divider-vertical",t.layout==="vertical")("p-divider-solid",t.type==="solid")("p-divider-dashed",t.type==="dashed")("p-divider-dotted",t.type==="dotted")("p-divider-left",t.layout==="horizontal"&&(!t.align||t.align==="left"))("p-divider-center",t.layout==="horizontal"&&t.align==="center"||t.layout==="vertical"&&(!t.align||t.align==="center"))("p-divider-right",t.layout==="horizontal"&&t.align==="right")("p-divider-top",t.layout==="vertical"&&t.align==="top")("p-divider-bottom",t.layout==="vertical"&&t.align==="bottom"))},inputs:{style:"style",styleClass:"styleClass",layout:"layout",type:"type",align:"align"},features:[D([R]),h],ngContentSelectors:E,decls:2,vars:0,consts:[[1,"p-divider-content"]],template:function(o,t){o&1&&(C(),b(0,"div",0),z(1),P())},dependencies:[U,I],encapsulation:2,changeDetection:0})}return e})(),de=(()=>{class e{static \u0275fac=function(o){return new(o||e)};static \u0275mod=g({type:e});static \u0275inj=v({imports:[q]})}return e})();export{V as a,q as b,de as c};
