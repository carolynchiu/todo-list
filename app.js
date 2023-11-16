const addButton = document.querySelector(".btn--add");
const todoContainer = document.querySelector(".section--todo");
let todoInput = document.getElementById("input--text");
let monthInput = document.getElementById("input--month");
let dayInput = document.getElementById("input--day");
let checkIcon = `<ion-icon name="checkmark-outline" class="btn--icon"></ion-icon>`;
let removeIcon = `<ion-icon name="close-outline" class="btn--icon"></ion-icon>`;

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

const createTodoList = (content, month, day) => {
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
        const myListArray = JSON.parse(localStorage.getItem("list"));
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

const updateLocalStorage = () => {
    // create an object
    let myTodo = {
        myTodoText: todoInput.value,
        myTodoMonth: monthInput.value,
        myTodoDay: dayInput.value,
    };

    // store data into an array of object
    let myList = localStorage.getItem("list");

    if (myList === null) {
        localStorage.setItem("list", JSON.stringify([myTodo]));
    } else {
        let myListArray = JSON.parse(myList);
        myListArray.push(myTodo);
        localStorage.setItem("list", JSON.stringify(myListArray));
    }
};

const addTodo = () => {
    // 表單驗證
    if (!validateInput()) return;
    // 新增 todo item
    const todo = createTodoList(
        todoInput.value,
        monthInput.value,
        dayInput.value
    );
    todo.style.animation = "scaleUp 0.3s forwards";
    todoContainer.appendChild(todo);
    updateLocalStorage();
    // clean input
    cleanInputFields();
};

// add todo list item
addButton.addEventListener("click", (e) => {
    e.preventDefault();
    // create a todo
    addTodo();
});

const myList = localStorage.getItem("list");

if (myList !== null) {
    let myListArray = JSON.parse(myList);
    myListArray.forEach((item) => {
        // create a todo
        const todo = createTodoList(
            item.myTodoText,
            item.myTodoMonth,
            item.myTodoDay
        );
        todoContainer.appendChild(todo);
    });
}

