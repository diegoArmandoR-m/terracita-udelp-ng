import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proveedor } from '../../_class/proveedor';

@Component({
  selector: 'app-proveedor-modal',
  standalone: false,
  templateUrl: './proveedor-modal.component.html',
  styleUrls: ['./proveedor-modal.component.css','../../app.css'],
})
export class ProveedorModalComponent implements OnChanges {
  @Input() showModal = false;
  @Input() modalTitle = '';
  @Input() data: Proveedor | null = null;

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<Proveedor>();

  formData: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formData = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      activo: [true],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      if (this.data) {
        this.formData.patchValue(this.data);
      } else {
        this.formData.reset({
          id: null,
          name: '',
          telefono: '',
          email: '',
          direccion: '',
          activo: true,
        });
      }
    }
  }

  closeModal(): void {
    this.closeModalEvent.emit();
  }

  saveModal(): void {
    if (this.formData.valid) {
      this.saveEvent.emit(this.formData.value as Proveedor);
    } else {
      this.formData.markAllAsTouched();
    }
  }
}