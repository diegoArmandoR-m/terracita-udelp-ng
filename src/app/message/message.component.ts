import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css', '../app.css'],
  standalone: false
})
export class MessageComponent {
  @Input() messageTitle = "";
  @Input() messageBody = "";
  @Input() showModal = false;
  @Input() uri="";
  @Output() aceptar =new EventEmitter<string>();

  aceptarEvent(){
    this.aceptar.emit(this.uri);
  }
}
