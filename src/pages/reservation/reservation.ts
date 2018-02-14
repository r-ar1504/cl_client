import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, ViewController, LoadingController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CardIO } from '@ionic-native/card-io';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { PusherProvider } from '../../providers/pusher/pusher';
import firebase from 'firebase';
import * as moment  from 'moment-timezone'


@IonicPage()
@Component({
  selector: 'page-reservation',
  templateUrl: 'reservation.html',
})
export class ReservationPage {

  service_id: string = this.navParams.get('service_id');
  service_name: string = this.navParams.get('service_name');
  category_id: any;
  order_channel: any;
  private reservation_data: FormGroup;
  now:any;
  actual : any ;
  max_date: any;
  set_date: boolean;
  billing = {};
  service_data = {};
  userID: any;

  constructor(public navCtrl: NavController, private cardIO: CardIO, public navParams: NavParams,public viewCtrl: ViewController, private formBuilder: FormBuilder,private localNotifications: LocalNotifications,public loadCtr: LoadingController, public api: ApiServiceProvider,public alertCtrl: AlertController, public pusher: PusherProvider) {

    this.localNotifications.on('click',(notification, state) =>{

        if (notification.id == 1) {

        } else{
          alert("Not Service");
        }

      });

    this.actual = moment().add(1, 'hours').format("YYYY-MM-DD").toString();
    this.max_date = moment().add(1, "days").format("YYYY-MM-DD").toString();

    this.now = moment().tz("America/Monterrey");

    firebase.auth().onAuthStateChanged((currentUser) => {
        if (currentUser) {
            this.userID = currentUser.uid;
        } else {
            console.log("User is logged out");
        }
    });

    this.service_data = this.navParams.get('order_build');
    this.set_date = false;
    this.reservation_data = this.formBuilder.group({
      date: ["", [Validators.required]],
      cvv: ["", [Validators.required]],
      card_number: ["", [Validators.required]],
      car_plate: [" ", [Validators.required]],
      car_model: [" ", [Validators.required]]
    });
    // console.log(this.service_data);

  }

  setDate(){
    if(this.set_date != true ){
        this.set_date =true;
    }else{
        this.set_date =false;
    }
  }

  addCard(){
    let loading = this.loadCtr.create({
      spinner: "crescent",
      content: "Verificando datos."
    });

    this.billing = {
      ccv: "",
      card_number: ""
    }

    this.cardIO.canScan()
    .then(
      (res: boolean) => {
        if(res){
          let options = {
            scanExpiry: true,
            requireCVV: true,
            requirePostalCode: false
          };
          this.cardIO.scan(options).then(res =>{
            loading.present()
              this.billing['cvv']= res.cvv;
              this.billing["card_number"] = res.redactedCardNumber;
            console.log(res);

            loading.dismiss();
            alert("Tarjeta añadida exitosamente!");
          });
        }
      }
    );
  }

  searchWorker(){
    let loading = this.loadCtr.create({
      spinner: "crescent",
      content: "Solicitando operador."
    });

    let order_object = {
      status: 0,
      lat: this.service_data['lat'],
      lng: this.service_data['lng'],
      ammount: this.service_data['category_price'],
      car_plate: this.reservation_data.get('car_plate').value,
      user: this.userID,
      service_name: this.service_data['service_name'],
      details: this.reservation_data.get('car_model').value,
      category_id: this.service_data['cat_id']
    }

    if(this.set_date != true){
      order_object['date'] = moment().add(1, 'hours').format("YYYY-MM-DD h:mm A");
    }else{
      order_object['date'] = moment(String(this.reservation_data.get('date').value), "YYYY-MM-DD h:mm A");
    }

    var form_date = order_object['date'];
    console.log(form_date)
    console.log(this.now)
    console.log( moment(form_date).isBefore(this.now, "hour"));

    if( moment(form_date).isBefore(this.now, "hour") ){
      loading.dismiss()
      alert("Por Favor elige una fecha posterior al tiempo actual.");
      return;

    }else{

      this.api.publishOrder(order_object).subscribe((response)=>{
        //Create Channel by order ID.

        console.log((response as any).order_id);

        if ((response as any).workers == "no_workers"){
          alert("Por el momento no hay operadores disponibles!");
        }else{
          let channel = this.pusher.subscribe('order-'+(response as any).order_id);

          channel.bind("order-done",(message)=>{

            let alert = this.alertCtrl.create({
              title: 'Tu lavado ha terminado',
              subTitle: "Tu servicio de lavado termino.",
              buttons: [{
                text: 'Evaluar',
                handler: data =>{
                  this.navCtrl.push('RatePage', message);
                  this.localNotifications.clear(1);
                }
              }]
            });

            alert.present();

            this.localNotifications.schedule({
              id: 1,
              title: 'Orden concluida',
              text: 'Por favor abre la aplicación para mas detalles',
              data: message,
              led: 'Ffff'
            })


          });

          channel.bind("got-worker", (message)=>{
            let alert = this.alertCtrl.create({
              title: 'Se te ha asignado un operador',
              subTitle: "Puedes ver lo detalles en tu historial de ordenes.",
              buttons: [
              {
                text: 'Confirmar',
                role: 'cancel',
                handler: data =>{
                  this.navCtrl.push("GeneratedOrderPage", message);
                }
              }]
            });

            this.localNotifications.schedule({
              id: 2,
              title: 'Tu pedido ha sido asignado',
              data: message,
            });

          alert.present();

          });

          let succ = this.alertCtrl.create({
            title: 'Tu pedido sera agendado a un operador!',
            subTitle: " Se te notificara cuando este vaya en camino!",
            buttons: [
            {
              text: 'Aceptar',
              role: 'cancel',
              handler: data =>{

                this.navCtrl.setRoot('SideMPage');
              }
            }]
          });
          succ.present();
          }

        // this.order_channel = this.pusher.subscribe('')
      });

      //
      // this.order_channel = this.pusher.subscribe('new-orders');
      //
      // order_channel.bind('order-accept', function(data){
      //
      //   this.generateOrder(data);
      //
      // });
      console.log(order_object);
    }


  }

  generateOrder(data: object){
    this.navCtrl.push('TicketPage', {data});
  }

}
