import { Directive, EventEmitter, Output } from '@angular/core';

@Directive() 
export abstract class BaseDialogComponent {
  @Output() close = new EventEmitter<void>();
  isClosing: boolean = false;
  busy: boolean = false;

  closeDialog() {
    this.isClosing = true;
    setTimeout(() => {
      this.close.emit();
      this.isClosing = false;
    }, 500);
  }
}