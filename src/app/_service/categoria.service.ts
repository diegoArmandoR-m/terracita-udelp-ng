// src/app/_service/categoria.service.ts
import { Injectable } from '@angular/core';
import { Categoria } from '../_class/categoria';
import { ProductoService } from './producto.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  // Igual que UnidadMedidaService: usamos "data"
  data: Categoria[] = [
    { id: 1, nombre: "Bebidas",  descripcion: "Bebidas en general",        producto: null },
    { id: 2, nombre: "Snacks",   descripcion: "Botanas y snacks",          producto: null },
    { id: 3, nombre: "Limpieza", descripcion: "Productos de limpieza",     producto: null }
  ];

  constructor(private productoService: ProductoService) { }

  // ===== API estilo UnidadMedidaService =====
  getAll(): Categoria[] {
    return this.data;
  }

  get(id: number): Categoria | undefined {
    return this.data.find(cat => cat.id === id);
  }

  addCategoria(value: Categoria): void {
    value.id = this.data.reduce((max, item) => item.id > max ? item.id : max, 0) + 1;
    this.data.push(value);
  }

  editCategoria(value: Categoria): void {
    const index = this.data.findIndex(cat => cat.id === value.id);
    if (index !== -1) {
      this.data[index] = value;
    }
  }

  deleteCategoria(id: number): void {
    this.data = this.data.filter(cat => cat.id !== id);
  }

  // ===== Métodos de compatibilidad (no rompemos tu código viejo) =====
  getCategorias(): Categoria[] {
    return this.getAll();
  }

  getCategoria(id: number): Categoria | undefined {
    return this.get(id);
  }

  // Usado por Punto de Venta: categorías con sus productos
  getCategoriasProductos(): Categoria[] {
    const productos = this.productoService.getAll();

    // devolvemos nuevas referencias para no ensuciar el arreglo original
    return this.data.map(cat => ({
      ...cat,
      producto: productos.filter(prod => prod.categoria?.id === cat.id)
    }));
  }
}