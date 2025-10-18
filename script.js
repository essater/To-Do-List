let todo = [];
let sortOrder = 'default';

window.addEventListener('load', () => {
  const savedTodo = JSON.parse(localStorage.getItem('todo') || '[]');
  todo = savedTodo;
  renderTodos();

  yesButton.addEventListener('click', () => {
    todo = [];
    localStorage.setItem('todo', JSON.stringify(todo));
    renderTodos();
    modal.style.display = 'none';
  });

  cancelButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});



const input = document.querySelector('.js-to-do-input');
const dateInput = document.querySelector('.js-date-input');
const addButton = document.querySelector('.js-add-button');
const todoList = document.querySelector('ul');
const clearButton = document.querySelector('.js-clear-button');
const yesButton = document.querySelector('.js-modal-yes');
const cancelButton = document.querySelector('.js-modal-cancel');
const modal = document.querySelector('.modal');
const today = new Date().toISOString().split('T')[0];
const sortSelect = document.querySelector('.js-sort-select');


addButton.addEventListener('click', addTodo);
clearButton.addEventListener('click', clearAll);
sortSelect.addEventListener('change', (event) => {
  sortOrder = event.target.value;
  renderTodos();
});



function addTodo() {
  const todoTask = input.value;
  let dateTask = dateInput.value;

  if (todoTask === '') {
    return;
  }

  if (!dateTask) { dateTask = today }

  const timeFull = new Date().toLocaleTimeString('tr-TR', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit' 
  });

  todo.push({
    text: todoTask,
    completed: false,
    date: dateTask,
    time: timeFull
  });

  localStorage.setItem('todo', JSON.stringify(todo));


  input.value = '';
  dateInput.value = '';

  renderTodos();

}

input.addEventListener('keypress', enter => {
  if (enter.key === 'Enter') {
    addTodo();
  }
});

function deleteTodo(event) {
  const deleteButton = event.target;
  const li = deleteButton.parentElement;
  const index = Number(li.dataset.index);
  todo.splice(index, 1);
  localStorage.setItem('todo', JSON.stringify(todo));
  renderTodos();
}

function editTodo(event) {
  const eventButton = event.target;
  const li = eventButton.parentElement;
  const index = Number(li.dataset.index);

  const textInput = document.createElement('input');
  textInput.value = todo[index].text;

  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.value = todo[index].date;

  li.innerHTML = '';
  li.appendChild(textInput);
  li.appendChild(dateInput);

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';

  li.appendChild(saveButton);
  li.appendChild(cancelButton);
  
  saveButton.addEventListener('click', () => {
    todo[index].text = textInput.value;
    todo[index].date = dateInput.value;
    localStorage.setItem('todo', JSON.stringify(todo));
    renderTodos();
  });
  cancelButton.addEventListener('click', renderTodos);
}

function toggleCompleted(event) {
  const checkbox = event.target;
  const li = checkbox.parentElement;
  const index = Number(li.dataset.index);
  todo[index].completed = !todo[index].completed;
  localStorage.setItem('todo', JSON.stringify(todo));
  renderTodos();
}

function renderTodos() {
  todoList.innerHTML = '';

  let displayedTodos = [...todo];

  if (sortOrder === 'asc') {
    displayedTodos.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
  } else if (sortOrder === 'desc') {
    displayedTodos.sort((a, b) => new Date(`${b.date}T${b.time}`) - new Date(`${a.date}T${a.time}`));
  }

  displayedTodos.forEach((task, index) => {
    const li = document.createElement('li');
    li.dataset.index = index;
    const checkbox = document.createElement('input');
    const span = document.createElement('span');
    const deleteButton = document.createElement('button');
    const dateText = document.createElement('span');
    const editButton = document.createElement('button');
    

    const formattedDate = new Date(task.date).toLocaleDateString('tr-TR');
    const timeDisplay = task.time.split(':').splice(0, 2).join(':');

    dateText.textContent = `${formattedDate} - ${timeDisplay}`;
    checkbox.type = 'checkbox';
    span.textContent = task.text;
    deleteButton.textContent = 'Delete';
    editButton.textContent = 'Edit';

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(dateText);
    li.appendChild(deleteButton);
    li.appendChild(editButton);


    todoList.appendChild(li);

    deleteButton.addEventListener('click', deleteTodo);
    editButton.addEventListener('click', editTodo);
    checkbox.addEventListener('click', toggleCompleted);

    checkbox.checked = task.completed;
    if (task.completed) {
      li.classList.add('completed');
    }

  });
}

function clearAll() {
  modal.style.display = 'flex';
}






