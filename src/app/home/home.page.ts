import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  
   productos = [
    { nombre: 'Sin producto', precio: 999, enStock: true },
    { nombre: 'Sin producto', precio: 999, enStock: false },
    { nombre: 'Sin producto', precio: 999, enStock: true },
    { nombre: 'Sin producto', precio: 999, enStock: false },
    { nombre: 'Sin producto', precio: 999, enStock: true }
  ];

  constructor(private route: ActivatedRoute, private alertController: AlertController, private menu: MenuController) {}
  email: string = '';
  password: string = '';

  bienvenidos: string='Bienvenid@';

  ngOnInit() {
    this.menu.close("mainMenu");
    // Obtener los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.password = params['password'];
    });
  }

  // Método para mostrar alerta sobre el stock del producto
  async mostrarAlerta(producto:any) {
    const alert = await this.alertController.create({
      header: 'Estado del Producto',
      message: producto.enStock ? 'El producto está en stock' : 'El producto no está en stock',
      buttons: ['OK']
    });

    await alert.present();
  }

}
