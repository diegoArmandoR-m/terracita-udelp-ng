import { App } from './app';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { TranslocoRootModule } from './transloco-root.module';
import { Categorias } from './categorias/categorias';
import { CierreCaja } from './cierre-caja/cierre-caja';
import { Compras } from './compras/compras';
import { Home } from './home/home';
import { Inventarios } from './inventario/inventario';
import { MetodosPago } from './metodos-pago/metodos-pago';
import { OtrosMovimientos } from './otros-movimientos/otros-movimientos';
import { Productos } from './productos/productos';
import { Proveedores } from './proveedores/proveedores';
import { Usuarios } from './usuarios/usuarios';
import { PuntoVenta } from './punto-venta/punto-venta';
import { AperturaCaja } from './apertura-caja/apertura-caja';
import { UnidadesMedida } from './unidades-medida/unidades-medida';
import { Ventas } from './ventas/ventas';

import { CategoriaModalComponent } from './categorias/categoria-modal/categoria-modal.component';
import { MessageComponent } from './message/message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MetodoPagoModalComponent } from './metodos-pago/metodo-pago-modal/metodo-pago-modal.component';
import { ProductoModalComponent } from './productos/producto-modal/producto-modal.component';
import { UnidadMedidaModalComponent } from './unidades-medida/unidad-medida-modal/unidad-medida-modal.component';
import { ProveedorModalComponent } from './proveedores/proveedor-modal.component/proveedor-modal.component';
import { CompraModalComponent } from './compras/compra-modal/compra-modal.component';
import { UsuarioModalComponent } from './usuarios/usuario-modal/usuario-modal.component';
import { VentaModalComponent } from './ventas/venta-modal/venta-modal.component';
import { MovimientosInventario } from './movimientos-inventario/movimientos-inventario';
import { MovimientoInventarioModalComponent } from './movimientos-inventario/movimiento-inventario-modal/movimiento-inventario-modal.component';
import { OtroMovimientoModalComponent } from './otros-movimientos/otro-movimiento-modal/otro-movimiento-modal.component';
import { AperturaCajaModalComponent } from './apertura-caja/apertura-cj-modal/apertura-cj-modal.component';
import { DetallesCompra } from './detalles-compra/detalles-compra';
import { DetalleCompraModalComponent } from './detalles-compra/detalle-compra-modal/detalle-compra-modal.component';
import { DetallesVenta } from './detalles-venta/detalles-venta';
import { DetalleVentaModalComponent } from './detalles-venta/detalle-venta-modal/detalle-venta-modal.component';



@NgModule({
  declarations: [
    App,
    Categorias,
    CategoriaModalComponent,
    MessageComponent,
    MetodosPago,
    MetodoPagoModalComponent,
    Productos,
    ProductoModalComponent,
    PuntoVenta,
    UnidadesMedida,
    UnidadMedidaModalComponent,
    Proveedores,
    ProveedorModalComponent,
    Compras,
    CompraModalComponent,
    Usuarios,
    UsuarioModalComponent,
    Ventas,
    VentaModalComponent,
    OtrosMovimientos,
    OtroMovimientoModalComponent,
    MovimientosInventario,
    MovimientoInventarioModalComponent,
    AperturaCaja,
    AperturaCajaModalComponent,
    DetallesCompra,
    DetalleCompraModalComponent,
    DetallesVenta,
    DetalleVentaModalComponent,
    Inventarios,
   /* CierreCaja,
    AperturaCaja,
    Compras,
    Home,
    Inventario,
    OtrosMovimientos,
    Proveedores,
    Usuarios,
    PuntoVenta,
    Ventas,
    MovimientoInventario
    */
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    TranslocoRootModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [
    App
  ]
})
export class AppModule { }