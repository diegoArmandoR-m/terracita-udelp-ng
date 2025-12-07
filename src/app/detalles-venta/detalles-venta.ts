import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppReport } from '../util/app-report';
import { DetalleVenta } from '../_class/detalle-venta';
import { DetalleVentaService } from '../_service/detalle-venta.service';
import { Venta } from '../_class/venta';
import { Producto } from '../_class/producto';
import { VentaService } from '../_service/venta.service';
import { ProductoService } from '../_service/producto.service';

@Component({
  selector: 'app-detalles-venta',
  templateUrl: './detalles-venta.html',
  styleUrls: ['./detalles-venta.css', '../app.css'],
  standalone: false
})
export class DetallesVenta extends AppReport implements OnInit {

  detalles: DetalleVenta[] = [];
  detalle: DetalleVenta | null = null;

  ventas: Venta[] = [];
  productos: Producto[] = [];

  showModal = false;
  modalTitle = '';
  uri = 'operaciones/detalles-venta';

  constructor(
    private detalleVentaService: DetalleVentaService,
    private ventaService: VentaService,
    private productoService: ProductoService,
    router: Router
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.detalles = this.detalleVentaService.getAll();
    this.ventas = this.ventaService.getAll();
    this.productos = this.productoService.getAll();
  }

  openAddModal(): void {
    this.modalTitle = 'detalles-venta.add-detalle-venta';
    this.detalle = null;
    this.showModal = true;
  }

  openEditModal(detalle: DetalleVenta): void {
    this.modalTitle = 'detalles-venta.edit-detalle-venta';
    this.detalle = detalle;
    this.showModal = true;
  }

  closeModalEvent(): void {
    this.showModal = false;
    this.detalle = null;
    this.modalTitle = '';
  }

  saveEvent(detalle: DetalleVenta): void {
    if (detalle.id) {
      this.detalleVentaService.edit(detalle);
    } else {
      this.detalleVentaService.add(detalle);
    }

    this.closeModalEvent();
    this.showModalMessage = true;
    this.modalTitleMessage = 'messages.sucess';
    this.messageBody = 'messages.save-sucess';
  }

  override closeMessageModal(_value: string) {
    this.showModalMessage = false;
  }
}
