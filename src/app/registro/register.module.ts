import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { RegisterPage } from './register.page'; // 👈 coincide con la clase

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: RegisterPage }])
  ],
  declarations: [RegisterPage] // 👈 coincide con la clase
})
export class RegisterPageModule {}
