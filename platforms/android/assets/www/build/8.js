webpackJsonp([8],{

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceOrderPageModule", function() { return ServiceOrderPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_order__ = __webpack_require__(616);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ServiceOrderPageModule = (function () {
    function ServiceOrderPageModule() {
    }
    ServiceOrderPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__service_order__["a" /* ServiceOrderPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__service_order__["a" /* ServiceOrderPage */]),
            ],
        })
    ], ServiceOrderPageModule);
    return ServiceOrderPageModule;
}());

//# sourceMappingURL=service-order.module.js.map

/***/ }),

/***/ 616:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceOrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(221);
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
 * Generated class for the ServiceOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ServiceOrderPage = (function () {
    function ServiceOrderPage(navCtrl, navParams, geolocation, googleMaps, loadCtr, modal) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geolocation = geolocation;
        this.googleMaps = googleMaps;
        this.loadCtr = loadCtr;
        this.modal = modal;
        this.order_data = {};
        // this.loadMap();
        //<!-- Build Order Object -->
        this.order_data = {
            service_name: this.navParams.get('service_name'),
            category_id: this.navParams.get('category_id'),
            category_name: this.navParams.get('category_name'),
            category_price: this.navParams.get('category_price'),
            service_id: this.navParams.get('service_id'),
            lat: this.lat,
            lng: this.long
        };
        this.category_duration = this.navParams.get('category_duration');
        this.category_image = this.navParams.get('category_image');
        this.category_price = this.navParams.get('category_price');
        this.category_name = this.order_data['service_name'];
    }
    ServiceOrderPage.prototype.ionViewDidLoad = function () {
        this.loadMap();
    };
    ServiceOrderPage.prototype.loadMap = function () {
        var _this = this;
        var loading = this.loadCtr.create({
            spinner: "crescent",
            content: "Obteniendo Ubicación"
        });
        loading.present();
        this.geolocation.getCurrentPosition().then(function (position) {
            _this.order_data['lat'] = position.coords.latitude;
            _this.order_data['lng'] = position.coords.longitude;
            var map_options = {
                camera: {
                    target: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                    zoom: 18,
                    tilt: 30
                }
            };
            _this.map = _this.googleMaps.create(document.getElementById("map_container"), map_options);
            _this.map.one(__WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMapsEvent */].MAP_READY)
                .then(function () {
                loading.dismiss();
                alert("Para cambiar tu ubicación manten pulsado el pin del mapa y luego arrastra ");
                _this.map.addMarker({
                    title: "Ubicación de servicio",
                    icon: "red",
                    animation: "DROP",
                    position: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                }).then(function (marker) {
                    marker.setDraggable(true);
                    _this.position_marker = marker;
                    console.log(marker);
                    marker.on(__WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMapsEvent */].MARKER_DRAG_END).subscribe(function () {
                        var markerCoords = marker.getPosition();
                        _this.updateCoords(markerCoords.lat, markerCoords.lng);
                    });
                });
            });
        });
    };
    ServiceOrderPage.prototype.updateCoords = function (lat, lng) {
        this.order_data['lat'] = lat;
        this.order_data['lng'] = lng;
        console.log(this.order_data['lat'], this.order_data['lng']);
    };
    ServiceOrderPage.prototype.reserveService = function () {
        var order_build = {
            cat_id: this.order_data['category_id'],
            service_name: this.order_data['service_name'],
            service_id: this.order_data['service_id'],
            category_price: this.order_data['category_price'],
            lat: this.order_data['lat'],
            lng: this.order_data['lng']
        };
        this.navCtrl.push('ReservationPage', { order_build: order_build });
        // reserveModal.onDidDismiss(data => {
        //   this.reservation_data = data;
        // });
    };
    ServiceOrderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-service-order',template:/*ion-inline-start:"/home/db8/Documents/Projects/cl_client/src/pages/service-order/service-order.html"*/'<ion-header>\n  <ion-navbar color="carlabC">\n    <ion-title>Resumen y Pago</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-grid>\n    <ion-grid>\n\n      <ion-row>\n        <ion-card id="title-card">\n          <div id="order-service-title" text-right>\n            {{ service_name }}\n          </div>\n          <div id="order-service-content">\n            <div id="order-service-image">\n              <img src="assets/imgs/{{ category_image }}">\n            </div>\n            <div id="order-service-data" >\n              <div class="order-service-data-c" text-center>\n                {{ category_name }}\n              </div>\n              <div class="order-service-data-c" >\n                PRECIO: <br>\n                {{ category_price }} $\n              </div>\n              <div class="order-service-data-c" >\n                DURACIÓN DEL SERVICIO: <br>\n                {{ category_duration }} min.\n              </div>\n            </div>\n          </div>\n          <div id="order-service-bottom">\n            <!-- <div class="order-service-button">\n              <button ion-button color="carlabC"(click)="addCard()">Datos de compra</button>\n            </div> -->\n            <div class="order-service-button">\n              <button ion-button color="carlabC" (click)="reserveService()">Reserva</button>\n            </div>\n          </div>\n        </ion-card>\n      </ion-row>\n\n      <ion-row>\n        <ion-card id="map-card">\n            <div id="map_container"></div>\n        </ion-card>\n      </ion-row>\n    </ion-grid>\n  </ion-grid>\n</ion-content>\n<!-- <ion-content padding>\n  <ion-grid>\n    <ion-row>\n      <ion-cardd padding>\n        <div class="order-title-section">\n          <h1>{{ service_name }}</h1>\n          <img src="assets/imgs/{{ category_image }}">\n        </div>\n        <div class="order-title-section-elements" >\n          <div class="order-element" text-left>\n            <h1>Precio</h1>\n            <ion-icon name="md-cash"></ion-icon>\n            {{ category_price }} $\n          </div>\n          <div class="order-element" text-left>\n            <h1>Duración Aproximada</h1>\n            <ion-icon name="clock"></ion-icon>\n            {{ category_duration }} min.\n          </div>\n          <div class="order-element" text-left>\n            <h1>Categoria</h1>\n            {{ category_name }}\n          </div>\n        </div>\n      </ion-card>\n    </ion-row>\n\n    <ion-row>\n      <ion-card id="map-card">\n          <div id="map_container"></div>\n      </ion-card>\n    </ion-row>\n  </ion-grid>\n\n</ion-content> -->\n'/*ion-inline-end:"/home/db8/Documents/Projects/cl_client/src/pages/service-order/service-order.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["a" /* GoogleMaps */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
    ], ServiceOrderPage);
    return ServiceOrderPage;
}());

//# sourceMappingURL=service-order.js.map

/***/ })

});
//# sourceMappingURL=8.js.map