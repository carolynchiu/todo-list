import { ItemModule } from "./itemModule.js";
export const ListModule = (() => {
    const { addTodoElement } = ItemModule;
    const todoContainer = document.querySelector(".section--todo");
    let todoList = localStorage.getItem("list");

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

    return {
        renderTodoList,
        sortByTime
    };
})();

