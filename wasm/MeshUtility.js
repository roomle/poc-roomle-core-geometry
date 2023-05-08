
var MeshUtility = (() => {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  
  return (
function(MeshUtility) {
  MeshUtility = MeshUtility || {};


var h;h||(h=typeof MeshUtility !== 'undefined' ? MeshUtility : {});var aa,ba;h.ready=new Promise(function(a,b){aa=a;ba=b});var ca=Object.assign({},h),da="./this.program",r="";"undefined"!=typeof document&&document.currentScript&&(r=document.currentScript.src);_scriptDir&&(r=_scriptDir);0!==r.indexOf("blob:")?r=r.substr(0,r.replace(/[?#].*/,"").lastIndexOf("/")+1):r="";var ea=h.print||console.log.bind(console),u=h.printErr||console.warn.bind(console);Object.assign(h,ca);ca=null;
h.thisProgram&&(da=h.thisProgram);var x=0,fa;h.wasmBinary&&(fa=h.wasmBinary);var noExitRuntime=h.noExitRuntime||!0;"object"!=typeof WebAssembly&&y("no native wasm support detected");var ha,ia=!1,ja="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0;
function ka(a,b,c){var d=b+c;for(c=b;a[c]&&!(c>=d);)++c;if(16<c-b&&a.subarray&&ja)return ja.decode(a.subarray(b,c));for(d="";b<c;){var e=a[b++];if(e&128){var f=a[b++]&63;if(192==(e&224))d+=String.fromCharCode((e&31)<<6|f);else{var l=a[b++]&63;e=224==(e&240)?(e&15)<<12|f<<6|l:(e&7)<<18|f<<12|l<<6|a[b++]&63;65536>e?d+=String.fromCharCode(e):(e-=65536,d+=String.fromCharCode(55296|e>>10,56320|e&1023))}}else d+=String.fromCharCode(e)}return d}
function la(a,b,c,d){if(0<d){d=c+d-1;for(var e=0;e<a.length;++e){var f=a.charCodeAt(e);if(55296<=f&&57343>=f){var l=a.charCodeAt(++e);f=65536+((f&1023)<<10)|l&1023}if(127>=f){if(c>=d)break;b[c++]=f}else{if(2047>=f){if(c+1>=d)break;b[c++]=192|f>>6}else{if(65535>=f){if(c+2>=d)break;b[c++]=224|f>>12}else{if(c+3>=d)break;b[c++]=240|f>>18;b[c++]=128|f>>12&63}b[c++]=128|f>>6&63}b[c++]=128|f&63}}b[c]=0}}
function ma(a){for(var b=0,c=0;c<a.length;++c){var d=a.charCodeAt(c);55296<=d&&57343>=d&&(d=65536+((d&1023)<<10)|a.charCodeAt(++c)&1023);127>=d?++b:b=2047>=d?b+2:65535>=d?b+3:b+4}return b}var na="undefined"!=typeof TextDecoder?new TextDecoder("utf-16le"):void 0;function oa(a,b){var c=a>>1;for(var d=c+b/2;!(c>=d)&&pa[c];)++c;c<<=1;if(32<c-a&&na)return na.decode(z.subarray(a,c));c="";for(d=0;!(d>=b/2);++d){var e=A[a+2*d>>1];if(0==e)break;c+=String.fromCharCode(e)}return c}
function qa(a,b,c){void 0===c&&(c=2147483647);if(2>c)return 0;c-=2;var d=b;c=c<2*a.length?c/2:a.length;for(var e=0;e<c;++e)A[b>>1]=a.charCodeAt(e),b+=2;A[b>>1]=0;return b-d}function ra(a){return 2*a.length}function sa(a,b){for(var c=0,d="";!(c>=b/4);){var e=C[a+4*c>>2];if(0==e)break;++c;65536<=e?(e-=65536,d+=String.fromCharCode(55296|e>>10,56320|e&1023)):d+=String.fromCharCode(e)}return d}
function ta(a,b,c){void 0===c&&(c=2147483647);if(4>c)return 0;var d=b;c=d+c-4;for(var e=0;e<a.length;++e){var f=a.charCodeAt(e);if(55296<=f&&57343>=f){var l=a.charCodeAt(++e);f=65536+((f&1023)<<10)|l&1023}C[b>>2]=f;b+=4;if(b+4>c)break}C[b>>2]=0;return b-d}function ua(a){for(var b=0,c=0;c<a.length;++c){var d=a.charCodeAt(c);55296<=d&&57343>=d&&++c;b+=4}return b}var va,D,z,A,pa,C,E,wa,xa,ya,za=[],Aa=[],Ba=[];function Ca(){var a=h.preRun.shift();za.unshift(a)}var G=0,Da=null,Ea=null;
h.preloadedImages={};h.preloadedAudios={};function y(a){if(h.onAbort)h.onAbort(a);a="Aborted("+a+")";u(a);ia=!0;a=new WebAssembly.RuntimeError(a+". Build with -s ASSERTIONS=1 for more info.");ba(a);throw a;}function Fa(){return H.startsWith("data:application/octet-stream;base64,")}var H;H="MeshUtility.wasm";if(!Fa()){var Ga=H;H=h.locateFile?h.locateFile(Ga,r):r+Ga}
function Ha(){var a=H;try{if(a==H&&fa)return new Uint8Array(fa);throw"both async and sync fetching of the wasm failed";}catch(b){y(b)}}function Ia(){return fa||"function"!=typeof fetch?Promise.resolve().then(function(){return Ha()}):fetch(H,{credentials:"same-origin"}).then(function(a){if(!a.ok)throw"failed to load wasm binary file at '"+H+"'";return a.arrayBuffer()}).catch(function(){return Ha()})}
function Ja(a){for(;0<a.length;){var b=a.shift();if("function"==typeof b)b(h);else{var c=b.$b;"number"==typeof c?void 0===b.mb?I(c)():I(c)(b.mb):c(void 0===b.mb?null:b.mb)}}}function I(a){return ya.get(a)}
function Ka(a){this.vb=a;this.Ja=a-16;this.lb=function(b){C[this.Ja+4>>2]=b};this.ob=function(){return C[this.Ja+4>>2]};this.bb=function(b){C[this.Ja+8>>2]=b};this.Hb=function(){return C[this.Ja+8>>2]};this.cb=function(){C[this.Ja>>2]=0};this.sb=function(b){D[this.Ja+12>>0]=b?1:0};this.Gb=function(){return 0!=D[this.Ja+12>>0]};this.tb=function(b){D[this.Ja+13>>0]=b?1:0};this.xb=function(){return 0!=D[this.Ja+13>>0]};this.Xa=function(b,c){this.lb(b);this.bb(c);this.cb();this.sb(!1);this.tb(!1)};this.Ab=
function(){C[this.Ja>>2]+=1};this.Qb=function(){var b=C[this.Ja>>2];C[this.Ja>>2]=b-1;return 1===b}}
function La(a){this.nb=function(){J(this.Ja);this.Ja=0};this.cb=function(b){C[this.Ja>>2]=b};this.Ya=function(){return C[this.Ja>>2]};this.Xa=function(b){C[this.Ja+4>>2]=b};this.bb=function(){return this.Ja+4};this.lb=function(){return C[this.Ja+4>>2]};this.zb=function(){if(Ma(this.fb().ob()))return C[this.Ya()>>2];var b=this.lb();return 0!==b?b:this.Ya()};this.fb=function(){return new Ka(this.Ya())};void 0===a?(this.Ja=Na(8),this.Xa(0)):this.Ja=a}var Oa=[],Pa=0,K=0;
function Qa(a){try{return J((new Ka(a)).Ja)}catch(b){}}var Ra={};function Sa(a){for(;a.length;){var b=a.pop();a.pop()(b)}}function Ta(a){return this.fromWireType(E[a>>2])}var Ua={},L={},Va={};function Wa(a){if(void 0===a)return"_unknown";a=a.replace(/[^a-zA-Z0-9_]/g,"$");var b=a.charCodeAt(0);return 48<=b&&57>=b?"_"+a:a}function Xa(a,b){a=Wa(a);return(new Function("body","return function "+a+'() {\n    "use strict";    return body.apply(this, arguments);\n};\n'))(b)}
function Ya(a){var b=Error,c=Xa(a,function(d){this.name=a;this.message=d;d=Error(d).stack;void 0!==d&&(this.stack=this.toString()+"\n"+d.replace(/^Error(:[^\n]*)?\n/,""))});c.prototype=Object.create(b.prototype);c.prototype.constructor=c;c.prototype.toString=function(){return void 0===this.message?this.name:this.name+": "+this.message};return c}var Za=void 0;function $a(a){throw new Za(a);}
function M(a,b,c){function d(k){k=c(k);k.length!==a.length&&$a("Mismatched type converter count");for(var m=0;m<a.length;++m)N(a[m],k[m])}a.forEach(function(k){Va[k]=b});var e=Array(b.length),f=[],l=0;b.forEach(function(k,m){L.hasOwnProperty(k)?e[m]=L[k]:(f.push(k),Ua.hasOwnProperty(k)||(Ua[k]=[]),Ua[k].push(function(){e[m]=L[k];++l;l===f.length&&d(e)}))});0===f.length&&d(e)}
function ab(a){switch(a){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+a);}}var bb=void 0;function O(a){for(var b="";z[a];)b+=bb[z[a++]];return b}var cb=void 0;function P(a){throw new cb(a);}
function N(a,b,c={}){if(!("argPackAdvance"in b))throw new TypeError("registerType registeredInstance requires argPackAdvance");var d=b.name;a||P('type "'+d+'" must have a positive integer typeid pointer');if(L.hasOwnProperty(a)){if(c.Lb)return;P("Cannot register type '"+d+"' twice")}L[a]=b;delete Va[a];Ua.hasOwnProperty(a)&&(b=Ua[a],delete Ua[a],b.forEach(function(e){e()}))}function db(a){P(a.Ia.La.Ka.name+" instance already deleted")}var eb=!1;function fb(){}
function gb(a){--a.count.value;0===a.count.value&&(a.Na?a.Pa.Sa(a.Na):a.La.Ka.Sa(a.Ja))}function hb(a,b,c){if(b===c)return a;if(void 0===c.Qa)return null;a=hb(a,b,c.Qa);return null===a?null:c.Cb(a)}var ib={},jb=[];function kb(){for(;jb.length;){var a=jb.pop();a.Ia.Ua=!1;a["delete"]()}}var lb=void 0,mb={};function nb(a,b){for(void 0===b&&P("ptr should not be undefined");a.Qa;)b=a.ab(b),a=a.Qa;return mb[b]}
function ob(a,b){b.La&&b.Ja||$a("makeClassHandle requires ptr and ptrType");!!b.Pa!==!!b.Na&&$a("Both smartPtrType and smartPtr must be specified");b.count={value:1};return pb(Object.create(a,{Ia:{value:b}}))}function pb(a){if("undefined"===typeof FinalizationRegistry)return pb=b=>b,a;eb=new FinalizationRegistry(b=>{gb(b.Ia)});pb=b=>{var c=b.Ia;c.Na&&eb.register(b,{Ia:c},b);return b};fb=b=>{eb.unregister(b)};return pb(a)}function R(){}
function qb(a,b,c){if(void 0===a[b].Ma){var d=a[b];a[b]=function(){a[b].Ma.hasOwnProperty(arguments.length)||P("Function '"+c+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+a[b].Ma+")!");return a[b].Ma[arguments.length].apply(this,arguments)};a[b].Ma=[];a[b].Ma[d.eb]=d}}
function rb(a,b,c){h.hasOwnProperty(a)?((void 0===c||void 0!==h[a].Ma&&void 0!==h[a].Ma[c])&&P("Cannot register public name '"+a+"' twice"),qb(h,a,a),h.hasOwnProperty(c)&&P("Cannot register multiple overloads of a function with the same number of arguments ("+c+")!"),h[a].Ma[c]=b):(h[a]=b,void 0!==c&&(h[a].bc=c))}function sb(a,b,c,d,e,f,l,k){this.name=a;this.constructor=b;this.Va=c;this.Sa=d;this.Qa=e;this.Eb=f;this.ab=l;this.Cb=k;this.Ob=[]}
function tb(a,b,c){for(;b!==c;)b.ab||P("Expected null or instance of "+c.name+", got an instance of "+b.name),a=b.ab(a),b=b.Qa;return a}function ub(a,b){if(null===b)return this.pb&&P("null is not a valid "+this.name),0;b.Ia||P('Cannot pass "'+vb(b)+'" as a '+this.name);b.Ia.Ja||P("Cannot pass deleted object as a pointer of type "+this.name);return tb(b.Ia.Ja,b.Ia.La.Ka,this.Ka)}
function wb(a,b){if(null===b){this.pb&&P("null is not a valid "+this.name);if(this.hb){var c=this.qb();null!==a&&a.push(this.Sa,c);return c}return 0}b.Ia||P('Cannot pass "'+vb(b)+'" as a '+this.name);b.Ia.Ja||P("Cannot pass deleted object as a pointer of type "+this.name);!this.gb&&b.Ia.La.gb&&P("Cannot convert argument of type "+(b.Ia.Pa?b.Ia.Pa.name:b.Ia.La.name)+" to parameter type "+this.name);c=tb(b.Ia.Ja,b.Ia.La.Ka,this.Ka);if(this.hb)switch(void 0===b.Ia.Na&&P("Passing raw pointer to smart pointer is illegal"),
this.Ub){case 0:b.Ia.Pa===this?c=b.Ia.Na:P("Cannot convert argument of type "+(b.Ia.Pa?b.Ia.Pa.name:b.Ia.La.name)+" to parameter type "+this.name);break;case 1:c=b.Ia.Na;break;case 2:if(b.Ia.Pa===this)c=b.Ia.Na;else{var d=b.clone();c=this.Pb(c,S(function(){d["delete"]()}));null!==a&&a.push(this.Sa,c)}break;default:P("Unsupporting sharing policy")}return c}
function xb(a,b){if(null===b)return this.pb&&P("null is not a valid "+this.name),0;b.Ia||P('Cannot pass "'+vb(b)+'" as a '+this.name);b.Ia.Ja||P("Cannot pass deleted object as a pointer of type "+this.name);b.Ia.La.gb&&P("Cannot convert argument of type "+b.Ia.La.name+" to parameter type "+this.name);return tb(b.Ia.Ja,b.Ia.La.Ka,this.Ka)}
function T(a,b,c,d){this.name=a;this.Ka=b;this.pb=c;this.gb=d;this.hb=!1;this.Sa=this.Pb=this.qb=this.yb=this.Ub=this.Nb=void 0;void 0!==b.Qa?this.toWireType=wb:(this.toWireType=d?ub:xb,this.Ra=null)}function yb(a,b,c){h.hasOwnProperty(a)||$a("Replacing nonexistant public symbol");void 0!==h[a].Ma&&void 0!==c?h[a].Ma[c]=b:(h[a]=b,h[a].eb=c)}
function zb(a,b){var c=[];return function(){c.length=0;Object.assign(c,arguments);if(a.includes("j")){var d=h["dynCall_"+a];d=c&&c.length?d.apply(null,[b].concat(c)):d.call(null,b)}else d=I(b).apply(null,c);return d}}function U(a,b){a=O(a);var c=a.includes("j")?zb(a,b):I(b);"function"!=typeof c&&P("unknown function pointer with signature "+a+": "+b);return c}var Ab=void 0;function Bb(a){a=Cb(a);var b=O(a);J(a);return b}
function Db(a,b){function c(f){e[f]||L[f]||(Va[f]?Va[f].forEach(c):(d.push(f),e[f]=!0))}var d=[],e={};b.forEach(c);throw new Ab(a+": "+d.map(Bb).join([", "]));}function Eb(a,b){for(var c=[],d=0;d<a;d++)c.push(C[(b>>2)+d]);return c}
function Fb(a){var b=Function;if(!(b instanceof Function))throw new TypeError("new_ called with constructor type "+typeof b+" which is not a function");var c=Xa(b.name||"unknownFunctionName",function(){});c.prototype=b.prototype;c=new c;a=b.apply(c,a);return a instanceof Object?a:c}
function Gb(a,b,c,d,e){var f=b.length;2>f&&P("argTypes array size mismatch! Must at least get return value and 'this' types!");var l=null!==b[1]&&null!==c,k=!1;for(c=1;c<b.length;++c)if(null!==b[c]&&void 0===b[c].Ra){k=!0;break}var m="void"!==b[0].name,n="",p="";for(c=0;c<f-2;++c)n+=(0!==c?", ":"")+"arg"+c,p+=(0!==c?", ":"")+"arg"+c+"Wired";a="return function "+Wa(a)+"("+n+") {\nif (arguments.length !== "+(f-2)+") {\nthrowBindingError('function "+a+" called with ' + arguments.length + ' arguments, expected "+
(f-2)+" args!');\n}\n";k&&(a+="var destructors = [];\n");var t=k?"destructors":"null";n="throwBindingError invoker fn runDestructors retType classParam".split(" ");d=[P,d,e,Sa,b[0],b[1]];l&&(a+="var thisWired = classParam.toWireType("+t+", this);\n");for(c=0;c<f-2;++c)a+="var arg"+c+"Wired = argType"+c+".toWireType("+t+", arg"+c+"); // "+b[c+2].name+"\n",n.push("argType"+c),d.push(b[c+2]);l&&(p="thisWired"+(0<p.length?", ":"")+p);a+=(m?"var rv = ":"")+"invoker(fn"+(0<p.length?", ":"")+p+");\n";if(k)a+=
"runDestructors(destructors);\n";else for(c=l?1:2;c<b.length;++c)f=1===c?"thisWired":"arg"+(c-2)+"Wired",null!==b[c].Ra&&(a+=f+"_dtor("+f+"); // "+b[c].name+"\n",n.push(f+"_dtor"),d.push(b[c].Ra));m&&(a+="var ret = retType.fromWireType(rv);\nreturn ret;\n");n.push(a+"}\n");return Fb(n).apply(null,d)}var Hb=[],V=[{},{value:void 0},{value:null},{value:!0},{value:!1}];function Ib(a){4<a&&0===--V[a].rb&&(V[a]=void 0,Hb.push(a))}
function W(a){a||P("Cannot use deleted val. handle = "+a);return V[a].value}function S(a){switch(a){case void 0:return 1;case null:return 2;case !0:return 3;case !1:return 4;default:var b=Hb.length?Hb.pop():V.length;V[b]={rb:1,value:a};return b}}function vb(a){if(null===a)return"null";var b=typeof a;return"object"===b||"array"===b||"function"===b?a.toString():""+a}
function Jb(a,b){switch(b){case 2:return function(c){return this.fromWireType(wa[c>>2])};case 3:return function(c){return this.fromWireType(xa[c>>3])};default:throw new TypeError("Unknown float type: "+a);}}
function Kb(a,b,c){switch(b){case 0:return c?function(d){return D[d]}:function(d){return z[d]};case 1:return c?function(d){return A[d>>1]}:function(d){return pa[d>>1]};case 2:return c?function(d){return C[d>>2]}:function(d){return E[d>>2]};default:throw new TypeError("Unknown integer type: "+a);}}function Lb(a,b){var c=L[a];void 0===c&&P(b+" has unknown type "+Bb(a));return c}var Mb={};function Nb(a){var b=Mb[a];return void 0===b?O(a):b}var Qb=[];
function Rb(){return"object"==typeof globalThis?globalThis:Function("return this")()}function Sb(a){var b=Qb.length;Qb.push(a);return b}function Tb(a,b){for(var c=Array(a),d=0;d<a;++d)c[d]=Lb(C[(b>>2)+d],"parameter "+d);return c}var Ub=[],Vb={},Wb={};
function Xb(){if(!Yb){var a={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:("object"==typeof navigator&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:da||"./this.program"},b;for(b in Wb)void 0===Wb[b]?delete a[b]:a[b]=Wb[b];var c=[];for(b in a)c.push(b+"="+a[b]);Yb=c}return Yb}var Yb,Zb=[null,[],[]],$b={};function ac(a){return 0===a%4&&(0!==a%100||0===a%400)}function bc(a,b){for(var c=0,d=0;d<=b;c+=a[d++]);return c}
var cc=[31,29,31,30,31,30,31,31,30,31,30,31],dc=[31,28,31,30,31,30,31,31,30,31,30,31];function ec(a,b){for(a=new Date(a.getTime());0<b;){var c=a.getMonth(),d=(ac(a.getFullYear())?cc:dc)[c];if(b>d-a.getDate())b-=d-a.getDate()+1,a.setDate(1),11>c?a.setMonth(c+1):(a.setMonth(0),a.setFullYear(a.getFullYear()+1));else{a.setDate(a.getDate()+b);break}}return a}
function fc(a,b,c,d){function e(g,q,w){for(g="number"==typeof g?g.toString():g||"";g.length<q;)g=w[0]+g;return g}function f(g,q){return e(g,q,"0")}function l(g,q){function w(F){return 0>F?-1:0<F?1:0}var B;0===(B=w(g.getFullYear()-q.getFullYear()))&&0===(B=w(g.getMonth()-q.getMonth()))&&(B=w(g.getDate()-q.getDate()));return B}function k(g){switch(g.getDay()){case 0:return new Date(g.getFullYear()-1,11,29);case 1:return g;case 2:return new Date(g.getFullYear(),0,3);case 3:return new Date(g.getFullYear(),
0,2);case 4:return new Date(g.getFullYear(),0,1);case 5:return new Date(g.getFullYear()-1,11,31);case 6:return new Date(g.getFullYear()-1,11,30)}}function m(g){g=ec(new Date(g.Oa+1900,0,1),g.kb);var q=new Date(g.getFullYear()+1,0,4),w=k(new Date(g.getFullYear(),0,4));q=k(q);return 0>=l(w,g)?0>=l(q,g)?g.getFullYear()+1:g.getFullYear():g.getFullYear()-1}var n=C[d+40>>2];d={Xb:C[d>>2],Wb:C[d+4>>2],ib:C[d+8>>2],$a:C[d+12>>2],Wa:C[d+16>>2],Oa:C[d+20>>2],jb:C[d+24>>2],kb:C[d+28>>2],cc:C[d+32>>2],Vb:C[d+
36>>2],Yb:n?n?ka(z,n,void 0):"":""};c=c?ka(z,c,void 0):"";n={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var p in n)c=c.replace(new RegExp(p,"g"),n[p]);var t="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
v="January February March April May June July August September October November December".split(" ");n={"%a":function(g){return t[g.jb].substring(0,3)},"%A":function(g){return t[g.jb]},"%b":function(g){return v[g.Wa].substring(0,3)},"%B":function(g){return v[g.Wa]},"%C":function(g){return f((g.Oa+1900)/100|0,2)},"%d":function(g){return f(g.$a,2)},"%e":function(g){return e(g.$a,2," ")},"%g":function(g){return m(g).toString().substring(2)},"%G":function(g){return m(g)},"%H":function(g){return f(g.ib,
2)},"%I":function(g){g=g.ib;0==g?g=12:12<g&&(g-=12);return f(g,2)},"%j":function(g){return f(g.$a+bc(ac(g.Oa+1900)?cc:dc,g.Wa-1),3)},"%m":function(g){return f(g.Wa+1,2)},"%M":function(g){return f(g.Wb,2)},"%n":function(){return"\n"},"%p":function(g){return 0<=g.ib&&12>g.ib?"AM":"PM"},"%S":function(g){return f(g.Xb,2)},"%t":function(){return"\t"},"%u":function(g){return g.jb||7},"%U":function(g){var q=new Date(g.Oa+1900,0,1),w=0===q.getDay()?q:ec(q,7-q.getDay());g=new Date(g.Oa+1900,g.Wa,g.$a);return 0>
l(w,g)?f(Math.ceil((31-w.getDate()+(bc(ac(g.getFullYear())?cc:dc,g.getMonth()-1)-31)+g.getDate())/7),2):0===l(w,q)?"01":"00"},"%V":function(g){var q=new Date(g.Oa+1901,0,4),w=k(new Date(g.Oa+1900,0,4));q=k(q);var B=ec(new Date(g.Oa+1900,0,1),g.kb);return 0>l(B,w)?"53":0>=l(q,B)?"01":f(Math.ceil((w.getFullYear()<g.Oa+1900?g.kb+32-w.getDate():g.kb+1-w.getDate())/7),2)},"%w":function(g){return g.jb},"%W":function(g){var q=new Date(g.Oa,0,1),w=1===q.getDay()?q:ec(q,0===q.getDay()?1:7-q.getDay()+1);g=
new Date(g.Oa+1900,g.Wa,g.$a);return 0>l(w,g)?f(Math.ceil((31-w.getDate()+(bc(ac(g.getFullYear())?cc:dc,g.getMonth()-1)-31)+g.getDate())/7),2):0===l(w,q)?"01":"00"},"%y":function(g){return(g.Oa+1900).toString().substring(2)},"%Y":function(g){return g.Oa+1900},"%z":function(g){g=g.Vb;var q=0<=g;g=Math.abs(g)/60;return(q?"+":"-")+String("0000"+(g/60*100+g%60)).slice(-4)},"%Z":function(g){return g.Yb},"%%":function(){return"%"}};c=c.replace(/%%/g,"\x00\x00");for(p in n)c.includes(p)&&(c=c.replace(new RegExp(p,
"g"),n[p](d)));c=c.replace(/\0\0/g,"%");p=gc(c);if(p.length>b)return 0;D.set(p,a);return p.length-1}Za=h.InternalError=Ya("InternalError");for(var hc=Array(256),ic=0;256>ic;++ic)hc[ic]=String.fromCharCode(ic);bb=hc;cb=h.BindingError=Ya("BindingError");R.prototype.isAliasOf=function(a){if(!(this instanceof R&&a instanceof R))return!1;var b=this.Ia.La.Ka,c=this.Ia.Ja,d=a.Ia.La.Ka;for(a=a.Ia.Ja;b.Qa;)c=b.ab(c),b=b.Qa;for(;d.Qa;)a=d.ab(a),d=d.Qa;return b===d&&c===a};
R.prototype.clone=function(){this.Ia.Ja||db(this);if(this.Ia.Za)return this.Ia.count.value+=1,this;var a=pb,b=Object,c=b.create,d=Object.getPrototypeOf(this),e=this.Ia;a=a(c.call(b,d,{Ia:{value:{count:e.count,Ua:e.Ua,Za:e.Za,Ja:e.Ja,La:e.La,Na:e.Na,Pa:e.Pa}}}));a.Ia.count.value+=1;a.Ia.Ua=!1;return a};R.prototype["delete"]=function(){this.Ia.Ja||db(this);this.Ia.Ua&&!this.Ia.Za&&P("Object already scheduled for deletion");fb(this);gb(this.Ia);this.Ia.Za||(this.Ia.Na=void 0,this.Ia.Ja=void 0)};
R.prototype.isDeleted=function(){return!this.Ia.Ja};R.prototype.deleteLater=function(){this.Ia.Ja||db(this);this.Ia.Ua&&!this.Ia.Za&&P("Object already scheduled for deletion");jb.push(this);1===jb.length&&lb&&lb(kb);this.Ia.Ua=!0;return this};h.getInheritedInstanceCount=function(){return Object.keys(mb).length};h.getLiveInheritedInstances=function(){var a=[],b;for(b in mb)mb.hasOwnProperty(b)&&a.push(mb[b]);return a};h.flushPendingDeletes=kb;h.setDelayFunction=function(a){lb=a;jb.length&&lb&&lb(kb)};
T.prototype.Fb=function(a){this.yb&&(a=this.yb(a));return a};T.prototype.ub=function(a){this.Sa&&this.Sa(a)};T.prototype.argPackAdvance=8;T.prototype.readValueFromPointer=Ta;T.prototype.deleteObject=function(a){if(null!==a)a["delete"]()};
T.prototype.fromWireType=function(a){function b(){return this.hb?ob(this.Ka.Va,{La:this.Nb,Ja:c,Pa:this,Na:a}):ob(this.Ka.Va,{La:this,Ja:a})}var c=this.Fb(a);if(!c)return this.ub(a),null;var d=nb(this.Ka,c);if(void 0!==d){if(0===d.Ia.count.value)return d.Ia.Ja=c,d.Ia.Na=a,d.clone();d=d.clone();this.ub(a);return d}d=this.Ka.Eb(c);d=ib[d];if(!d)return b.call(this);d=this.gb?d.Bb:d.pointerType;var e=hb(c,this.Ka,d.Ka);return null===e?b.call(this):this.hb?ob(d.Ka.Va,{La:d,Ja:e,Pa:this,Na:a}):ob(d.Ka.Va,
{La:d,Ja:e})};Ab=h.UnboundTypeError=Ya("UnboundTypeError");h.count_emval_handles=function(){for(var a=0,b=5;b<V.length;++b)void 0!==V[b]&&++a;return a};h.get_first_emval=function(){for(var a=5;a<V.length;++a)if(void 0!==V[a])return V[a];return null};function gc(a){var b=Array(ma(a)+1);la(a,b,0,b.length);return b}
var Ec={v:function(a){return Na(a+16)+16},r:function(a){a=new La(a);var b=a.fb();b.Gb()||(b.sb(!0),Pa--);b.tb(!1);Oa.push(a);b.Ab();return a.zb()},A:function(){X(0);var a=Oa.pop(),b=a.fb();if(b.Qb()&&!b.xb()){var c=b.Hb();c&&I(c)(b.vb);Qa(b.vb)}a.nb();K=0},b:function(){var a=K;if(!a)return x=0;var b=(new Ka(a)).ob(),c=new La;c.cb(a);c.Xa(a);if(!b)return x=0,c.Ja|0;a=Array.prototype.slice.call(arguments);for(var d=0;d<a.length;d++){var e=a[d];if(0===e||e===b)break;if(jc(e,b,c.bb()))return x=e,c.Ja|
0}x=b;return c.Ja|0},k:function(){var a=K;if(!a)return x=0;var b=(new Ka(a)).ob(),c=new La;c.cb(a);c.Xa(a);if(!b)return x=0,c.Ja|0;a=Array.prototype.slice.call(arguments);for(var d=0;d<a.length;d++){var e=a[d];if(0===e||e===b)break;if(jc(e,b,c.bb()))return x=e,c.Ja|0}x=b;return c.Ja|0},I:Qa,M:function(){var a=Oa.pop();a||y("no exception to throw");var b=a.fb(),c=a.Ya();b.xb()?a.nb():(Oa.push(a),b.tb(!0),b.sb(!1),Pa++);K=c;throw c;},u:function(a,b,c){(new Ka(a)).Xa(b,c);K=a;Pa++;throw a;},ga:function(){return Pa},
d:function(a){a=new La(a);var b=a.Ya();K||(K=b);a.nb();throw b;},ka:function(a){var b=Ra[a];delete Ra[a];var c=b.qb,d=b.Sa,e=b.wb,f=e.map(function(l){return l.Kb}).concat(e.map(function(l){return l.Sb}));M([a],f,function(l){var k={};e.forEach(function(m,n){var p=l[n],t=m.Ib,v=m.Jb,g=l[n+e.length],q=m.Rb,w=m.Tb;k[m.Db]={read:function(B){return p.fromWireType(t(v,B))},write:function(B,F){var Q=[];q(w,B,g.toWireType(Q,F));Sa(Q)}}});return[{name:b.name,fromWireType:function(m){var n={},p;for(p in k)n[p]=
k[p].read(m);d(m);return n},toWireType:function(m,n){for(var p in k)if(!(p in n))throw new TypeError('Missing field:  "'+p+'"');var t=c();for(p in k)k[p].write(t,n[p]);null!==m&&m.push(d,t);return t},argPackAdvance:8,readValueFromPointer:Ta,Ra:d}]})},Z:function(){},ia:function(a,b,c,d,e){var f=ab(c);b=O(b);N(a,{name:b,fromWireType:function(l){return!!l},toWireType:function(l,k){return k?d:e},argPackAdvance:8,readValueFromPointer:function(l){if(1===c)var k=D;else if(2===c)k=A;else if(4===c)k=C;else throw new TypeError("Unknown boolean type size: "+
b);return this.fromWireType(k[l>>f])},Ra:null})},S:function(a,b,c,d,e,f,l,k,m,n,p,t,v){p=O(p);f=U(e,f);k&&(k=U(l,k));n&&(n=U(m,n));v=U(t,v);var g=Wa(p);rb(g,function(){Db("Cannot construct "+p+" due to unbound types",[d])});M([a,b,c],d?[d]:[],function(q){q=q[0];if(d){var w=q.Ka;var B=w.Va}else B=R.prototype;q=Xa(g,function(){if(Object.getPrototypeOf(this)!==F)throw new cb("Use 'new' to construct "+p);if(void 0===Q.Ta)throw new cb(p+" has no accessible constructor");var Ob=Q.Ta[arguments.length];if(void 0===
Ob)throw new cb("Tried to invoke ctor of "+p+" with invalid number of parameters ("+arguments.length+") - expected ("+Object.keys(Q.Ta).toString()+") parameters instead!");return Ob.apply(this,arguments)});var F=Object.create(B,{constructor:{value:q}});q.prototype=F;var Q=new sb(p,q,F,v,w,f,k,n);w=new T(p,Q,!0,!1);B=new T(p+"*",Q,!1,!1);var Pb=new T(p+" const*",Q,!1,!0);ib[a]={pointerType:B,Bb:Pb};yb(g,q);return[w,B,Pb]})},R:function(a,b,c,d,e,f){0<b||y(void 0);var l=Eb(b,c);e=U(d,e);M([],[a],function(k){k=
k[0];var m="constructor "+k.name;void 0===k.Ka.Ta&&(k.Ka.Ta=[]);if(void 0!==k.Ka.Ta[b-1])throw new cb("Cannot register multiple constructors with identical number of parameters ("+(b-1)+") for class '"+k.name+"'! Overload resolution is currently only performed using the parameter count, not actual type info!");k.Ka.Ta[b-1]=()=>{Db("Cannot construct "+k.name+" due to unbound types",l)};M([],l,function(n){n.splice(1,0,null);k.Ka.Ta[b-1]=Gb(m,n,null,e,f);return[]});return[]})},o:function(a,b,c,d,e,f,
l,k){var m=Eb(c,d);b=O(b);f=U(e,f);M([],[a],function(n){function p(){Db("Cannot call "+t+" due to unbound types",m)}n=n[0];var t=n.name+"."+b;b.startsWith("@@")&&(b=Symbol[b.substring(2)]);k&&n.Ka.Ob.push(b);var v=n.Ka.Va,g=v[b];void 0===g||void 0===g.Ma&&g.className!==n.name&&g.eb===c-2?(p.eb=c-2,p.className=n.name,v[b]=p):(qb(v,b,t),v[b].Ma[c-2]=p);M([],m,function(q){q=Gb(t,q,n,f,l);void 0===v[b].Ma?(q.eb=c-2,v[b]=q):v[b].Ma[c-2]=q;return[]});return[]})},ha:function(a,b){b=O(b);N(a,{name:b,fromWireType:function(c){var d=
W(c);Ib(c);return d},toWireType:function(c,d){return S(d)},argPackAdvance:8,readValueFromPointer:Ta,Ra:null})},N:function(a,b,c){c=ab(c);b=O(b);N(a,{name:b,fromWireType:function(d){return d},toWireType:function(d,e){return e},argPackAdvance:8,readValueFromPointer:Jb(b,c),Ra:null})},B:function(a,b,c,d,e,f){var l=Eb(b,c);a=O(a);e=U(d,e);rb(a,function(){Db("Cannot call "+a+" due to unbound types",l)},b-1);M([],l,function(k){yb(a,Gb(a,[k[0],null].concat(k.slice(1)),null,e,f),b-1);return[]})},q:function(a,
b,c,d,e){b=O(b);-1===e&&(e=4294967295);e=ab(c);var f=k=>k;if(0===d){var l=32-8*c;f=k=>k<<l>>>l}c=b.includes("unsigned")?function(k,m){return m>>>0}:function(k,m){return m};N(a,{name:b,fromWireType:f,toWireType:c,argPackAdvance:8,readValueFromPointer:Kb(b,e,0!==d),Ra:null})},l:function(a,b,c){function d(f){f>>=2;var l=E;return new e(va,l[f+1],l[f])}var e=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][b];c=O(c);N(a,{name:c,fromWireType:d,argPackAdvance:8,
readValueFromPointer:d},{Lb:!0})},O:function(a,b){b=O(b);var c="std::string"===b;N(a,{name:b,fromWireType:function(d){var e=E[d>>2];if(c)for(var f=d+4,l=0;l<=e;++l){var k=d+4+l;if(l==e||0==z[k]){f=f?ka(z,f,k-f):"";if(void 0===m)var m=f;else m+=String.fromCharCode(0),m+=f;f=k+1}}else{m=Array(e);for(l=0;l<e;++l)m[l]=String.fromCharCode(z[d+4+l]);m=m.join("")}J(d);return m},toWireType:function(d,e){e instanceof ArrayBuffer&&(e=new Uint8Array(e));var f="string"==typeof e;f||e instanceof Uint8Array||e instanceof
Uint8ClampedArray||e instanceof Int8Array||P("Cannot pass non-string to std::string");var l=(c&&f?()=>ma(e):()=>e.length)(),k=Na(4+l+1);E[k>>2]=l;if(c&&f)la(e,z,k+4,l+1);else if(f)for(f=0;f<l;++f){var m=e.charCodeAt(f);255<m&&(J(k),P("String has UTF-16 code units that do not fit in 8 bits"));z[k+4+f]=m}else for(f=0;f<l;++f)z[k+4+f]=e[f];null!==d&&d.push(J,k);return k},argPackAdvance:8,readValueFromPointer:Ta,Ra:function(d){J(d)}})},F:function(a,b,c){c=O(c);if(2===b){var d=oa;var e=qa;var f=ra;var l=
()=>pa;var k=1}else 4===b&&(d=sa,e=ta,f=ua,l=()=>E,k=2);N(a,{name:c,fromWireType:function(m){for(var n=E[m>>2],p=l(),t,v=m+4,g=0;g<=n;++g){var q=m+4+g*b;if(g==n||0==p[q>>k])v=d(v,q-v),void 0===t?t=v:(t+=String.fromCharCode(0),t+=v),v=q+b}J(m);return t},toWireType:function(m,n){"string"!=typeof n&&P("Cannot pass non-string to C++ string type "+c);var p=f(n),t=Na(4+p+b);E[t>>2]=p>>k;e(n,t+4,p+b);null!==m&&m.push(J,t);return t},argPackAdvance:8,readValueFromPointer:Ta,Ra:function(m){J(m)}})},P:function(a,
b,c,d,e,f){Ra[a]={name:O(b),qb:U(c,d),Sa:U(e,f),wb:[]}},C:function(a,b,c,d,e,f,l,k,m,n){Ra[a].wb.push({Db:O(b),Kb:c,Ib:U(d,e),Jb:f,Sb:l,Rb:U(k,m),Tb:n})},ja:function(a,b){b=O(b);N(a,{Mb:!0,name:b,argPackAdvance:0,fromWireType:function(){},toWireType:function(){}})},ma:function(a,b,c){a=W(a);b=Lb(b,"emval::as");var d=[],e=S(d);C[c>>2]=e;return b.toWireType(d,a)},U:function(a,b,c,d,e){a=Qb[a];b=W(b);c=Nb(c);var f=[];C[d>>2]=S(f);return a(b,c,f,e)},T:function(a,b,c,d){a=Qb[a];b=W(b);c=Nb(c);a(b,c,null,
d)},K:Ib,W:function(a){if(0===a)return S(Rb());a=Nb(a);return S(Rb()[a])},H:function(a,b){var c=Tb(a,b),d=c[0];b=d.name+"_$"+c.slice(1).map(function(p){return p.name}).join("_")+"$";var e=Ub[b];if(void 0!==e)return e;e=["retType"];for(var f=[d],l="",k=0;k<a-1;++k)l+=(0!==k?", ":"")+"arg"+k,e.push("argType"+k),f.push(c[1+k]);var m="return function "+Wa("methodCaller_"+b)+"(handle, name, destructors, args) {\n",n=0;for(k=0;k<a-1;++k)m+="    var arg"+k+" = argType"+k+".readValueFromPointer(args"+(n?
"+"+n:"")+");\n",n+=c[k+1].argPackAdvance;m+="    var rv = handle[name]("+l+");\n";for(k=0;k<a-1;++k)c[k+1].deleteObject&&(m+="    argType"+k+".deleteObject(arg"+k+");\n");d.Mb||(m+="    return retType.toWireType(destructors, rv);\n");e.push(m+"};\n");a=Fb(e).apply(null,f);e=Sb(a);return Ub[b]=e},na:function(a){a=Nb(a);return S(h[a])},V:function(a,b){a=W(a);b=W(b);return S(a[b])},G:function(a){4<a&&(V[a].rb+=1)},la:function(a,b,c,d){a=W(a);var e=Vb[b];if(!e){e="";for(var f=0;f<b;++f)e+=(0!==f?", ":
"")+"arg"+f;var l="return function emval_allocator_"+b+"(constructor, argTypes, args) {\n";for(f=0;f<b;++f)l+="var argType"+f+" = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + "+f+'], "parameter '+f+'");\nvar arg'+f+" = argType"+f+".readValueFromPointer(args);\nargs += argType"+f+"['argPackAdvance'];\n";e=(new Function("requireRegisteredType","Module","valueToHandle",l+("var obj = new constructor("+e+");\nreturn valueToHandle(obj);\n}\n")))(Lb,h,S);Vb[b]=e}return e(a,c,d)},oa:function(a){return S(Nb(a))},
pa:function(a){var b=W(a);Sa(b);Ib(a)},Q:function(a,b){a=Lb(a,"_emval_take_value");a=a.readValueFromPointer(b);return S(a)},D:function(){y("")},E:function(){y("OOM")},ba:function(a,b){var c=0;Xb().forEach(function(d,e){var f=b+c;e=C[a+4*e>>2]=f;for(f=0;f<d.length;++f)D[e++>>0]=d.charCodeAt(f);D[e>>0]=0;c+=d.length+1});return 0},ca:function(a,b){var c=Xb();C[a>>2]=c.length;var d=0;c.forEach(function(e){d+=e.length+1});C[b>>2]=d;return 0},da:function(){return 0},fa:function(a,b,c,d){a=$b.ac(a);b=$b.Zb(a,
b,c);C[d>>2]=b;return 0},Y:function(){},ea:function(a,b,c,d){for(var e=0,f=0;f<c;f++){var l=C[b>>2],k=C[b+4>>2];b+=8;for(var m=0;m<k;m++){var n=z[l+m],p=Zb[a];0===n||10===n?((1===a?ea:u)(ka(p,0)),p.length=0):p.push(n)}e+=k}C[d>>2]=e;return 0},a:function(){return x},L:kc,f:lc,e:mc,t:nc,j:oc,y:pc,p:qc,J:rc,x:sc,X:tc,h:uc,m:vc,c:wc,i:xc,g:yc,z:zc,$:Ac,n:Bc,s:Cc,w:Dc,_:function(a){x=a},aa:function(a,b,c,d){return fc(a,b,c,d)}};
(function(){function a(e){h.asm=e.exports;ha=h.asm.qa;va=e=ha.buffer;h.HEAP8=D=new Int8Array(e);h.HEAP16=A=new Int16Array(e);h.HEAP32=C=new Int32Array(e);h.HEAPU8=z=new Uint8Array(e);h.HEAPU16=pa=new Uint16Array(e);h.HEAPU32=E=new Uint32Array(e);h.HEAPF32=wa=new Float32Array(e);h.HEAPF64=xa=new Float64Array(e);ya=h.asm.va;Aa.unshift(h.asm.ra);G--;h.monitorRunDependencies&&h.monitorRunDependencies(G);0==G&&(null!==Da&&(clearInterval(Da),Da=null),Ea&&(e=Ea,Ea=null,e()))}function b(e){a(e.instance)}
function c(e){return Ia().then(function(f){return WebAssembly.instantiate(f,d)}).then(function(f){return f}).then(e,function(f){u("failed to asynchronously prepare wasm: "+f);y(f)})}var d={a:Ec};G++;h.monitorRunDependencies&&h.monitorRunDependencies(G);if(h.instantiateWasm)try{return h.instantiateWasm(d,a)}catch(e){return u("Module.instantiateWasm callback failed with error: "+e),!1}(function(){return fa||"function"!=typeof WebAssembly.instantiateStreaming||Fa()||"function"!=typeof fetch?c(b):fetch(H,
{credentials:"same-origin"}).then(function(e){return WebAssembly.instantiateStreaming(e,d).then(b,function(f){u("wasm streaming compile failed: "+f);u("falling back to ArrayBuffer instantiation");return c(b)})})})().catch(ba);return{}})();h.___wasm_call_ctors=function(){return(h.___wasm_call_ctors=h.asm.ra).apply(null,arguments)};var Na=h._malloc=function(){return(Na=h._malloc=h.asm.sa).apply(null,arguments)},Cb=h.___getTypeName=function(){return(Cb=h.___getTypeName=h.asm.ta).apply(null,arguments)};
h.___embind_register_native_and_builtin_types=function(){return(h.___embind_register_native_and_builtin_types=h.asm.ua).apply(null,arguments)};
var J=h._free=function(){return(J=h._free=h.asm.wa).apply(null,arguments)},X=h._setThrew=function(){return(X=h._setThrew=h.asm.xa).apply(null,arguments)},Y=h.stackSave=function(){return(Y=h.stackSave=h.asm.ya).apply(null,arguments)},Z=h.stackRestore=function(){return(Z=h.stackRestore=h.asm.za).apply(null,arguments)},jc=h.___cxa_can_catch=function(){return(jc=h.___cxa_can_catch=h.asm.Aa).apply(null,arguments)},Ma=h.___cxa_is_pointer_type=function(){return(Ma=h.___cxa_is_pointer_type=h.asm.Ba).apply(null,
arguments)},Fc=h.dynCall_iij=function(){return(Fc=h.dynCall_iij=h.asm.Ca).apply(null,arguments)};h.dynCall_viijii=function(){return(h.dynCall_viijii=h.asm.Da).apply(null,arguments)};h.dynCall_jiji=function(){return(h.dynCall_jiji=h.asm.Ea).apply(null,arguments)};h.dynCall_iiiiij=function(){return(h.dynCall_iiiiij=h.asm.Fa).apply(null,arguments)};h.dynCall_iiiiijj=function(){return(h.dynCall_iiiiijj=h.asm.Ga).apply(null,arguments)};
h.dynCall_iiiiiijj=function(){return(h.dynCall_iiiiiijj=h.asm.Ha).apply(null,arguments)};function xc(a,b,c,d){var e=Y();try{I(a)(b,c,d)}catch(f){Z(e);if(f!==f+0)throw f;X(1,0)}}function yc(a,b,c,d,e){var f=Y();try{I(a)(b,c,d,e)}catch(l){Z(f);if(l!==l+0)throw l;X(1,0)}}function wc(a,b,c){var d=Y();try{I(a)(b,c)}catch(e){Z(d);if(e!==e+0)throw e;X(1,0)}}function mc(a,b,c){var d=Y();try{return I(a)(b,c)}catch(e){Z(d);if(e!==e+0)throw e;X(1,0)}}
function lc(a,b){var c=Y();try{return I(a)(b)}catch(d){Z(c);if(d!==d+0)throw d;X(1,0)}}function kc(a){var b=Y();try{return I(a)()}catch(c){Z(b);if(c!==c+0)throw c;X(1,0)}}function uc(a){var b=Y();try{I(a)()}catch(c){Z(b);if(c!==c+0)throw c;X(1,0)}}function oc(a,b,c,d){var e=Y();try{return I(a)(b,c,d)}catch(f){Z(e);if(f!==f+0)throw f;X(1,0)}}function Bc(a,b,c,d,e,f,l,k){var m=Y();try{I(a)(b,c,d,e,f,l,k)}catch(n){Z(m);if(n!==n+0)throw n;X(1,0)}}
function zc(a,b,c,d,e,f){var l=Y();try{I(a)(b,c,d,e,f)}catch(k){Z(l);if(k!==k+0)throw k;X(1,0)}}function nc(a,b,c,d){var e=Y();try{return I(a)(b,c,d)}catch(f){Z(e);if(f!==f+0)throw f;X(1,0)}}function pc(a,b,c,d,e){var f=Y();try{return I(a)(b,c,d,e)}catch(l){Z(f);if(l!==l+0)throw l;X(1,0)}}function vc(a,b){var c=Y();try{I(a)(b)}catch(d){Z(c);if(d!==d+0)throw d;X(1,0)}}function Ac(a,b,c,d,e,f,l){var k=Y();try{I(a)(b,c,d,e,f,l)}catch(m){Z(k);if(m!==m+0)throw m;X(1,0)}}
function qc(a,b,c,d,e,f,l){var k=Y();try{return I(a)(b,c,d,e,f,l)}catch(m){Z(k);if(m!==m+0)throw m;X(1,0)}}function rc(a,b,c,d,e,f,l,k){var m=Y();try{return I(a)(b,c,d,e,f,l,k)}catch(n){Z(m);if(n!==n+0)throw n;X(1,0)}}function sc(a,b,c,d,e,f,l,k,m,n,p,t){var v=Y();try{return I(a)(b,c,d,e,f,l,k,m,n,p,t)}catch(g){Z(v);if(g!==g+0)throw g;X(1,0)}}function Cc(a,b,c,d,e,f,l,k,m,n,p){var t=Y();try{I(a)(b,c,d,e,f,l,k,m,n,p)}catch(v){Z(t);if(v!==v+0)throw v;X(1,0)}}
function Dc(a,b,c,d,e,f,l,k,m,n,p,t,v,g,q,w){var B=Y();try{I(a)(b,c,d,e,f,l,k,m,n,p,t,v,g,q,w)}catch(F){Z(B);if(F!==F+0)throw F;X(1,0)}}function tc(a,b,c,d){var e=Y();try{return Fc(a,b,c,d)}catch(f){Z(e);if(f!==f+0)throw f;X(1,0)}}var Gc;Ea=function Hc(){Gc||Ic();Gc||(Ea=Hc)};
function Ic(){function a(){if(!Gc&&(Gc=!0,h.calledRun=!0,!ia)){Ja(Aa);aa(h);if(h.onRuntimeInitialized)h.onRuntimeInitialized();if(h.postRun)for("function"==typeof h.postRun&&(h.postRun=[h.postRun]);h.postRun.length;){var b=h.postRun.shift();Ba.unshift(b)}Ja(Ba)}}if(!(0<G)){if(h.preRun)for("function"==typeof h.preRun&&(h.preRun=[h.preRun]);h.preRun.length;)Ca();Ja(za);0<G||(h.setStatus?(h.setStatus("Running..."),setTimeout(function(){setTimeout(function(){h.setStatus("")},1);a()},1)):a())}}h.run=Ic;
if(h.preInit)for("function"==typeof h.preInit&&(h.preInit=[h.preInit]);0<h.preInit.length;)h.preInit.pop()();Ic();


  return MeshUtility.ready
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = MeshUtility;
else if (typeof define === 'function' && define['amd'])
  define([], function() { return MeshUtility; });
else if (typeof exports === 'object')
  exports["MeshUtility"] = MeshUtility;
