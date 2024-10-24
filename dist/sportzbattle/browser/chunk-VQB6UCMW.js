import{$a as te,G as f,H as Z,I,J as g,L as X,M as S,O,P as u,Pa as p,Q as B,T as y,U as Y,V as v,Va as Q,W as N,Ya as ee,a as h,aa as a,ab as U,b as m,da as _,ga as d,ja as K,ma as J,q as W,u as q,v as z,za as C}from"./chunk-7HZ4FB2J.js";var ce=(()=>{let e=class e{constructor(i,n){this._renderer=i,this._elementRef=n,this.onChange=s=>{},this.onTouched=()=>{}}setProperty(i,n){this._renderer.setProperty(this._elementRef.nativeElement,i,n)}registerOnTouched(i){this.onTouched=i}registerOnChange(i){this.onChange=i}setDisabledState(i){this.setProperty("disabled",i)}};e.\u0275fac=function(n){return new(n||e)(a(_),a(v))},e.\u0275dir=u({type:e});let t=e;return t})(),E=(()=>{let e=class e extends ce{};e.\u0275fac=(()=>{let i;return function(s){return(i||(i=y(e)))(s||e)}})(),e.\u0275dir=u({type:e,features:[d]});let t=e;return t})(),b=new g(""),Ee={provide:b,useExisting:f(()=>Fe),multi:!0},Fe=(()=>{let e=class e extends E{writeValue(i){this.setProperty("checked",i)}};e.\u0275fac=(()=>{let i;return function(s){return(i||(i=y(e)))(s||e)}})(),e.\u0275dir=u({type:e,selectors:[["input","type","checkbox","formControlName",""],["input","type","checkbox","formControl",""],["input","type","checkbox","ngModel",""]],hostBindings:function(n,s){n&1&&C("change",function(l){return s.onChange(l.target.checked)})("blur",function(){return s.onTouched()})},features:[p([Ee]),d]});let t=e;return t})(),we={provide:b,useExisting:f(()=>he),multi:!0};function Ie(){let t=U()?U().getUserAgent():"";return/android (\d+)/.test(t.toLowerCase())}var Se=new g(""),he=(()=>{let e=class e extends ce{constructor(i,n,s){super(i,n),this._compositionMode=s,this._composing=!1,this._compositionMode==null&&(this._compositionMode=!Ie())}writeValue(i){let n=i??"";this.setProperty("value",n)}_handleInput(i){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(i)}_compositionStart(){this._composing=!0}_compositionEnd(i){this._composing=!1,this._compositionMode&&this.onChange(i)}};e.\u0275fac=function(n){return new(n||e)(a(_),a(v),a(Se,8))},e.\u0275dir=u({type:e,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(n,s){n&1&&C("input",function(l){return s._handleInput(l.target.value)})("blur",function(){return s.onTouched()})("compositionstart",function(){return s._compositionStart()})("compositionend",function(l){return s._compositionEnd(l.target.value)})},features:[p([we]),d]});let t=e;return t})();function Oe(t){return t!=null&&typeof t.length=="number"}var fe=new g(""),Ne=new g("");function Pe(t){return e=>Oe(e.value)&&e.value.length>t?{maxlength:{requiredLength:t,actualLength:e.value.length}}:null}function ie(t){return null}function pe(t){return t!=null}function ge(t){return Q(t)?W(t):t}function me(t){let e={};return t.forEach(r=>{e=r!=null?h(h({},e),r):e}),Object.keys(e).length===0?null:e}function ye(t,e){return e.map(r=>r(t))}function xe(t){return!t.validate}function ve(t){return t.map(e=>xe(e)?e:r=>e.validate(r))}function ke(t){if(!t)return null;let e=t.filter(pe);return e.length==0?null:function(r){return me(ye(r,e))}}function _e(t){return t!=null?ke(ve(t)):null}function Ge(t){if(!t)return null;let e=t.filter(pe);return e.length==0?null:function(r){let i=ye(r,e).map(ge);return z(i).pipe(q(me))}}function Ce(t){return t!=null?Ge(ve(t)):null}function ne(t,e){return t===null?[e]:Array.isArray(t)?[...t,e]:[t,e]}function Te(t){return t._rawValidators}function je(t){return t._rawAsyncValidators}function R(t){return t?Array.isArray(t)?t:[t]:[]}function x(t,e){return Array.isArray(t)?t.includes(e):t===e}function re(t,e){let r=R(e);return R(t).forEach(n=>{x(r,n)||r.push(n)}),r}function se(t,e){return R(e).filter(r=>!x(t,r))}var k=class{constructor(){this._rawValidators=[],this._rawAsyncValidators=[],this._onDestroyCallbacks=[]}get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_setValidators(e){this._rawValidators=e||[],this._composedValidatorFn=_e(this._rawValidators)}_setAsyncValidators(e){this._rawAsyncValidators=e||[],this._composedAsyncValidatorFn=Ce(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_registerOnDestroy(e){this._onDestroyCallbacks.push(e)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(e=>e()),this._onDestroyCallbacks=[]}reset(e=void 0){this.control&&this.control.reset(e)}hasError(e,r){return this.control?this.control.hasError(e,r):!1}getError(e,r){return this.control?this.control.getError(e,r):null}},H=class extends k{get formDirective(){return null}get path(){return null}},D=class extends k{constructor(){super(...arguments),this._parent=null,this.name=null,this.valueAccessor=null}},L=class{constructor(e){this._cd=e}get isTouched(){return!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return!!this._cd?.submitted}},Be={"[class.ng-untouched]":"isUntouched","[class.ng-touched]":"isTouched","[class.ng-pristine]":"isPristine","[class.ng-dirty]":"isDirty","[class.ng-valid]":"isValid","[class.ng-invalid]":"isInvalid","[class.ng-pending]":"isPending"},Pt=m(h({},Be),{"[class.ng-submitted]":"isSubmitted"}),xt=(()=>{let e=class e extends L{constructor(i){super(i)}};e.\u0275fac=function(n){return new(n||e)(a(D,2))},e.\u0275dir=u({type:e,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(n,s){n&2&&J("ng-untouched",s.isUntouched)("ng-touched",s.isTouched)("ng-pristine",s.isPristine)("ng-dirty",s.isDirty)("ng-valid",s.isValid)("ng-invalid",s.isInvalid)("ng-pending",s.isPending)},features:[d]});let t=e;return t})();var A="VALID",P="INVALID",V="PENDING",M="DISABLED";function Ue(t){return(G(t)?t.validators:t)||null}function Re(t){return Array.isArray(t)?_e(t):t||null}function He(t,e){return(G(e)?e.asyncValidators:t)||null}function Le(t){return Array.isArray(t)?Ce(t):t||null}function G(t){return t!=null&&!Array.isArray(t)&&typeof t=="object"}var $=class{constructor(e,r){this._pendingDirty=!1,this._hasOwnPendingAsyncValidator=!1,this._pendingTouched=!1,this._onCollectionChange=()=>{},this._parent=null,this.pristine=!0,this.touched=!1,this._onDisabledChange=[],this._assignValidators(e),this._assignAsyncValidators(r)}get validator(){return this._composedValidatorFn}set validator(e){this._rawValidators=this._composedValidatorFn=e}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(e){this._rawAsyncValidators=this._composedAsyncValidatorFn=e}get parent(){return this._parent}get valid(){return this.status===A}get invalid(){return this.status===P}get pending(){return this.status==V}get disabled(){return this.status===M}get enabled(){return this.status!==M}get dirty(){return!this.pristine}get untouched(){return!this.touched}get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(e){this._assignValidators(e)}setAsyncValidators(e){this._assignAsyncValidators(e)}addValidators(e){this.setValidators(re(e,this._rawValidators))}addAsyncValidators(e){this.setAsyncValidators(re(e,this._rawAsyncValidators))}removeValidators(e){this.setValidators(se(e,this._rawValidators))}removeAsyncValidators(e){this.setAsyncValidators(se(e,this._rawAsyncValidators))}hasValidator(e){return x(this._rawValidators,e)}hasAsyncValidator(e){return x(this._rawAsyncValidators,e)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(e={}){this.touched=!0,this._parent&&!e.onlySelf&&this._parent.markAsTouched(e)}markAllAsTouched(){this.markAsTouched({onlySelf:!0}),this._forEachChild(e=>e.markAllAsTouched())}markAsUntouched(e={}){this.touched=!1,this._pendingTouched=!1,this._forEachChild(r=>{r.markAsUntouched({onlySelf:!0})}),this._parent&&!e.onlySelf&&this._parent._updateTouched(e)}markAsDirty(e={}){this.pristine=!1,this._parent&&!e.onlySelf&&this._parent.markAsDirty(e)}markAsPristine(e={}){this.pristine=!0,this._pendingDirty=!1,this._forEachChild(r=>{r.markAsPristine({onlySelf:!0})}),this._parent&&!e.onlySelf&&this._parent._updatePristine(e)}markAsPending(e={}){this.status=V,e.emitEvent!==!1&&this.statusChanges.emit(this.status),this._parent&&!e.onlySelf&&this._parent.markAsPending(e)}disable(e={}){let r=this._parentMarkedDirty(e.onlySelf);this.status=M,this.errors=null,this._forEachChild(i=>{i.disable(m(h({},e),{onlySelf:!0}))}),this._updateValue(),e.emitEvent!==!1&&(this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(m(h({},e),{skipPristineCheck:r})),this._onDisabledChange.forEach(i=>i(!0))}enable(e={}){let r=this._parentMarkedDirty(e.onlySelf);this.status=A,this._forEachChild(i=>{i.enable(m(h({},e),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent}),this._updateAncestors(m(h({},e),{skipPristineCheck:r})),this._onDisabledChange.forEach(i=>i(!1))}_updateAncestors(e){this._parent&&!e.onlySelf&&(this._parent.updateValueAndValidity(e),e.skipPristineCheck||this._parent._updatePristine(),this._parent._updateTouched())}setParent(e){this._parent=e}getRawValue(){return this.value}updateValueAndValidity(e={}){this._setInitialStatus(),this._updateValue(),this.enabled&&(this._cancelExistingSubscription(),this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===A||this.status===V)&&this._runAsyncValidator(e.emitEvent)),e.emitEvent!==!1&&(this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._parent&&!e.onlySelf&&this._parent.updateValueAndValidity(e)}_updateTreeValidity(e={emitEvent:!0}){this._forEachChild(r=>r._updateTreeValidity(e)),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?M:A}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(e){if(this.asyncValidator){this.status=V,this._hasOwnPendingAsyncValidator=!0;let r=ge(this.asyncValidator(this));this._asyncValidationSubscription=r.subscribe(i=>{this._hasOwnPendingAsyncValidator=!1,this.setErrors(i,{emitEvent:e})})}}_cancelExistingSubscription(){this._asyncValidationSubscription&&(this._asyncValidationSubscription.unsubscribe(),this._hasOwnPendingAsyncValidator=!1)}setErrors(e,r={}){this.errors=e,this._updateControlsErrors(r.emitEvent!==!1)}get(e){let r=e;return r==null||(Array.isArray(r)||(r=r.split(".")),r.length===0)?null:r.reduce((i,n)=>i&&i._find(n),this)}getError(e,r){let i=r?this.get(r):this;return i&&i.errors?i.errors[e]:null}hasError(e,r){return!!this.getError(e,r)}get root(){let e=this;for(;e._parent;)e=e._parent;return e}_updateControlsErrors(e){this.status=this._calculateStatus(),e&&this.statusChanges.emit(this.status),this._parent&&this._parent._updateControlsErrors(e)}_initObservables(){this.valueChanges=new N,this.statusChanges=new N}_calculateStatus(){return this._allControlsDisabled()?M:this.errors?P:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(V)?V:this._anyControlsHaveStatus(P)?P:A}_anyControlsHaveStatus(e){return this._anyControls(r=>r.status===e)}_anyControlsDirty(){return this._anyControls(e=>e.dirty)}_anyControlsTouched(){return this._anyControls(e=>e.touched)}_updatePristine(e={}){this.pristine=!this._anyControlsDirty(),this._parent&&!e.onlySelf&&this._parent._updatePristine(e)}_updateTouched(e={}){this.touched=this._anyControlsTouched(),this._parent&&!e.onlySelf&&this._parent._updateTouched(e)}_registerOnCollectionChange(e){this._onCollectionChange=e}_setUpdateStrategy(e){G(e)&&e.updateOn!=null&&(this._updateOn=e.updateOn)}_parentMarkedDirty(e){let r=this._parent&&this._parent.dirty;return!e&&!!r&&!this._parent._anyControlsDirty()}_find(e){return null}_assignValidators(e){this._rawValidators=Array.isArray(e)?e.slice():e,this._composedValidatorFn=Re(this._rawValidators)}_assignAsyncValidators(e){this._rawAsyncValidators=Array.isArray(e)?e.slice():e,this._composedAsyncValidatorFn=Le(this._rawAsyncValidators)}};var T=new g("CallSetDisabledState",{providedIn:"root",factory:()=>F}),F="always";function $e(t,e){return[...e.path,t]}function We(t,e,r=F){ze(t,e),e.valueAccessor.writeValue(t.value),(t.disabled||r==="always")&&e.valueAccessor.setDisabledState?.(t.disabled),Ze(t,e),Ye(t,e),Xe(t,e),qe(t,e)}function oe(t,e){t.forEach(r=>{r.registerOnValidatorChange&&r.registerOnValidatorChange(e)})}function qe(t,e){if(e.valueAccessor.setDisabledState){let r=i=>{e.valueAccessor.setDisabledState(i)};t.registerOnDisabledChange(r),e._registerOnDestroy(()=>{t._unregisterOnDisabledChange(r)})}}function ze(t,e){let r=Te(t);e.validator!==null?t.setValidators(ne(r,e.validator)):typeof r=="function"&&t.setValidators([r]);let i=je(t);e.asyncValidator!==null?t.setAsyncValidators(ne(i,e.asyncValidator)):typeof i=="function"&&t.setAsyncValidators([i]);let n=()=>t.updateValueAndValidity();oe(e._rawValidators,n),oe(e._rawAsyncValidators,n)}function Ze(t,e){e.valueAccessor.registerOnChange(r=>{t._pendingValue=r,t._pendingChange=!0,t._pendingDirty=!0,t.updateOn==="change"&&Ve(t,e)})}function Xe(t,e){e.valueAccessor.registerOnTouched(()=>{t._pendingTouched=!0,t.updateOn==="blur"&&t._pendingChange&&Ve(t,e),t.updateOn!=="submit"&&t.markAsTouched()})}function Ve(t,e){t._pendingDirty&&t.markAsDirty(),t.setValue(t._pendingValue,{emitModelToViewChange:!1}),e.viewToModelUpdate(t._pendingValue),t._pendingChange=!1}function Ye(t,e){let r=(i,n)=>{e.valueAccessor.writeValue(i),n&&e.viewToModelUpdate(i)};t.registerOnChange(r),e._registerOnDestroy(()=>{t._unregisterOnChange(r)})}function Ke(t,e){if(!t.hasOwnProperty("model"))return!1;let r=t.model;return r.isFirstChange()?!0:!Object.is(e,r.currentValue)}function Je(t){return Object.getPrototypeOf(t.constructor)===E}function Qe(t,e){if(!e)return null;Array.isArray(e);let r,i,n;return e.forEach(s=>{s.constructor===he?r=s:Je(s)?i=s:n=s}),n||i||r||null}function ae(t,e){let r=t.indexOf(e);r>-1&&t.splice(r,1)}function le(t){return typeof t=="object"&&t!==null&&Object.keys(t).length===2&&"value"in t&&"disabled"in t}var et=class extends ${constructor(e=null,r,i){super(Ue(r),He(i,r)),this.defaultValue=null,this._onChange=[],this._pendingChange=!1,this._applyFormState(e),this._setUpdateStrategy(r),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),G(r)&&(r.nonNullable||r.initialValueIsDefault)&&(le(e)?this.defaultValue=e.value:this.defaultValue=e)}setValue(e,r={}){this.value=this._pendingValue=e,this._onChange.length&&r.emitModelToViewChange!==!1&&this._onChange.forEach(i=>i(this.value,r.emitViewToModelChange!==!1)),this.updateValueAndValidity(r)}patchValue(e,r={}){this.setValue(e,r)}reset(e=this.defaultValue,r={}){this._applyFormState(e),this.markAsPristine(r),this.markAsUntouched(r),this.setValue(this.value,r),this._pendingChange=!1}_updateValue(){}_anyControls(e){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(e){this._onChange.push(e)}_unregisterOnChange(e){ae(this._onChange,e)}registerOnDisabledChange(e){this._onDisabledChange.push(e)}_unregisterOnDisabledChange(e){ae(this._onDisabledChange,e)}_forEachChild(e){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(e){le(e)?(this.value=this._pendingValue=e.value,e.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=e}};var tt={provide:D,useExisting:f(()=>it)},ue=Promise.resolve(),it=(()=>{let e=class e extends D{constructor(i,n,s,o,l,c){super(),this._changeDetectorRef=l,this.callSetDisabledState=c,this.control=new et,this._registered=!1,this.name="",this.update=new N,this._parent=i,this._setValidators(n),this._setAsyncValidators(s),this.valueAccessor=Qe(this,o)}ngOnChanges(i){if(this._checkForErrors(),!this._registered||"name"in i){if(this._registered&&(this._checkName(),this.formDirective)){let n=i.name.previousValue;this.formDirective.removeControl({name:n,path:this._getPath(n)})}this._setUpControl()}"isDisabled"in i&&this._updateDisabled(i),Ke(i,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective&&this.formDirective.removeControl(this)}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(i){this.viewModel=i,this.update.emit(i)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){We(this.control,this,this.callSetDisabledState),this.control.updateValueAndValidity({emitEvent:!1})}_checkForErrors(){this._isStandalone()||this._checkParentType(),this._checkName()}_checkParentType(){}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name}_updateValue(i){ue.then(()=>{this.control.setValue(i,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(i){let n=i.isDisabled.currentValue,s=n!==0&&te(n);ue.then(()=>{s&&!this.control.disabled?this.control.disable():!s&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(i){return this._parent?$e(i,this._parent):[i]}};e.\u0275fac=function(n){return new(n||e)(a(H,9),a(fe,10),a(Ne,10),a(b,10),a(ee,8),a(T,8))},e.\u0275dir=u({type:e,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:[S.None,"disabled","isDisabled"],model:[S.None,"ngModel","model"],options:[S.None,"ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],features:[p([tt]),d,B]});let t=e;return t})();var nt={provide:b,useExisting:f(()=>st),multi:!0};var rt=(()=>{let e=class e{constructor(){this._accessors=[]}add(i,n){this._accessors.push([i,n])}remove(i){for(let n=this._accessors.length-1;n>=0;--n)if(this._accessors[n][1]===i){this._accessors.splice(n,1);return}}select(i){this._accessors.forEach(n=>{this._isSameGroup(n,i)&&n[1]!==i&&n[1].fireUncheck(i.value)})}_isSameGroup(i,n){return i[0].control?i[0]._parent===n._control._parent&&i[1].name===n.name:!1}};e.\u0275fac=function(n){return new(n||e)},e.\u0275prov=Z({token:e,factory:e.\u0275fac,providedIn:"root"});let t=e;return t})(),st=(()=>{let e=class e extends E{constructor(i,n,s,o){super(i,n),this._registry=s,this._injector=o,this.setDisabledStateFired=!1,this.onChange=()=>{},this.callSetDisabledState=X(T,{optional:!0})??F}ngOnInit(){this._control=this._injector.get(D),this._checkName(),this._registry.add(this._control,this)}ngOnDestroy(){this._registry.remove(this)}writeValue(i){this._state=i===this.value,this.setProperty("checked",this._state)}registerOnChange(i){this._fn=i,this.onChange=()=>{i(this.value),this._registry.select(this)}}setDisabledState(i){(this.setDisabledStateFired||i||this.callSetDisabledState==="whenDisabledForLegacyCode")&&this.setProperty("disabled",i),this.setDisabledStateFired=!0}fireUncheck(i){this.writeValue(i)}_checkName(){this.name&&this.formControlName&&(this.name,this.formControlName),!this.name&&this.formControlName&&(this.name=this.formControlName)}};e.\u0275fac=function(n){return new(n||e)(a(_),a(v),a(rt),a(Y))},e.\u0275dir=u({type:e,selectors:[["input","type","radio","formControlName",""],["input","type","radio","formControl",""],["input","type","radio","ngModel",""]],hostBindings:function(n,s){n&1&&C("change",function(){return s.onChange()})("blur",function(){return s.onTouched()})},inputs:{name:"name",formControlName:"formControlName",value:"value"},features:[p([nt]),d]});let t=e;return t})();var ot=new g("");var at={provide:b,useExisting:f(()=>be),multi:!0};function De(t,e){return t==null?`${e}`:(e&&typeof e=="object"&&(e="Object"),`${t}: ${e}`.slice(0,50))}function lt(t){return t.split(":")[0]}var be=(()=>{let e=class e extends E{constructor(){super(...arguments),this._optionMap=new Map,this._idCounter=0,this._compareWith=Object.is}set compareWith(i){this._compareWith=i}writeValue(i){this.value=i;let n=this._getOptionId(i),s=De(n,i);this.setProperty("value",s)}registerOnChange(i){this.onChange=n=>{this.value=this._getOptionValue(n),i(this.value)}}_registerOption(){return(this._idCounter++).toString()}_getOptionId(i){for(let n of this._optionMap.keys())if(this._compareWith(this._optionMap.get(n),i))return n;return null}_getOptionValue(i){let n=lt(i);return this._optionMap.has(n)?this._optionMap.get(n):i}};e.\u0275fac=(()=>{let i;return function(s){return(i||(i=y(e)))(s||e)}})(),e.\u0275dir=u({type:e,selectors:[["select","formControlName","",3,"multiple",""],["select","formControl","",3,"multiple",""],["select","ngModel","",3,"multiple",""]],hostBindings:function(n,s){n&1&&C("change",function(l){return s.onChange(l.target.value)})("blur",function(){return s.onTouched()})},inputs:{compareWith:"compareWith"},features:[p([at]),d]});let t=e;return t})(),Gt=(()=>{let e=class e{constructor(i,n,s){this._element=i,this._renderer=n,this._select=s,this._select&&(this.id=this._select._registerOption())}set ngValue(i){this._select!=null&&(this._select._optionMap.set(this.id,i),this._setElementValue(De(this.id,i)),this._select.writeValue(this._select.value))}set value(i){this._setElementValue(i),this._select&&this._select.writeValue(this._select.value)}_setElementValue(i){this._renderer.setProperty(this._element.nativeElement,"value",i)}ngOnDestroy(){this._select&&(this._select._optionMap.delete(this.id),this._select.writeValue(this._select.value))}};e.\u0275fac=function(n){return new(n||e)(a(v),a(_),a(be,9))},e.\u0275dir=u({type:e,selectors:[["option"]],inputs:{ngValue:"ngValue",value:"value"}});let t=e;return t})(),ut={provide:b,useExisting:f(()=>Ae),multi:!0};function de(t,e){return t==null?`${e}`:(typeof e=="string"&&(e=`'${e}'`),e&&typeof e=="object"&&(e="Object"),`${t}: ${e}`.slice(0,50))}function dt(t){return t.split(":")[0]}var Ae=(()=>{let e=class e extends E{constructor(){super(...arguments),this._optionMap=new Map,this._idCounter=0,this._compareWith=Object.is}set compareWith(i){this._compareWith=i}writeValue(i){this.value=i;let n;if(Array.isArray(i)){let s=i.map(o=>this._getOptionId(o));n=(o,l)=>{o._setSelected(s.indexOf(l.toString())>-1)}}else n=(s,o)=>{s._setSelected(!1)};this._optionMap.forEach(n)}registerOnChange(i){this.onChange=n=>{let s=[],o=n.selectedOptions;if(o!==void 0){let l=o;for(let c=0;c<l.length;c++){let w=l[c],j=this._getOptionValue(w.value);s.push(j)}}else{let l=n.options;for(let c=0;c<l.length;c++){let w=l[c];if(w.selected){let j=this._getOptionValue(w.value);s.push(j)}}}this.value=s,i(s)}}_registerOption(i){let n=(this._idCounter++).toString();return this._optionMap.set(n,i),n}_getOptionId(i){for(let n of this._optionMap.keys())if(this._compareWith(this._optionMap.get(n)._value,i))return n;return null}_getOptionValue(i){let n=dt(i);return this._optionMap.has(n)?this._optionMap.get(n)._value:i}};e.\u0275fac=(()=>{let i;return function(s){return(i||(i=y(e)))(s||e)}})(),e.\u0275dir=u({type:e,selectors:[["select","multiple","","formControlName",""],["select","multiple","","formControl",""],["select","multiple","","ngModel",""]],hostBindings:function(n,s){n&1&&C("change",function(l){return s.onChange(l.target)})("blur",function(){return s.onTouched()})},inputs:{compareWith:"compareWith"},features:[p([ut]),d]});let t=e;return t})(),Tt=(()=>{let e=class e{constructor(i,n,s){this._element=i,this._renderer=n,this._select=s,this._select&&(this.id=this._select._registerOption(this))}set ngValue(i){this._select!=null&&(this._value=i,this._setElementValue(de(this.id,i)),this._select.writeValue(this._select.value))}set value(i){this._select?(this._value=i,this._setElementValue(de(this.id,i)),this._select.writeValue(this._select.value)):this._setElementValue(i)}_setElementValue(i){this._renderer.setProperty(this._element.nativeElement,"value",i)}_setSelected(i){this._renderer.setProperty(this._element.nativeElement,"selected",i)}ngOnDestroy(){this._select&&(this._select._optionMap.delete(this.id),this._select.writeValue(this._select.value))}};e.\u0275fac=function(n){return new(n||e)(a(v),a(_),a(Ae,9))},e.\u0275dir=u({type:e,selectors:[["option"]],inputs:{ngValue:"ngValue",value:"value"}});let t=e;return t})();function ct(t){return typeof t=="number"?t:parseInt(t,10)}var ht=(()=>{let e=class e{constructor(){this._validator=ie}ngOnChanges(i){if(this.inputName in i){let n=this.normalizeInput(i[this.inputName].currentValue);this._enabled=this.enabled(n),this._validator=this._enabled?this.createValidator(n):ie,this._onChange&&this._onChange()}}validate(i){return this._validator(i)}registerOnValidatorChange(i){this._onChange=i}enabled(i){return i!=null}};e.\u0275fac=function(n){return new(n||e)},e.\u0275dir=u({type:e,features:[B]});let t=e;return t})();var ft={provide:fe,useExisting:f(()=>pt),multi:!0},pt=(()=>{let e=class e extends ht{constructor(){super(...arguments),this.inputName="maxlength",this.normalizeInput=i=>ct(i),this.createValidator=i=>Pe(i)}};e.\u0275fac=(()=>{let i;return function(s){return(i||(i=y(e)))(s||e)}})(),e.\u0275dir=u({type:e,selectors:[["","maxlength","","formControlName",""],["","maxlength","","formControl",""],["","maxlength","","ngModel",""]],hostVars:1,hostBindings:function(n,s){n&2&&K("maxlength",s._enabled?s.maxlength:null)},inputs:{maxlength:"maxlength"},features:[p([ft]),d]});let t=e;return t})();var Me=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=O({type:e}),e.\u0275inj=I({});let t=e;return t})();var jt=(()=>{let e=class e{static withConfig(i){return{ngModule:e,providers:[{provide:T,useValue:i.callSetDisabledState??F}]}}};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=O({type:e}),e.\u0275inj=I({imports:[Me]});let t=e;return t})(),Bt=(()=>{let e=class e{static withConfig(i){return{ngModule:e,providers:[{provide:ot,useValue:i.warnOnNgModelWithFormControl??"always"},{provide:T,useValue:i.callSetDisabledState??F}]}}};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=O({type:e}),e.\u0275inj=I({imports:[Me]});let t=e;return t})();export{b as a,Fe as b,he as c,fe as d,xt as e,it as f,st as g,be as h,Gt as i,Tt as j,pt as k,jt as l,Bt as m};