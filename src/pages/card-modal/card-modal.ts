import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { CardIO } from '@ionic-native/card-io';

/**
 * Generated class for the CardModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-card-modal',
  templateUrl: 'card-modal.html',
})
export class CardModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private cardIO: CardIO, public loadCtr: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardModalPage');
  }

  addCard(){
    let loading = this.loadCtr.create({
      spinner: "crescent",
      content: "Verificando datos."
    });
    this.cardIO.canScan()
    .then(
      (res: boolean) => {
        if(res){
          let options = {
            scanExpiry: true,
            requireCVV: false,
            requirePostalCode: false
          };

          this.cardIO.scan(options).then(res =>{
            loading.present()

            console.log(res);
            loading.dismiss();
            alert("Something Happened!");

          });
        }
      }
    );
  }

  closeModal() {
      this.viewCtrl.dismiss();
  }
}
