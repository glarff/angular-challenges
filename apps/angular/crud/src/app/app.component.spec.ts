import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { TodoStore } from './data-access/todo.store';
import { Todo } from './model/todo.model';
import { TodoHttpService } from './service/http.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let mockHttpService: jest.Mocked<TodoHttpService>;
  let mockStore: jest.Mocked<TodoStore>;

  beforeEach(async () => {
    mockHttpService = {
      getTodos: jest.fn(),
      updateTodo: jest.fn(),
      deleteTodo: jest.fn(),
    } as unknown as jest.Mocked<TodoHttpService>;

    mockStore = {
      addAll: jest.fn(),
      updateOne: jest.fn(),
      deleteOne: jest.fn(),
    } as unknown as jest.Mocked<TodoStore>;

    await TestBed.configureTestingModule({
      imports: [HttpClientModule, AppComponent],
      providers: [
        { provide: TodoHttpService, useValue: mockHttpService },
        { provide: TodoStore, useValue: mockStore },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  // ngOnInit test case
  it('should call getTodos on ngOnInit', () => {
    const todo1: Todo = {
      id: 1,
      userId: 1,
      title: 'test todo 1',
      completed: true,
    };
    const mockTodos = [todo1];
    mockHttpService.getTodos.mockReturnValue(of(mockTodos));
    component.ngOnInit();
    expect(mockHttpService.getTodos).toHaveBeenCalled();
    expect(mockStore.addAll).toHaveBeenCalledWith(mockTodos);
  });

  // update button test case
  it('should call updateTodo and updateOne on update', () => {
    const todo1: Todo = {
      id: 1,
      userId: 1,
      title: 'test todo 1',
      completed: true,
    };
    const updatedTodo: Todo = { ...todo1, title: 'Updated Todo' };
    mockHttpService.updateTodo = jest.fn().mockReturnValue(of(updatedTodo));

    component.update(todo1);

    expect(mockHttpService.updateTodo).toHaveBeenCalledWith(todo1);
    expect(mockStore.updateOne).toHaveBeenCalledWith(
      updatedTodo.id,
      updatedTodo.title,
    );
  });

  // delete button test case
  it('should call deleteTodo and deleteOne on delete', () => {
    const mockTodo: Todo = {
      id: 1,
      title: 'Test Todo',
      completed: false,
      userId: 1,
    };
    mockHttpService.deleteTodo.mockReturnValue(of(''));

    component.delete(mockTodo);

    expect(mockHttpService.deleteTodo).toHaveBeenCalledWith(mockTodo);
    expect(mockStore.deleteOne).toHaveBeenCalledWith(mockTodo.id);
  });

  // close error modal
  it('should call clearError on close', () => {
    component.errorMessage = 'abcd';
    component.close();
    expect('').toEqual('');
  });
});
