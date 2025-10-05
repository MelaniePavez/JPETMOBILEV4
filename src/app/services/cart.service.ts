import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor() {
    // Carga el carrito desde localStorage al iniciar el servicio
    const storedCart = localStorage.getItem('my_cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      this.updateCartCount();
    }
  }

  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }

  addProduct(product: Product) {
    let added = false;
    for (let p of this.cart) {
      if (p.nombre === product.nombre) {
        p.cantidad = (p.cantidad || 0) + 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.cantidad = 1;
      this.cart.push(product);
    }
    this.saveCart();
  }

  decreaseProduct(product: Product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.nombre === product.nombre) {
        p.cantidad = (p.cantidad || 0) - 1;
        if (p.cantidad === 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.saveCart();
  }

  removeProduct(product: Product) {
    const index = this.cart.findIndex(p => p.nombre === product.nombre);
    if (index > -1) {
      this.cart.splice(index, 1);
      this.saveCart();
    }
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
    return this.cart;
  }

  private updateCartCount() {
    const totalItems = this.cart.reduce((sum, p) => sum + (p.cantidad || 0), 0);
    this.cartItemCount.next(totalItems);
  }

  private saveCart() {
    localStorage.setItem('my_cart', JSON.stringify(this.cart));
    this.updateCartCount();
  }
}