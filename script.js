// RETRIEVE TODO FROM LOCAL STORAGE OR INITIALIZE AN EMPTY ARRAY

let todo = JSON.parse(localStorage.getItem("todo")) || [];

const todoInput = document.getElementById("todoInput");

console.log(todoInput);

const todoList = document.getElementById("todoList");

const todoCount = document.getElementById("todoCount");

const addButton = document.querySelector(".btn");

const deleteButton = document.getElementById("deleteButton");

// INITIALIZE

document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addTask();
    }
  });
  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
});

function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask !== "")
    todo.push({
      text: newTask,
      disabled: false,
    });
  saveToLocalStorage();
  todoInput.value = "";
  displayTasks();
}

function deleteAllTasks() {
  console.log("test");
}

function displayTasks() {
    todoList.innerHTML = "";
    todo.forEach((item, i) => {
      const p = document.createElement("p");
      p.innerHTML = `
          <div class="todo-container">
              <input type="checkbox" class="todo-checkbox" id="input-${i}" ${
        item.disabled ? "checked" : ""
      }>
              <p id="todo-${i}" class="${item.disabled ? "disabled" : ""}"
              onclick="editTask(${i})">${item.text}</p>
          </div>
          `;
      p.querySelector(".todo-checkbox").addEventListener("change", () => {
        toggleTask(i);
      });
      todoList.appendChild(p);
    });
  
    const todoCountElement = document.querySelector(".todoCount");
    if (todoCountElement) {
      const totalTasks = todo.reduce((acc, item) => (item.disabled ? acc : acc + 1), 0);
  
      console.log("Task count:", totalTasks);
      todoCountElement.textContent = totalTasks;
    } else {
      console.error("TodoCount element not found.");
    }
  }
  
  
  

function editTask(i) {
    const todoItem = document.getElementById(`todo-${i}`);
    const existingText = todo[i].text;
    const inputElement = document.createElement('input');

    inputElement.value = existingText;
    todoItem.replaceWith(inputElement);
    inputElement.focus();

    inputElement.addEventListener('blur', function() {
        const updatedText = inputElement.value.trim();
        if (updatedText) {
            todo[i].text = updatedText;
            saveToLocalStorage();
            displayTasks();
        }
    });
}

function toggleTask(i) {
    todo[i].disabled = !todo[i].disabled;
    saveToLocalStorage();
    displayTasks();
}

function deleteAllTasks() {
    todo = [];
    saveToLocalStorage();
    displayTasks();
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}
