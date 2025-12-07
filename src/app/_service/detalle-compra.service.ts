import { Injectable } from '@angular/core';
import { DetalleCompra } from '../_class/detalle-compra';
import { CompraService } from './compra.service';
import { ProductoService } from './producto.service';

@Injectable({
  providedIn: 'root'
})
export class DetalleCompraService {

  data: DetalleCompra[] = [];

  constructor(
    private compraService: CompraService,
    private productoService: ProductoService
  ) {
    // Traemos compras de ejemplo
    const c1 = this.compraService.get(1) ?? null;
    const c2 = this.compraService.get(2) ?? null;

    // Traemos productos de ejemplo
    const p1 = this.productoService.get(1) ?? null;
    const p2 = this.productoService.get(2) ?? null;

    this.data = [
      {
        id: 1,
        idCompra: c1,
        idProducto: p1,
        cantidad: 5,
        precioUnitario: 10,
        subtotal: 50
      },
      {
        id: 2,
        idCompra: c1,
        idProducto: p2,
        cantidad: 3,
        precioUnitario: 15,
        subtotal: 45
      },
      {
        id: 3,
        idCompra: c2,
        idProducto: p1,
        cantidad: 2,
        precioUnitario: 10,
        subtotal: 20
      }
    ];
  }

  getAll(): DetalleCompra[] {
    return this.data;
  }

  get(id: number): DetalleCompra | undefined {
    return this.data.find(d => d.id === id);
  }

  add(value: DetalleCompra): void {
    value.id = this.data.reduce((max, item) => item.id > max ? item.id : max, 0) + 1;
    this.data.push(value);
  }

  edit(value: DetalleCompra): void {
    const index = this.data.findIndex(d => d.id === value.id);
    if (index !== -1) {
      this.data[index] = value;
    }
  }

  deleteDetalleCompra(id: number): void {
    this.data = this.data.filter(d => d.id !== id);
  }
}