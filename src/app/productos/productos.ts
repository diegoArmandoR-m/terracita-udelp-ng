import { Component, OnInit } from '@angular/core';
import { Producto } from '../_class/producto';
import { AppReport } from '../util/app-report';
import { ProductoService } from '../_service/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: false,
  templateUrl: './productos.html',
  styleUrls: ['./productos.css', '../app.css']
})
export class Productos extends AppReport implements OnInit {
  productos: Producto[] = [];
  showModal = false;
  modalTitle = "";
  producto: Producto | null = null;
  uri = "catalogos-generales/productos";

  constructor(private service: ProductoService, router: Router) {
    super(router);
   }

  ngOnInit(): void {
    this.productos = this.service.getAll();
  }

  openAddModal() {
    this.modalTitle = "productos.add-producto";
    this.producto = null;
    this.showModal = true;
  }
  openEditModal(producto: Producto) {
    this.modalTitle = "productos.edit-producto";
    this.producto = producto;
    this.showModal = true;
  }

  closeModalEvent() {
    this.showModal = false;
    this.producto = null;
    this.modalTitle = "";
  }

  saveEvent(producto: Producto) {
    if (producto.id) {
      // Edit existing categoria
      this.service.edit(producto);
    } else {
      // Add new categoria
      this.service.add(producto);
    }
    this.closeModalEvent();
    this.showModalMessage = true;
    this.modalTitleMessage = "messages.success";
    this.messageBody = "messages.save-success";
  }

}
