var z=Object.defineProperty;var f=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable;var h=(n,o,s)=>o in n?z(n,o,{enumerable:!0,configurable:!0,writable:!0,value:s}):n[o]=s,g=(n,o)=>{for(var s in o||(o={}))k.call(o,s)&&h(n,s,o[s]);if(f)for(var s of f(o))B.call(o,s)&&h(n,s,o[s]);return n};import{c as S,r as t,a as m,o as _,w as l,b as r,d as N,e as T,n as F,f as R,m as E,g as H}from"./vendor.21cce59a.js";const I=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerpolicy&&(a.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?a.credentials="include":e.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function c(e){if(e.ep)return;e.ep=!0;const a=s(e);fetch(e.href,a)}};I();var O={namespaced:!0,state:()=>({height:1.8,speed:{walk:30,sprint:70,look:1}}),getters:{getHeight:n=>n.height}},U=S({modules:{Player:O}}),V="./assets/alexander.bf834411.fbx",u=(n,o)=>{for(const[s,c]of o)n[s]=c;return n};const W={name:"AlexModel",emits:["load"],data(){return{Alex:V}},methods:{onLoad(n){n.traverse(function(o){o.isMesh&&(o.material.transparent=!1,o.castShadow=!0,o.receiveShadow=!0)}),this.$emit("load")}}};function j(n,o,s,c,e,a){const i=t("FbxModel");return _(),m(i,{src:e.Alex,scale:{x:.005,y:.005,z:.005},position:{x:-2,y:.8},rotation:{y:Math.PI/6},onLoad:a.onLoad},null,8,["src","scale","position","rotation","onLoad"])}var q=u(W,[["render",j]]),D="./assets/checker.410eacb7.png";const G={name:"FloorModel",data(){return{ColorMap:D}}};function K(n,o,s,c,e,a){const i=t("Texture"),d=t("PhongMaterial"),p=t("Plane");return _(),m(p,{width:10,height:10,position:{x:0,y:0,z:0},rotation:{x:-Math.PI/2,y:0,z:0},"receive-shadow":""},{default:l(()=>[r(d,{color:"#ffffff"},{default:l(()=>[r(i,{src:e.ColorMap},null,8,["src"])]),_:1})]),_:1},8,["rotation"])}var J=u(G,[["render",K]]);const Q={name:"LoadingModal",props:{isLoading:{type:Boolean,default:!1}},computed:{className(){return N("loading",{"loading--visible":this.isLoading,"loading--hidden":!this.isLoading})}}},X=R("div",{class:"loading__text"}," \uFF2C\uFF2F\uFF21\uFF24\uFF29\uFF2E\uFF27 ",-1),Y=[X];function Z(n,o,s,c,e,a){return _(),T("div",{class:F(a.className)},Y,2)}var ee=u(Q,[["render",Z]]),oe="./assets/macplus.27082fd1.png";const te={name:"MacPlusModel",data(){return{ColorMap:oe}}};function ne(n,o,s,c,e,a){const i=t("Texture"),d=t("BasicMaterial"),p=t("Plane");return _(),m(p,{width:2,height:1,position:{x:0,y:2,z:-.8}},{default:l(()=>[r(d,{color:"#cccccc",props:{transparent:!0,side:2}},{default:l(()=>[r(i,{src:e.ColorMap},null,8,["src"])]),_:1})]),_:1},8,["position"])}var se=u(te,[["render",ne]]),ae="./assets/marble.f6b7a7fc.png";const re={name:"MarbleStandModel",data(){return{ColorMap:ae}}};function ie(n,o,s,c,e,a){const i=t("Texture"),d=t("PhongMaterial"),p=t("Box");return _(),m(p,{size:.8,scale:{x:1.1,y:1,z:1.1},position:{x:-2.05,y:.4},"cast-shadow":"","receive-shadow":""},{default:l(()=>[r(d,null,{default:l(()=>[r(i,{src:e.ColorMap},null,8,["src"])]),_:1})]),_:1},8,["size","scale","position"])}var ce=u(re,[["render",ie]]),le="./assets/skyline.e9f865a8.png";const de={name:"SkylineModel",data(){return{ColorMap:le}}};function pe(n,o,s,c,e,a){const i=t("Texture"),d=t("BasicMaterial"),p=t("Plane");return _(),m(p,{width:2.5,height:1.5,position:{x:0,y:.75,z:-1}},{default:l(()=>[r(d,{color:"#cccccc",props:{side:2}},{default:l(()=>[r(i,{src:e.ColorMap},null,8,["src"])]),_:1})]),_:1},8,["width","height","position"])}var _e=u(de,[["render",pe]]);const ue={components:{Alex:q,Floor:J,Loading:ee,MacPlus:se,Marble:ce,Skyline:_e},data(){return{aspect:window.innerWidth/window.innerHeight,isLoading:!0}},computed:g({},E({playerHeight:"Player/getHeight"})),created(){window.addEventListener("resize",this.updateAspectRatio)},unmounted(){window.removeEventListener("resize",this.updateAspectRatio)},methods:{updateAspectRatio(){this.aspect=window.innerWidth/window.innerHeight},toggleIsLoading(){this.isLoading=!this.isLoading}}};function me(n,o,s,c,e,a){const i=t("Loading"),d=t("Camera"),p=t("AmbientLight"),x=t("PointLight"),y=t("Alex"),M=t("Marble"),v=t("MacPlus"),$=t("Skyline"),w=t("Floor"),L=t("RenderPass"),P=t("UnrealBloomPass"),b=t("EffectComposer"),C=t("Scene"),A=t("Renderer");return _(),m(A,{ref:"renderer",antialias:"",resize:"window","orbit-ctrl":{enableDamping:!0},shadow:""},{default:l(()=>[r(i,{"is-loading":e.isLoading},null,8,["is-loading"]),r(d,{position:{y:n.playerHeight,z:5},aspect:e.aspect,fov:90},null,8,["position","aspect"]),r(C,{background:"#b26474"},{default:l(()=>[r(p,{position:{y:20},intensity:.2},null,8,["intensity"]),r(x,{intensity:.7,position:{x:2,y:10,z:5},"shadow-map-size":{width:1024,height:1024},"cast-shadow":""},null,8,["intensity"]),r(y,{onLoad:a.toggleIsLoading},null,8,["onLoad"]),r(M),r(v),r($),r(w),r(b,null,{default:l(()=>[r(L),r(P,{strength:.15},null,8,["strength"])]),_:1})]),_:1})]),_:1},512)}var fe=u(ue,[["render",me]]);H(fe).use(U).mount("#app");