import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductosPage } from './productos.page'; // Importación correcta

const routes: Routes = [
  {
    path: '',
    component: ProductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosPageRoutingModule {}