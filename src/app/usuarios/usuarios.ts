// src/app/usuarios/usuarios.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppReport } from '../util/app-report';
import { Usuario } from '../_class/usuario';
import { UsuarioService } from '../_service/usuario.service';

@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css', '../app.css'],
})
export class Usuarios extends AppReport implements OnInit {   // 👈 NOMBRE EXACTO

  usuarios: Usuario[] = [];
  usuario: Usuario | null = null;

  showModal = false;
  modalTitle = '';
  uri = 'catalogos-generales/usuarios';

  constructor(
    private usuarioService: UsuarioService,
    router: Router
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.usuarios = this.usuarioService.getAll();
  }

  openAddModal(): void {
    this.modalTitle = 'usuarios.add-usuario';
    this.usuario = null;
    this.showModal = true;
  }

  openEditModal(usuario: Usuario): void {
    this.modalTitle = 'usuarios.edit-usuario';
    this.usuario = usuario;
    this.showModal = true;
  }

  closeModalEvent(): void {
    this.showModal = false;
    this.usuario = null;
    this.modalTitle = '';
  }

  saveEvent(usuario: Usuario): void {
    if (usuario.id) {
      this.usuarioService.edit(usuario);
    } else {
      this.usuarioService.add(usuario);
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
