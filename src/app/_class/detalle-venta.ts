import { Producto } from "./producto";
import { Venta } from "./venta";

export interface DetalleVenta {
    id: number;
    idVenta: Venta | null;
    idProducto: Producto | null;
    cantidad: number;
    precioUnitario: number;
    subTotal: number;
}
