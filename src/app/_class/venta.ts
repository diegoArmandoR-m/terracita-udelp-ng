import { MetodoPago } from "./metodo-pago";
import { Usuario } from "./usuario";

export interface Venta {
    id: number;
    fechaHora: Date;
    total: number;
    idMetodoPago: MetodoPago | null;
    idUsuario: Usuario | null;
    estado: boolean;
}