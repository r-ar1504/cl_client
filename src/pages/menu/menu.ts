import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  services: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public api: ApiServiceProvider, public loadingCtrl: LoadingController) { this.loadSer();}

  // <!-- Load Services --> //

  loadSer(){

    let loading = this.loadingCtrl.create({
      content: 'Cargando servicios',
      spinner: 'crescent',
    });

    loading.present();

    this.api.getServices().subscribe(data =>{
       this.services = data['services'];
       loading.dismiss();
    });

    }

  // <!--Open Service Details(Categories) --> //

  openDetails(id: string, name: string,image: string, description: string){
    this.navCtrl.push('ServiceDetailsPage',{ id: id, name: name, image: image, description: description });
  }

}
