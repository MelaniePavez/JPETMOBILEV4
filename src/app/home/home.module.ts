import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // 1. Importa CUSTOM_ELEMENTS_SCHEMA
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // 2. Añade esta línea
})
export class HomePageModule {}