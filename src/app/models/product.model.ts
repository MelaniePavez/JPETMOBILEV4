export interface Product {
  nombre: string;
  precio: number;
  descripcion: string;
  imagen?: string;
  cantidad?: number; // ✅ cantidad en el carrito (opcional)
}
