import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
} from '@angular/core';
import { randText } from '@ngneat/falso';
import { catchError } from 'rxjs/operators';
import { TodoStore } from './data-access/todo.store';
import { ErrorHandlerService } from './error-handler.service';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { Todo } from './model/todo.model';
import { TodoHttpService } from './service/http.service';

@Component({
  standalone: true,
  imports: [CommonModule, ErrorModalComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  todolist: WritableSignal<Todo[]> = this.store.todos;
  errorMessage: string = '';

  constructor(
    private httpService: TodoHttpService,
    private store: TodoStore,
    private errorService: ErrorHandlerService,
  ) {}

  ngOnInit(): void {
    this.httpService.get().subscribe((todos) => {
      this.store.addAll(todos);
    });
  }

  update(todo: Todo) {
    const newString = randText();

    this.httpService
      .put(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: newString,
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
          return [];
        }),
      )
      .subscribe((todoUpdated: Todo) => {
        this.store.updateOne(todo.id, newString);
      });
  }

  // delete function implementation
  delete(todo: Todo) {
    this.httpService
      .delete(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
      .pipe(
        catchError((error) => {
          console.error('Error on DELETE request:', error);
          return [];
        }),
      )
      .subscribe(() => {
        this.store.deleteOne(todo.id);
      });
  }
  close(): void {
    this.errorService.clearError();
  }
}
