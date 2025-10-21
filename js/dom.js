// dom.js
import { getTodos, deleteTodo, toggleCompleted, editTodo } from './todoManager.js';

export function renderTodos(todoListElement, sortOrder) {
  let todos = [...getTodos()];

  todoListElement.innerHTML = '';

  if (sortOrder === 'asc') {
    todos.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
  } else if (sortOrder === 'desc') {
    todos.sort((a, b) => new Date(`${b.date}T${b.time}`) - new Date(`${a.date}T${a.time}`));
  }

  todos.forEach((task, index) => {
    const li = document.createElement('li');
    li.dataset.index = index;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;

    const span = document.createElement('span');
    span.textContent = task.text;

    const dateText = document.createElement('span');
    const formattedDate = new Date(task.date).toLocaleDateString('tr-TR');
    const timeDisplay = task.time.split(':').splice(0, 2).join(':');
    dateText.textContent = `${formattedDate} - ${timeDisplay}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';

    li.append(checkbox, span, dateText, deleteButton, editButton);
    todoListElement.appendChild(li);

    // event'lar
    checkbox.addEventListener('click', () => {
      toggleCompleted(index);
      renderTodos(todoListElement, sortOrder);
    });

    deleteButton.addEventListener('click', () => {
      deleteTodo(index);
      renderTodos(todoListElement, sortOrder);
    });

    editButton.addEventListener('click', () => {
      const textInput = document.createElement('input');
      textInput.value = task.text;
      const dateInput = document.createElement('input');
      dateInput.type = 'date';
      dateInput.value = task.date;
      const saveButton = document.createElement('button');
      saveButton.textContent = 'Save';
      const cancelButton = document.createElement('button');
      cancelButton.textContent = 'Cancel';

      li.innerHTML = '';
      li.append(textInput, dateInput, saveButton, cancelButton);

      saveButton.addEventListener('click', () => {
        editTodo(index, textInput.value, dateInput.value);
        renderTodos(todoListElement, sortOrder);
      });

      cancelButton.addEventListener('click', () => renderTodos(todoListElement, sortOrder));
      
    });
  });
}
