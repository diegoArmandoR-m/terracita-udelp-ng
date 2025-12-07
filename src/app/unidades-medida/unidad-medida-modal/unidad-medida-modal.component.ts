import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { UnidadMedida } from '../../_class/unidad-medida';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-unidad-medida-modal',
  standalone: false,
  templateUrl: './unidad-medida-modal.component.html',
  styleUrls: ['./unidad-medida-modal.component.css','../../app.css']
})
export class UnidadMedidaModalComponent implements OnChanges {
  @Input() showModal = false;
  @Input() modalTitle = "";
  @Input() data: UnidadMedida | null= null;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<UnidadMedida>();

  formData: FormGroup;
  edit = false;

  constructor(private builder: FormBuilder){
    this.formData = this.builder.group({
      id:[this.data?.id],
      nombre:[this.data?.nombre,Validators.required],
      abreviatura:[this.data?.abreviatura,Validators.required],
      activo:[this.data?.activo?? true],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data'] && this.data){
      this.edit = true;
      this.formData.patchValue(this.data);
    }else{
      this.edit = false;
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
