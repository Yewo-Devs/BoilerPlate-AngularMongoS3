import{a as ve,b as be}from"./chunk-LGFIFAB4.js";import"./chunk-UKOX6KUP.js";import{a as k}from"./chunk-UZCAFMJX.js";import{a as ue}from"./chunk-MRD36G6R.js";import{a as pe}from"./chunk-QAP7QYNJ.js";import{a as de}from"./chunk-U7I2NAGB.js";import"./chunk-FCOCPX37.js";import"./chunk-YZIVIYTJ.js";import{d as y,f as Z,g as ee,i as te,j as ie,k as re,l as ne,m as oe,n as ae,o as me,p as se,r as le}from"./chunk-DSHMKTRR.js";import"./chunk-ZEON36AT.js";import"./chunk-2MHBVPJL.js";import{a as ce}from"./chunk-PIAC254L.js";import"./chunk-PND7Q2S5.js";import{a as Y}from"./chunk-HOHR253E.js";import"./chunk-U3QUSVWF.js";import{j as Q,q as j}from"./chunk-W5MTSLKP.js";import{a as X}from"./chunk-G6VSAEU6.js";import{a as h}from"./chunk-5BAP7SGT.js";import{a as K}from"./chunk-JRLU6R7W.js";import{l as H,m as L,r as J}from"./chunk-VUEJJNO2.js";import{$b as U,Db as t,Eb as r,Fb as g,Gb as D,Hb as N,Jb as x,Nb as v,Ob as b,Qa as T,Rb as O,Ta as s,U as G,Ua as f,V as w,Xb as q,Yb as o,Z as W,_b as C,ac as M,bc as E,cb as z,cc as I,db as S,ha as c,ia as p,ib as _,ub as d}from"./chunk-XMVMWOPN.js";var F=class a{constructor(n){this.httpClient=n}createInvitation(n){return this.httpClient.post(`${h.apiUrl}team/invite`,n)}getTeamById(n){return this.httpClient.get(`${h.apiUrl}team/get-team?id=${n}`)}getAllUserTeams(n){return this.httpClient.get(`${h.apiUrl}team/get-user-teams?userId=${n}`)}createTeam(n){return this.httpClient.post(`${h.apiUrl}team/create`,n)}updateTeam(n){return this.httpClient.put(`${h.apiUrl}team/update`,n)}deleteTeam(n){return this.httpClient.delete(`${h.apiUrl}team/delete?id=${n}`)}acceptInvite(n,i,e){return this.httpClient.put(`${h.apiUrl}team/accept-invite?teamId=${n}&inviteId=${i}&userId=${e}`,{})}static \u0275fac=function(i){return new(i||a)(W(K))};static \u0275prov=G({token:a,factory:a.\u0275fac,providedIn:"root"})};function _e(a,n){if(a&1&&(t(0,"div",52),g(1,"img",53),r()),a&2){let i=b().$implicit;s(),O("src",i.teamPhotoUrl,T)}}function xe(a,n){if(a&1){let i=x();D(0),t(1,"div",45)(2,"div",46),_(3,_e,2,1,"div",47),t(4,"div",48)(5,"p",49),o(6),r(),t(7,"p",10),o(8),r()(),t(9,"div",50)(10,"a",51),v("click",function(){let m=c(i).$implicit,l=b();return p(l.viewTeam(m))}),o(11," View "),r()()()(),N()}if(a&2){let i=n.$implicit;s(3),d("ngIf",i.teamPhotoUrl),s(3),C(" ",i.name," "),s(2),U(" ",i.members.length," ",i.members.length===1?"member":"members"," ")}}function ye(a,n){if(a&1&&(t(0,"div",52),g(1,"img",53),r()),a&2){let i=b().$implicit;s(),O("src",i.photoUrl,T)}}function we(a,n){if(a&1){let i=x();t(0,"button",57),v("click",function(){c(i);let m=b().$implicit,l=b();return p(l.removeFromTeam(m.userId))}),o(1," Remove "),r()}if(a&2){let i=b(2);d("disabled",!i.isOwner())}}function Te(a,n){if(a&1){let i=x();t(0,"button",58),v("click",function(){c(i);let m=b().$implicit,l=b();return p(l.showDialogEditMember(m.userId))}),o(1," Edit "),r()}if(a&2){let i=b(2);d("disabled",!i.isOwner())}}function Se(a,n){if(a&1&&(D(0),t(1,"div",45)(2,"div",46),_(3,ye,2,1,"div",47),t(4,"div",48)(5,"p",49),o(6),r(),t(7,"p",10),o(8),r()(),t(9,"div",54),_(10,we,2,1,"button",55)(11,Te,2,1,"button",56),r()()(),N()),a&2){let i=n.$implicit,e=b();s(3),d("ngIf",i.photoUrl),s(3),U(" ",i.firstName," ",i.lastName," "),s(2),C(" ",e.getRole(i.userId)," "),s(2),d("ngIf",e.getRole(i.userId)!=="Owner"),s(),d("ngIf",e.getRole(i.userId)!=="Owner")}}var V=class a{constructor(n,i,e,m,l,u,Me){this.teamService=n;this.route=i;this.busyService=e;this.toastService=m;this.preferencesService=l;this.profileService=u;this.fb=Me;this.prefs=this.preferencesService.getPreferences(),this.route.queryParams.subscribe($=>{let A=$.teamId,B=$.inviteId;A&&B&&(this.busyService.busy(),this.teamService.acceptInvite(A,B,this.prefs.user.id).subscribe(ge=>{this.toastService.success("Invitation accepted"),this.busyService.idle(),window.location.href=window.location.origin+window.location.pathname},ge=>{this.toastService.error("Failed to accept invitation"),this.busyService.idle()}))}),this.teamForm=this.fb.group({teamPhotoUrl:[""],name:["",y.required]}),this.memberForm=this.fb.group({emails:["",y.required],role:["",y.required]}),this.editMemberForm=this.fb.group({role:["",y.required]})}teams=[];selectedTeam;prefs;teamForm;memberForm;editMemberForm;ngOnInit(){this.busyService.busy(),this.teamService.getAllUserTeams(this.prefs.user.id).subscribe(n=>{this.teams=n,this.viewTeam(this.teams[0]),this.busyService.idle()})}visibleNewTeam=!1;showDialogNewTeam(){this.visibleNewTeam=!0}visibleNewMember=!1;showDialogNewMember(){this.visibleNewMember=!0}visibleEditMember=!1;selectedUserId;showDialogEditMember(n){this.visibleEditMember=!0,this.selectedUserId=n,this.editMemberForm.get("role").setValue(this.getRole(n))}removePhoto(){this.teamForm.get("teamPhotoUrl").setValue("")}updatePhoto(n){let i=n.target;if(i.files&&i.files[0]){let e=new FileReader;e.onload=m=>{this.teamForm.get("teamPhotoUrl").setValue(m.target.result)},e.readAsDataURL(i.files[0])}}createTeam(){let n={teamPhotoUrl:this.teamForm.get("teamPhotoUrl").value,name:this.teamForm.get("name").value,members:[{userId:this.prefs.user.id,role:"Owner"}],invites:[]};this.busyService.busy(),this.teamService.createTeam(n).subscribe(i=>{this.toastService.success("Team created successfully"),this.visibleNewTeam=!1,this.teams.push(i),this.viewTeam(this.teams[0]),this.busyService.idle()},i=>{this.toastService.error("Failed to create team"),this.busyService.idle()})}teamMembers=[];viewTeam(n){n&&(this.selectedTeam=n,this.teamMembers=[],n.members.forEach(i=>{this.profileService.getProfile(i.userId).subscribe(e=>{this.teamMembers.find(m=>m.userId===e.userId)||this.teamMembers.push(e)})}))}getRole(n){return this.selectedTeam?this.selectedTeam.members.find(i=>i.userId===n).role:""}isOwner(){return this.getRole(this.prefs.user.id)==="Owner"}addMembers(){let n=this.memberForm.get("emails").value.split(","),i=this.memberForm.get("role").value;n.forEach(e=>{let m={teamId:this.selectedTeam.id,email:e,role:i};this.teamService.createInvitation(m).subscribe(l=>{this.toastService.success("Invitation sent to "+e),this.visibleNewMember=!1},l=>{this.toastService.error("Failed to send invitation to "+e)})})}removeFromTeam(n){let i={id:this.selectedTeam.id,name:this.selectedTeam.name,members:this.selectedTeam.members.filter(e=>e.userId!==n),invites:this.selectedTeam.invites};this.busyService.busy(),this.teamService.updateTeam(i).subscribe(e=>{this.toastService.success("Member removed from team"),this.busyService.idle(),window.location.reload()},e=>{this.toastService.error("Failed to remove member from team"),this.busyService.idle()})}editTeamMember(){let n={id:this.selectedTeam.id,name:this.selectedTeam.name,members:this.selectedTeam.members,invites:this.selectedTeam.invites},i=this.editMemberForm.get("role").value;n.members.forEach(e=>{e.userId===this.selectedUserId&&(e.role=i)}),this.busyService.busy(),this.teamService.updateTeam(n).subscribe(e=>{this.toastService.success("Member updated"),this.busyService.idle(),window.location.reload()},e=>{this.toastService.error("Failed to update member"),this.busyService.idle()})}static \u0275fac=function(i){return new(i||a)(f(F),f(Q),f(ce),f(Y),f(X),f(ue),f(se))};static \u0275cmp=z({type:a,selectors:[["app-team"]],standalone:!1,decls:136,vars:25,consts:[["fileInput",""],[1,"bg-gray-50","dark:bg-neutral-900"],[1,"py-6"],[1,"px-4","mx-auto","sm:px-6","md:px-8"],[1,"max-w-md"],[1,"text-lg","font-bold","text-gray-900","dark:text-white"],[1,"mt-2","text-sm","font-medium","leading-6","text-gray-500"],[1,"px-4","mx-auto","mt-8","sm:px-6","md:px-8"],[1,"mt-8"],[1,"text-base","font-bold","text-gray-900","dark:text-white"],[1,"mt-1","text-sm","font-medium","text-gray-500"],[1,"mt-6","border-gray-200","dark:border-neutral-600"],[1,"px-4","mx-auto","mt-8","max-w-7xl"],[1,"mt-8","overflow-hidden","bg-white","dark:bg-transparent","border","border-gray-200","dark:border-neutral-600","rounded-xl"],[1,"px-4","py-5","sm:p-6"],[1,"sm:flex","sm:items-center","sm:justify-between"],[1,"mt-4","sm:mt-0"],["type","button",1,"inline-flex","items-center","justify-center","px-5","py-3","text-sm","font-semibold","leading-4","text-white","transition-all","duration-200","bg-indigo-600","border","border-transparent","rounded-md","focus:outline-none","focus:ring-2","focus:ring-offset-2","focus:ring-indigo-600","hover:bg-indigo-500",3,"click"],[3,"visibleChange","modal","visible"],[1,"w-full","max-w-sm","bg-white","dark:bg-transparent","shadow-lg","rounded-xl"],[1,"text-xl","font-bold","text-gray-900","dark:text-white"],[1,"mt-3","text-sm","font-medium","text-gray-500"],[1,"mt-6",3,"formGroup"],[1,"space-y-4"],["for","",1,"text-sm","font-bold","text-gray-900","dark:text-white"],[1,"sm:col-span-2"],[1,"flex","items-center","space-x-6"],["loading","lazy","alt","",1,"flex-shrink-0","object-cover","w-12","h-12","rounded-lg",3,"src"],["type","button",1,"text-sm","font-semibold","text-gray-400","transition-all","duration-200","rounded-md","hover:text-gray-600","focus:outline-none","focus:ring-2","focus:ring-offset-2","focus:ring-gray-600",3,"click"],["type","button",1,"text-sm","font-semibold","text-indigo-600","transition-all","duration-200","rounded-md","hover:text-indigo-700","focus:outline-none","focus:ring-2","focus:ring-offset-2","focus:ring-indigo-600",3,"click"],["type","file",2,"display","none",3,"change"],[1,"mt-2"],[3,"type","formControl","placeholder","label"],[1,"flex","items-center","justify-end","mt-5","space-x-4"],["type","reset",1,"inline-flex","items-center","justify-center","px-6","py-3","text-sm","font-semibold","leading-5","text-gray-600","transition-all","duration-200","bg-white","dark:bg-transparent","border","border-gray-300","rounded-md","focus:outline-none","focus:ring-2","focus:ring-offset-2","focus:ring-gray-500","hover:bg-gray-50","hover:text-gray-900","dark:text-white",3,"click"],[1,"inline-flex","items-center","justify-center","px-6","py-3","text-sm","font-semibold","leading-5","text-white","transition-all","duration-200","bg-indigo-600","border","border-transparent","rounded-md","focus:outline-none","focus:ring-2","focus:ring-offset-2","focus:ring-indigo-600","hover:bg-indigo-500",3,"click","disabled"],[1,"flow-root","mt-8"],[1,"-my-5","divide-y","divide-gray-100","dark:divide-neutral-600"],[4,"ngFor","ngForOf"],[1,"inline-flex","items-center","justify-center","px-5","py-3","text-sm","font-semibold","leading-4","text-white","transition-all","duration-200","bg-indigo-600","border","border-transparent","rounded-md","focus:outline-none","focus:ring-2","focus:ring-offset-2","focus:ring-indigo-600","hover:bg-indigo-500",3,"click","disabled"],[1,"mt-2","custom-select"],["formControlName","role",1,"block","w-full","px-4","py-3","placeholder-gray-500","border","-gray-300","rounded-lg","focus:ring-gray-900","focus:border-gray-900","sm:text-sm","caret-gray-900"],["value","Manager"],["value","Editor"],["value","Viewer"],[1,"py-5"],[1,"flex","items-center"],["class","relative flex-shrink-0",4,"ngIf"],[1,"ml-4"],[1,"text-sm","font-bold","text-gray-900","dark:text-white"],[1,"ml-auto"],[1,"text-sm","font-medium","text-gray-400","transition-all","duration-200","hover:text-gray-900","dark:text-white",3,"click"],[1,"relative","flex-shrink-0"],["loading","lazy","alt","",1,"object-cover","w-10","h-10","rounded-full",3,"src"],[1,"flex","items-center","justify-end","ml-auto","space-x-8"],["class","text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900 dark:text-white",3,"disabled","click",4,"ngIf"],["class","text-sm font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700",3,"disabled","click",4,"ngIf"],[1,"text-sm","font-medium","text-gray-400","transition-all","duration-200","hover:text-gray-900","dark:text-white",3,"click","disabled"],[1,"text-sm","font-medium","text-indigo-600","transition-all","duration-200","hover:text-indigo-700",3,"click","disabled"]],template:function(i,e){if(i&1){let m=x();t(0,"main",1)(1,"div",2)(2,"div",3)(3,"div",4)(4,"h1",5),o(5," Settings "),r(),t(6,"p",6),o(7," Manage your team settings and preferences here. "),r()()(),t(8,"div",7),g(9,"app-nav-bread-crumb"),t(10,"div",8)(11,"h1",9),o(12,"Team"),r(),t(13,"p",10),o(14," View and manage your team members. "),r()(),g(15,"hr",11),t(16,"main")(17,"div",2)(18,"div",12)(19,"div",13)(20,"div",14)(21,"div",15)(22,"div")(23,"p",9),o(24," My Teams "),r(),t(25,"p",10),o(26," Here are the teams you are a part of. "),r()(),t(27,"div",16)(28,"button",17),v("click",function(){return c(m),p(e.showDialogNewTeam())}),o(29," Create Team "),r()()(),t(30,"p-dialog",18),I("visibleChange",function(u){return c(m),E(e.visibleNewTeam,u)||(e.visibleNewTeam=u),p(u)}),t(31,"div",19)(32,"div",14)(33,"p",20),o(34," Create New Team "),r(),t(35,"p",21),o(36," Fill out the form below to create a new team. "),r(),t(37,"form",22)(38,"div",23)(39,"div")(40,"label",24),o(41," Team Photo "),r(),t(42,"div",16)(43,"div",25)(44,"div",26),g(45,"img",27),t(46,"button",28),v("click",function(){return c(m),p(e.removePhoto())}),o(47," Remove "),r(),t(48,"button",29),v("click",function(){c(m);let u=q(51);return p(u.click())}),o(49," Select "),r(),t(50,"input",30,0),v("change",function(u){return c(m),p(e.updatePhoto(u))}),r()()()()()(),t(52,"div",23)(53,"div")(54,"label",24),o(55," Team Name "),r(),t(56,"div",31),g(57,"app-text-input",32),r()()(),t(58,"div",33)(59,"button",34),v("click",function(){return c(m),e.visibleNewTeam=!1,p(e.teamForm.reset())}),o(60," Cancel "),r(),t(61,"button",35),v("click",function(){return c(m),p(e.teamForm.valid&&e.createTeam())}),o(62," Add "),r()()()()()(),t(63,"div",36)(64,"div",37),_(65,xe,12,4,"ng-container",38),r()()()(),t(66,"div",13)(67,"div",14)(68,"div",15)(69,"div")(70,"p",9),o(71),r(),t(72,"p",10),o(73," Manage your team members here. "),r()(),t(74,"div",16)(75,"button",39),v("click",function(){return c(m),p(e.showDialogNewMember())}),o(76," Add New Member "),r()()(),t(77,"p-dialog",18),I("visibleChange",function(u){return c(m),E(e.visibleNewMember,u)||(e.visibleNewMember=u),p(u)}),t(78,"div",19)(79,"div",14)(80,"p",20),o(81," Add New Members "),r(),t(82,"p",21),o(83," Enter the email addresses of new members, separated by commas. "),r(),t(84,"form",22)(85,"div",23)(86,"div")(87,"label",24),o(88,"Email Addresses"),r(),t(89,"div",31),g(90,"app-text-input",32),r()()(),t(91,"div",23)(92,"div")(93,"label",24),o(94,"Role"),r(),t(95,"div",40)(96,"select",41)(97,"option",42),o(98,"Manager"),r(),t(99,"option",43),o(100,"Editor"),r(),t(101,"option",44),o(102,"Viewer"),r()()()()(),t(103,"div",33)(104,"button",34),v("click",function(){return c(m),e.visibleNewMember=!1,p(e.memberForm.reset())}),o(105," Cancel "),r(),t(106,"button",35),v("click",function(){return c(m),p(e.memberForm.valid&&e.addMembers())}),o(107," Add "),r()()()()()(),t(108,"p-dialog",18),I("visibleChange",function(u){return c(m),E(e.visibleEditMember,u)||(e.visibleEditMember=u),p(u)}),t(109,"div",19)(110,"div",14)(111,"p",20),o(112," Edit Member Role "),r(),t(113,"p",21),o(114," Change the role of the selected member. "),r(),t(115,"form",22)(116,"div",23)(117,"div")(118,"label",24),o(119,"Role"),r(),t(120,"div",40)(121,"select",41)(122,"option",42),o(123,"Manager"),r(),t(124,"option",43),o(125,"Editor"),r(),t(126,"option",44),o(127,"Viewer"),r()()()()(),t(128,"div",33)(129,"button",34),v("click",function(){return c(m),e.visibleEditMember=!1,p(e.editMemberForm.reset())}),o(130," Cancel "),r(),t(131,"button",35),v("click",function(){return c(m),p(e.editMemberForm.valid&&e.editTeamMember())}),o(132," Save "),r()()()()()(),t(133,"div",36)(134,"div",37),_(135,Se,12,6,"ng-container",38),r()()()()()()()()()()}i&2&&(s(30),d("modal",!0),M("visible",e.visibleNewTeam),s(7),d("formGroup",e.teamForm),s(8),d("src",e.teamForm.get("teamPhotoUrl").value?e.teamForm.get("teamPhotoUrl").value:"../../../../assets/images/img.svg",T),s(12),d("type","text")("formControl",e.teamForm.get("name"))("placeholder","Team Name")("label","team name"),s(4),d("disabled",!e.teamForm.valid),s(4),d("ngForOf",e.teams),s(6),C(" ",e.selectedTeam?e.selectedTeam.name:"Team"," Members "),s(4),d("disabled",!e.isOwner()),s(2),d("modal",!0),M("visible",e.visibleNewMember),s(7),d("formGroup",e.memberForm),s(6),d("type","text")("formControl",e.memberForm.get("emails"))("placeholder","Email Addresses")("label","email addresses"),s(16),d("disabled",!e.memberForm.valid),s(2),d("modal",!0),M("visible",e.visibleEditMember),s(7),d("formGroup",e.editMemberForm),s(16),d("disabled",!e.editMemberForm.valid),s(4),d("ngForOf",e.teamMembers))},dependencies:[k,te,ae,me,oe,Z,ee,ie,re,ne,H,L,ve,pe],styles:['[_nghost-%COMP%]     .p-dialog-header{display:none}[_nghost-%COMP%]     .p-dialog .p-dialog-content:last-of-type{border-radius:6px}[_nghost-%COMP%]     .p-dialog .p-dialog-content{padding:0}a[_ngcontent-%COMP%]{cursor:pointer}.custom-select[_ngcontent-%COMP%]{position:relative}.select-selected[_ngcontent-%COMP%]:after{position:absolute;content:"";top:14px;right:100px;width:0;height:0;border:6px solid transparent;border-color:#fff transparent transparent transparent}.select-selected.select-arrow-active[_ngcontent-%COMP%]:after{border-color:transparent transparent #fff transparent;top:7px}.select-items[_ngcontent-%COMP%]   div[_ngcontent-%COMP%], .select-selected[_ngcontent-%COMP%]{color:#fff;padding:8px 16px;border:1px solid transparent;border-color:transparent transparent rgba(0,0,0,.1) transparent;cursor:pointer}.select-items[_ngcontent-%COMP%]{position:absolute;background-color:#1e90ff;top:100%;left:0;right:0;z-index:99}.select-hide[_ngcontent-%COMP%]{display:none}.select-items[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:hover, .same-as-selected[_ngcontent-%COMP%]{background-color:#0000001a}@media (max-width: 768px){[_nghost-%COMP%]     .p-dialog{width:90%!important}}']})};var Ce=[{path:"",component:V}],P=class a{static \u0275fac=function(i){return new(i||a)};static \u0275mod=S({type:a});static \u0275inj=w({imports:[j.forChild(Ce),j]})};var fe=class a{static \u0275fac=function(i){return new(i||a)};static \u0275mod=S({type:a});static \u0275inj=w({imports:[k,le,J,P,be,de]})};export{fe as TeamModule};
