import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OtroMovimiento } from '../../_class/otro-movimiento';

@Component({
  selector: 'app-otro-movimiento-modal',
  templateUrl: './otro-movimiento-modal.component.html',
  styleUrls: ['./otro-movimiento-modal.component.css', '../../app.css'],
  standalone: false
})
export class OtroMovimientoModalComponent implements OnChanges {

  @Input() showModal = false;
  @Input() modalTitle = '';
  @Input() data: OtroMovimiento | null = null;

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<OtroMovimiento>();

  formData: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formData = this.fb.group({
      id: [0],
      name: ['', [Validators.required]],
      esEntrada: [true, [Validators.required]],
      descripcion: ['', [Validators.required]],
      activo: [true, [Validators.required]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      if (this.data) {
        this.formData.patchValue({
          id: this.data.id,
          name: this.data.name,
          esEntrada: this.data.esEntrada,
          descripcion: this.data.descripcion,
          activo: this.data.activo
        });
      } else {
        this.formData.reset({
          id: 0,
          name: '',
          esEntrada: true,
          descripcion: '',
          activo: true
        });
      }
    }
  }

  closeModal(): void {
    this.closeModalEvent.emit();
  }

  saveModal(): void {
    if (this.formData.valid) {
      const isEdit = !!this.data;

      const value: OtroMovimiento = {
        id: isEdit && this.data ? this.data.id : 0,
        name: this.formData.value.name,
        esEntrada: !!this.formData.value.esEntrada,
        descripcion: this.formData.value.descripcion,
        activo: !!this.formData.value.activo
      };

      this.saveEvent.emit(value);
    } else {
      this.formData.markAllAsTouched();
    }
  }
}