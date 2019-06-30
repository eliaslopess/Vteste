import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Catalogo',
      url: '/catalogo',
      icon: 'car'
    },
    /*{
      title: 'carteira',
      url: '/#',
      icon: 'wallet'
    },
    {
      title: 'pagamento',
      url: '/#',
      icon: 'card'
    } */

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private authService: AuthService,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  async logout(){
    try {
      await this.authService.logout();
    }catch(error){
      console.error(error);
    }
  }
}
