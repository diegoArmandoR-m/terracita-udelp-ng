// src/app/_class/compra.ts
import { Proveedor } from "./proveedor";
import { Usuario } from "./usuario";

export interface Compra {
  id: number;
  proveedor: Proveedor | null;
  usuario: Usuario | null;
  fechaHora: Date;
  total: number;
  estado: boolean;
}
