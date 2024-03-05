import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
} from '@angular/core';
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
    protected errorService: ErrorHandlerService,
  ) {}

  // OnLoad logic
  //   Get full list of Todos via get function
  //   Update repository with list of Todos
  ngOnInit(): void {
    this.httpService.getTodos().subscribe((todos) => {
      this.store.addAll(todos);
    });
  }

  // Update button handling
  //   Set new text for Todo using random text generator
  //   Send new Todo to url via update function
  //   Update store with modified Todo
  update(todo: Todo) {
    this.httpService.updateTodo(todo).subscribe((todoUpdated: Todo) => {
      this.store.updateOne(todoUpdated.id, todoUpdated.title);
    });
  }

  // Delete button handling
  //   Send Todo id to URL via delete function
  //   Remove Todo from store
  delete(todo: Todo) {
    this.httpService.deleteTodo(todo).subscribe(() => {
      this.store.deleteOne(todo.id);
    });
  }

  // Close button on error modal
  //   Clears error message tracked in errorService
  close(): void {
    this.errorService.clearError();
  }
}
