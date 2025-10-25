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
import { Inventario } from './inventario/inventario';
import { MetodosPago } from './metodos-pago/metodos-pago';
import { OtrosMovimientos } from './otros-movimientos/otros-movimientos';
import { Productos } from './productos/productos';
import { Proveedores } from './proveedores/proveedores';
import { Usuarios } from './usuarios/usuarios';
import { PuntoVenta } from './punto-venta/punto-venta';
import { AperturaCaja } from './apertura-caja/apertura-caja';
import { UnidadesMedida } from './unidades-medida/unidades-medida';
import { Ventas } from './ventas/ventas';
import { MovimientoInventario } from './movimiento-inventario/movimiento-inventario';
import { CategoriaModalComponent } from './categorias/categoria-modal/categoria-modal.component';



@NgModule({
  declarations: [
    App,
    Categorias,
    CategoriaModalComponent,
   /* CierreCaja,
    AperturaCaja,
    Compras,
    Home,
    Inventario,
    MetodosPago,
    OtrosMovimientos,
    Productos,
    Proveedores,
    Usuarios,
    PuntoVenta,
    UnidadesMedida,
    Ventas,
    MovimientoInventario
    */
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    TranslocoRootModule
  ],
  bootstrap: [
    App
  ]
})
export class AppModule { }
