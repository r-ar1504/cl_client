import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the ServiceOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-service-order',
  templateUrl: 'service-order.html',
})
export class ServiceOrderPage {
  position_marker: any;
  service_name : string;
  category_id : string;
  category_name : string;
  category_price : string;
  category_duration : string;
  category_image: string;
  service_id: string;
  order_data = { };
  map : GoogleMap;
  lat: any;
  long: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private googleMaps: GoogleMaps, public loadCtr: LoadingController, public modal: ModalController) {
    // this.loadMap();
    //<!-- Build Order Object -->
    this.order_data = {
      service_name:  this.navParams.get('service_name'),
      category_id:  this.navParams.get('category_id'),
      category_name:  this.navParams.get('category_name'),
      category_price:  this.navParams.get('category_price'),
      service_id:  this.navParams.get('service_id'),
      lat: this.lat,
      lng: this.long

    }

    this.category_duration = this.navParams.get('category_duration');
    this.category_image =  this.navParams.get('category_image');
    this.category_price = this.navParams.get('category_price');
    this.category_name = this.order_data['service_name'];


  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap(){
    let loading = this.loadCtr.create({
      spinner: "crescent",
      content: "Obteniendo Ubicación"
    });

    loading.present();
    this.geolocation.getCurrentPosition().then((position) =>{

      this.order_data['lat'] = position.coords.latitude;
      this.order_data['lng'] = position.coords.longitude;

      let map_options : GoogleMapOptions = {
        camera: {
          target: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
          },
          zoom: 18,
          tilt: 30
        }
      }

        this.map =  this.googleMaps.create(document.getElementById("map_container"), map_options);
        this.map.one(GoogleMapsEvent.MAP_READY)
        .then(()=>{
          loading.dismiss();
          alert("Para cambiar tu ubicación manten pulsado el pin del mapa y luego arrastra ")
          this.map.addMarker({
            title: "Ubicación de servicio",
            icon: "red",
            animation: "DROP",
            position: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }
          }).then(marker =>{
            marker.setDraggable(true);
            this.position_marker = marker;
            console.log(marker);

            marker.on(GoogleMapsEvent.MARKER_DRAG_END).subscribe(() =>{
              let markerCoords = marker.getPosition();
              this.updateCoords(markerCoords.lat, markerCoords.lng);
            });

          });
        });
    });

  }

  updateCoords(lat: any, lng: any){
    this.order_data['lat'] = lat;
    this.order_data['lng'] = lng;

    console.log(this.order_data['lat'],this.order_data['lng']);
  }

  reserveService(){
    let order_build ={
      cat_id: this.order_data['category_id'],
      service_name: this.order_data['service_name'],
      service_id: this.order_data['service_id'],
      category_price: this.order_data['category_price'],
      lat: this.order_data['lat'],
      lng: this.order_data['lng']
    }

    this.navCtrl.push('ReservationPage', { order_build } );


    // reserveModal.onDidDismiss(data => {
    //   this.reservation_data = data;
    // });
  }




}
