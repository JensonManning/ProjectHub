import{V as Y,X as J,Y as $,aa as Q,da as K,p as T,sa as _}from"./chunk-NB76KGKE.js";import{Db as L,Eb as x,Ec as V,Fb as y,Gc as P,Hc as U,Ib as C,Ic as G,Kb as E,Lb as S,Lc as M,Ma as p,N as H,O as m,Oc as W,P as f,Pb as n,U as k,Wb as z,Ya as w,Za as v,ab as g,ca as c,cb as j,ia as h,kb as s,mb as R,ob as A,ub as i,vb as r,wa as O,wb as q,zb as B}from"./chunk-U6KPTH7L.js";import{a as D}from"./chunk-GAL4ENT6.js";var te=["header"],ie=[[["p-header"]]],re=["p-header"];function ne(e,F){e&1&&B(0)}function ae(e,F){if(e&1&&(i(0,"div",3),y(1),j(2,ne,1,0,"ng-container",4),r()),e&2){let l=L();p(2),s("ngTemplateOutlet",l.headerTemplate||l._headerTemplate)}}function qe(e,F){e&1&&(i(0,"div",3)(1,"span",5)(2,"select",6)(3,"option",7),n(4,"Heading"),r(),i(5,"option",8),n(6,"Subheading"),r(),i(7,"option",9),n(8,"Normal"),r()(),i(9,"select",10)(10,"option",9),n(11,"Sans Serif"),r(),i(12,"option",11),n(13,"Serif"),r(),i(14,"option",12),n(15,"Monospace"),r()()(),i(16,"span",5),q(17,"button",13)(18,"button",14)(19,"button",15),r(),i(20,"span",5),q(21,"select",16)(22,"select",17),r(),i(23,"span",5),q(24,"button",18)(25,"button",19),i(26,"select",20),q(27,"option",9),i(28,"option",21),n(29,"center"),r(),i(30,"option",22),n(31,"right"),r(),i(32,"option",23),n(33,"justify"),r()()(),i(34,"span",5),q(35,"button",24)(36,"button",25)(37,"button",26),r(),i(38,"span",5),q(39,"button",27),r()())}var se=({dt:e})=>`
/*!
* Quill Editor v1.3.3
* https://quilljs.com/
* Copyright (c) 2014, Jason Chen
* Copyright (c) 2013, salesforce.com
*/
.ql-container {
    box-sizing: border-box;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 13px;
    height: 100%;
    margin: 0;
    position: relative;
}
.ql-container.ql-disabled .ql-tooltip {
    visibility: hidden;
}
.ql-container.ql-disabled .ql-editor ul[data-checked] > li::before {
    pointer-events: none;
}
.ql-clipboard {
    inset-inline-start: -100000px;
    height: 1px;
    overflow-y: hidden;
    position: absolute;
    top: 50%;
}
.ql-clipboard p {
    margin: 0;
    padding: 0;
}
.ql-editor {
    box-sizing: border-box;
    line-height: 1.42;
    height: 100%;
    outline: none;
    overflow-y: auto;
    padding: 12px 15px;
    tab-size: 4;
    -moz-tab-size: 4;
    text-align: start;
    white-space: pre-wrap;
    word-wrap: break-word;
}
.ql-editor > * {
    cursor: text;
}
.ql-editor p,
.ql-editor ol,
.ql-editor ul,
.ql-editor pre,
.ql-editor blockquote,
.ql-editor h1,
.ql-editor h2,
.ql-editor h3,
.ql-editor h4,
.ql-editor h5,
.ql-editor h6 {
    margin: 0;
    padding: 0;
    counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
}
.ql-editor ol,
.ql-editor ul {
    padding-inline-start: 1.5rem;
}
.ql-editor ol > li,
.ql-editor ul > li {
    list-style-type: none;
}
.ql-editor ul > li::before {
    content: '\\2022';
}
.ql-editor ul[data-checked='true'],
.ql-editor ul[data-checked='false'] {
    pointer-events: none;
}
.ql-editor ul[data-checked='true'] > li *,
.ql-editor ul[data-checked='false'] > li * {
    pointer-events: all;
}
.ql-editor ul[data-checked='true'] > li::before,
.ql-editor ul[data-checked='false'] > li::before {
    color: #777;
    cursor: pointer;
    pointer-events: all;
}
.ql-editor ul[data-checked='true'] > li::before {
    content: '\\2611';
}
.ql-editor ul[data-checked='false'] > li::before {
    content: '\\2610';
}
.ql-editor li::before {
    display: inline-block;
    white-space: nowrap;
    width: 1.2rem;
}
.ql-editor li:not(.ql-direction-rtl)::before {
    margin-inline-start: -1.5rem;
    margin-inline-end: 0.3rem;
    text-align: end;
}
.ql-editor li.ql-direction-rtl::before {
    margin-inline-start: 0.3rem;
    margin-inline-end: -1.5rem;
}
.ql-editor ol li:not(.ql-direction-rtl),
.ql-editor ul li:not(.ql-direction-rtl) {
    padding-inline-start: 1.5rem;
}
.ql-editor ol li.ql-direction-rtl,
.ql-editor ul li.ql-direction-rtl {
    padding-inline-end: 1.5rem;
}
.ql-editor ol li {
    counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
    counter-increment: list-0;
}
.ql-editor ol li:before {
    content: counter(list-0, decimal) '. ';
}
.ql-editor ol li.ql-indent-1 {
    counter-increment: list-1;
}
.ql-editor ol li.ql-indent-1:before {
    content: counter(list-1, lower-alpha) '. ';
}
.ql-editor ol li.ql-indent-1 {
    counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
}
.ql-editor ol li.ql-indent-2 {
    counter-increment: list-2;
}
.ql-editor ol li.ql-indent-2:before {
    content: counter(list-2, lower-roman) '. ';
}
.ql-editor ol li.ql-indent-2 {
    counter-reset: list-3 list-4 list-5 list-6 list-7 list-8 list-9;
}
.ql-editor ol li.ql-indent-3 {
    counter-increment: list-3;
}
.ql-editor ol li.ql-indent-3:before {
    content: counter(list-3, decimal) '. ';
}
.ql-editor ol li.ql-indent-3 {
    counter-reset: list-4 list-5 list-6 list-7 list-8 list-9;
}
.ql-editor ol li.ql-indent-4 {
    counter-increment: list-4;
}
.ql-editor ol li.ql-indent-4:before {
    content: counter(list-4, lower-alpha) '. ';
}
.ql-editor ol li.ql-indent-4 {
    counter-reset: list-5 list-6 list-7 list-8 list-9;
}
.ql-editor ol li.ql-indent-5 {
    counter-increment: list-5;
}
.ql-editor ol li.ql-indent-5:before {
    content: counter(list-5, lower-roman) '. ';
}
.ql-editor ol li.ql-indent-5 {
    counter-reset: list-6 list-7 list-8 list-9;
}
.ql-editor ol li.ql-indent-6 {
    counter-increment: list-6;
}
.ql-editor ol li.ql-indent-6:before {
    content: counter(list-6, decimal) '. ';
}
.ql-editor ol li.ql-indent-6 {
    counter-reset: list-7 list-8 list-9;
}
.ql-editor ol li.ql-indent-7 {
    counter-increment: list-7;
}
.ql-editor ol li.ql-indent-7:before {
    content: counter(list-7, lower-alpha) '. ';
}
.ql-editor ol li.ql-indent-7 {
    counter-reset: list-8 list-9;
}
.ql-editor ol li.ql-indent-8 {
    counter-increment: list-8;
}
.ql-editor ol li.ql-indent-8:before {
    content: counter(list-8, lower-roman) '. ';
}
.ql-editor ol li.ql-indent-8 {
    counter-reset: list-9;
}
.ql-editor ol li.ql-indent-9 {
    counter-increment: list-9;
}
.ql-editor ol li.ql-indent-9:before {
    content: counter(list-9, decimal) '. ';
}
.ql-editor .ql-video {
    display: block;
    max-width: 100%;
}
.ql-editor .ql-video.ql-align-center {
    margin: 0 auto;
}
.ql-editor .ql-video.ql-align-right {
    margin: 0 0 0 auto;
}
.ql-editor .ql-bg-black {
    background: #000;
}
.ql-editor .ql-bg-red {
    background: #e60000;
}
.ql-editor .ql-bg-orange {
    background: #f90;
}
.ql-editor .ql-bg-yellow {
    background: #ff0;
}
.ql-editor .ql-bg-green {
    background: #008a00;
}
.ql-editor .ql-bg-blue {
    background: #06c;
}
.ql-editor .ql-bg-purple {
    background: #93f;
}
.ql-editor .ql-color-white {
    color: #fff;
}
.ql-editor .ql-color-red {
    color: #e60000;
}
.ql-editor .ql-color-orange {
    color: #f90;
}
.ql-editor .ql-color-yellow {
    color: #ff0;
}
.ql-editor .ql-color-green {
    color: #008a00;
}
.ql-editor .ql-color-blue {
    color: #06c;
}
.ql-editor .ql-color-purple {
    color: #93f;
}
.ql-editor .ql-font-serif {
    font-family: Georgia, Times New Roman, serif;
}
.ql-editor .ql-font-monospace {
    font-family: Monaco, Courier New, monospace;
}
.ql-editor .ql-size-small {
    font-size: 0.75rem;
}
.ql-editor .ql-size-large {
    font-size: 1.5rem;
}
.ql-editor .ql-size-huge {
    font-size: 2.5rem;
}
.ql-editor .ql-direction-rtl {
    direction: rtl;
    text-align: inherit;
}
.ql-editor .ql-align-center {
    text-align: center;
}
.ql-editor .ql-align-justify {
    text-align: justify;
}
.ql-editor .ql-align-right {
    text-align: end;
}
.ql-editor.ql-blank::before {
    color: rgba(0, 0, 0, 0.6);
    content: attr(data-placeholder);
    font-style: italic;
    inset-inline-start: 15px;
    pointer-events: none;
    position: absolute;
    inset-inline-end: 15px;
}
.ql-snow.ql-toolbar:after,
.ql-snow .ql-toolbar:after {
    clear: both;
    content: '';
    display: table;
}
.ql-snow.ql-toolbar button,
.ql-snow .ql-toolbar button {
    background: none;
    border: none;
    cursor: pointer;
    display: inline-block;
    float: left;
    height: 24px;
    padding-block: 3px;
    padding-inline: 5px;
    width: 28px;
}
.ql-snow.ql-toolbar button svg,
.ql-snow .ql-toolbar button svg {
    float: left;
    height: 100%;
}
.ql-snow.ql-toolbar button:active:hover,
.ql-snow .ql-toolbar button:active:hover {
    outline: none;
}
.ql-snow.ql-toolbar input.ql-image[type='file'],
.ql-snow .ql-toolbar input.ql-image[type='file'] {
    display: none;
}
.ql-snow.ql-toolbar button:hover,
.ql-snow .ql-toolbar button:hover,
.ql-snow.ql-toolbar button:focus,
.ql-snow .ql-toolbar button:focus,
.ql-snow.ql-toolbar button.ql-active,
.ql-snow .ql-toolbar button.ql-active,
.ql-snow.ql-toolbar .ql-picker-label:hover,
.ql-snow .ql-toolbar .ql-picker-label:hover,
.ql-snow.ql-toolbar .ql-picker-label.ql-active,
.ql-snow .ql-toolbar .ql-picker-label.ql-active,
.ql-snow.ql-toolbar .ql-picker-item:hover,
.ql-snow .ql-toolbar .ql-picker-item:hover,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected {
    color: #06c;
}
.ql-snow.ql-toolbar button:hover .ql-fill,
.ql-snow .ql-toolbar button:hover .ql-fill,
.ql-snow.ql-toolbar button:focus .ql-fill,
.ql-snow .ql-toolbar button:focus .ql-fill,
.ql-snow.ql-toolbar button.ql-active .ql-fill,
.ql-snow .ql-toolbar button.ql-active .ql-fill,
.ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
.ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,
.ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,
.ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill,
.ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill,
.ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill,
.ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill,
.ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill,
.ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,
.ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill,
.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {
    fill: #06c;
}
.ql-snow.ql-toolbar button:hover .ql-stroke,
.ql-snow .ql-toolbar button:hover .ql-stroke,
.ql-snow.ql-toolbar button:focus .ql-stroke,
.ql-snow .ql-toolbar button:focus .ql-stroke,
.ql-snow.ql-toolbar button.ql-active .ql-stroke,
.ql-snow .ql-toolbar button.ql-active .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
.ql-snow.ql-toolbar button:hover .ql-stroke-miter,
.ql-snow .ql-toolbar button:hover .ql-stroke-miter,
.ql-snow.ql-toolbar button:focus .ql-stroke-miter,
.ql-snow .ql-toolbar button:focus .ql-stroke-miter,
.ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
.ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
    stroke: #06c;
}
@media (pointer: coarse) {
    .ql-snow.ql-toolbar button:hover:not(.ql-active),
    .ql-snow .ql-toolbar button:hover:not(.ql-active) {
        color: #444;
    }
    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-fill,
    .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-fill,
    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill {
        fill: #444;
    }
    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke,
    .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke,
    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter,
    .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter {
        stroke: #444;
    }
}
.ql-snow {
    box-sizing: border-box;
}
.ql-snow * {
    box-sizing: border-box;
}
.ql-snow .ql-hidden {
    display: none;
}
.ql-snow .ql-out-bottom,
.ql-snow .ql-out-top {
    visibility: hidden;
}
.ql-snow .ql-tooltip {
    position: absolute;
    transform: translateY(10px);
}
.ql-snow .ql-tooltip a {
    cursor: pointer;
    text-decoration: none;
}
.ql-snow .ql-tooltip.ql-flip {
    transform: translateY(-10px);
}
.ql-snow .ql-formats {
    display: inline-block;
    vertical-align: middle;
}
.ql-snow .ql-formats:after {
    clear: both;
    content: '';
    display: table;
}
.ql-snow .ql-stroke {
    fill: none;
    stroke: #444;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
}
.ql-snow .ql-stroke-miter {
    fill: none;
    stroke: #444;
    stroke-miterlimit: 10;
    stroke-width: 2;
}
.ql-snow .ql-fill,
.ql-snow .ql-stroke.ql-fill {
    fill: #444;
}
.ql-snow .ql-empty {
    fill: none;
}
.ql-snow .ql-even {
    fill-rule: evenodd;
}
.ql-snow .ql-thin,
.ql-snow .ql-stroke.ql-thin {
    stroke-width: 1;
}
.ql-snow .ql-transparent {
    opacity: 0.4;
}
.ql-snow .ql-direction svg:last-child {
    display: none;
}
.ql-snow .ql-direction.ql-active svg:last-child {
    display: inline;
}
.ql-snow .ql-direction.ql-active svg:first-child {
    display: none;
}
.ql-snow .ql-editor h1 {
    font-size: 2rem;
}
.ql-snow .ql-editor h2 {
    font-size: 1.5rem;
}
.ql-snow .ql-editor h3 {
    font-size: 1.17rem;
}
.ql-snow .ql-editor h4 {
    font-size: 1rem;
}
.ql-snow .ql-editor h5 {
    font-size: 0.83rem;
}
.ql-snow .ql-editor h6 {
    font-size: 0.67rem;
}
.ql-snow .ql-editor a {
    text-decoration: underline;
}
.ql-snow .ql-editor blockquote {
    border-inline-start: 4px solid #ccc;
    margin-block-end: 5px;
    margin-block-start: 5px;
    padding-inline-start: 16px;
}
.ql-snow .ql-editor code,
.ql-snow .ql-editor pre {
    background: #f0f0f0;
    border-radius: 3px;
}
.ql-snow .ql-editor pre {
    white-space: pre-wrap;
    margin-block-end: 5px;
    margin-block-start: 5px;
    padding: 5px 10px;
}
.ql-snow .ql-editor code {
    font-size: 85%;
    padding: 2px 4px;
}
.ql-snow .ql-editor pre.ql-syntax {
    background: #23241f;
    color: #f8f8f2;
    overflow: visible;
}
.ql-snow .ql-editor img {
    max-width: 100%;
}
.ql-snow .ql-picker {
    color: #444;
    display: inline-block;
    float: left;
    inset-inline-start: 0;
    font-size: 14px;
    font-weight: 500;
    height: 24px;
    position: relative;
    vertical-align: middle;
}
.ql-snow .ql-picker-label {
    cursor: pointer;
    display: inline-block;
    height: 100%;
    padding-inline-start: 8px;
    padding-inline-end: 2px;
    position: relative;
    width: 100%;
}
.ql-snow .ql-picker-label::before {
    display: inline-block;
    line-height: 22px;
}
.ql-snow .ql-picker-options {
    background: #fff;
    display: none;
    min-width: 100%;
    padding: 4px 8px;
    position: absolute;
    white-space: nowrap;
}
.ql-snow .ql-picker-options .ql-picker-item {
    cursor: pointer;
    display: block;
    padding-block-end: 5px;
    padding-block-start: 5px;
}
.ql-snow .ql-picker.ql-expanded .ql-picker-label {
    color: #ccc;
    z-index: 2;
}
.ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-fill {
    fill: #ccc;
}
.ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-stroke {
    stroke: #ccc;
}
.ql-snow .ql-picker.ql-expanded .ql-picker-options {
    display: block;
    margin-block-start: -1px;
    top: 100%;
    z-index: 1;
}
.ql-snow .ql-color-picker,
.ql-snow .ql-icon-picker {
    width: 28px;
}
.ql-snow .ql-color-picker .ql-picker-label,
.ql-snow .ql-icon-picker .ql-picker-label {
    padding: 2px 4px;
}
.ql-snow .ql-color-picker .ql-picker-label svg,
.ql-snow .ql-icon-picker .ql-picker-label svg {
    inset-inline-end: 4px;
}
.ql-snow .ql-icon-picker .ql-picker-options {
    padding: 4px 0;
}
.ql-snow .ql-icon-picker .ql-picker-item {
    height: 24px;
    width: 24px;
    padding: 2px 4px;
}
.ql-snow .ql-color-picker .ql-picker-options {
    padding: 3px 5px;
    width: 152px;
}
.ql-snow .ql-color-picker .ql-picker-item {
    border: 1px solid transparent;
    float: left;
    height: 16px;
    margin: 2px;
    padding: 0;
    width: 16px;
}
.ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg {
    position: absolute;
    margin-block-start: -9px;
    inset-inline-end: 0;
    top: 50%;
    width: 18px;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-label]:not([data-label=''])::before,
.ql-snow .ql-picker.ql-font .ql-picker-label[data-label]:not([data-label=''])::before,
.ql-snow .ql-picker.ql-size .ql-picker-label[data-label]:not([data-label=''])::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-label]:not([data-label=''])::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-label]:not([data-label=''])::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-label]:not([data-label=''])::before {
    content: attr(data-label);
}
.ql-snow .ql-picker.ql-header {
    width: 98px;
}
.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: 'Normal';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
    content: 'Heading 1';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
    content: 'Heading 2';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
    content: 'Heading 3';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
    content: 'Heading 4';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
    content: 'Heading 5';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
    content: 'Heading 6';
}
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
    font-size: 2rem;
}
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
    font-size: 1.5rem;
}
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
    font-size: 1.17rem;
}
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
    font-size: 1rem;
}
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
    font-size: 0.83rem;
}
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
    font-size: 0.67rem;
}
.ql-snow .ql-picker.ql-font {
    width: 108px;
}
.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: 'Sans Serif';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='serif']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
    content: 'Serif';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='monospace']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
    content: 'Monospace';
}
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
    font-family: Georgia, Times New Roman, serif;
}
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
    font-family: Monaco, Courier New, monospace;
}
.ql-snow .ql-picker.ql-size {
    width: 98px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: 'Normal';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='small']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
    content: 'Small';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
    content: 'Large';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
    content: 'Huge';
}
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
    font-size: 10px;
}
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
    font-size: 18px;
}
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
    font-size: 32px;
}
.ql-snow .ql-color-picker.ql-background .ql-picker-item {
    background: #fff;
}
.ql-snow .ql-color-picker.ql-color .ql-picker-item {
    background: #000;
}
.ql-toolbar.ql-snow {
    border: 1px solid #ccc;
    box-sizing: border-box;
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    padding: 8px;
}
.ql-toolbar.ql-snow .ql-formats {
    margin-inline-end: 15px;
}
.ql-toolbar.ql-snow .ql-picker-label {
    border: 1px solid transparent;
}
.ql-toolbar.ql-snow .ql-picker-options {
    border: 1px solid transparent;
    box-shadow: rgba(0, 0, 0, 0.2) 0 2px 8px;
}
.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {
    border-color: #ccc;
}
.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
    border-color: #ccc;
}
.ql-toolbar.ql-snow .ql-color-picker .ql-picker-item.ql-selected,
.ql-toolbar.ql-snow .ql-color-picker .ql-picker-item:hover {
    border-color: #000;
}
.ql-toolbar.ql-snow + .ql-container.ql-snow {
    border-block-start: 0;
}
.ql-snow .ql-tooltip {
    background: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 0 5px #ddd;
    color: #444;
    padding: 5px 12px;
    white-space: nowrap;
}
.ql-snow .ql-tooltip::before {
    content: 'Visit URL:';
    line-height: 26px;
    margin-inline-end: 8px;
}
.ql-snow .ql-tooltip input[type='text'] {
    display: none;
    border: 1px solid #ccc;
    font-size: 13px;
    height: 26px;
    margin: 0;
    padding: 3px 5px;
    width: 170px;
}
.ql-snow .ql-tooltip a.ql-preview {
    display: inline-block;
    max-width: 200px;
    overflow-x: hidden;
    text-overflow: ellipsis;
    vertical-align: top;
}
.ql-snow .ql-tooltip a.ql-action::after {
    border-inline-end: 1px solid #ccc;
    content: 'Edit';
    margin-inline-start: 16px;
    padding-inline-end: 8px;
}
.ql-snow .ql-tooltip a.ql-remove::before {
    content: 'Remove';
    margin-inline-start: 8px;
}
.ql-snow .ql-tooltip a {
    line-height: 26px;
}
.ql-snow .ql-tooltip.ql-editing a.ql-preview,
.ql-snow .ql-tooltip.ql-editing a.ql-remove {
    display: none;
}
.ql-snow .ql-tooltip.ql-editing input[type='text'] {
    display: inline-block;
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-inline-end: 0;
    content: 'Save';
    padding-inline-end: 0;
}
.ql-snow .ql-tooltip[data-mode='link']::before {
    content: 'Enter link:';
}
.ql-snow .ql-tooltip[data-mode='formula']::before {
    content: 'Enter formula:';
}
.ql-snow .ql-tooltip[data-mode='video']::before {
    content: 'Enter video:';
}
.ql-snow a {
    color: #06c;
}
.ql-container.ql-snow {
    border: 1px solid #ccc;
}

.p-editor .p-editor-toolbar {
    background: ${e("editor.toolbar.background")};
    border-start-end-radius: ${e("editor.toolbar.border.radius")};
    border-start-start-radius: ${e("editor.toolbar.border.radius")};
}

.p-editor .p-editor-toolbar.ql-snow {
    border: 1px solid ${e("editor.toolbar.border.color")};
}

.p-editor .p-editor-toolbar.ql-snow .ql-stroke {
    stroke: ${e("editor.toolbar.item.color")};
}

.p-editor .p-editor-toolbar.ql-snow .ql-fill {
    fill: ${e("editor.toolbar.item.color")};
}

.p-editor .p-editor-toolbar.ql-snow .ql-picker .ql-picker-label {
    border: 0 none;
    color: ${e("editor.toolbar.item.color")};
}

.p-editor .p-editor-toolbar.ql-snow .ql-picker .ql-picker-label:hover {
    color: ${e("editor.toolbar.item.hover.color")};
}

.p-editor .p-editor-toolbar.ql-snow .ql-picker .ql-picker-label:hover .ql-stroke {
    stroke: ${e("editor.toolbar.item.hover.color")};
}

.p-editor .p-editor-toolbar.ql-snow .ql-picker .ql-picker-label:hover .ql-fill {
    fill: ${e("editor.toolbar.item.hover.color")};
}

.p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {
    color: ${e("editor.toolbar.item.active.color")};
}

.p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-stroke {
    stroke: ${e("editor.toolbar.item.active.color")};
}

.p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-fill {
    fill: ${e("editor.toolbar.item.active.color")};
}

.p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
    background: ${e("editor.overlay.background")};
    border: 1px solid ${e("editor.overlay.border.color")};
    box-shadow: ${e("editor.overlay.shadow")};
    border-radius: ${e("editor.overlay.border.radius")};
    padding: ${e("editor.overlay.padding")};
}

.p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options .ql-picker-item {
    color: ${e("editor.overlay.option.color")};
    border-radius: ${e("editor.overlay.option.border.radius")};
}

.p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options .ql-picker-item:hover {
    background: ${e("editor.overlay.option.focus.background")};
    color: ${e("editor.overlay.option.focus.color")};
}

.p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded:not(.ql-icon-picker) .ql-picker-item {
    padding: ${e("editor.overlay.option.padding")};
}

.p-editor .p-editor-content {
    border-end-end-radius: ${e("editor.content.border.radius")};
    border-end-start-radius: ${e("editor.content.border.radius")};
}

.p-editor .p-editor-content.ql-snow {
    border: 1px solid ${e("editor.content.border.color")};
}

.p-editor .p-editor-content .ql-editor {
    background: ${e("editor.content.background")};
    color: ${e("editor.content.color")};
    border-end-end-radius: ${e("editor.content.border.radius")};
    border-end-start-radius: ${e("editor.content.border.radius")};
}

.p-editor .ql-snow.ql-toolbar button:hover,
.p-editor .ql-snow.ql-toolbar button:focus {
    color: ${e("editor.toolbar.item.hover.color")};
}

.p-editor .ql-snow.ql-toolbar button:hover .ql-stroke,
.p-editor .ql-snow.ql-toolbar button:focus .ql-stroke {
    stroke: ${e("editor.toolbar.item.hover.color")};
}

.p-editor .ql-snow.ql-toolbar button:hover .ql-fill,
.p-editor .ql-snow.ql-toolbar button:focus .ql-fill {
    fill: ${e("editor.toolbar.item.hover.color")};
}

.p-editor .ql-snow.ql-toolbar button.ql-active,
.p-editor .ql-snow.ql-toolbar .ql-picker-label.ql-active,
.p-editor .ql-snow.ql-toolbar .ql-picker-item.ql-selected {
    color: ${e("editor.toolbar.item.active.color")};
}

.p-editor .ql-snow.ql-toolbar button.ql-active .ql-stroke,
.p-editor .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.p-editor .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke {
    stroke: ${e("editor.toolbar.item.active.color")};
}

.p-editor .ql-snow.ql-toolbar button.ql-active .ql-fill,
.p-editor .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
.p-editor .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill {
    fill: ${e("editor.toolbar.item.active.color")};
}

.p-editor .ql-snow.ql-toolbar button.ql-active .ql-picker-label,
.p-editor .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-picker-label,
.p-editor .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-picker-label {
    color: ${e("editor.toolbar.item.active.color")};
}
`,de={root:"p-editor",toolbar:"p-editor-toolbar",content:"p-editor-content"},X=(()=>{class e extends Q{name="editor";theme=se;classes=de;static \u0275fac=(()=>{let l;return function(t){return(l||(l=c(e)))(t||e)}})();static \u0275prov=m({token:e,factory:e.\u0275fac})}return e})();var ce={provide:K,useExisting:H(()=>Z),multi:!0},Z=(()=>{class e extends _{style;styleClass;placeholder;formats;modules;bounds;scrollingContainer;debug;get readonly(){return this._readonly}set readonly(l){this._readonly=l,this.quill&&(this._readonly?this.quill.disable():this.quill.enable())}onInit=new h;onTextChange=new h;onSelectionChange=new h;toolbar;value;delayedCommand=null;_readonly=!1;onModelChange=()=>{};onModelTouched=()=>{};quill;dynamicQuill;headerTemplate;templates;_headerTemplate;get isAttachedQuillEditorToDOM(){return this.quillElements?.editorElement?.isConnected}quillElements;_componentStyle=k(X);constructor(){super(),O(()=>{this.initQuillElements(),this.initQuillEditor()})}ngAfterContentInit(){this.templates.forEach(l=>{switch(l.getType()){case"header":this.headerTemplate=l.template;break}})}writeValue(l){if(this.value=l,this.quill)if(l){let o=()=>{this.quill.setContents(this.quill.clipboard.convert(this.dynamicQuill.version.startsWith("2")?{html:this.value}:this.value))};this.isAttachedQuillEditorToDOM?o():this.delayedCommand=o}else{let o=()=>{this.quill.setText("")};this.isAttachedQuillEditorToDOM?o():this.delayedCommand=o}}registerOnChange(l){this.onModelChange=l}registerOnTouched(l){this.onModelTouched=l}getQuill(){return this.quill}initQuillEditor(){W(this.platformId)||(this.dynamicQuill?this.createQuillEditor():import("./chunk-GBOB52RX.js").then(l=>{this.dynamicQuill=l.default,this.createQuillEditor()}).catch(l=>console.error(l.message)))}createQuillEditor(){this.initQuillElements();let{toolbarElement:l,editorElement:o}=this.quillElements,t={toolbar:l},d=this.modules?D(D({},t),this.modules):t;this.quill=new this.dynamicQuill(o,{modules:d,placeholder:this.placeholder,readOnly:this.readonly,theme:"snow",formats:this.formats,bounds:this.bounds,debug:this.debug,scrollingContainer:this.scrollingContainer});let a=this.dynamicQuill.version.startsWith("2");this.value&&this.quill.setContents(this.quill.clipboard.convert(a?{html:this.value}:this.value)),this.quill.on("text-change",(I,N,b)=>{if(b==="user"){let u=a?this.quill.getSemanticHTML():T(o,".ql-editor").innerHTML,le=this.quill.getText().trim();u==="<p><br></p>"&&(u=null),this.onTextChange.emit({htmlValue:u,textValue:le,delta:I,source:b}),this.onModelChange(u),this.onModelTouched()}}),this.quill.on("selection-change",(I,N,b)=>{this.onSelectionChange.emit({range:I,oldRange:N,source:b})}),this.onInit.emit({editor:this.quill})}initQuillElements(){this.quillElements||(this.quillElements={editorElement:T(this.el.nativeElement,"div.p-editor-content"),toolbarElement:T(this.el.nativeElement,"div.p-editor-toolbar")})}static \u0275fac=function(o){return new(o||e)};static \u0275cmp=w({type:e,selectors:[["p-editor"]],contentQueries:function(o,t,d){if(o&1&&(C(d,Y,5),C(d,te,4),C(d,J,4)),o&2){let a;E(a=S())&&(t.toolbar=a.first),E(a=S())&&(t.headerTemplate=a.first),E(a=S())&&(t.templates=a)}},hostAttrs:[1,"p-editor"],inputs:{style:"style",styleClass:"styleClass",placeholder:"placeholder",formats:"formats",modules:"modules",bounds:"bounds",scrollingContainer:"scrollingContainer",debug:"debug",readonly:"readonly"},outputs:{onInit:"onInit",onTextChange:"onTextChange",onSelectionChange:"onSelectionChange"},features:[z([ce,X]),g],ngContentSelectors:re,decls:4,vars:6,consts:[[3,"ngClass"],["class","p-editor-toolbar",4,"ngIf"],[1,"p-editor-content",3,"ngStyle"],[1,"p-editor-toolbar"],[4,"ngTemplateOutlet"],[1,"ql-formats"],[1,"ql-header"],["value","1"],["value","2"],["selected",""],[1,"ql-font"],["value","serif"],["value","monospace"],["aria-label","Bold","type","button",1,"ql-bold"],["aria-label","Italic","type","button",1,"ql-italic"],["aria-label","Underline","type","button",1,"ql-underline"],[1,"ql-color"],[1,"ql-background"],["value","ordered","aria-label","Ordered List","type","button",1,"ql-list"],["value","bullet","aria-label","Unordered List","type","button",1,"ql-list"],[1,"ql-align"],["value","center"],["value","right"],["value","justify"],["aria-label","Insert Link","type","button",1,"ql-link"],["aria-label","Insert Image","type","button",1,"ql-image"],["aria-label","Insert Code Block","type","button",1,"ql-code-block"],["aria-label","Remove Styles","type","button",1,"ql-clean"]],template:function(o,t){o&1&&(x(ie),i(0,"div",0),j(1,ae,3,1,"div",1)(2,qe,40,0,"div",1),q(3,"div",2),r()),o&2&&(A(t.styleClass),s("ngClass","p-editor-container"),p(),s("ngIf",t.toolbar||t.headerTemplate||t._headerTemplate),p(),s("ngIf",!t.toolbar&&!t.headerTemplate&&!t._headerTemplate),p(),s("ngStyle",t.style))},dependencies:[M,V,P,G,U,$],encapsulation:2,changeDetection:0})}return e})(),Ie=(()=>{class e{static \u0275fac=function(o){return new(o||e)};static \u0275mod=v({type:e});static \u0275inj=f({imports:[Z,$,$]})}return e})();var pe=["*"],be=({dt:e})=>`
    .p-fluid{
        width:100%
    }
`,ue={root:"p-fluid"},ee=(()=>{class e extends Q{name="fluid";classes=ue;theme=be;static \u0275fac=(()=>{let l;return function(t){return(l||(l=c(e)))(t||e)}})();static \u0275prov=m({token:e,factory:e.\u0275fac})}return e})();var me=(()=>{class e extends _{_componentStyle=k(ee);static \u0275fac=(()=>{let l;return function(t){return(l||(l=c(e)))(t||e)}})();static \u0275cmp=w({type:e,selectors:[["p-fluid"]],hostVars:2,hostBindings:function(o,t){o&2&&R("p-fluid",!0)},features:[z([ee]),g],ngContentSelectors:pe,decls:1,vars:0,template:function(o,t){o&1&&(x(),y(0))},dependencies:[M],encapsulation:2,changeDetection:0})}return e})(),Pe=(()=>{class e{static \u0275fac=function(o){return new(o||e)};static \u0275mod=v({type:e});static \u0275inj=f({imports:[me]})}return e})();export{Z as a,Ie as b,me as c,Pe as d};
