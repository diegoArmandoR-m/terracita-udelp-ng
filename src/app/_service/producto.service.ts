import { Injectable } from '@angular/core';
import { Producto } from '../_class/producto';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  data:Producto[]=[
        {id:1,nombre:"Agua",precio:"15.4", existencia:"23",categoria:"Bebida",estado:"Activo"},
        {id:2,nombre:"Papas",precio:"20", existencia:"33",categoria:"Botana",estado:"Activo"},
        {id:3,nombre:"Fabuloso",precio:"38.5", existencia:"0",categoria:"Limpieza",estado:"Inactivo"},
      ];
    
      constructor(){  }
    
      getAll(): Producto[] {
        return this.data;
      }
    
      get(id:number): Producto | undefined {
          return this.data.find(d=>d.id==id);
      }
    
      add(value:Producto){
        this.data.push(value);
      }
    
      edit(value:Producto){
        const index = this.data.findIndex(d => d.id === value.id);
        if (index !== -1) {
          this.data[index] = value;
        }
      }
    
      deleteCategoria(id:number){
        this.data = this.data.filter(d => d.id !== id);
      }
}
