// src/app/compras/compra-modal/compra-modal.component.ts
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Compra } from '../../_class/compra';
import { Proveedor } from '../../_class/proveedor';
import { Usuario } from '../../_class/usuario';

@Component({
  selector: 'app-compra-modal',
  standalone: false,
  templateUrl: './compra-modal.component.html',
  styleUrls: ['./compra-modal.component.css', '../../app.css']
})
export class CompraModalComponent implements OnChanges {
  @Input() showModal = false;
  @Input() modalTitle = '';
  @Input() data: Compra | null = null;
  @Input() proveedores: Proveedor[] = [];
  @Input() usuarios: Usuario[] = [];

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<Compra>();

  formData: FormGroup;
  edit = false;

  constructor(private builder: FormBuilder) {
    this.formData = this.builder.group({
      id: [null],
      proveedor: [-1, Validators.required], // id proveedor
      total: ['', Validators.required],
      usuario: [-1, Validators.required],   // id usuario
      estado: [true],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      if (this.data) {
        this.edit = true;

        this.formData.patchValue({
          id: this.data.id,
          proveedor: this.data.proveedor ? this.data.proveedor.id : -1,
          total: this.data.total.toString(),
          usuario: this.data.usuario ? this.data.usuario.id : -1,
          estado: this.data.estado,
        });
      } else {
        this.edit = false;
        this.formData.reset({
          id: null,
          proveedor: -1,
          total: '',
          usuario: -1,
          estado: true,
        });
      }
    }
  }

  closeModal(): void {
    this.closeModalEvent.emit();
  }

  saveModal(): void {
    if (this.formData.valid) {
      const proveedorId = Number(this.formData.value.proveedor);
      const usuarioId   = Number(this.formData.value.usuario);

      const tempProveedor =
        this.proveedores.find(p => p.id === proveedorId) || null;

      const tempUsuario =
        this.usuarios.find(u => u.id === usuarioId) || null;

      const isEdit = !!this.data;

      const compra: Compra = {
        id: isEdit && this.data ? this.data.id : 0,
        proveedor: tempProveedor,
        usuario: tempUsuario,
        fechaHora: isEdit && this.data ? this.data.fechaHora : new Date(),
        total: Number(this.formData.value.total),
        estado: !!this.formData.value.estado,
      };

      this.saveEvent.emit(compra);
    } else {
      this.formData.markAllAsTouched();
    }
  }
}