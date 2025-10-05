import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Product[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor() {}

  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }

  addProduct(product: Product) {
    // Busca si ya está en el carrito
    const item = this.cart.find(p => p.nombre === product.nombre);
    if (item) {
      item.cantidad = (item.cantidad || 1) + 1;
    } else {
      this.cart.push({ ...product, cantidad: 1 });
    }
    this.cartItemCount.next(this.cart.reduce((total, p) => total + (p.cantidad || 0), 0));
  }

  decreaseProduct(product: Product) {
    const index = this.cart.findIndex(p => p.nombre === product.nombre);
    if (index > -1) {
      const item = this.cart[index];
      if (item.cantidad && item.cantidad > 1) {
        item.cantidad--;
      } else {
        this.cart.splice(index, 1);
      }
      this.cartItemCount.next(this.cart.reduce((total, p) => total + (p.cantidad || 0), 0));
    }
  }

  removeProduct(product: Product) {
    this.cart = this.cart.filter(p => p.nombre !== product.nombre);
    this.cartItemCount.next(this.cart.reduce((total, p) => total + (p.cantidad || 0), 0));
  }

  clearCart(): Product[] {
    this.cart = [];
    this.cartItemCount.next(0);
    return this.cart;
  }
}
