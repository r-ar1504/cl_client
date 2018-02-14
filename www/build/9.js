webpackJsonp([9],{

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceDetailsPageModule", function() { return ServiceDetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_details__ = __webpack_require__(615);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ServiceDetailsPageModule = (function () {
    function ServiceDetailsPageModule() {
    }
    ServiceDetailsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__service_details__["a" /* ServiceDetailsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__service_details__["a" /* ServiceDetailsPage */]),
            ],
        })
    ], ServiceDetailsPageModule);
    return ServiceDetailsPageModule;
}());

//# sourceMappingURL=service-details.module.js.map

/***/ }),

/***/ 615:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_service_api_service__ = __webpack_require__(212);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ServiceDetailsPage = (function () {
    function ServiceDetailsPage(navCtrl, navParams, api) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.api = api;
        this.service_name = this.navParams.get('name');
        this.service_id = this.navParams.get('id');
        this.service_image = this.navParams.get('image');
        this.service_description = this.navParams.get('description');
        this.loadCategories();
        console.log(this.navParams);
    }
    //<!--[Ferch Service Categories]-->//
    ServiceDetailsPage.prototype.loadCategories = function () {
        var _this = this;
        this.api.getCategories(this.service_id).subscribe(function (data) { _this.categories = data['categories']; console.log(data); });
        console.log(this.categories);
    };
    ServiceDetailsPage.prototype.openOrder = function (service_name, category_id, category_name, category_price, category_duration, category_image, service_id) {
        this.navCtrl.push('ServiceOrderPage', { service_name: service_name, category_id: category_id, category_name: category_name, category_price: category_price, category_duration: category_duration, category_image: category_image, service_id: service_id });
    };
    ServiceDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ServiceDetailsPage');
    };
    ServiceDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-service-details',template:/*ion-inline-start:"/home/db8/Documents/Projects/cl_client/src/pages/service-details/service-details.html"*/'<ion-header>\n\n  <ion-navbar color="carlabC">\n    <ion-title>Detalles</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content >\n  <ion-grid no-margin class="animated slideInRight" >\n    <ion-card class="card-service" text-center>\n      <div class="card-title">\n        {{ service_name }}\n      </div>\n      <div class="card-subtitle">{{ service_description }}</div>\n    </ion-card>\n    <ion-list>\n      <ion-card *ngFor="let category of categories" (click)="openOrder( service_name , category.id ,  category.name ,  category.price ,  category.duration, category.image, service_id)">\n        <div class="serice-card-element">\n          <img src="assets/imgs/{{ category.image }}">\n        </div>\n        <div class="serice-card-element">\n          {{ category.name }}\n        </div>\n        <div class="serice-card-element">\n          $ {{ category.price }}\n        </div>\n        <div class="serice-card-element">\n          {{ category.duration }} min.\n        </div>\n      </ion-card>\n      <!-- <ion-card class="category-card"  padding *ngFor="let category of categories" (click)="openOrder( service_name , category.id ,  category.name ,  category.price ,  category.duration, category.image)">\n\n        <ion-card-content class="cats">\n          <div class="cat-header">\n            <img src="assets/imgs/{{ category.image }} ">\n          </div>\n          <div class="cat-header" text-center>\n            {{ category.name }}\n          </div>\n          <div class="cat-content">\n            <ion-icon name="md-cash"></ion-icon>\n            {{ category.price }}  $\n          </div>\n          <div class="cat-content">\n            <ion-icon name="clock"></ion-icon>\n            {{ category.duration }}  min.\n          </div>\n        </ion-card-content>\n      </ion-card> -->\n    </ion-list>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/home/db8/Documents/Projects/cl_client/src/pages/service-details/service-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_api_service_api_service__["a" /* ApiServiceProvider */]])
    ], ServiceDetailsPage);
    return ServiceDetailsPage;
}());

//# sourceMappingURL=service-details.js.map

/***/ })

});
//# sourceMappingURL=9.js.map