// todoManager.js
import { saveTodos, loadTodos } from './storage.js';

let todos = loadTodos();

export function getTodos() {
  return todos;
}

export function setTodos(newList) {
  todos = newList;
  saveTodos(todos);
}

export function addTodo(task) {
  todos.push(task);
  saveTodos(todos);
}

export function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos(todos);
}

export function toggleCompleted(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos(todos);
}

export function editTodo(index, newText, newDate) {
  todos[index].text = newText;
  todos[index].date = newDate;
  saveTodos(todos);
}

export function clearTodos() {
  todos = [];
  saveTodos(todos);
}
