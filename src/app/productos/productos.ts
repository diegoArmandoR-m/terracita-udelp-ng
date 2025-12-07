// src/app/productos/productos.ts
import { Component, OnInit } from '@angular/core';
import { Producto } from '../_class/producto';
import { Categoria } from '../_class/categoria';
import { UnidadMedida } from '../_class/unidad-medida';

import { ProductoService } from '../_service/producto.service';
import { CategoriaService } from '../_service/categoria.service';
import { UnidadMedidaService } from '../_service/unidad-medida.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.html',
  styleUrls: ['./productos.css', '../app.css'],
  standalone: false
})
export class Productos implements OnInit {

  productos: Producto[] = [];
  producto: Producto | null = null;

  categorias: Categoria[] = [];
  unidadesMedida: UnidadMedida[] = [];

  showModal = false;
  modalTitle = '';

  showModalMessage = false;
  modalTitleMessage = '';
  messageBody = '';
  uri = '';

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private unidadMedidaService: UnidadMedidaService
  ) { }

  ngOnInit(): void {
    this.productos = this.productoService.getAll();
    // catálogos para el modal
    this.categorias = this.categoriaService.getCategorias();
    this.unidadesMedida = this.unidadMedidaService.getAll();
  }

  openAddModal(): void {
    this.producto = null;
    this.modalTitle = "productos.add-producto";
    this.showModal = true;
  }

  openEditModal(p: Producto): void {
    this.producto = p;
    this.modalTitle = "productos.edit-producto";
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveEvent(value: Producto): void {
    if (value.id === 0) {
      this.productoService.add(value);
      this.modalTitleMessage = 'messages.sucess';
      this.messageBody = 'messages.save-sucess';
    } else {
      this.productoService.edit(value);
      this.modalTitleMessage = 'messages.sucess';
      this.messageBody = 'messages.save-sucess';
    }
    this.productos = this.productoService.getAll();
    this.showModal = false;
    this.showModalMessage = true;
  }

  delete(id: number): void {
    this.productoService.deleteProducto(id);
    this.productos = this.productoService.getAll();
  }

  closeMessageModal(_event: string): void {
    this.showModalMessage = false;
  }
}