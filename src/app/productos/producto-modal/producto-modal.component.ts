// src/app/productos/producto-modal/producto-modal.component.ts
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Producto } from '../../_class/producto';
import { Categoria } from '../../_class/categoria';
import { UnidadMedida } from '../../_class/unidad-medida';

@Component({
  selector: 'app-producto-modal',
  templateUrl: './producto-modal.component.html',
  styleUrls: ['./producto-modal.component.css', '../../app.css'],
  standalone: false
})
export class ProductoModalComponent implements OnChanges {

  @Input() showModal = false;
  @Input() modalTitle = '';
  @Input() data: Producto | null = null;

  @Input() categorias: Categoria[] = [];
  @Input() unidadesMedida: UnidadMedida[] = [];

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<Producto>();

  formData: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formData = this.fb.group({
      id: [0],
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      existencia: ['', Validators.required],
      categoria: [-1, Validators.required],
      codigoBarras: ['', Validators.required],
      idUnidadMedida: [-1, Validators.required],
      estado: [true]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      if (this.data) {
        // Editar
        this.formData.patchValue(
          {
            id: this.data.id,
            nombre: this.data.nombre,
            precio: this.data.precio,
            existencia: this.data.existencia,
            categoria: this.data.categoria ? this.data.categoria.id : -1,
            codigoBarras: this.data.codigoBarras,
            idUnidadMedida: this.data.idUnidadMedida ? this.data.idUnidadMedida.id : -1,
            estado: this.data.estado
          },
          { emitEvent: false }
        );
      } else {
        // Alta
        this.formData.reset(
          {
            id: 0,
            nombre: '',
            precio: '',
            existencia: '',
            categoria: -1,
            codigoBarras: '',
            idUnidadMedida: -1,
            estado: true
          },
          { emitEvent: false }
        );
      }
    }
  }

  closeModal(): void {
    this.closeModalEvent.emit();
  }

  saveModal(): void {
    if (this.formData.valid) {
      const categoriaId = Number(this.formData.value.categoria);
      const categoria = this.categorias.find(c => c.id === categoriaId) || null;

      const unidadId = Number(this.formData.value.idUnidadMedida);
      const unidad = this.unidadesMedida.find(u => u.id === unidadId) || null;

      const isEdit = !!this.data;

      const value: Producto = {
        id: isEdit && this.data ? this.data.id : 0,
        nombre: this.formData.value.nombre,
        precio: this.formData.value.precio,
        existencia: this.formData.value.existencia,
        categoria: categoria,
        estado: !!this.formData.value.estado,
        codigoBarras: this.formData.value.codigoBarras,
        idUnidadMedida: unidad,
        // cantidad es opcional, no la tocamos
        cantidad: this.data?.cantidad
      };

      this.saveEvent.emit(value);
    } else {
      this.formData.markAllAsTouched();
    }
  }
}