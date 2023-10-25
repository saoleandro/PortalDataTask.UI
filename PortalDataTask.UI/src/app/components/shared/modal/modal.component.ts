import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Animations } from '../animations';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  animations: [Animations.visibilityChanged],
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() activeModal: Boolean = false;
  @Input() titleModal: String = '';
  @Input() descriptionModal: String = '';
  @Output() onCloseActiveModal = new EventEmitter();
  @Output() onCloseConfirmActiveModal = new EventEmitter();
  @Output() doconfirmActive: EventEmitter<Object> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  closeActiveModal() {
    this.onCloseActiveModal.emit();
  }

  confirmActiveModal(){
    this.doconfirmActive.emit();
  }  
}
