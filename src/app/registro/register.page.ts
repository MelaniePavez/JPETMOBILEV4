import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  async register() {
    if (!this.email) { this.mostrarAlerta('El correo no puede estar vacío'); return; }
    if (!this.validarEmail(this.email)) { this.mostrarAlerta('Formato de correo inválido'); return; }
    if (!this.password) { this.mostrarAlerta('La contraseña no puede estar vacía'); return; }
    if (this.password.length > 4) { this.mostrarAlerta('La contraseña no puede tener más de 4 caracteres'); return; }

    try {
      await this.authService.register(this.email, this.password);
      const toast = await this.toastController.create({
        message: 'Registro exitoso ✅',
        duration: 1500,
        position: 'bottom',
        color: 'success'
      });
      toast.present();

      // Redirige al login
      this.navCtrl.navigateRoot('/login');
    } catch (error: any) {
      this.mostrarAlerta(`Error de registro: ${error.message}`);
    }
  }
}
