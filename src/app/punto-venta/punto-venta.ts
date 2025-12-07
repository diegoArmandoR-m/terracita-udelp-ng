import { Component, OnInit } from '@angular/core';
import { Categoria } from '../_class/categoria';
import { CategoriaService } from '../_service/categoria.service';
import { Producto } from '../_class/producto';
import { MetodoPago } from '../_class/metodo-pago';
import { Venta } from '../_class/venta';
import { DetalleVenta } from '../_class/detalle-venta';
import { MetodoPagoService } from '../_service/metodo-pago.service';
import { UsuarioService } from '../_service/usuario.service';
import { VentaService } from '../_service/venta.service';
import { DetalleVentaService } from '../_service/detalle-venta.service';

@Component({
  selector: 'app-punto-venta',
  templateUrl: './punto-venta.html',
  styleUrl: './punto-venta.css',
  standalone: false,
})
export class PuntoVenta implements OnInit {

  categoriasProductos: Categoria[] = [];
  productosAgregados: Producto[] = [];

  metodosPago: MetodoPago[] = [];
  metodoPagoSeleccionado: number | null = null;

  totalVenta = 0;

  // 🔹 Para el app-message (igual que en otros componentes)
  showModalMessage = false;
  modalTitleMessage = '';
  messageBody = '';
  uri = 'punto-venta';

  constructor(
    private categoriaService: CategoriaService,
    private metodoPagoService: MetodoPagoService,
    private usuarioService: UsuarioService,
    private ventaService: VentaService,
    private detalleVentaService: DetalleVentaService
  ) { }

  ngOnInit(): void {
    this.categoriasProductos = this.categoriaService.getCategoriasProductos();
    this.metodosPago = this.metodoPagoService.getAll();
    this.totalVenta = 0;
  }

  // Agregar producto al carrito (agrupando por producto)
  agregarProducto(prod: Producto): void {
    const existente = this.productosAgregados.find(p => p.id === prod.id);

    if (existente) {
      existente.cantidad = (existente.cantidad ?? 1) + 1;
    } else {
      const copia: Producto = {
        ...prod,
        cantidad: 1
      };
      this.productosAgregados.push(copia);
    }

    this.recalcularTotal();
  }

  incrementarCantidad(prod: Producto): void {
    prod.cantidad = (prod.cantidad ?? 1) + 1;
    this.recalcularTotal();
  }

  disminuirCantidad(prod: Producto): void {
    const actual = prod.cantidad ?? 1;
    if (actual > 1) {
      prod.cantidad = actual - 1;
      this.recalcularTotal();
    } else {
      this.eliminarProducto(prod);
    }
  }

  eliminarProducto(prod: Producto): void {
    this.productosAgregados = this.productosAgregados.filter(p => p.id !== prod.id);
    this.recalcularTotal();
  }

  private recalcularTotal(): void {
    this.totalVenta = this.productosAgregados
      .reduce((acc, p) => acc + p.precio * (p.cantidad ?? 1), 0);
  }

  getMetodoPagoLabel(mp: MetodoPago | null): string {
    if (!mp) {
      return '';
    }
    // Por si tu interfaz de MetodoPago usa name o nombre
    return (mp as any).name ?? (mp as any).nombre ?? ('MP ' + mp.id);
  }

  pagar(): void {
    if (this.productosAgregados.length === 0) {
      // Podrías también usar app-message para errores si quieres, por ahora lo dejo simple
      this.showModalMessage = true;
      this.modalTitleMessage = 'messages.error';
      this.messageBody = 'messages.no-products';
      return;
    }

    if (this.metodoPagoSeleccionado == null) {
      this.showModalMessage = true;
      this.modalTitleMessage = 'messages.error';
      this.messageBody = 'messages.payment-method-required';
      return;
    }

    const metodoPago = this.metodoPagoService.get(this.metodoPagoSeleccionado) ?? null;
    const usuario = this.usuarioService.get(1) ?? null; // Usuario fijo por ahora

    const venta: Venta = {
      id: 0,
      fechaHora: new Date(),
      total: this.totalVenta,
      idMetodoPago: metodoPago,
      idUsuario: usuario,
      estado: true
    };

    this.ventaService.add(venta);

    const ventas = this.ventaService.getAll();
    const ventaGuardada = ventas[ventas.length - 1];

    for (const p of this.productosAgregados) {
      const detalle: DetalleVenta = {
        id: 0,
        idVenta: ventaGuardada,
        idProducto: p,
        cantidad: p.cantidad ?? 1,
        precioUnitario: p.precio,
        subTotal: p.precio * (p.cantidad ?? 1)
      };
      this.detalleVentaService.add(detalle);
    }

    // Limpiar venta actual
    this.productosAgregados = [];
    this.totalVenta = 0;
    this.metodoPagoSeleccionado = null;

    // 🔹 Mostrar app-message en lugar de alert
    this.modalTitleMessage = 'messages.sucess';
    this.messageBody = 'messages.save-sucess';
    this.showModalMessage = true;
  }

  // Handler del (aceptar) del app-message
  closeMessageModal(event: string): void {
    this.showModalMessage = false;
    this.modalTitleMessage = '';
    this.messageBody = '';
    // Si quisieras navegar a otro lado usando uri, podrías hacerlo aquí
  }
}