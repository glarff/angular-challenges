import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorHandlerService } from '../error-handler.service';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root', // This provides the service globally in your application
})
export class TodoHttpService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorHandlerService,
  ) {}

  getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(
        catchError((error) => {
          console.error('Error on GET request:', error);
          this.errorService.setError('An error occurred while fetching data.');
          return throwError(() => new Error(error));
        }),
      );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http
      .put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .pipe(
        catchError((error) => {
          console.error('Error on PUT request:', error);
          this.errorService.setError('An error occurred while updating data.');
          return throwError(() => new Error(error));
        }),
      );
  }

  deleteTodo(todo: Todo) {
    return this.http
      .delete(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
      .pipe(
        catchError((error) => {
          console.error('Error on DELETE request:', error);
          this.errorService.setError('An error occurred while updating data.');
          return throwError(() => new Error(error));
        }),
      );
  }
}
