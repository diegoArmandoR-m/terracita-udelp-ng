import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Categoria } from '../../_class/categoria';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-categoria-modal',
  standalone: false,
  templateUrl: './categoria-modal.component.html',
  styleUrls: ['./categoria-modal.component.css', '../../app.css']
})
export class CategoriaModalComponent implements OnChanges {
  
  @Input() showModal = false;
  @Input() modalTitle = "";
  @Input() data: Categoria | null = null;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<Categoria>();
  

  formData: FormGroup;
  edit = false;

  constructor(private builder: FormBuilder){

    this.formData = this.builder.group({
      id:[this.data?.id],
      nombre:[this.data?.nombre,Validators.required],
      descripcion:[this.data?.descripcion,Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']&& this.data){
      this.edit = true;
      this.formData.patchValue(this.data);
    }else{
      this.edit =false;
      this.formData.reset();
    }
  }

  closeModal(){
    this.closeModalEvent.emit();
  }

  saveModal(){
    if(this.formData.valid){
      this.saveEvent.emit(this.formData.value);
    }
  }


}
