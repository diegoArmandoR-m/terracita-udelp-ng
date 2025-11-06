import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MetodoPago } from '../../_class/metodo-pago';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-metodo-pago-modal',
  templateUrl: './metodo-pago-modal.component.html',
  styleUrls: ['./metodo-pago-modal.component.css', '../../app.css'],
  standalone: false
})
export class MetodoPagoModalComponent implements OnChanges{
  @Input() showModal = false;
  @Input() modalTitle = "";
  @Input() data: MetodoPago | null = null;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<MetodoPago>();
  

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
