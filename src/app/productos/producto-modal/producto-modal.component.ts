import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../_class/producto';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-producto-modal',
  standalone: false,
  templateUrl: './producto-modal.component.html',
  styleUrls: ['./producto-modal.component.css','../../app.css']
})
export class ProductoModalComponent implements OnChanges {
  @Input() showModal = false;
  @Input() modalTitle = "";
  @Input() data: Producto | null = null;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<Producto>();
  

  formData: FormGroup;
  edit = false;

  constructor(private builder: FormBuilder){

    this.formData = this.builder.group({
      id:[this.data?.id],
      nombre:[this.data?.nombre,Validators.required],
      precio:[this.data?.precio,Validators.required],
      existencia:[this.data?.existencia,Validators.required],
      categoria:[this.data?.categoria,Validators.required],
      estado:[this.data?.estado,Validators.required],
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
