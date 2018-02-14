webpackJsonp([12],{

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardModalPageModule", function() { return CardModalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__card_modal__ = __webpack_require__(603);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CardModalPageModule = (function () {
    function CardModalPageModule() {
    }
    CardModalPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__card_modal__["a" /* CardModalPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__card_modal__["a" /* CardModalPage */]),
            ],
        })
    ], CardModalPageModule);
    return CardModalPageModule;
}());

//# sourceMappingURL=card-modal.module.js.map

/***/ }),

/***/ 603:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_card_io__ = __webpack_require__(215);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the CardModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CardModalPage = (function () {
    function CardModalPage(navCtrl, navParams, viewCtrl, cardIO, loadCtr) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.cardIO = cardIO;
        this.loadCtr = loadCtr;
    }
    CardModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CardModalPage');
    };
    CardModalPage.prototype.addCard = function () {
        var _this = this;
        var loading = this.loadCtr.create({
            spinner: "crescent",
            content: "Verificando datos."
        });
        this.cardIO.canScan()
            .then(function (res) {
            if (res) {
                var options = {
                    scanExpiry: true,
                    requireCVV: false,
                    requirePostalCode: false
                };
                _this.cardIO.scan(options).then(function (res) {
                    loading.present();
                    console.log(res);
                    loading.dismiss();
                    alert("Something Happened!");
                });
            }
        });
    };
    CardModalPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    CardModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-card-modal',template:/*ion-inline-start:"/home/db8/Documents/Projects/cl_client/src/pages/card-modal/card-modal.html"*/'<!--\n  Generated template for the CardModalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Registro de tarjeta</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-grid>\n      <ion-row>\n        <button ion-button color="carlabC" (click)="addCard()">Escanear Tarjeta</button>\n      </ion-row>\n      <form text-center>\n      <ion-row justify-content-center>\n        <ion-col col-10 text-center>\n          <ion-item>\n            <ion-label floating>Modelo del Auto</ion-label>\n            <ion-input type="text" ></ion-input>\n          </ion-item>\n        </ion-col>\n        <ion-col col-10 text-center>\n          <ion-item>\n            <ion-label floating>Numero de Placa</ion-label>\n            <ion-input type="text"></ion-input>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n      </form>\n    </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/home/db8/Documents/Projects/cl_client/src/pages/card-modal/card-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_card_io__["a" /* CardIO */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], CardModalPage);
    return CardModalPage;
}());

//# sourceMappingURL=card-modal.js.map

/***/ })

});
//# sourceMappingURL=12.js.map