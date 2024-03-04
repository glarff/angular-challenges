import { Injectable, signal } from '@angular/core';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoStore {
  todos = signal<Todo[]>([]);

  addAll(todos: Todo[]) {
    this.todos.set(todos);
  }

  addOne(todo: Todo) {
    this.todos.update((todos) => [...todos, todo]);
  }

  deleteOne(id: number) {
    this.todos.update((todos) => todos.filter((s) => s.id !== id));
  }

  updateOne(targetId: number, newtitle: string) {
    this.todos.update((todos) =>
      todos.map((obj) => {
        if (obj.id === targetId) {
          return { ...obj, title: newtitle };
        }
        return obj;
      }),
    );
  }
}
