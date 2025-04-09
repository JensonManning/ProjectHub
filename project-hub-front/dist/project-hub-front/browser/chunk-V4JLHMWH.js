import{c as Xe,g as tt,h as it,l as De}from"./chunk-7OIDS63O.js";import{a as Ct}from"./chunk-QXRNZP2L.js";import{A as rt,Aa as Ke,Da as _t,E as st,Fa as ft,G as ae,Ga as gt,H as oe,Ha as yt,I as ze,J as He,N as Ce,Na as Te,Pa as vt,Ra as bt,Sa as Re,U as xe,X as Ie,Xa as xt,Y as O,Ya as It,Z as pt,a as Je,aa as J,ba as ct,d as nt,da as ut,e as N,g as U,j as ot,l as at,m as lt,o as me,p as ne,q as V,sa as X,ta as we,wa as mt,xa as dt,za as ht}from"./chunk-NB76KGKE.js";import{$ as u,$a as Ne,Ab as w,Cb as b,Db as r,Eb as ye,Ec as te,Fb as ve,Fc as be,Gc as ie,Hc as pe,Ia as Me,Ib as x,Ic as ce,Ja as fe,Jb as A,Kb as g,Lb as y,Lc as j,Ma as p,N as he,Nc as ue,O as D,Ob as F,P as z,Pb as R,Qa as Pe,Qb as W,Ra as $,Rb as Le,T as Be,Tb as Ge,Tc as et,U as Q,Ub as Ze,Uc as $e,Vb as We,Wb as Y,Wc as Ae,Xb as re,Ya as q,Yb as I,Yc as Fe,Za as K,Zb as P,_a as je,aa as m,ab as Z,ca as H,cb as c,ec as Ve,fc as Ee,hc as E,ia as C,ja as _e,jb as f,kb as s,lb as Ue,ma as Qe,mb as ge,mc as v,na as G,nb as ee,nc as B,ob as S,pc as se,qc as Ye,ra as qe,ub as d,vb as h,wb as k,xb as M,yb as L,zb as T}from"./chunk-U6KPTH7L.js";var zt=["*"];function Ht(t,a){if(t&1&&(d(0,"span",3),R(1),h()),t&2){let e=r();p(),W(e.label)}}function Kt(t,a){if(t&1&&k(0,"span",5),t&2){let e=r(2);S(e.icon),s("ngClass","p-avatar-icon")}}function Rt(t,a){if(t&1&&c(0,Kt,1,3,"span",4),t&2){let e=r(),i=F(5);s("ngIf",e.icon)("ngIfElse",i)}}function Bt(t,a){if(t&1){let e=w();d(0,"img",7),b("error",function(n){u(e);let o=r(2);return m(o.imageError(n))}),h()}if(t&2){let e=r(2);s("src",e.image,fe),f("aria-label",e.ariaLabel)}}function Qt(t,a){if(t&1&&c(0,Bt,1,2,"img",6),t&2){let e=r();s("ngIf",e.image)}}var qt=({dt:t})=>`
.p-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: ${t("avatar.width")};
    height: ${t("avatar.height")};
    font-size: ${t("avatar.font.size")};
    color: ${t("avatar.color")};
    background: ${t("avatar.background")};
    border-radius: ${t("avatar.border.radius")};
}

.p-avatar-image {
    background: transparent;
}

.p-avatar-circle {
    border-radius: 50%;
}

.p-avatar-circle img {
    border-radius: 50%;
}

.p-avatar-icon {
    font-size: ${t("avatar.icon.size")};
    width: ${t("avatar.icon.size")};
    height: ${t("avatar.icon.size")};
}

.p-avatar img {
    width: 100%;
    height: 100%;
}

.p-avatar-lg {
    width: ${t("avatar.lg.width")};
    height: ${t("avatar.lg.width")};
    font-size: ${t("avatar.lg.font.size")};
}

.p-avatar-lg .p-avatar-icon {
    font-size: ${t("avatar.lg.icon.size")};
    width: ${t("avatar.lg.icon.size")};
    height: ${t("avatar.lg.icon.size")};
}

.p-avatar-xl {
    width: ${t("avatar.xl.width")};
    height: ${t("avatar.xl.width")};
    font-size: ${t("avatar.xl.font.size")};
}

.p-avatar-xl .p-avatar-icon {
    font-size: ${t("avatar.xl.font.size")};
    width: ${t("avatar.xl.icon.size")};
    height: ${t("avatar.xl.icon.size")};
}

.p-avatar-group {
    display: flex;
    align-items: center;
}

.p-avatar-group .p-avatar + .p-avatar {
    margin-inline-start: ${t("avatar.group.offset")};
}

.p-avatar-group .p-avatar {
    border: 2px solid ${t("avatar.group.border.color")};
}

.p-avatar-group .p-avatar-lg + .p-avatar-lg {
    margin-inline-start: ${t("avatar.lg.group.offset")};
}

.p-avatar-group .p-avatar-xl + .p-avatar-xl {
    margin-inline-start: ${t("avatar.xl.group.offset")};
}
`,Pt={root:({props:t})=>["p-avatar p-component",{"p-avatar-image":t.image!=null,"p-avatar-circle":t.shape==="circle","p-avatar-lg":t.size==="large","p-avatar-xl":t.size==="xlarge"}],label:"p-avatar-label",icon:"p-avatar-icon"},wt=(()=>{class t extends J{name="avatar";theme=qt;classes=Pt;static \u0275fac=(()=>{let e;return function(n){return(e||(e=H(t)))(n||t)}})();static \u0275prov=D({token:t,factory:t.\u0275fac})}return t})();var jt=(()=>{class t extends X{label;icon;image;size="normal";shape="square";style;styleClass;ariaLabel;ariaLabelledBy;onImageError=new C;_componentStyle=Q(wt);imageError(e){this.onImageError.emit(e)}get hostClass(){return this.styleClass}static \u0275fac=(()=>{let e;return function(n){return(e||(e=H(t)))(n||t)}})();static \u0275cmp=q({type:t,selectors:[["p-avatar"]],hostVars:19,hostBindings:function(i,n){i&2&&(f("data-pc-name","avatar")("aria-label",n.ariaLabel)("aria-labelledby",n.ariaLabelledBy),ee(n.style),S(n.hostClass),ge("p-avatar",!0)("p-component",!0)("p-avatar-circle",n.shape==="circle")("p-avatar-lg",n.size==="large")("p-avatar-xl",n.size==="xlarge")("p-avatar-image",n.image!=null))},inputs:{label:"label",icon:"icon",image:"image",size:"size",shape:"shape",style:"style",styleClass:"styleClass",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy"},outputs:{onImageError:"onImageError"},features:[Y([wt]),Z],ngContentSelectors:zt,decls:6,vars:2,consts:[["iconTemplate",""],["imageTemplate",""],["class","p-avatar-text",4,"ngIf","ngIfElse"],[1,"p-avatar-text"],[3,"class","ngClass",4,"ngIf","ngIfElse"],[3,"ngClass"],[3,"src","error",4,"ngIf"],[3,"error","src"]],template:function(i,n){if(i&1&&(ye(),ve(0),c(1,Ht,2,1,"span",2)(2,Rt,1,2,"ng-template",null,0,E)(4,Qt,1,1,"ng-template",null,1,E)),i&2){let o=F(3);p(),s("ngIf",n.label)("ngIfElse",o)}},dependencies:[j,te,ie,O],encapsulation:2,changeDetection:0})}return t})(),ko=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=K({type:t});static \u0275inj=z({imports:[jt,O,O]})}return t})();var Do=(()=>{class t{el;renderer;zone;constructor(e,i,n){this.el=e,this.renderer=i,this.zone=n}selector;set enterClass(e){this._enterClass=e,console.log("enterClass is deprecated, use enterFromClass instead")}get enterClass(){return this._enterClass}enterFromClass;enterActiveClass;enterToClass;set leaveClass(e){this._leaveClass=e,console.log("leaveClass is deprecated, use leaveFromClass instead")}get leaveClass(){return this._leaveClass}leaveFromClass;leaveActiveClass;leaveToClass;hideOnOutsideClick;toggleClass;hideOnEscape;eventListener;documentClickListener;documentKeydownListener;target;enterListener;leaveListener;animating;_enterClass;_leaveClass;clickListener(){this.target=this.resolveTarget(),this.toggleClass?this.toggle():this.target?.offsetParent===null?this.enter():this.leave()}toggle(){nt(this.target,this.toggleClass)?U(this.target,this.toggleClass):N(this.target,this.toggleClass)}enter(){this.enterActiveClass?this.animating||(this.animating=!0,this.enterActiveClass==="animate-slidedown"&&(this.target.style.height="0px",U(this.target,"hidden"),this.target.style.maxHeight=this.target.scrollHeight+"px",N(this.target,"hidden"),this.target.style.height=""),N(this.target,this.enterActiveClass),(this.enterClass||this.enterFromClass)&&U(this.target,this.enterClass||this.enterFromClass),this.enterListener=this.renderer.listen(this.target,"animationend",()=>{U(this.target,this.enterActiveClass),this.enterToClass&&N(this.target,this.enterToClass),this.enterListener&&this.enterListener(),this.enterActiveClass==="animate-slidedown"&&(this.target.style.maxHeight=""),this.animating=!1})):((this.enterClass||this.enterFromClass)&&U(this.target,this.enterClass||this.enterFromClass),this.enterToClass&&N(this.target,this.enterToClass)),this.hideOnOutsideClick&&this.bindDocumentClickListener(),this.hideOnEscape&&this.bindDocumentKeydownListener()}leave(){this.leaveActiveClass?this.animating||(this.animating=!0,N(this.target,this.leaveActiveClass),(this.leaveClass||this.leaveFromClass)&&U(this.target,this.leaveClass||this.leaveFromClass),this.leaveListener=this.renderer.listen(this.target,"animationend",()=>{U(this.target,this.leaveActiveClass),this.leaveToClass&&N(this.target,this.leaveToClass),this.leaveListener&&this.leaveListener(),this.animating=!1})):((this.leaveClass||this.leaveFromClass)&&U(this.target,this.leaveClass||this.leaveFromClass),this.leaveToClass&&N(this.target,this.leaveToClass)),this.hideOnOutsideClick&&this.unbindDocumentClickListener(),this.hideOnEscape&&this.unbindDocumentKeydownListener()}resolveTarget(){if(this.target)return this.target;switch(this.selector){case"@next":return this.el.nativeElement.nextElementSibling;case"@prev":return this.el.nativeElement.previousElementSibling;case"@parent":return this.el.nativeElement.parentElement;case"@grandparent":return this.el.nativeElement.parentElement.parentElement;default:return document.querySelector(this.selector)}}bindDocumentClickListener(){this.documentClickListener||(this.documentClickListener=this.renderer.listen(this.el.nativeElement.ownerDocument,"click",e=>{!this.isVisible()||getComputedStyle(this.target).getPropertyValue("position")==="static"?this.unbindDocumentClickListener():this.isOutsideClick(e)&&this.leave()}))}bindDocumentKeydownListener(){this.documentKeydownListener||this.zone.runOutsideAngular(()=>{this.documentKeydownListener=this.renderer.listen(this.el.nativeElement.ownerDocument,"keydown",e=>{let{key:i,keyCode:n,which:o,type:l}=e;(!this.isVisible()||getComputedStyle(this.target).getPropertyValue("position")==="static")&&this.unbindDocumentKeydownListener(),this.isVisible()&&i==="Escape"&&n===27&&o===27&&this.leave()})})}isVisible(){return this.target.offsetParent!==null}isOutsideClick(e){return!this.el.nativeElement.isSameNode(e.target)&&!this.el.nativeElement.contains(e.target)&&!this.target.contains(e.target)}unbindDocumentClickListener(){this.documentClickListener&&(this.documentClickListener(),this.documentClickListener=null)}unbindDocumentKeydownListener(){this.documentKeydownListener&&(this.documentKeydownListener(),this.documentKeydownListener=null)}ngOnDestroy(){this.target=null,this.eventListener&&this.eventListener(),this.unbindDocumentClickListener(),this.unbindDocumentKeydownListener()}static \u0275fac=function(i){return new(i||t)($(Qe),$(Pe),$(_e))};static \u0275dir=je({type:t,selectors:[["","pStyleClass",""]],hostBindings:function(i,n){i&1&&b("click",function(l){return n.clickListener(l)})},inputs:{selector:[0,"pStyleClass","selector"],enterClass:"enterClass",enterFromClass:"enterFromClass",enterActiveClass:"enterActiveClass",enterToClass:"enterToClass",leaveClass:"leaveClass",leaveFromClass:"leaveFromClass",leaveActiveClass:"leaveActiveClass",leaveToClass:"leaveToClass",hideOnOutsideClick:[2,"hideOnOutsideClick","hideOnOutsideClick",v],toggleClass:"toggleClass",hideOnEscape:[2,"hideOnEscape","hideOnEscape",v]}})}return t})(),zo=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=K({type:t});static \u0275inj=z({})}return t})();var Ut=["pMenuItemContent",""],St=t=>({"p-disabled":t}),Oe=t=>({$implicit:t}),Gt=()=>({exact:!1});function Zt(t,a){t&1&&T(0)}function Wt(t,a){if(t&1&&(d(0,"a",6),c(1,Zt,1,0,"ng-container",7),h()),t&2){let e=r(2),i=F(4);s("target",e.item.target)("ngClass",I(9,St,e.item.disabled)),f("title",e.item.title)("href",e.item.url||null,fe)("data-automationid",e.item.automationId)("tabindex",-1)("data-pc-section","action"),p(),s("ngTemplateOutlet",i)("ngTemplateOutletContext",I(11,Oe,e.item))}}function Yt(t,a){t&1&&T(0)}function Jt(t,a){if(t&1&&(d(0,"a",8),c(1,Yt,1,0,"ng-container",7),h()),t&2){let e=r(2),i=F(4);s("routerLink",e.item.routerLink)("queryParams",e.item.queryParams)("routerLinkActiveOptions",e.item.routerLinkActiveOptions||re(17,Gt))("target",e.item.target)("ngClass",I(18,St,e.item.disabled))("fragment",e.item.fragment)("queryParamsHandling",e.item.queryParamsHandling)("preserveFragment",e.item.preserveFragment)("skipLocationChange",e.item.skipLocationChange)("replaceUrl",e.item.replaceUrl)("state",e.item.state),f("data-automationid",e.item.automationId)("tabindex",-1)("data-pc-section","action")("title",e.item.title),p(),s("ngTemplateOutlet",i)("ngTemplateOutletContext",I(20,Oe,e.item))}}function Xt(t,a){if(t&1&&(M(0),c(1,Wt,2,13,"a",4)(2,Jt,2,22,"a",5),L()),t&2){let e=r();p(),s("ngIf",!(e.item!=null&&e.item.routerLink)),p(),s("ngIf",e.item==null?null:e.item.routerLink)}}function ei(t,a){}function ti(t,a){t&1&&c(0,ei,0,0,"ng-template")}function ii(t,a){if(t&1&&(M(0),c(1,ti,1,0,null,7),L()),t&2){let e=r();p(),s("ngTemplateOutlet",e.itemTemplate)("ngTemplateOutletContext",I(2,Oe,e.item))}}function ni(t,a){if(t&1&&k(0,"span",12),t&2){let e=r(2);S(e.item.iconClass),s("ngClass",e.item.icon)("ngStyle",e.item.iconStyle)}}function oi(t,a){if(t&1&&(d(0,"span",13),R(1),h()),t&2){let e=r(2);p(),W(e.item.label)}}function ai(t,a){if(t&1&&(k(0,"span",14),Ve(1,"safeHtml")),t&2){let e=r(2);s("innerHTML",Ee(1,1,e.item.label),Me)}}function li(t,a){if(t&1&&k(0,"p-badge",15),t&2){let e=r(2);s("styleClass",e.item.badgeStyleClass)("value",e.item.badge)}}function ri(t,a){if(t&1&&c(0,ni,1,4,"span",9)(1,oi,2,1,"span",10)(2,ai,2,3,"ng-template",null,1,E)(4,li,1,2,"p-badge",11),t&2){let e=F(3),i=r();s("ngIf",i.item.icon),p(),s("ngIf",i.item.escape!==!1)("ngIfElse",e),p(3),s("ngIf",i.item.badge)}}var si=["start"],pi=["end"],ci=["header"],ui=["item"],mi=["submenuheader"],di=["list"],hi=["container"],_i=t=>({"p-menu p-component":!0,"p-menu-overlay":t}),fi=(t,a)=>({showTransitionParams:t,hideTransitionParams:a}),gi=t=>({value:"visible",params:t}),yi=(t,a)=>({"p-hidden":t,flex:a}),kt=(t,a)=>({"p-focus":t,"p-disabled":a});function vi(t,a){t&1&&T(0)}function bi(t,a){if(t&1&&(d(0,"div",9),c(1,vi,1,0,"ng-container",10),h()),t&2){let e,i=r(2);f("data-pc-section","start"),p(),s("ngTemplateOutlet",(e=i.startTemplate)!==null&&e!==void 0?e:i._startTemplate)}}function Ci(t,a){t&1&&k(0,"li",14)}function xi(t,a){if(t&1&&(d(0,"span"),R(1),h()),t&2){let e=r(3).$implicit;p(),W(e.label)}}function Ii(t,a){if(t&1&&(k(0,"span",18),Ve(1,"safeHtml")),t&2){let e=r(3).$implicit;s("innerHTML",Ee(1,1,e.label),Me)}}function wi(t,a){if(t&1&&(M(0),c(1,xi,2,1,"span",17)(2,Ii,2,3,"ng-template",null,2,E),L()),t&2){let e=F(3),i=r(2).$implicit;p(),s("ngIf",i.escape!==!1)("ngIfElse",e)}}function Ti(t,a){t&1&&T(0)}function Oi(t,a){if(t&1&&(d(0,"li",15),c(1,wi,4,2,"ng-container",7)(2,Ti,1,0,"ng-container",16),h()),t&2){let e,i=r(),n=i.$implicit,o=i.index,l=r(3);s("ngClass",P(7,yi,n.visible===!1,n.visible))("tooltipOptions",n.tooltipOptions),f("data-automationid",n.automationId)("id",l.menuitemId(n,l.id,o)),p(),s("ngIf",!l.submenuHeaderTemplate&&!l._submenuHeaderTemplate),p(),s("ngTemplateOutlet",(e=l.submenuHeaderTemplate)!==null&&e!==void 0?e:l._submenuHeaderTemplate)("ngTemplateOutletContext",I(10,Oe,n))}}function Si(t,a){t&1&&k(0,"li",14)}function ki(t,a){if(t&1){let e=w();d(0,"li",20),b("onMenuItemClick",function(n){u(e);let o=r(),l=o.$implicit,_=o.index,le=r().index,ke=r(3);return m(ke.itemClick(n,ke.menuitemId(l,ke.id,le,_)))}),h()}if(t&2){let e,i=r(),n=i.$implicit,o=i.index,l=r().index,_=r(3);S(n.styleClass),s("pMenuItemContent",n)("itemTemplate",(e=_.itemTemplate)!==null&&e!==void 0?e:_._itemTemplate)("ngClass",P(13,kt,_.focusedOptionId()&&_.menuitemId(n,_.id,l,o)===_.focusedOptionId(),_.disabled(n.disabled)))("ngStyle",n.style)("tooltipOptions",n.tooltipOptions),f("data-pc-section","menuitem")("aria-label",_.label(n.label))("data-p-focused",_.isItemFocused(_.menuitemId(n,_.id,l,o)))("data-p-disabled",_.disabled(n.disabled))("aria-disabled",_.disabled(n.disabled))("id",_.menuitemId(n,_.id,l,o))}}function Mi(t,a){if(t&1&&c(0,Si,1,0,"li",12)(1,ki,1,16,"li",19),t&2){let e=a.$implicit,i=r().$implicit;s("ngIf",e.separator&&(e.visible!==!1||i.visible!==!1)),p(),s("ngIf",!e.separator&&e.visible!==!1&&(e.visible!==void 0||i.visible!==!1))}}function Li(t,a){if(t&1&&c(0,Ci,1,0,"li",12)(1,Oi,3,12,"li",13)(2,Mi,2,2,"ng-template",11),t&2){let e=a.$implicit;s("ngIf",e.separator&&e.visible!==!1),p(),s("ngIf",!e.separator),p(),s("ngForOf",e.items)}}function Vi(t,a){if(t&1&&c(0,Li,3,3,"ng-template",11),t&2){let e=r(2);s("ngForOf",e.model)}}function Ei(t,a){t&1&&k(0,"li",14)}function $i(t,a){if(t&1){let e=w();d(0,"li",20),b("onMenuItemClick",function(n){u(e);let o=r(),l=o.$implicit,_=o.index,le=r(3);return m(le.itemClick(n,le.menuitemId(l,le.id,_)))}),h()}if(t&2){let e,i=r(),n=i.$implicit,o=i.index,l=r(3);S(n.styleClass),s("pMenuItemContent",n)("itemTemplate",(e=l.itemTemplate)!==null&&e!==void 0?e:l._itemTemplate)("ngClass",P(13,kt,l.focusedOptionId()&&l.menuitemId(n,l.id,o)===l.focusedOptionId(),l.disabled(n.disabled)))("ngStyle",n.style)("tooltipOptions",n.tooltipOptions),f("data-pc-section","menuitem")("aria-label",l.label(n.label))("data-p-focused",l.isItemFocused(l.menuitemId(n,l.id,o)))("data-p-disabled",l.disabled(n.disabled))("aria-disabled",l.disabled(n.disabled))("id",l.menuitemId(n,l.id,o))}}function Ai(t,a){if(t&1&&c(0,Ei,1,0,"li",12)(1,$i,1,16,"li",19),t&2){let e=a.$implicit;s("ngIf",e.separator&&e.visible!==!1),p(),s("ngIf",!e.separator&&e.visible!==!1)}}function Fi(t,a){if(t&1&&c(0,Ai,2,2,"ng-template",11),t&2){let e=r(2);s("ngForOf",e.model)}}function Di(t,a){t&1&&T(0)}function zi(t,a){if(t&1&&(d(0,"div",21),c(1,Di,1,0,"ng-container",10),h()),t&2){let e,i=r(2);f("data-pc-section","end"),p(),s("ngTemplateOutlet",(e=i.endTemplate)!==null&&e!==void 0?e:i._endTemplate)}}function Hi(t,a){if(t&1){let e=w();d(0,"div",4,0),b("click",function(n){u(e);let o=r();return m(o.onOverlayClick(n))})("@overlayAnimation.start",function(n){u(e);let o=r();return m(o.onOverlayAnimationStart(n))})("@overlayAnimation.done",function(n){u(e);let o=r();return m(o.onOverlayAnimationEnd(n))}),c(2,bi,2,2,"div",5),d(3,"ul",6,1),b("focus",function(n){u(e);let o=r();return m(o.onListFocus(n))})("blur",function(n){u(e);let o=r();return m(o.onListBlur(n))})("keydown",function(n){u(e);let o=r();return m(o.onListKeyDown(n))}),c(5,Vi,1,1,null,7)(6,Fi,1,1,null,7),h(),c(7,zi,2,2,"div",8),h()}if(t&2){let e,i,n=r();S(n.styleClass),s("ngClass",I(18,_i,n.popup))("ngStyle",n.style)("@overlayAnimation",I(23,gi,P(20,fi,n.showTransitionOptions,n.hideTransitionOptions)))("@.disabled",n.popup!==!0),f("data-pc-name","menu")("id",n.id),p(2),s("ngIf",(e=n.startTemplate)!==null&&e!==void 0?e:n._startTemplate),p(),f("id",n.id+"_list")("tabindex",n.getTabIndexValue())("data-pc-section","menu")("aria-activedescendant",n.activedescendant())("aria-label",n.ariaLabel)("aria-labelledBy",n.ariaLabelledBy),p(2),s("ngIf",n.hasSubMenu()),p(),s("ngIf",!n.hasSubMenu()),p(),s("ngIf",(i=n.endTemplate)!==null&&i!==void 0?i:n._endTemplate)}}var Ki=({dt:t})=>`
.p-menu {
    background: ${t("menu.background")};
    color: ${t("menu.color")};
    border: 1px solid ${t("menu.border.color")};
    border-radius: ${t("menu.border.radius")};
    min-width: 12.5rem;
}

.p-menu-list {
    margin: 0;
    padding: ${t("menu.list.padding")};
    outline: 0 none;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: ${t("menu.list.gap")};
}

.p-menu-item-content {
    transition: background ${t("menu.transition.duration")}, color ${t("menu.transition.duration")};
    border-radius: ${t("menu.item.border.radius")};
    color: ${t("menu.item.color")};
}

.p-menu-item-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    text-decoration: none;
    overflow: hidden;
    position: relative;
    color: inherit;
    padding: ${t("menu.item.padding")};
    gap: ${t("menu.item.gap")};
    user-select: none;
    outline: 0 none;
}

.p-menu-item-label {
    line-height: 1;
}

.p-menu-item-icon {
    color: ${t("menu.item.icon.color")};
}

.p-menu-item.p-focus .p-menu-item-content {
    color: ${t("menu.item.focus.color")};
    background: ${t("menu.item.focus.background")};
}

.p-menu-item.p-focus .p-menu-item-icon {
    color: ${t("menu.item.icon.focus.color")};
}

.p-menu-item:not(.p-disabled) .p-menu-item-content:hover {
    color: ${t("menu.item.focus.color")};
    background: ${t("menu.item.focus.background")};
}

.p-menu-item:not(.p-disabled) .p-menu-item-content:hover .p-menu-item-icon {
    color: ${t("menu.item.icon.focus.color")};
}

.p-menu-overlay {
    box-shadow: ${t("menu.shadow")};
}

.p-menu-submenu-label {
    background: ${t("menu.submenu.label.background")};
    padding: ${t("menu.submenu.label.padding")};
    color: ${t("menu.submenu.label.color")};
    font-weight: ${t("menu.submenu.label.font.weight")};
}

.p-menu-separator {
    border-top: 1px solid ${t("menu.separator.border.color")};
}

/* For PrimeNG */
.p-menu-overlay {
    position: absolute;
}
`,Ri={root:({props:t})=>["p-menu p-component",{"p-menu-overlay":t.popup}],start:"p-menu-start",list:"p-menu-list",submenuLabel:"p-menu-submenu-label",separator:"p-menu-separator",end:"p-menu-end",item:({instance:t})=>["p-menu-item",{"p-focus":t.id===t.focusedOptionId,"p-disabled":t.disabled()}],itemContent:"p-menu-item-content",itemLink:"p-menu-item-link",itemIcon:"p-menu-item-icon",itemLabel:"p-menu-item-label"},Ot=(()=>{class t extends J{name="menu";theme=Ki;classes=Ri;static \u0275fac=(()=>{let e;return function(n){return(e||(e=H(t)))(n||t)}})();static \u0275prov=D({token:t,factory:t.\u0275fac})}return t})();var Mt=(()=>{class t{platformId;sanitizer;constructor(e,i){this.platformId=e,this.sanitizer=i}transform(e){return!e||!ue(this.platformId)?e:this.sanitizer.bypassSecurityTrustHtml(e)}static \u0275fac=function(i){return new(i||t)($(qe,16),$(Xe,16))};static \u0275pipe=Ne({name:"safeHtml",type:t,pure:!0})}return t})(),Bi=(()=>{class t{item;itemTemplate;onMenuItemClick=new C;menu;constructor(e){this.menu=e}onItemClick(e,i){this.onMenuItemClick.emit({originalEvent:e,item:i})}static \u0275fac=function(i){return new(i||t)($(he(()=>Lt)))};static \u0275cmp=q({type:t,selectors:[["","pMenuItemContent",""]],inputs:{item:[0,"pMenuItemContent","item"],itemTemplate:"itemTemplate"},outputs:{onMenuItemClick:"onMenuItemClick"},attrs:Ut,decls:5,vars:3,consts:[["itemContent",""],["htmlLabel",""],[1,"p-menu-item-content",3,"click"],[4,"ngIf"],["class","p-menu-item-link","pRipple","",3,"target","ngClass",4,"ngIf"],["routerLinkActive","p-menu-item-link-active","class","p-menu-item-link","pRipple","",3,"routerLink","queryParams","routerLinkActiveOptions","target","ngClass","fragment","queryParamsHandling","preserveFragment","skipLocationChange","replaceUrl","state",4,"ngIf"],["pRipple","",1,"p-menu-item-link",3,"target","ngClass"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["routerLinkActive","p-menu-item-link-active","pRipple","",1,"p-menu-item-link",3,"routerLink","queryParams","routerLinkActiveOptions","target","ngClass","fragment","queryParamsHandling","preserveFragment","skipLocationChange","replaceUrl","state"],["class","p-menu-item-icon",3,"ngClass","class","ngStyle",4,"ngIf"],["class","p-menu-item-label",4,"ngIf","ngIfElse"],[3,"styleClass","value",4,"ngIf"],[1,"p-menu-item-icon",3,"ngClass","ngStyle"],[1,"p-menu-item-label"],[1,"p-menu-item-label",3,"innerHTML"],[3,"styleClass","value"]],template:function(i,n){if(i&1){let o=w();d(0,"div",2),b("click",function(_){return u(o),m(n.onItemClick(_,n.item))}),c(1,Xt,3,2,"ng-container",3)(2,ii,2,4,"ng-container",3)(3,ri,5,4,"ng-template",null,0,E),h()}i&2&&(f("data-pc-section","content"),p(),s("ngIf",!n.itemTemplate),p(),s("ngIf",n.itemTemplate))},dependencies:[j,te,ie,ce,pe,De,tt,it,we,Re,Ke,ht,O,Mt],encapsulation:2})}return t})(),Lt=(()=>{class t extends X{overlayService;model;popup;style;styleClass;appendTo;autoZIndex=!0;baseZIndex=0;showTransitionOptions=".12s cubic-bezier(0, 0, 0.2, 1)";hideTransitionOptions=".1s linear";ariaLabel;ariaLabelledBy;id;tabindex=0;onShow=new C;onHide=new C;onBlur=new C;onFocus=new C;listViewChild;containerViewChild;container;scrollHandler;documentClickListener;documentResizeListener;preventDocumentDefault;target;visible;focusedOptionId=se(()=>this.focusedOptionIndex()!==-1?this.focusedOptionIndex():null);focusedOptionIndex=G(-1);selectedOptionIndex=G(-1);focused=!1;overlayVisible=!1;relativeAlign;_componentStyle=Q(Ot);constructor(e){super(),this.overlayService=e,this.id=this.id||Ce("pn_id_")}toggle(e){this.visible?this.hide():this.show(e),this.preventDocumentDefault=!0}show(e){this.target=e.currentTarget,this.relativeAlign=e.relativeAlign,this.visible=!0,this.preventDocumentDefault=!0,this.overlayVisible=!0,this.cd.markForCheck()}ngOnInit(){super.ngOnInit(),this.popup||this.bindDocumentClickListener()}startTemplate;_startTemplate;endTemplate;_endTemplate;headerTemplate;_headerTemplate;itemTemplate;_itemTemplate;submenuHeaderTemplate;_submenuHeaderTemplate;templates;ngAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"start":this._startTemplate=e.template;break;case"end":this._endTemplate=e.template;break;case"item":this._itemTemplate=e.template;break;case"submenuheader":this._submenuHeaderTemplate=e.template;break;default:this._itemTemplate=e.template;break}})}getTabIndexValue(){return this.tabindex!==void 0?this.tabindex.toString():null}onOverlayAnimationStart(e){switch(e.toState){case"visible":this.popup&&(this.container=e.element,this.moveOnTop(),this.onShow.emit({}),this.appendOverlay(),this.alignOverlay(),this.bindDocumentClickListener(),this.bindDocumentResizeListener(),this.bindScrollListener(),V(this.listViewChild.nativeElement));break;case"void":this.onOverlayHide(),this.onHide.emit({});break}}onOverlayAnimationEnd(e){switch(e.toState){case"void":this.autoZIndex&&Te.clear(e.element);break}}alignOverlay(){this.relativeAlign?at(this.container,this.target):ot(this.container,this.target)}appendOverlay(){this.appendTo&&(this.appendTo==="body"?this.renderer.appendChild(this.document.body,this.container):lt(this.appendTo,this.container))}restoreOverlayAppend(){this.container&&this.appendTo&&this.renderer.appendChild(this.el.nativeElement,this.container)}moveOnTop(){this.autoZIndex&&Te.set("menu",this.container,this.baseZIndex+this.config.zIndex.menu)}hide(){this.visible=!1,this.relativeAlign=!1,this.cd.markForCheck()}onWindowResize(){this.visible&&!rt()&&this.hide()}menuitemId(e,i,n,o){return e?.id??`${i}_${n}${o!==void 0?"_"+o:""}`}isItemFocused(e){return this.focusedOptionId()===e}label(e){return typeof e=="function"?e():e}disabled(e){return typeof e=="function"?e():typeof e>"u"?!1:e}activedescendant(){return this.focused?this.focusedOptionId():void 0}onListFocus(e){this.focused||(this.focused=!0,this.onFocus.emit(e))}onListBlur(e){this.focused&&(this.focused=!1,this.changeFocusedOptionIndex(-1),this.selectedOptionIndex.set(-1),this.focusedOptionIndex.set(-1),this.onBlur.emit(e))}onListKeyDown(e){switch(e.code){case"ArrowDown":this.onArrowDownKey(e);break;case"ArrowUp":this.onArrowUpKey(e);break;case"Home":this.onHomeKey(e);break;case"End":this.onEndKey(e);break;case"Enter":this.onEnterKey(e);break;case"NumpadEnter":this.onEnterKey(e);break;case"Space":this.onSpaceKey(e);break;case"Escape":case"Tab":this.popup&&(V(this.target),this.hide()),this.overlayVisible&&this.hide();break;default:break}}onArrowDownKey(e){let i=this.findNextOptionIndex(this.focusedOptionIndex());this.changeFocusedOptionIndex(i),e.preventDefault()}onArrowUpKey(e){if(e.altKey&&this.popup)V(this.target),this.hide(),e.preventDefault();else{let i=this.findPrevOptionIndex(this.focusedOptionIndex());this.changeFocusedOptionIndex(i),e.preventDefault()}}onHomeKey(e){this.changeFocusedOptionIndex(0),e.preventDefault()}onEndKey(e){this.changeFocusedOptionIndex(me(this.containerViewChild.nativeElement,'li[data-pc-section="menuitem"][data-p-disabled="false"]').length-1),e.preventDefault()}onEnterKey(e){let i=ne(this.containerViewChild.nativeElement,`li[id="${`${this.focusedOptionIndex()}`}"]`),n=i&&ne(i,'a[data-pc-section="action"]');this.popup&&V(this.target),n?n.click():i&&i.click(),e.preventDefault()}onSpaceKey(e){this.onEnterKey(e)}findNextOptionIndex(e){let n=[...me(this.containerViewChild.nativeElement,'li[data-pc-section="menuitem"][data-p-disabled="false"]')].findIndex(o=>o.id===e);return n>-1?n+1:0}findPrevOptionIndex(e){let n=[...me(this.containerViewChild.nativeElement,'li[data-pc-section="menuitem"][data-p-disabled="false"]')].findIndex(o=>o.id===e);return n>-1?n-1:0}changeFocusedOptionIndex(e){let i=me(this.containerViewChild.nativeElement,'li[data-pc-section="menuitem"][data-p-disabled="false"]');if(i.length>0){let n=e>=i.length?i.length-1:e<0?0:e;n>-1&&this.focusedOptionIndex.set(i[n].getAttribute("id"))}}itemClick(e,i){let{originalEvent:n,item:o}=e;if(this.focused||(this.focused=!0,this.onFocus.emit()),o.disabled){n.preventDefault();return}!o.url&&!o.routerLink&&n.preventDefault(),o.command&&o.command({originalEvent:n,item:o}),this.popup&&this.hide(),!this.popup&&this.focusedOptionIndex()!==i&&this.focusedOptionIndex.set(i)}onOverlayClick(e){this.popup&&this.overlayService.add({originalEvent:e,target:this.el.nativeElement}),this.preventDocumentDefault=!0}bindDocumentClickListener(){if(!this.documentClickListener&&ue(this.platformId)){let e=this.el?this.el.nativeElement.ownerDocument:"document";this.documentClickListener=this.renderer.listen(e,"click",i=>{let n=this.containerViewChild?.nativeElement&&!this.containerViewChild?.nativeElement.contains(i.target),o=!(this.target&&(this.target===i.target||this.target.contains(i.target)));!this.popup&&n&&o&&this.onListBlur(i),this.preventDocumentDefault&&this.overlayVisible&&n&&o&&(this.hide(),this.preventDocumentDefault=!1)})}}unbindDocumentClickListener(){this.documentClickListener&&(this.documentClickListener(),this.documentClickListener=null)}bindDocumentResizeListener(){if(!this.documentResizeListener&&ue(this.platformId)){let e=this.document.defaultView;this.documentResizeListener=this.renderer.listen(e,"resize",this.onWindowResize.bind(this))}}unbindDocumentResizeListener(){this.documentResizeListener&&(this.documentResizeListener(),this.documentResizeListener=null)}bindScrollListener(){!this.scrollHandler&&ue(this.platformId)&&(this.scrollHandler=new mt(this.target,()=>{this.visible&&this.hide()})),this.scrollHandler?.bindScrollListener()}unbindScrollListener(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()}onOverlayHide(){this.unbindDocumentClickListener(),this.unbindDocumentResizeListener(),this.unbindScrollListener(),this.preventDocumentDefault=!1,this.cd.destroyed||(this.target=null)}ngOnDestroy(){this.popup&&(this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.container&&this.autoZIndex&&Te.clear(this.container),this.restoreOverlayAppend(),this.onOverlayHide()),this.popup||this.unbindDocumentClickListener(),super.ngOnDestroy()}hasSubMenu(){return this.model?.some(e=>e.items)??!1}isItemHidden(e){return e.separator?e.visible===!1||e.items&&e.items.some(i=>i.visible!==!1):e.visible===!1}static \u0275fac=function(i){return new(i||t)($(xe))};static \u0275cmp=q({type:t,selectors:[["p-menu"]],contentQueries:function(i,n,o){if(i&1&&(x(o,si,4),x(o,pi,4),x(o,ci,4),x(o,ui,4),x(o,mi,4),x(o,Ie,4)),i&2){let l;g(l=y())&&(n.startTemplate=l.first),g(l=y())&&(n.endTemplate=l.first),g(l=y())&&(n.headerTemplate=l.first),g(l=y())&&(n.itemTemplate=l.first),g(l=y())&&(n.submenuHeaderTemplate=l.first),g(l=y())&&(n.templates=l)}},viewQuery:function(i,n){if(i&1&&(A(di,5),A(hi,5)),i&2){let o;g(o=y())&&(n.listViewChild=o.first),g(o=y())&&(n.containerViewChild=o.first)}},inputs:{model:"model",popup:[2,"popup","popup",v],style:"style",styleClass:"styleClass",appendTo:"appendTo",autoZIndex:[2,"autoZIndex","autoZIndex",v],baseZIndex:[2,"baseZIndex","baseZIndex",B],showTransitionOptions:"showTransitionOptions",hideTransitionOptions:"hideTransitionOptions",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy",id:"id",tabindex:[2,"tabindex","tabindex",B]},outputs:{onShow:"onShow",onHide:"onHide",onBlur:"onBlur",onFocus:"onFocus"},features:[Y([Ot]),Z],decls:1,vars:1,consts:[["container",""],["list",""],["htmlSubmenuLabel",""],[3,"ngClass","class","ngStyle","click",4,"ngIf"],[3,"click","ngClass","ngStyle"],["class","p-menu-start",4,"ngIf"],["role","menu",1,"p-menu-list","p-reset",3,"focus","blur","keydown"],[4,"ngIf"],["class","p-menu-end",4,"ngIf"],[1,"p-menu-start"],[4,"ngTemplateOutlet"],["ngFor","",3,"ngForOf"],["class","p-menu-separator","role","separator",4,"ngIf"],["class","p-menu-submenu-label","pTooltip","","role","none",3,"ngClass","tooltipOptions",4,"ngIf"],["role","separator",1,"p-menu-separator"],["pTooltip","","role","none",1,"p-menu-submenu-label",3,"ngClass","tooltipOptions"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[4,"ngIf","ngIfElse"],[3,"innerHTML"],["class","p-menu-item","pTooltip","","role","menuitem",3,"pMenuItemContent","itemTemplate","ngClass","ngStyle","class","tooltipOptions","onMenuItemClick",4,"ngIf"],["pTooltip","","role","menuitem",1,"p-menu-item",3,"onMenuItemClick","pMenuItemContent","itemTemplate","ngClass","ngStyle","tooltipOptions"],[1,"p-menu-end"]],template:function(i,n){i&1&&c(0,Hi,8,25,"div",3),i&2&&s("ngIf",!n.popup||n.visible)},dependencies:[j,te,be,ie,ce,pe,De,Bi,Re,bt,Ke,O,Mt],encapsulation:2,data:{animation:[et("overlayAnimation",[Fe(":enter",[Ae({opacity:0,transform:"scaleY(0.8)"}),$e("{{showTransitionParams}}")]),Fe(":leave",[$e("{{hideTransitionParams}}",Ae({opacity:0}))])])]},changeDetection:0})}return t})(),ha=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=K({type:t});static \u0275inj=z({imports:[Lt,O,O]})}return t})();var Qi=["item"],qi=["empty"],Pi=["header"],ji=["footer"],Ni=["selecteditem"],Ui=["group"],Gi=["loader"],Zi=["removeicon"],Wi=["loadingicon"],Yi=["clearicon"],Ji=["dropdownicon"],Xi=["container"],en=["focusInput"],tn=["multiIn"],nn=["multiContainer"],on=["ddBtn"],an=["items"],ln=["scroller"],rn=["overlay"],sn=t=>({"p-autocomplete-chip-item":!0,"p-focus":t}),Et=t=>({$implicit:t}),pn=()=>({class:"p-autocomplete-chip-icon"}),Se=t=>({height:t}),$t=(t,a)=>({$implicit:t,options:a}),cn=t=>({options:t}),un=()=>({}),mn=(t,a)=>({$implicit:t,index:a});function dn(t,a){if(t&1){let e=w();d(0,"input",19,3),b("input",function(n){u(e);let o=r();return m(o.onInput(n))})("keydown",function(n){u(e);let o=r();return m(o.onKeyDown(n))})("change",function(n){u(e);let o=r();return m(o.onInputChange(n))})("focus",function(n){u(e);let o=r();return m(o.onInputFocus(n))})("blur",function(n){u(e);let o=r();return m(o.onInputBlur(n))})("paste",function(n){u(e);let o=r();return m(o.onInputPaste(n))})("keyup",function(n){u(e);let o=r();return m(o.onInputKeyUp(n))}),h()}if(t&2){let e,i=r();S(i.inputStyleClass),s("pAutoFocus",i.autofocus)("ngClass","p-autocomplete-input")("ngStyle",i.inputStyle)("type",i.type)("variant",i.variant)("autocomplete",i.autocomplete)("required",i.required)("name",i.name)("pSize",i.size)("tabindex",i.disabled?-1:i.tabindex)("readonly",i.readonly)("disabled",i.disabled)("fluid",i.hasFluid),f("value",i.inputValue())("id",i.inputId)("placeholder",i.placeholder)("maxlength",i.maxlength)("aria-label",i.ariaLabel)("aria-labelledby",i.ariaLabelledBy)("aria-required",i.required)("aria-expanded",(e=i.overlayVisible)!==null&&e!==void 0?e:!1)("aria-controls",i.overlayVisible?i.id+"_list":null)("aria-activedescendant",i.focused?i.focusedOptionId:void 0)}}function hn(t,a){if(t&1){let e=w();d(0,"TimesIcon",22),b("click",function(){u(e);let n=r(2);return m(n.clear())}),h()}t&2&&(s("styleClass","p-autocomplete-clear-icon"),f("aria-hidden",!0))}function _n(t,a){}function fn(t,a){t&1&&c(0,_n,0,0,"ng-template")}function gn(t,a){if(t&1){let e=w();d(0,"span",23),b("click",function(){u(e);let n=r(2);return m(n.clear())}),c(1,fn,1,0,null,24),h()}if(t&2){let e=r(2);f("aria-hidden",!0),p(),s("ngTemplateOutlet",e.clearIconTemplate||e._clearIconTemplate)}}function yn(t,a){if(t&1&&(M(0),c(1,hn,1,2,"TimesIcon",20)(2,gn,2,2,"span",21),L()),t&2){let e=r();p(),s("ngIf",!e.clearIconTemplate&&!e._clearIconTemplate),p(),s("ngIf",e.clearIconTemplate||e._clearIconTemplate)}}function vn(t,a){t&1&&T(0)}function bn(t,a){if(t&1){let e=w();d(0,"span",33),b("click",function(n){u(e);let o=r(3).index,l=r(2);return m(l.readonly?"":l.removeOption(n,o))}),k(1,"TimesCircleIcon",34),h()}t&2&&(p(),s("styleClass","p-autocomplete-chip-icon"),f("aria-hidden",!0))}function Cn(t,a){t&1&&(M(0),c(1,bn,2,2,"ng-template",null,6,E),L())}function xn(t,a){if(t&1&&(d(0,"p-chip",32),c(1,Cn,3,0,"ng-container",15),h()),t&2){let e=r().$implicit,i=r(2);s("label",i.getOptionLabel(e))("removable",!0),p(),s("ngIf",!i.removeIconTemplate&&!i._removeIconTemplate)}}function In(t,a){}function wn(t,a){t&1&&c(0,In,0,0,"ng-template")}function Tn(t,a){if(t&1&&(d(0,"span"),c(1,wn,1,0,null,30),h()),t&2){let e=r(3);f("aria-hidden",!0),p(),s("ngTemplateOutlet",e.removeIconTemplate||e._removeIconTemplate)("ngTemplateOutletContext",re(3,pn))}}function On(t,a){if(t&1&&(d(0,"li",29,5),c(2,vn,1,0,"ng-container",30)(3,xn,2,3,"p-chip",31)(4,Tn,2,4,"span",15),h()),t&2){let e=a.$implicit,i=a.index,n=r(2);s("ngClass",I(10,sn,n.focusedMultipleOptionIndex()===i)),f("id",n.id+"_multiple_option_"+i)("aria-label",n.getOptionLabel(e))("aria-setsize",n.modelValue().length)("aria-posinset",i+1)("aria-selected",!0),p(2),s("ngTemplateOutlet",n.selectedItemTemplate||n._selectedItemTemplate)("ngTemplateOutletContext",I(12,Et,e)),p(),s("ngIf",!n.selectedItemTemplate&&!n._selectedItemTemplate),p(),s("ngIf",n.removeIconTemplate||n._removeIconTemplate)}}function Sn(t,a){if(t&1){let e=w();d(0,"ul",25,4),b("focus",function(n){u(e);let o=r();return m(o.onMultipleContainerFocus(n))})("blur",function(n){u(e);let o=r();return m(o.onMultipleContainerBlur(n))})("keydown",function(n){u(e);let o=r();return m(o.onMultipleContainerKeyDown(n))}),c(2,On,5,14,"li",26),d(3,"li",27)(4,"input",28,3),b("input",function(n){u(e);let o=r();return m(o.onInput(n))})("keydown",function(n){u(e);let o=r();return m(o.onKeyDown(n))})("change",function(n){u(e);let o=r();return m(o.onInputChange(n))})("focus",function(n){u(e);let o=r();return m(o.onInputFocus(n))})("blur",function(n){u(e);let o=r();return m(o.onInputBlur(n))})("paste",function(n){u(e);let o=r();return m(o.onInputPaste(n))})("keyup",function(n){u(e);let o=r();return m(o.onInputKeyUp(n))}),h()()()}if(t&2){let e,i=r();s("ngClass",i.inputMultipleClass)("tabindex",-1),f("aria-orientation","horizontal")("aria-activedescendant",i.focused?i.focusedMultipleOptionId:void 0),p(2),s("ngForOf",i.modelValue()),p(2),S(i.inputStyleClass),s("pAutoFocus",i.autofocus)("ngClass",i.inputClass)("ngStyle",i.inputStyle)("autocomplete",i.autocomplete)("required",i.required)("tabindex",i.disabled?-1:i.tabindex)("readonly",i.readonly)("disabled",i.disabled),f("type",i.type)("id",i.inputId)("name",i.name)("placeholder",i.filled?null:i.placeholder)("maxlength",i.maxlength)("aria-label",i.ariaLabel)("aria-labelledby",i.ariaLabelledBy)("aria-required",i.required)("aria-expanded",(e=i.overlayVisible)!==null&&e!==void 0?e:!1)("aria-controls",i.overlayVisible?i.id+"_list":null)("aria-activedescendant",i.focused?i.focusedOptionId:void 0)}}function kn(t,a){t&1&&k(0,"SpinnerIcon",37),t&2&&(s("styleClass","p-autocomplete-loader")("spin",!0),f("aria-hidden",!0))}function Mn(t,a){}function Ln(t,a){t&1&&c(0,Mn,0,0,"ng-template")}function Vn(t,a){if(t&1&&(d(0,"span",38),c(1,Ln,1,0,null,24),h()),t&2){let e=r(2);f("aria-hidden",!0),p(),s("ngTemplateOutlet",e.loadingIconTemplate||e._loadingIconTemplate)}}function En(t,a){if(t&1&&(M(0),c(1,kn,1,3,"SpinnerIcon",35)(2,Vn,2,2,"span",36),L()),t&2){let e=r();p(),s("ngIf",!e.loadingIconTemplate&&!e._loadingIconTemplate),p(),s("ngIf",e.loadingIconTemplate||e._loadingIconTemplate)}}function $n(t,a){if(t&1&&k(0,"span",41),t&2){let e=r(2);s("ngClass",e.dropdownIcon),f("aria-hidden",!0)}}function An(t,a){t&1&&k(0,"ChevronDownIcon")}function Fn(t,a){}function Dn(t,a){t&1&&c(0,Fn,0,0,"ng-template")}function zn(t,a){if(t&1&&(M(0),c(1,An,1,0,"ChevronDownIcon",15)(2,Dn,1,0,null,24),L()),t&2){let e=r(2);p(),s("ngIf",!e.dropdownIconTemplate&&!e._dropdownIconTemplate),p(),s("ngTemplateOutlet",e.dropdownIconTemplate||e._dropdownIconTemplate)}}function Hn(t,a){if(t&1){let e=w();d(0,"button",39,7),b("click",function(n){u(e);let o=r();return m(o.handleDropdownClick(n))}),c(2,$n,1,2,"span",40)(3,zn,3,2,"ng-container",15),h()}if(t&2){let e=r();s("disabled",e.disabled),f("aria-label",e.dropdownAriaLabel)("tabindex",e.tabindex),p(2),s("ngIf",e.dropdownIcon),p(),s("ngIf",!e.dropdownIcon)}}function Kn(t,a){t&1&&T(0)}function Rn(t,a){t&1&&T(0)}function Bn(t,a){if(t&1&&c(0,Rn,1,0,"ng-container",30),t&2){let e=a.$implicit,i=a.options;r(2);let n=F(6);s("ngTemplateOutlet",n)("ngTemplateOutletContext",P(2,$t,e,i))}}function Qn(t,a){t&1&&T(0)}function qn(t,a){if(t&1&&c(0,Qn,1,0,"ng-container",30),t&2){let e=a.options,i=r(4);s("ngTemplateOutlet",i.loaderTemplate||i._loaderTemplate)("ngTemplateOutletContext",I(2,cn,e))}}function Pn(t,a){t&1&&(M(0),c(1,qn,1,4,"ng-template",null,10,E),L())}function jn(t,a){if(t&1){let e=w();d(0,"p-scroller",46,9),b("onLazyLoad",function(n){u(e);let o=r(2);return m(o.onLazyLoad.emit(n))}),c(2,Bn,1,5,"ng-template",null,2,E)(4,Pn,3,0,"ng-container",15),h()}if(t&2){let e=r(2);ee(I(8,Se,e.scrollHeight)),s("items",e.visibleOptions())("itemSize",e.virtualScrollItemSize||e._itemSize)("autoSize",!0)("lazy",e.lazy)("options",e.virtualScrollOptions),p(4),s("ngIf",e.loaderTemplate||e._loaderTemplate)}}function Nn(t,a){t&1&&T(0)}function Un(t,a){if(t&1&&(M(0),c(1,Nn,1,0,"ng-container",30),L()),t&2){r();let e=F(6),i=r();p(),s("ngTemplateOutlet",e)("ngTemplateOutletContext",P(3,$t,i.visibleOptions(),re(2,un)))}}function Gn(t,a){if(t&1&&(d(0,"span"),R(1),h()),t&2){let e=r(2).$implicit,i=r(3);p(),W(i.getOptionGroupLabel(e.optionGroup))}}function Zn(t,a){t&1&&T(0)}function Wn(t,a){if(t&1&&(M(0),d(1,"li",50),c(2,Gn,2,1,"span",15)(3,Zn,1,0,"ng-container",30),h(),L()),t&2){let e=r(),i=e.$implicit,n=e.index,o=r().options,l=r(2);p(),s("ngStyle",I(5,Se,o.itemSize+"px")),f("id",l.id+"_"+l.getOptionIndex(n,o)),p(),s("ngIf",!l.groupTemplate),p(),s("ngTemplateOutlet",l.groupTemplate)("ngTemplateOutletContext",I(7,Et,i.optionGroup))}}function Yn(t,a){if(t&1&&(d(0,"span"),R(1),h()),t&2){let e=r(2).$implicit,i=r(3);p(),W(i.getOptionLabel(e))}}function Jn(t,a){t&1&&T(0)}function Xn(t,a){if(t&1){let e=w();M(0),d(1,"li",51),b("click",function(n){u(e);let o=r().$implicit,l=r(3);return m(l.onOptionSelect(n,o))})("mouseenter",function(n){u(e);let o=r().index,l=r().options,_=r(2);return m(_.onOptionMouseEnter(n,_.getOptionIndex(o,l)))}),c(2,Yn,2,1,"span",15)(3,Jn,1,0,"ng-container",30),h(),L()}if(t&2){let e=r(),i=e.$implicit,n=e.index,o=r().options,l=r(2);p(),s("ngStyle",I(12,Se,o.itemSize+"px"))("ngClass",l.optionClass(i,n,o)),f("id",l.id+"_"+l.getOptionIndex(n,o))("aria-label",l.getOptionLabel(i))("aria-selected",l.isSelected(i))("aria-disabled",l.isOptionDisabled(i))("data-p-focused",l.focusedOptionIndex()===l.getOptionIndex(n,o))("aria-setsize",l.ariaSetSize)("aria-posinset",l.getAriaPosInset(l.getOptionIndex(n,o))),p(),s("ngIf",!l.itemTemplate&&!l._itemTemplate),p(),s("ngTemplateOutlet",l.itemTemplate||l._itemTemplate)("ngTemplateOutletContext",P(14,mn,i,o.getOptions?o.getOptions(n):n))}}function eo(t,a){if(t&1&&c(0,Wn,4,9,"ng-container",15)(1,Xn,4,17,"ng-container",15),t&2){let e=a.$implicit,i=r(3);s("ngIf",i.isOptionGroup(e)),p(),s("ngIf",!i.isOptionGroup(e))}}function to(t,a){if(t&1&&(M(0),R(1),L()),t&2){let e=r(4);p(),Le(" ",e.searchResultMessageText," ")}}function io(t,a){t&1&&T(0,null,12)}function no(t,a){if(t&1&&(d(0,"li",52),c(1,to,2,1,"ng-container",53)(2,io,2,0,"ng-container",24),h()),t&2){let e=r().options,i=r(2);s("ngStyle",I(4,Se,e.itemSize+"px")),p(),s("ngIf",!i.emptyTemplate&&!i._emptyTemplate)("ngIfElse",i.empty),p(),s("ngTemplateOutlet",i.emptyTemplate||i._emptyTemplate)}}function oo(t,a){if(t&1&&(d(0,"ul",47,11),c(2,eo,2,2,"ng-template",48)(3,no,3,6,"li",49),h()),t&2){let e=a.$implicit,i=a.options,n=r(2);ee(i.contentStyle),s("ngClass",i.contentStyleClass),f("id",n.id+"_list")("aria-label",n.listLabel),p(2),s("ngForOf",e),p(),s("ngIf",!e||e&&e.length===0&&n.showEmptyMessage)}}function ao(t,a){t&1&&T(0)}function lo(t,a){if(t&1&&(d(0,"div",42),c(1,Kn,1,0,"ng-container",24),d(2,"div",43),c(3,jn,5,10,"p-scroller",44)(4,Un,2,6,"ng-container",15),h(),c(5,oo,4,7,"ng-template",null,8,E)(7,ao,1,0,"ng-container",24),h(),d(8,"span",45),R(9),h()),t&2){let e=r();S(e.panelStyleClass),s("ngClass",e.panelClass)("ngStyle",e.panelStyle),p(),s("ngTemplateOutlet",e.headerTemplate||e._headerTemplate),p(),Ue("max-height",e.virtualScroll?"auto":e.scrollHeight),p(),s("ngIf",e.virtualScroll),p(),s("ngIf",!e.virtualScroll),p(3),s("ngTemplateOutlet",e.footerTemplate||e._footerTemplate),p(2),Le(" ",e.selectedMessageText," ")}}var ro=({dt:t})=>`
.p-autocomplete {
    display: inline-flex;
}

.p-autocomplete-loader {
    position: absolute;
    top: 50%;
    margin-top: -0.5rem;
    inset-inline-end: ${t("autocomplete.padding.x")};
}

.p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-loader {
    inset-inline-end: calc(${t("autocomplete.dropdown.width")} + ${t("autocomplete.padding.x")});
}

.p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-input {
    flex: 1 1 auto;
    width: 1%;
}

.p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-input,
.p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-input-multiple {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
}

.p-autocomplete-dropdown {
    cursor: pointer;
    display: inline-flex;
    user-select: none;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    width: ${t("autocomplete.dropdown.width")};
    border-start-end-radius: ${t("autocomplete.dropdown.border.radius")};
    border-end-end-radius: ${t("autocomplete.dropdown.border.radius")};
    background: ${t("autocomplete.dropdown.background")};
    border: 1px solid ${t("autocomplete.dropdown.border.color")};
    border-inline-start: 0 none;
    color: ${t("autocomplete.dropdown.color")};
    transition: background ${t("autocomplete.transition.duration")}, color ${t("autocomplete.transition.duration")}, border-color ${t("autocomplete.transition.duration")}, outline-color ${t("autocomplete.transition.duration")}, box-shadow ${t("autocomplete.transition.duration")};
    outline-color: transparent;
}

.p-autocomplete-dropdown:not(:disabled):hover {
    background: ${t("autocomplete.dropdown.hover.background")};
    border-color: ${t("autocomplete.dropdown.hover.border.color")};
    color: ${t("autocomplete.dropdown.hover.color")};
}

.p-autocomplete-dropdown:not(:disabled):active {
    background: ${t("autocomplete.dropdown.active.background")};
    border-color: ${t("autocomplete.dropdown.active.border.color")};
    color: ${t("autocomplete.dropdown.active.color")};
}

.p-autocomplete-dropdown:focus-visible {
    box-shadow: ${t("autocomplete.dropdown.focus.ring.shadow")};
    outline: ${t("autocomplete.dropdown.focus.ring.width")} ${t("autocomplete.dropdown.focus.ring.style")} ${t("autocomplete.dropdown.focus.ring.color")};
    outline-offset: ${t("autocomplete.dropdown.focus.ring.offset")};
}

.p-autocomplete .p-autocomplete-overlay {
    min-width: 100%;
}

.p-autocomplete-overlay {
    background: ${t("autocomplete.overlay.background")};
    color: ${t("autocomplete.overlay.color")};
    border: 1px solid ${t("autocomplete.overlay.border.color")};
    border-radius: ${t("autocomplete.overlay.border.radius")};
    box-shadow: ${t("autocomplete.overlay.shadow")};
}

.p-autocomplete-list-container {
    overflow: auto;
}

.p-autocomplete-list {
    margin: 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: ${t("autocomplete.list.gap")};
    padding: ${t("autocomplete.list.padding")};
}

.p-autocomplete-option {
    cursor: pointer;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: ${t("autocomplete.option.padding")};
    border: 0 none;
    color: ${t("autocomplete.option.color")};
    background: transparent;
    transition: background ${t("autocomplete.transition.duration")}, color ${t("autocomplete.transition.duration")}, border-color ${t("autocomplete.transition.duration")};
    border-radius: ${t("autocomplete.option.border.radius")};
}

.p-autocomplete-option:not(.p-autocomplete-option-selected):not(.p-disabled).p-focus {
    background: ${t("autocomplete.option.focus.background")};
    color: ${t("autocomplete.option.focus.color")};
}

.p-autocomplete-option-selected {
    background: ${t("autocomplete.option.selected.background")};
    color: ${t("autocomplete.option.selected.color")};
}

.p-autocomplete-option-selected.p-focus {
    background: ${t("autocomplete.option.selected.focus.background")};
    color: ${t("autocomplete.option.selected.focus.color")};
}

.p-autocomplete-option-group {
    margin: 0;
    padding: ${t("autocomplete.option.group.padding")};
    color: ${t("autocomplete.option.group.color")};
    background: ${t("autocomplete.option.group.background")};
    font-weight: ${t("autocomplete.option.group.font.weight")};
}

.p-autocomplete-input-multiple {
    margin: 0;
    list-style-type: none;
    cursor: text;
    overflow: hidden;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: calc(${t("autocomplete.padding.y")} / 2) ${t("autocomplete.padding.x")};
    gap: calc(${t("autocomplete.padding.y")} / 2);
    color: ${t("autocomplete.color")};
    background: ${t("autocomplete.background")};
    border: 1px solid ${t("autocomplete.border.color")};
    border-radius: ${t("autocomplete.border.radius")};
    width: 100%;
    transition: background ${t("autocomplete.transition.duration")}, color ${t("autocomplete.transition.duration")}, border-color ${t("autocomplete.transition.duration")}, outline-color ${t("autocomplete.transition.duration")}, box-shadow ${t("autocomplete.transition.duration")};
    outline-color: transparent;
    box-shadow: ${t("autocomplete.shadow")};
}

.p-autocomplete:not(.p-disabled):hover .p-autocomplete-input-multiple {
    border-color: ${t("autocomplete.hover.border.color")};
}

.p-autocomplete:not(.p-disabled).p-focus .p-autocomplete-input-multiple {
    border-color: ${t("autocomplete.focus.border.color")};
    box-shadow: ${t("autocomplete.focus.ring.shadow")};
    outline: ${t("autocomplete.focus.ring.width")} ${t("autocomplete.focus.ring.style")} ${t("autocomplete.focus.ring.color")};
    outline-offset: ${t("autocomplete.focus.ring.offset")};
}

.p-autocomplete.p-invalid .p-autocomplete-input-multiple {
    border-color: ${t("autocomplete.invalid.border.color")};
}

.p-variant-filled.p-autocomplete-input-multiple {
    background: ${t("autocomplete.filled.background")};
}

.p-autocomplete:not(.p-disabled):hover .p-variant-filled.p-autocomplete-input-multiple {
    background: ${t("autocomplete.filled.hover.background")};
}

.p-autocomplete:not(.p-disabled).p-focus .p-variant-filled.p-autocomplete-input-multiple  {
    background: ${t("autocomplete.filled.focus.background")};
}

.p-autocomplete.p-disabled {
    opacity: 1;
}

.p-autocomplete.p-disabled .p-autocomplete-input-multiple {
    opacity: 1;
    background: ${t("autocomplete.disabled.background")};
    color: ${t("autocomplete.disabled.color")};
}

.p-autocomplete-chip.p-chip {
    padding-block-start: calc(${t("autocomplete.padding.y")} / 2);
    padding-block-end: calc(${t("autocomplete.padding.y")} / 2);
    border-radius: ${t("autocomplete.chip.border.radius")};
}

.p-autocomplete-input-multiple:has(.p-autocomplete-chip) {
    padding-inline-start: calc(${t("autocomplete.padding.y")} / 2);
    padding-inline-end: calc(${t("autocomplete.padding.y")} / 2);
}

.p-autocomplete-chip-item.p-focus .p-autocomplete-chip {
    background: ${t("autocomplete.chip.focus.background")};
    color: ${t("autocomplete.chip.focus.color")};
}

.p-autocomplete-input-chip {
    flex: 1 1 auto;
    display: inline-flex;
    padding-block-start: calc(${t("autocomplete.padding.y")} / 2);
    padding-block-end: calc(${t("autocomplete.padding.y")} / 2);
}

.p-autocomplete-input-chip input {
    border: 0 none;
    outline: 0 none;
    background: transparent;
    margin: 0;
    padding: 0;
    box-shadow: none;
    border-radius: 0;
    width: 100%;
    font-family: inherit;
    font-feature-settings: inherit;
    font-size: 1rem;
    color: inherit;
}

.p-autocomplete-input-chip input::placeholder {
    color: ${t("autocomplete.placeholder.color")};
}

.p-autocomplete-empty-message {
    padding: ${t("autocomplete.empty.message.padding")};
}

.p-autocomplete-fluid {
    display: flex;
}

.p-autocomplete-fluid:has(.p-autocomplete-dropdown) .p-autocomplete-input {
    width: 1%;
}

.p-autocomplete:has(.p-inputtext-sm) .p-autocomplete-dropdown {
    width: ${t("autocomplete.dropdown.sm.width")};
}

.p-autocomplete:has(.p-inputtext-sm) .p-autocomplete-dropdown .p-icon {
    font-size: ${t("form.field.sm.font.size")};
    width: ${t("form.field.sm.font.size")};
    height: ${t("form.field.sm.font.size")};
}

.p-autocomplete:has(.p-inputtext-lg) .p-autocomplete-dropdown {
    width: ${t("autocomplete.dropdown.lg.width")};
}

.p-autocomplete:has(.p-inputtext-lg) .p-autocomplete-dropdown .p-icon {
    font-size: ${t("form.field.lg.font.size")};
    width: ${t("form.field.lg.font.size")};
    height: ${t("form.field.lg.font.size")};
}

.p-autocomplete-clear-icon {
    position: absolute;
    top: 50%;
    margin-top: -0.5rem;
    cursor: pointer;
    right: ${t("autocomplete.padding.x")};
    color: ${t("autocomplete.dropdown.color")};
}

.p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-clear-icon {
    right: calc(${t("autocomplete.padding.x")} + ${t("autocomplete.dropdown.width")});
}
p-autoComplete.ng-invalid.ng-dirty .p-autocomplete-input,
p-autoComplete.ng-invalid.ng-dirty .p-autocomplete-input-multiple,
p-auto-complete.ng-invalid.ng-dirty .p-autocomplete-input,
p-auto-complete.ng-invalid.ng-dirty .p-autocomplete-input-multiple
p-autocomplete.ng-invalid.ng-dirty .p-autocomplete-input,
p-autocomplete.ng-invalid.ng-dirty .p-autocomplete-input-multiple {
    border-color: ${t("autocomplete.invalid.border.color")};
}
p-autoComplete.ng-invalid.ng-dirty .p-autocomplete-input:enabled:focus,
p-autoComplete.ng-invalid.ng-dirty:not(.p-disabled).p-focus .p-autocomplete-input-multiple,
p-auto-complete.ng-invalid.ng-dirty .p-autocomplete-input:enabled:focus,
p-auto-complete.ng-invalid.ng-dirty:not(.p-disabled).p-focus .p-autocomplete-input-multiple,
p-autocomplete.ng-invalid.ng-dirty .p-autocomplete-input:enabled:focus,
p-autocomplete.ng-invalid.ng-dirty:not(.p-disabled).p-focus .p-autocomplete-input-multiple {
    border-color: ${t("autocomplete.focus.border.color")};
}
p-autoComplete.ng-invalid.ng-dirty .p-autocomplete-input-chip input::placeholder,
p-auto-complete.ng-invalid.ng-dirty .p-autocomplete-input-chip input::placeholder,
p-autocomplete.ng-invalid.ng-dirty .p-autocomplete-input-chip input::placeholder {
    color: ${t("autocomplete.invalid.placeholder.color")};
}

p-autoComplete.ng-invalid.ng-dirty .p-autocomplete-input::placeholder,
p-auto-complete.ng-invalid.ng-dirty .p-autocomplete-input::placeholder,
p-autocomplete.ng-invalid.ng-dirty .p-autocomplete-input::placeholder {
    color: ${t("autocomplete.invalid.placeholder.color")};
}`,so={root:{position:"relative"}},po={root:({instance:t})=>({"p-autocomplete p-component p-inputwrapper":!0,"p-disabled":t.disabled,"p-focus":t.focused,"p-inputwrapper-filled":t.filled,"p-inputwrapper-focus":t.focused&&!t.disabled||t.autofocus||t.overlayVisible,"p-autocomplete-open":t.overlayVisible,"p-autocomplete-clearable":t.showClear&&!t.disabled,"p-autocomplete-fluid":t.hasFluid}),pcInput:"p-autocomplete-input",inputMultiple:({instance:t})=>({"p-autocomplete-input-multiple":!0,"p-variant-filled":(t.variant??(t.config.inputStyle()||t.config.inputVariant()))==="filled"}),chipItem:({instance:t,i:a})=>["p-autocomplete-chip-item",{"p-focus":t.focusedMultipleOptionIndex===a}],pcChip:"p-autocomplete-chip",chipIcon:"p-autocomplete-chip-icon",inputChip:"p-autocomplete-input-chip",loader:"p-autocomplete-loader",dropdown:"p-autocomplete-dropdown",overlay:"p-autocomplete-overlay p-component",list:"p-autocomplete-list",optionGroup:"p-autocomplete-option-group",option:({instance:t,option:a,i:e,getItemOptions:i})=>({"p-autocomplete-option":!0,"p-autocomplete-option-selected":t.isSelected(a),"p-focus":t.focusedOptionIndex===t.getOptionIndex(e,i),"p-disabled":t.isOptionDisabled(a)}),emptyMessage:"p-autocomplete-empty-message"},Vt=(()=>{class t extends J{name="autocomplete";theme=ro;classes=po;inlineStyles=so;static \u0275fac=(()=>{let e;return function(n){return(e||(e=H(t)))(n||t)}})();static \u0275prov=D({token:t,factory:t.\u0275fac})}return t})();var co={provide:ut,useExisting:he(()=>At),multi:!0},At=(()=>{class t extends X{overlayService;zone;minLength=1;delay=300;style;panelStyle;styleClass;panelStyleClass;inputStyle;inputId;inputStyleClass;placeholder;readonly;disabled;scrollHeight="200px";lazy=!1;virtualScroll;virtualScrollItemSize;virtualScrollOptions;maxlength;name;required;size;appendTo;autoHighlight;forceSelection;type="text";autoZIndex=!0;baseZIndex=0;ariaLabel;dropdownAriaLabel;ariaLabelledBy;dropdownIcon;unique=!0;group;completeOnFocus=!1;showClear=!1;field;dropdown;showEmptyMessage=!0;dropdownMode="blank";multiple;tabindex;dataKey;emptyMessage;showTransitionOptions=".12s cubic-bezier(0, 0, 0.2, 1)";hideTransitionOptions=".1s linear";autofocus;autocomplete="off";optionGroupChildren="items";optionGroupLabel="label";overlayOptions;get suggestions(){return this._suggestions()}set suggestions(e){this._suggestions.set(e),this.handleSuggestionsChange()}get itemSize(){return this._itemSize}set itemSize(e){this._itemSize=e,console.log("The itemSize property is deprecated, use virtualScrollItemSize property instead.")}optionLabel;optionValue;id;searchMessage;emptySelectionMessage;selectionMessage;autoOptionFocus=!1;selectOnFocus;searchLocale;optionDisabled;focusOnHover=!0;typeahead=!0;variant;fluid=!1;completeMethod=new C;onSelect=new C;onUnselect=new C;onFocus=new C;onBlur=new C;onDropdownClick=new C;onClear=new C;onKeyUp=new C;onShow=new C;onHide=new C;onLazyLoad=new C;containerEL;inputEL;multiInputEl;multiContainerEL;dropdownButton;itemsViewChild;scroller;overlayViewChild;_itemSize;itemsWrapper;itemTemplate;emptyTemplate;headerTemplate;footerTemplate;selectedItemTemplate;groupTemplate;loaderTemplate;removeIconTemplate;loadingIconTemplate;clearIconTemplate;dropdownIconTemplate;primeng=Q(ct);value;_suggestions=G(null);onModelChange=()=>{};onModelTouched=()=>{};timeout;overlayVisible;suggestionsUpdated;highlightOption;highlightOptionChanged;focused=!1;_filled;get filled(){return this._filled}set filled(e){this._filled=e}loading;scrollHandler;listId;searchTimeout;dirty=!1;_itemTemplate;_groupTemplate;_selectedItemTemplate;_headerTemplate;_emptyTemplate;_footerTemplate;_loaderTemplate;_removeIconTemplate;_loadingIconTemplate;_clearIconTemplate;_dropdownIconTemplate;modelValue=G(null);focusedMultipleOptionIndex=G(-1);focusedOptionIndex=G(-1);_componentStyle=Q(Vt);visibleOptions=se(()=>this.group?this.flatOptions(this._suggestions()):this._suggestions()||[]);inputValue=se(()=>{let e=this.modelValue(),i=this.optionValueSelected?(this.suggestions||[]).find(n=>oe(n,this.optionValue)===e):e;if(ae(e))if(typeof e=="object"||this.optionValueSelected){let n=this.getOptionLabel(i);return n??e}else return e;else return""});get focusedMultipleOptionId(){return this.focusedMultipleOptionIndex()!==-1?`${this.id}_multiple_option_${this.focusedMultipleOptionIndex()}`:null}get focusedOptionId(){return this.focusedOptionIndex()!==-1?`${this.id}_${this.focusedOptionIndex()}`:null}get rootClass(){return this._componentStyle.classes.root({instance:this})}get inputMultipleClass(){return this._componentStyle.classes.inputMultiple({instance:this})}get panelClass(){return{"p-autocomplete-overlay p-component":!0,"p-input-filled":this.config.inputStyle()==="filled"||this.config.inputVariant()==="filled","p-ripple-disabled":this.config.ripple()===!1}}get inputClass(){return{"p-autocomplete-input":!this.multiple,"p-autocomplete-dd-input":this.dropdown}}get searchResultMessageText(){return ae(this.visibleOptions())&&this.overlayVisible?this.searchMessageText.replaceAll("{0}",this.visibleOptions().length):this.emptySearchMessageText}get searchMessageText(){return this.searchMessage||this.config.translation.searchMessage||""}get emptySearchMessageText(){return this.emptyMessage||this.config.translation.emptySearchMessage||""}get selectionMessageText(){return this.selectionMessage||this.config.translation.selectionMessage||""}get emptySelectionMessageText(){return this.emptySelectionMessage||this.config.translation.emptySelectionMessage||""}get selectedMessageText(){return this.hasSelectedOption()?this.selectionMessageText.replaceAll("{0}",this.multiple?this.modelValue().length:"1"):this.emptySelectionMessageText}get ariaSetSize(){return this.visibleOptions().filter(e=>!this.isOptionGroup(e)).length}get listLabel(){return this.config.getTranslation(pt.ARIA).listLabel}get virtualScrollerDisabled(){return!this.virtualScroll}get optionValueSelected(){return typeof this.modelValue()=="string"&&this.optionValue}chipItemClass(e){return this._componentStyle.classes.chipItem({instance:this,i:e})}optionClass(e,i,n){return{"p-autocomplete-option":!0,"p-autocomplete-option-selected":this.isSelected(e),"p-focus":this.focusedOptionIndex()===this.getOptionIndex(i,n),"p-disabled":this.isOptionDisabled(e)}}constructor(e,i){super(),this.overlayService=e,this.zone=i,Ye(()=>{this.filled=ae(this.modelValue())})}ngOnInit(){super.ngOnInit(),this.id=this.id||Ce("pn_id_"),this.cd.detectChanges()}templates;ngAfterContentInit(){this.templates.forEach(e=>{switch(e.getType()){case"item":this._itemTemplate=e.template;break;case"group":this._groupTemplate=e.template;break;case"selecteditem":this._selectedItemTemplate=e.template;break;case"selectedItem":this._selectedItemTemplate=e.template;break;case"header":this._headerTemplate=e.template;break;case"empty":this._emptyTemplate=e.template;break;case"footer":this._footerTemplate=e.template;break;case"loader":this._loaderTemplate=e.template;break;case"removetokenicon":this._removeIconTemplate=e.template;break;case"loadingicon":this._loadingIconTemplate=e.template;break;case"clearicon":this._clearIconTemplate=e.template;break;case"dropdownicon":this._dropdownIconTemplate=e.template;break;default:this._itemTemplate=e.template;break}})}ngAfterViewChecked(){this.suggestionsUpdated&&this.overlayViewChild&&this.zone.runOutsideAngular(()=>{setTimeout(()=>{this.overlayViewChild&&this.overlayViewChild.alignOverlay()},1),this.suggestionsUpdated=!1})}handleSuggestionsChange(){if(this.loading){this._suggestions()?.length>0||this.showEmptyMessage||this.emptyTemplate?this.show():this.hide();let e=this.overlayVisible&&this.autoOptionFocus?this.findFirstFocusedOptionIndex():-1;this.focusedOptionIndex.set(e),this.suggestionsUpdated=!0,this.loading=!1,this.cd.markForCheck()}}flatOptions(e){return(e||[]).reduce((i,n,o)=>{i.push({optionGroup:n,group:!0,index:o});let l=this.getOptionGroupChildren(n);return l&&l.forEach(_=>i.push(_)),i},[])}isOptionGroup(e){return this.optionGroupLabel&&e.optionGroup&&e.group}findFirstOptionIndex(){return this.visibleOptions().findIndex(e=>this.isValidOption(e))}findLastOptionIndex(){return He(this.visibleOptions(),e=>this.isValidOption(e))}findFirstFocusedOptionIndex(){let e=this.findSelectedOptionIndex();return e<0?this.findFirstOptionIndex():e}findLastFocusedOptionIndex(){let e=this.findSelectedOptionIndex();return e<0?this.findLastOptionIndex():e}findSelectedOptionIndex(){return this.hasSelectedOption()?this.visibleOptions().findIndex(e=>this.isValidSelectedOption(e)):-1}findNextOptionIndex(e){let i=e<this.visibleOptions().length-1?this.visibleOptions().slice(e+1).findIndex(n=>this.isValidOption(n)):-1;return i>-1?i+e+1:e}findPrevOptionIndex(e){let i=e>0?He(this.visibleOptions().slice(0,e),n=>this.isValidOption(n)):-1;return i>-1?i:e}isValidSelectedOption(e){return this.isValidOption(e)&&this.isSelected(e)}isValidOption(e){return e&&!(this.isOptionDisabled(e)||this.isOptionGroup(e))}isOptionDisabled(e){return this.optionDisabled?oe(e,this.optionDisabled):!1}isSelected(e){return this.multiple?this.unique?this.modelValue()?.find(i=>ze(i,this.getOptionValue(e),this.equalityKey())):!1:ze(this.modelValue(),this.getOptionValue(e),this.equalityKey())}isOptionMatched(e,i){return this.isValidOption(e)&&this.getOptionLabel(e).toLocaleLowerCase(this.searchLocale)===i.toLocaleLowerCase(this.searchLocale)}isInputClicked(e){return e.target===this.inputEL.nativeElement}isDropdownClicked(e){return this.dropdownButton?.nativeElement?e.target===this.dropdownButton.nativeElement||this.dropdownButton.nativeElement.contains(e.target):!1}equalityKey(){return this.dataKey}onContainerClick(e){this.disabled||this.loading||this.isInputClicked(e)||this.isDropdownClicked(e)||(!this.overlayViewChild||!this.overlayViewChild.overlayViewChild?.nativeElement.contains(e.target))&&V(this.inputEL.nativeElement)}handleDropdownClick(e){let i;this.overlayVisible?this.hide(!0):(V(this.inputEL.nativeElement),i=this.inputEL.nativeElement.value,this.dropdownMode==="blank"?this.search(e,"","dropdown"):this.dropdownMode==="current"&&this.search(e,i,"dropdown")),this.onDropdownClick.emit({originalEvent:e,query:i})}onInput(e){if(this.typeahead){this.searchTimeout&&clearTimeout(this.searchTimeout);let i=e.target.value;this.maxlength!==null&&(i=i.split("").slice(0,this.maxlength).join("")),!this.multiple&&!this.forceSelection&&this.updateModel(i),i.length===0&&!this.multiple?(this.onClear.emit(),setTimeout(()=>{this.hide()},this.delay/2)):i.length>=this.minLength?(this.focusedOptionIndex.set(-1),this.searchTimeout=setTimeout(()=>{this.search(e,i,"input")},this.delay)):this.hide()}}onInputChange(e){if(this.forceSelection){let i=!1;if(this.visibleOptions()){let n=this.visibleOptions().find(o=>this.isOptionMatched(o,this.inputEL.nativeElement.value||""));n!==void 0&&(i=!0,!this.isSelected(n)&&this.onOptionSelect(e,n))}i||(this.inputEL.nativeElement.value="",!this.multiple&&this.updateModel(null))}}onInputFocus(e){if(this.disabled)return;!this.dirty&&this.completeOnFocus&&this.search(e,e.target.value,"focus"),this.dirty=!0,this.focused=!0;let i=this.focusedOptionIndex()!==-1?this.focusedOptionIndex():this.overlayVisible&&this.autoOptionFocus?this.findFirstFocusedOptionIndex():-1;this.focusedOptionIndex.set(i),this.overlayVisible&&this.scrollInView(this.focusedOptionIndex()),this.onFocus.emit(e)}onMultipleContainerFocus(e){this.disabled||(this.focused=!0)}onMultipleContainerBlur(e){this.focusedMultipleOptionIndex.set(-1),this.focused=!1}onMultipleContainerKeyDown(e){if(this.disabled){e.preventDefault();return}switch(e.code){case"ArrowLeft":this.onArrowLeftKeyOnMultiple(e);break;case"ArrowRight":this.onArrowRightKeyOnMultiple(e);break;case"Backspace":this.onBackspaceKeyOnMultiple(e);break;default:break}}onInputBlur(e){this.dirty=!1,this.focused=!1,this.focusedOptionIndex.set(-1),this.onModelTouched(),this.onBlur.emit(e)}onInputPaste(e){this.onKeyDown(e)}onInputKeyUp(e){this.onKeyUp.emit(e)}onKeyDown(e){if(this.disabled){e.preventDefault();return}switch(e.code){case"ArrowDown":this.onArrowDownKey(e);break;case"ArrowUp":this.onArrowUpKey(e);break;case"ArrowLeft":this.onArrowLeftKey(e);break;case"ArrowRight":this.onArrowRightKey(e);break;case"Home":this.onHomeKey(e);break;case"End":this.onEndKey(e);break;case"PageDown":this.onPageDownKey(e);break;case"PageUp":this.onPageUpKey(e);break;case"Enter":case"NumpadEnter":this.onEnterKey(e);break;case"Escape":this.onEscapeKey(e);break;case"Tab":this.onTabKey(e);break;case"Backspace":this.onBackspaceKey(e);break;case"ShiftLeft":case"ShiftRight":break;default:break}}onArrowDownKey(e){if(!this.overlayVisible)return;let i=this.focusedOptionIndex()!==-1?this.findNextOptionIndex(this.focusedOptionIndex()):this.findFirstFocusedOptionIndex();this.changeFocusedOptionIndex(e,i),e.preventDefault(),e.stopPropagation()}onArrowUpKey(e){if(this.overlayVisible)if(e.altKey)this.focusedOptionIndex()!==-1&&this.onOptionSelect(e,this.visibleOptions()[this.focusedOptionIndex()]),this.overlayVisible&&this.hide(),e.preventDefault();else{let i=this.focusedOptionIndex()!==-1?this.findPrevOptionIndex(this.focusedOptionIndex()):this.findLastFocusedOptionIndex();this.changeFocusedOptionIndex(e,i),e.preventDefault(),e.stopPropagation()}}get hasFluid(){let i=this.el.nativeElement.closest("p-fluid");return this.fluid||!!i}onArrowLeftKey(e){let i=e.currentTarget;this.focusedOptionIndex.set(-1),this.multiple&&(st(i.value)&&this.hasSelectedOption()?(V(this.multiContainerEL.nativeElement),this.focusedMultipleOptionIndex.set(this.modelValue().length)):e.stopPropagation())}onArrowRightKey(e){this.focusedOptionIndex.set(-1),this.multiple&&e.stopPropagation()}onHomeKey(e){let{currentTarget:i}=e,n=i.value.length;i.setSelectionRange(0,e.shiftKey?n:0),this.focusedOptionIndex.set(-1),e.preventDefault()}onEndKey(e){let{currentTarget:i}=e,n=i.value.length;i.setSelectionRange(e.shiftKey?0:n,n),this.focusedOptionIndex.set(-1),e.preventDefault()}onPageDownKey(e){this.scrollInView(this.visibleOptions().length-1),e.preventDefault()}onPageUpKey(e){this.scrollInView(0),e.preventDefault()}onEnterKey(e){this.typeahead||this.multiple&&(this.updateModel([...this.modelValue()||[],e.target.value]),this.inputEL.nativeElement.value=""),this.overlayVisible?(this.focusedOptionIndex()!==-1&&this.onOptionSelect(e,this.visibleOptions()[this.focusedOptionIndex()]),this.hide()):this.onArrowDownKey(e),e.preventDefault()}onEscapeKey(e){this.overlayVisible&&this.hide(!0),e.preventDefault()}onTabKey(e){this.focusedOptionIndex()!==-1&&this.onOptionSelect(e,this.visibleOptions()[this.focusedOptionIndex()]),this.overlayVisible&&this.hide()}onBackspaceKey(e){if(this.multiple){if(ae(this.modelValue())&&!this.inputEL.nativeElement.value){let i=this.modelValue()[this.modelValue().length-1],n=this.modelValue().slice(0,-1);this.updateModel(n),this.onUnselect.emit({originalEvent:e,value:i})}e.stopPropagation()}!this.multiple&&this.showClear&&this.findSelectedOptionIndex()!=-1&&this.clear()}onArrowLeftKeyOnMultiple(e){let i=this.focusedMultipleOptionIndex()<1?0:this.focusedMultipleOptionIndex()-1;this.focusedMultipleOptionIndex.set(i)}onArrowRightKeyOnMultiple(e){let i=this.focusedMultipleOptionIndex();i++,this.focusedMultipleOptionIndex.set(i),i>this.modelValue().length-1&&(this.focusedMultipleOptionIndex.set(-1),V(this.inputEL.nativeElement))}onBackspaceKeyOnMultiple(e){this.focusedMultipleOptionIndex()!==-1&&this.removeOption(e,this.focusedMultipleOptionIndex())}onOptionSelect(e,i,n=!0){let o=this.getOptionValue(i);this.multiple?(this.inputEL.nativeElement.value="",this.isSelected(i)||this.updateModel([...this.modelValue()||[],o])):this.updateModel(o),this.onSelect.emit({originalEvent:e,value:i}),n&&this.hide(!0)}onOptionMouseEnter(e,i){this.focusOnHover&&this.changeFocusedOptionIndex(e,i)}search(e,i,n){i!=null&&(n==="input"&&i.trim().length===0||(this.loading=!0,this.completeMethod.emit({originalEvent:e,query:i})))}removeOption(e,i){e.stopPropagation();let n=this.modelValue()[i],o=this.modelValue().filter((l,_)=>_!==i).map(l=>this.getOptionValue(l));this.updateModel(o),this.onUnselect.emit({originalEvent:e,value:n}),V(this.inputEL.nativeElement)}updateModel(e){this.value=e,this.modelValue.set(e),this.onModelChange(e),this.updateInputValue(),this.cd.markForCheck()}updateInputValue(){this.inputEL&&this.inputEL.nativeElement&&(this.multiple?this.inputEL.nativeElement.value="":this.inputEL.nativeElement.value=this.inputValue())}autoUpdateModel(){if((this.selectOnFocus||this.autoHighlight)&&this.autoOptionFocus&&!this.hasSelectedOption()){let e=this.findFirstFocusedOptionIndex();this.focusedOptionIndex.set(e),this.onOptionSelect(null,this.visibleOptions()[this.focusedOptionIndex()],!1)}}scrollInView(e=-1){let i=e!==-1?`${this.id}_${e}`:this.focusedOptionId;if(this.itemsViewChild&&this.itemsViewChild.nativeElement){let n=ne(this.itemsViewChild.nativeElement,`li[id="${i}"]`);n?n.scrollIntoView&&n.scrollIntoView({block:"nearest",inline:"nearest"}):this.virtualScrollerDisabled||setTimeout(()=>{this.virtualScroll&&this.scroller?.scrollToIndex(e!==-1?e:this.focusedOptionIndex())},0)}}changeFocusedOptionIndex(e,i){this.focusedOptionIndex()!==i&&(this.focusedOptionIndex.set(i),this.scrollInView(),this.selectOnFocus&&this.onOptionSelect(e,this.visibleOptions()[i],!1))}show(e=!1){this.dirty=!0,this.overlayVisible=!0;let i=this.focusedOptionIndex()!==-1?this.focusedOptionIndex():this.autoOptionFocus?this.findFirstFocusedOptionIndex():-1;this.focusedOptionIndex.set(i),e&&V(this.inputEL.nativeElement),e&&V(this.inputEL.nativeElement),this.onShow.emit(),this.cd.markForCheck()}hide(e=!1){let i=()=>{this.dirty=e,this.overlayVisible=!1,this.focusedOptionIndex.set(-1),e&&V(this.inputEL.nativeElement),this.onHide.emit(),this.cd.markForCheck()};setTimeout(()=>{i()},0)}clear(){this.updateModel(null),this.inputEL.nativeElement.value="",this.onClear.emit()}writeValue(e){this.value=e,this.modelValue.set(e),this.updateInputValue(),this.cd.markForCheck()}hasSelectedOption(){return ae(this.modelValue())}getAriaPosInset(e){return(this.optionGroupLabel?e-this.visibleOptions().slice(0,e).filter(i=>this.isOptionGroup(i)).length:e)+1}getOptionLabel(e){return this.field||this.optionLabel?oe(e,this.field||this.optionLabel):e&&e.label!=null?e.label:e}getOptionValue(e){return this.optionValue?oe(e,this.optionValue):e&&e.value!=null?e.value:e}getOptionIndex(e,i){return this.virtualScrollerDisabled?e:i&&i.getItemOptions(e).index}getOptionGroupLabel(e){return this.optionGroupLabel?oe(e,this.optionGroupLabel):e&&e.label!=null?e.label:e}getOptionGroupChildren(e){return this.optionGroupChildren?oe(e,this.optionGroupChildren):e.items}registerOnChange(e){this.onModelChange=e}registerOnTouched(e){this.onModelTouched=e}setDisabledState(e){this.disabled=e,this.cd.markForCheck()}onOverlayAnimationStart(e){if(e.toState==="visible"&&(this.itemsWrapper=ne(this.overlayViewChild.overlayViewChild?.nativeElement,this.virtualScroll?".p-scroller":".p-autocomplete-panel"),this.virtualScroll&&(this.scroller?.setContentEl(this.itemsViewChild?.nativeElement),this.scroller.viewInit()),this.visibleOptions()&&this.visibleOptions().length))if(this.virtualScroll){let i=this.modelValue()?this.focusedOptionIndex():-1;i!==-1&&this.scroller?.scrollToIndex(i)}else{let i=ne(this.itemsWrapper,".p-autocomplete-item.p-highlight");i&&i.scrollIntoView({block:"nearest",inline:"center"})}}ngOnDestroy(){this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),super.ngOnDestroy()}static \u0275fac=function(i){return new(i||t)($(xe),$(_e))};static \u0275cmp=q({type:t,selectors:[["p-autoComplete"],["p-autocomplete"],["p-auto-complete"]],contentQueries:function(i,n,o){if(i&1&&(x(o,Qi,5),x(o,qi,5),x(o,Pi,5),x(o,ji,5),x(o,Ni,5),x(o,Ui,5),x(o,Gi,5),x(o,Zi,5),x(o,Wi,5),x(o,Yi,5),x(o,Ji,5),x(o,Ie,4)),i&2){let l;g(l=y())&&(n.itemTemplate=l.first),g(l=y())&&(n.emptyTemplate=l.first),g(l=y())&&(n.headerTemplate=l.first),g(l=y())&&(n.footerTemplate=l.first),g(l=y())&&(n.selectedItemTemplate=l.first),g(l=y())&&(n.groupTemplate=l.first),g(l=y())&&(n.loaderTemplate=l.first),g(l=y())&&(n.removeIconTemplate=l.first),g(l=y())&&(n.loadingIconTemplate=l.first),g(l=y())&&(n.clearIconTemplate=l.first),g(l=y())&&(n.dropdownIconTemplate=l.first),g(l=y())&&(n.templates=l)}},viewQuery:function(i,n){if(i&1&&(A(Xi,5),A(en,5),A(tn,5),A(nn,5),A(on,5),A(an,5),A(ln,5),A(rn,5)),i&2){let o;g(o=y())&&(n.containerEL=o.first),g(o=y())&&(n.inputEL=o.first),g(o=y())&&(n.multiInputEl=o.first),g(o=y())&&(n.multiContainerEL=o.first),g(o=y())&&(n.dropdownButton=o.first),g(o=y())&&(n.itemsViewChild=o.first),g(o=y())&&(n.scroller=o.first),g(o=y())&&(n.overlayViewChild=o.first)}},inputs:{minLength:[2,"minLength","minLength",B],delay:[2,"delay","delay",B],style:"style",panelStyle:"panelStyle",styleClass:"styleClass",panelStyleClass:"panelStyleClass",inputStyle:"inputStyle",inputId:"inputId",inputStyleClass:"inputStyleClass",placeholder:"placeholder",readonly:[2,"readonly","readonly",v],disabled:[2,"disabled","disabled",v],scrollHeight:"scrollHeight",lazy:[2,"lazy","lazy",v],virtualScroll:[2,"virtualScroll","virtualScroll",v],virtualScrollItemSize:[2,"virtualScrollItemSize","virtualScrollItemSize",B],virtualScrollOptions:"virtualScrollOptions",maxlength:[2,"maxlength","maxlength",e=>B(e,null)],name:"name",required:[2,"required","required",v],size:"size",appendTo:"appendTo",autoHighlight:[2,"autoHighlight","autoHighlight",v],forceSelection:[2,"forceSelection","forceSelection",v],type:"type",autoZIndex:[2,"autoZIndex","autoZIndex",v],baseZIndex:[2,"baseZIndex","baseZIndex",B],ariaLabel:"ariaLabel",dropdownAriaLabel:"dropdownAriaLabel",ariaLabelledBy:"ariaLabelledBy",dropdownIcon:"dropdownIcon",unique:[2,"unique","unique",v],group:[2,"group","group",v],completeOnFocus:[2,"completeOnFocus","completeOnFocus",v],showClear:[2,"showClear","showClear",v],field:"field",dropdown:[2,"dropdown","dropdown",v],showEmptyMessage:[2,"showEmptyMessage","showEmptyMessage",v],dropdownMode:"dropdownMode",multiple:[2,"multiple","multiple",v],tabindex:[2,"tabindex","tabindex",B],dataKey:"dataKey",emptyMessage:"emptyMessage",showTransitionOptions:"showTransitionOptions",hideTransitionOptions:"hideTransitionOptions",autofocus:[2,"autofocus","autofocus",v],autocomplete:"autocomplete",optionGroupChildren:"optionGroupChildren",optionGroupLabel:"optionGroupLabel",overlayOptions:"overlayOptions",suggestions:"suggestions",itemSize:"itemSize",optionLabel:"optionLabel",optionValue:"optionValue",id:"id",searchMessage:"searchMessage",emptySelectionMessage:"emptySelectionMessage",selectionMessage:"selectionMessage",autoOptionFocus:[2,"autoOptionFocus","autoOptionFocus",v],selectOnFocus:[2,"selectOnFocus","selectOnFocus",v],searchLocale:[2,"searchLocale","searchLocale",v],optionDisabled:"optionDisabled",focusOnHover:[2,"focusOnHover","focusOnHover",v],typeahead:[2,"typeahead","typeahead",v],variant:"variant",fluid:[2,"fluid","fluid",v]},outputs:{completeMethod:"completeMethod",onSelect:"onSelect",onUnselect:"onUnselect",onFocus:"onFocus",onBlur:"onBlur",onDropdownClick:"onDropdownClick",onClear:"onClear",onKeyUp:"onKeyUp",onShow:"onShow",onHide:"onHide",onLazyLoad:"onLazyLoad"},features:[Y([co,Vt]),Z],decls:11,vars:15,consts:[["container",""],["overlay",""],["content",""],["focusInput",""],["multiContainer",""],["token",""],["removeicon",""],["ddBtn",""],["buildInItems",""],["scroller",""],["loader",""],["items",""],["empty",""],[2,"position","relative",3,"click","ngClass","ngStyle"],["pInputText","","aria-autocomplete","list","role","combobox",3,"pAutoFocus","ngClass","ngStyle","class","type","variant","autocomplete","required","name","pSize","tabindex","readonly","disabled","fluid","input","keydown","change","focus","blur","paste","keyup",4,"ngIf"],[4,"ngIf"],["role","listbox",3,"ngClass","tabindex","focus","blur","keydown",4,"ngIf"],["type","button","class","p-autocomplete-dropdown","pRipple","",3,"disabled","click",4,"ngIf"],[3,"visibleChange","onAnimationStart","onHide","visible","options","target","appendTo","showTransitionOptions","hideTransitionOptions"],["pInputText","","aria-autocomplete","list","role","combobox",3,"input","keydown","change","focus","blur","paste","keyup","pAutoFocus","ngClass","ngStyle","type","variant","autocomplete","required","name","pSize","tabindex","readonly","disabled","fluid"],[3,"styleClass","click",4,"ngIf"],["class","p-autocomplete-clear-icon",3,"click",4,"ngIf"],[3,"click","styleClass"],[1,"p-autocomplete-clear-icon",3,"click"],[4,"ngTemplateOutlet"],["role","listbox",3,"focus","blur","keydown","ngClass","tabindex"],["role","option",3,"ngClass",4,"ngFor","ngForOf"],["role","option",1,"p-autocomplete-input-chip"],["role","combobox","aria-autocomplete","list",3,"input","keydown","change","focus","blur","paste","keyup","pAutoFocus","ngClass","ngStyle","autocomplete","required","tabindex","readonly","disabled"],["role","option",3,"ngClass"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["styleClass","p-autocomplete-chip",3,"label","removable",4,"ngIf"],["styleClass","p-autocomplete-chip",3,"label","removable"],[1,"p-autocomplete-chip-icon",3,"click"],[3,"styleClass"],[3,"styleClass","spin",4,"ngIf"],["class","p-autocomplete-loader pi-spin ",4,"ngIf"],[3,"styleClass","spin"],[1,"p-autocomplete-loader","pi-spin"],["type","button","pRipple","",1,"p-autocomplete-dropdown",3,"click","disabled"],[3,"ngClass",4,"ngIf"],[3,"ngClass"],[3,"ngClass","ngStyle"],[1,"p-autocomplete-list-container"],[3,"items","style","itemSize","autoSize","lazy","options","onLazyLoad",4,"ngIf"],["role","status","aria-live","polite",1,"p-hidden-accessible"],[3,"onLazyLoad","items","itemSize","autoSize","lazy","options"],["role","listbox",1,"p-autocomplete-list",3,"ngClass"],["ngFor","",3,"ngForOf"],["class","p-autocomplete-empty-message","role","option",3,"ngStyle",4,"ngIf"],["role","option",1,"p-autocomplete-option-group",3,"ngStyle"],["pRipple","","role","option",3,"click","mouseenter","ngStyle","ngClass"],["role","option",1,"p-autocomplete-empty-message",3,"ngStyle"],[4,"ngIf","ngIfElse"]],template:function(i,n){if(i&1){let o=w();d(0,"div",13,0),b("click",function(_){return u(o),m(n.onContainerClick(_))}),c(2,dn,2,25,"input",14)(3,yn,3,2,"ng-container",15)(4,Sn,6,26,"ul",16)(5,En,3,2,"ng-container",15)(6,Hn,4,5,"button",17),d(7,"p-overlay",18,1),We("visibleChange",function(_){return u(o),Ze(n.overlayVisible,_)||(n.overlayVisible=_),m(_)}),b("onAnimationStart",function(_){return u(o),m(n.onOverlayAnimationStart(_))})("onHide",function(){return u(o),m(n.hide())}),c(9,lo,10,11,"ng-template",null,2,E),h()()}i&2&&(S(n.styleClass),s("ngClass",n.rootClass)("ngStyle",n.style),p(2),s("ngIf",!n.multiple),p(),s("ngIf",n.filled&&!n.disabled&&n.showClear&&!n.loading),p(),s("ngIf",n.multiple),p(),s("ngIf",n.loading),p(),s("ngIf",n.dropdown),p(),Ge("visible",n.overlayVisible),s("options",n.overlayOptions)("target","@parent")("appendTo",n.appendTo)("showTransitionOptions",n.showTransitionOptions)("hideTransitionOptions",n.hideTransitionOptions))},dependencies:[j,te,be,ie,ce,pe,xt,vt,we,It,dt,yt,ft,gt,_t,Ct,O],encapsulation:2,changeDetection:0})}return t})(),Ba=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=K({type:t});static \u0275inj=z({imports:[At,O]})}return t})();var Ft=class t{constructor(a){this.http=a}getMembers(){return this.http.get("/demo/data/members.json").toPromise().then(a=>a.data).then(a=>a)}static \u0275fac=function(e){return new(e||t)(Be(Je))};static \u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"})};var uo=["*"],mo={root:"p-avatar-group p-component"},Dt=(()=>{class t extends J{name="avatargroup";classes=mo;static \u0275fac=(()=>{let e;return function(n){return(e||(e=H(t)))(n||t)}})();static \u0275prov=D({token:t,factory:t.\u0275fac})}return t})();var ho=(()=>{class t extends X{styleClass;style;get hostClass(){return this.styleClass}get hostStyle(){return this.style}_componentStyle=Q(Dt);static \u0275fac=(()=>{let e;return function(n){return(e||(e=H(t)))(n||t)}})();static \u0275cmp=q({type:t,selectors:[["p-avatarGroup"],["p-avatar-group"],["p-avatargroup"]],hostVars:8,hostBindings:function(i,n){i&2&&(ee(n.hostStyle),S(n.hostClass),ge("p-avatar-group",!0)("p-component",!0))},inputs:{styleClass:"styleClass",style:"style"},features:[Y([Dt]),Z],ngContentSelectors:uo,decls:1,vars:0,template:function(i,n){i&1&&(ye(),ve(0))},dependencies:[j,O],encapsulation:2,changeDetection:0})}return t})(),nl=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=K({type:t});static \u0275inj=z({imports:[ho,O,O]})}return t})();export{jt as a,ko as b,Do as c,zo as d,Lt as e,ha as f,ho as g,nl as h,At as i,Ba as j,Ft as k};
