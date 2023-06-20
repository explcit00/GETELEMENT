// Get references to HTML elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Function to retrieve tasks from local storage
function getTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  return tasks;
}

// Function to save tasks to local storage
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks
function renderTasks() {
  taskList.innerHTML = '';
  const tasks = getTasks();

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      <span>${task}</span>
      <div>
        <button class="btn btn-sm btn-secondary edit-btn" data-index="${index}">Edit</button>
        <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Function to handle task submission
function Submit(e) {
  e.preventDefault();

  const task = taskInput.value.trim();
  if (task !== '') {
    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
    renderTasks();
    taskInput.value = '';
  }
}

// Function to handle task deletion
function Delete(e) {
  if (e.target.classList.contains('delete-btn')) {
    const index = e.target.getAttribute('data-index');
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
  }
}

// Function to handle task editing
function Edit(e) {
  if (e.target.classList.contains('edit-btn')) {
    const index = e.target.getAttribute('data-index');
    const tasks = getTasks();
    const newTask = prompt('Edit the task:', tasks[index]);
    if (newTask !== null) {
      tasks[index] = newTask.trim();
      saveTasks(tasks);
      renderTasks();
    }
  }
}

// Event listeners
taskForm.addEventListener('submit', Submit);
taskList.addEventListener('click', Delete);
taskList.addEventListener('click', Edit);

// Initial rendering
renderTasks();
