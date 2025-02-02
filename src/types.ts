export interface TodoProps {
  assignee: string;
  task?: string;
}

export interface AddToDoProps {
  newTodo: string;
  onAddTodo: () => void;
  updateNewTodo: (value: string) => void;
}
