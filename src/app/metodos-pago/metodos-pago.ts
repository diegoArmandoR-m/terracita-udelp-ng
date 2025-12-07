import { Component, OnInit } from '@angular/core';
import { MetodoPago } from '../_class/metodo-pago';
import { MetodoPagoService } from '../_service/metodo-pago.service';
import { AppReport } from '../util/app-report';
import { Router } from '@angular/router';

@Component({
  selector: 'app-metodos-pago',
  standalone: false,
  templateUrl: './metodos-pago.html',
  styleUrls: ['./metodos-pago.css', '../app.css']
})
export class MetodosPago extends AppReport implements OnInit {

  metodosPago: MetodoPago[] = [];
  showModal = false;
  modalTitle = "";
  metodoPago: MetodoPago | null = null;
  uri = "catalogos-generales/metodos-pago";

  constructor(private service: MetodoPagoService, router: Router) {
    super(router);
   }

  ngOnInit(): void {
    this.metodosPago = this.service.getAll();
  }

  openAddModal() {
    this.modalTitle = "metodos-pago.add-metodo-pago";
    this.metodoPago = null;
    this.showModal = true;
  }
  openEditModal(metodoPago: MetodoPago) {
    this.modalTitle = "metodos-pago.edit-metodo-pago";
    this.metodoPago = metodoPago;
    this.showModal = true;
  }

  closeModalEvent() {
    this.showModal = false;
    this.metodoPago = null;
    this.modalTitle = "";
  }

  saveEvent(metodoPago: MetodoPago) {
    if (metodoPago.id) {
      // Edit existing categoria
      this.service.edit(metodoPago);
    } else {
      // Add new categoria
      this.service.add(metodoPago);
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
