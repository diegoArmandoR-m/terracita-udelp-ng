import { Component, OnInit } from '@angular/core';
import { AppReport } from '../util/app-report';
import { Proveedor } from '../_class/proveedor';
import { ProveedorService } from '../_service/proveedor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proveedores',
  standalone: false,
  templateUrl: './proveedores.html',
  styleUrls: ['./proveedores.css', '../app.css'],
})
export class Proveedores extends AppReport implements OnInit {
  proveedores: Proveedor[] = [];
  proveedor: Proveedor | null = null;
  showModal = false;
  modalTitle = '';
  uri = 'catalogos-generales/proveedores';

  constructor(private proveedorService: ProveedorService, router: Router) {
    super(router);
  }

  ngOnInit(): void {
    this.proveedores = this.proveedorService.getAll();
  }

  openAddModal(): void {
    this.modalTitle = 'proveedores.add-proveedor';
    this.proveedor = null;
    this.showModal = true;
  }

  openEditModal(proveedor: Proveedor): void {
    this.modalTitle = 'proveedores.edit-proveedor';
    this.proveedor = proveedor;
    this.showModal = true;
  }

  closeModalEvent(): void {
    this.showModal = false;
    this.proveedor = null;
    this.modalTitle = '';
  }

  saveEvent(proveedor: Proveedor): void {
    if (proveedor.id) {
      this.proveedorService.edit(proveedor);
    } else {
      this.proveedorService.add(proveedor);
    }
    this.closeModalEvent();
    this.showModalMessage = true;
    this.modalTitleMessage = 'messages.sucess';
    this.messageBody = 'messages.save-sucess';
  }
}