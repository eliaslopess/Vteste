import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {
  public products = new Array<Product>();
  private productSubscription: Subscription;
  private loading: any;

  constructor(
    private productsService: ProductService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
    ) {
    this.productSubscription = this.productsService.getProducts().subscribe(data => {
      this.products = data;
    });
   }

  ngOnInit() {}

  ngOnDestroy() {
      this.productSubscription.unsubscribe();
    }
  async logout(){
    try {
      await this.authService.logout();
    }catch(error){
      console.error(error);
    }
  }

  async deleteProduct(id: string){
    try{ 
      await this.productsService.deleteProduct(id);
    } catch(error){
      this.presentToast("Erro ao tentar salvar");
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}