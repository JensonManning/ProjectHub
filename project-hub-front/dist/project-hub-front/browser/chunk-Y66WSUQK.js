import{Ba as E,aa as M,fa as w,ja as I,sa as F}from"./chunk-NB76KGKE.js";import{Cb as S,O as d,P as u,Ra as l,U as c,Wb as C,Ya as g,Za as h,_a as x,ab as o,ba as p,ca as r,ia as f,jb as v,mb as m,mc as s,ob as b,ub as y,vb as $,wb as z}from"./chunk-U6KPTH7L.js";var B=({dt:e})=>`
.p-textarea {
    font-family: inherit;
    font-feature-settings: inherit;
    font-size: 1rem;
    color: ${e("textarea.color")};
    background: ${e("textarea.background")};
    padding: ${e("textarea.padding.y")} ${e("textarea.padding.x")};
    border: 1px solid ${e("textarea.border.color")};
    transition: background ${e("textarea.transition.duration")}, color ${e("textarea.transition.duration")}, border-color ${e("textarea.transition.duration")}, outline-color ${e("textarea.transition.duration")}, box-shadow ${e("textarea.transition.duration")};
    appearance: none;
    border-radius: ${e("textarea.border.radius")};
    outline-color: transparent;
    box-shadow: ${e("textarea.shadow")};
}

.p-textarea.ng-invalid.ng-dirty {
    border-color: ${e("textarea.invalid.border.color")};
}

.p-textarea:enabled:hover {
    border-color: ${e("textarea.hover.border.color")};
}

.p-textarea:enabled:focus {
    border-color: ${e("textarea.focus.border.color")};
    box-shadow: ${e("textarea.focus.ring.shadow")};
    outline: ${e("textarea.focus.ring.width")} ${e("textarea.focus.ring.style")} ${e("textarea.focus.ring.color")};
    outline-offset: ${e("textarea.focus.ring.offset")};
}

.p-textarea.p-invalid {
    border-color: ${e("textarea.invalid.border.color")};
}

.p-textarea.p-variant-filled {
    background: ${e("textarea.filled.background")};
}

.p-textarea.p-variant-filled:enabled:focus {
    background: ${e("textarea.filled.focus.background")};
}

.p-textarea:disabled {
    opacity: 1;
    background: ${e("textarea.disabled.background")};
    color: ${e("textarea.disabled.color")};
}

.p-textarea::placeholder {
    color: ${e("textarea.placeholder.color")};
}

.p-textarea.ng-invalid.ng-dirty::placeholder {
    color: ${e("textarea.invalid.placeholder.color")};
}

.p-textarea-fluid {
    width: 100%;
}

.p-textarea-resizable {
    overflow: hidden;
    resize: none;
}

.p-textarea-sm {
    font-size: ${e("textarea.sm.font.size")};
    padding-block: ${e("textarea.sm.padding.y")};
    padding-inline: ${e("textarea.sm.padding.x")};
}

.p-textarea-lg {
    font-size: ${e("textarea.lg.font.size")};
    padding-block: ${e("textarea.lg.padding.y")};
    padding-inline: ${e("textarea.lg.padding.x")};
}
`,H={root:({instance:e,props:n})=>["p-textarea p-component",{"p-filled":e.filled,"p-textarea-resizable ":n.autoResize,"p-invalid":n.invalid,"p-variant-filled":n.variant?n.variant==="filled":e.config.inputStyle==="filled"||e.config.inputVariant==="filled","p-textarea-fluid":n.fluid}]},R=(()=>{class e extends M{name="textarea";theme=B;classes=H;static \u0275fac=(()=>{let i;return function(t){return(i||(i=r(e)))(t||e)}})();static \u0275prov=d({token:e,factory:e.\u0275fac})}return e})();var J=(()=>{class e extends F{ngModel;control;autoResize;variant;fluid=!1;pSize;onResize=new f;filled;cachedScrollHeight;ngModelSubscription;ngControlSubscription;_componentStyle=c(R);constructor(i,a){super(),this.ngModel=i,this.control=a}ngOnInit(){super.ngOnInit(),this.ngModel&&(this.ngModelSubscription=this.ngModel.valueChanges.subscribe(()=>{this.updateState()})),this.control&&(this.ngControlSubscription=this.control.valueChanges.subscribe(()=>{this.updateState()}))}get hasFluid(){let a=this.el.nativeElement.closest("p-fluid");return this.fluid||!!a}ngAfterViewInit(){super.ngAfterViewInit(),this.autoResize&&this.resize(),this.updateFilledState(),this.cd.detectChanges()}onInput(i){this.updateState()}updateFilledState(){this.filled=this.el.nativeElement.value&&this.el.nativeElement.value.length}resize(i){this.el.nativeElement.style.height="auto",this.el.nativeElement.style.height=this.el.nativeElement.scrollHeight+"px",parseFloat(this.el.nativeElement.style.height)>=parseFloat(this.el.nativeElement.style.maxHeight)?(this.el.nativeElement.style.overflowY="scroll",this.el.nativeElement.style.height=this.el.nativeElement.style.maxHeight):this.el.nativeElement.style.overflow="hidden",this.onResize.emit(i||{})}updateState(){this.updateFilledState(),this.autoResize&&this.resize()}ngOnDestroy(){this.ngModelSubscription&&this.ngModelSubscription.unsubscribe(),this.ngControlSubscription&&this.ngControlSubscription.unsubscribe(),super.ngOnDestroy()}static \u0275fac=function(a){return new(a||e)(l(I,8),l(w,8))};static \u0275dir=x({type:e,selectors:[["","pTextarea",""]],hostAttrs:[1,"p-textarea","p-component"],hostVars:16,hostBindings:function(a,t){a&1&&S("input",function(D){return t.onInput(D)}),a&2&&m("p-filled",t.filled)("p-textarea-resizable",t.autoResize)("p-variant-filled",t.variant==="filled"||t.config.inputStyle()==="filled"||t.config.inputVariant()==="filled")("p-textarea-fluid",t.hasFluid)("p-textarea-sm",t.pSize==="small")("p-inputfield-sm",t.pSize==="small")("p-textarea-lg",t.pSize==="large")("p-inputfield-lg",t.pSize==="large")},inputs:{autoResize:[2,"autoResize","autoResize",s],variant:"variant",fluid:[2,"fluid","fluid",s],pSize:"pSize"},outputs:{onResize:"onResize"},features:[C([R]),o]})}return e})(),K=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275mod=h({type:e});static \u0275inj=u({})}return e})();var W=(()=>{class e extends E{static \u0275fac=(()=>{let i;return function(t){return(i||(i=r(e)))(t||e)}})();static \u0275cmp=g({type:e,selectors:[["AngleRightIcon"]],features:[o],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M5.25 11.1728C5.14929 11.1694 5.05033 11.1455 4.9592 11.1025C4.86806 11.0595 4.78666 10.9984 4.72 10.9228C4.57955 10.7822 4.50066 10.5916 4.50066 10.3928C4.50066 10.1941 4.57955 10.0035 4.72 9.86283L7.72 6.86283L4.72 3.86283C4.66067 3.71882 4.64765 3.55991 4.68275 3.40816C4.71785 3.25642 4.79932 3.11936 4.91585 3.01602C5.03238 2.91268 5.17819 2.84819 5.33305 2.83149C5.4879 2.81479 5.64411 2.84671 5.78 2.92283L9.28 6.42283C9.42045 6.56346 9.49934 6.75408 9.49934 6.95283C9.49934 7.15158 9.42045 7.34221 9.28 7.48283L5.78 10.9228C5.71333 10.9984 5.63193 11.0595 5.5408 11.1025C5.44966 11.1455 5.35071 11.1694 5.25 11.1728Z","fill","currentColor"]],template:function(a,t){a&1&&(p(),y(0,"svg",0),z(1,"path",1),$()),a&2&&(b(t.getClassNames()),v("aria-label",t.ariaLabel)("aria-hidden",t.ariaHidden)("role",t.role))},encapsulation:2})}return e})();export{W as a,J as b,K as c};
