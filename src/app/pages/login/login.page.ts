import { AuthService } from './../../services/auth.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';

import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  public userLogin:User = {};
  public userRegister:User = {};
  private loading: any;

  constructor( 
    public keyboard: Keyboard,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private AuthService:AuthService
    ) { }

  ngOnInit() {  }

  segmentChanged(event: any){
    if (event.detail.value === "login"){
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
    }
  }

  async login(){
    await this.presentLoading();

    try{
      await this.AuthService.login(this.userLogin);
      } catch(error){
        this.presentToast(error.message);
      } finally{
      this.loading.dismiss();
      }
    }


  async register() {
    await this.presentLoading();

    try{
    await this.AuthService.register(this.userRegister);
    } catch(error){
      let message: string;

      switch (error.code){
        case 'auth/email-already-in-use':
          message = "E-mail já está sendo usado!";
          break;
        case 'auth/invalid-email':
          message = "Favor Insira um E-mail Válido";
          break;
      }

      this.presentToast(message);
    } finally{
    this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde...'});
    return this.loading.present();
  }
  
  async presentToast(message: string){
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}
