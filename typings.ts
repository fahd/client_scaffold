export interface TodoProps {
  todo_id: number
  assignee_id: number
  assignee_name: number
  todo: string
  nested?: boolean
  offset: number
  onSelectTodo: (value) => void
}
