import{A as i,D as a,H as n,K as p,kb as m,lb as h,s,xb as c}from"./chunk-Z2M3T6G4.js";var H=(()=>{let r=class r{constructor(t){this.http=t,this.baseurl=c.baseurl+"/questions",this.httpOptions={headers:new m({})}}Get(t,e){var f={filters:t,page:e};return this.http.post(this.baseurl+"/get",f,this.httpOptions).pipe(a(1),i(this.errorHandl))}errorHandl(t){let e="";return t.error instanceof ErrorEvent?e=t.error.message:e=`Error Code: ${t.status}
Message: ${t.message}`,s(e)}};r.\u0275fac=function(e){return new(e||r)(p(h))},r.\u0275prov=n({token:r,factory:r.\u0275fac,providedIn:"root"});let o=r;return o})();var C=(()=>{let r=class r{constructor(t){this.http=t,this.baseurl=c.baseurl+"/uploader",this.httpOptions={headers:new m({})}}BatchUpload(t){var e={filename:t};return this.http.post(this.baseurl+"/batchUpload",e,this.httpOptions).pipe(a(1),i(this.errorHandl))}errorHandl(t){let e="";return t.error instanceof ErrorEvent?e=t.error.message:e=`Error Code: ${t.status}
Message: ${t.message}`,s(e)}};r.\u0275fac=function(e){return new(e||r)(p(h))},r.\u0275prov=n({token:r,factory:r.\u0275fac,providedIn:"root"});let o=r;return o})();export{H as a,C as b};