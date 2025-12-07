import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Venta } from '../../_class/venta';
import { MetodoPago } from '../../_class/metodo-pago';
import { Usuario } from '../../_class/usuario';

@Component({
  selector: 'app-venta-modal',
  templateUrl: './venta-modal.component.html',
  styleUrls: ['./venta-modal.component.css', '../../app.css'],
  standalone: false
})
export class VentaModalComponent implements OnChanges {

  @Input() showModal = false;
  @Input() modalTitle = '';
  @Input() data: Venta | null = null;

  @Input() metodosPago: MetodoPago[] = [];
  @Input() usuarios: Usuario[] = [];

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<Venta>();

  formData: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formData = this.fb.group({
      id: [0],
      total: ['', [Validators.required]],
      metodoPago: [-1, [Validators.required]],
      usuario: [-1, [Validators.required]],
      estado: [true]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      if (this.data) {
        this.formData.patchValue({
          id: this.data.id,
          total: this.data.total,
          metodoPago: this.data.idMetodoPago ? this.data.idMetodoPago.id : -1,
          usuario: this.data.idUsuario ? this.data.idUsuario.id : -1,
          estado: this.data.estado
        });
      } else {
        this.formData.reset({
          id: 0,
          total: '',
          metodoPago: -1,
          usuario: -1,
          estado: true
        });
      }
    }
  }

  closeModal(): void {
    this.closeModalEvent.emit();
  }

  saveModal(): void {
    if (this.formData.valid) {
      const metodoPagoId = Number(this.formData.value.metodoPago);
      const usuarioId = Number(this.formData.value.usuario);

      const metodoPago =
        this.metodosPago.find(m => m.id === metodoPagoId) || null;
      const usuario =
        this.usuarios.find(u => u.id === usuarioId) || null;

      const isEdit = !!this.data;

      const venta: Venta = {
        id: isEdit && this.data ? this.data.id : 0,
        // Fecha/Hora: nueva si es alta, se conserva si es edición
        fechaHora: isEdit && this.data ? this.data.fechaHora : new Date(),
        total: Number(this.formData.value.total),
        idMetodoPago: metodoPago,
        idUsuario: usuario,
        estado: !!this.formData.value.estado
      };

      this.saveEvent.emit(venta);
    }
  }
}