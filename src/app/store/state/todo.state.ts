import { Action, Selector, State, StateContext } from "@ngxs/store";
import { TodoService } from "src/app/services/todo.service";
import { Todo } from "../../models/Todo";
import { DeleteTodo, GetTodos } from "../action/todo.action";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

export class TodoStateModel {
  todos: Todo[];
  selectedTodo: Todo | null;
}

@State<TodoStateModel>({
  name: "todos",
  defaults: {
    todos: [],
    selectedTodo: null,
  },
})
@Injectable()
export class TodoState {
  constructor(private todoService: TodoService) {}

  @Selector()
  static getTodoList(state: TodoStateModel) {
    return state.todos;
  }

  @Selector()
  static getSelectedTodo(state: TodoStateModel) {
    return state.selectedTodo;
  }

  @Action(GetTodos)
  getTodos({ getState, setState }: StateContext<TodoStateModel>) {
    return this.todoService.fetchTodos().pipe(
      tap((result) => {
        console.warn("result");
        const state = getState();
        setState({
          ...state,
          todos: result,
        });
      })
    );
  }

  @Action(DeleteTodo)
  deleteTodo(
    { getState, setState }: StateContext<TodoStateModel>,
    { id }: DeleteTodo
  ) {
    return this.todoService.deleteTodo(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.todos.filter((item) => item.id !== id);
        setState({
          ...state,
          todos: filteredArray,
        });
      })
    );
  }
}
