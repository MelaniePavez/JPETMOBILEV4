import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, MenuController, NavController } from '@ionic/angular'; // 1. Importa NavController

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  categories = [
    { name: 'Perros', img: 'assets/img/alimento_premium.jpg' },
    { name: 'Gatos', img: 'assets/img/arena_sanitaria.jpg' },
    { name: 'Juguetes', img: 'assets/img/pelota_mordedor.jpg' },
    { name: 'Accesorios', img: 'assets/img/correa_retractil.jpg' }
  ];

  productos = [
    { nombre: 'Alimento Premium', precio: 25990, enStock: true, imagen: 'assets/img/alimento_premium.jpg' },
    { nombre: 'Cama Acolchada', precio: 19990, enStock: true, imagen: 'assets/img/cama_acolchada.jpg' },
    { nombre: 'Snack Dental', precio: 4990, enStock: false, imagen: 'assets/img/snack_dental.jpg' },
    { nombre: 'Rascador para Gatos', precio: 34990, enStock: true, imagen: 'assets/img/rascador_gato.jpg' }
  ];

  email: string = '';
  bienvenidos: string = 'Bienvenid@';

  // 2. Inyecta NavController en el constructor
  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private menu: MenuController,
    private navCtrl: NavController 
  ) {}

  ngOnInit() {
    this.menu.close("mainMenu");
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  // 3. Crea una función para navegar a la página de productos
  goToProductos() {
    this.navCtrl.navigateForward('/productos');
  }

  async mostrarAlerta(producto: any) {
    const alert = await this.alertController.create({
      header: 'Estado del Producto',
      message: producto.enStock ? 'El producto está en stock.' : 'El producto no está en stock.',
      buttons: ['OK']
    });
    await alert.present();
  }
}