import { Compra } from "./compra";
import { Producto } from "./producto";

export interface DetalleCompra {
    id: number;
    idCompra: Compra | null;
    idProducto: Producto | null;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
}
