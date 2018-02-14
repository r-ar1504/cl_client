import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {ApiServiceProvider} from '../../providers/api-service/api-service';
import firebase from 'firebase';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public user : FormGroup;
  user_id: any;
  usero ={};
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,public loadingCtrl: LoadingController, public api: ApiServiceProvider) {

    this.user_id = this.navParams.get('fireID');
    this.getUser(this.user_id);

    this.user = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
    })

  }

  getUser(user_id: string){

    this.api.getUser(this.user_id).subscribe(
    (response) => {
       this.usero = (response as any).user;
       console.log(response);
       console.log(this.usero)
    },
    (error) => { console.log(error); });

  }

  updateUser(user_id: string){

    let new_user = {
      email: this.user.get('email').value,
      phone: this.user.get('phone').value
    }

    firebase.auth().currentUser.updateEmail(new_user.email).then(()=>{

      this.api.updateUser(this.user_id, new_user).subscribe((response)=>{
        this.getUser(this.user_id);
      })

      alert("Se han actualizado tus datos!");
    }).catch((error) =>{
      if(error['message'] == "EMAIL_EXISTS"){
        alert("Lo sentimos, este correo ya esta registrado con otro usuario.");
      }else{
        alert("Lo sentimos, ha ocurrido un error.");
      }
    })
  }


}
