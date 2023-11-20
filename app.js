import { v4 as uuidv4 } from "https://jspm.dev/uuid";
const addButton = document.querySelector(".btn--add");
const todoContainer = document.querySelector(".section--todo");
const todoInput = document.getElementById("input--text");
const monthInput = document.getElementById("input--month");
const dayInput = document.getElementById("input--day");
const checkIcon = `<ion-icon name="checkmark-outline" class="btn--icon"></ion-icon>`;
const removeIcon = `<ion-icon name="close-outline" class="btn--icon"></ion-icon>`;
const todoList = localStorage.getItem("list");

const validateInput = () => {
    if (!todoInput.value) {
        alert("Please enter some text !");
        return false;
    }
    if (!monthInput.value || !dayInput.value) {
        alert("Please enter month and date");
        return false;
    }
    return true;
};

const cleanInputFields = () => {
    todoInput.value = "";
    monthInput.value = "";
    dayInput.value = "";
};

const createHtmlElement = (elementProperties) => {
    const { element, className, innerText, innerHTML } = elementProperties;
    let domElement = document.createElement(element);
    domElement.classList.add(className);
    if (innerText) {
        domElement.innerText = innerText;
    }
    if (innerHTML) {
        domElement.innerHTML = innerHTML;
    }
    return domElement;
};

const createTodoList = (ListItem) => {
    const { content, month, day } = ListItem;
    const todo = createHtmlElement({ element: "div", className: "todo" });
    // todo text
    const text = createHtmlElement({
        element: "p",
        className: "todo-text",
        innerText: content,
    });
    todo.appendChild(text);
    // todo date
    let dateValue = `${month} / ${day}`;
    const date = createHtmlElement({
        element: "p",
        className: "todo-date",
        innerText: dateValue,
    });
    todo.appendChild(date);
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

    return todo;
};

const toggleItemDone = (event) => {
    event.preventDefault();
    const todoItem = event.target.parentElement;
    todoItem.classList.toggle("done");
};

const removeTodoItem = (event) => {
    event.preventDefault();
    const todoItem = event.target.parentElement;
    todoItem.addEventListener("animationend", () => {
        //remove from localstorage
        const text = todoItem.children[0].innerText;
        const myListArray = JSON.parse(todoList);
        myListArray.forEach((item, index) => {
            if (item.myTodoText == text) {
                myListArray.splice(index, 1);
                localStorage.setItem("list", JSON.stringify(myListArray));
            }
        });
        todoItem.remove();
    });
    todoItem.style.animation = "scaleDown 0.3s forwards";
};

const updateLocalStorage = (item) => {
    if (todoList === null) {
        localStorage.setItem("list", JSON.stringify([item]));
    } else {
        let myListArray = JSON.parse(todoList);
        myListArray.push(item);
        localStorage.setItem("list", JSON.stringify(myListArray));
    }
};

const addTodo = () => {
    // 表單驗證
    if (!validateInput()) return;
    // 新增 todo item
    let item = {
        id: uuidv4(),
        content: todoInput.value,
        month: monthInput.value,
        day: dayInput.value,
    };
    const todo = createTodoList(item);
    updateLocalStorage(item);
    todo.style.animation = "scaleUp 0.3s forwards";
    todoContainer.appendChild(todo);
    // clean input
    cleanInputFields();
};

// add todo list item
addButton.addEventListener("click", (e) => {
    e.preventDefault();
    // create a todo
    addTodo();
});

if (todoList !== null) {
    let myListArray = JSON.parse(todoList);
    myListArray.forEach((item) => {
        // create a todo
        const todo = createTodoList({
            id: item.id,
            content: item.content,
            month: item.month,
            day: item.day,
        });
        todoContainer.appendChild(todo);
    });
}

