import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceOrderPage } from './service-order';

@NgModule({
  declarations: [
    ServiceOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceOrderPage),
  ],
})
export class ServiceOrderPageModule {}
