import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions
} from '@ionic-native/google-maps';
import moment from 'moment';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
/**
 * Generated class for the GeneratedOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-generated-order',
  templateUrl: 'generated-order.html',
})
export class GeneratedOrderPage{
  order: any;
  map : GoogleMap;
  constructor(
    public navParams: NavParams,
    private googleMaps: GoogleMaps,
    public navCtrl: NavController,
    public api: ApiServiceProvider,
    public loadingCtrl: LoadingController)
    {
      this.order = this.navParams.get('order');
      this.loadData();
    }

  //<!--Load Selected Order------------------------------------------//
  loadData()
  {
    let loading = this.loadingCtrl.create({
      content: 'Cargando Información',
      spinner: 'crescent'
    })
    loading.present();

    console.log(this.order);
    this.loadMap(this.order);
    this.order.service_date = moment(this.order.service_date).format("D-MMM H:mm A");
    loading.dismiss();
    console.log(this.order);

  }
  //<!--Load Selected Order Map-------------------------------------//
  loadMap(order : any)
  {
    let map_options : GoogleMapOptions = {
      camera: {
        target: {
          lat: order.latitude,
          lng: order.longitude
        },
        zoom: 18,
        tilt: 30
      }
    }

    this.map = GoogleMaps.create("order_map", map_options)
    console.log(this.map);
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(()=>{
      this.map.addMarker({
        title: "Destino del servicio",
        icon: "blue",
        animation: "DROP",
        position: {
          lat: order.latitude,
          lng: order.longitude
        }
      }).then(marker=>{
        marker.setDraggable(false);
      })
    });

  }

}
