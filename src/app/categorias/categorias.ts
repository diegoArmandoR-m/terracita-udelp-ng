import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../_service/categoria.service';
import { Categoria } from '../_class/categoria';
import { AppReport } from '../util/app-report';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.html',
  styleUrls: ['./categorias.css','../app.css'],
  standalone: false
})
export class Categorias extends AppReport implements OnInit{

  categorias: Categoria[]=[];
  showModal =false;
  modalTitle =""
  categoria: Categoria | null=null; 
  uri= "catalogos-generales/categorias";
  
  constructor(private categoriaService: CategoriaService, router: Router) {
    super(router)
   }

  ngOnInit():void {
    this.categorias = this.categoriaService.getCategorias();
  }

  openAddModal(){
    this.modalTitle = "categorias.add-category";
    this.categoria = null;
    this.showModal=true;
  }

  openEditModal(categoria: Categoria) {
    this.modalTitle = "categorias.edit-category";
    this.categoria = categoria;
    this.showModal = true;
  }

  closeModalEvent(){
    this.showModal =false;
    this.categoria = null;
    this.modalTitle="";
  }

  saveEvent(categoria:Categoria){
    if(categoria.id){
      this.categoriaService.editCategoria(categoria);
    }else{
      this.categoriaService.addCategoria(categoria);
    }
    
    this.closeModalEvent();
    this.showModalMessage =true;
    this.modalTitleMessage = "messages.sucess";
    this.messageBody = "messages.save-sucess";
  }
}
