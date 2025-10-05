import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';
import { FirebaseService } from '../services/firebase.service';
import { AuthService } from '../services/auth.service';
import { PaymentService } from '../services/payment.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  email: string = '';
  productos: Product[] = []; // Se llenará desde Firebase
  cartItemCount!: Observable<number>;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private firebaseService: FirebaseService,
    private cartService: CartService,
    private authService: AuthService,
    private paymentService: PaymentService
  ) {}

  async ngOnInit() {
    // 1️⃣ Obtener usuario logueado de Firebase Auth
    const user = this.authService.getCurrentUser();
    if (user && user.email) {
      this.email = user.email;
    }

    // 2️⃣ Cargar productos iniciales desde Firebase
    this.productos = await this.firebaseService.getProducts();

    // 3️⃣ Escuchar cambios en tiempo real de los productos
    this.firebaseService.onProductsChanged(products => {
      this.productos = products;
    });

    // 4️⃣ Obtener cantidad de items en el carrito
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

  // Agregar producto al carrito
  addToCart(producto: Product) {
    this.cartService.addProduct(producto);
    this.presentToast(`${producto.nombre} agregado al carrito 🛒`);
  }

  // Pagar un producto usando Stripe
  async pagarProducto(producto: Product) {
    try {
      // Stripe requiere el monto en centavos
      const amount = producto.precio * 100;

      // Llamar a la función de Firebase para crear sesión de pago
      const url = await this.paymentService.createCheckoutSession(amount, producto.nombre);

      // Redirigir al usuario al checkout de Stripe
      window.location.href = url;

    } catch (error) {
      console.error('Error al crear sesión de pago:', error);
      this.presentToast('No se pudo iniciar el pago. Intenta nuevamente.');
    }
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
