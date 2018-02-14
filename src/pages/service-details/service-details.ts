import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';


@IonicPage()
@Component({
  selector: 'page-service-details',
  templateUrl: 'service-details.html',
})
export class ServiceDetailsPage {
  service_name: any;
  service_id: any;
  service_image: any;
  service_description: any;
  categories: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiServiceProvider) {
    this.service_name = this.navParams.get('name');
    this.service_id = this.navParams.get('id');
    this.service_image = this.navParams.get('image');
    this.service_description = this.navParams.get('description');
    this.loadCategories();
    console.log(this.navParams);
  }

  //<!--[Ferch Service Categories]-->//
  loadCategories(){

    this.api.getCategories(this.service_id).subscribe(data => { this.categories = data['categories'];  console.log(data) });
    console.log(this.categories);

  }

  openOrder(service_name: string, category_id: string, category_name: string, category_price: string, category_duration: string, category_image: string, service_id: string){
    this.navCtrl.push('ServiceOrderPage',{ service_name: service_name, category_id: category_id, category_name: category_name, category_price: category_price,category_duration: category_duration, category_image: category_image, service_id: service_id} );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceDetailsPage');
  }

}
