import { v4 as uuidv4 } from "https://jspm.dev/uuid";
export const LocalStorageModule = (() => {
    let todoList = localStorage.getItem("list");
    let myListArray = JSON.parse(todoList) || [];

    const updateLocalStorage = (array) => {
        if (array.length == 0) {
            localStorage.removeItem("list");
            return;
        }
        localStorage.setItem("list", JSON.stringify(array));
    };

    return {
        myListArray,
        updateLocalStorage,
        uuidv4,
    };
})();

