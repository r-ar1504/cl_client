import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-side-m',
  templateUrl: 'side-m.html',
})
export class SideMPage {
   rootPage :any = 'MenuPage'
  //  rootPage :any = 'RatePage'
   fireID: any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams) {

    firebase.auth().onAuthStateChanged((currentUser) => {
        if (currentUser) {
            console.log("User " + currentUser.uid + " is logged in with " + currentUser.providerId);
            this.fireID = currentUser.uid;
        } else {
            document.querySelector(".tabbar.show-tabbar")['style'].display = 'flex';
            this.navCtrl.setRoot('TabsPage');
        }
    })
  }

  profile(){
    this.navCtrl.push('ProfilePage',{fireID: this.fireID });
  }

  logOut(){
    firebase.auth().signOut();
  }

  orderHistory(){
    this.navCtrl.push('OrderHistoryPage', { fireID: this.fireID });
  }

}
