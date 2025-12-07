// src/app/_service/proveedor.service.ts
import { Injectable } from '@angular/core';
import { Proveedor } from '../_class/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  data: Proveedor[] = [
    { id: 1, name: 'Distribuidora del Centro', telefono: '555-123-4567', email: 'contacto@distcentro.com', direccion: 'Av. Reforma 123, CDMX', activo: true },
    {
      id: 2, name: 'Suministros Industriales López', telefono: '555-987-6543', email: 'ventas@suministroslopez.mx', direccion: 'Calle Industria 45, Naucalpan, Edo. Mex.', activo: true
    },
    { id: 3, name: 'Proveedora del Norte', telefono: '818-555-2020', email: 'info@provnorte.com', direccion: 'Blvd. Constitución 500, Monterrey, N.L.', activo: false },
  ];
  constructor() { }
  
    getAll(): Proveedor[] {
      return this.data;
    }
  
    get(id: number): Proveedor | undefined {
      return this.data.find(d => d.id == id);
    }
  
    add(value: Proveedor) {
      value.id = this.data.reduce((max, item) => item.id > max ? item.id : max, 0) + 1;
      this.data.push(value);
    }
  
    edit(value: Proveedor) {
      const index = this.data.findIndex(d => d.id === value.id);
      if (index !== -1) {
        this.data[index] = value;
      }
    }
  
    deleteUnidadMedida(id: number) {
      this.data = this.data.filter(d => d.id !== id);
    }
}
