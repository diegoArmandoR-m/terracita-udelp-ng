// src/app/_class/producto.ts
import { Categoria } from "./categoria";
import { UnidadMedida } from "./unidad-medida";

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  existencia: string;
  estado: boolean;
  categoria: Categoria | null;

  // NUEVOS CAMPOS
  codigoBarras: string;
  idUnidadMedida: UnidadMedida | null;

  // usado en Punto de Venta (no es obligatorio en BD)
  cantidad?: number;
}