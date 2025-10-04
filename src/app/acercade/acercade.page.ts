import { Component } from '@angular/core';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.page.html',
  styleUrls: ['./acercade.page.scss'],
})
export class AcercadePage {
  emailContacto = 'info@tiendadeportivapro.com';
  telefono = '+1 234 567 890';
  direccion = 'Calle Deportiva 123, Ciudad Deportiva';

  constructor() {}

  openSocialMedia(url: string) {
    window.open(url, '_blank');
  }
}