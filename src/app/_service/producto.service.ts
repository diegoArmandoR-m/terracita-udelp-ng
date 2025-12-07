// src/app/_service/producto.service.ts
import { Injectable } from '@angular/core';
import { Producto } from '../_class/producto';
import { UnidadMedidaService } from './unidad-medida.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  data: Producto[] = [];

  constructor(
    private unidadMedidaService: UnidadMedidaService
  ) {
    // Unidades de medida de ejemplo (ajusta los IDs a los que ya tengas)
    const umPieza = this.unidadMedidaService.get(1) ?? null;
    const umLitro = this.unidadMedidaService.get(2) ?? null;
    const umKg    = this.unidadMedidaService.get(3) ?? null;

    // OJO: aquí ya NO usamos CategoriaService para evitar el ciclo.
    // Las categorías se “incrustan” como objetos simples.
    this.data = [
      {
        id: 1,
        nombre: "Agua",
        precio: 15.4,
        existencia: "23",
        categoria: {
          id: 1,
          nombre: "Bebidas",
          descripcion: "Bebidas en general",
          producto: null
        },
        estado: true,
        codigoBarras: "750000000001",
        idUnidadMedida: umLitro
      },
      {
        id: 2,
        nombre: "Papas",
        precio: 20,
        existencia: "33",
        categoria: {
          id: 2,
          nombre: "Snacks",
          descripcion: "Botanas y snacks",
          producto: null
        },
        estado: true,
        codigoBarras: "750000000002",
        idUnidadMedida: umPieza
      },
      {
        id: 3,
        nombre: "Fabuloso",
        precio: 38.5,
        existencia: "0",
        categoria: {
          id: 3,
          nombre: "Limpieza",
          descripcion: "Productos de limpieza",
          producto: null
        },
        estado: false,
        codigoBarras: "750000000003",
        idUnidadMedida: umLitro
      },
      {
        id: 4,
        nombre: "Fabulosooo",
        precio: 39.5,
        existencia: "1",
        categoria: {
          id: 3,
          nombre: "Limpieza",
          descripcion: "Productos de limpieza",
          producto: null
        },
        estado: true,
        codigoBarras: "750000000004",
        idUnidadMedida: umKg
      }
    ];
  }

  getAll(): Producto[] {
    return this.data;
  }

  get(id: number): Producto | undefined {
    return this.data.find(d => d.id === id);
  }

  add(value: Producto): void {
    value.id = this.data.reduce((max, item) => item.id > max ? item.id : max, 0) + 1;
    this.data.push(value);
  }

  edit(value: Producto): void {
    const index = this.data.findIndex(d => d.id === value.id);
    if (index !== -1) {
      this.data[index] = value;
    }
  }

  deleteProducto(id: number): void {
    this.data = this.data.filter(d => d.id !== id);
  }
}