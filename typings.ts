export interface TodoProp {
  todo_id: number
  assignee_id: number
  assignee_name: string
  todo: string
  nested?: boolean
  offset: number
}
export interface TodoProps extends TodoProp {
  onSelectTodo: (todo: TodoProp) => void
}
