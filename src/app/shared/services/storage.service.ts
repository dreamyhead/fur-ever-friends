import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dog } from '../interfaces/Dog';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private dogSubject = new BehaviorSubject<Dog | null>(null);
  currentDog$ = this.dogSubject.asObservable();

  private dogsSubject = new BehaviorSubject<Dog[]>([]);
  allDogs$ = this.dogsSubject.asObservable();

  setCurrentDog(dog: Dog) {
    this.dogSubject.next(dog);
  }

  setDogs(dogs: Dog[]) {
    this.dogsSubject.next(dogs);
  }
}
