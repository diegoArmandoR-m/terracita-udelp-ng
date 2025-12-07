import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DetalleCompra } from '../../_class/detalle-compra';
import { Compra } from '../../_class/compra';
import { Producto } from '../../_class/producto';

@Component({
  selector: 'app-detalle-compra-modal',
  templateUrl: './detalle-compra-modal.component.html',
  styleUrls: ['./detalle-compra-modal.component.css', '../../app.css'],
  standalone: false
})
export class DetalleCompraModalComponent implements OnChanges {

  @Input() showModal = false;
  @Input() modalTitle = '';
  @Input() data: DetalleCompra | null = null;

  @Input() compras: Compra[] = [];
  @Input() productos: Producto[] = [];

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<DetalleCompra>();

  formData: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formData = this.fb.group({
      id: [0],
      compra: [-1, Validators.required],
      producto: [-1, Validators.required],
      cantidad: ['', Validators.required],
      precioUnitario: ['', Validators.required],
      subtotal: ['']
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
    const precio  = Number(this.formData.get('precioUnitario')?.value) || 0;
    const subtotal = cantidad * precio;

    this.formData.patchValue(
      { subtotal },
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
            compra: this.data.idCompra ? this.data.idCompra.id : -1,
            producto: this.data.idProducto ? this.data.idProducto.id : -1,
            cantidad: this.data.cantidad,
            precioUnitario: this.data.precioUnitario,
            subtotal: this.data.subtotal
          },
          { emitEvent: false }
        );
      } else {
        // Alta
        this.formData.reset(
          {
            id: 0,
            compra: -1,
            producto: -1,
            cantidad: '',
            precioUnitario: '',
            subtotal: 0
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
      const compraId   = Number(this.formData.value.compra);
      const productoId = Number(this.formData.value.producto);

      const compra   = this.compras.find(c => c.id === compraId)   || null;
      const producto = this.productos.find(p => p.id === productoId) || null;

      const isEdit = !!this.data;

      const cantidad      = Number(this.formData.value.cantidad);
      const precioUnitario = Number(this.formData.value.precioUnitario);
      const subtotal      = cantidad * precioUnitario;

      const value: DetalleCompra = {
        id: isEdit && this.data ? this.data.id : 0,
        idCompra: compra,
        idProducto: producto,
        cantidad,
        precioUnitario,
        subtotal
      };

      this.saveEvent.emit(value);
    } else {
      this.formData.markAllAsTouched();
    }
  }
}