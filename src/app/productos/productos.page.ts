import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';
import { FirebaseService } from '../services/firebase.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  email: string = 'usuario@ejemplo.com';
  productos: Product[] = []; // Inicialmente vacío, se llenará desde Firebase
  cartItemCount!: Observable<number>;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private firebaseService: FirebaseService,
    private cartService: CartService
  ) {}

  async ngOnInit() {
    // 1️⃣ Carga inicial de productos desde Firebase
    this.productos = await this.firebaseService.getProducts();

    // 2️⃣ Escucha en tiempo real si se modifican los productos en Firebase
    this.firebaseService.onProductsChanged(products => {
      this.productos = products;
    });

    // 3️⃣ Obtener cantidad de items en carrito
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  // Mostrar detalle del producto
  async verDetalle(producto: Product) {
    const alert = await this.alertController.create({
      header: producto.nombre,
      message: `
        <img src="${producto.imagen}" style="width: 100%; border-radius: 10px; margin-bottom: 10px;">
        <p>${producto.descripcion}</p>
        <p><strong>Precio:</strong> $${producto.precio.toLocaleString()}</p>
      `,
      buttons: ['Cerrar']
    });
    await alert.present();
  }

  // Agregar al carrito
  addToCart(producto: Product) {
    this.cartService.addProduct(producto);
    this.presentToast(`${producto.nombre} agregado al carrito 🛒`);
  }

  // Mostrar toast de confirmación
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }
}
