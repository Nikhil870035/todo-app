let allTodos = getTodos();

function createTodoItem(todo, todoIndex) {
    const todoId = "todo-" + todoIndex;
    const todoLI = document.createElement("li");
    todoLI.className = "todo";
    todoLI.innerHTML = `
                <input type="checkbox" id="${todoId}">
                <label class="custom-checkbox" for="${todoId}">
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M382-267.69 183.23-466.46 211.77-495 382-324.77 748.23-691l28.54 28.54L382-267.69Z"/></svg>
                </label>
                <label for="${todoId}" class="todo-text">
                    ${todo.text}
                </label>
                <button class="delete-button">
                    <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M304.62-160q-26.85 0-45.74-18.88Q240-197.77 240-224.62V-720h-40v-40h160v-30.77h240V-760h160v40h-40v495.38q0 27.62-18.5 46.12Q683-160 655.38-160H304.62ZM680-720H280v495.38q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h350.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93V-720ZM392.31-280h40v-360h-40v360Zm135.38 0h40v-360h-40v360ZM280-720v520-520Z"/></svg>
                </button>   
            `;
    const deleteButton = todoLI.querySelector(".delete-button");
    deleteButton.addEventListener("click", function () {
        deleteTodo(todoIndex);
    });
    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", () => {
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    })
    checkbox.checked = todo.completed;
    return todoLI;
}

function deleteTodo(todoIndex) {
    allTodos = allTodos.filter((_, i) => i !== todoIndex);
    saveTodos();
    updateTodoList();
}

function saveTodos() {
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson);
}

function getTodos() {
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}

function updateTodoList() {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";
    allTodos.forEach((todo, index) => {
        const todoItem = createTodoItem(todo, index);
        todoList.appendChild(todoItem);
    });
}

// Form submission
const form = document.getElementById("todo-form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const input = document.getElementById("todo-input");
    const text = input.value.trim();
    if (text) {
        allTodos.push({ text, completed: false });
        saveTodos();
        updateTodoList();
        input.value = "";
    }
});

// Initial render
updateTodoList();
