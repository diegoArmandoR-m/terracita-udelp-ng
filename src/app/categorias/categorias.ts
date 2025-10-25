import { Component } from '@angular/core';
import { CategoriaService } from '../_service/categoria.service';
import { Categoria } from '../_class/categoria';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.html',
  styleUrls: ['./categorias.css','../app.css'],
  standalone: false
})
export class Categorias {

  categorias: Categoria[]=[];
  
  constructor(private categoriaService: CategoriaService) {
    this.categorias = this.categoriaService.getCategorias();
   }

  onInit():void {
    
  }
}
