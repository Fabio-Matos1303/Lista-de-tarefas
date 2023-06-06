const form = document.querySelector('#form');
const tasksContainer = document.querySelector('.tasks');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  
  const novaTaskInput = event.target.querySelector('#novaTask');
  const novaTask = novaTaskInput.value;
  
  if (novaTask.trim() !== '') {
    addTask(novaTask);
    saveTasksToLocalStorage(); // Salva as tarefas no localStorage
    novaTaskInput.value = '';
  }
});

window.addEventListener('DOMContentLoaded', function () {
  loadTasksFromLocalStorage(); // Carrega as tarefas do localStorage ao carregar a página
});

function addTask(task) {
  const taskElement = document.createElement('p');
  taskElement.classList.add('task');
  
  const taskTextElement = document.createElement('span');
  taskTextElement.classList.add('task-text');
  taskTextElement.textContent = task;
  
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Excluir';
  deleteButton.addEventListener('click', function () {
    deleteTask(taskElement);
    saveTasksToLocalStorage(); // Salva as tarefas atualizadas no localStorage
  });
  
  taskElement.appendChild(taskTextElement);
  taskElement.appendChild(deleteButton);
  
  tasksContainer.appendChild(taskElement);
}

function deleteTask(taskElement) {
  taskElement.remove();
  saveTasksToLocalStorage(); // Salva as tarefas atualizadas no localStorage
}

function saveTasksToLocalStorage() {
  const tasks = Array.from(tasksContainer.children).map(function (taskElement) {
    return taskElement.querySelector('.task-text').textContent;
  });
  
  localStorage.setItem('tasks', JSON.stringify(tasks)); // Converte as tarefas para JSON e as armazena no localStorage
}

function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')); // Obtém as tarefas armazenadas no localStorage
  
  if (tasks && tasks.length > 0) {
    tasks.forEach(function (task) {
      addTask(task);
    });
  }
}