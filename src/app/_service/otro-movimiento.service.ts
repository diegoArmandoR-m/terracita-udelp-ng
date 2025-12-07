// src/app/_service/otro-movimiento.service.ts
import { Injectable } from '@angular/core';
import { OtroMovimiento } from '../_class/otro-movimiento';

@Injectable({
  providedIn: 'root'
})
export class OtroMovimientoService {

  data: OtroMovimiento[] = [
    {
      id: 1,
      name: 'Entrada por compra',
      esEntrada: true,
      descripcion: 'Ingreso de inventario por compra a proveedor',
      activo: true
    },
    {
      id: 2,
      name: 'Salida por venta',
      esEntrada: false,
      descripcion: 'Salida de inventario por venta en punto de venta',
      activo: true
    },
    {
      id: 3,
      name: 'Devolución de cliente',
      esEntrada: true,
      descripcion: 'Entrada de inventario por devolución de cliente',
      activo: true
    },
    {
      id: 4,
      name: 'Devolución a proveedor',
      esEntrada: false,
      descripcion: 'Salida de inventario por devolución a proveedor',
      activo: true
    },
    {
      id: 5,
      name: 'Ajuste de inventario',
      esEntrada: true,
      descripcion: 'Ajuste positivo por conteo físico de inventario',
      activo: true
    },
    {
      id: 6,
      name: 'Merma por caducidad',
      esEntrada: false,
      descripcion: 'Salida de inventario por productos caducos o dañados',
      activo: false
    }
  ];

  constructor() { }

  getAll(): OtroMovimiento[] {
    return this.data;
  }

  get(id: number): OtroMovimiento | undefined {
    return this.data.find(d => d.id === id);
  }

  add(value: OtroMovimiento): void {
    value.id = this.data.reduce((max, item) => item.id > max ? item.id : max, 0) + 1;
    this.data.push(value);
  }

  edit(value: OtroMovimiento): void {
    const index = this.data.findIndex(d => d.id === value.id);
    if (index !== -1) {
      this.data[index] = value;
    }
  }

  deleteOtroMovimiento(id: number): void {
    this.data = this.data.filter(d => d.id !== id);
  }
}