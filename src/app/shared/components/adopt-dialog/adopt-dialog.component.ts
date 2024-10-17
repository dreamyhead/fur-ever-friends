import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseDialogComponent } from '../shared/directives/base-dialog.directive';

@Component({
  selector: 'adopt-dialog',
  templateUrl: './adopt-dialog.component.html',
  styleUrls: ['./adopt-dialog.component.scss']
})
export class AdoptDialogComponent extends BaseDialogComponent {
  @Input() isVisible: boolean = false;
}
