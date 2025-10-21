// storage.js
export function saveTodos(todoList) {
  localStorage.setItem('todo', JSON.stringify(todoList));
}

export function loadTodos() {
  return JSON.parse(localStorage.getItem('todo') || '[]');
}
