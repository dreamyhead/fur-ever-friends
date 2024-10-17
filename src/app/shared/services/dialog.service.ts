import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private adoptDialogSubject = new BehaviorSubject<boolean>(false);
  adoptDialog$ = this.adoptDialogSubject.asObservable();

  private donateDialogSubject = new BehaviorSubject<boolean>(false);
  donateDialog$ = this.donateDialogSubject.asObservable();

  setAdoptDialog(state: boolean) {
    console.log(state);
    
    this.adoptDialogSubject.next(state);
  }

  setDonateDialog(state: boolean) {
    this.donateDialogSubject.next(state);
  }
}
