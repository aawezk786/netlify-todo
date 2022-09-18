import { Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { Todo } from "../models/Todo";
import { DeleteTodo, GetTodos } from "../store/action/todo.action";
import { TodoState } from "../store/state/todo.state";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  @Select(TodoState.getTodoList)
  todos: Observable<Todo[]>;
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetTodos());
    console.warn(this.todos);
  }

  deleteTodo(id: number) {
    this.store.dispatch(new DeleteTodo(id));
  }
}
