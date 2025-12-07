import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppReport } from '../util/app-report';
import { DetalleCompra } from '../_class/detalle-compra';
import { DetalleCompraService } from '../_service/detalle-compra.service';
import { Compra } from '../_class/compra';
import { Producto } from '../_class/producto';
import { CompraService } from '../_service/compra.service';
import { ProductoService } from '../_service/producto.service';

@Component({
  selector: 'app-detalles-compra',
  templateUrl: './detalles-compra.html',
  styleUrls: ['./detalles-compra.css', '../app.css'],
  standalone: false
})
export class DetallesCompra extends AppReport implements OnInit {

  detalles: DetalleCompra[] = [];
  detalle: DetalleCompra | null = null;

  compras: Compra[] = [];
  productos: Producto[] = [];

  showModal = false;
  modalTitle = "";
  uri = "operaciones/detalles-compra";

  constructor(
    private detalleCompraService: DetalleCompraService,
    private compraService: CompraService,
    private productoService: ProductoService,
    router: Router
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.detalles = this.detalleCompraService.getAll();
    this.compras = this.compraService.getAll();
    this.productos = this.productoService.getAll();
  }

  openAddModal(): void {
    this.modalTitle = 'detalles-compra.add-detalle-compra';
    this.detalle = null;
    this.showModal = true;
  }

  openEditModal(detalle: DetalleCompra): void {
    this.modalTitle = 'detalles-compra.edit-detalle-compra';
    this.detalle = detalle;
    this.showModal = true;
  }

  closeModalEvent() {
    this.showModal = false;
    this.detalle = null;
    this.modalTitle = '';
  }

  saveEvent(detalle: DetalleCompra) {
    if (detalle.id) {
      this.detalleCompraService.edit(detalle);
    } else {
      this.detalleCompraService.add(detalle);
    }

    this.closeModalEvent();
    this.showModalMessage = true;
    this.modalTitleMessage = "messages.sucess";
    this.messageBody = "messages.save-sucess";
  }

  override closeMessageModal(_value: string) {
    this.showModalMessage = false;
  }
}