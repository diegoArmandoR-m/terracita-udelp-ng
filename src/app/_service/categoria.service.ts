import { Injectable } from '@angular/core';
import { Categoria } from '../_class/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  categoria:Categoria[]=[
    {id:1,nombre:"Bebida",descripcion:"bebida fria"},
    {id:2,nombre:"Comida",descripcion:"Para el estomago"},
    {id:3,nombre:"Postre",descripcion:"Algo dulce"}
  ];

  constructor(){  }

  getCategorias(): Categoria[] {
    return this.categoria;
  }

  getCategoria(id:number): Categoria | undefined {

    return this.categoria.find(cat=>cat.id==id);
  }

  addCategoria(categoria:Categoria){
    this.categoria.push(categoria);
  }

  editCategoria(categoria:Categoria){
    const index = this.categoria.findIndex(cat => cat.id === categoria.id);
    if (index !== -1) {
      this.categoria[index] = categoria;
    }
  }

  deleteCategoria(id:number){
    this.categoria = this.categoria.filter(cat => cat.id !== id);
  }

}
