import { LocalStorageModule } from "./modules/localStorageModule.js";
import { FormModule } from "./modules/formModule.js";
import { ListModule } from "./modules/listModule.js";
import { ItemModule } from "./modules/itemModule.js";
let { myListArray, updateLocalStorage, uuidv4 } = LocalStorageModule;
const { validateInput, cleanInputFields } = FormModule;
const { renderTodoList } = ListModule;
const { addTodoElement } = ItemModule;
const addButton = document.querySelector(".btn--add");
const sortButton = document.querySelector(".btn--sort");
const todoContainer = document.querySelector(".section--todo");
const todoInput = document.getElementById("input--text");
const dateInput = document.getElementById("input--date");
const sortIcon = document.querySelector(".sort--icon");


const addTodoItem = () => {
    // 表單驗證
    if (!validateInput(todoInput, dateInput)) return;
    // 新增 DOM
    let item = {
        id: uuidv4(),
        content: todoInput.value,
        dateTime: dateInput.value,
        completed: false,
    };
    const todo = addTodoElement(item);
    todo.style.animation = "scaleUp 0.3s forwards";
    todoContainer.appendChild(todo);
    // clean input
    cleanInputFields(todoInput, dateInput);

    // 處理資料
    myListArray.push(item);
    updateLocalStorage(myListArray);
};

const sortByTime = (array, type) => {
    const sortedArray =
        type == "asc"
            ? array
                  .slice()
                  .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
            : array
                  .slice()
                  .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
    todoContainer.innerHTML = "";
    renderTodoList(sortedArray, todoContainer);
};

// sort todo list item
sortButton.addEventListener("click", (e) => {
    e.preventDefault();
    let targetName = e.target.name;
    if (targetName == "asc") {
        e.target.name = "des";
        sortIcon.name = "caret-down-outline";
        sortByTime(myListArray, "des");
    } else if (targetName == "des") {
        e.target.name = "asc";
        sortIcon.name = "caret-up-outline";
        sortByTime(myListArray, "asc");
    } else {
        e.target.name = "asc";
        sortIcon.name = "caret-up-outline";
        sortByTime(myListArray, "asc");
    }
});

// add todo list item
addButton.addEventListener("click", (e) => {
    e.preventDefault();
    // create a todo
    addTodoItem();
});

renderTodoList(myListArray, todoContainer);

