import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Facebook } from "@ionic-native/facebook";
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Geolocation } from '@ionic-native/geolocation';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import { CardIO } from '@ionic-native/card-io';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { PusherProvider } from '../providers/pusher/pusher';

var config = {
    apiKey: "AIzaSyB-37ZjIsKU4fnmrDkXmjgQs-ArFVROxmg",
    authDomain: "carlab-v2.firebaseapp.com",
    databaseURL: "https://carlab-v2.firebaseio.com",
    projectId: "carlab-v2",
    storageBucket: "carlab-v2.appspot.com",
    messagingSenderId: "797490155263"
  }

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // ServiceOrderPage
    // ServiceDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GoogleMaps,
    Facebook,
    Geolocation,
    ApiServiceProvider,
    CardIO,
    LocalNotifications,
    BackgroundMode,
    PusherProvider
  ]
})
export class AppModule {}
