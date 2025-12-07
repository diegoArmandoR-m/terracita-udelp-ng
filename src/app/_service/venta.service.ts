import { Injectable } from '@angular/core';
import { Venta } from '../_class/venta';
import { MetodoPagoService } from './metodo-pago.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  data: Venta[] = [];

  constructor(
    private metodoPagoService: MetodoPagoService,
    private usuarioService: UsuarioService
  ) {
    // Ejemplos usando los métodos de pago y usuarios que ya tienes
    const mp1 = this.metodoPagoService.get(1) ?? null;
    const mp2 = this.metodoPagoService.get(2) ?? null;
    const mp3 = this.metodoPagoService.get(3) ?? null;

    const u1 = this.usuarioService.get(1) ?? null;
    const u2 = this.usuarioService.get(2) ?? null;
    const u3 = this.usuarioService.get(3) ?? null;

    this.data = [
      {
        id: 1,
        fechaHora: new Date('2025-01-10T10:15:00'),
        total: 350.50,
        idMetodoPago: mp1,
        idUsuario: u1,
        estado: true
      },
      {
        id: 2,
        fechaHora: new Date('2025-01-11T16:30:00'),
        total: 780.00,
        idMetodoPago: mp2,
        idUsuario: u2,
        estado: true
      },
      {
        id: 3,
        fechaHora: new Date('2025-01-12T12:05:00'),
        total: 120.00,
        idMetodoPago: mp3,
        idUsuario: u3,
        estado: false
      }
    ];
  }

  getAll(): Venta[] {
    return this.data;
  }

  get(id: number): Venta | undefined {
    return this.data.find(d => d.id === id);
  }

  add(value: Venta): void {
    value.id = this.data.reduce((max, item) => item.id > max ? item.id : max, 0) + 1;
    this.data.push(value);
  }

  edit(value: Venta): void {
    const index = this.data.findIndex(d => d.id === value.id);
    if (index !== -1) {
      this.data[index] = value;
    }
  }

  deleteVenta(id: number): void {
    this.data = this.data.filter(d => d.id !== id);
  }
}