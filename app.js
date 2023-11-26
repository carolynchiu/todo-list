import { v4 as uuidv4 } from "https://jspm.dev/uuid";
const addButton = document.querySelector(".btn--add");
const sortButton = document.querySelector(".btn--sort");
const todoContainer = document.querySelector(".section--todo");
const todoInput = document.getElementById("input--text");
const dateInput = document.getElementById("input--date");
const sortIcon = document.querySelector(".sort--icon");
const checkIcon = `<ion-icon name="checkmark-outline" class="btn--icon"></ion-icon>`;
const removeIcon = `<ion-icon name="close-outline" class="btn--icon"></ion-icon>`;
const editIcon = `<ion-icon name="create-outline" class="btn--icon"></ion-icon>`;
const editDoneIcon = `<ion-icon name="checkmark-done-outline" class="btn--icon"></ion-icon>`;
let todoList = localStorage.getItem("list");
let myListArray = JSON.parse(todoList) || [];

const validateInput = () => {
    if (!todoInput.value) {
        alert("Please enter some text !");
        return false;
    }
    if (!dateInput.value) {
        alert("Please enter month and date");
        return false;
    }
    return true;
};

const cleanInputFields = () => {
    todoInput.value = "";
    dateInput.value = "";
};

const createHtmlElement = (elementProperties) => {
    const { element, id, className, innerText, innerHTML, value, disabled } =
        elementProperties;
    let domElement = document.createElement(element);
    if (id) domElement.setAttribute("id", id);
    if (className) domElement.classList.add(className);
    if (innerText) domElement.innerText = innerText;
    if (innerHTML) domElement.innerHTML = innerHTML;
    if (value) domElement.value = value;
    if (disabled) domElement.setAttribute("disabled", null);
    return domElement;
};

const addTodoElement = (ListItem) => {
    const { id, content, dateTime } = ListItem;
    const todo = createHtmlElement({
        element: "div",
        id: id,
        className: "todo",
    });
    const date = createHtmlElement({
        element: "p",
        className: "todo-date",
        innerText: dateTime,
    });
    todo.appendChild(date);
    // todo text
    const text = createHtmlElement({
        element: "input",
        className: "todo-text",
        value: content,
        disabled: true,
    });
    todo.appendChild(text);
    // create edit button
    const editButton = createHtmlElement({
        element: "button",
        className: "btn--edit",
        innerHTML: editIcon,
    });
    todo.appendChild(editButton);
    // create check button
    const checkButton = createHtmlElement({
        element: "button",
        className: "btn--check",
        innerHTML: checkIcon,
    });
    todo.appendChild(checkButton);
    // create remove button
    const removeButton = createHtmlElement({
        element: "button",
        className: "btn--remove",
        innerHTML: removeIcon,
    });
    todo.appendChild(removeButton);

    checkButton.addEventListener("click", (e) => toggleItemDone(e));
    removeButton.addEventListener("click", (e) => removeTodoItem(e));
    editButton.addEventListener("click", (e) => editTodoItem(e));
    return todo;
};

const toggleItemDone = (event) => {
    event.preventDefault();
    const todoId = event.target.parentElement.id;
    const todoItem = event.target.parentElement;
    todoItem.classList.toggle("done");
    myListArray.forEach((item) => {
        if (item.id == todoId) item.completed = !item.completed;
    });
    updateLocalStorage(myListArray);
};

const updateLocalStorage = (array) => {
    if (array.length == 0) {
        localStorage.removeItem("list");
        return;
    }
    localStorage.setItem("list", JSON.stringify(array));
};

const addTodoItem = () => {
    // 表單驗證
    if (!validateInput()) return;
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
    cleanInputFields();

    // 處理資料
    myListArray.push(item);
    updateLocalStorage(myListArray);
};

const editTodoItem = (event) => {
    const todoId = event.target.parentElement.id;
    const todoItem = event.target.parentElement;
    const todoText = todoItem.children[1];
    const editButton = event.target;
    const listItem = myListArray.find((item) => item.id == todoId);

    if (listItem.completed) return;

    // 新增完成按鈕
    const editDoneButton = createHtmlElement({
        element: "button",
        className: "btn--edit",
        innerHTML: editDoneIcon,
    });
    editButton.insertAdjacentElement("afterend", editDoneButton);

    // 隱藏編輯按鈕
    editButton.style.display = "none";

    // 修改內容
    todoText.removeAttribute("disabled");
    todoText.classList.add("edit");
    let newValue = todoText.value;
    todoText.addEventListener("change", (e) => {
        newValue = e.target.value;
    });

    //儲存修改後的內容
    editDoneButton.addEventListener("click", () => {
        todoText.value = newValue;
        todoText.setAttribute("disabled", null);
        todoText.classList.remove("edit");
        editButton.style.display = "block";
        editDoneButton.style.display = "none";

        //處理 localStorage
        myListArray = myListArray.map((item) => {
            if (item.id == todoId) item.content = newValue;
            return item;
        });
        updateLocalStorage(myListArray);
    });
};

const removeTodoItem = (event) => {
    event.preventDefault();
    const todoItem = event.target.parentElement;
    const todoId = event.target.parentElement.id;
    todoItem.addEventListener("animationend", () => {
        myListArray = myListArray.filter((item) => item.id != todoId);
        updateLocalStorage(myListArray);
        todoItem.remove();
    });
    todoItem.style.animation = "scaleDown 0.3s forwards";
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
    renderTodoList(sortedArray);
};

const renderTodoList = (list) => {
    if (todoList !== null) {
        list.forEach((item) => {
            // create a todo
            const todo = addTodoElement({
                id: item.id,
                content: item.content,
                dateTime: item.dateTime,
                completed: item.completed,
            });
            if (item.completed) todo.classList.add("done");
            todoContainer.appendChild(todo);
        });
    }
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

renderTodoList(myListArray);

