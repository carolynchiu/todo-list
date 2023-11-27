import { LocalStorageModule } from "./modules/localStorageModule.js";
import { FormModule } from "./modules/formModule.js";
import { ListModule } from "./modules/listModule.js";
let { myListArray } = LocalStorageModule;
const { addTodoItem } = FormModule;
const { renderTodoList } = ListModule;
const addButton = document.querySelector(".btn--add");
const sortButton = document.querySelector(".btn--sort");
const todoContainer = document.querySelector(".section--todo");
const sortIcon = document.querySelector(".sort--icon");

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
    addTodoItem(todoContainer);
});

renderTodoList(myListArray, todoContainer);

