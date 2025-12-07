import { Injectable } from '@angular/core';
import { UnidadMedida } from '../_class/unidad-medida';

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaService {
  data: UnidadMedida[] = [
    { id: 1, nombre: "Kilogramos", abreviatura: "Kg", activo: true },
    { id: 2, nombre: "Litros", abreviatura: "L", activo: true },
    { id: 3, nombre: "Gramos", abreviatura: "g", activo: true },
    { id: 4, nombre: "Mililitros", abreviatura: "ml", activo: false },
  ]

  constructor() { }

  getAll(): UnidadMedida[] {
    return this.data;
  }

  get(id: number): UnidadMedida | undefined {
    return this.data.find(d => d.id == id);
  }

  add(value: UnidadMedida) {
    value.id = this.data.reduce((max, item) => item.id > max ? item.id : max, 0) + 1;
    this.data.push(value);
  }

  edit(value: UnidadMedida) {
    const index = this.data.findIndex(d => d.id === value.id);
    if (index !== -1) {
      this.data[index] = value;
    }
  }

  deleteUnidadMedida(id: number) {
    this.data = this.data.filter(d => d.id !== id);
  }
}
