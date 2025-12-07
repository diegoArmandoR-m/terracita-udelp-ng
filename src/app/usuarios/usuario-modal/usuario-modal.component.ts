import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Usuario } from '../../_class/usuario';

@Component({
  selector: 'app-usuario-modal',
  standalone: false,
  templateUrl: './usuario-modal.component.html',
  styleUrls: ['./usuario-modal.component.css', '../../app.css']
})
export class UsuarioModalComponent implements OnChanges {
  @Input() showModal = false;
  @Input() modalTitle = '';
  @Input() data: Usuario | null = null;

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<Usuario>();

  formData: FormGroup;
  edit = false;

  constructor(private builder: FormBuilder) {
    this.formData = this.builder.group({
      id: [null],
      name: ['', Validators.required],
      passwordHash: ['', Validators.required],
      rol: ['', Validators.required],
      estado: [true],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      if (this.data) {
        this.edit = true;

        this.formData.patchValue({
          id: this.data.id,
          name: this.data.name,
          passwordHash: this.data.passwordHash,
          rol: this.data.rol,
          estado: this.data.estado,
        });
      } else {
        this.edit = false;
        this.formData.reset({
          id: null,
          name: '',
          passwordHash: '',
          rol: '',
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
      const isEdit = !!this.data;

      const usuario: Usuario = {
        id: isEdit && this.data ? this.data.id : 0,
        name: this.formData.value.name,
        passwordHash: this.formData.value.passwordHash,
        rol: this.formData.value.rol,
        estado: !!this.formData.value.estado,
      };

      this.saveEvent.emit(usuario);
    } else {
      this.formData.markAllAsTouched();
    }
  }
}
