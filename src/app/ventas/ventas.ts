import { Component, OnInit } from '@angular/core';
import { AppReport } from '../util/app-report';
import { Router } from '@angular/router';

import { Venta } from '../_class/venta';
import { VentaService } from '../_service/venta.service';
import { MetodoPago } from '../_class/metodo-pago';
import { MetodoPagoService } from '../_service/metodo-pago.service';
import { Usuario } from '../_class/usuario';
import { UsuarioService } from '../_service/usuario.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.html',
  styleUrls: ['./ventas.css', '../app.css'],
  standalone: false
})
export class Ventas extends AppReport implements OnInit {

  ventas: Venta[] = [];
  venta: Venta | null = null;

  metodosPago: MetodoPago[] = [];
  usuarios: Usuario[] = [];

  showModal = false;
  modalTitle = '';
  uri = 'ventas';

  constructor(
    private ventaService: VentaService,
    private metodoPagoService: MetodoPagoService,
    private usuarioService: UsuarioService,
    router: Router
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.ventas = this.ventaService.getAll();
    this.metodosPago = this.metodoPagoService.getAll();
    this.usuarios = this.usuarioService.getAll();
  }

  openAddModal(): void {
    this.modalTitle = 'ventas.add-venta';
    this.venta = null;
    this.showModal = true;
  }

  openEditModal(venta: Venta): void {
    this.modalTitle = 'ventas.edit-venta';
    this.venta = venta;
    this.showModal = true;
  }

  closeModalEvent(): void {
    this.showModal = false;
    this.venta = null;
    this.modalTitle = '';
  }

  saveEvent(venta: Venta): void {
    if (venta.id) {
      this.ventaService.edit(venta);
    } else {
      this.ventaService.add(venta);
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