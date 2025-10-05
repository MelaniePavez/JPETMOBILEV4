import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cartItems: Product[] = [];

  constructor(
    private cartService: CartService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.cartItems = this.cartService.getCart();
  }

  increaseCartItem(product: Product) {
    this.cartService.addProduct(product);
  }

  decreaseCartItem(product: Product) {
    this.cartService.decreaseProduct(product);
  }

  removeFromCart(product: Product) {
    this.cartService.removeProduct(product);
  }

  getTotal() {
    return this.cartItems.reduce((total, item) => total + (item.precio * (item.cantidad || 0)), 0);
  }

  async checkout() {
    const alert = await this.alertController.create({
      header: '¡Gracias por tu compra!',
      message: `El total de tu compra es $${this.getTotal().toLocaleString('es-CL')}`,
      buttons: ['OK']
    });

    await alert.present();

    alert.onDidDismiss().then(() => {
      this.cartItems = this.cartService.clearCart();
    });
  }
}