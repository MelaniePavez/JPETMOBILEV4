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

 { nombre: 'Alimento Premium para Perro', precio: 25990, descripcion: 'Bolsa de 10kg, sabor pollo y arroz, para perros adultos' },

 { nombre: 'Arena Sanitaria para Gato', precio: 11990, descripcion: 'Arena absorbente de 10L con control de olores' },

 { nombre: 'Juguete Pelota Mordedora', precio: 5990, descripcion: 'Pelota de goma resistente para perros medianos' },

{ nombre: 'Rascador para Gatos', precio: 34990, descripcion: 'Rascador de 80cm con base estable y cuerda de sisal' },

 { nombre: 'Correa Retráctil', precio: 8990, descripcion: 'Correa extensible de 5 metros para perros pequeños y medianos' },

{ nombre: 'Cama Acolchada para Mascotas', precio: 19990, descripcion: 'Cama suave y lavable, tamaño mediano' },

 { nombre: 'Jaula de Transporte', precio: 45990, descripcion: 'Jaula plástica con ventilación, ideal para viajes' },

 { nombre: 'Snack Dental para Perro', precio: 4990, descripcion: 'Snacks limpiadores de dientes, pack de 10 unidades' },

 { nombre: 'Collar Antipulgas', precio: 15990, descripcion: 'Protección de hasta 8 meses contra pulgas y garrapatas' },
 { nombre: 'Bebedero Automático', precio: 24990, descripcion: 'Dispensador de agua de 2.5L para gatos y perros pequeños' }

];
  
  cartItemCount!: Observable<number>; // CORRECCIÓN: Se añade "!"

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private cartService: CartService 
  ) {}

  ngOnInit() {
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  async verDetalle(producto: Product) { /* ... tu código ... */ }
  addToCart(producto: Product) { /* ... tu código ... */ }
  async presentToast(message: string) { /* ... tu código ... */ }
}