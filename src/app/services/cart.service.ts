// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model'; // 1. Importa la interfaz

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = []; // 2. Define el tipo del array

  constructor() { }

  getCart() {
    return this.cart;
  }

  addProduct(product: Product) { // 3. Define el tipo del parámetro
    this.cart.push(product);
  }

  // Métodos adicionales
  removeProduct(index: number) {
    this.cart.splice(index, 1);
  }

  clearCart() {
    this.cart = [];
    return this.cart;
  }
}