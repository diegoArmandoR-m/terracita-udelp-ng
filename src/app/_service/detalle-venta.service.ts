import { Injectable } from '@angular/core';
import { DetalleVenta } from '../_class/detalle-venta';
import { VentaService } from './venta.service';
import { ProductoService } from './producto.service';

@Injectable({
  providedIn: 'root'
})
export class DetalleVentaService {

  data: DetalleVenta[] = [];

  constructor(
    private ventaService: VentaService,
    private productoService: ProductoService
  ) {
    // Ventas de ejemplo
    const v1 = this.ventaService.get(1) ?? null;
    const v2 = this.ventaService.get(2) ?? null;

    // Productos de ejemplo
    const p1 = this.productoService.get(1) ?? null;
    const p2 = this.productoService.get(2) ?? null;

    this.data = [
      {
        id: 1,
        idVenta: v1,
        idProducto: p1,
        cantidad: 2,
        precioUnitario: 25,
        subTotal: 50
      },
      {
        id: 2,
        idVenta: v1,
        idProducto: p2,
        cantidad: 3,
        precioUnitario: 15,
        subTotal: 45
      },
      {
        id: 3,
        idVenta: v2,
        idProducto: p1,
        cantidad: 1,
        precioUnitario: 25,
        subTotal: 25
      }
    ];
  }

  getAll(): DetalleVenta[] {
    return this.data;
  }

  get(id: number): DetalleVenta | undefined {
    return this.data.find(d => d.id === id);
  }

  add(value: DetalleVenta): void {
    value.id = this.data.reduce((max, item) => item.id > max ? item.id : max, 0) + 1;
    this.data.push(value);
  }

  edit(value: DetalleVenta): void {
    const index = this.data.findIndex(d => d.id === value.id);
    if (index !== -1) {
      this.data[index] = value;
    }
  }

  deleteDetalleVenta(id: number): void {
    this.data = this.data.filter(d => d.id !== id);
  }
}