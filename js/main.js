// main.js
import { addTodo, clearTodos } from './todoManager.js';
import { renderTodos } from './dom.js';
import { getTodos } from './todoManager.js';

const input = document.querySelector('.js-to-do-input');
const dateInput = document.querySelector('.js-date-input');
const addButton = document.querySelector('.js-add-button');
const todoList = document.querySelector('ul');
const clearButton = document.querySelector('.js-clear-button');
const sortSelect = document.querySelector('.js-sort-select');
const modal = document.querySelector('.modal');
const yesButton = document.querySelector('.js-modal-yes');
const cancelButton = document.querySelector('.js-modal-cancel');

let sortOrder = 'default';
const today = new Date().toISOString().split('T')[0];

window.addEventListener('load', () => renderTodos(todoList, sortOrder));

addButton.addEventListener('click', () => {
  const todoTask = input.value.trim();
  let dateTask = dateInput.value || today;
  if (!todoTask) return;
  

  const timeFull = new Date().toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  addTodo({
    text: todoTask,
    completed: false,
    date: dateTask,
    time: timeFull
  });

  input.value = '';
  dateInput.value = '';
  renderTodos(todoList, sortOrder);
});

input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addButton.click(); // veya direkt addTodo() da olur
  }
});

sortSelect.addEventListener('change', (event) => {
  sortOrder = event.target.value;
  renderTodos(todoList, sortOrder);
});

clearButton.addEventListener('click', () => {
  modal.style.display = 'flex';
});

yesButton.addEventListener('click', () => {
  clearTodos();
  renderTodos(todoList, sortOrder);
  modal.style.display = 'none';
});

cancelButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) modal.style.display = 'none';
});


