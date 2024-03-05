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
    private errorService: ErrorHandlerService,
  ) {}

  ngOnInit(): void {
    this.httpService.getTodos().subscribe((todos) => {
      this.store.addAll(todos);
    });
  }

  update(todo: Todo) {
    this.httpService.updateTodo(todo).subscribe((todoUpdated: Todo) => {
      this.store.updateOne(todoUpdated.id, todoUpdated.title);
    });
  }

  delete(todo: Todo) {
    this.httpService.deleteTodo(todo).subscribe(() => {
      this.store.deleteOne(todo.id);
    });
  }
  close(): void {
    this.errorService.clearError();
  }
}
