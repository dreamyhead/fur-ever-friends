import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseDialogComponent } from '../shared/directives/base-dialog.directive';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, finalize, of } from 'rxjs';

@Component({
  selector: 'donate-dialog',
  templateUrl: './donate-dialog.component.html',
  styleUrls: ['./donate-dialog.component.scss']
})
export class DonateDialogComponent extends BaseDialogComponent {
  @Input() isVisible: boolean = false;

  donateForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    super();
    this.donateForm = this.formBuilder.group({
      amount: [null, [Validators.required, Validators.min(10), Validators.max(1000000)]]
    });
  }

  sendDonate() {
    if (!this.donateForm.valid) {
      return;
    }

    const amount = this.donateForm.value.amount;
    this.busy = true;
    
    of(`Донат в размере $${amount} успешно отправлен!`)
      .pipe(
        delay(1000),
        finalize(() => {
          this.busy = false;
          this.closeDialog();
        })
      )
      .subscribe((message) => console.log(message));
  }
}
