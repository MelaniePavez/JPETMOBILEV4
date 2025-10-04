import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private menu: MenuController,
    private navCtrl: NavController
  ) {}

  // Cambia el nombre a cerrarMenu (sin tilde) para coincidir con el template
  cerrarMenu() {
    this.menu.close('mainMenu');
  }

  async cerrarSesion() {
    await this.cerrarMenu(); // Usamos el mismo método para cerrar el menú
    this.navCtrl.navigateRoot('/login');
    // Aquí puedes añadir lógica adicional como limpiar storage, etc.
  }
}