export interface Product {
  nombre: string;
  precio: number;
  descripcion: string;
  cantidad?: number; // La '?' hace que la propiedad sea opcional
}