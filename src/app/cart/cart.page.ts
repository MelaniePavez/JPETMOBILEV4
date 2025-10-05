import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cartItems: Product[] = [];

  constructor(
    private cartService: CartService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCart();
  }

  increaseProduct(product: Product) {
    this.cartService.addProduct(product);
  }

  decreaseProduct(product: Product) {
    this.cartService.decreaseProduct(product);
  }

  removeFromCart(product: Product) {
    this.cartService.removeProduct(product);
    this.presentToast(`${product.nombre} eliminado del carrito 🗑️`);
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.precio * (item.cantidad || 0)), 0);
  }

  clearCart() {
    this.cartItems = this.cartService.clearCart();
  }

  async checkout() {
    if (this.cartItems.length === 0) {
      this.presentToast('Tu carrito está vacío 🛒');
      return;
    }

    // Aquí podrías integrar pago o resumen de compra
    this.presentToast('Compra procesada correctamente ✅');
    this.clearCart();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'bottom',
      color: 'primary'
    });
    toast.present();
  }
}
