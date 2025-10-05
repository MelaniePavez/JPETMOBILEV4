import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  // Objeto de usuario con datos de ejemplo
  // Más adelante, estos datos vendrán de Firebase
  user = {
    nombre: 'Melanie',
    apellido: 'Pavez',
    email: 'melanie.pavez@jpet.com',
    telefono: '+56 9 1234 5678'
  };

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    // Aquí iría la lógica para cargar los datos del usuario desde un servicio
  }

  cerrarSesion() {
    // Aquí iría la lógica para cerrar la sesión en Firebase
    this.navCtrl.navigateRoot('/login');
  }

}