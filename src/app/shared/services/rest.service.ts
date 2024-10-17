import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpClient: HttpClient) { }

  get<T>(url: string, handleError: boolean): Observable<T> {
    return this.httpClient.get<T>(url).pipe(
      catchError((error) => {
        if (error.status === 0 || !navigator.onLine || handleError) {
          console.error('stop');
        }
        
        return throwError(() => error);
      }),
    );
  }
}
