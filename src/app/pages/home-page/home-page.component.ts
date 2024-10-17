import { Component } from '@angular/core';
import { catchError, finalize, map, of, Subject, takeUntil } from 'rxjs';
import { RestService } from 'src/app/shared/services/rest.service';
import { Dog } from '../../shared/interfaces/Dog';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';
@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  busy: boolean = false;
  dogs: Dog[] = [];
  currentDog?: Dog;
  names: string[] = ['Buddy', 'Charlie', 'Max', 'Bella', 'Luna', 'Daisy', 'Rocky', 'Sadie', 'Molly', 'Teddy'];
  destroySubject$ = new Subject<void>();

  constructor(
    private restService: RestService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.storageService.allDogs$.pipe(takeUntil(this.destroySubject$)).subscribe((dogs) => {
      this.dogs = dogs;
    })
  }

  ngOnInit() {
    this.initDogsList();
  }

  initDogsList() {
    if (this.dogs.length !== 0) {
      return;
    }

    this.busy = true;
    this.restService.get<Dog>(`https://dog.ceo/api/breeds/image/random/30`, false).pipe(
      catchError(() => of(null))
    ).subscribe((dogs) => {
      if (!dogs) {
        return;
      }

      this.storageService.setDogs(this.dogs);
      this.dogs = dogs.message!.map((imageUrl) => {
        const breed = imageUrl.split('/')[4].replace(/-/g, ' ');
        const name = this.getRandomName();
        const gender = this.getRandomGender();

        return {
          id: uuidv4(),
          name: name,
          gender: gender,
          breed: breed,
          imageUrl: imageUrl,
          liked: false
        };
      });
      
      this.storageService.setDogs(this.dogs);
      this.checkImagesLoaded(this.dogs.map(dog => dog.imageUrl))
    })
  }

  checkImagesLoaded(imageUrls: string[]) {
    let loadedCount = 0;

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imageUrls.length) {
          setTimeout(() => this.busy = false, 1200);
        }
      };
    });
  }

  getRandomGender(): string {
    const genders = ['male', 'female'];
    const randomIndex = Math.floor(Math.random() * genders.length);
    return genders[randomIndex];
  }

  getRandomName(): string {
    const randomIndex = Math.floor(Math.random() * this.names.length);
    return this.names[randomIndex];
  }

  changeLike(event: Event, id: string) {
    event.stopPropagation();
    this.dogs.forEach((dog) => {
      if (dog.id !== id) {
        return;
      }

      dog.liked = !dog.liked;
    })
  }

  openDogCard(dog: Dog) {
    this.storageService.setCurrentDog(dog);
    this.router.navigate([`public/dog/${dog.id}`]);
  }

  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
