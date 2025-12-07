import { Component, OnInit } from '@angular/core';
import { AppReport } from '../util/app-report';
import { UnidadMedida } from '../_class/unidad-medida';
import { UnidadMedidaService } from '../_service/unidad-medida.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unidades-medida',
  standalone: false,
  templateUrl: './unidades-medida.html',
  styleUrls: ['./unidades-medida.css', '../app.css'],
})
export class UnidadesMedida extends AppReport implements OnInit {
  unidadesMedida: UnidadMedida[] = [];
  showModal = false;
  modalTitle = '';
  unidadMedida: UnidadMedida | null = null
  uri = 'catalogos-generales/unidades-medida';

  constructor(private unidadMedidaService: UnidadMedidaService, router: Router) {
    super(router);
  }

  ngOnInit(): void {
    this.unidadesMedida = this.unidadMedidaService.getAll();
  }

  openAddModal() {
    this.modalTitle = 'unidades-medida.add-unit-measure';
    this.unidadMedida = null;
    this.showModal = true;
  }

  openEditModal(unidadMedida: UnidadMedida) {
    this.modalTitle = 'unidades-medida.edit-unit-measure';
    this.unidadMedida = unidadMedida;
    this.showModal = true;
  }

  closeModalEvent() {
    this.showModal = false;
    this.unidadMedida = null;
    this.modalTitle = '';
  }
  saveEvent(unidadMedida: UnidadMedida) {
    if (unidadMedida.id) {
      this.unidadMedidaService.edit(unidadMedida);
    } else {
      this.unidadMedidaService.add(unidadMedida);
    }
    this.closeModalEvent();
    this.showModalMessage = true;
    this.modalTitleMessage = 'messages.sucess';
    this.messageBody = 'messages.save-sucess';
  }

}