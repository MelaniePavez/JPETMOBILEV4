import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  email: string = 'usuario@ejemplo.com';

  productos: Product[] = [
    { 
      nombre: 'Alimento Premium para Perro',
      precio: 25990,
      descripcion: 'Bolsa de 10kg, sabor pollo y arroz, para perros adultos',
      imagen: 'assets/img/alimento_premium.jpg'
    },
    { 
      nombre: 'Arena Sanitaria para Gato',
      precio: 11990,
      descripcion: 'Arena absorbente de 10L con control de olores',
      imagen: 'assets/img/arena_sanitaria.jpg'
    },
    { 
      nombre: 'Bebedero Automático',
      precio: 24990,
      descripcion: 'Dispensador de agua de 2.5L para gatos y perros pequeños',
      imagen: 'assets/img/bebedero_automatico.jpg'
    },
    { 
      nombre: 'Cama Acolchada para Mascotas',
      precio: 19990,
      descripcion: 'Cama suave y lavable, tamaño mediano',
      imagen: 'assets/img/cama_acolchada.jpg'
    },
    { 
      nombre: 'Collar Antipulgas',
      precio: 15990,
      descripcion: 'Protección de hasta 8 meses contra pulgas y garrapatas',
      imagen: 'assets/img/collar_antipulgas.jpg'
    },
    { 
      nombre: 'Correa Retráctil',
      precio: 8990,
      descripcion: 'Correa extensible de 5 metros para perros pequeños y medianos',
      imagen: 'assets/img/correa_retractil.jpg'
    },
    { 
      nombre: 'Jaula de Transporte',
      precio: 45990,
      descripcion: 'Jaula plástica con ventilación, ideal para viajes',
      imagen: 'assets/img/jaula_transporte.jpg'
    },
    { 
      nombre: 'Juguete Pelota Mordedora',
      precio: 5990,
      descripcion: 'Pelota de goma resistente para perros medianos',
      imagen: 'assets/img/pelota_mordedor.jpg'
    },
    { 
      nombre: 'Rascador para Gatos',
      precio: 34990,
      descripcion: 'Rascador de 80cm con base estable y cuerda de sisal',
      imagen: 'assets/img/rascador_gato.jpg'
    },
    { 
      nombre: 'Snack Dental para Perro',
      precio: 4990,
      descripcion: 'Snacks limpiadores de dientes, pack de 10 unidades',
      imagen: 'assets/img/snack_dental.jpg'
    }
  ];

  cartItemCount!: Observable<number>;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartItemCount = this.cartService.getCartItemCount();
  }

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

  addToCart(producto: Product) {
    this.cartService.addProduct(producto);
    this.presentToast(`${producto.nombre} agregado al carrito 🛒`);
  }

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
