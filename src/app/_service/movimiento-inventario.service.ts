import { Injectable } from '@angular/core';
import { MovimientoInventario } from '../_class/movimiento-inventario';
import { ProductoService } from './producto.service';
import { OtroMovimientoService } from './otro-movimiento.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class MovimientoInventarioService {

  data: MovimientoInventario[] = [];

  constructor(
    private productoService: ProductoService,
    private otroMovimientoService: OtroMovimientoService,
    private usuarioService: UsuarioService
  ) {
    const p1 = this.productoService.get(1) ?? null;
    const p2 = this.productoService.get(2) ?? null;

    const tmEntradaCompra   = this.otroMovimientoService.get(1) ?? null; // Entrada por compra
    const tmSalidaVenta     = this.otroMovimientoService.get(2) ?? null; // Salida por venta
    const tmAjusteInventario = this.otroMovimientoService.get(5) ?? null; // Ajuste de inventario

    const u1 = this.usuarioService.get(1) ?? null;
    const u2 = this.usuarioService.get(2) ?? null;

    this.data = [
      {
        id: 1,
        idProducto: p1,
        idOtroMovimiento: tmEntradaCompra,
        cantidad: 10,
        existenciaAnterior: 50,
        existenciaActual: 60,
        referecia: 'COMPRA-001',
        fechaHora: new Date('2025-01-10T09:00:00'),
        idUsuario: u1,
        motivo: 'Reposición de stock por compra a proveedor'
      },
      {
        id: 2,
        idProducto: p1,
        idOtroMovimiento: tmSalidaVenta,
        cantidad: 3,
        existenciaAnterior: 60,
        existenciaActual: 57,
        referecia: 'VENTA-015',
        fechaHora: new Date('2025-01-10T11:30:00'),
        idUsuario: u2,
        motivo: 'Salida por venta en punto de venta'
      },
      {
        id: 3,
        idProducto: p2,
        idOtroMovimiento: tmAjusteInventario,
        cantidad: 2,
        existenciaAnterior: 20,
        existenciaActual: 22,
        referecia: 'AJUSTE-INV-03',
        fechaHora: new Date('2025-01-11T17:45:00'),
        idUsuario: u1,
        motivo: 'Ajuste positivo por conteo físico'
      }
    ];
  }

  getAll(): MovimientoInventario[] {
    return this.data;
  }

  get(id: number): MovimientoInventario | undefined {
    return this.data.find(d => d.id === id);
  }

  add(value: MovimientoInventario): void {
    value.id = this.data.reduce((max, item) => item.id > max ? item.id : max, 0) + 1;
    this.data.push(value);
  }

  edit(value: MovimientoInventario): void {
    const index = this.data.findIndex(d => d.id === value.id);
    if (index !== -1) {
      this.data[index] = value;
    }
  }

  deleteMovimientoInventario(id: number): void {
    this.data = this.data.filter(d => d.id !== id);
  }
}