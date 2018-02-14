import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private user: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, private fire: AngularFireAuth, public api: ApiServiceProvider) {

    // Assign User to Form.
    this.user = this.formBuilder.group({
      name: ['', [Validators.required]],
      last_name: ['', ],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passw_confirm: ['', [Validators.required]]
    });

    // Check For Logged User.
    // firebase.auth().onAuthStateChanged((currentUser) => {
    //     if (currentUser) {
    //         console.log("User " + currentUser.uid + " is logged in with " + currentUser.providerId);
    //         document.querySelector(".tabbar.show-tabbar")['style'].display = 'none';
    //         this.navCtrl.setRoot('SideMPage', {fireID: currentUser.uid});
    //     } else {
    //         console.log("User is logged out");
    //     }
    // });

  }


  registerUser(){

      let new_user = {
        name: this.user.get('name').value,
        last_name: this.user.get('last_name').value,
        email: this.user.get('email').value,
        password: this.user.get('password').value,
        fireID: ''
      }

        // Create and Load  Spinner.
        let loading = this.loadingCtrl.create({
          content: 'Creando usuario',
          spinner: 'crescent'
        })
        loading.present();


        // Attempt To Create User.

        this.fire.auth.createUserWithEmailAndPassword(new_user.email, new_user.password).then((response)=>{

          loading.dismiss();

          //Add User Data To API.

          new_user.fireID = response.uid;

          let loging = this.loadingCtrl.create({
            content: 'Iniciando Sesión',
            spinner: 'crescent'
          });


          loging.present();
          this.api.createUser(new_user).subscribe((response)=>{
            
            var user = firebase.auth().currentUser;
            if (user) {
                loging.dismissAll();
                console.log("User " + user.uid + " is logged in with " + user.providerId);
                document.querySelector(".tabbar.show-tabbar")['style'].display = 'none';
                this.navCtrl.setRoot('SideMPage', {fireID: user.uid});
            } else {
                console.log("Not logged in");
            }

          });



          }).catch((error)=>{

        //Get Error Code And Show User.

        var ec = error.code;

        if(ec == 'auth/email-already-in-use'){

          loading.dismiss();
          alert('El correo ya se encuentra registrado!')
          return;

        }else if(ec == 'auth/invalid-email'){

          loading.dismiss();
          alert('El correo no es valido!')
          return;

        }else if(ec == 'auth/weak-password'){

          loading.dismiss();
          alert('La contraseña es muy insegura intenta con otra!')
          return;
        }

      });
  }

}
