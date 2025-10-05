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
    this.updateCartItems();
  }

  decreaseProduct(product: Product) {
    this.cartService.decreaseProduct(product);
    this.updateCartItems();
  }

  removeFromCart(product: Product) {
    this.cartService.removeProduct(product);
    this.updateCartItems();
    this.presentToast(`${product.nombre} eliminado del carrito 🗑️`);
  }

  clearCart() {
    this.cartItems = this.cartService.clearCart();
    this.updateCartItems();
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.precio * (item.cantidad || 0)),
      0
    );
  }

  private updateCartItems() {
    this.cartItems = this.cartService.getCart();
  }

  async checkout() {
    if (this.cartItems.length === 0) {
      this.presentToast('Tu carrito está vacío 🛒');
      return;
    }

    // Preparamos los items para Stripe
    const stripeItems = this.cartItems.map(item => ({
      amount: item.precio * 100 * (item.cantidad || 1), // monto en centavos
      productName: item.nombre
    }));

    try {
      // 🔹 URL del emulador local de Firebase Functions
      const res: any = await fetch(
        'http://127.0.0.1:5001/jpetv4/us-central1/api/createStripeSession',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: stripeItems })
        }
      ).then(r => r.json());

      if (res && res.url) {
        // Redirige a Stripe Checkout
        window.location.href = res.url;
      } else {
        this.presentToast('No se pudo generar la sesión de pago 💳');
      }
    } catch (error) {
      console.error(error);
      this.presentToast('Error al procesar el pago 💳');
    }
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
