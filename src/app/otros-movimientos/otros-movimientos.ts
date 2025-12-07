import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppReport } from '../util/app-report';
import { OtroMovimiento } from '../_class/otro-movimiento';
import { OtroMovimientoService } from '../_service/otro-movimiento.service';

@Component({
  selector: 'app-otros-movimientos',
  templateUrl: './otros-movimientos.html',
  styleUrls: ['./otros-movimientos.css', '../app.css'],
  standalone: false
})
export class OtrosMovimientos extends AppReport implements OnInit {

  otrosMovimientos: OtroMovimiento[] = [];
  otroMovimiento: OtroMovimiento | null = null;

  showModal = false;
  modalTitle = '';
  uri = 'procesos/otros-movimientos';

  constructor(
    private otroMovimientoService: OtroMovimientoService,
    router: Router
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.otrosMovimientos = this.otroMovimientoService.getAll();
  }

  openAddModal(): void {
    this.modalTitle = 'otros-movimientos.add-otro-movimiento';
    this.otroMovimiento = null;
    this.showModal = true;
  }

  openEditModal(item: OtroMovimiento): void {
    this.modalTitle = 'otros-movimientos.edit-otro-movimiento';
    this.otroMovimiento = item;
    this.showModal = true;
  }

  closeModalEvent(): void {
    this.showModal = false;
    this.otroMovimiento = null;
    this.modalTitle = '';
  }

  saveEvent(value: OtroMovimiento): void {
    if (value.id) {
      this.otroMovimientoService.edit(value);
    } else {
      this.otroMovimientoService.add(value);
    }

    this.closeModalEvent();
    this.showModalMessage = true;
    this.modalTitleMessage = 'messages.sucess';
    this.messageBody = 'messages.save-sucess';
  }
}