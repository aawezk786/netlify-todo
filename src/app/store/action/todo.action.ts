export class GetTodos {
  static readonly type = "[Todo] Get";
}

export class DeleteTodo {
  static readonly type = "[Todo] Delete";

  constructor(public id: number) {}
}
