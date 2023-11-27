import { HtmlModule } from "./htmlModule.js";
import { LocalStorageModule } from "./localStorageModule.js";

export const ItemModule = (() => {
    const { createHtmlElement } = HtmlModule;
    let { myListArray, updateLocalStorage } = LocalStorageModule;
    const checkIcon = `<ion-icon name="checkmark-outline" class="btn--icon"></ion-icon>`;
    const removeIcon = `<ion-icon name="close-outline" class="btn--icon"></ion-icon>`;
    const editIcon = `<ion-icon name="create-outline" class="btn--icon"></ion-icon>`;
    const editDoneIcon = `<ion-icon name="checkmark-done-outline" class="btn--icon"></ion-icon>`;

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

    return {
        addTodoElement,
        toggleItemDone,
    };
})();

