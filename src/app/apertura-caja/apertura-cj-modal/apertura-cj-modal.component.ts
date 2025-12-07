import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AperturaCj } from '../../_class/apertura-cj';
import { Usuario } from '../../_class/usuario';

@Component({
  selector: 'app-apertura-caja-modal',
  templateUrl: './apertura-cj-modal.component.html',
  styleUrls: ['./apertura-cj-modal.component.css', '../../app.css'],
  standalone: false
})
export class AperturaCajaModalComponent implements OnChanges {

  @Input() showModal = false;
  @Input() modalTitle = '';
  @Input() data: AperturaCj | null = null;

  @Input() usuarios: Usuario[] = [];

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<AperturaCj>();

  formData: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formData = this.fb.group({
      id: [0],
      usuario: [-1, [Validators.required]],
      montoInicial: ['', [Validators.required]],
      fechaCierre: [''],
      montoFinal: [''],
      diferencia: [''],
      estado: [true]
    });

    this.registrarRecalculoDiferencia();
  }

  private registrarRecalculoDiferencia(): void {
    this.formData.get('montoInicial')?.valueChanges.subscribe(() => {
      this.recalcularDiferencia();
    });
    this.formData.get('montoFinal')?.valueChanges.subscribe(() => {
      this.recalcularDiferencia();
    });
  }

  private recalcularDiferencia(): void {
    const montoInicial = Number(this.formData.get('montoInicial')?.value) || 0;
    const montoFinal   = Number(this.formData.get('montoFinal')?.value) || 0;
    const diferencia   = montoFinal - montoInicial;

    this.formData.patchValue(
      { diferencia },
      { emitEvent: false }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      if (this.data) {
        // Editar
        this.formData.patchValue(
          {
            id: this.data.id,
            usuario: this.data.idUsuario ? this.data.idUsuario.id : -1,
            montoInicial: this.data.montoInicial,
            fechaCierre: this.data.fechaCierre,
            montoFinal: this.data.montoFinal,
            diferencia: this.data.diferencia,
            estado: this.data.estado
          },
          { emitEvent: false }
        );
      } else {
        // Nuevo
        this.formData.reset(
          {
            id: 0,
            usuario: -1,
            montoInicial: '',
            fechaCierre: null,
            montoFinal: '',
            diferencia: 0,
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
      const usuarioId = Number(this.formData.value.usuario);
      const usuario = this.usuarios.find(u => u.id === usuarioId) || null;

      const isEdit = !!this.data;

      const value: AperturaCj = {
        id: isEdit && this.data ? this.data.id : 0,
        idUsuario: usuario,
        // fechaApertura: si es nuevo usamos la fecha/hora actual,
        // si es edición respetamos la que ya tenía
        fechaApertura: isEdit && this.data ? this.data.fechaApertura : new Date(),
        montoInicial: Number(this.formData.value.montoInicial),
        fechaCierre: this.formData.value.fechaCierre
          ? new Date(this.formData.value.fechaCierre)
          : (isEdit && this.data ? this.data.fechaCierre : new Date()),
        montoFinal: this.formData.value.montoFinal
          ? Number(this.formData.value.montoFinal)
          : 0,
        diferencia: Number(this.formData.value.diferencia) || 0,
        estado: !!this.formData.value.estado
      };

      this.saveEvent.emit(value);
    } else {
      this.formData.markAllAsTouched();
    }
  }
}