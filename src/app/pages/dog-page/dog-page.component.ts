import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Dog } from 'src/app/shared/interfaces/Dog';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-dog-page',
  templateUrl: './dog-page.component.html',
  styleUrls: ['./dog-page.component.scss']
})
export class DogPageComponent {
  currentDog!: Dog;
  isDonateDialogVisible: boolean = false;
  isAdoptDialogVisible: boolean = false;

  constructor(
    private router: Router,
    private storageService: StorageService
  ) {
    this.storageService.currentDog$.subscribe((dog) => {
      if (!dog) {
        this.router.navigate([`public/not-found`]);
        
        return;
      }

      this.currentDog = dog;
    })
  }

  returnToHome(event: Event) {
    event.stopPropagation();
    this.router.navigate(['public/home']);
  }

  changeLike(event: Event) {
    event.stopPropagation();
    this.currentDog.liked = !this.currentDog.liked;
  }

  openDialog(dialogName: string): void {
    if (dialogName === 'donate') {
      this.isDonateDialogVisible = true;
    } else if (dialogName === 'adopt') {
      this.isAdoptDialogVisible = true;
    }
  }

  closeDialog(dialogName: string): void {
    if (dialogName === 'donate') {
      this.isDonateDialogVisible = false;
    } else if (dialogName === 'adopt') {
      this.isAdoptDialogVisible = false;
    }
  }
}
