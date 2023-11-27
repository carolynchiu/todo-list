import { LocalStorageModule } from "./localStorageModule.js";
import { ItemModule } from "./itemModule.js";
export const FormModule = (() => {
    let { myListArray, updateLocalStorage, uuidv4 } = LocalStorageModule;
    const { addTodoElement } = ItemModule;
    const todoInput = document.getElementById("input--text");
    const dateInput = document.getElementById("input--date");

    const validateInput = (todoInput, dateInput) => {
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

    const cleanInputFields = (todoInput, dateInput) => {
        todoInput.value = "";
        dateInput.value = "";
    };

    const addTodoItem = (todoContainer) => {
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

    return {
        validateInput,
        cleanInputFields,
        addTodoItem,
    };
})();

