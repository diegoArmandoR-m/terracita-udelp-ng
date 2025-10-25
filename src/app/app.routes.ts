import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Productos } from './productos/productos';
import { Categorias } from './categorias/categorias';
import { UnidadesMedida } from './unidades-medida/unidades-medida';
import { Proveedores } from './proveedores/proveedores';
import { MetodosPago } from './metodos-pago/metodos-pago';
import { Compras } from './compras/compras';
import { Ventas } from './ventas/ventas';
import { Inventario } from './inventario/inventario';
import { MovimientoInventario } from './movimiento-inventario/movimiento-inventario';
import { AperturaCaja } from './apertura-caja/apertura-caja';
import { CierreCaja } from './cierre-caja/cierre-caja';
import { OtrosMovimientos } from './otros-movimientos/otros-movimientos';
import { Usuarios } from './usuarios/usuarios';
import { PuntoVenta } from './punto-venta/punto-venta';

export const routes: Routes = [
    {path:"", component: Home},
    {path:"catalogos-generales/productos", component: Productos},
    {path:"catalogos-generales/categorias", component: Categorias},
    {path:"catalogos-generales/unidades-medida", component: UnidadesMedida},
    {path:"catalogos-generales/proveedores", component: Proveedores},
    {path:"catalogos-generales/metodos-pagos", component: MetodosPago},
    {path:"procesos/compras", component: Compras},
    {path:"procesos/ventas", component: Ventas},
    {path:"procesos/inventario", component: Inventario},
    {path:"procesos/movimiento-inventario", component: MovimientoInventario},
    {path:"procesos/apertura-caja", component: AperturaCaja},
    {path:"procesos/cierre-caja", component: CierreCaja},
    {path:"procesos/otros-movimientos", component: OtrosMovimientos},
    {path:"administracion/usuarios", component: Usuarios},
    {path:"punto-venta", component: PuntoVenta},
];
