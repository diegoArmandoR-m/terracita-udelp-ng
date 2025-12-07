// src/app/_service/inventario.service.ts
import { Injectable } from '@angular/core';
import { Inventario } from '../_class/inventario';
import { ProductoService } from './producto.service';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private data: Inventario[] = [];

  constructor(private productoService: ProductoService) {
    this.cargarDesdeProductos();
  }

  /** Reconstruye el inventario a partir de los productos ACTIVOS */
  private cargarDesdeProductos(): void {
    this.data = this.productoService
      .getAll()
      .filter(p => p.estado)          // solo productos activos
      .map(p => ({ producto: p }));   // adaptamos al tipo Inventario
  }

  /** Obtiene todo el inventario */
  getAll(): Inventario[] {
    return this.data;
  }

  /** Refrescar manualmente si cambian productos */
  refresh(): void {
    this.cargarDesdeProductos();
  }

  /** Obtener un registro por id de producto (opcional) */
  getByProductoId(id: number): Inventario | undefined {
    return this.data.find(i => i.producto?.id === id);
  }
}