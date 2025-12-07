import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppReport } from '../util/app-report';
import { AperturaCj } from '../_class/apertura-cj';
import { AperturaCajaService } from '../_service/apertura-cj.service';
import { Usuario } from '../_class/usuario';
import { UsuarioService } from '../_service/usuario.service';

@Component({
  selector: 'app-apertura-caja',
  templateUrl: './apertura-caja.html',
  styleUrls: ['./apertura-caja.css', '../app.css'],
  standalone: false
})
export class AperturaCaja extends AppReport implements OnInit {

  aperturas: AperturaCj[] = [];
  apertura: AperturaCj | null = null;

  usuarios: Usuario[] = [];

  showModal = false;
  modalTitle = '';
  uri = 'procesos/apertura-caja';

  constructor(
    private aperturaCajaService: AperturaCajaService,
    private usuarioService: UsuarioService,
    router: Router
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.aperturas = this.aperturaCajaService.getAll();
    this.usuarios = this.usuarioService.getAll();
  }

  openAddModal(): void {
    this.modalTitle = 'apertura-caja.add-apertura-caja';
    this.apertura = null;
    this.showModal = true;
  }

  openEditModal(a: AperturaCj): void {
    this.modalTitle = 'apertura-caja.edit-apertura-caja';
    this.apertura = a;
    this.showModal = true;
  }

  closeModalEvent(): void {
    this.showModal = false;
    this.apertura = null;
    this.modalTitle = '';
  }

  saveEvent(value: AperturaCj): void {
    if (value.id) {
      this.aperturaCajaService.edit(value);
    } else {
      this.aperturaCajaService.add(value);
    }

    this.closeModalEvent();
    this.showModalMessage = true;
    this.modalTitleMessage = 'messages.sucess';
    this.messageBody = 'messages.save-sucess';
  }
}