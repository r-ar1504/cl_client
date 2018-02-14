import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PusherProvider } from '../../providers/pusher/pusher';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
/**
 * Generated class for the RatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rate',
  templateUrl: 'rate.html',
})
export class RatePage {

  private evaluation: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pusher:  PusherProvider,
    private formB:  FormBuilder) {
      this.evaluation = this.formB.group({
        l_e:['', Validators.required],
        l_i:['', Validators.required],
        ll_v:['', Validators.required],
        com:['', Validators.required]
      });
  }

  ionViewDidLoad() {
  }

}
