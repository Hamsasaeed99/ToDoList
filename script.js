// State Management
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

// DOM Elements
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const itemsLeft = document.getElementById('itemsLeft');
const dateDisplay = document.getElementById('dateDisplay');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    updateDate();
    
    // Enter key support
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    // Filter switching
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTasks();
        });
    });
});

function updateDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplay.textContent = new Date().toLocaleDateString(undefined, options);
}

function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);
    saveAndRender();
    taskInput.value = '';
}

function toggleTask(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveAndRender();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveAndRender();
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    const newText = prompt('Edit your task:', task.text);
    if (newText !== null && newText.trim() !== '') {
        tasks = tasks.map(t => 
            t.id === id ? { ...t, text: newText.trim() } : t
        );
        saveAndRender();
    }
}

function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    const scrollPos = taskList.scrollTop; // Save scroll position
    taskList.innerHTML = '';
    
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true;
    });

    if (filteredTasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <p>${tasks.length === 0 ? 'No tasks yet. Add one!' : 'No tasks match this filter.'}</p>
            </div>
        `;
    } else {
        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            li.innerHTML = `
                <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTask(${task.id})"></div>
                <span class="task-text">${task.text}</span>
                <div class="task-actions">
                    <button class="action-btn edit-btn" onclick="editTask(${task.id})">
                        <i class="fas fa-pen"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteTask(${task.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    const activeCount = tasks.filter(t => !t.completed).length;
    itemsLeft.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
    
    // Restore scroll position
    requestAnimationFrame(() => {
        taskList.scrollTop = scrollPos;
    });
}


