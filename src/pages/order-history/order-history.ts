import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import firebase from 'firebase';
import moment from 'moment';

/**
 * Generated class for the OrderHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-history',
  templateUrl: 'order-history.html',
})
export class OrderHistoryPage {
  orders: any;
  fireID: any;
  constructor(public navCtrl: NavController,
    public api: ApiServiceProvider,
    public navParams: NavParams,
    public loadingCtrl: LoadingController) {
    this.getOrderList(this.fireID);
    this.fireID = this.navParams.get('fireID');
  }

  getOrderList(fireID: string){

    let loading = this.loadingCtrl.create({
      content: 'Cargando Historial',
      spinner: 'crescent',
    });
    loading.present();

    this.api.getOrders(firebase.auth().currentUser.uid).subscribe((response)=>{
      if( (response as any).code == "200"){
        this.orders = (response as any).orders;

        for(let order of this.orders){
          order.service_date = moment(order.service_date).format("YYYY-MM-DD h:mm A")
        }
        loading.dismiss();
      }else{
        alert("Ha ocurrido un error, intenta de nuevo.");
        loading.dismiss();
        return ;
      }
    });

  }


  orderDetails(order: any){
    let other = order;
    console.log(order);
    this.navCtrl.push("GeneratedOrderPage", {order: order});

  }

}
