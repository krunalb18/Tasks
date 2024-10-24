document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const errorMessage = document.getElementById('error-message');

    loadTasks();

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value;
        const dueDate = dueDateInput.value;

        if (taskText === '' || dueDate === '') {
            errorMessage.textContent = "Task and due date cannot be empty.";
            return;
        }

        errorMessage.textContent = ''; 

        addTask(taskText, dueDate);

        taskInput.value = '';
        dueDateInput.value = '';
    });

    function addTask(taskText, dueDate, isCompleted = false) {
        const tasks = getTasksFromLocalStorage();
        const newTask = { text: taskText, dueDate, isCompleted };
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';
        const tasks = getTasksFromLocalStorage();

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'task-item';

            const now = new Date();
            const dueDate = new Date(task.dueDate);
            let dueClass = '';
            if (!task.isCompleted && dueDate < now) {
                dueClass = 'overdue';
            }

            li.innerHTML = `
                <span class="${task.isCompleted ? 'completed' : dueClass}">${task.text} - Due: ${task.dueDate}</span>
                <button class="complete-btn">Complete</button>
                <button class="delete-btn">Delete</button>
            `;

            li.querySelector('.complete-btn').addEventListener('click', function() {
                if (confirm("Are you sure you want to mark this task as complete?")) {
                    completeTask(index);
                }
            });

            li.querySelector('.delete-btn').addEventListener('click', function() {
                if (confirm("Are you sure you want to delete this task?")) {
                    deleteTask(index);
                }
            });

            taskList.appendChild(li);
        });
    }

    function completeTask(index) {
        const tasks = getTasksFromLocalStorage();
        tasks[index].isCompleted = true;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function deleteTask(index) {
        const tasks = getTasksFromLocalStorage();
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function getTasksFromLocalStorage() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    function loadTasks() {
        renderTasks();
    }
});
