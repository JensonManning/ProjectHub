import{H as J,I as q,X as W,Y as c,aa as x,da as A,fa as ye,ga as ve,ja as Ce,qa as ke,sa as $,ta as _e,xa as xe}from"./chunk-NB76KGKE.js";import{$ as L,Ab as U,Cb as N,Db as C,Eb as K,Ec as Z,Fb as G,Hc as me,Ib as E,Ic as Y,Jb as de,Kb as D,Lb as F,Lc as _,Ma as b,N as O,O as f,P as w,Pb as pe,Qb as be,U as u,Wb as k,Ya as m,Yb as te,Z as re,Za as M,Zb as H,aa as j,ab as y,ac as ge,ca as s,cb as I,ea as ee,hc as fe,ia as T,jb as h,kb as d,mb as V,mc as p,na as ae,nb as le,nc as R,ob as v,pb as z,rb as se,rc as he,sb as ce,tb as ue,ub as B,vb as S,wb as Q,zb as P}from"./chunk-U6KPTH7L.js";import{a as ne,b as ie}from"./chunk-GAL4ENT6.js";var Ee=["input"],Oe=(e,a,t,n,o)=>({"p-radiobutton p-component":!0,"p-radiobutton-checked":e,"p-disabled":a,"p-variant-filled":t,"p-radiobutton-sm p-inputfield-sm":n,"p-radiobutton-lg p-inputfield-lg":o}),Le=({dt:e})=>`
.p-radiobutton {
    position: relative;
    display: inline-flex;
    user-select: none;
    vertical-align: bottom;
    width: ${e("radiobutton.width")};
    height: ${e("radiobutton.height")};
}

.p-radiobutton-input {
    cursor: pointer;
    appearance: none;
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: 1;
    outline: 0 none;
    border: 1px solid transparent;
    border-radius: 50%;
}

.p-radiobutton-box {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 1px solid ${e("radiobutton.border.color")};
    background: ${e("radiobutton.background")};
    width: ${e("radiobutton.width")};
    height: ${e("radiobutton.height")};
    transition: background ${e("radiobutton.transition.duration")}, color ${e("radiobutton.transition.duration")}, border-color ${e("radiobutton.transition.duration")}, box-shadow ${e("radiobutton.transition.duration")}, outline-color ${e("radiobutton.transition.duration")};
    outline-color: transparent;
    box-shadow: ${e("radiobutton.shadow")};
}

.p-radiobutton-icon {
    transition-duration: ${e("radiobutton.transition.duration")};
    background: transparent;
    font-size: ${e("radiobutton.icon.size")};
    width: ${e("radiobutton.icon.size")};
    height: ${e("radiobutton.icon.size")};
    border-radius: 50%;
    backface-visibility: hidden;
    transform: translateZ(0) scale(0.1);
}

.p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover) .p-radiobutton-box {
    border-color: ${e("radiobutton.hover.border.color")};
}

.p-radiobutton-checked .p-radiobutton-box {
    border-color: ${e("radiobutton.checked.border.color")};
    background: ${e("radiobutton.checked.background")};
}

.p-radiobutton-checked .p-radiobutton-box .p-radiobutton-icon {
    background: ${e("radiobutton.icon.checked.color")};
    transform: translateZ(0) scale(1, 1);
    visibility: visible;
}

.p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:hover) .p-radiobutton-box {
    border-color: ${e("radiobutton.checked.hover.border.color")};
    background: ${e("radiobutton.checked.hover.background")};
}

.p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover).p-radiobutton-checked .p-radiobutton-box .p-radiobutton-icon {
    background: ${e("radiobutton.icon.checked.hover.color")};
}

.p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
    border-color: ${e("radiobutton.focus.border.color")};
    box-shadow: ${e("radiobutton.focus.ring.shadow")};
    outline: ${e("radiobutton.focus.ring.width")} ${e("radiobutton.focus.ring.style")} ${e("radiobutton.focus.ring.color")};
    outline-offset: ${e("radiobutton.focus.ring.offset")};
}

.p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
    border-color: ${e("radiobutton.checked.focus.border.color")};
}

p-radiobutton.ng-invalid.ng-dirty .p-radiobutton-box {
    border-color: ${e("radiobutton.invalid.border.color")};
}

.p-radiobutton.p-variant-filled .p-radiobutton-box {
    background: ${e("radiobutton.filled.background")};
}

.p-radiobutton.p-variant-filled.p-radiobutton-checked .p-radiobutton-box {
    background: ${e("radiobutton.checked.background")};
}

.p-radiobutton.p-variant-filled:not(.p-disabled):has(.p-radiobutton-input:hover).p-radiobutton-checked .p-radiobutton-box {
    background: ${e("radiobutton.checked.hover.background")};
}

.p-radiobutton.p-disabled {
    opacity: 1;
}

.p-radiobutton.p-disabled .p-radiobutton-box {
    background: ${e("radiobutton.disabled.background")};
    border-color: ${e("radiobutton.checked.disabled.border.color")};
}

.p-radiobutton-checked.p-disabled .p-radiobutton-box .p-radiobutton-icon {
    background: ${e("radiobutton.icon.disabled.color")};
}

.p-radiobutton-sm,
.p-radiobutton-sm .p-radiobutton-box {
    width: ${e("radiobutton.sm.width")};
    height: ${e("radiobutton.sm.height")};
}

.p-radiobutton-sm .p-radiobutton-icon {
    font-size: ${e("radiobutton.icon.sm.size")};
    width: ${e("radiobutton.icon.sm.size")};
    height: ${e("radiobutton.icon.sm.size")};
}

.p-radiobutton-lg,
.p-radiobutton-lg .p-radiobutton-box {
    width: ${e("radiobutton.lg.width")};
    height: ${e("radiobutton.lg.height")};
}

.p-radiobutton-lg .p-radiobutton-icon {
    font-size: ${e("radiobutton.icon.lg.size")};
    width: ${e("radiobutton.icon.lg.size")};
    height: ${e("radiobutton.icon.lg.size")};
}
`,je={root:({instance:e,props:a})=>["p-radiobutton p-component",{"p-radiobutton-checked":e.checked,"p-disabled":a.disabled,"p-invalid":a.invalid,"p-variant-filled":a.variant?a.variant==="filled":e.config.inputStyle==="filled"||e.config.inputVariant==="filled"}],box:"p-radiobutton-box",input:"p-radiobutton-input",icon:"p-radiobutton-icon"},$e=(()=>{class e extends x{name="radiobutton";theme=Le;classes=je;static \u0275fac=(()=>{let t;return function(o){return(t||(t=s(e)))(o||e)}})();static \u0275prov=f({token:e,factory:e.\u0275fac})}return e})();var Ve={provide:A,useExisting:O(()=>Te),multi:!0},ze=(()=>{class e{accessors=[];add(t,n){this.accessors.push([t,n])}remove(t){this.accessors=this.accessors.filter(n=>n[1]!==t)}select(t){this.accessors.forEach(n=>{this.isSameGroup(n,t)&&n[1]!==t&&n[1].writeValue(t.value)})}isSameGroup(t,n){return t[0].control?t[0].control.root===n.control.control.root&&t[1].name===n.name:!1}static \u0275fac=function(n){return new(n||e)};static \u0275prov=f({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Te=(()=>{class e extends ${value;formControlName;name;disabled;variant;size;tabindex;inputId;ariaLabelledBy;ariaLabel;style;styleClass;autofocus;binary;onClick=new T;onFocus=new T;onBlur=new T;inputViewChild;onModelChange=()=>{};onModelTouched=()=>{};checked;focused;control;_componentStyle=u($e);injector=u(ee);registry=u(ze);ngOnInit(){super.ngOnInit(),this.control=this.injector.get(ye),this.checkName(),this.registry.add(this.control,this)}onChange(t){this.disabled||this.select(t)}select(t){this.disabled||(this.checked=!0,this.onModelChange(this.value),this.registry.select(this),this.onClick.emit({originalEvent:t,value:this.value}))}writeValue(t){this.binary?this.checked=!!t:this.checked=t==this.value,this.inputViewChild&&this.inputViewChild.nativeElement&&(this.inputViewChild.nativeElement.checked=this.checked),this.cd.markForCheck()}registerOnChange(t){this.onModelChange=t}registerOnTouched(t){this.onModelTouched=t}setDisabledState(t){this.disabled=t,this.cd.markForCheck()}onInputFocus(t){this.focused=!0,this.onFocus.emit(t)}onInputBlur(t){this.focused=!1,this.onModelTouched(),this.onBlur.emit(t)}focus(){this.inputViewChild.nativeElement.focus()}ngOnDestroy(){this.registry.remove(this),super.ngOnDestroy()}checkName(){this.name&&this.formControlName&&this.name!==this.formControlName&&this.throwNameError(),!this.name&&this.formControlName&&(this.name=this.formControlName)}throwNameError(){throw new Error(`
          If you define both a name and a formControlName attribute on your radio button, their values
          must match. Ex: <p-radioButton formControlName="food" name="food"></p-radioButton>
        `)}static \u0275fac=(()=>{let t;return function(o){return(t||(t=s(e)))(o||e)}})();static \u0275cmp=m({type:e,selectors:[["p-radioButton"],["p-radiobutton"],["p-radio-button"]],viewQuery:function(n,o){if(n&1&&de(Ee,5),n&2){let i;D(i=F())&&(o.inputViewChild=i.first)}},inputs:{value:"value",formControlName:"formControlName",name:"name",disabled:[2,"disabled","disabled",p],variant:"variant",size:"size",tabindex:[2,"tabindex","tabindex",R],inputId:"inputId",ariaLabelledBy:"ariaLabelledBy",ariaLabel:"ariaLabel",style:"style",styleClass:"styleClass",autofocus:[2,"autofocus","autofocus",p],binary:[2,"binary","binary",p]},outputs:{onClick:"onClick",onFocus:"onFocus",onBlur:"onBlur"},features:[k([Ve,$e]),y],decls:5,vars:24,consts:[["input",""],[3,"ngStyle","ngClass"],["type","radio",1,"p-radiobutton-input",3,"focus","blur","change","checked","disabled","value","pAutoFocus"],[1,"p-radiobutton-box"],[1,"p-radiobutton-icon"]],template:function(n,o){if(n&1){let i=U();B(0,"div",1)(1,"input",2,0),N("focus",function(l){return L(i),j(o.onInputFocus(l))})("blur",function(l){return L(i),j(o.onInputBlur(l))})("change",function(l){return L(i),j(o.onChange(l))}),S(),B(3,"div",3),Q(4,"div",4),S()()}n&2&&(v(o.styleClass),d("ngStyle",o.style)("ngClass",ge(18,Oe,o.checked,o.disabled,o.variant==="filled"||o.config.inputStyle()==="filled"||o.config.inputVariant()==="filled",o.size==="small",o.size==="large")),h("data-pc-name","radiobutton")("data-pc-section","root"),b(),d("checked",o.checked)("disabled",o.disabled)("value",o.value)("pAutoFocus",o.autofocus),h("id",o.inputId)("name",o.name)("aria-labelledby",o.ariaLabelledBy)("aria-label",o.ariaLabel)("tabindex",o.tabindex)("aria-checked",o.checked),b(2),h("data-pc-section","input"),b(),h("data-pc-section","icon"))},dependencies:[_,Z,me,xe,c],encapsulation:2,changeDetection:0})}return e})(),It=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=M({type:e});static \u0275inj=w({imports:[Te,c,c]})}return e})();var Ne=["*"],Re=({dt:e})=>`
.p-iconfield {
    position: relative;
    display: block;
}

.p-inputicon {
    position: absolute;
    top: 50%;
    margin-top: calc(-1 * (${e("icon.size")} / 2));
    color: ${e("iconfield.icon.color")};
    line-height: 1;
}

.p-iconfield .p-inputicon:first-child {
    inset-inline-start: ${e("form.field.padding.x")};
}

.p-iconfield .p-inputicon:last-child {
    inset-inline-end: ${e("form.field.padding.x")};
}

.p-iconfield .p-inputtext:not(:first-child) {
    padding-inline-start: calc((${e("form.field.padding.x")} * 2) + ${e("icon.size")});
}

.p-iconfield .p-inputtext:not(:last-child) {
    padding-inline-end: calc((${e("form.field.padding.x")} * 2) + ${e("icon.size")});
}

.p-iconfield:has(.p-inputfield-sm) .p-inputicon {
    font-size: ${e("form.field.sm.font.size")};
    width: ${e("form.field.sm.font.size")};
    height: ${e("form.field.sm.font.size")};
    margin-top: calc(-1 * (${e("form.field.sm.font.size")} / 2));
}

.p-iconfield:has(.p-inputfield-lg) .p-inputicon {
    font-size: ${e("form.field.lg.font.size")};
    width: ${e("form.field.lg.font.size")};
    height: ${e("form.field.lg.font.size")};
    margin-top: calc(-1 * (${e("form.field.lg.font.size")} / 2));
}
`,Ae={root:"p-iconfield"},Me=(()=>{class e extends x{name="iconfield";theme=Re;classes=Ae;static \u0275fac=(()=>{let t;return function(o){return(t||(t=s(e)))(o||e)}})();static \u0275prov=f({token:e,factory:e.\u0275fac})}return e})();var Pe=(()=>{class e extends ${iconPosition="left";get _styleClass(){return this.styleClass}styleClass;_componentStyle=u(Me);static \u0275fac=(()=>{let t;return function(o){return(t||(t=s(e)))(o||e)}})();static \u0275cmp=m({type:e,selectors:[["p-iconfield"],["p-iconField"],["p-icon-field"]],hostAttrs:[1,"p-iconfield"],hostVars:6,hostBindings:function(n,o){n&2&&(v(o._styleClass),V("p-iconfield-left",o.iconPosition==="left")("p-iconfield-right",o.iconPosition==="right"))},inputs:{iconPosition:"iconPosition",styleClass:"styleClass"},features:[k([Me]),y],ngContentSelectors:Ne,decls:1,vars:0,template:function(n,o){n&1&&(K(),G(0))},dependencies:[_],encapsulation:2,changeDetection:0})}return e})(),At=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=M({type:e});static \u0275inj=w({imports:[Pe]})}return e})();var qe=["*"],Qe={root:"p-inputicon"},Ie=(()=>{class e extends x{name="inputicon";classes=Qe;static \u0275fac=(()=>{let t;return function(o){return(t||(t=s(e)))(o||e)}})();static \u0275prov=f({token:e,factory:e.\u0275fac})}return e})(),Ue=(()=>{class e extends ${styleClass;get hostClasses(){return this.styleClass}_componentStyle=u(Ie);static \u0275fac=(()=>{let t;return function(o){return(t||(t=s(e)))(o||e)}})();static \u0275cmp=m({type:e,selectors:[["p-inputicon"],["p-inputIcon"]],hostVars:4,hostBindings:function(n,o){n&2&&(v(o.hostClasses),V("p-inputicon",!0))},inputs:{styleClass:"styleClass"},features:[k([Ie]),y],ngContentSelectors:qe,decls:1,vars:0,template:function(n,o){n&1&&(K(),G(0))},dependencies:[_,c],encapsulation:2,changeDetection:0})}return e})(),to=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=M({type:e});static \u0275inj=w({imports:[Ue,c,c]})}return e})();var Ke=["icon"],Ge=["content"],De=e=>({$implicit:e}),He=(e,a)=>({"p-togglebutton-icon":!0,"p-togglebutton-icon-left":e,"p-togglebutton-icon-right":a});function Ze(e,a){e&1&&P(0)}function Ye(e,a){if(e&1&&Q(0,"span",1),e&2){let t=C(3);v(t.checked?t.onIcon:t.offIcon),d("ngClass",H(4,He,t.iconPos==="left",t.iconPos==="right")),h("data-pc-section","icon")}}function Je(e,a){if(e&1&&I(0,Ye,1,7,"span",3),e&2){let t=C(2);z(t.onIcon||t.offIcon?0:-1)}}function We(e,a){e&1&&P(0)}function Xe(e,a){if(e&1&&I(0,We,1,0,"ng-container",2),e&2){let t=C(2);d("ngTemplateOutlet",t.iconTemplate||t._iconTemplate)("ngTemplateOutletContext",te(2,De,t.checked))}}function et(e,a){if(e&1&&(I(0,Je,1,1)(1,Xe,1,4,"ng-container"),B(2,"span",1),pe(3),S()),e&2){let t=C();z(t.iconTemplate?1:0),b(2),d("ngClass",t.cx("label")),h("data-pc-section","label"),b(),be(t.checked?t.hasOnLabel?t.onLabel:"\xA0":t.hasOffLabel?t.offLabel:"\xA0")}}var tt=({dt:e})=>`
p-togglebutton {
    display: inline-flex;
}

.p-togglebutton {
    display: inline-flex;
    cursor: pointer;
    user-select: none;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    color: ${e("togglebutton.color")};
    background: ${e("togglebutton.background")};
    border: 1px solid ${e("togglebutton.border.color")};
    padding: ${e("togglebutton.padding")};
    font-size: 1rem;
    font-family: inherit;
    font-feature-settings: inherit;
    transition: background ${e("togglebutton.transition.duration")}, color ${e("togglebutton.transition.duration")}, border-color ${e("togglebutton.transition.duration")},
        outline-color ${e("togglebutton.transition.duration")}, box-shadow ${e("togglebutton.transition.duration")};
    border-radius: ${e("togglebutton.border.radius")};
    outline-color: transparent;
    font-weight: ${e("togglebutton.font.weight")};
}

.p-togglebutton-content {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${e("togglebutton.gap")};
}

.p-togglebutton-label,
.p-togglebutton-icon {
    position: relative;
    transition: none;
}

.p-togglebutton::before {
    content: "";
    background: transparent;
    transition: background ${e("togglebutton.transition.duration")}, color ${e("togglebutton.transition.duration")}, border-color ${e("togglebutton.transition.duration")},
            outline-color ${e("togglebutton.transition.duration")}, box-shadow ${e("togglebutton.transition.duration")};
    position: absolute;
    inset-inline-start: ${e("togglebutton.content.left")};
    top: ${e("togglebutton.content.top")};
    width: calc(100% - calc(2 *  ${e("togglebutton.content.left")}));
    height: calc(100% - calc(2 *  ${e("togglebutton.content.top")}));
    border-radius: ${e("togglebutton.border.radius")};
}

.p-togglebutton.p-togglebutton-checked::before {
    background: ${e("togglebutton.content.checked.background")};
    box-shadow: ${e("togglebutton.content.checked.shadow")};
}

.p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover {
    background: ${e("togglebutton.hover.background")};
    color: ${e("togglebutton.hover.color")};
}

.p-togglebutton.p-togglebutton-checked {
    background: ${e("togglebutton.checked.background")};
    border-color: ${e("togglebutton.checked.border.color")};
    color: ${e("togglebutton.checked.color")};
}

.p-togglebutton:focus-visible {
    box-shadow: ${e("togglebutton.focus.ring.shadow")};
    outline: ${e("togglebutton.focus.ring.width")} ${e("togglebutton.focus.ring.style")} ${e("togglebutton.focus.ring.color")};
    outline-offset: ${e("togglebutton.focus.ring.offset")};
}

.p-togglebutton.p-invalid {
    border-color: ${e("togglebutton.invalid.border.color")};
}

.p-togglebutton:disabled {
    opacity: 1;
    cursor: default;
    background: ${e("togglebutton.disabled.background")};
    border-color: ${e("togglebutton.disabled.border.color")};
    color: ${e("togglebutton.disabled.color")};
}

.p-togglebutton-icon {
    color: ${e("togglebutton.icon.color")};
}

.p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover .p-togglebutton-icon {
    color: ${e("togglebutton.icon.hover.color")};
}

.p-togglebutton.p-togglebutton-checked .p-togglebutton-icon {
    color: ${e("togglebutton.icon.checked.color")};
}

.p-togglebutton:disabled .p-togglebutton-icon {
    color: ${e("togglebutton.icon.disabled.color")};
}

.p-togglebutton-sm {
    padding: ${e("togglebutton.sm.padding")};
    font-size: ${e("togglebutton.sm.font.size")};
}

.p-togglebutton-lg {
    padding: ${e("togglebutton.lg.padding")};
    font-size: ${e("togglebutton.lg.font.size")};
}

/* For PrimeNG (iconPos) */

.p-togglebutton-icon-right {
    order: 1;
}

p-togglebutton.ng-invalid.ng-dirty > .p-togglebutton {
    border-color: ${e("togglebutton.invalid.border.color")};
}
`,ot={root:({instance:e})=>({"p-togglebutton p-component":!0,"p-togglebutton-checked":e.checked,"p-disabled":e.disabled,"p-togglebutton-sm p-inputfield-sm":e.size==="small","p-togglebutton-lg p-inputfield-lg":e.size==="large"}),content:"p-togglebutton-content",icon:"p-togglebutton-icon",label:"p-togglebutton-label"},Be=(()=>{class e extends x{name="togglebutton";theme=tt;classes=ot;static \u0275fac=(()=>{let t;return function(o){return(t||(t=s(e)))(o||e)}})();static \u0275prov=f({token:e,factory:e.\u0275fac})}return e})();var nt={provide:A,useExisting:O(()=>oe),multi:!0},oe=(()=>{class e extends ${onLabel="Yes";offLabel="No";onIcon;offIcon;ariaLabel;ariaLabelledBy;disabled;style;styleClass;get hostClass(){return this.styleClass||""}inputId;tabindex=0;size;iconPos="left";autofocus;allowEmpty;onChange=new T;iconTemplate;contentTemplate;templates;checked=!1;onModelChange=()=>{};onModelTouched=()=>{};_componentStyle=u(Be);toggle(t){!this.disabled&&!(this.allowEmpty===!1&&this.checked)&&(this.checked=!this.checked,this.onModelChange(this.checked),this.onModelTouched(),this.onChange.emit({originalEvent:t,checked:this.checked}),this.cd.markForCheck())}onKeyDown(t){switch(t.code){case"Enter":this.toggle(t),t.preventDefault();break;case"Space":this.toggle(t),t.preventDefault();break}}onBlur(){this.onModelTouched()}writeValue(t){this.checked=t,this.cd.markForCheck()}registerOnChange(t){this.onModelChange=t}registerOnTouched(t){this.onModelTouched=t}setDisabledState(t){this.disabled=t,this.cd.markForCheck()}get hasOnLabel(){return this.onLabel&&this.onLabel.length>0}get hasOffLabel(){return this.onLabel&&this.onLabel.length>0}get active(){return this.checked===!0}_iconTemplate;_contentTemplate;ngAfterContentInit(){this.templates.forEach(t=>{switch(t.getType()){case"icon":this._iconTemplate=t.template;break;case"content":this._contentTemplate=t.template;break;default:this._contentTemplate=t.template;break}})}static \u0275fac=(()=>{let t;return function(o){return(t||(t=s(e)))(o||e)}})();static \u0275cmp=m({type:e,selectors:[["p-toggleButton"],["p-togglebutton"],["p-toggle-button"]],contentQueries:function(n,o,i){if(n&1&&(E(i,Ke,4),E(i,Ge,4),E(i,W,4)),n&2){let r;D(r=F())&&(o.iconTemplate=r.first),D(r=F())&&(o.contentTemplate=r.first),D(r=F())&&(o.templates=r)}},hostVars:2,hostBindings:function(n,o){n&2&&v(o.hostClass)},inputs:{onLabel:"onLabel",offLabel:"offLabel",onIcon:"onIcon",offIcon:"offIcon",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy",disabled:[2,"disabled","disabled",p],style:"style",styleClass:"styleClass",inputId:"inputId",tabindex:[2,"tabindex","tabindex",R],size:"size",iconPos:"iconPos",autofocus:[2,"autofocus","autofocus",p],allowEmpty:"allowEmpty"},outputs:{onChange:"onChange"},features:[k([nt,Be]),y],decls:4,vars:15,consts:[["pRipple","","type","button",3,"click","ngClass","tabindex","disabled"],[3,"ngClass"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[3,"class","ngClass"]],template:function(n,o){n&1&&(B(0,"button",0),N("click",function(r){return o.toggle(r)}),B(1,"span",1),I(2,Ze,1,0,"ng-container",2)(3,et,4,4),S()()),n&2&&(v(o.styleClass),d("ngClass",o.cx("root"))("tabindex",o.tabindex)("disabled",o.disabled),h("aria-labelledby",o.ariaLabelledBy)("aria-pressed",o.checked)("data-p-checked",o.active)("data-p-disabled",o.disabled),b(),d("ngClass",o.cx("content")),b(),d("ngTemplateOutlet",o.contentTemplate||o._contentTemplate)("ngTemplateOutletContext",te(13,De,o.checked)),b(),z(o.contentTemplate?-1:3))},dependencies:[_e,_,Z,Y,c],encapsulation:2,changeDetection:0})}return e})();var it=["item"],rt=(e,a)=>({$implicit:e,index:a});function at(e,a){e&1&&P(0)}function lt(e,a){if(e&1&&I(0,at,1,0,"ng-container",3),e&2){let t=C(2),n=t.$implicit,o=t.$index,i=C();d("ngTemplateOutlet",i.itemTemplate||i._itemTemplate)("ngTemplateOutletContext",H(2,rt,n,o))}}function st(e,a){e&1&&I(0,lt,1,5,"ng-template",null,0,fe)}function ct(e,a){if(e&1){let t=U();B(0,"p-toggleButton",2),N("onChange",function(o){let i=L(t),r=i.$implicit,l=i.$index,g=C();return j(g.onOptionSelect(o,r,l))}),I(1,st,2,0),S()}if(e&2){let t=a.$implicit,n=C();d("autofocus",n.autofocus)("styleClass",n.styleClass)("ngModel",n.isSelected(t))("onLabel",n.getOptionLabel(t))("offLabel",n.getOptionLabel(t))("disabled",n.disabled||n.isOptionDisabled(t))("allowEmpty",n.allowEmpty)("size",n.size),b(),z(n.itemTemplate||n._itemTemplate?1:-1)}}var ut=({dt:e})=>`
.p-selectbutton {
    display: inline-flex;
    user-select: none;
    vertical-align: bottom;
    outline-color: transparent;
    border-radius: ${e("selectbutton.border.radius")};
}

.p-selectbutton .p-togglebutton {
    border-radius: 0;
    border-width: 1px 1px 1px 0;
}

.p-selectbutton .p-togglebutton:focus-visible {
    position: relative;
    z-index: 1;
}

.p-selectbutton p-togglebutton:first-child .p-togglebutton {
    border-left-width: 1px;
    border-start-start-radius: ${e("selectbutton.border.radius")};
    border-end-start-radius: ${e("selectbutton.border.radius")};
}

.p-selectbutton p-togglebutton:last-child .p-togglebutton{
    border-start-end-radius: ${e("selectbutton.border.radius")};
    border-end-end-radius: ${e("selectbutton.border.radius")};
}

.p-selectbutton.ng-invalid.ng-dirty {
    outline: 1px solid ${e("selectbutton.invalid.border.color")};
    outline-offset: 0;
}
`,dt={root:({props:e})=>["p-selectbutton p-component",{"p-invalid":e.invalid}]},Fe=(()=>{class e extends x{name="selectbutton";theme=ut;classes=dt;static \u0275fac=(()=>{let t;return function(o){return(t||(t=s(e)))(o||e)}})();static \u0275prov=f({token:e,factory:e.\u0275fac})}return e})();var pt={provide:A,useExisting:O(()=>Se),multi:!0},Se=(()=>{class e extends ${options;optionLabel;optionValue;optionDisabled;unselectable=!1;tabindex=0;multiple;allowEmpty=!0;style;styleClass;ariaLabelledBy;size;disabled;dataKey;autofocus;onOptionClick=new T;onChange=new T;itemTemplate;_itemTemplate;get equalityKey(){return this.optionValue?null:this.dataKey}value;onModelChange=()=>{};onModelTouched=()=>{};focusedIndex=0;_componentStyle=u(Fe);getOptionLabel(t){return this.optionLabel?J(t,this.optionLabel):t.label!=null?t.label:t}getOptionValue(t){return this.optionValue?J(t,this.optionValue):this.optionLabel||t.value===void 0?t:t.value}isOptionDisabled(t){return this.optionDisabled?J(t,this.optionDisabled):t.disabled!==void 0?t.disabled:!1}writeValue(t){this.value=t,this.cd.markForCheck()}registerOnChange(t){this.onModelChange=t}registerOnTouched(t){this.onModelTouched=t}setDisabledState(t){this.disabled=t,this.cd.markForCheck()}onOptionSelect(t,n,o){if(this.disabled||this.isOptionDisabled(n))return;let i=this.isSelected(n);if(i&&this.unselectable)return;let r=this.getOptionValue(n),l;if(this.multiple)i?l=this.value.filter(g=>!q(g,r,this.equalityKey)):l=this.value?[...this.value,r]:[r];else{if(i&&!this.allowEmpty)return;l=i?null:r}this.focusedIndex=o,this.value=l,this.onModelChange(this.value),this.onChange.emit({originalEvent:t,value:this.value}),this.onOptionClick.emit({originalEvent:t,option:n,index:o})}changeTabIndexes(t,n){let o,i;for(let r=0;r<=this.el.nativeElement.children.length-1;r++)this.el.nativeElement.children[r].getAttribute("tabindex")==="0"&&(o={elem:this.el.nativeElement.children[r],index:r});n==="prev"?o.index===0?i=this.el.nativeElement.children.length-1:i=o.index-1:o.index===this.el.nativeElement.children.length-1?i=0:i=o.index+1,this.focusedIndex=i,this.el.nativeElement.children[i].focus()}onFocus(t,n){this.focusedIndex=n}onBlur(){this.onModelTouched()}removeOption(t){this.value=this.value.filter(n=>!q(n,this.getOptionValue(t),this.dataKey))}isSelected(t){let n=!1,o=this.getOptionValue(t);if(this.multiple){if(this.value&&Array.isArray(this.value)){for(let i of this.value)if(q(i,o,this.dataKey)){n=!0;break}}}else n=q(this.getOptionValue(t),this.value,this.equalityKey);return n}templates;ngAfterContentInit(){this.templates.forEach(t=>{switch(t.getType()){case"item":this._itemTemplate=t.template;break}})}static \u0275fac=(()=>{let t;return function(o){return(t||(t=s(e)))(o||e)}})();static \u0275cmp=m({type:e,selectors:[["p-selectButton"],["p-selectbutton"],["p-select-button"]],contentQueries:function(n,o,i){if(n&1&&(E(i,it,4),E(i,W,4)),n&2){let r;D(r=F())&&(o.itemTemplate=r.first),D(r=F())&&(o.templates=r)}},hostVars:10,hostBindings:function(n,o){n&2&&(h("role","group")("aria-labelledby",o.ariaLabelledBy)("data-pc-section","root")("data-pc-name","selectbutton"),le(o.style),V("p-selectbutton",!0)("p-component",!0))},inputs:{options:"options",optionLabel:"optionLabel",optionValue:"optionValue",optionDisabled:"optionDisabled",unselectable:[2,"unselectable","unselectable",p],tabindex:[2,"tabindex","tabindex",R],multiple:[2,"multiple","multiple",p],allowEmpty:[2,"allowEmpty","allowEmpty",p],style:"style",styleClass:"styleClass",ariaLabelledBy:"ariaLabelledBy",size:"size",disabled:[2,"disabled","disabled",p],dataKey:"dataKey",autofocus:[2,"autofocus","autofocus",p]},outputs:{onOptionClick:"onOptionClick",onChange:"onChange"},features:[k([pt,Fe]),y],decls:2,vars:0,consts:[["content",""],[3,"autofocus","styleClass","ngModel","onLabel","offLabel","disabled","allowEmpty","size"],[3,"onChange","autofocus","styleClass","ngModel","onLabel","offLabel","disabled","allowEmpty","size"],[4,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function(n,o){n&1&&ce(0,ct,2,9,"p-toggleButton",1,se),n&2&&ue(o.options)},dependencies:[oe,ke,ve,Ce,_,Y,c],encapsulation:2,changeDetection:0})}return e})(),No=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=M({type:e});static \u0275inj=w({imports:[Se,c,c]})}return e})();function bt(e){return e?.injector||re(bt),he(ie(ne({},e),{loader:void 0,stream:a=>{let t,n=()=>t.unsubscribe();a.abortSignal.addEventListener("abort",n);let o=ae({value:void 0}),i,r=new Promise(g=>i=g);function l(g){o.set(g),i?.(o),i=void 0}return t=e.loader(a).subscribe({next:g=>l({value:g}),error:g=>l({error:g}),complete:()=>{i&&l({error:new Error("Resource completed before producing a value")}),a.abortSignal.removeEventListener("abort",n)}}),r}}))}var Xo={production:!1,apiUrl:"http://localhost:5165/api/"};export{Se as a,No as b,Te as c,It as d,Pe as e,At as f,Ue as g,to as h,bt as i,Xo as j};
