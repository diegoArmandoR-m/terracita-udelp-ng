import { OtroMovimiento } from "./otro-movimiento";
import { Producto } from "./producto";
import { Usuario } from "./usuario";

export interface MovimientoInventario {
    id: number;
    idProducto: Producto | null;
    idOtroMovimiento: OtroMovimiento | null;
    cantidad: number;
    existenciaAnterior: number;
    existenciaActual: number;
    referecia: string;
    fechaHora: Date;
    idUsuario: Usuario | null;
    motivo: string;
}
