import { Injectable } from '@angular/core';
import { Compra } from '../_class/compra';
import { Proveedor } from '../_class/proveedor';
import { Usuario } from '../_class/usuario';
import { ProveedorService } from './proveedor.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  data: Compra[] = [];

  constructor(
    private proveedorService: ProveedorService,
    private usuarioService: UsuarioService
  ) {

    const p1: Proveedor | undefined = this.proveedorService.get(1);
    const p2: Proveedor | undefined = this.proveedorService.get(2);
    const p3: Proveedor | undefined = this.proveedorService.get(3);

    const u1: Usuario | undefined = this.usuarioService.get(1);
    const u2: Usuario | undefined = this.usuarioService.get(2);

    this.data = [
      {
        id: 1,
        proveedor: p1 ?? null,
        usuario: u1 ?? null,
        fechaHora: new Date('2025-12-01T10:30:00'),
        total: 1520.50,
        estado: true
      },
      {
        id: 2,
        proveedor: p2 ?? null,
        usuario: u2 ?? null,
        fechaHora: new Date('2025-12-02T16:15:00'),
        total: 980.00,
        estado: true
      },
      {
        id: 3,
        proveedor: p3 ?? null,
        usuario: u1 ?? null,
        fechaHora: new Date('2025-12-03T09:05:00'),
        total: 2150.75,
        estado: false
      }
    ];
  }

  getAll(): Compra[] {
    return this.data;
  }

  get(id: number): Compra | undefined {
    return this.data.find(d => d.id === id);
  }

  add(value: Compra): void {
    value.id = this.data.reduce((max, item) => item.id > max ? item.id : max, 0) + 1;
    this.data.push(value);
  }

  edit(value: Compra): void {
    const index = this.data.findIndex(d => d.id === value.id);
    if (index !== -1) {
      this.data[index] = value;
    }
  }

  deleteCompra(id: number): void {
    this.data = this.data.filter(d => d.id !== id);
  }
}
