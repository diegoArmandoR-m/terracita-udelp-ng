import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MovimientoInventario } from '../../_class/movimiento-inventario';
import { Producto } from '../../_class/producto';
import { OtroMovimiento } from '../../_class/otro-movimiento';
import { Usuario } from '../../_class/usuario';

@Component({
  selector: 'app-movimiento-inventario-modal',
  templateUrl: './movimiento-inventario-modal.component.html',
  styleUrls: ['./movimiento-inventario-modal.component.css', '../../app.css'],
  standalone: false
})
export class MovimientoInventarioModalComponent implements OnChanges {

  @Input() showModal = false;
  @Input() modalTitle = '';
  @Input() data: MovimientoInventario | null = null;

  @Input() productos: Producto[] = [];
  @Input() otrosMovimientos: OtroMovimiento[] = [];
  @Input() usuarios: Usuario[] = [];

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<MovimientoInventario>();

  formData: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formData = this.fb.group({
      id: [0],
      producto: [-1, [Validators.required]],
      otroMovimiento: [-1, [Validators.required]],
      cantidad: ['', [Validators.required]],
      existenciaAnterior: ['', [Validators.required]],
      existenciaActual: ['', [Validators.required]],
      referecia: ['', [Validators.required]],
      usuario: [-1, [Validators.required]],
      motivo: ['', [Validators.required]]
    });

    this.registrarRecalculos();
  }

  /** Suscripciones para recalcular existencias */
  private registrarRecalculos(): void {
    // Cuando cambia el producto → tomar existencia actual del producto
    this.formData.get('producto')?.valueChanges.subscribe(value => {
      const productoId = Number(value);
      const producto = this.productos.find(p => p.id === productoId);

      // OJO: aquí uso producto.existencia. Cambia el nombre si tu campo se llama distinto.
      const existenciaAnterior = producto?.existencia ?? 0;

      this.formData.patchValue(
        {
          existenciaAnterior,
          existenciaActual: existenciaAnterior
        },
        { emitEvent: false }
      );

      this.recalcularExistenciaActual();
    });

    // Cuando cambia el tipo de movimiento → recalcular
    this.formData.get('otroMovimiento')?.valueChanges.subscribe(() => {
      this.recalcularExistenciaActual();
    });

    // Cuando cambia la cantidad → recalcular
    this.formData.get('cantidad')?.valueChanges.subscribe(() => {
      this.recalcularExistenciaActual();
    });
  }

  /** Lógica de entrada/salida para calcular existencia nueva */
  private recalcularExistenciaActual(): void {
    const existenciaAnterior = Number(this.formData.get('existenciaAnterior')?.value) || 0;
    const cantidad = Number(this.formData.get('cantidad')?.value) || 0;

    const otroMovimientoId = Number(this.formData.get('otroMovimiento')?.value);
    const otro = this.otrosMovimientos.find(o => o.id === otroMovimientoId);

    // Si aún no eligió tipo de movimiento, dejamos igual
    if (!otro) {
      this.formData.patchValue(
        { existenciaActual: existenciaAnterior },
        { emitEvent: false }
      );
      return;
    }

    const esEntrada = !!otro.esEntrada; // true = entrada, false = salida
    const nuevaExistencia = esEntrada
      ? existenciaAnterior + cantidad
      : existenciaAnterior - cantidad;

    this.formData.patchValue(
      { existenciaActual: nuevaExistencia },
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
            producto: this.data.idProducto ? this.data.idProducto.id : -1,
            otroMovimiento: this.data.idOtroMovimiento ? this.data.idOtroMovimiento.id : -1,
            cantidad: this.data.cantidad,
            existenciaAnterior: this.data.existenciaAnterior,
            existenciaActual: this.data.existenciaActual,
            referecia: this.data.referecia,
            usuario: this.data.idUsuario ? this.data.idUsuario.id : -1,
            motivo: this.data.motivo
          },
          { emitEvent: false }
        );
      } else {
        // Nuevo
        this.formData.reset(
          {
            id: 0,
            producto: -1,
            otroMovimiento: -1,
            cantidad: '',
            existenciaAnterior: '',
            existenciaActual: '',
            referecia: '',
            usuario: -1,
            motivo: ''
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
      const productoId = Number(this.formData.value.producto);
      const otroMovimientoId = Number(this.formData.value.otroMovimiento);
      const usuarioId = Number(this.formData.value.usuario);

      const producto = this.productos.find(p => p.id === productoId) || null;
      const otroMovimiento = this.otrosMovimientos.find(o => o.id === otroMovimientoId) || null;
      const usuario = this.usuarios.find(u => u.id === usuarioId) || null;

      const isEdit = !!this.data;

      const value: MovimientoInventario = {
        id: isEdit && this.data ? this.data.id : 0,
        idProducto: producto,
        idOtroMovimiento: otroMovimiento,
        cantidad: Number(this.formData.value.cantidad),
        existenciaAnterior: Number(this.formData.value.existenciaAnterior),
        existenciaActual: Number(this.formData.value.existenciaActual),
        referecia: this.formData.value.referecia,
        fechaHora: isEdit && this.data ? this.data.fechaHora : new Date(),
        idUsuario: usuario,
        motivo: this.formData.value.motivo
      };

      this.saveEvent.emit(value);
    } else {
      this.formData.markAllAsTouched();
    }
  }
}