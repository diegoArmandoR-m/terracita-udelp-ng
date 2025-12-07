import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DetalleVenta } from '../../_class/detalle-venta';
import { Venta } from '../../_class/venta';
import { Producto } from '../../_class/producto';

@Component({
  selector: 'app-detalle-venta-modal',
  templateUrl: './detalle-venta-modal.component.html',
  styleUrls: ['./detalle-venta-modal.component.css', '../../app.css'],
  standalone: false
})
export class DetalleVentaModalComponent implements OnChanges {

  @Input() showModal = false;
  @Input() modalTitle = '';
  @Input() data: DetalleVenta | null = null;

  @Input() ventas: Venta[] = [];
  @Input() productos: Producto[] = [];

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<DetalleVenta>();

  formData: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formData = this.fb.group({
      id: [0],
      venta: [-1, Validators.required],
      producto: [-1, Validators.required],
      cantidad: ['', Validators.required],
      precioUnitario: ['', Validators.required],
      subTotal: ['']
    });

    this.registrarRecalculoSubtotal();
  }

  private registrarRecalculoSubtotal(): void {
    this.formData.get('cantidad')?.valueChanges.subscribe(() => {
      this.recalcularSubtotal();
    });
    this.formData.get('precioUnitario')?.valueChanges.subscribe(() => {
      this.recalcularSubtotal();
    });
  }

  private recalcularSubtotal(): void {
    const cantidad = Number(this.formData.get('cantidad')?.value) || 0;
    const precio   = Number(this.formData.get('precioUnitario')?.value) || 0;
    const subTotal = cantidad * precio;

    this.formData.patchValue(
      { subTotal },
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
            venta: this.data.idVenta ? this.data.idVenta.id : -1,
            producto: this.data.idProducto ? this.data.idProducto.id : -1,
            cantidad: this.data.cantidad,
            precioUnitario: this.data.precioUnitario,
            subTotal: this.data.subTotal
          },
          { emitEvent: false }
        );
      } else {
        // Alta
        this.formData.reset(
          {
            id: 0,
            venta: -1,
            producto: -1,
            cantidad: '',
            precioUnitario: '',
            subTotal: 0
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
      const ventaId    = Number(this.formData.value.venta);
      const productoId = Number(this.formData.value.producto);

      const venta    = this.ventas.find(v => v.id === ventaId) || null;
      const producto = this.productos.find(p => p.id === productoId) || null;

      const isEdit = !!this.data;

      const cantidad       = Number(this.formData.value.cantidad);
      const precioUnitario = Number(this.formData.value.precioUnitario);
      const subTotal       = cantidad * precioUnitario;

      const value: DetalleVenta = {
        id: isEdit && this.data ? this.data.id : 0,
        idVenta: venta,
        idProducto: producto,
        cantidad,
        precioUnitario,
        subTotal
      };

      this.saveEvent.emit(value);
    } else {
      this.formData.markAllAsTouched();
    }
  }
}