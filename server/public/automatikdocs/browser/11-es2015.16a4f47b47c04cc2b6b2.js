(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{gA4M:function(e,i,t){"use strict";t.r(i),t.d(i,"SearchModule",(function(){return B}));var r=t("ofXK"),n=t("M0ag"),s=t("tyNb"),o=t("ey9i"),c=t("fXoL"),a=t("3Pt+");const b=["userFormsTab"],l=["predictionsContainer"],d=function(e){return["/static/modelos/",e]};function u(e,i){if(1&e&&(c.Qb(0,"div",73),c.zc(1),c.Pb()),2&e){const e=i.$implicit;c.ic("routerLink",c.lc(2,d,e.id)),c.zb(1),c.Bc(" ",e.title," ")}}function h(e,i){1&e&&(c.Qb(0,"span"),c.zc(1,", "),c.Pb())}function m(e,i){if(1&e&&(c.Qb(0,"span"),c.zc(1),c.yc(2,h,2,0,"span",90),c.Pb()),2&e){const e=i.$implicit,t=i.index,r=c.dc().$implicit;c.zb(1),c.Ac(e),c.zb(1),c.ic("ngIf",r.tags.length!==t+1)}}const f=function(e){return["/fill-form",e]},_=function(e){return["/profile",e]};function v(e,i){if(1&e&&(c.Qb(0,"div",74),c.Qb(1,"div",75),c.Qb(2,"div",76),c.Qb(3,"div",77),c.Qb(4,"span"),c.zc(5),c.ec(6,"date"),c.Pb(),c.Pb(),c.Qb(7,"div",78),c.Qb(8,"span"),c.zc(9),c.Pb(),c.Pb(),c.Qb(10,"div",79),c.Qb(11,"span"),c.zc(12),c.Pb(),c.Pb(),c.Qb(13,"div",80),c.Qb(14,"div",81),c.Mb(15,"span",82),c.Qb(16,"span"),c.zc(17),c.Pb(),c.Pb(),c.Qb(18,"div",83),c.Mb(19,"span",84),c.Qb(20,"span"),c.zc(21),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Qb(22,"div",85),c.Qb(23,"div",86),c.Mb(24,"img",87),c.Qb(25,"span",48),c.zc(26),c.Pb(),c.Pb(),c.Qb(27,"div",88),c.Qb(28,"span"),c.yc(29,m,3,2,"span",89),c.Pb(),c.Pb(),c.Pb(),c.Pb()),2&e){const e=i.$implicit;c.zb(1),c.ic("routerLink",c.lc(13,f,e.slug)),c.zb(4),c.Ac(c.fc(6,10,e.updatedAt,"dd/MM/yyyy")),c.zb(4),c.Ac(e.title),c.zb(3),c.Ac(e.description.substring(0,136)),c.zb(5),c.Ac(e.likesCount),c.zb(4),c.Ac(e.viewsCount),c.zb(3),c.jc("src",e.author.image?e.author.image:"assets/images/avatar.jpeg",c.tc),c.zb(1),c.ic("routerLink",c.lc(15,_,e.author.username)),c.zb(1),c.Ac(e.author.username),c.zb(3),c.ic("ngForOf",e.tags)}}function p(e,i){1&e&&(c.cc(),c.bc(),c.Qb(0,"div",91),c.Qb(1,"h2"),c.zc(2,"- No hay m\xe1s formularios a cargar -"),c.Pb(),c.Pb())}const P=function(){return["/static/modelos/","estatutos-asociacion"]},Q=function(){return["/static/modelos/","acta-constitucion-asociacion"]},g=function(){return["/static/modelos/","estatutos-sociedad-limitada"]},z=function(){return["/static/modelos/","estatutos-sociedad-limitada-profesional"]},y=function(){return["/static/modelos/","estatutos-ute"]},w=function(){return["/static/modelos/","estatutos-sociedad-limitada-unipersonal"]},k=function(){return["/static/modelos/","contrato-trabajo"]},M=function(){return["/static/modelos/","contrato-trabajo-fijo-discontinuo"]},L=function(){return["/static/modelos/","contrato-arrendamiento-habitacion"]},C=function(){return["/static/modelos/","contrato-arrendamiento-vivienda"]},F=function(){return["/static/modelos/","contrato-arrendamiento-vivienda-vacacional"]},S=function(){return["/static/modelos/","contrato-arrendamiento-plaza-garaje"]},I=function(){return["/static/modelos/","contrato-compraventa-inmueble"]},x=function(){return["/static/modelos/","contrato-compraventa-vehiculo"]},T=function(){return["/static/modelos/","declaracion-jurada"]},D=function(){return["/static/modelos/","requerimiento-pago"]};let E=(()=>{class e{constructor(e,i,t,r){this.userService=e,this.searchService=i,this.commonsService=t,this.location=r,this.listConfig=new o.j,this.loadingQuery=!1,this.results=[],this.limit=10,this.currentPage=1,this.noMoreForms=!1,this.userFormsTabsActive=!1,this.formsFirstLoad=!1,this.allPredictions=[],this.predictions=[]}ngOnInit(){this.loadingQuery=!0,this.listConfig.orderBy="Date",this.setListTo(),this.userService.isAuthenticated.subscribe(e=>{this.isAuthenticated=e,this.userService.currentUser.subscribe(e=>{this.currentUser=e.username})}),this.searchService.getAllFormsList().subscribe(e=>{this.allPredictions=e})}ngAfterViewInit(){this.commonsService.isServer()?"/search/user-forms"===this.commonsService.getServerReq().originalUrl&&this.searchService.search(this.listConfig).subscribe(e=>{this.results=e}):"/search/user-forms"===window.location.pathname?this.userFormsTab.nativeElement.click():this.location.replaceState("/")}setListTo(){this.listConfig={limit:this.limit,orderBy:"Date",offset:this.limit*(this.currentPage-1),query:"",public:!0}}setVisibilityOfFooter(e){document.getElementsByTagName("footer")[0].hidden=e}moreForms(){this.loadingQuery=!0,this.setPageTo(),this.limit&&(this.listConfig.limit=this.limit,this.listConfig.offset=this.limit*(this.currentPage-1)),this.searchService.search(this.listConfig).subscribe(e=>{0!==e.length?(this.results=this.results.concat(e),this.setVisibilityOfFooter(!0)):(this.noMoreForms=!0,this.setVisibilityOfFooter(!1)),this.loadingQuery=!1})}onScroll(){this.loadingQuery||this.noMoreForms||!this.userFormsTabsActive||window.innerHeight+window.scrollY>=document.body.offsetHeight&&this.moreForms()}search(e){this.loadingQuery=!0,this.listConfig.offset=0,this.currentPage=1,this.results=[],this.noMoreForms=!1,this.listConfig.query=e,this.searchService.search(this.listConfig).subscribe(e=>{this.loadingQuery=!1,this.results=e})}setPredictions(e){const i=e.target.value;this.predictions=i?this.allPredictions.map(e=>{if(e.title.toLowerCase().includes(i.toLowerCase()))return e}).filter(e=>{if(e)return e}):[]}showPredictions(){this.predictionsContainer.nativeElement.style.display="block"}hidePredictions(){let e=!0;document.querySelectorAll(":hover").forEach(i=>{i.classList.contains("lawyer-forms__title__finder__predictions")&&(e=!1)}),e&&(this.predictionsContainer.nativeElement.style.display="none")}setPageTo(){this.currentPage+=1}setOrder(e){this.loadingQuery=!0,this.listConfig.offset=0,this.currentPage=1,this.results=[],this.noMoreForms=!1,this.listConfig.orderBy=e,this.searchService.search(this.listConfig).subscribe(e=>{this.loadingQuery=!1,this.results=e})}setUrl(e){this.formsFirstLoad||this.searchService.search(this.listConfig).subscribe(e=>{this.loadingQuery=!1,this.results=e,this.formsFirstLoad=!0}),this.userFormsTabsActive=e,this.location.replaceState(e?"/search/user-forms":"/")}}return e.\u0275fac=function(i){return new(i||e)(c.Lb(o.w),c.Lb(o.q),c.Lb(o.e),c.Lb(r.n))},e.\u0275cmp=c.Fb({type:e,selectors:[["app-search"]],viewQuery:function(e,i){var t;1&e&&(c.Dc(b,!0),c.Dc(l,!0)),2&e&&(c.oc(t=c.ac())&&(i.userFormsTab=t.first),c.oc(t=c.ac())&&(i.predictionsContainer=t.first))},hostBindings:function(e,i){1&e&&c.Zb("scroll",(function(){return i.onScroll()}),!1,c.qc)},decls:194,vars:37,consts:[["id","lawyer-forms",1,"lawyer-forms","sub-menu-target"],[1,"lawyer-forms__container"],[1,"lawyer-forms__header"],[1,"lawyer-forms__top-right-link"],["routerLink","/search/search-transaction"],[1,"icon","icon-search"],[1,"lawyer-forms__title"],[1,"lawyer-forms__title__container"],[1,"lawyer-forms__title__finder"],[1,"search__button"],["type","text",3,"input","focus","blur"],[1,"lawyer-forms__title__finder__predictions"],["predictionsContainer",""],[1,"lawyer-forms__title__finder__predictions__container"],["class","lawyer-forms__title__finder__predictions__prediction",3,"routerLink",4,"ngFor","ngForOf"],[1,"lawyer-forms__title__icon"],["id","Capa_1","enable-background","new 0 0 512 512","height","512","viewBox","0 0 512 512","width","512","xmlns","http://www.w3.org/2000/svg"],["clip-rule","evenodd","d","m73.207 333.445-65.422-181.86c-.94-2.648.456-5.582 3.104-6.55 86.014-30.927 182.936-59.69 265.788-95.031 3.703-2.335 6.608-.028 8.203 4.386l102.789 264.873 27.912 77.602c.94 2.648-.427 5.61-3.076 6.55l-196.692 70.711-76.672 27.567c-2.649.968-5.582-.427-6.551-3.076z","fill","#fff","fill-rule","evenodd"],["clip-rule","evenodd","d","m127.748 273.1-32.668-190.46c-.484-2.791 1.396-5.439 4.158-5.923l224.974-38.559 51.523-8.486c2.82-1.225 7.405.199 8.487 6.493l55.653 277.831 13.927 81.276c.484 2.762-1.396 5.439-4.158 5.923l-206.006 35.313-80.317 13.783c-2.763.456-5.44-1.424-5.924-4.186z","fill","#fff","fill-rule","evenodd"],["clip-rule","evenodd","d","m190.778 216.942v183.113c0 2.933 2.392 5.354 5.326 5.354h85.017 125.859 18.086 74.109c2.934 0 5.326-2.421 5.326-5.354v-86.032-237.649-2.478h-54.115c-5.212 0-16.035.74-16.035-11.078l-.114-52.827h-238.133c-2.934 0-5.326 2.392-5.326 5.325v45.707 19.337z","fill","#fff","fill-rule","evenodd"],["clip-rule","evenodd","d","m100.492 114.222c-30.475 10.252-60.665 20.419-89.602 30.813-2.649.968-4.044 3.901-3.104 6.55l65.422 181.86 59.384 165.172c.968 2.648 3.902 4.044 6.551 3.076l76.672-27.567 174.705-62.794z","fill","#b5c4cf","fill-rule","evenodd"],["clip-rule","evenodd","d","m190.778 61.025-91.539 15.691c-2.763.484-4.642 3.133-4.158 5.923l5.411 31.582 27.256 158.879 29.649 173.004c.484 2.762 3.161 4.642 5.924 4.186l80.317-13.783 146.878-25.175 34.548-5.923h-18.084z","fill","#d7e7ec","fill-rule","evenodd"],["clip-rule","evenodd","d","m504.5 314.023v-237.649-2.478-.826c0-1.538-.655-1.794-3.019-4.101l-58.415-55.703c-2.763-2.62-3.218-3.275-4.842-3.275h-3.987-238.133c-2.934 0-5.326 2.392-5.326 5.325v384.737c0 2.933 2.392 5.354 5.326 5.354h303.07c2.934 0 5.326-2.421 5.326-5.354z","fill","#edf3f4","fill-rule","evenodd"],["clip-rule","evenodd","d","m190.778 61.025-21.446 3.674v355.035c0 2.962 2.392 5.354 5.326 5.354h85.017 50.583l80.26-13.755 34.548-5.923h-18.086-22.244-103.615-85.017c-2.934 0-5.326-2.421-5.326-5.354 0-113.002 0-226.031 0-339.031z","fill","#b5c4cf","fill-rule","evenodd"],["clip-rule","evenodd","d","m127.748 273.1-27.257-158.878c-7.377 2.478-14.725 4.955-22.045 7.433l3.389 19.735 27.257 158.878 29.678 173.004c.456 2.762 3.133 4.642 5.896 4.186l80.317-13.783 38.108-6.521 114.78-41.293-1.367-2.136-66.248 11.363-66.618 11.42-80.317 13.783c-2.763.456-5.44-1.424-5.924-4.186z","fill","#9aafb7","fill-rule","evenodd"],["clip-rule","evenodd","d","m504.5 314.023v-237.649-2.478c0-2.876-.94-2.905-3.019-4.927l-58.415-55.703c-2.763-2.62-3.218-3.275-4.842-3.275h-3.987-59.27c72.428 96.939 76.558 271.68 22.814 380.75-2.478 5.069-5.07 9.939-7.775 14.666h16.975 18.086 74.109c2.934 0 5.326-2.421 5.326-5.354v-86.03z","fill","#d7e7ec","fill-rule","evenodd"],["clip-rule","evenodd","d","m434.35 62.819c0 11.818 10.823 11.078 16.035 11.078h54.115v-.826c0-1.538-.655-1.794-3.019-4.101l-58.415-55.703c-2.763-2.62-3.218-3.275-4.842-3.275h-3.987z","fill","#fff","fill-rule","evenodd"],["clip-rule","evenodd","d","m501.481 68.97-58.415-55.703c-2.763-2.62-3.218-3.275-4.842-3.275h-3.987l.114 52.827c0 11.818 10.823 11.078 16.035 11.078h54.114v-.826c0-1.538-.655-1.794-3.019-4.101z","fill","#b5c4cf","fill-rule","evenodd"],["d","m507.786 64.62c-.304-.286-60.445-57.641-60.445-57.641-2.299-2.206-4.677-4.486-9.117-4.486h-242.12c-7.072 0-12.826 5.754-12.826 12.825v39.383l-85.335 14.628c-6.84 1.2-11.44 7.746-10.255 14.579l4.331 25.252c-27.737 9.334-56.214 18.956-83.705 28.831-6.496 2.375-9.905 9.598-7.587 16.133l54.684 152.016c1.1 3.059 3.983 4.963 7.058 4.963.842 0 1.7-.143 2.538-.445 3.898-1.402 5.921-5.698 4.519-9.596l-53.875-149.767c25.9-9.273 52.722-18.349 78.935-27.172l25.771 150.245 29.654 173.032c1.071 6.108 6.44 10.454 12.5 10.454.686 0 1.382-.056 2.08-.171l80.316-13.783 62.76-10.758-94.391 33.927-74.435 26.763-57.808-160.789c-1.401-3.898-5.696-5.921-9.595-4.52-3.898 1.401-5.921 5.697-4.52 9.595l58.628 163.074c1.875 5.128 6.733 8.316 11.868 8.316 1.419 0 2.86-.244 4.264-.757l76.671-27.566 174.094-62.575 33.259-5.701h73.471c7.072 0 12.826-5.766 12.826-12.854v-326.984c.001-4.489-2.435-6.779-4.213-8.451zm-19.871 1.777h-37.53l-.93.004c-1.797.012-6.004.043-7.071-1.017-.246-.245-.534-1.063-.534-2.582l-.087-40.415zm9.085 331.511h-298.722v-146.167c0-4.142-3.358-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v148.313c0 7.088 5.754 12.854 12.826 12.854h140.812l-94.545 16.206-77.982 13.383-29.248-170.665-32.269-188.13 80.405-13.783v147.022c0 4.142 3.358 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-199.449h228.475l.098 45.326c0 5.494 1.671 9.938 4.966 13.21 5.063 5.027 12.22 5.377 16.663 5.377.382 0 .744-.003 1.083-.005l47.438-.003z"],["d","m456.366 126.449h-214.436c-4.142 0-7.5-3.358-7.5-7.5s3.358-7.5 7.5-7.5h214.436c4.142 0 7.5 3.358 7.5 7.5s-3.358 7.5-7.5 7.5z"],["d","m456.366 179.731h-214.436c-4.142 0-7.5-3.358-7.5-7.5s3.358-7.5 7.5-7.5h214.436c4.142 0 7.5 3.358 7.5 7.5s-3.358 7.5-7.5 7.5z"],["d","m456.366 233.014h-214.436c-4.142 0-7.5-3.358-7.5-7.5s3.358-7.5 7.5-7.5h214.436c4.142 0 7.5 3.358 7.5 7.5s-3.358 7.5-7.5 7.5z"],["d","m456.366 286.296h-214.436c-4.142 0-7.5-3.358-7.5-7.5s3.358-7.5 7.5-7.5h214.436c4.142 0 7.5 3.358 7.5 7.5s-3.358 7.5-7.5 7.5z"],["d","m456.366 339.578h-214.436c-4.142 0-7.5-3.358-7.5-7.5s3.358-7.5 7.5-7.5h214.436c4.142 0 7.5 3.358 7.5 7.5s-3.358 7.5-7.5 7.5z"],[1,"lawyer-forms__bottom--initial-screen"],[1,"lawyer-forms__bottom__step"],[1,"icon","icon-file-regular"],[1,"lawyer-forms__bottom__step__number"],[1,"lawyer-forms__bottom__step__description"],[1,"icon","icon-list-alt-regular"],[1,"icon","icon-print-solid"],[1,"icon_lawyer"],[1,"lawyer-forms__blocks-container"],[1,"lawyer-forms__block"],[1,"lawyer-forms__block__title"],[1,"icon","icon-building-solid"],[1,"tree-container"],[1,"tree"],[3,"routerLink"],[1,"last"],[1,"icon","icon-briefcase-solid"],[1,"icon","icon-home-solid"],[1,"icon","icon-store-alt-solid"],[1,"icon","icon-university"],[1,"icon","icon-envelope-open-text"],["id","user-forms",1,"search",2,"display","none"],[1,"search__container"],["type","text",3,"keyup.enter"],["input",""],[1,"search__orderby"],[1,"search__orderby__container"],["for","orderby"],["id","orderby","autofocus","true",3,"change"],["value","Date"],["value","Likes"],[1,"search__results"],[1,"search__results__container"],["class","search__results__result",4,"ngFor","ngForOf"],[1,"loader"],["version","1.1","id","loader-1","xmlns","http://www.w3.org/2000/svg",0,"xmlns","xlink","http://www.w3.org/1999/xlink","x","0px","y","0px","width","80px","height","80px","viewBox","0 0 50 50",0,"xml","space","preserve",2,"enable-background","new 0 0 50 50"],["fill","#000","d","M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"],["attributeType","xml","attributeName","transform","type","rotate","from","0 25 25","to","360 25 25","dur","0.6s","repeatCount","indefinite"],["class","noMoreForms",4,"ngIf"],[1,"lawyer-forms__title__finder__predictions__prediction",3,"routerLink"],[1,"search__results__result"],[1,"search__results__result__document",3,"routerLink"],[1,"search__results__result__document__container"],[1,"search__results__result__document__container__date"],[1,"search__results__result__document__container__title"],[1,"search__results__result__document__container__description"],[1,"search__results__result__document__container__likes-views"],[1,"search__results__result__document__container__likes-views__likes"],[1,"icon","icon-thumbs-up"],[1,"search__results__result__document__container__likes-views__views"],[1,"icon","icon-eye-solid"],[1,"search__results__result__more-info"],[1,"search__results__result__more-info__author"],["alt","avatar",3,"src"],[1,"search__results__result__more-info__tags"],[4,"ngFor","ngForOf"],[4,"ngIf"],[1,"noMoreForms"]],template:function(e,i){if(1&e){const e=c.Rb();c.Qb(0,"div",0),c.Qb(1,"div",1),c.Qb(2,"div",2),c.Qb(3,"div",3),c.Qb(4,"span"),c.Qb(5,"a",4),c.zc(6," Buscar transacci\xf3n "),c.Pb(),c.Mb(7,"span",5),c.Pb(),c.Mb(8,"span"),c.Pb(),c.Qb(9,"div",6),c.Qb(10,"div",7),c.Qb(11,"div",8),c.Qb(12,"h1"),c.zc(13,"Documentos legales online"),c.Pb(),c.Qb(14,"div",9),c.Qb(15,"input",10),c.Zb("input",(function(e){return i.setPredictions(e)}))("focus",(function(){return i.showPredictions()}))("blur",(function(){return i.hidePredictions()})),c.Pb(),c.Pb(),c.Qb(16,"div",11,12),c.Qb(18,"div",13),c.yc(19,u,2,4,"div",14),c.Pb(),c.Pb(),c.Pb(),c.Qb(20,"div",15),c.cc(),c.Qb(21,"svg",16),c.Qb(22,"g"),c.Qb(23,"g"),c.Mb(24,"path",17),c.Pb(),c.Qb(25,"g"),c.Mb(26,"path",18),c.Pb(),c.Qb(27,"g"),c.Mb(28,"path",19),c.Pb(),c.Qb(29,"g"),c.Mb(30,"path",20),c.Pb(),c.Qb(31,"g"),c.Mb(32,"path",21),c.Pb(),c.Qb(33,"g"),c.Mb(34,"path",22),c.Pb(),c.Qb(35,"g"),c.Mb(36,"path",23),c.Pb(),c.Qb(37,"g"),c.Mb(38,"path",24),c.Pb(),c.Qb(39,"g"),c.Mb(40,"path",25),c.Pb(),c.Qb(41,"g"),c.Mb(42,"path",26),c.Pb(),c.Qb(43,"g"),c.Mb(44,"path",27),c.Pb(),c.Mb(45,"path",28),c.Qb(46,"g"),c.Mb(47,"path",29),c.Pb(),c.Qb(48,"g"),c.Mb(49,"path",30),c.Pb(),c.Qb(50,"g"),c.Mb(51,"path",31),c.Pb(),c.Qb(52,"g"),c.Mb(53,"path",32),c.Pb(),c.Qb(54,"g"),c.Mb(55,"path",33),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.bc(),c.Qb(56,"div",34),c.Qb(57,"div",35),c.Mb(58,"span",36),c.Qb(59,"span",37),c.zc(60,"1."),c.Pb(),c.Qb(61,"span",38),c.zc(62,"Elige un documento"),c.Pb(),c.Pb(),c.Qb(63,"div",35),c.Mb(64,"span",39),c.Qb(65,"span",37),c.zc(66,"2."),c.Pb(),c.Qb(67,"span",38),c.zc(68,"Rellena el formulario"),c.Pb(),c.Pb(),c.Qb(69,"div",35),c.Mb(70,"span",40),c.Qb(71,"span",37),c.zc(72,"3."),c.Pb(),c.Qb(73,"span",38),c.zc(74,"Gu\xe1rdalo e impr\xedmelo"),c.Pb(),c.Pb(),c.Qb(75,"div",35),c.Mb(76,"span",41),c.Qb(77,"span",37),c.zc(78,"4."),c.Pb(),c.Qb(79,"span",38),c.zc(80,"Consulta un abogado"),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Qb(81,"div",42),c.Qb(82,"div",43),c.Qb(83,"div",44),c.Mb(84,"span",45),c.Qb(85,"h2"),c.zc(86,"Empresa"),c.Pb(),c.Pb(),c.Qb(87,"div",46),c.Qb(88,"ul",47),c.Qb(89,"li"),c.Qb(90,"a",48),c.zc(91," Estatutos de una asociaci\xf3n "),c.Pb(),c.Pb(),c.Qb(92,"li"),c.Qb(93,"a",48),c.zc(94," Acta fundacional de asociaci\xf3n "),c.Pb(),c.Pb(),c.Qb(95,"li"),c.Qb(96,"a",48),c.zc(97," Estatutos de una Sociedad Limitada "),c.Pb(),c.Pb(),c.Qb(98,"li"),c.Qb(99,"a",48),c.zc(100," Estatutos de una Sociedad Limitada Profesional "),c.Pb(),c.Pb(),c.Qb(101,"li"),c.Qb(102,"a",48),c.zc(103," Estatutos de una Uni\xf3n Temporal De Empresas "),c.Pb(),c.Pb(),c.Qb(104,"li",49),c.Qb(105,"a",48),c.zc(106," Estatutos de una Sociedad Limitada Unipersonal "),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Qb(107,"div",43),c.Qb(108,"div",44),c.Mb(109,"span",50),c.Qb(110,"h2"),c.zc(111,"Laboral"),c.Pb(),c.Pb(),c.Qb(112,"div",46),c.Qb(113,"ul",47),c.Qb(114,"li"),c.Qb(115,"a",48),c.zc(116," Contrato de trabajo "),c.Pb(),c.Pb(),c.Qb(117,"li"),c.Qb(118,"a",48),c.zc(119," Contrato de trabajo fijo discontinuo "),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Qb(120,"div",43),c.Qb(121,"div",44),c.Mb(122,"span",51),c.Qb(123,"h2"),c.zc(124,"Vivienda"),c.Pb(),c.Pb(),c.Qb(125,"div",46),c.Qb(126,"ul",47),c.Qb(127,"li"),c.Qb(128,"a",48),c.zc(129,"Contrato de arrendamiento de habitaci\xf3n"),c.Pb(),c.Pb(),c.Qb(130,"li"),c.Qb(131,"a",48),c.zc(132,"Contrato de arrendamiento de vivienda"),c.Pb(),c.Pb(),c.Qb(133,"li"),c.Qb(134,"a",48),c.zc(135,"Contrato de arrendamiento de vivienda de uso vacacional"),c.Pb(),c.Pb(),c.Qb(136,"li",49),c.Qb(137,"a",48),c.zc(138,"Alquiler de plaza de garaje"),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Qb(139,"div",43),c.Qb(140,"div",44),c.Mb(141,"span",52),c.Qb(142,"h2"),c.zc(143,"Compraventa"),c.Pb(),c.Pb(),c.Qb(144,"div",46),c.Qb(145,"ul",47),c.Qb(146,"li"),c.Qb(147,"a",48),c.zc(148,"Contrato compraventa de bien inmueble"),c.Pb(),c.Pb(),c.Qb(149,"li",49),c.Qb(150,"a",48),c.zc(151," Contrato de compraventa de veh\xedculo "),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Qb(152,"div",43),c.Qb(153,"div",44),c.Mb(154,"span",53),c.Qb(155,"h2"),c.zc(156,"Administrativo"),c.Pb(),c.Pb(),c.Qb(157,"div",46),c.Qb(158,"ul",47),c.Qb(159,"li",49),c.Qb(160,"a",48),c.zc(161," Declaraci\xf3n jurada "),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Qb(162,"div",43),c.Qb(163,"div",44),c.Mb(164,"span",54),c.Qb(165,"h2"),c.zc(166,"Cartas y notificaciones"),c.Pb(),c.Pb(),c.Qb(167,"div",46),c.Qb(168,"ul",47),c.Qb(169,"li",49),c.Qb(170,"a",48),c.zc(171,"Requerimiento de pago"),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Qb(172,"div",55),c.Qb(173,"div",56),c.Qb(174,"div",9),c.Qb(175,"input",57,58),c.Zb("keyup.enter",(function(){c.rc(e);const t=c.pc(176);return i.search(t.value)})),c.Pb(),c.Pb(),c.Qb(177,"div",59),c.Qb(178,"div",60),c.Qb(179,"label",61),c.zc(180,"Ordenar por: "),c.Pb(),c.Qb(181,"select",62),c.Zb("change",(function(e){return i.setOrder(e.target.value)})),c.Qb(182,"option",63),c.zc(183,"Fecha"),c.Pb(),c.Qb(184,"option",64),c.zc(185,"Likes"),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Qb(186,"div",65),c.Qb(187,"div",66),c.yc(188,v,30,17,"div",67),c.Pb(),c.Pb(),c.Pb(),c.Qb(189,"div",68),c.cc(),c.Qb(190,"svg",69),c.Qb(191,"path",70),c.Mb(192,"animateTransform",71),c.Pb(),c.Pb(),c.Pb(),c.yc(193,p,3,0,"div",72),c.Pb()}2&e&&(c.zb(19),c.ic("ngForOf",i.predictions),c.zb(71),c.ic("routerLink",c.kc(21,P)),c.zb(3),c.ic("routerLink",c.kc(22,Q)),c.zb(3),c.ic("routerLink",c.kc(23,g)),c.zb(3),c.ic("routerLink",c.kc(24,z)),c.zb(3),c.ic("routerLink",c.kc(25,y)),c.zb(3),c.ic("routerLink",c.kc(26,w)),c.zb(10),c.ic("routerLink",c.kc(27,k)),c.zb(3),c.ic("routerLink",c.kc(28,M)),c.zb(10),c.ic("routerLink",c.kc(29,L)),c.zb(3),c.ic("routerLink",c.kc(30,C)),c.zb(3),c.ic("routerLink",c.kc(31,F)),c.zb(3),c.ic("routerLink",c.kc(32,S)),c.zb(10),c.ic("routerLink",c.kc(33,I)),c.zb(3),c.ic("routerLink",c.kc(34,x)),c.zb(10),c.ic("routerLink",c.kc(35,T)),c.zb(10),c.ic("routerLink",c.kc(36,D)),c.zb(18),c.ic("ngForOf",i.results),c.zb(1),c.xc("display",i.loadingQuery?"flex":"none"),c.zb(4),c.ic("ngIf",!0===i.noMoreForms))},directives:[s.g,r.s,a.v,a.F,r.t,s.e],pipes:[r.f],encapsulation:2}),e})();const A=["searchTransactionDiv"],j=["transactionIdInput"],O=[{path:"",component:E},{path:"user-forms",component:E},{path:"search-transaction",component:(()=>{class e{constructor(e,i,t){this.formService=e,this.commonsService=i,this.router=t}ngOnInit(){window.addEventListener("resize",this.resizeDiv.bind(this)),this.resizeDiv()}ngOnDestroy(){window.removeEventListener("resize",this.resizeDiv.bind(this))}resizeDiv(){if(document.querySelector(".nav")){const e=document.querySelector(".nav").clientHeight;this.searchTransactionDiv.nativeElement.style.height=window.innerHeight-e+"px"}}findTransaction(){this.formService.getPaidCertifiedForm(this.transactionId).subscribe(e=>{e.certifiedForm?(this.router.navigate(["/certified-forms/"+e.certifiedForm.id],{queryParams:{transactionId:this.transactionId}}),this.commonsService.toastMessage("success","Transacci\xf3n encontrada","Transacci\xf3n encontrada")):e.transactionNotFound?(this.transactionIdInput.nativeElement.style.borderBottom="3px solid #C44D58",this.commonsService.toastMessage("error","El ID de su transacci\xf3n no existe","ID no encontrado")):e.formExpired&&(this.transactionIdInput.nativeElement.style.borderBottom="3px solid #C44D58",this.commonsService.toastMessage("error","El per\xedodo de 15 d\xedas para cambiar el documento ha terminado","Transaccion caducada"))})}}return e.\u0275fac=function(i){return new(i||e)(c.Lb(o.k),c.Lb(o.e),c.Lb(s.d))},e.\u0275cmp=c.Fb({type:e,selectors:[["app-search-transaction"]],viewQuery:function(e,i){var t;1&e&&(c.wc(A,!0),c.Dc(j,!0)),2&e&&(c.oc(t=c.ac())&&(i.searchTransactionDiv=t.first),c.oc(t=c.ac())&&(i.transactionIdInput=t.first))},decls:9,vars:1,consts:[[1,"search-transaction"],["searchTransactionDiv",""],[1,"search-transaction__container"],["for","transactionId"],["type","text","name","transactionId","id","transactionId","placeholder","Id de la transacci\xf3n",3,"ngModel","ngModelChange","keyup.enter"],["transactionIdInput",""],["type","submit","value","Buscar",3,"click"],[1,"search-transaction__container__message"]],template:function(e,i){1&e&&(c.Qb(0,"div",0,1),c.Qb(2,"div",2),c.Mb(3,"label",3),c.Qb(4,"input",4,5),c.Zb("ngModelChange",(function(e){return i.transactionId=e}))("keyup.enter",(function(){return i.findTransaction()})),c.Pb(),c.Qb(6,"input",6),c.Zb("click",(function(){return i.findTransaction()})),c.Pb(),c.Qb(7,"label",7),c.zc(8,"Escriba el id de su transacci\xf3n cuando finaliz\xf3 de rellenar el formulario. Revise su correo electr\xf3nico."),c.Pb(),c.Pb(),c.Pb()),2&e&&(c.zb(4),c.ic("ngModel",i.transactionId))},directives:[a.c,a.q,a.t],encapsulation:2}),e})()}];let q=(()=>{class e{}return e.\u0275mod=c.Jb({type:e}),e.\u0275inj=c.Ib({factory:function(i){return new(i||e)},imports:[[s.h.forChild(O)],s.h]}),e})(),B=(()=>{class e{}return e.\u0275mod=c.Jb({type:e}),e.\u0275inj=c.Ib({factory:function(i){return new(i||e)},imports:[[r.c,q,n.a]]}),e})()}}]);