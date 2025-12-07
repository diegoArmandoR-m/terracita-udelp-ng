import { Usuario } from "./usuario";

export interface AperturaCj {
    id: number;
    idUsuario: Usuario | null;
    fechaApertura: Date;
    montoInicial: number;
    fechaCierre: Date;
    montoFinal: number;
    diferencia: number;
    estado: boolean;
}
