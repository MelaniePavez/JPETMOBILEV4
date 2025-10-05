import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Productos', url: '/productos', icon: 'storefront' },
    { title: 'Mi Perfil', url: '/perfil', icon: 'person-circle' },
    { title: 'Acerca de', url: '/acerca', icon: 'information-circle' }, // <-- LÍNEA CORREGIDA
  ];

  constructor(
    private menu: MenuController,
    private navCtrl: NavController
  ) {}

  cerrarMenu() {
    this.menu.close('mainMenu');
  }

  async cerrarSesion() {
    await this.cerrarMenu();
    this.navCtrl.navigateRoot('/login');
  }
}