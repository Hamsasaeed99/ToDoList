function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    const taskList = document.getElementById('taskList');
    if(taskText === '') return;

    const li = document.createElement('li');

    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    
    const textNode = document.createElement('span');
    textNode.textContent = taskText;

    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => li.remove();

    
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            taskList.appendChild(li);
            textNode.style.textDecoration = 'line-through';
            textNode.style.color = '#888';
        } else {
            taskList.insertBefore(li, taskList.firstChild);
            textNode.style.textDecoration = 'none';
            textNode.style.color = '#333';
        }
    });

    li.appendChild(checkbox);
    li.appendChild(textNode);
    li.appendChild(deleteBtn);

    const firstUnchecked = Array.from(taskList.children)
        .find(item => !item.querySelector('input[type="checkbox"]').checked);

    if(firstUnchecked) {
        taskList.insertBefore(li, firstUnchecked); 
    } else {
        taskList.appendChild(li); 
    }

    input.value = '';
}
