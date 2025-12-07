import { Injectable } from '@angular/core';
import { Usuario } from '../_class/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  data: Usuario[] = [
    {
      id: 1,
      name: 'Admin',
      passwordHash: 'hash_admin_123',
      rol: 'ADMIN',
      estado: true
    },
    {
      id: 2,
      name: 'Vendedor',
      passwordHash: 'hash_vendedor1_456',
      rol: 'VENDEDOR',
      estado: true
    },
    {
      id: 3,
      name: 'Cajero',
      passwordHash: 'hash_cajero1_789',
      rol: 'CAJERO',
      estado: false
    }
  ];

  constructor() { }

  getAll(): Usuario[] {
    return this.data;
  }

  get(id: number): Usuario | undefined {
    return this.data.find(d => d.id === id);
  }

  add(value: Usuario): void {
    value.id = this.data.reduce((max, item) => item.id > max ? item.id : max, 0) + 1;
    this.data.push(value);
  }

  edit(value: Usuario): void {
    const index = this.data.findIndex(d => d.id === value.id);
    if (index !== -1) {
      this.data[index] = value;
    }
  }

  deleteUsuario(id: number): void {
    this.data = this.data.filter(d => d.id !== id);
  }
}