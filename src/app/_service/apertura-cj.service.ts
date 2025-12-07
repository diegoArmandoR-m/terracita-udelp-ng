import { Injectable } from '@angular/core';
import { AperturaCj } from '../_class/apertura-cj';
import { Usuario } from '../_class/usuario';

@Injectable({
  providedIn: 'root'
})
export class AperturaCajaService {

  // Ejemplos de datos
  data: AperturaCj[] = [
    {
      id: 1,
      idUsuario: { id: 1, name: 'admin', passwordHash: '***', rol: 'ADMIN', estado: true } as Usuario,
      fechaApertura: new Date('2025-12-01T09:00:00'),
      montoInicial: 1000,
      fechaCierre: new Date('2025-12-01T18:00:00'),
      montoFinal: 1500,
      diferencia: 500,
      estado: true
    },
    {
      id: 2,
      idUsuario: { id: 2, name: 'vendedor1', passwordHash: '***', rol: 'VENDEDOR', estado: true } as Usuario,
      fechaApertura: new Date('2025-12-02T10:00:00'),
      montoInicial: 800,
      fechaCierre: new Date('2025-12-02T17:30:00'),
      montoFinal: 780,
      diferencia: -20,
      estado: true
    }
  ];

  constructor() { }

  getAll(): AperturaCj[] {
    return this.data;
  }

  get(id: number): AperturaCj | undefined {
    return this.data.find(d => d.id === id);
  }

  add(value: AperturaCj): void {
    value.id = this.data.reduce((max, item) => item.id > max ? item.id : max, 0) + 1;
    this.data.push(value);
  }

  edit(value: AperturaCj): void {
    const index = this.data.findIndex(d => d.id === value.id);
    if (index !== -1) {
      this.data[index] = value;
    }
  }

  deleteApertura(id: number): void {
    this.data = this.data.filter(d => d.id !== id);
  }
}
