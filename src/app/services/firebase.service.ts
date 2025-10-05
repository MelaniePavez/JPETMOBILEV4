import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, onValue } from 'firebase/database';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  // Inicializa la app Firebase con tu configuración
  app = initializeApp(environment.firebaseConfig);
  db = getDatabase(this.app);

  constructor() {}

  // 1️⃣ Obtener productos una sola vez
  async getProducts(): Promise<Product[]> {
    const productsRef = ref(this.db, 'productos');
    const snapshot = await get(productsRef);
    const data = snapshot.val();
    // Devuelve un array de productos
    return data ? Object.values(data) : [];
  }

  // 2️⃣ Escuchar cambios en tiempo real
  onProductsChanged(callback: (products: Product[]) => void) {
    const productsRef = ref(this.db, 'productos');
    onValue(productsRef, snapshot => {
      const data = snapshot.val();
      callback(data ? Object.values(data) : []);
    });
  }
}
