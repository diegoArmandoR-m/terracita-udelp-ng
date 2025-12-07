// src/app/compras/compras.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppReport } from '../util/app-report';
import { Compra } from '../_class/compra';
import { Proveedor } from '../_class/proveedor';
import { Usuario } from '../_class/usuario';

import { CompraService } from '../_service/compra.service';
import { ProveedorService } from '../_service/proveedor.service';
import { UsuarioService } from '../_service/usuario.service';

@Component({
  selector: 'app-compras',
  standalone: false,
  templateUrl: './compras.html',
  styleUrls: ['./compras.css', '../app.css'],
})
export class Compras extends AppReport implements OnInit {
  compras: Compra[] = [];
  compra: Compra | null = null;

  proveedores: Proveedor[] = [];
  proveedoresModal: Proveedor[] = [];

  usuarios: Usuario[] = [];
  usuariosModal: Usuario[] = [];

  showModal = false;
  modalTitle = '';
  uri = 'procesos/compras';

  constructor(
    private compraService: CompraService,
    private proveedorService: ProveedorService,
    private usuarioService: UsuarioService,
    router: Router
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.compras = this.compraService.getAll();

    this.proveedores = this.proveedorService.getAll();
    this.proveedoresModal = this.proveedores;

    this.usuarios = this.usuarioService.getAll();
    this.usuariosModal = this.usuarios;
  }

  openAddModal(): void {
    this.modalTitle = 'compras.add-compra';
    this.compra = null;
    this.showModal = true;
  }

  openEditModal(compra: Compra): void {
    this.modalTitle = 'compras.edit-compra';
    this.compra = compra;
    this.showModal = true;
  }

  closeModalEvent(): void {
    this.showModal = false;
    this.compra = null;
    this.modalTitle = '';
  }

  saveEvent(compra: Compra): void {
    if (compra.id) {
      this.compraService.edit(compra);
    } else {
      this.compraService.add(compra);
    }

    this.closeModalEvent();
    this.showModalMessage = true;
    this.modalTitleMessage = 'messages.sucess';
    this.messageBody = 'messages.save-sucess';
  }
}
