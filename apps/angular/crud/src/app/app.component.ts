import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { TodoStore } from './data-access/todo.store';
import { Todo } from './model/todo.model';
import { HttpService } from './service/http.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  todolist: WritableSignal<Todo[]> = this.store.todos;

  constructor(
    private httpService: HttpService,
    private store: TodoStore,
  ) {}

  ngOnInit(): void {
    this.httpService
      .get('https://jsonplaceholder.typicode.com/todos')
      .subscribe((todos) => {
        this.store.addAll(todos);
      });
  }

  update(todo: Todo) {
    const newString = randText();
    const targetId = todo.id;

    this.httpService
      .put(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          todo: targetId,
          title: newString,
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .subscribe((todoUpdated: Todo) => {
        this.store.updateOne(targetId, newString);
      });
  }
}
