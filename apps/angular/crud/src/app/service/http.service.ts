import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorHandlerService } from '../error-handler.service';

@Injectable({
  providedIn: 'root', // This provides the service globally in your application
})
export class TodoHttpService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorHandlerService,
  ) {}

  // Define methods for making HTTP requests
  get(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/todos').pipe(
      catchError((error) => {
        console.error('Error on GET request:', error);
        this.errorService.setError('An error occurred while fetching data.');
        return throwError(() => new Error(error));
      }),
    );
  }

  post(url: string, body: any): Observable<any> {
    return this.http.post(url, body).pipe(
      catchError((error) => {
        console.error('Error on POST request:', error);
        this.errorService.setError('An error occurred while updating data.');
        return throwError(() => new Error(error));
      }),
    );
  }

  put(url: string, body: any, options: any): Observable<any> {
    return this.http.put(url, body, options).pipe(
      catchError((error) => {
        console.error('Error on PUT request:', error);
        this.errorService.setError('An error occurred while updating data.');
        return throwError(() => new Error(error));
      }),
    );
  }

  delete(url: string) {
    return this.http.delete(url).pipe(
      catchError((error) => {
        console.error('Error on DELETE request:', error);
        this.errorService.setError('An error occurred while updating data.');
        return throwError(() => new Error(error));
      }),
    );
  }
}
