import{Lb as A,Mb as m,Q as Ae,S as Se,Sa as Ie,U as I,Ua as F,V as _e,Wa as ie,X as k,Z as R,Za as j,_ as P,_a as G,db as Me,eb as $,fb as re,ga as be,j as we,qc as se,rc as Le,tc as Be,ua as V,uc as Oe,ya as ve}from"./chunk-XMVMWOPN.js";var je=null;function oe(){return je}function Bn(e){je??=e}var Re=class{};var me=new k(""),Ce=(()=>{class e{historyGo(t){throw new Error("")}static \u0275fac=function(n){return new(n||e)};static \u0275prov=I({token:e,factory:()=>P(Je),providedIn:"platform"})}return e})(),On=new k(""),Je=(()=>{class e extends Ce{_location;_history;_doc=P(me);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return oe().getBaseHref(this._doc)}onPopState(t){let n=oe().getGlobalEventTarget(this._doc,"window");return n.addEventListener("popstate",t,!1),()=>n.removeEventListener("popstate",t)}onHashChange(t){let n=oe().getGlobalEventTarget(this._doc,"window");return n.addEventListener("hashchange",t,!1),()=>n.removeEventListener("hashchange",t)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(t){this._location.pathname=t}pushState(t,n,r){this._history.pushState(t,n,r)}replaceState(t,n,r){this._history.replaceState(t,n,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(t=0){this._history.go(t)}getState(){return this._history.state}static \u0275fac=function(n){return new(n||e)};static \u0275prov=I({token:e,factory:()=>new e,providedIn:"platform"})}return e})();function Fe(e,i){if(e.length==0)return i;if(i.length==0)return e;let t=0;return e.endsWith("/")&&t++,i.startsWith("/")&&t++,t==2?e+i.substring(1):t==1?e+i:e+"/"+i}function Te(e){let i=e.match(/#|\?|$/),t=i&&i.index||e.length,n=t-(e[t-1]==="/"?1:0);return e.slice(0,n)+e.slice(t)}function L(e){return e&&e[0]!=="?"?"?"+e:e}var te=(()=>{class e{historyGo(t){throw new Error("")}static \u0275fac=function(n){return new(n||e)};static \u0275prov=I({token:e,factory:()=>P(Qe),providedIn:"root"})}return e})(),Ge=new k(""),Qe=(()=>{class e extends te{_platformLocation;_baseHref;_removeListenerFns=[];constructor(t,n){super(),this._platformLocation=t,this._baseHref=n??this._platformLocation.getBaseHrefFromDOM()??P(me).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(t){this._removeListenerFns.push(this._platformLocation.onPopState(t),this._platformLocation.onHashChange(t))}getBaseHref(){return this._baseHref}prepareExternalUrl(t){return Fe(this._baseHref,t)}path(t=!1){let n=this._platformLocation.pathname+L(this._platformLocation.search),r=this._platformLocation.hash;return r&&t?`${n}${r}`:n}pushState(t,n,r,s){let o=this.prepareExternalUrl(r+L(s));this._platformLocation.pushState(t,n,o)}replaceState(t,n,r,s){let o=this.prepareExternalUrl(r+L(s));this._platformLocation.replaceState(t,n,o)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(t=0){this._platformLocation.historyGo?.(t)}static \u0275fac=function(n){return new(n||e)(R(Ce),R(Ge,8))};static \u0275prov=I({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Rn=(()=>{class e extends te{_platformLocation;_baseHref="";_removeListenerFns=[];constructor(t,n){super(),this._platformLocation=t,n!=null&&(this._baseHref=n)}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(t){this._removeListenerFns.push(this._platformLocation.onPopState(t),this._platformLocation.onHashChange(t))}getBaseHref(){return this._baseHref}path(t=!1){let n=this._platformLocation.hash??"#";return n.length>0?n.substring(1):n}prepareExternalUrl(t){let n=Fe(this._baseHref,t);return n.length>0?"#"+n:n}pushState(t,n,r,s){let o=this.prepareExternalUrl(r+L(s));o.length==0&&(o=this._platformLocation.pathname),this._platformLocation.pushState(t,n,o)}replaceState(t,n,r,s){let o=this.prepareExternalUrl(r+L(s));o.length==0&&(o=this._platformLocation.pathname),this._platformLocation.replaceState(t,n,o)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(t=0){this._platformLocation.historyGo?.(t)}static \u0275fac=function(n){return new(n||e)(R(Ce),R(Ge,8))};static \u0275prov=I({token:e,factory:e.\u0275fac})}return e})(),et=(()=>{class e{_subject=new we;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(t){this._locationStrategy=t;let n=this._locationStrategy.getBaseHref();this._basePath=it(Te(Pe(n))),this._locationStrategy.onPopState(r=>{this._subject.next({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(t=!1){return this.normalize(this._locationStrategy.path(t))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(t,n=""){return this.path()==this.normalize(t+L(n))}normalize(t){return e.stripTrailingSlash(nt(this._basePath,Pe(t)))}prepareExternalUrl(t){return t&&t[0]!=="/"&&(t="/"+t),this._locationStrategy.prepareExternalUrl(t)}go(t,n="",r=null){this._locationStrategy.pushState(r,"",t,n),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+L(n)),r)}replaceState(t,n="",r=null){this._locationStrategy.replaceState(r,"",t,n),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+L(n)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(t=0){this._locationStrategy.historyGo?.(t)}onUrlChange(t){return this._urlChangeListeners.push(t),this._urlChangeSubscription??=this.subscribe(n=>{this._notifyUrlChangeListeners(n.url,n.state)}),()=>{let n=this._urlChangeListeners.indexOf(t);this._urlChangeListeners.splice(n,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(t="",n){this._urlChangeListeners.forEach(r=>r(t,n))}subscribe(t,n,r){return this._subject.subscribe({next:t,error:n??void 0,complete:r??void 0})}static normalizeQueryParams=L;static joinWithSlash=Fe;static stripTrailingSlash=Te;static \u0275fac=function(n){return new(n||e)(R(te))};static \u0275prov=I({token:e,factory:()=>tt(),providedIn:"root"})}return e})();function tt(){return new et(R(te))}function nt(e,i){if(!e||!i.startsWith(e))return i;let t=i.substring(e.length);return t===""||["/",";","?","#"].includes(t[0])?t:i}function Pe(e){return e.replace(/\/index.html$/,"")}function it(e){if(new RegExp("^(https?:)?//").test(e)){let[,t]=e.split(/\/\/[^\/]+/);return t}return e}var He={ADP:[void 0,void 0,0],AFN:[void 0,"\u060B",0],ALL:[void 0,void 0,0],AMD:[void 0,"\u058F",2],AOA:[void 0,"Kz"],ARS:[void 0,"$"],AUD:["A$","$"],AZN:[void 0,"\u20BC"],BAM:[void 0,"KM"],BBD:[void 0,"$"],BDT:[void 0,"\u09F3"],BHD:[void 0,void 0,3],BIF:[void 0,void 0,0],BMD:[void 0,"$"],BND:[void 0,"$"],BOB:[void 0,"Bs"],BRL:["R$"],BSD:[void 0,"$"],BWP:[void 0,"P"],BYN:[void 0,void 0,2],BYR:[void 0,void 0,0],BZD:[void 0,"$"],CAD:["CA$","$",2],CHF:[void 0,void 0,2],CLF:[void 0,void 0,4],CLP:[void 0,"$",0],CNY:["CN\xA5","\xA5"],COP:[void 0,"$",2],CRC:[void 0,"\u20A1",2],CUC:[void 0,"$"],CUP:[void 0,"$"],CZK:[void 0,"K\u010D",2],DJF:[void 0,void 0,0],DKK:[void 0,"kr",2],DOP:[void 0,"$"],EGP:[void 0,"E\xA3"],ESP:[void 0,"\u20A7",0],EUR:["\u20AC"],FJD:[void 0,"$"],FKP:[void 0,"\xA3"],GBP:["\xA3"],GEL:[void 0,"\u20BE"],GHS:[void 0,"GH\u20B5"],GIP:[void 0,"\xA3"],GNF:[void 0,"FG",0],GTQ:[void 0,"Q"],GYD:[void 0,"$",2],HKD:["HK$","$"],HNL:[void 0,"L"],HRK:[void 0,"kn"],HUF:[void 0,"Ft",2],IDR:[void 0,"Rp",2],ILS:["\u20AA"],INR:["\u20B9"],IQD:[void 0,void 0,0],IRR:[void 0,void 0,0],ISK:[void 0,"kr",0],ITL:[void 0,void 0,0],JMD:[void 0,"$"],JOD:[void 0,void 0,3],JPY:["\xA5",void 0,0],KHR:[void 0,"\u17DB"],KMF:[void 0,"CF",0],KPW:[void 0,"\u20A9",0],KRW:["\u20A9",void 0,0],KWD:[void 0,void 0,3],KYD:[void 0,"$"],KZT:[void 0,"\u20B8"],LAK:[void 0,"\u20AD",0],LBP:[void 0,"L\xA3",0],LKR:[void 0,"Rs"],LRD:[void 0,"$"],LTL:[void 0,"Lt"],LUF:[void 0,void 0,0],LVL:[void 0,"Ls"],LYD:[void 0,void 0,3],MGA:[void 0,"Ar",0],MGF:[void 0,void 0,0],MMK:[void 0,"K",0],MNT:[void 0,"\u20AE",2],MRO:[void 0,void 0,0],MUR:[void 0,"Rs",2],MXN:["MX$","$"],MYR:[void 0,"RM"],NAD:[void 0,"$"],NGN:[void 0,"\u20A6"],NIO:[void 0,"C$"],NOK:[void 0,"kr",2],NPR:[void 0,"Rs"],NZD:["NZ$","$"],OMR:[void 0,void 0,3],PHP:["\u20B1"],PKR:[void 0,"Rs",2],PLN:[void 0,"z\u0142"],PYG:[void 0,"\u20B2",0],RON:[void 0,"lei"],RSD:[void 0,void 0,0],RUB:[void 0,"\u20BD"],RWF:[void 0,"RF",0],SBD:[void 0,"$"],SEK:[void 0,"kr",2],SGD:[void 0,"$"],SHP:[void 0,"\xA3"],SLE:[void 0,void 0,2],SLL:[void 0,void 0,0],SOS:[void 0,void 0,0],SRD:[void 0,"$"],SSP:[void 0,"\xA3"],STD:[void 0,void 0,0],STN:[void 0,"Db"],SYP:[void 0,"\xA3",0],THB:[void 0,"\u0E3F"],TMM:[void 0,void 0,0],TND:[void 0,void 0,3],TOP:[void 0,"T$"],TRL:[void 0,void 0,0],TRY:[void 0,"\u20BA"],TTD:[void 0,"$"],TWD:["NT$","$",2],TZS:[void 0,void 0,2],UAH:[void 0,"\u20B4"],UGX:[void 0,void 0,0],USD:["$"],UYI:[void 0,void 0,0],UYU:[void 0,"$"],UYW:[void 0,void 0,4],UZS:[void 0,void 0,2],VEF:[void 0,"Bs",2],VND:["\u20AB",void 0,0],VUV:[void 0,void 0,0],XAF:["FCFA",void 0,0],XCD:["EC$","$"],XOF:["F\u202FCFA",void 0,0],XPF:["CFPF",void 0,0],XXX:["\xA4"],YER:[void 0,void 0,0],ZAR:[void 0,"R"],ZMK:[void 0,void 0,0],ZMW:[void 0,"ZK"],ZWD:[void 0,void 0,0]},Ye=function(e){return e[e.Decimal=0]="Decimal",e[e.Percent=1]="Percent",e[e.Currency=2]="Currency",e[e.Scientific=3]="Scientific",e}(Ye||{});var w=function(e){return e[e.Format=0]="Format",e[e.Standalone=1]="Standalone",e}(w||{}),l=function(e){return e[e.Narrow=0]="Narrow",e[e.Abbreviated=1]="Abbreviated",e[e.Wide=2]="Wide",e[e.Short=3]="Short",e}(l||{}),S=function(e){return e[e.Short=0]="Short",e[e.Medium=1]="Medium",e[e.Long=2]="Long",e[e.Full=3]="Full",e}(S||{}),_={Decimal:0,Group:1,List:2,PercentSign:3,PlusSign:4,MinusSign:5,Exponential:6,SuperscriptingExponent:7,PerMille:8,Infinity:9,NaN:10,TimeSeparator:11,CurrencyDecimal:12,CurrencyGroup:13};function rt(e){return A(e)[m.LocaleId]}function st(e,i,t){let n=A(e),r=[n[m.DayPeriodsFormat],n[m.DayPeriodsStandalone]],s=b(r,i);return b(s,t)}function ot(e,i,t){let n=A(e),r=[n[m.DaysFormat],n[m.DaysStandalone]],s=b(r,i);return b(s,t)}function ut(e,i,t){let n=A(e),r=[n[m.MonthsFormat],n[m.MonthsStandalone]],s=b(r,i);return b(s,t)}function at(e,i){let n=A(e)[m.Eras];return b(n,i)}function H(e,i){let t=A(e);return b(t[m.DateFormat],i)}function Y(e,i){let t=A(e);return b(t[m.TimeFormat],i)}function Z(e,i){let n=A(e)[m.DateTimeFormat];return b(n,i)}function B(e,i){let t=A(e),n=t[m.NumberSymbols][i];if(typeof n>"u"){if(i===_.CurrencyDecimal)return t[m.NumberSymbols][_.Decimal];if(i===_.CurrencyGroup)return t[m.NumberSymbols][_.Group]}return n}function ct(e,i){return A(e)[m.NumberFormats][i]}function dt(e){return A(e)[m.Currencies]}function Ze(e){if(!e[m.ExtraData])throw new Error(`Missing extra locale data for the locale "${e[m.LocaleId]}". Use "registerLocaleData" to load new data. See the "I18n guide" on angular.io to know more.`)}function lt(e){let i=A(e);return Ze(i),(i[m.ExtraData][2]||[]).map(n=>typeof n=="string"?ue(n):[ue(n[0]),ue(n[1])])}function ft(e,i,t){let n=A(e);Ze(n);let r=[n[m.ExtraData][0],n[m.ExtraData][1]],s=b(r,i)||[];return b(s,t)||[]}function b(e,i){for(let t=i;t>-1;t--)if(typeof e[t]<"u")return e[t];throw new Error("Locale data API: locale data undefined")}function ue(e){let[i,t]=e.split(":");return{hours:+i,minutes:+t}}function ht(e,i,t="en"){let n=dt(t)[e]||He[e]||[],r=n[1];return i==="narrow"&&typeof r=="string"?r:n[0]||e}var gt=2;function Dt(e){let i,t=He[e];return t&&(i=t[2]),typeof i=="number"?i:gt}var pt=/^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,W={},mt=/((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/,O=function(e){return e[e.Short=0]="Short",e[e.ShortGMT=1]="ShortGMT",e[e.Long=2]="Long",e[e.Extended=3]="Extended",e}(O||{}),d=function(e){return e[e.FullYear=0]="FullYear",e[e.Month=1]="Month",e[e.Date=2]="Date",e[e.Hours=3]="Hours",e[e.Minutes=4]="Minutes",e[e.Seconds=5]="Seconds",e[e.FractionalSeconds=6]="FractionalSeconds",e[e.Day=7]="Day",e}(d||{}),c=function(e){return e[e.DayPeriods=0]="DayPeriods",e[e.Days=1]="Days",e[e.Months=2]="Months",e[e.Eras=3]="Eras",e}(c||{});function Ct(e,i,t,n){let r=vt(e);i=M(t,i)||i;let o=[],u;for(;i;)if(u=mt.exec(i),u){o=o.concat(u.slice(1));let D=o.pop();if(!D)break;i=D}else{o.push(i);break}let h=r.getTimezoneOffset();n&&(h=Ke(n,h),r=bt(r,n,!0));let g="";return o.forEach(D=>{let a=St(D);g+=a?a(r,t,h):D==="''"?"'":D.replace(/(^'|'$)/g,"").replace(/''/g,"'")}),g}function Q(e,i,t){let n=new Date(0);return n.setFullYear(e,i,t),n.setHours(0,0,0),n}function M(e,i){let t=rt(e);if(W[t]??={},W[t][i])return W[t][i];let n="";switch(i){case"shortDate":n=H(e,S.Short);break;case"mediumDate":n=H(e,S.Medium);break;case"longDate":n=H(e,S.Long);break;case"fullDate":n=H(e,S.Full);break;case"shortTime":n=Y(e,S.Short);break;case"mediumTime":n=Y(e,S.Medium);break;case"longTime":n=Y(e,S.Long);break;case"fullTime":n=Y(e,S.Full);break;case"short":let r=M(e,"shortTime"),s=M(e,"shortDate");n=K(Z(e,S.Short),[r,s]);break;case"medium":let o=M(e,"mediumTime"),u=M(e,"mediumDate");n=K(Z(e,S.Medium),[o,u]);break;case"long":let h=M(e,"longTime"),g=M(e,"longDate");n=K(Z(e,S.Long),[h,g]);break;case"full":let D=M(e,"fullTime"),a=M(e,"fullDate");n=K(Z(e,S.Full),[D,a]);break}return n&&(W[t][i]=n),n}function K(e,i){return i&&(e=e.replace(/\{([^}]+)}/g,function(t,n){return i!=null&&n in i?i[n]:t})),e}function v(e,i,t="-",n,r){let s="";(e<0||r&&e<=0)&&(r?e=-e+1:(e=-e,s=t));let o=String(e);for(;o.length<i;)o="0"+o;return n&&(o=o.slice(o.length-i)),s+o}function Ft(e,i){return v(e,3).substring(0,i)}function C(e,i,t=0,n=!1,r=!1){return function(s,o){let u=Et(e,s);if((t>0||u>-t)&&(u+=t),e===d.Hours)u===0&&t===-12&&(u=12);else if(e===d.FractionalSeconds)return Ft(u,i);let h=B(o,_.MinusSign);return v(u,i,h,n,r)}}function Et(e,i){switch(e){case d.FullYear:return i.getFullYear();case d.Month:return i.getMonth();case d.Date:return i.getDate();case d.Hours:return i.getHours();case d.Minutes:return i.getMinutes();case d.Seconds:return i.getSeconds();case d.FractionalSeconds:return i.getMilliseconds();case d.Day:return i.getDay();default:throw new Error(`Unknown DateType value "${e}".`)}}function f(e,i,t=w.Format,n=!1){return function(r,s){return yt(r,s,e,i,t,n)}}function yt(e,i,t,n,r,s){switch(t){case c.Months:return ut(i,r,n)[e.getMonth()];case c.Days:return ot(i,r,n)[e.getDay()];case c.DayPeriods:let o=e.getHours(),u=e.getMinutes();if(s){let g=lt(i),D=ft(i,r,n),a=g.findIndex(E=>{if(Array.isArray(E)){let[p,y]=E,x=o>=p.hours&&u>=p.minutes,T=o<y.hours||o===y.hours&&u<y.minutes;if(p.hours<y.hours){if(x&&T)return!0}else if(x||T)return!0}else if(E.hours===o&&E.minutes===u)return!0;return!1});if(a!==-1)return D[a]}return st(i,r,n)[o<12?0:1];case c.Eras:return at(i,n)[e.getFullYear()<=0?0:1];default:let h=t;throw new Error(`unexpected translation type ${h}`)}}function X(e){return function(i,t,n){let r=-1*n,s=B(t,_.MinusSign),o=r>0?Math.floor(r/60):Math.ceil(r/60);switch(e){case O.Short:return(r>=0?"+":"")+v(o,2,s)+v(Math.abs(r%60),2,s);case O.ShortGMT:return"GMT"+(r>=0?"+":"")+v(o,1,s);case O.Long:return"GMT"+(r>=0?"+":"")+v(o,2,s)+":"+v(Math.abs(r%60),2,s);case O.Extended:return n===0?"Z":(r>=0?"+":"")+v(o,2,s)+":"+v(Math.abs(r%60),2,s);default:throw new Error(`Unknown zone width "${e}"`)}}}var wt=0,J=4;function At(e){let i=Q(e,wt,1).getDay();return Q(e,0,1+(i<=J?J:J+7)-i)}function We(e){let i=e.getDay(),t=i===0?-3:J-i;return Q(e.getFullYear(),e.getMonth(),e.getDate()+t)}function ae(e,i=!1){return function(t,n){let r;if(i){let s=new Date(t.getFullYear(),t.getMonth(),1).getDay()-1,o=t.getDate();r=1+Math.floor((o+s)/7)}else{let s=We(t),o=At(s.getFullYear()),u=s.getTime()-o.getTime();r=1+Math.round(u/6048e5)}return v(r,e,B(n,_.MinusSign))}}function q(e,i=!1){return function(t,n){let s=We(t).getFullYear();return v(s,e,B(n,_.MinusSign),i)}}var ce={};function St(e){if(ce[e])return ce[e];let i;switch(e){case"G":case"GG":case"GGG":i=f(c.Eras,l.Abbreviated);break;case"GGGG":i=f(c.Eras,l.Wide);break;case"GGGGG":i=f(c.Eras,l.Narrow);break;case"y":i=C(d.FullYear,1,0,!1,!0);break;case"yy":i=C(d.FullYear,2,0,!0,!0);break;case"yyy":i=C(d.FullYear,3,0,!1,!0);break;case"yyyy":i=C(d.FullYear,4,0,!1,!0);break;case"Y":i=q(1);break;case"YY":i=q(2,!0);break;case"YYY":i=q(3);break;case"YYYY":i=q(4);break;case"M":case"L":i=C(d.Month,1,1);break;case"MM":case"LL":i=C(d.Month,2,1);break;case"MMM":i=f(c.Months,l.Abbreviated);break;case"MMMM":i=f(c.Months,l.Wide);break;case"MMMMM":i=f(c.Months,l.Narrow);break;case"LLL":i=f(c.Months,l.Abbreviated,w.Standalone);break;case"LLLL":i=f(c.Months,l.Wide,w.Standalone);break;case"LLLLL":i=f(c.Months,l.Narrow,w.Standalone);break;case"w":i=ae(1);break;case"ww":i=ae(2);break;case"W":i=ae(1,!0);break;case"d":i=C(d.Date,1);break;case"dd":i=C(d.Date,2);break;case"c":case"cc":i=C(d.Day,1);break;case"ccc":i=f(c.Days,l.Abbreviated,w.Standalone);break;case"cccc":i=f(c.Days,l.Wide,w.Standalone);break;case"ccccc":i=f(c.Days,l.Narrow,w.Standalone);break;case"cccccc":i=f(c.Days,l.Short,w.Standalone);break;case"E":case"EE":case"EEE":i=f(c.Days,l.Abbreviated);break;case"EEEE":i=f(c.Days,l.Wide);break;case"EEEEE":i=f(c.Days,l.Narrow);break;case"EEEEEE":i=f(c.Days,l.Short);break;case"a":case"aa":case"aaa":i=f(c.DayPeriods,l.Abbreviated);break;case"aaaa":i=f(c.DayPeriods,l.Wide);break;case"aaaaa":i=f(c.DayPeriods,l.Narrow);break;case"b":case"bb":case"bbb":i=f(c.DayPeriods,l.Abbreviated,w.Standalone,!0);break;case"bbbb":i=f(c.DayPeriods,l.Wide,w.Standalone,!0);break;case"bbbbb":i=f(c.DayPeriods,l.Narrow,w.Standalone,!0);break;case"B":case"BB":case"BBB":i=f(c.DayPeriods,l.Abbreviated,w.Format,!0);break;case"BBBB":i=f(c.DayPeriods,l.Wide,w.Format,!0);break;case"BBBBB":i=f(c.DayPeriods,l.Narrow,w.Format,!0);break;case"h":i=C(d.Hours,1,-12);break;case"hh":i=C(d.Hours,2,-12);break;case"H":i=C(d.Hours,1);break;case"HH":i=C(d.Hours,2);break;case"m":i=C(d.Minutes,1);break;case"mm":i=C(d.Minutes,2);break;case"s":i=C(d.Seconds,1);break;case"ss":i=C(d.Seconds,2);break;case"S":i=C(d.FractionalSeconds,1);break;case"SS":i=C(d.FractionalSeconds,2);break;case"SSS":i=C(d.FractionalSeconds,3);break;case"Z":case"ZZ":case"ZZZ":i=X(O.Short);break;case"ZZZZZ":i=X(O.Extended);break;case"O":case"OO":case"OOO":case"z":case"zz":case"zzz":i=X(O.ShortGMT);break;case"OOOO":case"ZZZZ":case"zzzz":i=X(O.Long);break;default:return null}return ce[e]=i,i}function Ke(e,i){e=e.replace(/:/g,"");let t=Date.parse("Jan 01, 1970 00:00:00 "+e)/6e4;return isNaN(t)?i:t}function _t(e,i){return e=new Date(e.getTime()),e.setMinutes(e.getMinutes()+i),e}function bt(e,i,t){let n=t?-1:1,r=e.getTimezoneOffset(),s=Ke(i,r);return _t(e,n*(s-r))}function vt(e){if(Ne(e))return e;if(typeof e=="number"&&!isNaN(e))return new Date(e);if(typeof e=="string"){if(e=e.trim(),/^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(e)){let[r,s=1,o=1]=e.split("-").map(u=>+u);return Q(r,s-1,o)}let t=parseFloat(e);if(!isNaN(e-t))return new Date(t);let n;if(n=e.match(pt))return It(n)}let i=new Date(e);if(!Ne(i))throw new Error(`Unable to convert "${e}" into a date`);return i}function It(e){let i=new Date(0),t=0,n=0,r=e[8]?i.setUTCFullYear:i.setFullYear,s=e[8]?i.setUTCHours:i.setHours;e[9]&&(t=Number(e[9]+e[10]),n=Number(e[9]+e[11])),r.call(i,Number(e[1]),Number(e[2])-1,Number(e[3]));let o=Number(e[4]||0)-t,u=Number(e[5]||0)-n,h=Number(e[6]||0),g=Math.floor(parseFloat("0."+(e[7]||0))*1e3);return s.call(i,o,u,h,g),i}function Ne(e){return e instanceof Date&&!isNaN(e.valueOf())}var Mt=/^(\d+)?\.((\d+)(-(\d+))?)?$/,ke=22,ee=".",U="0",Lt=";",Bt=",",de="#",$e="\xA4";function Ot(e,i,t,n,r,s,o=!1){let u="",h=!1;if(!isFinite(e))u=B(t,_.Infinity);else{let g=Nt(e);o&&(g=Pt(g));let D=i.minInt,a=i.minFrac,E=i.maxFrac;if(s){let N=s.match(Mt);if(N===null)throw new Error(`${s} is not a valid digit info`);let Ee=N[1],ne=N[3],ye=N[5];Ee!=null&&(D=le(Ee)),ne!=null&&(a=le(ne)),ye!=null?E=le(ye):ne!=null&&a>E&&(E=a)}kt(g,a,E);let p=g.digits,y=g.integerLen,x=g.exponent,T=[];for(h=p.every(N=>!N);y<D;y++)p.unshift(0);for(;y<0;y++)p.unshift(0);y>0?T=p.splice(y,p.length):(T=p,p=[0]);let z=[];for(p.length>=i.lgSize&&z.unshift(p.splice(-i.lgSize,p.length).join(""));p.length>i.gSize;)z.unshift(p.splice(-i.gSize,p.length).join(""));p.length&&z.unshift(p.join("")),u=z.join(B(t,n)),T.length&&(u+=B(t,r)+T.join("")),x&&(u+=B(t,_.Exponential)+"+"+x)}return e<0&&!h?u=i.negPre+u+i.negSuf:u=i.posPre+u+i.posSuf,u}function Rt(e,i,t,n,r){let s=ct(i,Ye.Currency),o=Tt(s,B(i,_.MinusSign));return o.minFrac=Dt(n),o.maxFrac=o.minFrac,Ot(e,o,i,_.CurrencyGroup,_.CurrencyDecimal,r).replace($e,t).replace($e,"").trim()}function Tt(e,i="-"){let t={minInt:1,minFrac:0,maxFrac:0,posPre:"",posSuf:"",negPre:"",negSuf:"",gSize:0,lgSize:0},n=e.split(Lt),r=n[0],s=n[1],o=r.indexOf(ee)!==-1?r.split(ee):[r.substring(0,r.lastIndexOf(U)+1),r.substring(r.lastIndexOf(U)+1)],u=o[0],h=o[1]||"";t.posPre=u.substring(0,u.indexOf(de));for(let D=0;D<h.length;D++){let a=h.charAt(D);a===U?t.minFrac=t.maxFrac=D+1:a===de?t.maxFrac=D+1:t.posSuf+=a}let g=u.split(Bt);if(t.gSize=g[1]?g[1].length:0,t.lgSize=g[2]||g[1]?(g[2]||g[1]).length:0,s){let D=r.length-t.posPre.length-t.posSuf.length,a=s.indexOf(de);t.negPre=s.substring(0,a).replace(/'/g,""),t.negSuf=s.slice(a+D).replace(/'/g,"")}else t.negPre=i+t.posPre,t.negSuf=t.posSuf;return t}function Pt(e){if(e.digits[0]===0)return e;let i=e.digits.length-e.integerLen;return e.exponent?e.exponent+=2:(i===0?e.digits.push(0,0):i===1&&e.digits.push(0),e.integerLen+=2),e}function Nt(e){let i=Math.abs(e)+"",t=0,n,r,s,o,u;for((r=i.indexOf(ee))>-1&&(i=i.replace(ee,"")),(s=i.search(/e/i))>0?(r<0&&(r=s),r+=+i.slice(s+1),i=i.substring(0,s)):r<0&&(r=i.length),s=0;i.charAt(s)===U;s++);if(s===(u=i.length))n=[0],r=1;else{for(u--;i.charAt(u)===U;)u--;for(r-=s,n=[],o=0;s<=u;s++,o++)n[o]=Number(i.charAt(s))}return r>ke&&(n=n.splice(0,ke-1),t=r-1,r=1),{digits:n,exponent:t,integerLen:r}}function kt(e,i,t){if(i>t)throw new Error(`The minimum number of digits after fraction (${i}) is higher than the maximum (${t}).`);let n=e.digits,r=n.length-e.integerLen,s=Math.min(Math.max(i,r),t),o=s+e.integerLen,u=n[o];if(o>0){n.splice(Math.max(e.integerLen,o));for(let a=o;a<n.length;a++)n[a]=0}else{r=Math.max(0,r),e.integerLen=1,n.length=Math.max(1,o=s+1),n[0]=0;for(let a=1;a<o;a++)n[a]=0}if(u>=5)if(o-1<0){for(let a=0;a>o;a--)n.unshift(0),e.integerLen++;n.unshift(1),e.integerLen++}else n[o-1]++;for(;r<Math.max(0,s);r++)n.push(0);let h=s!==0,g=i+e.integerLen,D=n.reduceRight(function(a,E,p,y){return E=E+a,y[p]=E<10?E:E-10,h&&(y[p]===0&&p>=g?y.pop():h=!1),E>=10?1:0},0);D&&(n.unshift(D),e.integerLen++)}function le(e){let i=parseInt(e);if(isNaN(i))throw new Error("Invalid integer literal when parsing "+e);return i}function Tn(e,i){i=encodeURIComponent(i);for(let t of e.split(";")){let n=t.indexOf("="),[r,s]=n==-1?[t,""]:[t.slice(0,n),t.slice(n+1)];if(r.trim()===i)return decodeURIComponent(s)}return null}var fe=/\s+/,xe=[],Pn=(()=>{class e{_ngEl;_renderer;initialClasses=xe;rawClass;stateMap=new Map;constructor(t,n){this._ngEl=t,this._renderer=n}set klass(t){this.initialClasses=t!=null?t.trim().split(fe):xe}set ngClass(t){this.rawClass=typeof t=="string"?t.trim().split(fe):t}ngDoCheck(){for(let n of this.initialClasses)this._updateState(n,!0);let t=this.rawClass;if(Array.isArray(t)||t instanceof Set)for(let n of t)this._updateState(n,!0);else if(t!=null)for(let n of Object.keys(t))this._updateState(n,!!t[n]);this._applyStateDiff()}_updateState(t,n){let r=this.stateMap.get(t);r!==void 0?(r.enabled!==n&&(r.changed=!0,r.enabled=n),r.touched=!0):this.stateMap.set(t,{enabled:n,changed:!0,touched:!0})}_applyStateDiff(){for(let t of this.stateMap){let n=t[0],r=t[1];r.changed?(this._toggleClass(n,r.enabled),r.changed=!1):r.touched||(r.enabled&&this._toggleClass(n,!1),this.stateMap.delete(n)),r.touched=!1}}_toggleClass(t,n){t=t.trim(),t.length>0&&t.split(fe).forEach(r=>{n?this._renderer.addClass(this._ngEl.nativeElement,r):this._renderer.removeClass(this._ngEl.nativeElement,r)})}static \u0275fac=function(n){return new(n||e)(F(V),F(j))};static \u0275dir=$({type:e,selectors:[["","ngClass",""]],inputs:{klass:[0,"class","klass"],ngClass:"ngClass"}})}return e})();var he=class{$implicit;ngForOf;index;count;constructor(i,t,n,r){this.$implicit=i,this.ngForOf=t,this.index=n,this.count=r}get first(){return this.index===0}get last(){return this.index===this.count-1}get even(){return this.index%2===0}get odd(){return!this.even}},Nn=(()=>{class e{_viewContainer;_template;_differs;set ngForOf(t){this._ngForOf=t,this._ngForOfDirty=!0}set ngForTrackBy(t){this._trackByFn=t}get ngForTrackBy(){return this._trackByFn}_ngForOf=null;_ngForOfDirty=!0;_differ=null;_trackByFn;constructor(t,n,r){this._viewContainer=t,this._template=n,this._differs=r}set ngForTemplate(t){t&&(this._template=t)}ngDoCheck(){if(this._ngForOfDirty){this._ngForOfDirty=!1;let t=this._ngForOf;if(!this._differ&&t)if(0)try{}catch{}else this._differ=this._differs.find(t).create(this.ngForTrackBy)}if(this._differ){let t=this._differ.diff(this._ngForOf);t&&this._applyChanges(t)}}_applyChanges(t){let n=this._viewContainer;t.forEachOperation((r,s,o)=>{if(r.previousIndex==null)n.createEmbeddedView(this._template,new he(r.item,this._ngForOf,-1,-1),o===null?void 0:o);else if(o==null)n.remove(s===null?void 0:s);else if(s!==null){let u=n.get(s);n.move(u,o),Ue(u,r)}});for(let r=0,s=n.length;r<s;r++){let u=n.get(r).context;u.index=r,u.count=s,u.ngForOf=this._ngForOf}t.forEachIdentityChange(r=>{let s=n.get(r.currentIndex);Ue(s,r)})}static ngTemplateContextGuard(t,n){return!0}static \u0275fac=function(n){return new(n||e)(F(G),F(ie),F(Be))};static \u0275dir=$({type:e,selectors:[["","ngFor","","ngForOf",""]],inputs:{ngForOf:"ngForOf",ngForTrackBy:"ngForTrackBy",ngForTemplate:"ngForTemplate"}})}return e})();function Ue(e,i){e.context.$implicit=i.item}var kn=(()=>{class e{_viewContainer;_context=new ge;_thenTemplateRef=null;_elseTemplateRef=null;_thenViewRef=null;_elseViewRef=null;constructor(t,n){this._viewContainer=t,this._thenTemplateRef=n}set ngIf(t){this._context.$implicit=this._context.ngIf=t,this._updateView()}set ngIfThen(t){ze("ngIfThen",t),this._thenTemplateRef=t,this._thenViewRef=null,this._updateView()}set ngIfElse(t){ze("ngIfElse",t),this._elseTemplateRef=t,this._elseViewRef=null,this._updateView()}_updateView(){this._context.$implicit?this._thenViewRef||(this._viewContainer.clear(),this._elseViewRef=null,this._thenTemplateRef&&(this._thenViewRef=this._viewContainer.createEmbeddedView(this._thenTemplateRef,this._context))):this._elseViewRef||(this._viewContainer.clear(),this._thenViewRef=null,this._elseTemplateRef&&(this._elseViewRef=this._viewContainer.createEmbeddedView(this._elseTemplateRef,this._context)))}static ngIfUseIfTypeGuard;static ngTemplateGuard_ngIf;static ngTemplateContextGuard(t,n){return!0}static \u0275fac=function(n){return new(n||e)(F(G),F(ie))};static \u0275dir=$({type:e,selectors:[["","ngIf",""]],inputs:{ngIf:"ngIf",ngIfThen:"ngIfThen",ngIfElse:"ngIfElse"}})}return e})(),ge=class{$implicit=null;ngIf=null};function ze(e,i){if(!!!(!i||i.createEmbeddedView))throw new Error(`${e} must be a TemplateRef, but received '${Se(i)}'.`)}var $n=(()=>{class e{_ngEl;_differs;_renderer;_ngStyle=null;_differ=null;constructor(t,n,r){this._ngEl=t,this._differs=n,this._renderer=r}set ngStyle(t){this._ngStyle=t,!this._differ&&t&&(this._differ=this._differs.find(t).create())}ngDoCheck(){if(this._differ){let t=this._differ.diff(this._ngStyle);t&&this._applyChanges(t)}}_setStyle(t,n){let[r,s]=t.split("."),o=r.indexOf("-")===-1?void 0:Ie.DashCase;n!=null?this._renderer.setStyle(this._ngEl.nativeElement,r,s?`${n}${s}`:n,o):this._renderer.removeStyle(this._ngEl.nativeElement,r,o)}_applyChanges(t){t.forEachRemovedItem(n=>this._setStyle(n.key,null)),t.forEachAddedItem(n=>this._setStyle(n.key,n.currentValue)),t.forEachChangedItem(n=>this._setStyle(n.key,n.currentValue))}static \u0275fac=function(n){return new(n||e)(F(V),F(Oe),F(j))};static \u0275dir=$({type:e,selectors:[["","ngStyle",""]],inputs:{ngStyle:"ngStyle"}})}return e})(),xn=(()=>{class e{_viewContainerRef;_viewRef=null;ngTemplateOutletContext=null;ngTemplateOutlet=null;ngTemplateOutletInjector=null;constructor(t){this._viewContainerRef=t}ngOnChanges(t){if(this._shouldRecreateView(t)){let n=this._viewContainerRef;if(this._viewRef&&n.remove(n.indexOf(this._viewRef)),!this.ngTemplateOutlet){this._viewRef=null;return}let r=this._createContextForwardProxy();this._viewRef=n.createEmbeddedView(this.ngTemplateOutlet,r,{injector:this.ngTemplateOutletInjector??void 0})}}_shouldRecreateView(t){return!!t.ngTemplateOutlet||!!t.ngTemplateOutletInjector}_createContextForwardProxy(){return new Proxy({},{set:(t,n,r)=>this.ngTemplateOutletContext?Reflect.set(this.ngTemplateOutletContext,n,r):!1,get:(t,n,r)=>{if(this.ngTemplateOutletContext)return Reflect.get(this.ngTemplateOutletContext,n,r)}})}static \u0275fac=function(n){return new(n||e)(F(G))};static \u0275dir=$({type:e,selectors:[["","ngTemplateOutlet",""]],inputs:{ngTemplateOutletContext:"ngTemplateOutletContext",ngTemplateOutlet:"ngTemplateOutlet",ngTemplateOutletInjector:"ngTemplateOutletInjector"},features:[be]})}return e})();function Xe(e,i){return new Ae(2100,!1)}var $t="mediumDate",xt=new k(""),Ut=new k(""),Un=(()=>{class e{locale;defaultTimezone;defaultOptions;constructor(t,n,r){this.locale=t,this.defaultTimezone=n,this.defaultOptions=r}transform(t,n,r,s){if(t==null||t===""||t!==t)return null;try{let o=n??this.defaultOptions?.dateFormat??$t,u=r??this.defaultOptions?.timezone??this.defaultTimezone??void 0;return Ct(t,o,s||this.locale,u)}catch(o){throw Xe(e,o.message)}}static \u0275fac=function(n){return new(n||e)(F(se,16),F(xt,24),F(Ut,24))};static \u0275pipe=re({name:"date",type:e,pure:!0})}return e})();var zn=(()=>{class e{_locale;_defaultCurrencyCode;constructor(t,n="USD"){this._locale=t,this._defaultCurrencyCode=n}transform(t,n=this._defaultCurrencyCode,r="symbol",s,o){if(!zt(t))return null;o||=this._locale,typeof r=="boolean"&&(r=r?"symbol":"code");let u=n||this._defaultCurrencyCode;r!=="code"&&(r==="symbol"||r==="symbol-narrow"?u=ht(u,r==="symbol"?"wide":"narrow",o):u=r);try{let h=Vt(t);return Rt(h,o,u,n,s)}catch(h){throw Xe(e,h.message)}}static \u0275fac=function(n){return new(n||e)(F(se,16),F(Le,16))};static \u0275pipe=re({name:"currency",type:e,pure:!0})}return e})();function zt(e){return!(e==null||e===""||e!==e)}function Vt(e){if(typeof e=="string"&&!isNaN(Number(e)-parseFloat(e)))return Number(e);if(typeof e!="number")throw new Error(`${e} is not a number`);return e}var Vn=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=Me({type:e});static \u0275inj=_e({})}return e})(),jt="browser",Gt="server";function Ht(e){return e===jt}function jn(e){return e===Gt}var Gn=(()=>{class e{static \u0275prov=I({token:e,providedIn:"root",factory:()=>Ht(P(ve))?new De(P(me),window):new pe})}return e})(),De=class{document;window;offset=()=>[0,0];constructor(i,t){this.document=i,this.window=t}setOffset(i){Array.isArray(i)?this.offset=()=>i:this.offset=i}getScrollPosition(){return[this.window.scrollX,this.window.scrollY]}scrollToPosition(i){this.window.scrollTo(i[0],i[1])}scrollToAnchor(i){let t=Yt(this.document,i);t&&(this.scrollToElement(t),t.focus())}setHistoryScrollRestoration(i){this.window.history.scrollRestoration=i}scrollToElement(i){let t=i.getBoundingClientRect(),n=t.left+this.window.pageXOffset,r=t.top+this.window.pageYOffset,s=this.offset();this.window.scrollTo(n-s[0],r-s[1])}};function Yt(e,i){let t=e.getElementById(i)||e.getElementsByName(i)[0];if(t)return t;if(typeof e.createTreeWalker=="function"&&e.body&&typeof e.body.attachShadow=="function"){let n=e.createTreeWalker(e.body,NodeFilter.SHOW_ELEMENT),r=n.currentNode;for(;r;){let s=r.shadowRoot;if(s){let o=s.getElementById(i)||s.querySelector(`[name="${i}"]`);if(o)return o}r=n.nextNode()}}return null}var pe=class{setOffset(i){}getScrollPosition(){return[0,0]}scrollToPosition(i){}scrollToAnchor(i){}setHistoryScrollRestoration(i){}},Ve=class{};export{oe as a,Bn as b,Re as c,me as d,On as e,te as f,Qe as g,Rn as h,et as i,Tn as j,Pn as k,Nn as l,kn as m,$n as n,xn as o,Un as p,zn as q,Vn as r,jt as s,Ht as t,jn as u,Gn as v,Ve as w};
